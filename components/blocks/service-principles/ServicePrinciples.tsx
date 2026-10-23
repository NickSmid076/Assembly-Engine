// The promises · Pattern P7 variant: three statements you can hold us to, numbered, side by side under one rule.
// Content: ServicePrinciplesBlock (ACF layout `service_principles`).
import type { ServicePrinciplesBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function ServicePrinciples({ content: c }: { content: ServicePrinciplesBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-paper">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} stacked className={`${H2} max-w-[760px]`} />
        <ol data-stagger="" className={`mt-14 grid grid-cols-[minmax(0,1fr)] gap-x-10 lg:mt-20 ${c.items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
          {c.items.map((it, i) => (
            <li key={it.title} data-reveal="" className="border-t-2 border-ink pb-10 pt-5 md:pb-0">
              <span aria-hidden className="font-mono text-[13px] tabular-nums text-slate">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere] md:text-[24px]">{it.title}</h3>
              <p className="mt-3 max-w-[360px] text-pretty text-[16px] leading-[1.55] text-ink/75">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
