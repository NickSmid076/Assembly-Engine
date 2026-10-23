"use client";
// The example run on the same paper stage and rail as the service moments: tabs pick how the run starts
// (website enquiry, client upload, weekday 07:00). Plays once when visible and holds; a tab change is a
// hand-off (the old run leaves in 180 ms on a frozen clock, the new one starts at frame 1).
import { AnimatePresence, LayoutGroup, motion, motionValue, usePresence, type MotionValue } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { DUR, EASE } from "@/lib/motion";
import { Rail, StoryProvider, atMap, useStory } from "../services/moments/clock";
import Run from "./Run";
import type { HowItRunsBlock, RunFocus } from "./schema";

function Frozen({ T, children }: { T: MotionValue<number>; children: (T: MotionValue<number>) => ReactNode }) {
  const [isPresent] = usePresence();
  const frozen = useRef<MotionValue<number> | null>(null);
  if (!isPresent && !frozen.current) frozen.current = motionValue(T.get());
  return <>{children(frozen.current ?? T)}</>;
}

export default function RunStage({ runs, labels, focus }: { runs: HowItRunsBlock["runs"]; labels: HowItRunsBlock["labels"]; focus: RunFocus | null }) {
  const [idx, setIdx] = useState(0);
  const run = runs[idx];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const steps = useMemo(() => [{ at: 0, label: run.start.label, state: "s0" }, ...run.rows.map((r, i) => ({ at: r.at, label: r.label, state: `s${i + 1}` }))], [run]);
  const story = useStory(run.duration, steps, idx, ref, true);
  const at = useMemo(() => atMap(steps), [steps]);
  const [w, setW] = useState(520);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = runs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); setIdx(next); tabs.current[next]?.focus();
  };

  return (
    <div ref={ref} className="rounded-2xl bg-paper p-3 [container-type:inline-size] sm:p-6">
      <p className="mb-2 font-mono text-[13px] text-slate">{labels.example}</p>
      <div className="mb-4 border-b border-line">
        <LayoutGroup id={uid}>
          <div role="tablist" aria-label={labels.tabs} className="flex gap-4 cq-md:gap-7">
            {runs.map((r, i) => (
              <button key={r.tab} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`${uid}-t${i}`}
                aria-selected={i === idx} aria-controls={`${uid}-p`} tabIndex={i === idx ? 0 : -1}
                onClick={() => setIdx(i)} onKeyDown={(e) => onKey(e, i)}
                className={`focus-ring relative -mb-px min-h-[44px] min-w-0 rounded-sm pb-2 text-left font-display text-[14px] font-bold leading-tight transition-colors duration-150 hyphens-auto ${i === idx ? "text-ink" : "text-slate hover:text-ink"}`}>
                {r.tab}
                {i === idx && <motion.span layoutId="run-tab" aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-cobalt" transition={{ duration: DUR.state, ease: EASE }} />}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div id={`${uid}-p`} role="tabpanel" aria-labelledby={`${uid}-t${idx}`} className="relative h-[560px] overflow-clip [overflow-clip-margin:24px] cq-md:h-[430px]">
        <AnimatePresence initial={false}>
          <motion.div key={idx} className="absolute inset-0"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE } }}
            initial={{ opacity: 1 }} animate={{ opacity: 1, transition: { duration: DUR.state } }}>
            <Frozen T={story.T}>
              {(T) => (
                <StoryProvider value={{ T, at, D: run.duration, w }}>
                  <Run d={run} focus={focus} logLabel={labels.log} />
                </StoryProvider>
              )}
            </Frozen>
          </motion.div>
        </AnimatePresence>
      </div>
      <Rail steps={steps} step={story.step} T={story.T} D={run.duration} status={story.status} toggle={story.toggle} jump={story.jump} labels={labels} id={`${uid}-p`} />
    </div>
  );
}
