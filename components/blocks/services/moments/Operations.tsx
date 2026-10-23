"use client";
// Moment 3 · Operational Automation (10 s: staccato arrivals, calm close).
// A client file fills itself: documents arrive one by one, are recognised, and drop into the right
// divider of an isometric dossier; the checklist completes; the deadline bar stops well short of the date.
// Isometric depth drawn in SVG with the hero's projection (iso() in hero-home/engine-geometry), so it
// rhymes with the assembly engine. In an orthographic iso view a vertical drop is a plain 2D translate.
import { iso } from "../../hero-home/engine-geometry";
import { M, MG, antic, k, lerp, useCount, useStoryCtx } from "./clock";
import type { OperationsMoment } from "./schema";
import { CARD, MONO, Tick } from "./ui";

const lin = (x: number) => x;

/* ---------------------------------------------------------------- geometry (world units, y up) */
const W = 4.2, D = 2, H = 1, S = 60; // box width (x), depth (z), wall height; px per unit
const COMP = W / 3; // three compartments along x
const DIV_X = [0, 1, 2].map((i) => i * COMP + 0.06);
const SHEET = { z0: 0.35, z1: 1.75, y0: 0.05, y1: 1.24 };
const TAB = { z0: 0.3, z1: 1.02, y1: 1.4 };
const LIFT = 0.75; // how far above its slot a document hovers before it drops
const pt = (x: number, y: number, z: number) => iso(x, y, z).map((n) => n * S) as [number, number];
const poly = (pts: [number, number, number][]) => pts.map((p) => pt(...p).map((n) => n.toFixed(1)).join(",")).join(" ");
const xRect = (x: number, z0: number, z1: number, y0: number, y1: number) => poly([[x, y0, z0], [x, y0, z1], [x, y1, z1], [x, y1, z0]]);
const zRect = (z: number, x0: number, x1: number, y0: number, y1: number) => poly([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]]);
const yRect = (y: number, x0: number, x1: number, z0: number, z1: number) => poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]);

const VB = (() => {
  // Documents hover above the drawing's top edge while they arrive (the SVG overflows visibly).
  const ps = [pt(0, 0, D), pt(W, 0, D), pt(W, 0, 0), pt(0, TAB.y1 + 0.2, 0), pt(W, TAB.y1, 0), pt(0, TAB.y1 + 0.2, D)];
  const xs = ps.map((p) => p[0]), ys = ps.map((p) => p[1]);
  const pad = 6;
  return { x: Math.min(...xs) - pad, y: Math.min(...ys) - pad, w: Math.max(...xs) - Math.min(...xs) + 2 * pad, h: Math.max(...ys) - Math.min(...ys) + 2 * pad };
})();
/** Position of a world point as % of the drawing (for the HTML labels laid over it). */
const pct = (x: number, y: number, z: number) => { const [a, b] = pt(x, y, z); return { left: `${((a - VB.x) / VB.w) * 100}%`, top: `${((b - VB.y) / VB.h) * 100}%` }; };
const DROP = (LIFT * 2 * S) / Math.sqrt(6); // screen distance of the lift

const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

export default function Operations({ d }: { d: OperationsMoment }) {
  const { at } = useStoryCtx();
  const gap = 0.9; // seconds between arrivals (staccato)
  const slot = d.docs.map((doc, i) => d.docs.slice(0, i).filter((o) => o.divider === doc.divider).length);
  const arrive = d.docs.map((_, i) => at.arrive + i * gap);
  const drop = arrive.map((a) => a + (at.sort - at.arrive));
  const landed = drop.map((a) => a + 0.5);
  const n = useCount(landed);
  const perDivider = d.dividers.map((_, j) => d.docs.filter((doc, i) => doc.divider === j && i < n).length);
  const total = d.docs.length;
  const frac = days(d.deadline.requested, d.deadline.done) / days(d.deadline.requested, d.deadline.due);
  const doneAt = at.deadline + 1.1;

  // Paint order: back walls, then per compartment its divider and documents, then the front walls.
  const docsIn = (j: number) => d.docs.map((doc, i) => ({ doc, i })).filter((o) => o.doc.divider === j);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex min-h-0 flex-1 flex-col gap-3 cq-md:flex-row">
        {/* Dossier */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <p className={MONO}>{d.via}</p>
          <div className="mt-1 grid min-h-[20px] text-[13px] leading-snug [&>*]:[grid-area:1/1]">
            {d.docs.map((doc, i) => (
              <M key={doc.name} as="p" f={(t) => ({ opacity: k(t, arrive[i] + 0.2, 0.2) * (1 - k(t, (arrive[i + 1] ?? at.complete) + 0.05, 0.15)), y: lerp(4, 0, k(t, arrive[i] + 0.2, 0.3)) })}>
                <span className="text-slate">{d.recognised}:</span> <span className="font-medium text-ink">{doc.name}</span> <span className="text-cobalt">→ {d.dividers[doc.divider]}</span>
              </M>
            ))}
          </div>
          <div className="relative mx-auto mt-6 min-h-0 w-full max-w-[360px] flex-1">
            <div className="relative mx-auto h-full max-w-full" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
              <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <g strokeLinejoin="round">
                  <polygon points={yRect(0, 0, W, 0, D)} fill="#E4E8F0" />
                  <polygon points={xRect(0, 0, D, 0, H)} fill="#D5DBE6" />
                  <polygon points={zRect(0, 0, W, 0, H)} fill="#EDF1FF" />
                  {d.dividers.map((_, j) => (
                    <g key={j}>
                      <polygon points={xRect(DIV_X[j], 0.08, D - 0.08, 0, H + 0.04)} fill="#FFFFFF" stroke="#D5DBE6" strokeWidth="1" />
                      <polygon points={xRect(DIV_X[j], TAB.z0, TAB.z1, H + 0.04, TAB.y1)} fill="#EDF1FF" stroke="#2E5BFF" strokeWidth="1" />
                      {docsIn(j).map(({ doc, i }) => {
                        const x = DIV_X[j] + 0.32 + slot[i] * 0.3;
                        return (
                          <MG key={doc.name} f={(t) => {
                            const hover = lerp(-DROP - 16, -DROP, k(t, arrive[i], 0.45));
                            const p = antic(k(t, drop[i], 0.5, lin));
                            const settle = 2.5 * Math.sin(Math.PI * k(t, drop[i] + 0.5, 0.22, lin));
                            return { opacity: k(t, arrive[i], 0.25), y: lerp(hover, 0, p) + settle };
                          }}>
                            <polygon points={xRect(x, SHEET.z0, SHEET.z1, SHEET.y0, SHEET.y1)} fill="#FFFFFF" stroke="#C3CCDD" strokeWidth="1" />
                            <polygon points={xRect(x, SHEET.z0 + 0.15, SHEET.z0 + 0.45, SHEET.y1 - 0.2, SHEET.y1 - 0.1)} fill="#2E5BFF" />
                            {[0.38, 0.55, 0.72].map((y) => <polygon key={y} points={xRect(x, SHEET.z0 + 0.15, SHEET.z1 - 0.25, SHEET.y1 - y - 0.05, SHEET.y1 - y)} fill="#D5DBE6" />)}
                          </MG>
                        );
                      })}
                    </g>
                  ))}
                  <polygon points={zRect(D, 0, W, 0, H)} fill="#AEBADB" />
                  <polygon points={xRect(W, 0, D, 0, H)} fill="#CED6EC" />
                  <polyline points={poly([[0, H, D], [W, H, D], [W, H, 0]])} fill="none" stroke="#8FA0BF" strokeWidth="1" />
                </g>
              </svg>
              {/* Divider labels (HTML, so they stay sharp and ≥ 13px) */}
              {d.dividers.map((name, j) => (
                <span key={name} style={pct(DIV_X[j], TAB.y1, (TAB.z0 + TAB.z1) / 2)}
                  className="absolute -translate-x-1/2 -translate-y-[115%] whitespace-nowrap rounded-md border border-line bg-white px-1.5 py-0.5 text-[13px] leading-tight text-ink">
                  {name} <span className="font-mono tabular-nums text-slate">{perDivider[j]}</span>
                </span>
              ))}
              <M f={(t) => ({ opacity: k(t, at.complete, 0.3), scale: lerp(0.9, 1, k(t, at.complete, 0.45)) })} style={pct(W / 2, H * 0.45, D)}
                className="absolute -translate-x-1/2 -translate-y-1/2">
                <span className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[13px] font-semibold text-ok-ink shadow-[0_1px_2px_rgba(11,27,51,.08)]">
                  <Tick at={at.complete + 0.15} className="h-4 w-4" />{d.dossier.complete}
                </span>
              </M>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className={`${CARD} w-full shrink-0 px-4 py-3 cq-md:w-[42%] cq-md:self-start`}>
          <p className="font-display text-[15px] font-bold leading-tight text-ink">{d.dossier.title}</p>
          <p className="text-[13px] text-slate">{d.dossier.client} · {d.checklist.label}</p>
          <ul className="mt-2 hidden space-y-1.5 border-t border-line pt-2 cq-md:block">
            {d.docs.map((doc, i) => (
              <M as="li" key={doc.name} f={(t) => ({ opacity: lerp(0.45, 1, k(t, landed[i], 0.25)) })} className="flex items-start justify-between gap-2 text-[13px] leading-snug">
                <span className="min-w-0 text-ink">{doc.name}</span>
                <Tick at={landed[i]} className="mt-px h-4 w-4" />
              </M>
            ))}
          </ul>
          <div className="mt-2 grid border-t border-line pt-2 text-[13px] [&>*]:[grid-area:1/1]">
            <M f={(t) => ({ opacity: 1 - k(t, at.complete, 0.25) })} as="p" className="font-mono tabular-nums text-slate">
              {d.checklist.progress.replace("{n}", String(n)).replace("{total}", String(total))}
            </M>
            <M f={(t) => ({ opacity: k(t, at.complete + 0.25, 0.3) })} as="p" className="font-semibold text-ok-ink">{d.checklist.done}</M>
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div className={`${CARD} shrink-0 px-4 pb-3 pt-2.5`}>
        <div className="flex items-baseline justify-between gap-3 text-[13px]">
          <span className={MONO}>{d.deadline.start_label}</span>
          <span className="font-mono text-ink">{d.deadline.due_label}</span>
        </div>
        <div className="relative mt-2 h-2 rounded-full bg-line">
          <M f={(t) => ({ scaleX: frac * k(t, at.deadline, 1.1) })} style={{ transformOrigin: "0 50%" }} className="absolute inset-0 rounded-full bg-cobalt" />
          <M f={(t) => ({ opacity: k(t, doneAt, 0.35) })} className="absolute inset-y-0 right-0 rounded-r-full bg-ok-soft ring-1 ring-inset ring-ok/30" style={{ left: `${frac * 100}%` }} />
          <span aria-hidden className="absolute -top-1 right-0 h-4 w-0.5 rounded bg-ink" />
        </div>
        <div className="relative mt-2 min-h-[18px] text-[13px] leading-tight">
          <M f={(t) => ({ opacity: k(t, doneAt - 0.2, 0.3) })} className="absolute left-0 top-0 flex items-center gap-1.5 font-medium text-ink">
            <Tick at={doneAt - 0.1} className="h-4 w-4" />{d.deadline.done_label}
          </M>
          <M f={(t) => ({ opacity: k(t, doneAt + 0.15, 0.35), x: lerp(-6, 0, k(t, doneAt + 0.15, 0.4)) })} className="absolute right-0 top-0 font-semibold text-ok-ink">
            {d.deadline.spare}
          </M>
        </div>
      </div>
    </div>
  );
}
