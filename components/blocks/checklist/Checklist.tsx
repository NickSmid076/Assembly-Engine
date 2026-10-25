"use client";
// Checklist · native checkboxes the reader can tick; progress (bar + "2 of 5") and ticks stay in this browser
// (localStorage, read after hydration so server and client render the same first frame; every access in
// try/catch for private mode). Content: ChecklistBlock.
import { useEffect, useState } from "react";
import type { ChecklistBlock } from "./schema";
import { Check } from "@/components/icons";

export default function Checklist({ content: c }: { content: ChecklistBlock }) {
  const key = `ae-checklist:${c.id}`;
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const v: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (Array.isArray(v)) setDone(v.filter((x): x is string => typeof x === "string" && c.items.some((i) => i.id === x)));
    } catch { /* storage unavailable: start empty */ }
  }, [key, c.items]);

  const save = (next: string[]) => {
    setDone(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* not stored; ticks still work for this visit */ }
  };
  const toggle = (id: string) => save(done.includes(id) ? done.filter((x) => x !== id) : [...done, id]);
  const total = c.items.length;
  const progress = c.labels.progress.replace("{done}", String(done.length)).replace("{total}", String(total));

  return (
    <fieldset className="rounded-xl border border-line bg-white">
      <legend className="sr-only">{c.title}</legend>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 sm:px-6">
        <p aria-hidden className="font-display text-[17px] font-bold leading-[1.3] text-ink">{c.title}</p>
        <p aria-live="polite" className="font-mono text-[12.5px] tabular-nums text-slate">{progress}</p>
      </div>
      <div aria-hidden className="h-[3px] bg-line"><div className="h-full origin-left bg-cobalt transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `scaleX(${total ? done.length / total : 0})` }} /></div>
      <ul className="divide-y divide-line">
        {c.items.map((it) => {
          const on = done.includes(it.id);
          const inputId = `${c.id}-${it.id}`;
          return (
            <li key={it.id}>
              <label htmlFor={inputId} className="flex cursor-pointer gap-3.5 px-5 py-3.5 transition-[background-color] duration-150 hover:bg-paper sm:px-6">
                <span className="relative mt-[2px] h-5 w-5 shrink-0">
                  <input id={inputId} type="checkbox" checked={on} onChange={() => toggle(it.id)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-line-2 bg-white transition-[background-color,border-color] duration-150 checked:border-cobalt checked:bg-cobalt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peri" />
                  <Check className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" />
                </span>
                <span className={`text-pretty text-[16px] leading-[1.5] ${on ? "text-slate line-through decoration-slate/60" : "text-ink"}`}>{it.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 sm:px-6">
        <p className="text-[13px] leading-[1.45] text-slate">{c.labels.stored}</p>
        <button type="button" onClick={() => done.length && save([])} aria-disabled={!done.length}
          className="focus-ring min-h-[40px] rounded-md border border-line-2 px-3 text-[14px] font-medium text-ink transition-[border-color,opacity] duration-150 hover:border-ink/40 aria-disabled:cursor-default aria-disabled:opacity-50 aria-disabled:hover:border-line-2">{c.labels.reset}</button>
      </div>
    </fieldset>
  );
}
