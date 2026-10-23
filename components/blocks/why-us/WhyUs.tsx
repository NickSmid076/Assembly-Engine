// Why us · Pattern P9 + P7: the statement leads, the person who builds it beside it (smaller), then the
// promises as a numbered ledger across the full frame. No cards, no icons: each promise is a line you can hold us to.
// Content: WhyUsBlock (ACF layout `why_us`).
import Image from "next/image";
import type { WhyUsBlock } from "./schema";
import { BTN_GHOST_LIGHT, CtaLink, Heading } from "../ui";

export default function WhyUs({ content: c }: { content: WhyUsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-paper">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-10 md:grid-cols-[minmax(0,8fr)_minmax(0,3fr)] lg:gap-20">
          <div className="min-w-0">
            <Heading id={`${c.anchor}-h`} parts={c.heading_parts}
              className="max-w-[760px] font-display text-[36px] font-bold leading-[1.08] tracking-[-0.035em] [overflow-wrap:anywhere] sm:text-[52px] lg:text-[60px]" />
            <p data-reveal="" className="mt-7 max-w-[600px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>
          </div>
          <figure data-reveal="" className="grid w-full max-w-[420px] grid-cols-[112px_minmax(0,1fr)] items-end gap-4 md:block md:max-w-[260px] md:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-2">
              <Image src={c.person.image.url} alt={c.person.image.alt} fill sizes="(min-width: 768px) 260px, 112px" className="object-cover object-[50%_30%]" />
            </div>
            <figcaption className="text-[15px] leading-[1.4] md:mt-4">
              <span className="block font-semibold text-ink">{c.person.name}</span>
              <span className="block text-slate">{c.person.role}</span>
            </figcaption>
          </figure>
        </div>

        <ol data-stagger="" className="mt-16 border-t-2 border-ink lg:mt-20">
          {c.items.map((it, i) => (
            <li key={it.title} data-reveal=""
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-line-2 py-6 md:grid-cols-[64px_minmax(0,5fr)_minmax(0,6fr)] md:gap-x-6">
              <span aria-hidden className="pt-[3px] font-mono text-[13px] tabular-nums text-slate">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[20px] font-bold leading-[1.25] tracking-[-0.015em] [overflow-wrap:anywhere] md:text-[22px]">{it.title}</h3>
              <p className="col-start-2 text-pretty text-[16px] leading-[1.55] text-ink/75 md:col-start-3 md:pt-[2px]">{it.text}</p>
            </li>
          ))}
        </ol>
        {c.link && <div data-reveal="" className="mt-10"><CtaLink link={c.link} arrow className={`${BTN_GHOST_LIGHT} h-[52px]`} /></div>}
      </div>
    </section>
  );
}
