"use client";
// 06:58 → 07:00, then what the night's runs produced lands: three small artefacts from the service moments
// (the week report, the invoice, the follow-up). Plays once when it scrolls into view, then holds.
// Server render and reduced motion: the finished state (07:00, everything landed).
import { useEffect, useRef, useState } from "react";
import type { ClosingCtaBlock } from "./schema";

type Props = NonNullable<ClosingCtaBlock["clock"]>;
type Kind = Props["done"][number]["kind"];

const toSec = (hm: string) => { const [h, m] = hm.split(":").map(Number); return h * 3600 + m * 60; };
const fmt = (s: number) => [Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");

/** The same glyphs as the hero modules and the service moments: bars, a document, a pipeline. */
function Glyph({ kind }: { kind: Kind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5 shrink-0 text-peri">
      {kind === "report" && <g {...common}><path d="M3 17h14" /><path d="M5.5 14v-3M9 14V8M12.5 14v-5" /><path d="M16 14V4.5" stroke="#4A73FF" /></g>}
      {kind === "invoice" && <g {...common}><path d="M5 2.5h7l3 3v12H5z" /><path d="M7.5 8h5M7.5 11h5" /><path d="M10.5 14.5h2" stroke="#4A73FF" /></g>}
      {kind === "followup" && <g {...common}><rect x="2.5" y="3.5" width="4" height="13" rx="1" /><rect x="8" y="3.5" width="4" height="13" rx="1" /><rect x="13.5" y="3.5" width="4" height="6" rx="1" stroke="#4A73FF" /></g>}
    </svg>
  );
}

export default function Clock({ from, to, done, label }: Props) {
  const end = toSec(to), start = toSec(from);
  const [now, setNow] = useState(end);
  const [shown, setShown] = useState(done.length);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current!;
    let raf = 0, timers: number[] = [], armed = false, played = false;
    const arm = () => { if (armed) return; armed = true; setNow(start); setShown(0); };
    const play = () => {
      if (played) return;
      played = true; arm();
      const t0 = performance.now(), dur = 1600;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setNow(Math.round(start + (end - start) * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
        else timers = done.map((_, i) => window.setTimeout(() => setShown(i + 1), 200 + i * 220));
      };
      raf = requestAnimationFrame(tick);
    };
    // Arm before it scrolls in (so the finished state never flashes away in view), play when mostly visible.
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting && !played) arm(); }, { rootMargin: "0px 0px 50% 0px" });
    const view = new IntersectionObserver(([e]) => { if (e.isIntersecting) { play(); view.disconnect(); near.disconnect(); } }, { threshold: 0.5 });
    near.observe(el); view.observe(el);
    return () => { near.disconnect(); view.disconnect(); cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [start, end, done]);

  return (
    <div ref={box} className="flex w-full flex-col items-center">
      <p aria-hidden className="font-display text-[56px] font-bold leading-none tracking-[-0.04em] tabular-nums text-white sm:text-[80px]">{fmt(now)}</p>
      <p className="mt-3 font-mono text-[13px] text-white/65">{label}</p>
      <ul className="mt-10 grid w-full max-w-[360px] grid-cols-[minmax(0,1fr)] gap-3 text-left sm:max-w-[920px] sm:grid-cols-3">
        {done.map((d, i) => (
          <li key={d.title}
            className={`min-w-0 rounded-xl border border-white/10 bg-ink-2 px-4 py-3.5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${i < shown ? "opacity-100" : "translate-y-2 opacity-0"}`}>
            <div className="flex items-center gap-2">
              <Glyph kind={d.kind} />
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/65">{d.label}</span>
            </div>
            <p className="mt-2.5 truncate font-display text-[15px] font-bold text-white">{d.title}</p>
            <p className="truncate text-[13px] text-white/65">{d.meta}</p>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-ok">
              <svg viewBox="0 0 12 12" aria-hidden className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>
              {d.status} · {to}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
