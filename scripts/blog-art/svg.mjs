// Small SVG helpers shared by covers.mjs and diagrams.mjs. Colours are the site tokens (tailwind.config.ts).
export const C = {
  ink: "#0B1B33", cobalt: "#2E5BFF", ice: "#EDF1FF", slate: "#5C6B85", paper: "#F5F7FB",
  line: "#E4E8F0", line2: "#D5DBE6", warn: "#B7791F", ok: "#14AE5C", white: "#FFFFFF",
};
export const f = (n) => +n.toFixed(1);
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Rough text width: Inter/Manrope ≈ 0.56em per character, Plex Mono 0.6em (+ tracking). */
export const textWidth = (s, size, mono = false) => s.length * size * (mono ? 0.7 : 0.56);

/** Greedy word wrap to a pixel width. */
export function wrap(s, width, size, mono = false) {
  const words = String(s).split(" "), lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? cur + " " + w : w;
    if (cur && textWidth(next, size, mono) > width) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Text block: returns { svg, h }. kind: "sans" | "display" | "mono". */
export function text(x, y, s, { size = 14, width = 9999, kind = "sans", weight = 400, color = C.ink, anchor = "start", lh = 1.4, upper = false } = {}) {
  const mono = kind === "mono";
  const str = upper ? String(s).toUpperCase() : String(s);
  const lines = wrap(str, width, size, mono);
  const cls = kind === "mono" ? ' class="m"' : kind === "display" ? ' class="d"' : "";
  const ls = mono ? ' letter-spacing="0.08em"' : "";
  const fw = weight !== 400 ? ` font-weight="${weight}"` : "";
  const ta = anchor !== "start" ? ` text-anchor="${anchor}"` : "";
  const step = size * lh;
  const svg = lines.map((l, i) => `<text x="${f(x)}" y="${f(y + size + i * step - size * 0.18)}" font-size="${size}"${fw}${ls}${ta}${cls} fill="${color}">${esc(l)}</text>`).join("");
  return { svg, h: lines.length * step, lines: lines.length };
}

export const rect = (x, y, w, h, { r = 10, fill = C.white, stroke = C.line2, sw = 1, dash = null } = {}) =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

export const line = (x1, y1, x2, y2, { stroke = C.cobalt, sw = 1.5, dash = null, op = 1, arrow = false } = {}) =>
  `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${stroke}" stroke-width="${sw}"${op < 1 ? ` stroke-opacity="${op}"` : ""}${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ' marker-end="url(#a)"' : ""}/>`;

export const path = (d, { stroke = C.cobalt, sw = 1.5, dash = null, op = 1, fill = "none", arrow = false } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${op < 1 ? ` stroke-opacity="${op}"` : ""}${dash ? ` stroke-dasharray="${dash}"` : ""}${arrow ? ' marker-end="url(#a)"' : ""}/>`;

export const circle = (cx, cy, r, { fill = "none", stroke = C.cobalt, sw = 1.5, dash = null, op = 1 } = {}) =>
  `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${op < 1 ? ` stroke-opacity="${op}"` : ""}${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

/** Arrowhead marker (cobalt) for diagrams. */
export const defs = `<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="${C.cobalt}" stroke-width="1.6"/></marker></defs>`;

/** Deterministic 0..1 noise. */
export const noise = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
