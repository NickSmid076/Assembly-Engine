// Case hero · Pattern P1 (statement + evidence). The headline runs the full frame; under it the facts
// ledger on the left and the live site itself on the right, so the first screen already shows the work.
// Content: CaseHeroBlock. Server component; the H1 is static (it is the LCP element).
import Image from "next/image";
import type { CaseHeroBlock } from "./schema";
import { CtaLink, Heading } from "../ui";

export default function CaseHero({ content: c }: { content: CaseHeroBlock }) {
  const host = c.site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="frame frame-light pb-20 pt-20 sm:pb-28 sm:pt-28">
        <p className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink">{c.eyebrow}</p>
        <Heading as="h1" reveal={false} parts={c.heading_parts} stacked
          className="mt-6 max-w-[980px] font-display text-[40px] font-bold leading-[1.05] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[56px] lg:text-[64px]" />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="max-w-[480px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.intro}</p>
            <dl className="mt-8 border-t-2 border-ink">
              {c.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-line-2 py-3.5">
                  <dt className="pt-[3px] font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{f.label}</dt>
                  <dd className="text-[15px] font-medium leading-[1.45] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <CtaLink link={c.site} className="focus-ring mt-6 inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">
              <>{c.site.title}<span aria-hidden className="ml-1">↗</span></>
            </CtaLink>
          </div>

          <div data-reveal="" className="relative min-w-0 pb-10 pr-6 sm:pr-14">
            <figure className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-40px_rgba(11,27,51,.45)]">
              <div aria-hidden className="flex h-9 items-center gap-3 border-b border-line bg-paper px-4">
                <span className="truncate font-mono text-[12.5px] text-slate">{host}</span>
              </div>
              <Image src={c.images.desktop.url} alt={c.images.desktop.alt} width={c.images.desktop.width} height={c.images.desktop.height}
                sizes="(min-width: 1240px) 640px, (min-width: 1024px) 55vw, 90vw" className="block h-auto w-full" />
            </figure>
            <figure data-reveal="" className="proof-phone absolute bottom-0 right-0 w-[26%] min-w-[96px] max-w-[170px] overflow-hidden rounded-[18px] border-[5px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(11,27,51,.6)]">
              <Image src={c.images.phone.url} alt={c.images.phone.alt} width={c.images.phone.width} height={c.images.phone.height}
                sizes="170px" className="block aspect-[9/16] h-auto w-full object-cover object-top" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
