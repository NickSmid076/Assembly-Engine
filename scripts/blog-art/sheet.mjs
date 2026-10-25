// Contact sheet for reviewing generated SVGs: node scripts/blog-art/sheet.mjs <out.png> <width> <files...>
// Renders each SVG at the given width in the site fonts (Google Fonts), stacked in a grid of two.
import { createRequire } from "node:module";
const puppeteer = createRequire(new URL("../../.claude/skills/ae-visual-qa/scripts/package.json", import.meta.url))("puppeteer-core");
import fs from "node:fs";
const [out, width, ...files] = process.argv.slice(2);
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const cells = files.map((f) => `<figure><div class="w">${fs.readFileSync(f, "utf8")}</div><figcaption>${f}</figcaption></figure>`).join("");
const html = `<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&family=IBM+Plex+Mono:wght@500&display=block" rel="stylesheet">
<style>:root{--font-inter:Inter;--font-manrope:Manrope;--font-plex-mono:'IBM Plex Mono'}body{margin:0;padding:20px;background:#fff;font-family:Inter;display:grid;grid-template-columns:repeat(${width > 500 ? 2 : 4},${width}px);gap:24px}
.w{background:#F5F7FB;border:1px solid #E4E8F0;border-radius:12px;overflow:hidden}.w svg{display:block;width:100%;height:auto;font-family:Inter}.w .m{font-family:'IBM Plex Mono'}.w .d{font-family:Manrope}figure{margin:0}figcaption{font:11px monospace;color:#5C6B85;margin-top:4px}</style></head><body>${cells}</body></html>`;
const b = await puppeteer.launch({ executablePath: CHROME, headless: true });
const pg = await b.newPage();
await pg.setViewport({ width: 40 + (width > 500 ? 2 : 4) * (+width + 24), height: 600, deviceScaleFactor: 1 });
await pg.setContent(html, { waitUntil: "load", timeout: 60000 });
await pg.evaluate(() => document.fonts.ready);
await pg.screenshot({ path: out, fullPage: true });
await b.close();
