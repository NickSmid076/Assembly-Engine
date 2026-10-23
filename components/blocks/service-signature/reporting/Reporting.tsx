"use client";
// "Waar komt dit cijfer vandaan?" · the reporting signature. A partner dashboard (HTML) whose four figures
// are buttons; choosing one shows its lineage: which system, which data, how many records, synced when,
// and the calculation. Desktop: the system beside it as an isometric object (SVG poster, then three.js),
// where the figure's sources lift and its wires light. Phone/tablet: the same choice in 2D: the source
// strip above the dashboard, with connectors that draw to the chosen tile. Rules: .claude/skills/ae-ui-3d.
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReportingSignature } from "../schema";
import { LIFT, SLAB, SOURCES, TILE, VIEW, anchor, tileAt, wires as route } from "./geometry";
import Poster from "./Poster";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function webgl() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

/** Mount the 3D only on a desktop with a fine pointer and motion allowed, after load + idle, near the viewport. */
function use3D(ref: React.RefObject<HTMLElement | null>) {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches || !webgl()) return;
    let idle = 0, timer = 0;
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      near.disconnect();
      const go = () => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) idle = ric(() => setEnabled(true), { timeout: 2000 }); else timer = window.setTimeout(() => setEnabled(true), 400);
      };
      if (document.readyState === "complete") go(); else addEventListener("load", go, { once: true });
    }, { rootMargin: "0px 0px 100% 0px" });
    near.observe(el);
    return () => {
      near.disconnect(); clearTimeout(timer);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cic) cic(idle);
    };
  }, [ref]);
  // Pause when off-screen or the tab is hidden.
  useEffect(() => {
    if (!enabled || !ref.current) return;
    let seen = false, visible = document.visibilityState === "visible";
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; setActive(seen && visible); });
    const vis = () => { visible = document.visibilityState === "visible"; setActive(seen && visible); };
    io.observe(ref.current);
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, [enabled, ref]);
  return { enabled, active };
}

/** Becomes true once, when the element is mostly in view (starts the first wire drawing). */
function useSeen(ref: React.RefObject<HTMLElement | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function Check() {
  return <svg viewBox="0 0 12 12" aria-hidden className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>;
}

export default function Reporting({ data: d }: { data: ReportingSignature }) {
  const [sel, setSel] = useState(() => Math.max(0, d.kpis.findIndex((k) => k.id === d.initial)));
  const [touched, setTouched] = useState(0); // bumps on every choice, so the same wires can draw again
  const choose = (k: number) => { setSel(k); setTouched((n) => n + 1); };

  const links = useMemo(() => d.kpis.flatMap((k, kpi) => k.sources.map((s) => ({ kpi, source: d.sources.findIndex((x) => x.id === s.source) }))), [d]);
  const wires = useMemo(() => route(links), [links]);
  const kpi = d.kpis[sel];
  const lit = new Set(kpi.sources.map((s) => d.sources.findIndex((x) => x.id === s.source)));

  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { enabled, active } = use3D(stageRef);
  const [ready, setReady] = useState(false);
  const stageSeen = useSeen(stageRef);
  const stripSeen = useSeen(stripRef);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10 xl:gap-14">
      {/* Desktop stage: the system as an object. Labels are HTML at projected anchors. */}
      <div ref={stageRef} className="relative hidden w-full lg:block" style={{ aspectRatio: VIEW.w / VIEW.h }}>
        <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100"}`}>
          <Poster wires={wires} selected={sel} onSelect={choose} drawKey={stageSeen ? `${sel}-${touched}` : null} className="h-full w-full" />
        </div>
        {enabled && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
            <Scene active={active} wires={wires} selected={sel} onSelect={choose} onReady={() => setReady(true)} />
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Each source's name is printed on its lid (dark on the light block), so it lifts with it and never collides. */}
          {SOURCES.map((b, s) => {
            const a = anchor([b.x, b.h + (lit.has(s) ? LIFT.source : 0), b.z]);
            return (
              <span key={s} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[13px] font-bold text-ink transition-[top] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{ left: `${a.left * 100}%`, top: `${a.top * 100}%` }}>
                {d.sources[s].tool}
              </span>
            );
          })}
          {d.kpis.map((k, i) => {
            const t = tileAt(i), on = i === sel;
            const a = anchor([t.x, SLAB.h + TILE.h + (on ? LIFT.tile : 0), t.z]);
            return (
              <button key={k.id} type="button" tabIndex={-1} onClick={() => choose(i)}
                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 font-mono text-[13px] font-medium tabular-nums transition-[top,color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "text-white" : "text-ink"}`}
                style={{ left: `${a.left * 100}%`, top: `${a.top * 100}%` }}>
                {k.value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0">
        <p className="mb-3 font-mono text-[13px] text-white/65">{d.labels.example}</p>

        {/* Phone/tablet: the sources above the dashboard, wired to the chosen tile. */}
        <div ref={stripRef} className="lg:hidden">
          <p className="sr-only">{d.labels.sources}</p>
          <ul className="grid grid-cols-3 gap-2">
            {d.sources.map((s, i) => (
              <li key={s.id} className={`rounded-lg border px-2.5 py-2.5 transition-colors duration-300 ${lit.has(i) ? "border-white bg-white text-ink" : "border-white/15 text-white/65"}`}>
                <span className="block truncate font-display text-[14px] font-bold">{s.tool}</span>
                <span className={`block text-[13px] leading-[1.3] hyphens-auto [overflow-wrap:anywhere] ${lit.has(i) ? "text-slate" : "text-white/60"}`}>{s.what}</span>
              </li>
            ))}
          </ul>
          <svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden className="block h-10 w-full">
            {[...lit].map((s) => {
              const sx = 50 + s * 100, tx = sel % 2 === 0 ? 75 : 225;
              return (
                <path key={`${sel}-${touched}-${s}`} d={`M${sx} 0 C${sx} 22 ${tx} 18 ${tx} 40`} fill="none" stroke="#4A73FF" strokeWidth={2}
                  vectorEffect="non-scaling-stroke" pathLength={1} className={stripSeen ? "sig-draw" : undefined} />
              );
            })}
          </svg>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white text-ink">
          <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
            <p className="min-w-0 truncate font-display text-[15px] font-bold">{d.dashboard.title}</p>
            <p className="shrink-0 font-mono text-[12px] text-slate">{d.dashboard.tool}</p>
          </div>
          <p id="sig-hint" className="px-4 pt-4 text-[13px] text-slate sm:px-5">{d.labels.hint}</p>
          <div role="group" aria-describedby="sig-hint" className="grid grid-cols-2 gap-2 p-4 pt-3 sm:p-5 sm:pt-3">
            {d.kpis.map((k, i) => {
              const on = i === sel;
              return (
                <button key={k.id} type="button" aria-pressed={on} aria-controls="sig-lineage" onClick={() => choose(i)}
                  className={`focus-ring flex min-h-[96px] min-w-0 flex-col rounded-xl border p-3 text-left transition-[background-color,border-color,color] duration-150 sm:p-4 ${on ? "border-cobalt bg-cobalt text-white" : "border-line bg-paper hover:border-ink/30"}`}>
                  <span className={`text-[13px] leading-[1.3] ${on ? "text-white" : "text-slate"}`}>{k.label}</span>
                  <span className="mt-auto pt-2 font-display text-[24px] font-bold leading-none tracking-[-0.02em] tabular-nums sm:text-[28px]">{k.value}</span>
                  {k.note && <span className={`mt-1.5 text-[13px] ${on ? "text-white" : "text-slate"}`}>{k.note}</span>}
                </button>
              );
            })}
          </div>

          <div id="sig-lineage" aria-live="polite" className="min-h-[196px] border-t border-line bg-paper px-4 py-4 sm:px-5">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{d.labels.lineage} · <span className="normal-case tracking-normal text-ink">{kpi.label}</span></p>
            <ul className="mt-3 space-y-2.5">
              {kpi.sources.map((s) => {
                const src = d.sources.find((x) => x.id === s.source)!;
                return (
                  <li key={s.source} className="text-[13px] leading-[1.4]">
                    <p className="min-w-0 font-display text-[14px] font-bold">{src.tool} <span className="font-sans text-[13px] font-normal text-slate">· {s.dataset}</span></p>
                    <p className="mt-0.5 flex flex-wrap items-center justify-between gap-x-4">
                      <span className="flex items-center gap-1.5 text-ok-ink"><Check />{d.labels.synced} {s.synced}</span>
                      <span className="font-mono tabular-nums text-ink">{s.records}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
            {kpi.formula && (
              <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 border-t border-line-2 pt-3 text-[13px]">
                <span className="text-slate">{d.labels.formula}</span>
                <span className="font-mono tabular-nums text-ink">{kpi.formula} = {kpi.value}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
