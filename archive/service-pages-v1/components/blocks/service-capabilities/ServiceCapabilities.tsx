// What it covers · Pattern P7 (hairline rows): the heading holds the left column, the items run as a
// two-column ledger on the right. Replaces the old capability marquee: everything readable at once.
// Content: ServiceCapabilitiesBlock (ACF layout `service_capabilities`).
import type { ServiceCapabilitiesBlock } from "./schema";
import { Heading } from "../ui";

export default function ServiceCapabilities({ content: c }: { content: ServiceCapabilitiesBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-32">
        <div className="min-w-0">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className="max-w-[460px] font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] [overflow-wrap:anywhere] sm:text-[38px] lg:sticky lg:top-28 lg:text-[36px] xl:text-[40px]" />
        </div>
        <ul data-stagger="" className="grid grid-cols-[minmax(0,1fr)] gap-x-10 border-t-2 border-ink sm:grid-cols-2">
          {c.items.map((it) => (
            <li key={it.title} data-reveal="" className="border-b border-line-2 py-5">
              <h3 className="font-display text-[18px] font-bold leading-[1.3] tracking-[-0.01em] [overflow-wrap:anywhere]">{it.title}</h3>
              <p className="mt-1 text-pretty text-[15.5px] leading-[1.55] text-ink/75">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
