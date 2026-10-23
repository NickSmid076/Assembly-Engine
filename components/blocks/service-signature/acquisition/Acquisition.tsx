"use client";
// "Wie past er, en waarom?" · the acquisition signature (2D). Left: the ideal client profile (sector, size, region)
// and this week's numbers. Right: this week's signals, each firm scored against the profile with its three reasons
// in view; firms that fit rise above the line (layout animation), the rest sink below it. Choose a firm to see the
// first message drafted for it; nothing is sent until a person approves, and an approval counts in the week.
// The same component serves phone and desktop; reduced motion gets the end state (MotionRoot: reducedMotion="user").
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { DUR, EASE, EASE_IN_OUT } from "@/lib/motion";
import type { AcquisitionSignature, AcqDimension } from "../schema";

const DIMS: AcqDimension[] = ["sector", "size", "region"];
const MOVE = { layout: { duration: DUR.state, ease: EASE_IN_OUT } };
// Text never fades (it would dip below AA contrast mid-way): a new draft nudges in at full opacity, and a changing
// number rolls through a clipped box.
const SWAP = { initial: { y: 8 }, animate: { y: 0 }, exit: {}, transition: { duration: DUR.state, ease: EASE } };
const ROLL = { initial: { y: "110%" }, animate: { y: 0 }, exit: { y: "-110%" }, transition: { duration: DUR.state, ease: EASE_IN_OUT } };

const segBtn = (on: boolean) =>
  `focus-ring min-h-[44px] rounded-lg border px-2 py-1.5 text-left font-display text-[13.5px] font-bold leading-[1.2] transition-[background-color,border-color,color] duration-150 ${on ? "border-white bg-white text-ink" : "border-white/15 text-white/80 hover:border-white/40"}`;

function Mark({ ok, className = "" }: { ok: boolean; className?: string }) {
  return ok
    ? <svg viewBox="0 0 12 12" aria-hidden className={`h-3 w-3 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>
    : <svg viewBox="0 0 12 12" aria-hidden className={`h-3 w-3 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" /></svg>;
}

/** A number that changes: the new value rolls in, the old one out, clipped to its box (instant under reduced motion). */
function Flip({ value, className }: { value: number | string; className?: string }) {
  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span key={value} className="col-start-1 row-start-1" {...ROLL}>{value}</motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Acquisition({ data: d }: { data: AcquisitionSignature }) {
  const L = d.labels;
  const [icp, setIcp] = useState<Record<AcqDimension, string>>({ sector: d.initial.sector, size: d.initial.size, region: d.initial.region });
  const [sel, setSel] = useState(d.initial.firm);
  const [sent, setSent] = useState<string[]>([]);

  const scored = d.firms.map((f, i) => {
    const hits = DIMS.map((k) => f.facts[k].matches.includes(icp[k]));
    return { f, i, hits, score: hits.filter(Boolean).length };
  });
  const fits = scored.filter((x) => x.score === DIMS.length);
  const rest = scored.filter((x) => x.score < DIMS.length).sort((a, b) => b.score - a.score || a.i - b.i);
  const firm = scored.find((x) => x.f.id === sel) ?? scored[0];
  const firmFits = firm.score === DIMS.length;
  const isSent = sent.includes(firm.f.id);
  const pending = fits.filter((x) => !sent.includes(x.f.id)).length;
  const fill = (s: string, k: string, v: string | number) => s.replace(`{${k}}`, String(v));
  const dimLabel = (k: AcqDimension) => L.dimensions[k];

  const row = ({ f, hits, score }: (typeof scored)[number]) => {
    const on = f.id === sel;
    const fit = score === DIMS.length;
    return (
      <motion.li key={f.id} layout="position" transition={MOVE} className="relative z-[1]">
        <button type="button" aria-pressed={on} aria-controls="acq-draft" onClick={() => setSel(f.id)}
          className={`focus-ring w-full rounded-xl border px-3 py-2.5 text-left transition-[background-color,border-color,color] duration-150 sm:px-3.5 ${on ? "border-cobalt bg-cobalt text-white" : fit ? "border-line bg-paper hover:border-ink/30" : "border-dashed border-line-2 bg-white hover:border-ink/30"}`}>
          <span className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className={`font-display text-[14.5px] font-bold ${on || fit ? "" : "text-slate"}`}>{f.name}</span>
                {sent.includes(f.id) && (
                  <span className={`inline-flex items-center gap-1 rounded px-1.5 font-mono text-[12px] ${on ? "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.55)]" : "bg-ok-soft text-ok-ink"}`}>
                    <Mark ok className="h-2.5 w-2.5" />{L.contacted}
                  </span>
                )}
              </span>
              <span className={`mt-0.5 block text-[13px] leading-[1.35] ${on ? "text-white" : "text-slate"}`}>
                <span className={`font-semibold ${on ? "" : "text-ink"}`}>{f.signal.type}</span> · {f.signal.text} · <span className="whitespace-nowrap">{f.signal.when}</span>
              </span>
            </span>
            <span className={`shrink-0 rounded-md px-2 py-1 font-mono text-[12px] tabular-nums transition-[background-color,color] duration-150 ${on ? "bg-white text-cobalt" : fit ? "bg-ink text-white" : "border border-line-2 text-slate"}`}>
              <span className="sr-only">{L.fits}: </span><Flip value={fill(L.score, "n", score)} />
            </span>
          </span>
          {/* The reasons: the firm's own value per dimension, ticked when it matches the profile. */}
          <span className="mt-2 flex flex-wrap gap-1.5">
            {DIMS.map((k, j) => (
              <span key={k} className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[12.5px] leading-[1.3] transition-[background-color,color] duration-150 ${
                on ? (hits[j] ? "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.55)]" : "text-white line-through decoration-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,.3)]")
                  : hits[j] ? "bg-ok-soft text-ok-ink" : "bg-paper text-slate line-through decoration-slate/60"}`}>
                <Mark ok={hits[j]} />
                <span className="sr-only">{dimLabel(k)}: </span>{f.facts[k].value}
              </span>
            ))}
          </span>
        </button>
      </motion.li>
    );
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-10 xl:gap-x-14">
      {/* The profile (input) and this week's numbers. */}
      <div className="flex min-w-0 flex-col lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-[13px] text-white/65">{L.example}</p>
        <p id="acq-hint" className="mt-1 text-[14px] text-white/80">{L.hint}</p>

        <p className="mt-6 font-display text-[17px] font-bold text-white">{L.icp}</p>
        <div className="mt-3 space-y-3">
          {DIMS.map((k) => (
            <fieldset key={k}>
              <legend className="mb-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{dimLabel(k)}</legend>
              <div className="grid grid-cols-3 gap-1.5">
                {d.options[k].map((o) => (
                  <button key={o.id} type="button" aria-pressed={icp[k] === o.id} aria-describedby="acq-hint"
                    onClick={() => setIcp((v) => ({ ...v, [k]: o.id }))} className={`${segBtn(icp[k] === o.id)} hyphens-auto [overflow-wrap:anywhere]`}>
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {/* This week, as reported weekly. Approving a draft counts as contacted straight away. */}
        <div className="mt-8 border-t border-white/15 pt-5">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{L.week}</p>
          <dl className="mt-3 grid grid-cols-3 gap-3">
            {([["contacted", d.week.contacted + sent.length], ["replied", d.week.replied], ["booked", d.week.booked]] as const).map(([k, n]) => (
              <div key={k} className="flex min-w-0 flex-col">
                <dt className="text-[13px] leading-[1.3] text-white/70">{L[k]}</dt>
                <dd className="order-first font-display text-[34px] font-bold leading-none tabular-nums text-white"><Flip value={n} /></dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[13.5px] text-peri" aria-live="polite">{fill(L.pending, "n", pending)}</p>
        </div>
      </div>

      {/* The signals, scored (output), and the first message for the chosen firm. */}
      <div className="min-w-0 overflow-hidden rounded-2xl bg-white text-ink">
        <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
          <p className="min-w-0 font-display text-[15px] font-bold">{L.signals}</p>
          <p className="shrink-0 font-mono text-[12px] text-slate">{d.tool}</p>
        </div>

        <LayoutGroup>
          <ul role="list" aria-describedby="acq-hint" className="space-y-1.5 p-3 sm:p-4">
            <motion.li layout="position" transition={MOVE} className="relative z-0 flex items-center gap-2 px-1 pb-0.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink">
              {L.fits} <span className="tabular-nums text-slate">· {fits.length}</span>
            </motion.li>
            {fits.map(row)}
            <motion.li layout="position" transition={MOVE} className="relative z-0 flex items-center gap-2 px-1 pb-0.5 pt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-slate">
              {L.noFit} <span className="tabular-nums">· {rest.length}</span>
            </motion.li>
            {rest.map(row)}
          </ul>
        </LayoutGroup>

        {/* The draft for the chosen firm. Fixed height so the page never moves when it changes. */}
        <div id="acq-draft" aria-live="polite" className="relative min-h-[236px] border-t border-line bg-paper px-4 py-4 sm:min-h-[214px] sm:px-5">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={`${firm.f.id}-${firmFits || isSent ? "draft" : "none"}`} {...SWAP}>
              {firmFits || isSent ? (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{L.draft} · {d.tool}</p>
                    <p className="min-w-0 truncate text-[13px] text-slate">{L.to} <span className="font-semibold text-ink">{firm.f.contact}</span></p>
                  </div>
                  <p className="mt-2 text-[13.5px]"><span className="text-slate">{L.subject}:</span> <span className="font-semibold">{firm.f.draft.subject}</span></p>
                  <div className="mt-2 space-y-0.5 text-[14px] leading-[1.5] text-ink/85">
                    {firm.f.draft.lines.map((l) => <p key={l}>{l}</p>)}
                  </div>
                  <div className="mt-3 flex min-h-[44px] flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    {isSent ? (
                      <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ok-ink">
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-ok-ink text-white"><Mark ok className="h-2.5 w-2.5" /></span>
                        {fill(fill(L.approved, "name", d.approver), "time", firm.f.draft.sent)}
                      </p>
                    ) : (
                      <>
                        <p className="flex items-center gap-2 text-[13.5px] text-slate">
                          <span aria-hidden className="h-2.5 w-2.5 rounded-full border-2 border-warn" />{fill(L.waiting, "name", d.approver)}
                        </p>
                        <button type="button" onClick={() => setSent((v) => [...v, firm.f.id])}
                          className="focus-ring min-h-[44px] rounded-lg bg-ink px-4 font-display text-[14px] font-bold text-white transition-colors duration-150 hover:bg-cobalt">
                          {L.approve}
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{L.draft} · {firm.f.name}</p>
                  <p className="mt-2 max-w-[440px] text-[14px] leading-[1.5] text-ink/85">{L.noDraft}</p>
                  <ul role="list" className="mt-3 space-y-1">
                    {DIMS.map((k, j) => (
                      <li key={k} className={`flex items-center gap-2 text-[13.5px] ${firm.hits[j] ? "text-ok-ink" : "text-ink"}`}>
                        <Mark ok={firm.hits[j]} /><span className="text-slate">{dimLabel(k)}:</span> {firm.f.facts[k].value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
