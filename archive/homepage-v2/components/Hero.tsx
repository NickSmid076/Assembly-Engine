"use client";
// Home hero · headline across the frame, then the pitch beside a live product demo.
// Content: HeroHomeSection from lib/content (WordPress layout `hero_home`). Rules: .claude/skills/ae-*.
import Link from "next/link";
import type { HeroHomeSection } from "@/lib/content";
import HeroEngine from "./HeroEngine";
import { ArrowRight } from "./icons";

export default function Hero({ content: c }: { content: HeroHomeSection }) {
  // Headline and pitch are there on first paint (fast LCP). Only the demo panel eases in, in CSS so
  // server and client render the same markup; reduced motion makes it instant via globals.css.

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* the frame's hairline rhythm, fading out downwards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(90deg,rgba(237,241,255,.035)_0_1px,transparent_1px_32px)] [mask-image:linear-gradient(180deg,#000,transparent_70%)]" />
      <div className="frame frame-dark relative pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <p className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          <span aria-hidden className="h-1.5 w-1.5 bg-cobalt" />
          {c.eyebrow}
        </p>

        <h1
          className="mt-6 max-w-[1060px] text-balance font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[60px] lg:text-[70px]">
          {c.heading_parts.map((p, i) => (
            <span key={i} className={p.accent ? "text-cobalt-2" : undefined}>{i ? " " : ""}{p.text}</span>
          ))}
        </h1>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-12 sm:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)] lg:gap-14">
          <div className="max-w-[500px]">
            <p className="text-pretty text-[18px] leading-[1.55] text-white/80">{c.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={c.primary_cta.url} target={c.primary_cta.target || undefined} className="btn-primary focus-ring group h-[52px] px-6">
                {c.primary_cta.title}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
              {c.secondary_cta && (
                <Link href={c.secondary_cta.url} target={c.secondary_cta.target || undefined}
                  className="focus-ring inline-flex h-[52px] items-center rounded-md border border-white/20 px-6 font-display text-[15px] font-bold text-white transition-colors duration-150 hover:border-white/50 hover:bg-white/[0.04]">
                  {c.secondary_cta.title}
                </Link>
              )}
            </div>
            {c.facts.length > 0 && (
              <dl className="mt-12 border-t border-white/10">
                {c.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline gap-6 border-b border-white/10 py-3.5">
                    <dt className="order-2 min-w-0 text-[14px] leading-[1.45] text-white/65">{f.label}</dt>
                    <dd className="order-1 w-12 shrink-0 font-mono text-[15px] font-medium tabular-nums text-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {c.demo && (
            <div className="min-w-0 animate-rise [animation-delay:.1s]">
              <HeroEngine labels={c.demo.labels} runs={c.demo.runs} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
