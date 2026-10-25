"use client";
// Table of contents · built from the article's H2s. From lg: a sticky rail beside the text that marks the
// section in view. Below lg: a collapsible <details> above the text. Plain links, so keyboard and no-JS work.
import { useEffect, useState } from "react";

type Item = { id: string; text: string };

export function TocRail({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setActive(hit.target.id);
    }, { rootMargin: "-15% 0px -70% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={label} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{label}</p>
      <ol className="mt-4 space-y-0.5 border-l border-line">
        {items.map((i) => {
          const on = active === i.id;
          return (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={on ? "location" : undefined}
                className={`focus-ring -ml-px block border-l-2 py-1.5 pl-3 text-[14px] leading-[1.4] transition-[color,border-color] duration-150 ${on ? "border-cobalt text-ink" : "border-transparent text-slate hover:text-ink"}`}>{i.text}</a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function TocMobile({ items, label, toggle }: { items: Item[]; label: string; toggle: string }) {
  return (
    <details className="group rounded-xl border border-line bg-paper">
      <summary className="focus-ring flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 font-mono text-[12.5px] uppercase tracking-[0.1em] text-ink [&::-webkit-details-marker]:hidden">
        {toggle}
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 10l5 5 5-5" /></svg>
      </summary>
      <nav aria-label={label} className="border-t border-line px-4 pb-3 pt-2">
        <ol className="space-y-0.5">
          {items.map((i, n) => (
            <li key={i.id}><a href={`#${i.id}`} className="focus-ring flex gap-3 rounded py-1.5 text-[15px] leading-[1.4] text-ink hover:text-cobalt"><span className="w-5 shrink-0 font-mono text-[12px] leading-[1.7] tabular-nums text-slate">{n + 1}</span>{i.text}</a></li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
