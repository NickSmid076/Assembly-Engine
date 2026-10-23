"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Seconds elapsed since the element scrolled into view. Loops: after `length` seconds it holds
 * for `hold` seconds, then restarts. Reduced motion returns a large value (= final state).
 */
export function useTimeline<T extends Element>(length: number, hold = 4) {
  const ref = useRef<T>(null);
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setT(999); return; }
    let raf = 0, start = 0, visible = false, last = 0;
    const loop = (now: number) => {
      if (!visible) return;
      if (!start) start = now;
      const s = ((now - start) / 1000) % (length + hold);
      if (now - last > 90) { setT(s); last = now; }
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { start = 0; raf = requestAnimationFrame(loop); } else cancelAnimationFrame(raf);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [length, hold]);
  return { ref, t };
}
