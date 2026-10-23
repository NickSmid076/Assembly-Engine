// axe-core accessibility scan of routes at phone and desktop width, with reduced motion emulated
// (so every revealed element is in its final, visible state).
// Usage: node .claude/skills/ae-visual-qa/scripts/axe.mjs --base http://localhost:3000 --routes /nl,/en
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const axeSrc = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg("base", "http://localhost:3000");
const routes = arg("routes", "/nl,/en").split(",");
const sizes = { phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, desktop: { width: 1440, height: 900 } };

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
let total = 0;
for (const route of routes) for (const [name, vp] of Object.entries(sizes)) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(base + route, { waitUntil: "networkidle0" });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
  await page.addScriptTag({ content: axeSrc });
  const res = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] })).violations
    .map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ") + " — " + (n.failureSummary || "").split("\n")[1]) })));
  total += res.length;
  console.log(`${res.length ? "✗" : "✓"} ${route} @ ${name}: ${res.length} violation(s)`);
  for (const v of res) { console.log(`   [${v.impact}] ${v.id}: ${v.help}`); v.nodes.forEach((n) => console.log(`      ${n}`)); }
  await page.close();
}
await browser.close();
process.exit(total ? 1 : 0);
