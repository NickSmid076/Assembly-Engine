// About hero · Pattern P9 (person). The real photo and the statement share the first screen: on desktop the
// portrait left and the words right; on a phone the words first, then the photo. No parallax, no entrance on text.
// Content: AboutHeroBlock. Server component.
import Image from "next/image";
import type { AboutHeroBlock } from "./schema";
import { CtaLink, Heading } from "../ui";

export default function AboutHero({ content: c }: { content: AboutHeroBlock }) {
  return (
    <section className="bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-10 pb-20 pt-20 sm:pb-28 sm:pt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <figure className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] max-w-[420px] overflow-hidden rounded-2xl bg-ink-2 lg:max-w-none">
            <Image src={c.person.image.url} alt={c.person.image.alt} fill priority sizes="(min-width: 1240px) 460px, (min-width: 1024px) 38vw, 420px" className="object-cover object-[50%_35%]" />
          </div>
          <figcaption className="mt-4 text-[15px] leading-[1.4]">
            <span className="block font-semibold text-ink">{c.person.name}</span>
            <span className="block text-slate">{c.person.role}</span>
          </figcaption>
        </figure>
        <div className="order-1 min-w-0 lg:order-2">
          <p className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink">{c.eyebrow}</p>
          <Heading as="h1" reveal={false} parts={c.heading_parts} stacked
            className="mt-6 font-display text-[40px] font-bold leading-[1.05] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[56px] lg:text-[52px] xl:text-[56px]" />
          <p className="mt-8 max-w-[620px] text-pretty text-[20px] font-medium leading-[1.5] tracking-[-0.005em] text-ink sm:text-[22px]">{c.statement}</p>
          <p className="mt-6 max-w-[560px] border-t border-line-2 pt-5 text-[16px] leading-[1.6] text-ink/75">{c.where}</p>
          <CtaLink link={c.cta} arrow className="btn-primary focus-ring mt-8 h-[52px] px-6" />
        </div>
      </div>
    </section>
  );
}
