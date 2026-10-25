"use client";
// Flow diagram · a workflow as nodes joined by connectors (the invoicing signature's station language). When it
// scrolls into view it plays once: each node lights up in turn and the connector after it fills (framer scaleX
// across on md+, scaleY down on phone). A replay button runs it again. Human steps are dashed with a person
// mark. Before playing (and without JS) the full diagram is visible in neutral; reduced motion jumps to the end
// state after hydration, so the first frame matches the server. Content: FlowDiagramBlock.
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { FlowDiagramBlock } from "./schema";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { EASE_IN_OUT } from "@/lib/motion";
import { Icon } from "@/components/icons";

const BEAT = 650;

export default function FlowDiagram({ content: c }: { content: FlowDiagramBlock }) {
  const n = c.nodes.length;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  // Five or six steps in a row: tighter gaps and labels, so words hyphenate instead of breaking anywhere.
  const dense = c.nodes.length >= 5;
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);
  const busy = run > 0 && step < n - 1 && !reduce;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun((r) => r || 1); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) { setStep(n - 1); return; }
    if (!run) return;
    setStep(0);
    let i = 0;
    const id = setInterval(() => { i += 1; setStep(i); if (i >= n - 1) clearInterval(id); }, BEAT);
    return () => clearInterval(id);
  }, [run, reduce, n]);

  return (
    <figure ref={ref} className="rounded-xl border border-line bg-paper p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        {c.title ? <p className="font-display text-[16px] font-bold leading-[1.3] text-ink">{c.title}</p> : <span />}
        <p className="font-mono text-[12px] text-slate">{c.labels.example}</p>
      </div>
      <ol aria-label={c.labels.steps} className={`flex flex-col gap-5 md:flex-row ${dense ? "md:gap-4" : "md:gap-6"}`}>
        {c.nodes.map((node, i) => {
          const on = step >= i;
          const filled = step > i;
          return (
            <li key={i} className="relative min-w-0 md:flex-1">
              <div className={`flex h-full flex-col rounded-lg border bg-white py-3 ${dense ? "px-2.5" : "px-3"} transition-[border-color,box-shadow] duration-300 ${node.human ? "border-dashed" : ""} ${on ? (node.human ? "border-ink/50" : "border-cobalt shadow-[0_0_0_3px_#EDF1FF]") : "border-line-2"}`}>
                <span aria-hidden className={`grid h-6 w-6 place-items-center rounded-full font-mono text-[11px] tabular-nums transition-[background-color,color] duration-300 ${node.human ? "border border-dashed border-ink/40 bg-white text-ink" : on ? "bg-cobalt text-white" : "bg-ice text-cobalt"}`}>
                  {node.human ? <Icon name="person" className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <p className={`mt-2.5 text-pretty font-display font-bold leading-[1.3] text-ink hyphens-auto [overflow-wrap:break-word] ${dense ? "text-[14.5px] md:text-[13.5px]" : "text-[14.5px]"}`}>{node.label}</p>
                {node.detail && <p className="mt-1 text-pretty text-[13px] leading-[1.4] text-slate">{node.detail}</p>}
                {node.human && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate">{c.labels.human}</p>}
              </div>
              {i < n - 1 && (
                <span aria-hidden className={`pointer-events-none absolute left-6 top-full h-5 w-0.5 md:left-full md:top-[26px] md:h-0.5 ${dense ? "md:w-4" : "md:w-6"}`}>
                  <span className="absolute inset-0 bg-line-2" />
                  <motion.span className="absolute inset-0 hidden origin-left bg-cobalt md:block" initial={false} animate={{ scaleX: filled ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE_IN_OUT }} />
                  <motion.span className="absolute inset-0 origin-top bg-cobalt md:hidden" initial={false} animate={{ scaleY: filled ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE_IN_OUT }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {c.caption ? <figcaption className="min-w-0 max-w-[460px] text-pretty text-[14px] leading-[1.5] text-slate">{c.caption}</figcaption> : <span />}
        <button type="button" aria-disabled={busy} onClick={() => { if (!busy) setRun((r) => r + 1); }}
          className="focus-ring inline-flex min-h-[40px] items-center gap-2 rounded-md border border-line-2 bg-white px-3 text-[14px] font-medium text-ink transition-[border-color,opacity] duration-150 hover:border-ink/40 aria-disabled:opacity-60">
          <Icon name="refresh" className="h-4 w-4" />{c.labels.replay}
        </button>
      </div>
    </figure>
  );
}
