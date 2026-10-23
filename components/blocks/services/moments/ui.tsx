"use client";
// Shared pieces for the homepage service moments: the artefact card style, the check mark and offset
// measuring for elements that travel from one artefact into another.
import { useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { MPath, k } from "./clock";

/** A white artefact on the paper stage (the one card style all five moments share). */
export const CARD = "rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(11,27,51,.05),0_12px_32px_-16px_rgba(11,27,51,.18)]";
export const MONO = "font-mono text-[13px] leading-[1.35] text-slate";

/** Green check that draws itself at `at`. */
export function Tick({ at, className = "h-[18px] w-[18px]" }: { at: number; className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className={`shrink-0 ${className}`}>
      <circle cx="9" cy="9" r="9" className="fill-ok" />
      <MPath d="M5 9.4l2.6 2.6L13 6.6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" f={(t) => k(t, at, 0.35)} />
    </svg>
  );
}

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Box of `el` inside `root`, ignoring transforms (offsetLeft/Top chain), so it can be measured mid-animation. */
function box(el: HTMLElement, root: HTMLElement) {
  let x = 0, y = 0, n: HTMLElement | null = el;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}
export type Delta = { dx: number; dy: number; sx: number; sy: number };
const ZERO: Delta = { dx: 0, dy: 0, sx: 1, sy: 1 };

/** For each [from, to] pair: the translate + scale that puts `to` exactly over `from` (top-left origin). */
export function useDeltas(root: RefObject<HTMLElement | null>, pairs: [RefObject<HTMLElement | null>, RefObject<HTMLElement | null>][], deps: unknown[]) {
  const [d, setD] = useState<Delta[]>(() => pairs.map(() => ZERO));
  useIso(() => {
    const r = root.current;
    if (!r) return;
    setD(pairs.map(([a, b]) => {
      if (!a.current || !b.current) return ZERO;
      const A = box(a.current, r), B = box(b.current, r);
      return { dx: A.x - B.x, dy: A.y - B.y, sx: A.w / B.w, sy: A.h / B.h };
    }));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return d;
}
