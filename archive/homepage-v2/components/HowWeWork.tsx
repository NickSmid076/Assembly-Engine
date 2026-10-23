"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "./I18nProvider";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import { ArrowRight, Icon } from "./icons";

const ICONS = ["search", "pen", "code", "rocket", "refresh"];

export default function HowWeWork() {
  const reduce = useReducedMotion();
  const T = useI18n().t.home.how;
  const row = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: row, offset: ["start 85%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  return (
    <section id="how-we-work" className="bg-white">
      <div className="frame frame-light py-28">
        <Reveal><p className="eyebrow">{T.eyebrow}</p></Reveal>
        <SplitHeading className="mt-4 max-w-[600px] text-[36px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[48px]"
          segments={[{ text: T.title[0] }, { text: T.title[1], className: "text-slate" }]} />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-[600px] text-[18px] leading-[1.5] text-ink/80">
            {T.sub}
          </p>
        </Reveal>
        <div ref={row} className="mt-14">
          <div className="relative h-[3px] w-full overflow-hidden rounded bg-ink/10">
            <motion.div style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-[linear-gradient(90deg,#2E5BFF,#6f8fff)]" />
          </div>
          <Stagger as="ol" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" gap={0.12}>
            {T.steps.map((s, i) => (
              <StaggerItem as="li" key={s.n}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border-2 border-cobalt bg-white px-6 pb-7 pt-5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(46,91,255,.6)]">
                  <div aria-hidden className="absolute inset-0 -z-0 opacity-0 transition duration-500 [background:radial-gradient(120%_70%_at_50%_0%,rgba(46,91,255,.08),transparent)] group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[18px] font-bold text-cobalt">{s.n}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ice text-cobalt transition group-hover:bg-cobalt group-hover:text-white"><Icon name={ICONS[i]} className="h-[18px] w-[18px]" /></span>
                  </div>
                  <h3 className="relative mt-3 text-[22px] font-bold">{s.title}</h3>
                  <p className="relative mt-1.5 text-[14px] leading-[1.35] text-ink/80">{s.text}</p>
                  <p className="relative mt-4 flex gap-2 border-t border-ink/[0.08] pt-4 font-mono text-[12.5px] leading-[1.4] text-cobalt">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />{s.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
