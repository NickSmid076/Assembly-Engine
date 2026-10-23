#!/usr/bin/env node
// Visual QA for the Assembly Engine site.
// Screenshots every route at phone / tablet / desktop and runs layout + a11y checks.
//
// Usage (from the project root, dev server running):
//   node .claude/skills/ae-visual-qa/scripts/shoot.mjs --routes /nl,/en --out <dir>
// Options:
//   --base     default http://localhost:3000
//   --routes   comma-separated paths (default /nl,/en)
//   --out      output folder (default ./.qa)
//   --sizes    comma-separated subset of phone,tablet,desktop (default all)
//   --motion   "reduce" (default: every reveal is in its final state) or "full" (scrolls slowly so reveals fire)
//   --slice    slice height in CSS px for readable images (default 1600; 0 = one full-page image)
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:3000");
const ROUTES = arg("routes", "/nl,/en").split(",").map((s) => s.trim()).filter(Boolean);
const OUT = path.resolve(arg("out", ".qa"));
const MOTION = arg("motion", "reduce");
const SLICE = Number(arg("slice", "1600"));
const SIZES = {
  phone: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};
const pick = arg("sizes", "phone,tablet,desktop").split(",").filter((s) => SIZES[s]);
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

fs.mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const report = [];

for (const route of ROUTES) {
  for (const size of pick) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 300)); });
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 300)));
    await page.setViewport(SIZES[size]);
    if (MOTION === "reduce") await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.evaluateOnNewDocument(() => {
      window.__cls = 0;
      try {
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
          .observe({ type: "layout-shift", buffered: true });
      } catch {}
    });
    const url = BASE + route;
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    // Scroll through so lazy iframes/images load and in-view animations fire.
    const step = MOTION === "full" ? 300 : 900;
    await page.evaluate(async (step, slow) => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await wait(slow ? 180 : 60); }
      await wait(slow ? 1200 : 400);
    }, step, MOTION === "full");
    await new Promise((r) => setTimeout(r, 800));

    const checks = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) return true; } return false; };
      const label = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""}`;
      const overflow = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > vw + 1 && !clipped(el)) overflow.push({ el: label(el), right: Math.round(r.right), vw });
        if (overflow.length > 15) break;
      }
      // Text that runs off-screen but is hidden by an overflow:hidden parent (the page doesn't scroll, the text is just cut off).
      // Skips intentional horizontal scrollers, marquees and decorative (aria-hidden) content.
      const scroller = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p); if (/(auto|scroll)/.test(o.overflowX) || /animate-|marquee/.test(p.className || "") || p.getAttribute("aria-hidden") === "true") return true; } return false; };
      const cutText = [];
      for (const el of document.querySelectorAll("body *")) {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1) && !scroller(el) && el.closest("[aria-hidden=true]") === null && !el.closest(".sr-only"))
          cutText.push({ el: label(el), text: el.textContent.trim().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right) });
        if (cutText.length > 15) break;
      }
      const noName = [...document.querySelectorAll("button, a[href], [role=button], [role=tab]")].filter((el) => {
        const r = el.getBoundingClientRect(); if (!r.width) return false;
        return !(el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.textContent.trim() || el.querySelector("img[alt]:not([alt=''])"));
      }).map(label).slice(0, 15);
      const imgs = [...document.images].filter((i) => !i.hasAttribute("alt") || !(i.getAttribute("width") || i.style.width || i.classList.length)).map((i) => i.src.split("/").pop()).slice(0, 15);
      const heads = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
      const jumps = heads.map((h, i) => (i && h - heads[i - 1] > 1 ? `h${heads[i - 1]}→h${h}` : null)).filter(Boolean);
      const smallTargets = [...document.querySelectorAll("a[href], button")].filter((el) => {
        const r = el.getBoundingClientRect(); return r.width && r.height && (r.height < 24 || r.width < 24);
      }).map(label).slice(0, 15);
      const smallText = [...document.querySelectorAll("p, span, li, a, dd, dt, button, label")].filter((el) => {
        if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
        const r = el.getBoundingClientRect(); return r.width && parseFloat(getComputedStyle(el).fontSize) < 12;
      }).length;
      return {
        title: document.title, lang: document.documentElement.lang,
        height: document.documentElement.scrollHeight, scrollWidth: document.documentElement.scrollWidth, vw,
        h1: heads.filter((h) => h === 1).length, headingJumps: jumps,
        overflow, cutText, noAccessibleName: noName, imagesMissingAltOrSize: imgs, smallTapTargets: smallTargets, textUnder12px: smallText,
        cls: Math.round(window.__cls * 1000) / 1000,
      };
    });

    const slug = `${route.replace(/^\//, "").replace(/\//g, "_") || "root"}__${size}`;
    const files = [];
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));
    const H = Math.min(checks.height, 30000);
    if (!SLICE) {
      const f = path.join(OUT, `${slug}.png`);
      await page.screenshot({ path: f, fullPage: true, captureBeyondViewport: true });
      files.push(f);
    } else {
      const vw = SIZES[size].width;
      for (let y = 0, n = 1; y < H; y += SLICE, n++) {
        const f = path.join(OUT, `${slug}__${String(n).padStart(2, "0")}.png`);
        await page.screenshot({ path: f, clip: { x: 0, y, width: vw, height: Math.min(SLICE, H - y) }, captureBeyondViewport: true });
        files.push(f);
      }
    }
    report.push({ route, size, url, ...checks, consoleErrors: [...new Set(errors)].slice(0, 10), files: files.map((f) => path.relative(process.cwd(), f)) });
    await page.close();
    console.error(`✓ ${route} @ ${size}: ${files.length} image(s), overflow ${checks.overflow.length}, cut-off text ${checks.cutText.length}, CLS ${checks.cls}`);
  }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(path.join(OUT, "report.json"));
