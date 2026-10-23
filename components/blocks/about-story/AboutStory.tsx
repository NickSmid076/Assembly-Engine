// About story · sticky heading left, the story right, then the order of work as a small diagram: the questions
// come first, the tool second, and AI is one tool of several (sometimes none). The arrow draws once on entry.
// Content: AboutStoryBlock. Server component.
import type { AboutStoryBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function AboutStory({ content: c }: { content: AboutStoryBlock }) {
  const O = c.order;
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-line py-20 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[460px]`} />
        </div>
        <div className="min-w-0">
          <div data-stagger="" className="space-y-6">
            {c.paragraphs.map((p) => <p key={p} data-reveal="" className="max-w-[640px] text-pretty text-[18px] leading-[1.65] text-ink">{p}</p>)}
          </div>
          <figure data-reveal="" className="mt-14 overflow-hidden rounded-xl border border-line-2 bg-paper">
            <figcaption className="border-b border-line-2 px-5 py-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink sm:px-7">{O.label}</figcaption>
            <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)]">
              <div className="px-5 py-6 sm:px-7">
                <p className="text-[13px] font-medium text-slate"><span className="font-mono tabular-nums">1</span> · {O.problem}</p>
                <ul className="mt-4 space-y-3">
                  {O.questions.map((q) => <li key={q} className="text-[16px] font-medium leading-[1.4] text-ink">{q}</li>)}
                </ul>
              </div>
              <div aria-hidden className="flex items-center justify-center py-1 sm:py-0">
                <span className="inline-block rotate-90 font-display text-[26px] text-ink sm:rotate-0">→</span>
              </div>
              <div className="border-t border-line-2 px-5 py-6 sm:border-l sm:border-t-0 sm:px-7">
                <p className="text-[13px] font-medium text-slate"><span className="font-mono tabular-nums">2</span> · {O.tool}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {O.tools.map((t) => <li key={t} className="rounded-md border border-line-2 bg-white px-3 py-1.5 text-[15px] font-medium text-ink">{t}</li>)}
                  <li className="rounded-md border border-dashed border-slate px-3 py-1.5 text-[15px] font-medium text-ink">{O.none}</li>
                </ul>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
