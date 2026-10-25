"use client";
// Reading progress · a 3px cobalt bar at the very top of the window that fills (scaleX) as the article is read.
// Writes the transform directly (one rAF per scroll), never React state per frame. Decorative: aria-hidden.
import { useEffect, useRef } from "react";

export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || !bar.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [target]);
  return <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"><div ref={bar} className="h-full origin-left bg-cobalt" style={{ transform: "scaleX(0)" }} /></div>;
}
