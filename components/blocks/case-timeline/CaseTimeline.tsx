// Case timeline · Pattern P4: the days after launch on one line. Desktop: a horizontal hairline with a tick per
// date; phone: the same line, vertical. The line draws once as it enters; the next step (not happened yet) is
// dashed and in slate, so it never reads as a result. Content: CaseTimelineBlock. Server component.
import type { CaseTimelineBlock } from "./schema";
import { H2, Heading } from "../ui";
import { Change } from "../proof/Proof";

export default function CaseTimeline({ content: c }: { content: CaseTimelineBlock }) {
  const cols = ["", "", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4", "lg:grid-cols-5", "lg:grid-cols-6"][c.items.length];
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[760px]`} />
        <div data-reveal="" className="relative mt-14 lg:mt-20">
          {/* The line: vertical on phone (left), horizontal from lg (top). */}
          <span aria-hidden className="tl-line absolute bottom-2 left-[5px] top-2 w-px origin-top bg-ink lg:hidden" />
          <span aria-hidden className="tl-line-x absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-ink lg:block" />
          <ol data-stagger="" className={`grid grid-cols-[minmax(0,1fr)] gap-10 lg:gap-8 ${cols}`}>
            {c.items.map((it) => (
              <li key={it.title} data-reveal="" className="relative min-w-0 pl-8 lg:pl-0 lg:pt-10">
                <span aria-hidden className={`absolute left-0 top-[9px] h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 lg:top-[5px] ${it.future ? "border-slate bg-white" : "border-ink bg-ink"}`} />
                <p className={`font-mono text-[12px] uppercase tracking-[0.1em] ${it.future ? "text-slate" : "text-ink"}`}>{it.date}</p>
                <h3 className={`mt-2 font-display text-[20px] font-bold leading-[1.25] tracking-[-0.015em] ${it.future ? "text-slate" : "text-ink"}`}>{it.title}</h3>
                {it.figure && (
                  <dl className="mt-4 flex flex-col-reverse">
                    <dt className="mt-1.5 text-[13px] text-slate">{it.figure.label}</dt>
                    <dd className="font-display text-[40px] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink"><Change value={it.figure.value} /></dd>
                  </dl>
                )}
                <p className={`mt-3 text-pretty text-[15px] leading-[1.6] ${it.future ? "text-slate" : "text-ink/80"}`}>{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
