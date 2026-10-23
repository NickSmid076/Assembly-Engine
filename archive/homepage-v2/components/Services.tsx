"use client";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, Reveal, SplitHeading } from "@/lib/motion";
import { scrollToTarget } from "./SmoothScroll";
import { useHref, useI18n } from "./I18nProvider";
import Scene from "./ui/scenes";
import { Stage } from "./ui/kit";
import { ArrowRight } from "./icons";

function ServiceBlock({ i }: { i: number }) {
  const { t } = useI18n();
  const h = useHref();
  const s = t.services[i];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 40%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.96, 1]);
  return (
    <article id={`service-${s.slug}`} data-service={i} className="scroll-mt-24 border-b border-line last:border-b-0">
      <div className="px-6 pb-10 pt-16 sm:px-12 sm:pt-20">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-slate">
            <span className="text-cobalt">0{i + 1}</span><span className="h-px w-6 bg-line-2" />{s.name}
          </p>
        </Reveal>
        <SplitHeading as="h3" className="mt-5 max-w-[640px] text-[26px] font-bold leading-[1.3] tracking-[-0.02em] sm:text-[30px]"
          segments={[{ text: s.lead }, { text: s.rest, className: "text-slate" }]} stagger={0.02} />
        <Reveal delay={0.1}>
          <Link href={h(`/services/${s.slug}`)} className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-[14px] font-medium text-ink transition hover:border-ink/30">
            {t.home.services.more} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      <div ref={ref} className="px-4 pb-12 sm:px-12">
        <motion.div style={{ scale, transformOrigin: "50% 0%" }}>
          <Stage className="p-4 sm:p-8"><Scene data={s.scenes.hero} tag={t.example} /></Stage>
        </motion.div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] border-t border-line md:grid-cols-2">
        {s.usps.map((u, k) => (
          <div key={u.title} className={`px-6 py-12 sm:px-10 ${k === 0 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}>
            <Reveal delay={k * 0.1}>
              <p className="max-w-[380px] text-[17px] font-bold leading-[1.35]">{u.title} <span className="text-slate">{u.text}</span></p>
            </Reveal>
            <Reveal delay={0.1 + k * 0.1} className="mt-7">
              <Stage className="p-3 sm:p-5"><Scene data={s.scenes.steps[k + 1]} tag={t.example} /></Stage>
            </Reveal>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Services() {
  const { t } = useI18n();
  const S = t.home.services;
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 40%", "end 60%"] });

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-service]"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.service)); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="bg-white">
      <div className="frame frame-light pt-28">
        <Reveal><p className="eyebrow">{S.eyebrow}</p></Reveal>
        <SplitHeading className="mt-5 max-w-[1000px] text-[30px] font-bold leading-[1.3] tracking-[-0.025em] sm:text-[40px]" stagger={0.025}
          segments={[{ text: S.title[0] }, { text: S.title[1], className: "text-slate" }]} />

        <div ref={list} className="mt-20 grid grid-cols-[minmax(0,1fr)] border border-line lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="sticky top-[68px] z-20 min-w-0 border-b border-line bg-white/95 backdrop-blur lg:static lg:border-b-0 lg:border-r lg:bg-transparent">
            <nav aria-label={S.eyebrow} className="lg:sticky lg:top-28 lg:py-16">
              <div className="relative flex gap-1 overflow-x-auto px-3 py-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:py-0">
                <div aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block">
                  <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-cobalt" />
                </div>
                {t.services.map((x, i) => (
                  <button key={x.slug} type="button" onClick={() => scrollToTarget(`#service-${x.slug}`)} aria-current={i === active ? "true" : undefined}
                    className={`focus-ring relative shrink-0 whitespace-nowrap rounded px-4 py-2.5 text-left font-display text-[15px] font-bold leading-[1.3] transition-colors duration-300 lg:whitespace-normal lg:py-3.5 lg:pl-7 lg:text-[17px] ${i === active ? "text-ink" : "text-ink/35 hover:text-ink/70"}`}>
                    {i === active && <motion.span layoutId="svc-dot" transition={{ duration: 0.5, ease: EASE }} className="absolute bottom-1 left-4 right-4 h-0.5 bg-cobalt lg:bottom-auto lg:left-[-3px] lg:right-auto lg:top-1/2 lg:h-2 lg:w-2 lg:-translate-y-1/2 lg:rounded-[2px]" />}
                    <span className="mr-2 hidden font-mono text-[11px] text-cobalt lg:inline">0{i + 1}</span>{x.name}
                  </button>
                ))}
              </div>
            </nav>
          </div>
          <div className="min-w-0">{t.services.map((_, i) => <ServiceBlock key={i} i={i} />)}</div>
        </div>
      </div>
    </section>
  );
}
