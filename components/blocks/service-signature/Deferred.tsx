"use client";
// Hydrates a server-rendered island only when it comes near the viewport. Until then the server HTML stays on
// screen untouched (React skips a node rendered with dangerouslySetInnerHTML during hydration), so first paint,
// layout and no-JS reading are unchanged; only the hydration work moves out of page load.
// After a client-side navigation there is no server HTML, so the children render straight away.
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export default function Deferred({ children, margin = "600px" }: { children: ReactNode; margin?: string }) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(() => typeof window === "undefined" || !document.getElementById(id)?.hasChildNodes());
  const focus = useRef<number>(-1);

  useEffect(() => {
    if (live) return;
    const el = ref.current;
    if (!el) return;
    const go = () => {
      // Keep keyboard focus if it already landed inside the static markup.
      const all = [...el.querySelectorAll<HTMLElement>("button, a[href], [tabindex]")];
      focus.current = all.indexOf(document.activeElement as HTMLElement);
      setLive(true);
    };
    const io = new IntersectionObserver(([e]) => e.isIntersecting && go(), { rootMargin: margin });
    io.observe(el);
    el.addEventListener("focusin", go, { once: true });
    el.addEventListener("pointerdown", go, { once: true });
    return () => { io.disconnect(); el.removeEventListener("focusin", go); el.removeEventListener("pointerdown", go); };
  }, [live, margin]);

  useEffect(() => {
    if (!live || focus.current < 0 || !ref.current) return;
    ref.current.querySelectorAll<HTMLElement>("button, a[href], [tabindex]")[focus.current]?.focus();
    focus.current = -1;
  }, [live]);

  if (!live) return <div id={id} ref={ref} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "" }} />;
  return <div id={id} ref={ref}>{children}</div>;
}
