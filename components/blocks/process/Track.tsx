"use client";
// The process as one track that fills as you scroll past it (scroll-linked, transform only).
// Each stop lights up when the fill reaches it (measured from where the stop really sits, so it works on
// the horizontal desktop track and the vertical phone track); the go-live stop lands with a spring.
// Reduced motion: fill complete, every stop lit (globals.css `.track-fill`, `.track-stop`).
import { motion, useMotionValueEvent, useScroll, useSpring, type MotionValue } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Ctx = { p: MotionValue<number>; track: React.RefObject<HTMLDivElement | null> };
const TrackCtx = createContext<Ctx | null>(null);

export default function Track({ children, liveAt, count, span, after }: {
  children: ReactNode; liveAt: number; count: number; span: string; after: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  // Stops sit at the start of each column; the bracket runs from the first stop to the go-live stop.
  const live = (liveAt / count) * 100;
  const next = ((liveAt + 1) / count) * 100;
  return (
    <TrackCtx.Provider value={{ p, track: ref }}>
      <div ref={ref} className="relative">
        {/* bracket: first call → go-live, then "ongoing" (lg+) */}
        <div aria-hidden className="absolute inset-x-0 -top-10 hidden h-7 lg:block">
          <div className="absolute bottom-0 left-[5px] h-2 border-x border-t border-cobalt/45" style={{ width: `calc(${live}% + 1px)` }} />
          <p className="absolute bottom-3.5 left-0 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-cobalt">{span}</p>
          <div className="absolute bottom-0 right-0 h-2 border-t border-dashed border-line-2" style={{ left: `calc(${next}% + 5px)` }} />
          <p className="absolute bottom-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-slate" style={{ left: `${next}%` }}>{after}</p>
        </div>
        {/* horizontal track (lg+) */}
        <div aria-hidden className="absolute left-0 right-0 top-[5px] hidden h-[2px] bg-line lg:block">
          <motion.div style={{ scaleX: p }} className="track-fill absolute inset-0 origin-left bg-cobalt" />
        </div>
        {/* vertical track (phone/tablet) */}
        <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-[2px] bg-line lg:hidden">
          <motion.div style={{ scaleY: p }} className="track-fill absolute inset-0 origin-top bg-cobalt" />
        </div>
        {children}
      </div>
    </TrackCtx.Provider>
  );
}

/** A stop on the track. `kind`: before go-live (ink), the go-live stop (cobalt, lands with a spring), after (outlined). */
export function Stop({ kind }: { kind: "before" | "live" | "after" }) {
  const ctx = useContext(TrackCtx)!;
  const ref = useRef<HTMLSpanElement>(null);
  const at = useRef(0); // fraction of the track where this stop sits
  const [on, setOn] = useState(false);
  useEffect(() => {
    const measure = () => {
      const t = ctx.track.current?.getBoundingClientRect();
      const s = ref.current?.getBoundingClientRect();
      if (!t || !s) return;
      const horizontal = t.height < t.width / 4 || matchMedia("(min-width: 1024px)").matches;
      at.current = horizontal ? (s.left - t.left) / t.width : (s.top - t.top) / t.height;
      setOn(ctx.p.get() >= at.current - 0.005);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ctx]);
  useMotionValueEvent(ctx.p, "change", (v) => { const n = v >= at.current - 0.005; if (n !== on) setOn(n); });

  const base = kind === "after" ? "border-2 border-line-2 bg-paper" : "bg-line-2";
  const lit = kind === "live" ? "bg-cobalt" : kind === "after" ? "border-2 border-cobalt bg-paper" : "bg-ink";
  return (
    <span ref={ref} aria-hidden className="absolute -left-9 top-1 h-3 w-3 lg:left-0 lg:top-0">
      <span className={`absolute inset-0 ${base}`} />
      <motion.span className={`track-stop absolute inset-0 ${lit}`} initial={false}
        animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: kind === "live" ? 0.4 : 1 }}
        transition={kind === "live" && on ? { type: "spring", stiffness: 520, damping: 14 } : { duration: 0.15 }} />
    </span>
  );
}
