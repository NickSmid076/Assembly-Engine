"use client";
// The three points beside the example run. Pointing at a point marks the part of the run it is about:
// the tools, the person's step, or the log times. The run itself is RunStage.
import { useState, type ReactNode } from "react";
import RunStage from "./RunStage";
import type { HowItRunsBlock, RunFocus } from "./schema";

export default function RunSection({ intro, points, runs, labels }: Pick<HowItRunsBlock, "points" | "runs" | "labels"> & { intro: ReactNode }) {
  const [focus, setFocus] = useState<RunFocus | null>(null);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:grid-cols-[minmax(0,6fr)_minmax(0,7fr)]">
      <div className="min-w-0 lg:sticky lg:top-28">
      {intro}
      <ul className="mt-8 grid gap-1" onMouseLeave={() => setFocus(null)}>
        {points.map((p) => (
          <li key={p.title} onMouseEnter={() => setFocus(p.focus)}
            className={`grid grid-cols-[14px_minmax(0,1fr)] gap-4 rounded-lg py-3 transition-colors duration-150 lg:-mx-3 lg:px-3 ${focus === p.focus ? "lg:bg-paper" : ""}`}>
            <span aria-hidden className={`mt-[7px] h-2.5 w-2.5 transition-colors duration-150 ${focus && focus !== p.focus ? "bg-line-2" : "bg-cobalt"}`} />
            <p className="text-[16px] leading-[1.5] text-ink/75"><span className="font-semibold text-ink">{p.title}.</span> {p.text}</p>
          </li>
        ))}
      </ul>
      </div>
      <div className="min-w-0">
        <RunStage runs={runs} labels={labels} focus={focus} />
      </div>
    </div>
  );
}
