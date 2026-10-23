"use client";
// The story clock shared by the five homepage service moments.
// One MotionValue `T` (seconds) drives everything: each element derives its opacity and transform from T,
// so pause freezes exactly, replay is T = 0 and a step button jumps to that frame. The server and reduced
// motion render the end frame (T = duration). React re-renders only when the step changes.
import { animate, cubicBezier, motion, useMotionValue, useMotionValueEvent, type AnimationPlaybackControls, type MotionValue } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from "react";
import { EASE, EASE_IN_OUT } from "@/lib/motion";

/* ---------------------------------------------------------------- curves */
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const eo = cubicBezier(...EASE);
export const eio = cubicBezier(...EASE_IN_OUT);
/** Progress 0→1 of a beat that starts at `a` and lasts `d` seconds. */
export const k = (t: number, a: number, d = 0.5, ease: (x: number) => number = eo) => ease(clamp((t - a) / d));
/** Settles past 1 and back (lock-in). `s` is the overshoot. */
export const spring = (x: number, s = 1.3) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2));
/** Travel with anticipation: a small move back (≈ 8% of the path) before going. */
export const antic = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.18 ? -0.08 * Math.sin((x / 0.18) * Math.PI) : eio((x - 0.18) / 0.82));
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;

/* ---------------------------------------------------------------- context */
/** T = clock (s) · at = start of each state · D = duration · w = stage width in px (measured; 520 on the server). */
type Ctx = { T: MotionValue<number>; at: Record<string, number>; D: number; w: number };
const StoryCtx = createContext<Ctx | null>(null);
export function useStoryCtx() {
  const c = useContext(StoryCtx);
  if (!c) throw new Error("Moment outside <StoryProvider>");
  return c;
}
export function StoryProvider({ value, children }: { value: Ctx; children: ReactNode }) {
  return <StoryCtx.Provider value={value}>{children}</StoryCtx.Provider>;
}

/* ---------------------------------------------------------------- animated elements */
export type Frame = { opacity?: number; x?: number; y?: number; scale?: number; scaleX?: number; scaleY?: number; rotate?: number; rotateX?: number; rotateZ?: number; z?: number };
const KEYS = ["opacity", "x", "y", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateZ", "z"] as const;
const DEF: Required<Frame> = { opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotate: 0, rotateX: 0, rotateZ: 0, z: 0 };

/** Text must stay readable (WCAG AA) on every frame, and muted text only passes at ≥ ~92 % opacity. So an element
 *  that holds text is either hidden or at ≥ 97 %: it appears when its fade starts and disappears when its fade ends,
 *  and its slide still carries the motion. Shapes without text keep their smooth fades. */
const LEGIBLE = 0.97;
const legible = (o: number) => (o <= 0.02 ? 0 : Math.max(o, LEGIBLE));

/** Motion values for a frame function f(T). Only the keys f returns at the end frame are styled.
 *  `text` (set once the element is mounted) switches opacity to the legible mapping above. */
function useFrame(f: (t: number) => Frame, text?: React.RefObject<boolean>) {
  const { T } = useStoryCtx();
  const fn = useRef(f);
  fn.current = f;
  const first = f(T.get());
  const keys = useRef(KEYS.filter((key) => key in first)).current;
  const mvs = KEYS.map((key) => useMotionValue((first[key] ?? DEF[key]) as number)); // fixed order, fixed count
  const apply = (t: number) => {
    const fr = fn.current(t);
    keys.forEach((key) => {
      const v = (fr[key] ?? DEF[key]) as number;
      mvs[KEYS.indexOf(key)].set(key === "opacity" && text?.current ? legible(v) : v);
    });
  };
  useMotionValueEvent(T, "change", apply);
  useLayoutEffectSafe(() => apply(T.get()));
  return Object.fromEntries(keys.map((key) => [key, mvs[KEYS.indexOf(key)]]));
}
const useLayoutEffectSafe = typeof window === "undefined" ? useEffect : useLayoutEffect;

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> & { f: (t: number) => Frame; as?: "div" | "span" | "li" | "p" };
/** A div (or span/li/p) whose opacity/transform follow the clock. */
export function M({ f, as = "div", style, ...rest }: DivProps) {
  const el = useRef<HTMLDivElement>(null);
  const text = useRef(false);
  // Declared before useFrame, so it runs before useFrame's layout effect applies the first frame.
  useLayoutEffectSafe(() => { text.current = !!el.current?.textContent?.trim(); }, []);
  const s = useFrame(f, text);
  const C = motion[as] as typeof motion.div;
  return <C ref={el} {...rest} style={{ ...style, ...s }} />;
}
/** SVG group following the clock. Uses fill-box origin so scale/rotate act on the group itself. */
export function MG({ f, style, ...rest }: Omit<SVGProps<SVGGElement>, "ref" | "style"> & { f: (t: number) => Frame; style?: React.CSSProperties }) {
  const s = useFrame(f);
  return <motion.g {...(rest as object)} style={{ transformBox: "fill-box", transformOrigin: "center", ...style, ...s }} />;
}
/** SVG path that draws with the clock (pathLength 0→1). */
export function MPath({ f, ...rest }: Omit<SVGProps<SVGPathElement>, "ref"> & { f: (t: number) => number }) {
  const { T } = useStoryCtx();
  const fn = useRef(f);
  fn.current = f;
  const v = useMotionValue(f(T.get()));
  useMotionValueEvent(T, "change", (t) => v.set(fn.current(t)));
  return <motion.path {...(rest as object)} style={{ pathLength: v }} />;
}
/** Re-renders when T crosses `at` (for text that swaps, e.g. a counter). Cheap: one boolean. */
export function useAfter(at: number) {
  const { T } = useStoryCtx();
  const [on, setOn] = useState(() => T.get() >= at);
  useMotionValueEvent(T, "change", (t) => { const n = t >= at; if (n !== on) setOn(n); });
  useEffect(() => setOn(T.get() >= at), [T, at]);
  return on;
}
/** Re-renders with the number of thresholds T has passed (counters: 0…n). */
export function useCount(ats: number[]) {
  const { T } = useStoryCtx();
  const count = (t: number) => ats.filter((a) => t >= a).length;
  const [n, setN] = useState(() => count(T.get()));
  useMotionValueEvent(T, "change", (t) => { const c = count(t); if (c !== n) setN(c); });
  useEffect(() => setN(count(T.get())), [T]); // eslint-disable-line react-hooks/exhaustive-deps
  return n;
}

/* ---------------------------------------------------------------- the engine */
/** Resolves once the page has loaded and the browser is idle (at most 2.5 s after load). Stories wait for it, so a
 *  story that is already in view at load doesn't start (arm, re-render, measure) while the page is still hydrating. */
let settled: Promise<void> | null = null;
function pageSettled() {
  settled ??= new Promise((res) => {
    const idle = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(() => res(), { timeout: 2500 }); else setTimeout(res, 300);
    };
    if (document.readyState === "complete") idle(); else addEventListener("load", idle, { once: true });
  });
  return settled;
}

export type Status = "idle" | "armed" | "playing" | "paused" | "held" | "done" | "static";
type Step = { at: number; label: string; state: string };

/**
 * Play once when visible, hold the end frame. `key` changes (another service chosen) restart the story.
 * idle = end frame before anything happened (server, no JS) · armed = reset to 0, waiting to be seen ·
 * held = paused because off-screen or the tab is hidden · paused = paused by the visitor.
 */
export function useStory(D: number, steps: Step[], key: string | number, ref: React.RefObject<HTMLDivElement | null>, ready: boolean) {
  const T = useMotionValue(D);
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(steps.length - 1);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const st = useRef<Status>("idle");
  const seen = useRef(false);
  const set = (s: Status) => { st.current = s; setStatus(s); };
  const stepAt = useCallback((t: number) => { let i = 0; steps.forEach((s, j) => { if (t >= s.at) i = j; }); return i; }, [steps]);

  useMotionValueEvent(T, "change", (t) => { const i = stepAt(t); setStep((p) => (p === i ? p : i)); });

  const stop = () => { anim.current?.stop(); anim.current = null; };
  const play = useCallback(() => {
    stop();
    if (T.get() >= D - 0.01) T.set(0);
    set("playing");
    anim.current = animate(T, D, { duration: D - T.get(), ease: "linear", onComplete: () => set("done") });
  }, [D, T]);

  // Visibility (once the page has settled): arm before it scrolls in, play when 35% visible, hold when it leaves or the tab hides.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { set("static"); return; }
    if (!ready) return; // nothing to play until the moments have loaded
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || st.current !== "idle") return;
      T.set(0); set("armed");
      // A jump scroll (anchor link) can report "in view" before "near": play now instead of waiting.
      if (seen.current && !document.hidden) play();
    }, { rootMargin: "0px 0px 60% 0px" });
    const view = new IntersectionObserver(([e]) => {
      seen.current = e.isIntersecting;
      if (e.isIntersecting && (st.current === "armed" || st.current === "held") && !document.hidden) play();
      else if (!e.isIntersecting && st.current === "playing") { stop(); set("held"); }
    }, { threshold: 0.35 });
    const vis = () => {
      if (document.hidden && st.current === "playing") { stop(); set("held"); }
      else if (!document.hidden && st.current === "held" && seen.current) play();
    };
    let live = true;
    pageSettled().then(() => { if (!live) return; near.observe(el); view.observe(el); });
    document.addEventListener("visibilitychange", vis);
    return () => { live = false; near.disconnect(); view.disconnect(); document.removeEventListener("visibilitychange", vis); stop(); };
  }, [T, play, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Another service chosen: the visitor asked for it, so start from frame 1 (or the end frame if static).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    stop();
    if (st.current === "static") { T.set(D); return; }
    T.set(0);
    if (seen.current && !document.hidden) play(); else set("armed");
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    if (st.current === "playing") { stop(); set("paused"); }
    else play();
  };
  /** Jump to a step's settled frame (just before the next step, at most 1.6 s in). */
  const jump = (i: number) => {
    stop();
    const next = steps[i + 1]?.at ?? D;
    T.set(i === steps.length - 1 ? D : Math.min(steps[i].at + 1.6, next - 0.05));
    if (st.current !== "static") set(i === steps.length - 1 ? "done" : "paused");
  };

  return { ref, T, status, step, toggle, jump };
}

/* ---------------------------------------------------------------- the rail */
export function Rail({ steps, step, T, D, status, toggle, jump, labels, id }: {
  steps: Step[]; step: number; T: MotionValue<number>; D: number; status: Status; toggle: () => void; jump: (i: number) => void;
  labels: { pause: string; play: string; replay: string; steps: string }; id: string;
}) {
  const fill = useMotionValue(T.get() / D);
  useMotionValueEvent(T, "change", (t) => fill.set(t / D));
  const playing = status === "playing";
  const ended = status === "done" || status === "idle";
  const btn = playing ? labels.pause : ended ? labels.replay : labels.play;
  return (
    <div className="mt-4 flex items-start gap-4 border-t border-line pt-3">
      <div className="min-w-0 flex-1">
        <div aria-hidden className="relative h-px bg-line-2">
          <motion.div className="absolute inset-0 origin-left bg-cobalt" style={{ scaleX: fill }} />
        </div>
        <ol aria-label={labels.steps} className="mt-2 hidden gap-3 sm:flex">
          {steps.map((s, i) => (
            <li key={s.state} className="min-w-0 flex-1">
              <button type="button" onClick={() => jump(i)} aria-current={i === step ? "step" : undefined} aria-controls={id}
                className={`focus-ring -mx-1 min-h-[40px] min-w-[44px] rounded px-1 text-left text-[13px] leading-[1.3] hyphens-auto [overflow-wrap:break-word] transition-colors duration-150 ${i === step ? "font-semibold text-ink" : i < step ? "text-ink/75 hover:text-ink" : "text-slate hover:text-ink"}`}>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-2 flex min-h-[32px] items-center gap-2 text-[13px] sm:hidden">
          <span className="font-mono tabular-nums text-slate">{step + 1}/{steps.length}</span>
          <span className="font-semibold text-ink">{steps[Math.min(step, steps.length - 1)].label}</span>
        </p>
      </div>
      {status !== "static" && (
        // `rail-toggle`: hidden by CSS under reduced motion from the first paint, so the labels don't re-wrap
        // when the story turns static after hydration (that removes this button).
        <button type="button" onClick={toggle} aria-controls={id}
          className="rail-toggle focus-ring mt-1 inline-flex min-h-[36px] shrink-0 items-center gap-2 rounded-md border border-line-2 bg-white px-3 text-[13px] font-semibold text-ink transition-colors duration-150 hover:border-ink/30">
          <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="currentColor">
            {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : ended ? <path d="M8 3a5 5 0 1 1-4.6 3H1.8L4 3.5 6.2 6H4.7A3.6 3.6 0 1 0 8 4.4z" /> : <path d="M5 3l8 5-8 5z" />}
          </svg>
          {/* All three labels share one cell, so the button is always as wide as the longest one: switching
              between play, pause and replay never changes the width of the step labels beside it. */}
          <span className="grid">
            {[labels.pause, labels.play, labels.replay].map((l, i) => (
              <span key={i} aria-hidden={l === btn ? undefined : true} className={`[grid-area:1/1] ${l === btn ? "" : "invisible"}`}>{l}</span>
            ))}
          </span>
        </button>
      )}
    </div>
  );
}

/** Seconds from each state's name: `at.page`. */
export const atMap = (steps: Step[]) => Object.fromEntries(steps.map((s) => [s.state, s.at]));
