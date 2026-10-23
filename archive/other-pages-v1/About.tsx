"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import PageHeader from "./PageHeader";
import CtaBand from "./CtaBand";
import { useHref, useI18n } from "./I18nProvider";
import { ArrowRight } from "./icons";

export default function About() {
  const { t } = useI18n();
  const h = useHref();
  const a = t.about;
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} muted={a.muted} />
      <section className="bg-white">
        <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-sunken">
              <motion.img style={{ y: reduce ? 0 : y, scale: 1.12 }} src="/images/nick-smid.jpg" alt={a.photoAlt} className="absolute inset-0 h-full w-full object-cover object-[50%_45%]" loading="eager" />
            </div>
            <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-slate">Nick Smid · Founder</p>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal><p className="text-[22px] font-semibold leading-[1.45] tracking-[-0.01em] text-ink sm:text-[24px]">{a.intro}</p></Reveal>
            <Reveal delay={0.1}><p className="mt-6 text-[16px] leading-[1.6] text-slate">{a.where}</p></Reveal>
            <Reveal delay={0.2}>
              <Link href={h("/contact")} className="focus-ring mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-ink px-5 font-display text-[14.5px] font-bold text-white transition hover:bg-cobalt">{a.cta} <ArrowRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 border-t border-line py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SplitHeading className="max-w-[420px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: a.storyTitle[0] }, { text: a.storyTitle[1], className: "text-slate" }]} />
          <Stagger className="space-y-6" gap={0.12}>
            {a.story.map((p) => <StaggerItem as="p" key={p} className="text-[18px] leading-[1.65] text-ink/85">{p}</StaggerItem>)}
          </Stagger>
        </div>
      </section>
      <section className="bg-white">
        <div className="frame frame-light border-t border-line py-24">
          <SplitHeading className="max-w-[560px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: a.valuesTitle[0] }, { text: a.valuesTitle[1], className: "text-slate" }]} />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {a.values.map((v, i) => (
              <StaggerItem key={v.title} className="bg-white p-7">
                <span className="font-mono text-[12px] text-cobalt">0{i + 1}</span>
                <p className="mt-8 text-[16px] font-semibold text-ink">{v.title}</p>
                <p className="mt-1.5 text-[14.5px] leading-[1.5] text-slate">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
