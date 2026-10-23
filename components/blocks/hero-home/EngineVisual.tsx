"use client";
// Shows the SVG poster first; on a desktop with a fine pointer, motion allowed and WebGL available, it
// loads the 3D engine after the page has loaded and fades it in over the poster. The 3D chunk is never
// part of the initial bundle and never downloads on phones, tablets or with reduced motion.
// Over both sits one link per module: hover or focus shows the service's name and lifts the module;
// a click opens that service in the explorer below (`data-open-service`, handled by services/Explorer).
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MODULE_ANCHORS } from "./engine-geometry";

const EngineCanvas = dynamic(() => import("./EngineCanvas"), { ssr: false });

function webgl() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type Module = { label: string; url: string };

export default function EngineVisual({ children, ratio, modules, hint }: { children: ReactNode; ratio: number; modules: Module[]; hint: string }) {
  const box = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const hover = useRef(-1);
  const [hovered, setHovered] = useState(-1);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const pick = (i: number) => { hover.current = i; setHovered(i); };

  // Decide once, after load + idle, so the 3D never competes with the first paint.
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches || !webgl()) return;
    let idle = 0, timer = 0;
    const go = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) idle = ric(() => setEnabled(true), { timeout: 2000 });
      else timer = window.setTimeout(() => setEnabled(true), 600);
    };
    if (document.readyState === "complete") go();
    else addEventListener("load", go, { once: true });
    return () => {
      removeEventListener("load", go);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cic) cic(idle);
      clearTimeout(timer);
    };
  }, []);

  // Pause when off-screen or the tab is hidden; feed scroll progress to the scene.
  useEffect(() => {
    if (!enabled) return;
    const el = box.current!;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const vis = () => setTabVisible(document.visibilityState === "visible");
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      scroll.current = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };
    document.addEventListener("visibilitychange", vis);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); removeEventListener("scroll", onScroll); };
  }, [enabled]);

  return (
    <div ref={box} className="relative w-full" style={{ aspectRatio: ratio }} data-hover={hovered >= 0 ? hovered : undefined}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}>{children}</div>
      {enabled && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
          <EngineCanvas active={onScreen && tabVisible} scroll={scroll} hover={hover} hoverKey={hovered} onReady={() => setReady(true)} />
        </div>
      )}
      {/* One link per module, centred on its top face. The name shows on hover and keyboard focus. */}
      <ul className="absolute inset-0">
        {modules.map((m, i) => {
          const a = MODULE_ANCHORS[i];
          return (
            <li key={m.label} className="absolute" style={{ left: `${a.left * 100}%`, top: `${a.top * 100}%` }}>
              <a href={m.url} data-open-service={i} aria-label={`${m.label} · ${hint}`}
                onPointerEnter={() => pick(i)} onPointerLeave={() => pick(-1)} onFocus={() => pick(i)} onBlur={() => pick(-1)}
                className="group/mod focus-ring absolute left-0 top-0 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full lg:h-16 lg:w-16">
                <span aria-hidden className={`pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 font-display text-[13px] font-bold text-ink shadow-[0_10px_24px_-12px_rgba(0,0,0,.5)] transition-[opacity,transform] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] ${hovered === i ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
                  {m.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
