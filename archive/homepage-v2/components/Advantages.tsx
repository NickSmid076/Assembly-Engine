"use client";
import { useCallback, useRef, useState } from "react";
import { useHref, useI18n } from "./I18nProvider";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import Embed, { EmbedHandle } from "./Embed";
import { ArrowRight, Icon } from "./icons";

export default function Advantages() {
  const { t, locale } = useI18n();
  const h = useHref();
  const A = t.home.advantages;
  const morph = useRef<EmbedHandle>(null);
  const [scene, setScene] = useState(0);
  const onMessage = useCallback((d: any) => { if (d.ae === "scene" && typeof d.i === "number") setScene(d.i); }, []);
  return (
    <div className="relative z-10 -mt-[40px] text-white">
      <div className="frame frame-dark pb-28">
        <Stagger as="ul" className="grid border-y border-white/[0.09] sm:grid-cols-2 lg:grid-cols-5" gap={0.08}>
          {A.items.map((a, i) => (
            <StaggerItem as="li" key={a.title}
              className={`group relative border-white/[0.09] px-6 pb-9 pt-7 transition-colors duration-500 hover:bg-white/[0.025] ${i < 4 ? "lg:border-r" : ""} ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} max-lg:border-b`}>
              <span aria-hidden className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-cobalt transition-transform duration-500 group-hover:scale-x-100" />
              <Icon name={a.icon} className="h-6 w-6 text-white/80 transition group-hover:text-cobalt-2" />
              <h3 className="mt-16 text-[17px] font-bold leading-[1.35]">{a.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.4] text-white/55">{a.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="grid border-b border-white/[0.09] lg:grid-cols-2">
          <div className="flex flex-col justify-center border-white/[0.09] py-16 pr-0 lg:border-r lg:pr-12">
            <Reveal><span className="inline-flex w-fit rounded-md bg-cobalt/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-peri">{A.pill}</span></Reveal>
            <SplitHeading className="mt-5 max-w-[460px] text-[30px] font-bold leading-[1.2] tracking-[-0.025em] sm:text-[34px]"
              segments={[{ text: A.title[0] }, { text: A.title[1], className: "text-white/45" }]} />
            <Reveal delay={0.1}><a href={h("/#services")} className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-[14px] transition hover:border-white/40">{A.explore} <ArrowRight className="h-4 w-4" /></a></Reveal>
            <ul className="mt-12 space-y-1">
              {t.services.map((s, i) => (
                <li key={s.slug}>
                  <button type="button" onClick={() => morph.current?.post({ ae: "go", i })} aria-pressed={scene === i}
                    className={`focus-ring group relative w-full rounded py-2.5 text-left font-display text-[20px] font-bold leading-[1.3] transition-colors duration-300 sm:text-[22px] ${scene === i ? "text-white" : "text-white/35 hover:text-white/70"}`}>
                    {s.name}
                    <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-white/[0.07]">
                      <span className={`block h-full bg-white/70 ${scene === i ? "animate-[grow_7.2s_linear_forwards]" : "w-0"}`} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="flex items-center justify-center py-10 lg:pl-12">
            <div className="aspect-[700/810] w-full max-w-[500px]">
              <Embed ref={morph} src={`/embeds/service-morph${locale === "nl" ? "-nl" : ""}.html?part=bare&id=morph`} title="Line animation of the five services" autoHeight={false} className="h-full" onMessage={onMessage} />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
