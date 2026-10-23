"use client";
// The case viewer island. State: page × device. Changing either swaps the screenshot in the same stage (the
// stage keeps its size, so nothing below moves) and slides the figures for that page into place.
// Text never fades: the figures move 8px, they don't dissolve (ae-motion). Types only from ./schema (no zod here).
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { CasePagesBlock } from "./schema";

type Device = "desktop" | "phone";
const EASE = [0.2, 0.8, 0.2, 1] as const;

const seg = (on: boolean) =>
  `focus-ring min-h-[44px] rounded-lg border px-3.5 font-display text-[14px] font-bold transition-[background-color,border-color,color] duration-150 ${on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink/40"}`;

function DeviceIcon({ d }: { d: Device }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      {d === "desktop" ? <><rect x="2.5" y="3.5" width="15" height="10" rx="1.5" /><path d="M7 16.5h6" strokeLinecap="round" /></> : <><rect x="6" y="2.5" width="8" height="15" rx="2" /><path d="M9 14.5h2" strokeLinecap="round" /></>}
    </svg>
  );
}

export default function Viewer({ pages, labels: L, initial, site }: Pick<CasePagesBlock, "pages" | "labels" | "initial" | "site">) {
  const [pageId, setPage] = useState(initial.page);
  const [device, setDevice] = useState<Device>(initial.device);
  const page = pages.find((p) => p.id === pageId) ?? pages[0];
  const facts = page.facts.filter((f) => f.device === "all" || f.device === device);
  const img = page.images[device];
  const key = `${page.id}-${device}`;

  return (
    <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:mt-16 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <fieldset>
            <legend className="sr-only">{L.page}</legend>
            <div className="flex flex-wrap gap-2">
              {pages.map((p) => (
                <button key={p.id} type="button" aria-pressed={p.id === page.id} aria-controls="case-stage case-facts"
                  onClick={() => setPage(p.id)} className={seg(p.id === page.id)}>{p.label}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="sr-only">{L.device}</legend>
            <div className="flex gap-2">
              {(["desktop", "phone"] as const).map((d) => (
                <button key={d} type="button" aria-pressed={d === device} aria-controls="case-stage case-facts" aria-label={L[d]} title={L[d]}
                  onClick={() => setDevice(d)} className={`${seg(d === device)} grid w-11 place-items-center px-0`}><DeviceIcon d={d} /></button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* The stage keeps one size for every page and screen, so switching never moves the page. */}
        <div id="case-stage" className="relative mt-4 aspect-square overflow-hidden rounded-2xl border border-line bg-paper sm:aspect-[16/11]">
          <AnimatePresence initial={false}>
            <motion.div key={key} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE }}>
              {device === "desktop" ? (
                <figure className="w-full overflow-hidden rounded-lg border border-line bg-white shadow-[0_30px_70px_-40px_rgba(11,27,51,.45)]">
                  <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-line bg-paper px-3">
                    <span className="truncate font-mono text-[12px] text-slate">{page.url}</span>
                  </div>
                  <Image src={img.url} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1240px) 720px, (min-width: 1024px) 60vw, 92vw" className="block h-auto w-full" />
                </figure>
              ) : (
                <figure className="h-full overflow-hidden rounded-[22px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(11,27,51,.6)]">
                  <Image src={img.url} alt={img.alt} width={img.width} height={img.height} sizes="280px" className="block aspect-[9/16] h-full w-auto object-cover object-top" />
                </figure>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="min-w-0 lg:pt-[60px]">
        <div id="case-facts" aria-live="polite" className="overflow-hidden border-t-2 border-ink">
          <p className="border-b border-line-2 py-3 font-mono text-[12px] text-slate">{page.url}</p>
          <motion.dl key={key} initial={{ y: 8 }} animate={{ y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="divide-y divide-line-2 border-b border-line-2">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse py-4">
                <dt className="mt-2 min-w-0">
                  <span className="block text-[15px] font-medium leading-[1.35] text-ink">{f.label}</span>
                  <span className="mt-1 block text-[13px] leading-[1.4] text-slate"><span className="sr-only">{L.source}: </span>{f.source}</span>
                </dt>
                <dd className="font-display text-[32px] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
          {page.note && <p className="py-3 text-[13px] leading-[1.45] text-slate">{page.note}</p>}
        </div>
        <a href={site.url} target={site.target || undefined} rel={site.target === "_blank" ? "noopener noreferrer" : undefined}
          className="focus-ring mt-4 inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">
          {site.title}<span aria-hidden className="ml-1">↗</span>
        </a>
      </div>
    </div>
  );
}
