"use client";
// Home hero demo: a calm app window that plays example automation runs.
// Content comes in as props (lib/content · HeroHomeSection.demo). Motion rules: .claude/skills/ae-motion.
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { DemoLabels, DemoRun } from "./schema";
import { DUR, EASE } from "@/lib/motion";
import { Check } from "@/components/icons";

const DURATION = 8.5; // seconds per run, including a hold at the end for reading
const FINAL = 99; // any time past the end = the finished state
const T_TRIGGER = 0.2, T_AGENT = 1.3, T_OUT = [2.8, 3.6, 4.4];
const OUT_Y = [46, 100, 154];

function clock(base: string, plus: number) {
  const [h, m, s] = base.split(":").map(Number);
  const tot = h * 3600 + m * 60 + s + Math.floor(plus);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(tot / 3600) % 24)}:${p(Math.floor(tot / 60) % 60)}:${p(tot % 60)}`;
}

function Wire({ d, on, flowing, grad, delay = 0 }: { d: string; on: boolean; flowing: boolean; grad: string; delay?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={on ? "rgba(74,115,255,.55)" : "rgba(237,241,255,.12)"} strokeWidth={1.4} style={{ transition: "stroke .3s" }} />
      {on && flowing && (
        <motion.path d={d} fill="none" stroke={`url(#${grad})`} strokeWidth={2.4} strokeLinecap="round" pathLength={1}
          strokeDasharray="0.22 1.4" initial={{ strokeDashoffset: 0.22 }} animate={{ strokeDashoffset: -1.2 }}
          transition={{ duration: 1.6, ease: "linear", repeat: Infinity, delay }} />
      )}
    </>
  );
}

export default function RunEngine({ labels: L, runs }: { labels: DemoLabels; runs: DemoRun[] }) {
  const reduce = useReducedMotionSafe();
  const uid = "ae" + useId().replace(/[^a-zA-Z0-9]/g, ""); // safe inside url(#…)
  const box = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [idx, setIdx] = useState(0);
  // Server and first client render both show the finished run, so there is no hydration mismatch
  // and visitors without JS or with reduced motion see a complete picture.
  const [t, setT] = useState(FINAL);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const auto = useRef(true); // auto-advance stops once the visitor picks a tab
  const acc = useRef(0);
  const progress = useMotionValue(1);
  const run = runs[idx];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // First time on screen: start from the beginning (skipped under reduced motion).
  useEffect(() => {
    if (reduce || started || !visible) return;
    acc.current = 0; progress.set(0); setT(0); setStarted(true);
  }, [visible, reduce, started, progress]);

  useEffect(() => { if (reduce) { setT(FINAL); progress.set(1); } }, [reduce, progress]);

  const running = started && !reduce && visible && !hover && !userPaused && !done;

  useEffect(() => {
    if (!running) return;
    let raf = 0, last = performance.now(), lastSet = 0;
    const loop = (now: number) => {
      acc.current += (now - last) / 1000; last = now;
      progress.set(Math.min(1, acc.current / DURATION));
      if (now - lastSet > 100) { setT(acc.current); lastSet = now; } // ~10 renders/s, the bar is driven by a motion value
      if (acc.current >= DURATION) {
        if (auto.current) { acc.current = 0; progress.set(0); setT(0); setIdx((i) => (i + 1) % runs.length); }
        else { setT(FINAL); setDone(true); }
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, idx, runs.length, progress]);

  const select = (i: number) => {
    auto.current = false;
    acc.current = 0;
    setIdx(i); setDone(false); setStarted(true);
    if (reduce) { setT(FINAL); progress.set(1); } else { setT(0); progress.set(0); }
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = runs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); select(next); tabs.current[next]?.focus();
  };

  const on = (time: number) => t >= time;
  const feed = run.feed.filter((f) => t >= f.at);
  const outsDone = T_OUT.filter((x) => on(x + 0.4)).length;
  const live = running; // moving parts only animate while the demo actually plays
  const diagramLabel = L.diagram_aria.replace("{trigger}", run.trigger.title).replace("{outputs}", run.outputs.map((o) => o.tool).join(", "));

  return (
    <div ref={box} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false); }}>
      <div className="relative rounded-[18px] border border-white/10 bg-ink-2 p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)]">
        {/* window bar */}
        <div className="flex items-center gap-3 px-3 py-2">
          <span aria-hidden className="flex gap-1.5">{[0, 1, 2].map((k) => <i key={k} className="h-2.5 w-2.5 rounded-full bg-white/15" />)}</span>
          <span translate="no" className="min-w-0 truncate rounded-md bg-black/20 px-2.5 py-1 font-mono text-[10.5px] text-white/60">engine.assembly-engine.com/runs/{run.run_id}</span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-ok/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ok">
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full bg-ok ${live ? "animate-pulse" : ""}`} />{L.live}
          </span>
          <button type="button" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? L.play : L.pause}
            className="focus-ring grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/60 transition-colors duration-150 hover:bg-white/10 hover:text-white">
            {userPaused
              ? <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M8 5.5l11 6.5-11 6.5z" /></svg>
              : <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><rect x="6.5" y="5.5" width="3.8" height="13" rx="1" /><rect x="13.7" y="5.5" width="3.8" height="13" rx="1" /></svg>}
          </button>
        </div>

        <div className="rounded-[12px] border border-white/[0.07] bg-ink p-3 sm:p-4">
          {/* tabs, each with its run progress */}
          <div role="tablist" aria-label={L.tabs_aria} className="grid grid-cols-3 gap-1 rounded-xl bg-black/25 p-1">
            {runs.map((r, i) => (
              <button key={r.run_id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`${uid}-tab-${i}`}
                aria-selected={i === idx} aria-controls={`${uid}-panel`} tabIndex={i === idx ? 0 : -1}
                onClick={() => select(i)} onKeyDown={(e) => onTabKey(e, i)}
                className={`focus-ring relative min-w-0 overflow-hidden rounded-lg px-1.5 py-2.5 font-display text-[12px] font-bold leading-tight [hyphens:manual] [overflow-wrap:anywhere] transition-colors duration-150 sm:px-2 sm:text-[13.5px] ${i === idx ? "bg-white/[0.07] text-white" : "text-white/55 hover:text-white/85"}`}>
                {r.tab}
                {i === idx && <motion.span aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cobalt" />}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${idx}`}>
            {/* flow graph */}
            <div className="relative mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-2/40 sm:mt-4">
              <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(rgba(237,241,255,.08)_1px,transparent_1.2px)] [background-size:16px_16px]" />
              <svg viewBox="0 0 520 200" className="relative block w-full" role="img" aria-label={diagramLabel}>
                <defs>
                  <linearGradient id={`${uid}-pulse`} x1="0" x2="1"><stop offset="0" stopColor="#2E5BFF" stopOpacity="0" /><stop offset="1" stopColor="#dfe7ff" /></linearGradient>
                </defs>
                <Wire d="M172 100 L224 100" on={on(T_TRIGGER + 0.3)} flowing={live} grad={`${uid}-pulse`} />
                {OUT_Y.map((y, k) => <Wire key={k} d={`M296 100 C322 100 320 ${y} 348 ${y}`} on={on(T_OUT[k] - 0.5)} flowing={live} grad={`${uid}-pulse`} delay={k * 0.2} />)}

                {/* trigger */}
                <rect x="14" y="70" width="158" height="60" rx="12" fill="rgba(11,27,51,.95)" stroke={on(T_TRIGGER) ? "#2E5BFF" : "rgba(237,241,255,.14)"} strokeWidth="1.2" style={{ transition: "stroke .3s" }} />
                <text x="28" y="94" fill="#8FA0BF" fontSize="8.5" fontFamily="var(--font-plex-mono), monospace" letterSpacing="1">{L.trigger.toUpperCase()}</text>
                <text x="28" y="110" fill="#fff" fontSize="12" fontWeight="700" fontFamily="var(--font-manrope), sans-serif">{run.trigger.title}</text>
                <text x="28" y="123" fill="rgba(255,255,255,.55)" fontSize="8.5" fontFamily="var(--font-inter), sans-serif">{run.trigger.subtitle.length > 30 ? run.trigger.subtitle.slice(0, 29) + "…" : run.trigger.subtitle}</text>

                {/* agent core */}
                {live && on(T_AGENT) && !on(T_OUT[2] + 0.4) && (
                  <motion.circle cx="260" cy="100" r="44" fill="none" stroke="#4A73FF" strokeWidth="1.5" strokeDasharray="40 240" animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "260px 100px" }} />
                )}
                <circle cx="260" cy="100" r="36" fill={on(T_AGENT) ? "#2E5BFF" : "rgba(20,41,76,1)"} stroke="rgba(195,208,255,.35)" style={{ transition: "fill .3s" }} />
                <text x="252" y="106" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800" fontFamily="var(--font-manrope), sans-serif">ae</text>
                <rect x="264" y="100" width="5" height="5" fill={on(T_AGENT) ? "#fff" : "#2E5BFF"} />
                <text x="260" y="160" textAnchor="middle" fill={on(T_AGENT) ? "#C3D0FF" : "rgba(255,255,255,.4)"} fontSize="9" fontFamily="var(--font-plex-mono), monospace" letterSpacing="1">{run.agent.toUpperCase()}</text>

                {/* outputs */}
                {run.outputs.map((o, i) => {
                  const y = OUT_Y[i], act = on(T_OUT[i]), fin = on(T_OUT[i] + 0.4);
                  return (
                    <g key={o.tool}>
                      <rect x="348" y={y - 20} width="158" height="40" rx="10" fill="rgba(11,27,51,.95)" stroke={act ? "rgba(46,91,255,.9)" : "rgba(237,241,255,.12)"} style={{ transition: "stroke .3s" }} />
                      <text x="362" y={y - 3} fill="#8FA0BF" fontSize="8" fontFamily="var(--font-plex-mono), monospace" letterSpacing="1">{o.tool.toUpperCase()}</text>
                      <text x="362" y={y + 11} fill={act ? "#fff" : "rgba(255,255,255,.45)"} fontSize="11" fontWeight="700" fontFamily="var(--font-manrope), sans-serif">{o.result}</text>
                      <circle cx="488" cy={y} r="8" fill={fin ? "rgba(20,174,92,.18)" : "rgba(237,241,255,.06)"} stroke={fin ? "#14AE5C" : "rgba(237,241,255,.18)"} />
                      {fin && <motion.path d={`M484 ${y} l3 3 l5 -6`} fill="none" stroke="#14AE5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={live ? { pathLength: 0 } : false} animate={{ pathLength: 1 }} transition={{ duration: DUR.state }} />}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* run log */}
            <div className="mt-3 rounded-xl border border-white/[0.06] sm:mt-4">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3.5 py-2.5 sm:px-4">
                <span className="font-display text-[13px] font-bold text-peri">{L.log}</span>
                <span className="font-mono text-[10.5px] tabular-nums text-white/60">{clock(run.start_time, Math.min(t, 6))} · {L.example_run}</span>
              </div>
              <ul className="h-[178px] overflow-hidden px-1.5 py-1.5 sm:px-2">
                <AnimatePresence initial={false}>
                  {feed.map((f) => (
                    <motion.li key={run.run_id + f.at} initial={live ? { opacity: 0, y: -8 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: DUR.state, ease: EASE }}
                      className="flex h-[34px] items-center gap-3 rounded-lg px-2 text-[12.5px]">
                      <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ok/50 bg-ok/10 text-ok"><Check className="h-3 w-3" /></span>
                      <span className="min-w-0 flex-1 truncate font-medium text-white/90">{f.text}</span>
                      <span className="hidden shrink-0 rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-white/60 sm:inline">{f.tag}</span>
                      <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/60">{clock(run.start_time, f.at)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <dl className="mt-3 grid grid-cols-3 gap-2 sm:mt-4">
              {[[L.steps, `${Math.min(run.feed.length, feed.length)}/${run.feed.length}`], [L.outputs, `${outsDone}/${run.outputs.length}`], [L.by_hand, "0"]].map(([k, v]) => (
                <div key={k} className="min-w-0 rounded-lg border border-white/[0.06] px-2.5 py-2.5 sm:px-3">
                  <dt className="min-h-[2.6em] font-mono text-[9.5px] uppercase leading-[1.3] tracking-[0.1em] text-white/60 sm:min-h-0">{k}</dt>
                  <dd className="mt-1 font-mono text-[18px] font-bold leading-none tabular-nums text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-white/60">{L.footnote}</p>
    </div>
  );
}
