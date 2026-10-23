// Case findings · Pattern P7 as an artefact: the client inspects homes; here the old site gets the inspection.
// Sticky heading left, the report right: one finding per row, each with an attention marker.
// Content: CaseFindingsBlock. Server component.
import type { CaseFindingsBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function CaseFindings({ content: c }: { content: CaseFindingsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-paper">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[460px]`} />
        </div>
        <div data-reveal="" className="min-w-0 overflow-hidden rounded-xl border border-line-2 bg-white">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 sm:px-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink">{c.report.label}</p>
            <p className="text-[13px] text-slate">{c.report.meta}</p>
          </div>
          <ol data-stagger="" className="divide-y divide-line">
            {c.items.map((it, i) => (
              <li key={it} data-reveal="" className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 px-5 py-5 sm:grid-cols-[40px_minmax(0,1fr)] sm:px-7">
                <span className="pt-[3px] font-mono text-[13px] tabular-nums text-slate">{String(i + 1).padStart(2, "0")}</span>
                <p className="flex gap-3 text-pretty text-[16px] leading-[1.55] text-ink">
                  <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] bg-warn" />
                  <span>{it}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
