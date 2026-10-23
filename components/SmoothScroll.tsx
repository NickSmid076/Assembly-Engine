"use client";
import { useEffect } from "react";

/**
 * Native scrolling (no scroll-jacking: that fought with the embedded iframes and caused the shaking).
 * Only in-page anchor links get a smooth glide, offset for the sticky header.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id === "#") return;
      e.preventDefault();
      scrollToTarget(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

export function scrollToTarget(sel: string) {
  const el = sel === "#top" ? document.body : (document.querySelector(sel) as HTMLElement | null);
  if (!el) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
}
