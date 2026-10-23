"use client";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "@/lib/motion";
import PageHeader from "./PageHeader";
import CtaBand from "./CtaBand";
import { useI18n } from "./I18nProvider";
import { ArrowRight } from "./icons";

export default function CaseStudy() {
  const { t } = useI18n();
  const c = t.caseStudy;
  return (
    <>
      <PageHeader eyebrow={`${c.eyebrow} · ${c.client}`} title={c.title} muted={c.muted} lead={c.intro}>
        <dl className="mt-10 grid max-w-[960px] grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
          {c.facts.map(([k, v]) => (
            <div key={k} className="border-b border-r border-line p-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-slate">{k}</dt>
              <dd className="mt-1.5 text-[14px] font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section className="bg-white">
        <div className="frame frame-light pb-24">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-line bg-sunken shadow-[0_30px_70px_-40px_rgba(11,27,51,.45)]">
              <div className="relative aspect-video w-full">
                <iframe src="/case/energielabel-breda.html" title={c.video} className="absolute inset-0 h-full w-full border-0" loading="lazy" />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-line bg-white px-5 py-3 text-[13px] text-slate">
                <span>{c.video}</span>
                <a href="https://energielabel-breda.nl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-cobalt">{c.visit} <ArrowRight className="h-4 w-4" /></a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 border-t border-line py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SplitHeading className="max-w-[420px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: c.problemTitle[0] }, { text: c.problemTitle[1], className: "text-slate" }]} />
          <Stagger as="ol" className="divide-y divide-line border-y border-line" gap={0.07}>
            {c.problem.map((p, i) => (
              <StaggerItem as="li" key={p} className="flex gap-5 py-5">
                <span className="w-7 shrink-0 pt-0.5 font-mono text-[12px] text-slate">0{i + 1}</span>
                <span className="text-[16px] leading-[1.55] text-ink/85">{p}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white">
        <div className="frame frame-light border-t border-line py-24">
          <SplitHeading className="max-w-[560px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: c.builtTitle[0] }, { text: c.builtTitle[1], className: "text-slate" }]} />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {c.built.map((b, i) => (
              <StaggerItem key={b.title} className={`bg-white p-7 ${i === c.built.length - 1 && c.built.length % 3 === 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <p className="text-[16px] font-semibold text-ink">{b.title}</p>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-slate">{b.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="frame frame-dark py-24">
          <SplitHeading className="text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[44px]" segments={[{ text: c.resultsTitle[0] }, { text: c.resultsTitle[1], className: "text-white/45" }]} />
          <Stagger className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {c.results.map((r) => (
              <StaggerItem key={r.label} className="border-b border-r border-white/10 p-7">
                <p className="font-display text-[56px] font-bold leading-none tracking-[-0.04em]">{r.value}</p>
                <p className="mt-4 text-[15px] font-semibold">{r.label}</p>
                <p className="mt-1 text-[12.5px] leading-[1.45] text-white/50">{r.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-6 flex flex-col gap-2 rounded-xl border border-white/10 p-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[15px] font-semibold">{c.lcp.label}</p>
              <p className="mt-1 text-[12.5px] text-white/50">{c.lcp.note}</p>
            </div>
            <p className="font-display text-[36px] font-bold tracking-[-0.03em]">{c.lcp.value}</p>
          </Reveal>
          <p className="mt-6 max-w-[640px] text-[13px] text-white/50">{c.noOldScore}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] gap-12 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <SplitHeading className="max-w-[420px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[40px]" segments={[{ text: c.behindTitle[0] }, { text: c.behindTitle[1], className: "text-slate" }]} />
          <div className="space-y-4">
            {c.behind.map((b) => (
              <Reveal key={b.title} className="rounded-xl border border-line p-6">
                <p className="text-[16px] font-semibold text-ink">{b.title}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-slate">{b.text}</p>
              </Reveal>
            ))}
            <Reveal className="rounded-xl border border-dashed border-line-2 bg-sunken p-6">
              <p className="text-[16px] font-semibold text-ink">{c.nextTitle}</p>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate">{c.next}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
