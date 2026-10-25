// Inline diagrams: public/blog/<slug>/<name>.<locale>.svg (desktop, 680 wide) and <name>.<locale>.m.svg (phone, 340 wide),
// so labels stay at their real size on both. Text has no font-family of its own: inlined, it inherits Inter from the page
// (class "m" = Plex Mono, "d" = Manrope via globals.css). Dashed = a step a person does. Figures only from the articles.
// Run: node scripts/blog-art/diagrams.mjs && npx svgo -rf public/blog
import fs from "node:fs";
import path from "node:path";
import { C, f, esc, rect, line, path as p, circle, text, textWidth, defs } from "./svg.mjs";

/* ---------- layout kit ---------- */

/** Card with optional eyebrow (mono), title and body. Returns { svg, h }. */
function card(x, y, w, o = {}) {
  const pad = o.pad ?? 14, iw = w - pad * 2;
  let svg = "", yy = y + pad;
  const anchor = o.center ? "middle" : "start", tx = o.center ? x + w / 2 : x + pad;
  if (o.eyebrow) { const t = text(tx, yy, o.eyebrow, { size: 10.5, kind: "mono", color: o.dash ? C.ink : C.slate, upper: true, width: iw, anchor }); svg += t.svg; yy += t.h + 4; }
  if (o.title) { const t = text(tx, yy, o.title, { size: o.titleSize ?? 14, kind: o.titleKind ?? "sans", weight: o.titleWeight ?? 600, width: iw, anchor, lh: 1.32 }); svg += t.svg; yy += t.h; }
  if (o.body) { yy += 4; const t = text(tx, yy, o.body, { size: 13, color: C.slate, width: iw, anchor, lh: 1.42 }); svg += t.svg; yy += t.h; }
  const h = Math.max(o.minH ?? 0, yy - y + pad);
  const box = rect(x, y, w, h, { r: 10, fill: o.fill ?? (o.strong ? C.white : C.white), stroke: o.strong ? C.ink : o.dash ? C.ink : C.line2, sw: o.strong ? 1.5 : 1, dash: o.dash ? "5 4" : null });
  const dot = o.dot ? circle(x + w - 14, y + 14, 4, { fill: o.dot, stroke: "none" }) : "";
  return { svg: box + svg + dot, h };
}
/** Mono section label. */
const label = (x, y, s, w = 600, color = C.slate) => { const t = text(x, y, s, { size: 11, kind: "mono", upper: true, color, width: w }); return { svg: t.svg, h: t.h }; };
const arrowR = (x1, x2, y) => line(x1, y, x2, y, { arrow: true });
const arrowD = (x, y1, y2) => line(x, y1, x, y2, { arrow: true });
/** Pill chip; returns { svg, w }. */
function chip(x, y, s, { tone = "ice" } = {}) {
  const w = textWidth(s, 12) + 22;
  const fill = tone === "ice" ? C.ice : C.white, stroke = tone === "ice" ? "#C3D0FF" : C.line2;
  return { svg: rect(x, y, w, 26, { r: 13, fill, stroke }) + `<text x="${f(x + 11)}" y="${f(y + 17.5)}" font-size="12" font-weight="500" fill="${C.ink}">${esc(s)}</text>`, w };
}
/** Chips that wrap within a width. Returns { svg, h }. */
function chips(x, y, w, list, o) {
  let cx = x, cy = y, svg = "";
  for (const s of list) { const c = chip(0, 0, s, o); if (cx > x && cx + c.w > x + w) { cx = x; cy += 34; } svg += chip(cx, cy, s, o).svg; cx += c.w + 8; }
  return { svg, h: cy - y + 26 };
}
/** A row of cards with arrows (wide), or a column with arrows down (narrow). Node: card options + branch. */
function flow(x, y, w, nodes, { wide, gap = 22 } = {}) {
  let svg = "";
  if (wide) {
    const n = nodes.length, nw = (w - (n - 1) * gap) / n;
    const H = Math.max(...nodes.map((o) => card(0, 0, nw, o).h));
    let bh = 0;
    nodes.forEach((o, i) => {
      const nx = x + i * (nw + gap);
      svg += card(nx, y, nw, { ...o, minH: H }).svg;
      if (i < n - 1) svg += arrowR(nx + nw + 3, nx + nw + gap - 3, y + H / 2);
      if (o.branch) { const bw = Math.min(nw * 2 + gap, x + w - nx), b = card(nx, y + H + 30, bw, o.branch); svg += arrowD(nx + nw / 2, y + H + 3, y + H + 27) + b.svg; bh = Math.max(bh, 30 + b.h); }
    });
    return { svg, h: H + bh };
  }
  let yy = y;
  nodes.forEach((o, i) => {
    const c = card(x, yy, w, o); svg += c.svg; yy += c.h;
    if (o.branch) { const b = card(x + 28, yy + 16, w - 28, o.branch); svg += p(`M${x + 14} ${yy}L${x + 14} ${f(yy + 16 + b.h / 2)}L${x + 25} ${f(yy + 16 + b.h / 2)}`, { arrow: true }) + b.svg; yy += 16 + b.h; }
    if (i < nodes.length - 1) { svg += arrowD(x + w / 2, yy + 3, yy + gap - 3); yy += gap; }
  });
  return { svg, h: yy - y };
}

/* ---------- the nine diagrams ---------- */
const D = {};

/** 1 · The sum: time × frequency × hourly cost (the article's example numbers). */
D["what-a-free-automation-audit-looks-at/the-sum"] = {
  en: { label: "Example · fictional firm", job: "Sending reminders for unpaid invoices", cells: [["Time per job", "20 min"], ["How often", "3× a week"], ["Hourly cost", "€45"]], weeks: "46 working weeks", hours: "46 hours a year", cost: "about €2,070 a year" },
  nl: { label: "Voorbeeld · fictief kantoor", job: "Herinneringen sturen voor openstaande facturen", cells: [["Tijd per keer", "20 min"], ["Hoe vaak", "3× per week"], ["Uurkosten", "€45"]], weeks: "46 werkweken", hours: "46 uur per jaar", cost: "ongeveer €2.070 per jaar" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label); s += l.svg; y += l.h + 6;
    const t = text(P, y, L.job, { size: 15, weight: 600, width: W - 2 * P }); s += t.svg; y += t.h + 14;
    const cw = wide ? (W - 2 * P - 2 * 36) / 3 : W - 2 * P;
    L.cells.forEach(([k, v], i) => {
      const x = wide ? P + i * (cw + 36) : P;
      const c = card(x, y, cw, { eyebrow: k, title: v, titleSize: 24, titleKind: "display", titleWeight: 700, center: true });
      s += c.svg;
      if (i < 2) {
        if (wide) s += `<text x="${f(x + cw + 18)}" y="${f(y + c.h / 2 + 7)}" font-size="20" text-anchor="middle" fill="${C.slate}">×</text>`;
        else { s += `<text x="${W / 2}" y="${f(y + c.h + 21)}" font-size="18" text-anchor="middle" fill="${C.slate}">×</text>`; y += c.h + 28; }
      } else y += c.h;
    });
    s += arrowD(W / 2, y + 4, y + 30); y += 34;
    const r = card(P, y, W - 2 * P, { eyebrow: L.weeks, title: L.hours, body: null, strong: true, titleSize: 15 });
    const big = text(wide ? W - P - 16 : P + 14, y + r.h + (wide ? -r.h / 2 - 14 : 0), L.cost, { size: wide ? 22 : 20, kind: "display", weight: 800, anchor: wide ? "end" : "start", color: C.cobalt });
    if (wide) { s += r.svg + big.svg; y += r.h; }
    else { const r2 = card(P, y, W - 2 * P, { eyebrow: L.weeks, title: L.hours, strong: true, titleSize: 15, minH: r.h + 34 }); s += r2.svg + text(P + 14, y + r.h - 6, L.cost, { size: 20, kind: "display", weight: 800, color: C.cobalt }).svg; y += r2.h; }
    return { svg: s, h: y + P };
  },
};

/** 2 · Which systems each of the five tasks touches (our example of a small firm). */
D["five-admin-tasks-to-automate-first/between-systems"] = {
  en: { label: "Example · a typical small firm", cols: ["Email", "Accounting package", "Excel list", "Calendar and tasks"], rows: [["Chasing documents", [0, 1, 2]], ["Authorisations and deadlines", [0, 2, 3]], ["Bank and invoice rules", [1]], ["Period-end checks", [0, 1, 2]], ["Wwft reviews", [2, 3]]] },
  nl: { label: "Voorbeeld · een gemiddeld klein kantoor", cols: ["E-mail", "Boekhoud­pakket", "Excel-lijst", "Agenda en taken"], rows: [["Achter stukken aan", [0, 1, 2]], ["Machtigingen en deadlines", [0, 2, 3]], ["Bank- en factuurregels", [1]], ["Controles bij afsluiting", [0, 1, 2]], ["Wwft-reviews", [2, 3]]] },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label); s += l.svg; y += l.h + 14;
    const cols = L.cols.map((c) => c.replace("­", ""));
    if (wide) {
      const lw = 230, cw = (W - 2 * P - lw) / 4;
      let hh = 0;
      cols.forEach((c, i) => { const t = text(P + lw + i * cw + cw / 2, y, c, { size: 12.5, color: C.slate, width: cw - 10, anchor: "middle", lh: 1.3 }); s += t.svg; hh = Math.max(hh, t.h); });
      y += hh + 10;
      L.rows.forEach(([name, on], r) => {
        s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 });
        const t = text(P, y + 14, `${r + 1}  ${name}`, { size: 14, weight: 600, width: lw - 10 }); const rh = Math.max(46, t.h + 26);
        s += t.svg;
        for (let i = 0; i < 4; i++) s += on.includes(i) ? circle(P + lw + i * cw + cw / 2, y + rh / 2, 7, { fill: C.cobalt, stroke: "none" }) : circle(P + lw + i * cw + cw / 2, y + rh / 2, 3, { fill: C.line2, stroke: "none" });
        y += rh;
      });
      s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 });
      return { svg: s, h: y + P };
    }
    L.rows.forEach(([name, on], r) => {
      s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 }); y += 12;
      const t = text(P, y, `${r + 1}  ${name}`, { size: 14, weight: 600, width: W - 2 * P }); s += t.svg; y += t.h + 8;
      const c = chips(P, y, W - 2 * P, on.map((i) => cols[i])); s += c.svg; y += c.h + 14;
    });
    s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 });
    return { svg: s, h: y + P };
  },
};

/** 3 · Today's PDF route vs the expected e-invoice route. */
D["e-invoicing-mandatory-2030/pdf-vs-structured"] = {
  en: { today: "Today: a PDF", exp: "Expected from 1 July 2030: an e-invoice", a: ["Your accounting package", "PDF by email", "Customer retypes it", "Customer's package"], b: ["Your accounting package", "Structured e-invoice", "Customer's package"], rep: "Reported per invoice to the Belastingdienst", repBody: "EU transactions first; domestic expected from 2031", person: "Person", sw: "Software" },
  nl: { today: "Nu: een pdf", exp: "Verwacht vanaf 1 juli 2030: een e-factuur", a: ["Uw boekhoudpakket", "Pdf per e-mail", "Klant typt het over", "Pakket van de klant"], b: ["Uw boekhoudpakket", "Gestructureerde e-factuur", "Pakket van de klant"], rep: "Per factuur gemeld aan de Belastingdienst", repBody: "Eerst EU-handel; binnenlands verwacht vanaf 2031", person: "Mens", sw: "Software" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    let l = label(P, y, L.today); s += l.svg; y += l.h + 10;
    const a = flow(P, y, W - 2 * P, L.a.map((t, i) => ({ title: t, dash: i === 2, eyebrow: i === 2 ? L.person : null })), { wide }); s += a.svg; y += a.h + 26;
    s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 }); y += 22;
    l = label(P, y, L.exp, W - 2 * P, C.ink); s += l.svg; y += l.h + 10;
    const nodes = L.b.map((t, i) => ({ title: t, strong: i === 1 }));
    // Wide: the three nodes line up with the first three of the PDF row.
    const bw = wide ? ((W - 2 * P) - 3 * 22) / 4 * 3 + 2 * 22 : W - 2 * P;
    nodes[1].branch = { title: L.rep, body: L.repBody, fill: C.white };
    const b = flow(P, y, bw, nodes, { wide }); s += b.svg; y += b.h;
    return { svg: s, h: y + P };
  },
};

/** 4 · One client record in three packages vs one source. */
D["build-on-the-software-you-already-use/one-source"] = {
  en: { label: "Example · fictional client De Vries Installatie", left: "Three packages, three copies", right: "One source, copied automatically", pk: ["CRM", "Accounting package", "Client folder"], addr: "Kerkstraat 12", old: "Kerkstraat 21", stale: "Not updated after the move", copied: "copied" },
  nl: { label: "Voorbeeld · fictieve klant De Vries Installatie", left: "Drie pakketten, drie kopieën", right: "Eén bron, automatisch overgenomen", pk: ["CRM", "Boekhoudpakket", "Klantmap"], addr: "Kerkstraat 12", old: "Kerkstraat 21", stale: "Niet bijgewerkt na de verhuizing", copied: "overgenomen" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label, W - 2 * P); s += l.svg; y += l.h + 14;
    const colW = wide ? (W - 2 * P - 40) / 2 : W - 2 * P;
    // Left: three separate copies, one out of date.
    const left = (x, y0) => {
      let o = label(x, y0, L.left, colW, C.ink).svg, yy = y0 + 26;
      L.pk.forEach((k, i) => { const c = card(x, yy, colW, { eyebrow: k, title: i === 2 ? L.old : L.addr, body: i === 2 ? L.stale : null, dot: i === 2 ? C.warn : null }); o += c.svg; yy += c.h + 10; });
      return { svg: o, h: yy - 10 - y0 };
    };
    // Right: CRM as the source, two copies fed from it.
    const right = (x, y0) => {
      let o = label(x, y0, L.right, colW, C.ink).svg, yy = y0 + 26;
      const src = card(x, yy, colW, { eyebrow: L.pk[0], title: L.addr, strong: true }); o += src.svg; yy += src.h;
      const hw = (colW - 12) / 2;
      o += p(`M${f(x + colW / 2)} ${yy}L${f(x + colW / 2)} ${yy + 14}L${f(x + hw / 2)} ${yy + 14}L${f(x + hw / 2)} ${yy + 33}`, { arrow: true });
      o += p(`M${f(x + colW / 2)} ${yy + 14}L${f(x + colW - hw / 2)} ${yy + 14}L${f(x + colW - hw / 2)} ${yy + 33}`, { arrow: true });
      yy += 36;
      const c1 = card(x, yy, hw, { eyebrow: L.pk[1], title: L.addr, body: L.copied }), c2 = card(x + hw + 12, yy, hw, { eyebrow: L.pk[2], title: L.addr, body: L.copied, minH: c1.h });
      const H = Math.max(c1.h, c2.h);
      o += card(x, yy, hw, { eyebrow: L.pk[1], title: L.addr, body: L.copied, minH: H }).svg + card(x + hw + 12, yy, hw, { eyebrow: L.pk[2], title: L.addr, body: L.copied, minH: H }).svg;
      return { svg: o, h: yy + H - y0 };
    };
    if (wide) {
      const a = left(P, y), b = right(P + colW + 40, y);
      s += a.svg + b.svg + line(P + colW + 20, y, P + colW + 20, y + Math.max(a.h, b.h), { stroke: C.line2, sw: 1 });
      y += Math.max(a.h, b.h);
    } else {
      const a = left(P, y); s += a.svg; y += a.h + 22;
      s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 }); y += 20;
      const b = right(P, y); s += b.svg; y += b.h;
    }
    return { svg: s, h: y + P };
  },
};

/** 5 · Wwft or procesvrijstelling: the advocaat decides, the form records. */
D["client-intake-for-law-firms/wwft-or-exemption"] = {
  en: { q: "Which service does the matter concern?", who: "The advocaat decides", a: "For example a property transaction, managing assets, setting up a company, share transactions or comparable tax work", aT: "Wwft applies", aB: "Full client due diligence, and a UBO extract before the business relationship starts", b: "Litigation", bT: "Procesvrijstelling", bB: "The exemption for litigation work, interpreted restrictively", svc: "Service", route: ["Route 1", "Route 2"], foot: "The intake form asks the questions and records the outcome in the file." },
  nl: { q: "Om welke dienst gaat het in deze zaak?", who: "De advocaat beslist", a: "Bijvoorbeeld een vastgoedtransactie, vermogensbeheer, het oprichten van een vennootschap, aandelentransacties of vergelijkbaar fiscaal werk", aT: "De Wwft geldt", aB: "Volledig cliëntenonderzoek, en een UBO-uittreksel voordat de zakelijke relatie begint", b: "Procederen", bT: "Procesvrijstelling", bB: "De vrijstelling voor proceswerk, die beperkt wordt uitgelegd", svc: "Dienst", route: ["Route 1", "Route 2"], foot: "Het intakeformulier stelt de vragen en legt de uitkomst vast in het dossier." },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const q = card(P, y, W - 2 * P, { eyebrow: L.who, title: L.q, dash: true, titleSize: 15 }); s += q.svg; y += q.h;
    if (wide) {
      const cw = (W - 2 * P - 24) / 2, xs = [P, P + cw + 24];
      s += p(`M${W / 2} ${y}L${W / 2} ${y + 14}L${f(xs[0] + cw / 2)} ${y + 14}L${f(xs[0] + cw / 2)} ${y + 33}`, { arrow: true }) + p(`M${W / 2} ${y + 14}L${f(xs[1] + cw / 2)} ${y + 14}L${f(xs[1] + cw / 2)} ${y + 33}`, { arrow: true });
      y += 36;
      const top = [{ eyebrow: L.svc, title: L.a, titleWeight: 400 }, { eyebrow: L.svc, title: L.b }], bot = [{ title: L.aT, body: L.aB, strong: true }, { title: L.bT, body: L.bB, strong: true }];
      const h1 = Math.max(...top.map((o) => card(0, 0, cw, o).h)), h2 = Math.max(...bot.map((o) => card(0, 0, cw, o).h));
      xs.forEach((x, i) => { s += card(x, y, cw, { ...top[i], minH: h1 }).svg + arrowD(x + cw / 2, y + h1 + 3, y + h1 + 25) + card(x, y + h1 + 28, cw, { ...bot[i], minH: h2 }).svg; });
      y += h1 + 28 + h2 + 18;
    } else {
      y += 18;
      [[L.a, L.aT, L.aB, 400], [L.b, L.bT, L.bB, 600]].forEach(([a, t, b, wt], i) => {
        const l = label(P, y, L.route[i], W - 2 * P, C.ink); s += l.svg; y += l.h + 8;
        const f1 = flow(P, y, W - 2 * P, [{ eyebrow: L.svc, title: a, titleWeight: wt }, { title: t, body: b, strong: true }], { wide: false, gap: 22 }); s += f1.svg; y += f1.h + 22;
      });
    }
    const ft = text(P, y, L.foot, { size: 13, color: C.slate, width: W - 2 * P }); s += ft.svg; y += ft.h;
    return { svg: s, h: y + P };
  },
};

/** 6 · Business route vs consumer route (veertiendagenbrief). */
D["automatic-payment-reminders/two-routes"] = {
  en: { b2b: "Business customers · example schedule", b2c: "Consumers · before collection costs", a: [["−3 days", "Heads-up with payment link"], ["+7 days", "First reminder"], ["+21 days", "Second reminder, new deadline"], ["+35 days", "A colleague calls"], ["After that", "Final notice"]], c: [["Reminders", "Friendly, with payment link"], ["Veertiendagenbrief", "Fourteen more days to pay without extra costs"], ["Only then", "Collection costs may be charged"]], person: "Person" },
  nl: { b2b: "Zakelijke klanten · voorbeeldschema", b2c: "Particulieren · vóór incassokosten", a: [["−3 dagen", "Seintje met betaallink"], ["+7 dagen", "Eerste herinnering"], ["+21 dagen", "Tweede herinnering, nieuwe termijn"], ["+35 dagen", "Een collega belt"], ["Daarna", "Aanmaning"]], c: [["Herinneringen", "Vriendelijk, met betaallink"], ["Veertiendagenbrief", "Nog veertien dagen om zonder extra kosten te betalen"], ["Pas daarna", "Incassokosten mogen worden gerekend"]], person: "Mens" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    let l = label(P, y, L.b2b, W - 2 * P, C.ink); s += l.svg; y += l.h + 10;
    const a = flow(P, y, W - 2 * P, L.a.map(([e, t], i) => ({ eyebrow: e, title: t, dash: i === 3, titleSize: 13.5 })), { wide, gap: 16 }); s += a.svg; y += a.h + 26;
    s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 }); y += 22;
    l = label(P, y, L.b2c, W - 2 * P, C.ink); s += l.svg; y += l.h + 10;
    const c = flow(P, y, W - 2 * P, L.c.map(([e, t], i) => ({ eyebrow: e, title: t, strong: i === 1, titleSize: 13.5 })), { wide, gap: 16 }); s += c.svg; y += c.h;
    return { svg: s, h: y + P };
  },
};

/** 7 · The Wwft intake: four automated steps, one human judgement. */
D["what-not-to-automate/four-and-one"] = {
  en: { auto: "Automated", person: "Advocaat", steps: ["Send the list of required documents", "Tick off what arrives", "Send reminders", "Set out the answers in the file", "Assign the risk and write the justification"], foot: "Afterwards the system records the date and the advocaat's name.", label: "Example · Wwft intake" },
  nl: { auto: "Automatisch", person: "Advocaat", steps: ["De lijst met benodigde stukken sturen", "Afvinken wat binnenkomt", "Herinneringen sturen", "De antwoorden in het dossier zetten", "Het risico bepalen en de motivering schrijven"], foot: "Daarna legt het systeem de datum en de naam van de advocaat vast.", label: "Voorbeeld · Wwft-intake" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label); s += l.svg; y += l.h + 12;
    const fl = flow(P, y, W - 2 * P, L.steps.map((t, i) => ({ eyebrow: i === 4 ? L.person : L.auto, title: t, dash: i === 4, titleSize: 13.5 })), { wide, gap: 16 }); s += fl.svg; y += fl.h + 16;
    const ft = text(P, y, L.foot, { size: 13, color: C.slate, width: W - 2 * P }); s += ft.svg; y += ft.h;
    return { svg: s, h: y + P };
  },
};

/** 8 · Tasks vs executions for the same five-step workflow. Zapier counts successful actions, not the trigger (Zapier help); n8n counts one run (n8n pricing). */
D["n8n-vs-make-vs-zapier-for-dutch-firms/tasks-vs-executions"] = {
  en: { label: "Example · one workflow, a trigger and four actions, 100 runs a day", steps: ["Check email", "Save attachment", "Find client in CRM", "Tick off document", "Notify staff"], z: "Zapier · per task (the trigger doesn’t count)", zT: "4 per run", zM: "about 12,000 tasks a month", n: "n8n · per execution", nT: "1 per run", nM: "about 3,000 executions a month" },
  nl: { label: "Voorbeeld · één workflow, een trigger en vier acties, 100 keer per dag", steps: ["E-mail controleren", "Bijlage opslaan", "Klant zoeken in CRM", "Stuk afvinken", "Medewerker seinen"], z: "Zapier · per taak (de trigger telt niet)", zT: "4 per keer", zM: "ongeveer 12.000 taken per maand", n: "n8n · per uitvoering", nT: "1 per keer", nM: "ongeveer 3.000 uitvoeringen per maand" },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label, W - 2 * P); s += l.svg; y += l.h + 12;
    if (!wide) { L.steps.forEach((t, i) => { s += text(P, y, `${i + 1}  ${t}`, { size: 13, color: C.ink }).svg; y += 20; }); y += 12; }
    const row = (title, total, month, perStep) => {
      let o = label(P, y, title, W - 2 * P, C.ink).svg; y += 26;
      const n = 5, tw = wide ? 132 : 0, gap = wide ? 14 : 10, aw = W - 2 * P - tw, nw = (aw - (n - 1) * gap) / n;
      const bodies = L.steps.map((t, i) => (wide ? { title: t, titleSize: 12.5, pad: 10 } : { title: String(i + 1), titleSize: 14, center: true }));
      const H = Math.max(...bodies.map((b) => card(0, 0, nw, b).h)), top = y + (perStep ? 14 : 12);
      if (!perStep) o += rect(P - 6, top - 8, aw + 12, H + 16, { r: 14, fill: "none", stroke: C.ink, sw: 1.5 });
      bodies.forEach((b, i) => {
        const x = P + i * (nw + gap);
        o += card(x, top, nw, { ...b, minH: H }).svg;
        if (i < n - 1) o += line(x + nw, top + H / 2, x + nw + gap, top + H / 2, { stroke: C.cobalt, sw: 1.5 });
        if (perStep && i > 0) o += circle(x + nw / 2, top, 9, { fill: C.cobalt, stroke: C.white, sw: 2 }) + `<text x="${f(x + nw / 2)}" y="${f(top + 4)}" font-size="11" font-weight="600" text-anchor="middle" fill="#fff">1</text>`;
      });
      if (!perStep) o += circle(P + aw - 4, top - 8, 9, { fill: C.ink, stroke: C.white, sw: 2 }) + `<text x="${f(P + aw - 4)}" y="${f(top - 4)}" font-size="11" font-weight="600" text-anchor="middle" fill="#fff">1</text>`;
      y = top + H + (perStep ? 12 : 20);
      if (wide) {
        o += text(W - P, top + H / 2 - 22, total, { size: 18, kind: "display", weight: 800, anchor: "end" }).svg + text(W - P, top + H / 2 + 4, month, { size: 12.5, color: C.slate, anchor: "end", width: tw - 10 }).svg;
      } else { o += text(P, y, `${total} · ${month}`, { size: 13, weight: 600, width: W - 2 * P }).svg; y += 24; }
      return o;
    };
    s += row(L.z, L.zT, L.zM, true); y += 14;
    s += line(P, y, W - P, y, { stroke: C.line2, sw: 1 }); y += 20;
    s += row(L.n, L.nT, L.nM, false);
    return { svg: s, h: y + P - 6 };
  },
};

/** 9 · Your own files vs the whole firm (gedragsregel 15 lid 6), with the article's three matches. */
D["engagement-letters-and-conflict-checks-for-law-firms/whole-firm"] = {
  en: { label: "Gedragsregel 15 lid 6", head: "“Advocaat” covers the whole firm, so the search does too.", rings: ["The whole firm, including closed matters", "Open matters of colleagues", "Your own files"], ex: "Example · new client Bakkerij Smit B.V.", m: ["The supplier was the opposing party in a closed matter, four years ago", "A director appears in a colleague's open file", "A client with an almost identical name, a different company"] },
  nl: { label: "Gedragsregel 15 lid 6", head: "‘Advocaat’ omvat het hele kantoor, dus de zoekopdracht ook.", rings: ["Het hele kantoor, ook gesloten zaken", "Lopende zaken van collega’s", "Uw eigen dossiers"], ex: "Voorbeeld · nieuwe cliënt Bakkerij Smit B.V.", m: ["De leverancier was vier jaar geleden wederpartij in een gesloten zaak", "Een bestuurder komt voor in een lopend dossier van een collega", "Een cliënt met een bijna gelijke naam, een ander bedrijf"] },
  draw(L, W, P, wide) {
    let s = "", y = P;
    const l = label(P, y, L.label); s += l.svg; y += l.h + 4;
    const h = text(P, y, L.head, { size: 15, weight: 600, width: W - 2 * P }); s += h.svg; y += h.h + 16;
    const bw = wide ? 330 : W - 2 * P, bh = wide ? 250 : 236, bx = P, by = y;
    s += rect(bx, by, bw, bh, { r: 14, fill: C.white, stroke: C.line2 });
    s += rect(bx + 22, by + 44, bw - 44, bh - 84, { r: 12, fill: C.paper, stroke: C.line2 });
    s += rect(bx + 50, by + 96, bw - 100, bh - 154, { r: 10, fill: C.white, stroke: C.cobalt });
    const rl = [[bx + 14, by + 14], [bx + 36, by + 58], [bx + 64, by + 110]];
    L.rings.forEach((t, i) => { s += text(rl[i][0], rl[i][1] - 2, t, { size: 10, kind: "mono", upper: true, color: i === 2 ? C.cobalt : C.slate, width: bw - 40 - i * 40 }).svg; });
    const num = (x, yy, n) => circle(x, yy, 10, { fill: C.ink, stroke: C.white, sw: 2 }) + `<text x="${f(x)}" y="${f(yy + 4)}" font-size="11" font-weight="600" text-anchor="middle" fill="#fff">${n}</text>`;
    s += num(bx + bw - 40, by + bh - 20, 1) + num(bx + 36, by + bh - 70, 2) + num(bx + bw - 36, by + 120, 3);
    let ly = wide ? by : by + bh + 20; const lx = wide ? bx + bw + 28 : P, lw = wide ? W - P - lx : W - 2 * P;
    const ex = label(lx, ly, L.ex, lw); s += ex.svg; ly += ex.h + 10;
    L.m.forEach((t, i) => { s += num(lx + 10, ly + 10, i + 1); const tt = text(lx + 30, ly + 1, t, { size: 13.5, width: lw - 30, lh: 1.4 }); s += tt.svg; ly += Math.max(24, tt.h) + 12; });
    y = Math.max(by + bh, ly - 12);
    return { svg: s, h: y + P };
  },
};

/* ---------- write ---------- */
const svgDoc = (W, H, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${f(H)}" width="${W}" height="${f(H)}" font-family="Inter, system-ui, sans-serif">${defs}${body}</svg>`;
let n = 0;
for (const [key, d] of Object.entries(D)) {
  const [slug, name] = key.split("/");
  fs.mkdirSync(path.join("public", "blog", slug), { recursive: true });
  for (const loc of ["nl", "en"]) {
    for (const [W, P, wide, suffix] of [[680, 24, true, ""], [340, 16, false, ".m"]]) {
      const { svg, h } = d.draw(d[loc], W, P, wide);
      // Unique marker id per file: desktop and phone versions sit in the same page.
      const id = `ar-${name}${suffix ? "-m" : ""}`;
      fs.writeFileSync(path.join("public", "blog", slug, `${name}.${loc}${suffix}.svg`), svgDoc(W, h, svg).replace('<marker id="a"', `<marker id="${id}"`).replaceAll("url(#a)", `url(#${id})`));
      n++;
    }
  }
}
console.log("diagrams:", n);
