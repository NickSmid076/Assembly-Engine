// Blog covers: public/blog/<slug>/cover.svg, 1600×800, no words (one file serves both locales).
// The LineArt language at cover size: cobalt lines on paper, white product cards, ink for the one thing that matters.
// Safe zone (header 21:9 and list 16:10 crops): x 180–1420, y 80–720.
// Run: node scripts/blog-art/covers.mjs && npx svgo -rf public/blog
import fs from "node:fs";
import path from "node:path";
import { C, f, rect, line, path as p, circle, noise } from "./svg.mjs";

const W = 1600, H = 800;
const wrapSvg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
  `<defs><pattern id="d" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.5" fill="${C.line2}"/></pattern></defs>` +
  `<rect width="${W}" height="${H}" fill="${C.paper}"/><rect width="${W}" height="${H}" fill="url(#d)" opacity=".7"/>${body}</svg>`;

/** A calm app window: header with three dots, then placeholder lines. hi = indexes of cobalt lines. */
function win(x, y, w, h, { rows = 4, hi = [], seed = 1, stroke = C.line2 } = {}) {
  let s = rect(x, y, w, h, { r: 16, stroke, sw: 2 });
  s += line(x, y + 40, x + w, y + 40, { stroke: C.line, sw: 2 });
  for (let i = 0; i < 3; i++) s += circle(x + 22 + i * 16, y + 20, 4, { fill: C.line2, stroke: "none" });
  const gap = (h - 64) / rows;
  for (let i = 0; i < rows; i++) {
    const len = (w - 56) * (0.45 + noise(seed * 7 + i) * 0.5), yy = y + 64 + i * gap;
    s += line(x + 28, yy, x + 28 + len, yy, { stroke: hi.includes(i) ? C.cobalt : C.line2, sw: 8 }).replace("/>", ' stroke-linecap="round"/>');
  }
  return s;
}
const bar = (x1, y, x2, color = C.line2, sw = 8) => line(x1, y, x2, y, { stroke: color, sw }).replace("/>", ' stroke-linecap="round"/>');

const covers = {
  /** Audit: a week of recurring jobs (three times a week highlighted) flowing into one well: the sum. */
  "what-a-free-automation-audit-looks-at"() {
    let s = "";
    const x0 = 210, y0 = 170, cw = 96, ch = 54, g = 12, cx = 1170, cy = 400;
    // Flows first, so the week's cells sit on top and the lines leave from the right edge.
    [0, 2, 4].forEach((c, k) => {
      const x = x0 + c * (cw + g) + cw / 2, y = y0 + 2 * (ch + g) + ch / 2, xe = x0 + 5 * (cw + g);
      s += p(`M${x} ${y}L${xe} ${y + (k - 1) * 4}C${xe + 200} ${y + (k - 1) * 4} ${cx - 260} ${cy - 40 + k * 40} ${cx - 20} ${cy}`, { sw: 2.5, op: 0.85 });
    });
    for (let c = 0; c < 5; c++) {
      s += bar(x0 + c * (cw + g) + 14, y0 - 30, x0 + c * (cw + g) + 56, C.line2, 6);
      for (let r = 0; r < 7; r++) {
        const hot = r === 2 && c % 2 === 0, x = x0 + c * (cw + g), y = y0 + r * (ch + g);
        s += rect(x, y, cw, ch, { r: 8, fill: hot ? C.ice : C.white, stroke: hot ? C.cobalt : C.line2, sw: 2 });
        if (!hot && noise(c * 13 + r) > 0.62) s += bar(x + 16, y + ch / 2, x + 16 + 30 + noise(r + c) * 34, C.line2, 6);
      }
    }
    for (let i = 0; i < 9; i++) {
      const rx = 36 + i * 28;
      s += `<ellipse cx="${cx}" cy="${f(cy + i * 3)}" rx="${rx}" ry="${f(rx * 0.38)}" fill="none" stroke="${C.cobalt}" stroke-width="2" stroke-opacity="${f(0.75 - i * 0.07)}"/>`;
    }
    s += circle(cx, cy, 16, { stroke: C.ink, sw: 3, fill: C.white });
    return s;
  },

  /** Five tasks: four systems you already have, five jobs on the lines between them. */
  "five-admin-tasks-to-automate-first"() {
    let s = "";
    for (let i = 0; i < 9; i++) {
      const rx = 140 + i * 48;
      s += `<ellipse cx="800" cy="400" rx="${rx}" ry="${f(rx * 0.42)}" transform="rotate(-8 800 400)" fill="none" stroke="${C.cobalt}" stroke-width="1.5" stroke-opacity="${f(0.32 - i * 0.025)}"/>`;
    }
    const A = [220, 140, 320, 200], B = [1060, 130, 320, 200], Cc = [250, 470, 320, 200], D = [1030, 460, 320, 200];
    const mid = (r) => [r[0] + r[2] / 2, r[1] + r[3] / 2];
    const links = [
      [A[0] + A[2], A[1] + 100, B[0], B[1] + 110, 0],
      [Cc[0] + Cc[2], Cc[1] + 100, D[0], D[1] + 100, 0],
      [A[0] + 120, A[1] + A[3], Cc[0] + 150, Cc[1], 1],
      [B[0] + 190, B[1] + B[3], D[0] + 170, D[1], 1],
      [A[0] + A[2], A[1] + 160, D[0], D[1] + 40, 2],
    ];
    for (const [x1, y1, x2, y2, k] of links) {
      const d = k === 1 ? `M${x1} ${y1}C${x1} ${f((y1 + y2) / 2)} ${x2} ${f((y1 + y2) / 2)} ${x2} ${y2}` : `M${x1} ${y1}C${f((x1 + x2) / 2)} ${y1} ${f((x1 + x2) / 2)} ${y2} ${x2} ${y2}`;
      s += p(d, { sw: 2.5, op: 0.9 });
    }
    s += win(...A, { hi: [1], seed: 1 }) + win(...B, { hi: [0], seed: 2 }) + win(...Cc, { hi: [2], seed: 3 }) + win(...D, { hi: [1], seed: 4 });
    for (const [x1, y1, x2, y2] of links) s += circle((x1 + x2) / 2, (y1 + y2) / 2, 11, { fill: C.white, stroke: C.ink, sw: 3 });
    void mid;
    return s;
  },

  /** E-invoicing: a stack of PDF sheets on the left, the same invoice as structured cells on the right, reported onwards. */
  "e-invoicing-mandatory-2030"() {
    let s = "";
    const iso = (ox, oy, k) => (x, y, z) => `${f(ox + (x - z) * 0.86 * k)} ${f(oy + (x + z) * 0.42 * k - y * k)}`;
    const L = iso(470, 470, 2.3);
    for (let i = 0; i < 6; i++) {
      const y = i * 12;
      s += p(`M${L(-75, y, -50)}L${L(75, y, -50)}L${L(75, y, 50)}L${L(-75, y, 50)}Z`, { sw: 2, op: 0.25 + i * 0.12, fill: i === 5 ? C.white : "none" });
    }
    for (let k = 0; k < 5; k++) {
      const z = -30 + k * 14, len = k === 0 ? 50 : 70 + noise(k) * 40;
      s += p(`M${L(-58, 60, z)}L${L(-58 + len, 60, z)}`, { stroke: k === 0 ? C.ink : C.cobalt, sw: 3, op: k === 0 ? 1 : 0.6 });
    }
    const R = iso(1130, 520, 2.3);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
      const x = -70 + c * 36, z = -55 + r * 24;
      s += p(`M${R(x, 0, z)}L${R(x + 32, 0, z)}L${R(x + 32, 0, z + 20)}L${R(x, 0, z + 20)}Z`, { sw: 2, stroke: r === 0 ? C.ink : C.cobalt, op: r === 0 ? 1 : 0.55, fill: r === 0 ? C.white : "none" });
    }
    s += p(`M650 400C760 340 860 340 930 380`, { sw: 2.5, dash: "2 10" }).replace("/>", ' stroke-linecap="round"/>');
    s += circle(930, 380, 7, { fill: C.cobalt, stroke: "none" });
    s += p(`M1250 250C1300 200 1340 190 1370 190`, { sw: 2, op: 0.8 });
    for (let i = 0; i < 4; i++) s += circle(1390, 190, 10 + i * 14, { sw: 2, op: 0.8 - i * 0.18 });
    return s;
  },

  /** Software you already use: three existing windows feeding one shared client record. */
  "build-on-the-software-you-already-use"() {
    let s = "";
    const iso = (x, y, z) => `${f(800 + (x - z) * 0.86 * 3)} ${f(420 + (x + z) * 0.42 * 3 - y * 3)}`;
    for (const a of [-80, 0, 80]) for (const b of [-80, 0, 80]) {
      for (const [P, Q] of [[[-110, a, b], [110, a, b]], [[a, -110, b], [a, 110, b]], [[a, b, -110], [a, b, 110]]])
        s += p(`M${iso(...P)}L${iso(...Q)}`, { sw: 1.5, op: 0.14 });
    }
    const Wl = [200, 300, 320, 200], Wt = [640, 110, 320, 200], Wr = [1080, 300, 320, 200];
    const card = [660, 540, 280, 130];
    s += p(`M${Wl[0] + Wl[2]} ${Wl[1] + 120}C${card[0] - 60} ${Wl[1] + 120} ${card[0] - 90} ${card[1] + 65} ${card[0]} ${card[1] + 65}`, { sw: 2.5 });
    s += p(`M${Wt[0] + 160} ${Wt[1] + Wt[3]}L${card[0] + 140} ${card[1]}`, { sw: 2.5 });
    s += p(`M${Wr[0]} ${Wr[1] + 120}C${card[0] + card[2] + 60} ${Wr[1] + 120} ${card[0] + card[2] + 90} ${card[1] + 65} ${card[0] + card[2]} ${card[1] + 65}`, { sw: 2.5 });
    s += win(...Wl, { hi: [0], seed: 5 }) + win(...Wt, { hi: [1], seed: 6 }) + win(...Wr, { hi: [2], seed: 7 });
    s += rect(...card, { r: 16, stroke: C.ink, sw: 3 });
    s += circle(card[0] + 48, card[1] + 65, 22, { stroke: C.cobalt, sw: 2.5, fill: C.ice });
    s += bar(card[0] + 92, card[1] + 50, card[0] + 236, C.ink, 8) + bar(card[0] + 92, card[1] + 82, card[0] + 196, C.cobalt, 8);
    return s;
  },

  /** Law-firm intake: four documents the client sends along one line, ending at the advocaat's call (dashed). */
  "client-intake-for-law-firms"() {
    let s = "";
    for (let i = 0; i < 18; i++) {
      let d = ""; const z = -1 + (2 * i) / 17;
      for (let j = 0; j <= 50; j++) { const t = j / 50, x = 120 + 1360 * t, y = 420 + z * 230 * (0.35 + 0.65 * Math.abs(Math.sin(t * Math.PI))) + Math.sin(t * 7 + i * 0.4) * 22; d += `${j ? "L" : "M"}${f(x)} ${f(y)}`; }
      s += p(d, { sw: 1.5, op: f(0.06 + 0.16 * Math.sin((Math.PI * i) / 17)) });
    }
    const xs = [230, 490, 750, 1010], ys = [300, 330, 300, 330], cw = 170, ch = 210;
    s += p(`M${xs[0] + cw / 2} 420L${xs[3] + cw / 2} 420L1300 420`, { sw: 2.5 });
    xs.forEach((x, i) => {
      const y = ys[i];
      s += rect(x, y, cw, ch, { r: 14, sw: 2 });
      if (i === 0) { s += circle(x + 50, y + 70, 24, { stroke: C.cobalt, sw: 2.5 }) + bar(x + 92, y + 58, x + 140) + bar(x + 92, y + 84, x + 128) + bar(x + 30, y + 140, x + 140) + bar(x + 30, y + 168, x + 110); }
      if (i === 1) { s += rect(x + 60, y + 34, 50, 32, { r: 6, stroke: C.cobalt, sw: 2.5 }); [32, 85, 138].forEach((cx) => { s += line(x + 85, y + 66, x + cx, y + 112, { stroke: C.cobalt, sw: 2 }) + rect(x + cx - 20, y + 112, 40, 28, { r: 6, sw: 2 }); }); s += bar(x + 30, y + 172, x + 140); }
      if (i === 2) { [40, 64, 88, 112].forEach((yy, k) => { s += bar(x + 28, y + yy, x + 28 + 90 + noise(k + 9) * 24); }); s += p(`M${x + 30} ${y + 170}c14 -24 22 -24 26 -6s12 14 22 -6 16 -14 22 4 14 6 30 -6`, { sw: 2.5, stroke: C.ink }); }
      if (i === 3) { [40, 64].forEach((yy) => { s += bar(x + 28, y + yy, x + 120); }); s += bar(x + 28, y + 104, x + 142, C.ink, 10); s += rect(x + 28, y + 140, 114, 38, { r: 10, fill: C.cobalt, stroke: "none" }); }
    });
    s += circle(1340, 420, 48, { stroke: C.ink, sw: 2.5, dash: "8 8", fill: C.white });
    s += circle(1340, 404, 12, { stroke: C.ink, sw: 2.5 }) + p(`M1318 446c4 -18 40 -18 44 0`, { stroke: C.ink, sw: 2.5 });
    return s;
  },

  /** Payment reminders: one invoice's timeline; arcs go out at −3, +7, +21 and +35 days, the last one a person (dashed). */
  "automatic-payment-reminders"() {
    let s = "";
    const X = (d) => 260 + ((d + 10) / 55) * 1100, y = 560;
    s += line(200, y, 1420, y, { stroke: C.ink, sw: 2.5 });
    for (let d = -7; d <= 42; d += 7) s += line(X(d), y - 8, X(d), y + 8, { stroke: C.line2, sw: 2 });
    s += line(X(0), y - 140, X(0), y + 30, { stroke: C.ink, sw: 3 }) + circle(X(0), y - 150, 10, { stroke: C.ink, sw: 3, fill: C.white });
    [-3, 7, 21, 35].forEach((d, k) => {
      const x = X(d), human = d === 35;
      for (let i = 0; i < 5; i++) {
        const r = 22 + i * 24;
        s += p(`M${f(x - r)} ${y}A${r} ${r} 0 0 1 ${f(x + r)} ${y}`, { sw: 2, op: f(0.85 - i * 0.15), dash: human ? "6 8" : null, stroke: human ? C.ink : C.cobalt });
      }
      s += circle(x, y, 7, { fill: human ? C.white : C.cobalt, stroke: human ? C.ink : "none", sw: 2.5 });
      const ex = x - 60, ey = 190 + (k % 2) * 40;
      if (human) {
        s += circle(x, ey + 34, 34, { stroke: C.ink, sw: 2.5, dash: "6 7", fill: C.white }) + circle(x, ey + 24, 9, { stroke: C.ink, sw: 2.5 }) + p(`M${x - 16} ${ey + 54}c3 -14 29 -14 32 0`, { stroke: C.ink, sw: 2.5 });
      } else {
        s += rect(ex, ey, 120, 76, { r: 10, sw: 2 }) + p(`M${ex} ${ey + 6}L${ex + 60} ${ey + 44}L${ex + 120} ${ey + 6}`, { sw: 2, stroke: C.line2 });
        s += rect(ex + 34, ey + 50, 52, 14, { r: 7, fill: C.cobalt, stroke: "none" });
      }
      s += line(x, ey + (human ? 70 : 76), x, y - 130, { stroke: C.line2, sw: 2, dash: "2 6" });
    });
    return s;
  },

  /** What not to automate: one bundle splits; the upper half runs into records (automated), the lower half, dashed, to a person. */
  "what-not-to-automate"() {
    let s = "";
    for (let i = 0; i < 16; i++) {
      const up = i < 8, k = up ? i : i - 8, y0 = 370 + i * 6, y1 = up ? 180 + k * 18 : 520 + k * 16;
      s += p(`M180 ${y0}C560 ${y0} 640 ${y1} ${up ? 960 : 1060} ${y1}`, { sw: 2, op: f(up ? 0.3 + k * 0.08 : 0.35 + k * 0.06), dash: up ? null : "3 10", stroke: up ? C.cobalt : C.ink });
    }
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      const x = 990 + c * 70, y = 150 + r * 62, on = noise(r * 6 + c) > 0.35;
      s += rect(x, y, 56, 46, { r: 8, sw: 2, stroke: on ? C.cobalt : C.line2, fill: on ? C.ice : C.white });
    }
    s += circle(1200, 590, 78, { stroke: C.ink, sw: 2.5, dash: "8 9", fill: C.white });
    s += circle(1200, 566, 20, { stroke: C.ink, sw: 3 }) + p(`M1164 632c6 -32 66 -32 72 0`, { stroke: C.ink, sw: 3 });
    return s;
  },

  /** n8n, Make or Zapier: the same five-step workflow three times; one row counts every step, the last counts the run once. */
  "n8n-vs-make-vs-zapier-for-dutch-firms"() {
    let s = "";
    const ys = [190, 400, 610], xs = [300, 520, 740, 960, 1180], n = 74;
    ys.forEach((y, row) => {
      s += line(xs[0] + n / 2, y, xs[4] + n / 2, y, { sw: 2.5, op: 0.8 });
      if (row === 2) s += rect(xs[0] - 34, y - n / 2 - 30, xs[4] - xs[0] + n + 68, n + 60, { r: 24, stroke: C.ink, sw: 2.5, fill: "none" });
      xs.forEach((x, i) => {
        s += rect(x, y - n / 2, n, n, { r: 16, sw: 2.5, stroke: i === 0 ? C.ink : C.line2 });
        s += bar(x + 20, y - 6, x + n - 20, i === 0 ? C.ink : C.cobalt, 6) + bar(x + 20, y + 12, x + n - 32, C.line2, 6);
        if (row === 0) s += circle(x + n / 2, y - n / 2 - 28, 11, { stroke: C.cobalt, sw: 2.5, fill: C.ice });
        if (row === 1) s += circle(x + n / 2, y - n / 2 - 22, 6, { fill: C.cobalt, stroke: "none", op: 0.55 });
      });
      if (row === 2) s += circle(xs[4] + n + 70, y, 16, { stroke: C.ink, sw: 3, fill: C.ice });
    });
    return s;
  },

  /** Engagement letters: a template with merge fields on the left; one lens over the whole firm's records on the right. */
  "engagement-letters-and-conflict-checks-for-law-firms"() {
    let s = "";
    const dx = 210, dy = 120, dw = 420, dh = 560;
    s += rect(dx, dy, dw, dh, { r: 16, sw: 2 });
    s += bar(dx + 40, dy + 60, dx + 200, C.ink, 10);
    const pill = (x, y, w) => rect(x, y - 14, w, 28, { r: 14, fill: C.ice, stroke: C.cobalt, sw: 2 });
    let y = dy + 120;
    for (let i = 0; i < 12; i++, y += 36) {
      if (i === 5) { y += 20; continue; }
      if ([1, 3, 7, 10].includes(i)) { const w = 90 + noise(i) * 50; s += bar(dx + 40, y, dx + 110) + pill(dx + 126, y, w) + bar(dx + 140 + w, y, dx + dw - 50); }
      else s += bar(dx + 40, y, dx + 40 + (dw - 100) * (0.55 + noise(i + 3) * 0.45));
    }
    const cx = 1110, cy = 400, r = 140;
    for (let i = 0; i < 17; i++) {
      const ry = 150 + i * 30; let x = 740;
      for (let j = 0; x < 1420; j++) { const len = 30 + noise(i * 31 + j) * 90, end = Math.min(x + len, 1420); s += line(x, ry, end, ry, { sw: 3, op: 0.22 }); x = end + 14; }
      const d = ry - cy;
      if (Math.abs(d) < r - 8) { const half = Math.sqrt(r * r - d * d) - 10; s += line(cx - half, ry, cx + half, ry, { sw: 3, op: 0.8 }); }
      if ([5, 7, 9].includes(i)) s += circle(cx - Math.sqrt(r * r - d * d) + 2, ry, 6, { fill: C.ink, stroke: "none" });
    }
    s += circle(cx, cy, r, { stroke: C.ink, sw: 3 });
    s += line(cx + r * 0.71, cy + r * 0.71, cx + r * 0.71 + 80, cy + r * 0.71 + 80, { stroke: C.ink, sw: 6 }).replace("/>", ' stroke-linecap="round"/>');
    return s;
  },
};

for (const [slug, draw] of Object.entries(covers)) {
  const dir = path.join("public", "blog", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "cover.svg"), wrapSvg(draw()));
}
console.log("covers:", Object.keys(covers).length);
