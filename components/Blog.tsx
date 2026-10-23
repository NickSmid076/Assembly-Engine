"use client";
import { useState } from "react";
import Link from "next/link";
import { useHref, useI18n } from "./I18nProvider";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import LineArt from "./LineArt";
import { ArrowRight } from "./icons";

import { Newsletter } from "./Newsletter";
export { Newsletter };

export default function Blog() {
  const { t } = useI18n();
  const h = useHref();
  const B = t.home.blog;
  const [feat, ...rest] = t.posts;
  return (
    <section id="blog" className="bg-white">
      <div className="frame frame-light pt-28">
        <Reveal><span className="inline-flex rounded-md bg-ice px-2.5 py-1 text-[14px] font-medium text-cobalt">{B.pill}</span></Reveal>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SplitHeading className="max-w-[640px] text-[28px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[44px]"
            segments={[{ text: B.title[0] }, { text: B.title[1], className: "text-slate" }]} />
          <Reveal delay={0.1}><Link href={h("/blog")} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-ink/15 px-3.5 py-2 text-[14px] font-medium transition hover:border-ink/40">{B.viewAll} <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>

        {/* featured post */}
        <Reveal className="mt-14">
          <Link href={h(`/blog/${feat.slug}`)} className="focus-ring group grid overflow-hidden rounded-[24px] border border-ink/[0.08] bg-paper transition hover:border-cobalt/40 hover:shadow-[0_30px_70px_-40px_rgba(46,91,255,.6)] lg:grid-cols-[1.25fr_1fr]">
            <div className="relative min-h-[260px] overflow-hidden bg-ink text-white">
              <div aria-hidden className="absolute inset-0 [background:radial-gradient(70%_80%_at_30%_110%,rgba(46,91,255,.45),transparent_70%)]" />
              <LineArt kind={feat.art} className="absolute inset-0 h-full w-full text-white transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
              <span className="absolute left-6 top-6 rounded-md bg-white/10 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/80 backdrop-blur">{B.featured}</span>
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
              <div>
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]"><span className="text-cobalt">{feat.tag}</span><span className="text-slate">· {feat.read} min · {feat.date}</span></p>
                <h3 className="mt-4 text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">{feat.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] text-slate">{feat.excerpt}</p>
              </div>
              <span className="inline-flex items-center gap-2 font-display text-[15px] font-bold text-cobalt">{B.readGuide} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </div>
          </Link>
        </Reveal>

        {/* index: Attio-style hairline columns */}
        <Stagger className="mt-10 grid sm:grid-cols-3" gap={0.1}>
          {rest.map((p, i) => (
            <StaggerItem key={p.title}>
              <Link href={h(`/blog/${p.slug}`)} className={`focus-ring group flex h-full flex-col border-ink/[0.08] py-6 sm:px-6 ${i ? "sm:border-l" : ""}`}>
                <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[14px] bg-paper text-ink">
                  <LineArt kind={p.art} className="absolute inset-0 h-full w-full text-cobalt transition-transform duration-1000 ease-out group-hover:scale-[1.08]" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em]"><span className="text-cobalt">{p.tag}</span><span className="text-slate"> · {p.read} min · {p.date}</span></p>
                <h3 className="mt-3 text-[19px] font-bold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-cobalt">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.45] text-slate">{p.excerpt}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div aria-hidden className="mt-6 h-14 [background:repeating-linear-gradient(90deg,rgba(11,27,51,.12)_0_1px,transparent_1px_14px)] [mask-image:linear-gradient(180deg,transparent,#000)]" />
        <Newsletter labels={t.home.newsletter} />
      </div>
    </section>
  );
}
