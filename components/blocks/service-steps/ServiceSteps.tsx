// How it works (interim) · Pattern P4 ledger on ink: three numbered steps on one rule.
// Each service's signature component replaces this block as it is built (docs/service-pages-plan.md).
// Content: ServiceStepsBlock (ACF layout `service_steps`).
import type { ServiceStepsBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function ServiceSteps({ content: c }: { content: ServiceStepsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-ink text-white">
      <div className="frame frame-dark py-20 sm:py-28 lg:py-32">
        <p className="eyebrow text-peri">{c.label}</p>
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} accentClass="text-white/60" stacked className={`${H2} mt-5 max-w-[820px]`} />
        <ol data-stagger="" className="mt-14 grid grid-cols-[minmax(0,1fr)] border-t border-white/15 md:grid-cols-3 lg:mt-20">
          {c.steps.map((s, i) => (
            <li key={s.title} data-reveal="" className="grid grid-cols-[48px_minmax(0,1fr)] border-b border-white/10 py-7 md:block md:border-b-0 md:border-l md:px-6 md:py-8 md:first:border-l-0 md:first:pl-0">
              <span aria-hidden className="font-display text-[28px] font-bold leading-none tabular-nums text-peri md:text-[44px]">{i + 1}</span>
              <div className="min-w-0 md:mt-10">
                <h3 className="font-display text-[20px] font-bold leading-[1.25] tracking-[-0.015em] [overflow-wrap:anywhere] md:text-[22px]">{s.title}</h3>
                <p className="mt-2 max-w-[340px] text-pretty text-[16px] leading-[1.55] text-white/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
