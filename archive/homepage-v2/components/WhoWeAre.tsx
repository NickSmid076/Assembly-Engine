"use client";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import { useI18n } from "./I18nProvider";

export default function WhoWeAre() {
  const W = useI18n().t.home.who;
  return (
    <section id="about" className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(40%_60%_at_85%_50%,rgba(46,91,255,.16),transparent_70%)]" />
      <div className="frame frame-dark grid gap-12 py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
        <div>
          <Reveal><p className="eyebrow">{W.eyebrow}</p></Reveal>
          <SplitHeading className="mt-5 text-[38px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[52px]"
            segments={[{ text: W.title[0] }, { text: W.title[1], className: "text-peri" }]} />
        </div>
        <Stagger className="space-y-6 border-l border-white/10 pl-8 text-[18px] leading-[1.5] text-white/85 lg:mt-16" gap={0.15}>
          {W.paras.map((p) => <StaggerItem as="p" key={p}>{p}</StaggerItem>)}
        </Stagger>
      </div>
    </section>
  );
}
