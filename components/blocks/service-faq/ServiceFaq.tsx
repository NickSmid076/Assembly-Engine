// FAQ · Pattern P10: heading left, native <details> list right (works without script).
// Content: ServiceFaqBlock (ACF layout `service_faq`).
import { ChevronDown } from "@/components/icons";
import type { ServiceFaqBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function ServiceFaq({ content: c }: { content: ServiceFaqBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} stacked className={`${H2} max-w-[420px]`} />
        <div className="border-t-2 border-ink">
          {c.items.map((f) => (
            <details key={f.q} className="group border-b border-line-2">
              <summary className="focus-ring flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[18px] font-bold leading-[1.35] tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="max-w-[640px] pb-6 text-pretty text-[16px] leading-[1.6] text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
