// Case results · Pattern P6 (proof band), the page's dark chapter. The lead figure is a change (3 → 20+):
// the arrow draws once, then the "after" lands. The rest is grouped by source so each source is printed once.
// Only measured numbers; the note says what wasn't measured. Content: CaseResultsBlock. Server component.
import type { CaseResultsBlock } from "./schema";
import { H2, Heading } from "../ui";
import { Change } from "../proof/Proof";

const Source = ({ children }: { children: string }) => <p className="mt-5 text-[13px] leading-[1.45] text-white/65">{children}</p>;

export default function CaseResults({ content: c }: { content: CaseResultsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-ink text-white">
      <div className="frame frame-dark py-20 sm:py-28 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} accentClass="text-white/65" className={`${H2} max-w-[760px]`} />
        <div data-stagger="" className="mt-14 grid grid-cols-[minmax(0,1fr)] border-t border-white/15 lg:mt-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div data-reveal="" className="min-w-0 py-8 lg:pr-12">
            <dl className="flex flex-col-reverse">
              <dt className="mt-3 text-[16px] font-medium text-white">{c.lead.label}</dt>
              <dd className="font-display text-[64px] font-bold leading-none tracking-[-0.045em] tabular-nums sm:text-[88px]"><Change value={c.lead.value} /></dd>
            </dl>
            <Source>{c.lead.source}</Source>
          </div>
          <div className="min-w-0 border-t border-white/15 lg:border-l lg:border-t-0">
            {c.groups.map((g, gi) => (
              <div key={g.source} data-reveal="" className={`min-w-0 py-8 lg:pl-12 ${gi ? "border-t border-white/15" : ""}`}>
                <dl className={`grid gap-x-6 gap-y-8 ${g.items.length > 1 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
                  {g.items.map((m) => (
                    <div key={m.label} className="flex min-w-0 flex-col-reverse justify-end">
                      <dt className="mt-2 text-[14px] leading-[1.35] text-white/80 hyphens-auto [overflow-wrap:anywhere]">{m.label}</dt>
                      <dd className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] tabular-nums sm:text-[48px]"><Change value={m.value} /></dd>
                    </div>
                  ))}
                </dl>
                <Source>{g.source}</Source>
              </div>
            ))}
          </div>
        </div>
        {c.note && <p data-reveal="" className="mt-4 max-w-[640px] border-t border-white/15 pt-5 text-[14px] leading-[1.5] text-white/65">{c.note}</p>}
      </div>
    </section>
  );
}
