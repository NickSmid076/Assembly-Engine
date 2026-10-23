"use client";
// Moment 4 · Invoice & Payment Automation (12 s: one object, days passing).
// One document is the anchor: time entries become invoice lines in place, the total turns from hours into
// the amount, a "now" marker travels a date rail (sent, reminder 14 days later, paid), a Mollie payment
// arrives under the invoice and is matched to it; the invoice ends paid, matched and booked.
// Rail: vertical on a wide stage, horizontal on a narrow one (positions are measured, so one code path).
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { M, antic, k, lerp, useStoryCtx } from "./clock";
import type { InvoicingMoment } from "./schema";
import { CARD, MONO, Tick } from "./ui";

const lin = (x: number) => x;
const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;
type P = { x: number; y: number };

export default function Invoicing({ d }: { d: InvoicingMoment }) {
  const { at, w } = useStoryCtx();
  const stops = [d.dates.hours, d.dates.sent, d.dates.reminder, d.dates.paid];
  const stopAt = [0, at.sent, at.reminder, at.paid];
  const events = [d.hours.label.split(" · ")[0], d.notes.sent, d.notes.reminder, d.payment.label];

  // Marker positions: measured centre of each stop dot (layout positions, transforms ignored).
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const [pos, setPos] = useState<P[]>(stops.map(() => ({ x: 0, y: 0 })));
  useIsoLayout(() => {
    const el = dots.current;
    if (el.every((e) => e?.offsetParent)) setPos(el.map((e) => { const li = e!.offsetParent as HTMLElement; return { x: li.offsetLeft + e!.offsetLeft, y: li.offsetTop + e!.offsetTop }; }));
  }, [w]);
  const marker = (t: number): P => {
    let p = pos[0];
    stopAt.slice(1).forEach((a, i) => { const q = antic(k(t, a, 0.7, lin)); p = { x: lerp(p.x, pos[i + 1].x, q), y: lerp(p.y, pos[i + 1].y, q) }; });
    return p;
  };

  const inv = at.invoice, paidAt = at.paid, matchAt = at.paid + 0.9, bookAt = at.booked;
  const cross = (a: number) => [(t: number) => ({ opacity: 1 - k(t, a, 0.25) }), (t: number) => ({ opacity: k(t, a + 0.25, 0.3), y: lerp(3, 0, k(t, a + 0.25, 0.35)) })] as const;
  const [hOut, hIn] = cross(inv);

  return (
    <div className="flex h-full flex-col gap-3 cq-md:flex-row cq-md:gap-5">
      {/* Date rail */}
      <ol className="relative flex shrink-0 justify-between gap-2 pt-1 cq-md:w-[128px] cq-md:flex-col cq-md:justify-start cq-md:gap-0 cq-md:pt-2">
        <span aria-hidden className="absolute left-[5px] right-[5px] top-[10px] h-px bg-line-2 cq-md:bottom-[70px] cq-md:left-[5px] cq-md:right-auto cq-md:top-[14px] cq-md:h-auto cq-md:w-px" />
        {stops.map((s, i) => (
          <li key={i} className={`relative flex min-w-0 flex-col gap-1.5 cq-md:min-h-[78px] cq-md:flex-row cq-md:items-start cq-md:gap-3 ${i === stops.length - 1 ? "items-end text-right cq-md:text-left" : "items-start"}`}>
            <span ref={(e) => { dots.current[i] = e; }} aria-hidden className="relative z-[1] mt-[5px] h-[11px] w-[11px] shrink-0 rounded-full border border-line-2 bg-white" />
            <M f={(t) => ({ opacity: lerp(0.7, 1, k(t, stopAt[i], 0.3)) })} className="min-w-0 text-[13px] leading-tight">
              <p className="font-mono tabular-nums text-ink">{s}</p>
              <p className="mt-0.5 hidden text-slate cq-md:block">{events[i]}</p>
              {i === 2 && <p className="mt-1 hidden font-mono text-slate cq-lg:block">{d.dates.gap}</p>}
            </M>
          </li>
        ))}
        <M f={(t) => { const p = marker(t); return { x: p.x, y: p.y }; }} aria-hidden className="absolute left-0 top-0 z-[2] h-[11px] w-[11px] rounded-full bg-cobalt ring-4 ring-cobalt/15" />
      </ol>

      {/* The document */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className={`${CARD} relative z-[1]`}>
          <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
            <div className="grid min-w-0 [&>*]:[grid-area:1/1]">
              <M f={hOut} as="p" className="text-[13px] font-semibold text-ink">{d.hours.label}</M>
              <M f={hIn} as="p" className="text-[13px] text-ink"><span className="font-semibold">{d.invoice.label} {d.invoice.number}</span> <span className="text-slate">· {d.invoice.client}</span></M>
            </div>
            <span className={`${MONO} shrink-0`}>{d.tool}</span>
          </div>
          <ul className="px-4 pt-1.5">
            {d.hours.rows.map((r, i) => {
              const [o, n] = cross(inv + 0.15 + i * 0.12);
              return (
                <li key={i} className="flex items-baseline gap-3 border-b border-line py-1.5 text-[13px] leading-snug last:border-0">
                  <span className="w-[42px] shrink-0 text-slate">{r.who}</span>
                  <span className="min-w-0 flex-1 text-ink">{r.what}</span>
                  <span className="grid shrink-0 text-right font-mono tabular-nums [&>*]:[grid-area:1/1]">
                    <M f={o} as="span" className="text-slate">{r.hours}</M>
                    <M f={n} as="span" className="text-ink">{r.amount}</M>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mx-4 border-t border-line-2 pb-3 pt-2 text-[13px]">
            {[d.invoice.subtotal, d.invoice.vat].map(([l, v], i) => (
              <M key={l} f={(t) => ({ opacity: k(t, inv + 0.6 + i * 0.1, 0.3) })} className="flex justify-between gap-3 leading-snug text-slate">
                <span>{l}</span><span className="font-mono tabular-nums">{v}</span>
              </M>
            ))}
            <div className="mt-1 flex items-baseline justify-between gap-3">
              <span className="font-semibold text-ink">{d.invoice.total[0]}</span>
              <span className="grid text-right font-display text-[22px] font-bold tabular-nums tracking-[-0.02em] text-ink [&>*]:[grid-area:1/1]">
                <M f={(t) => ({ opacity: 1 - k(t, inv + 0.8, 0.25) })} as="span" className="text-slate">{d.hours.total}</M>
                <M f={(t) => ({ opacity: k(t, inv + 1.05, 0.3), y: lerp(6, 0, k(t, inv + 1.05, 0.45)) })} as="span">{d.invoice.total[1]}</M>
              </span>
            </div>
          </div>
          {/* Status line: one cell, three states */}
          <div className="grid border-t border-line px-4 py-2.5 text-[13px] leading-snug [&>*]:[grid-area:1/1]">
            <M f={(t) => ({ opacity: k(t, at.sent + 0.2, 0.3) * (1 - k(t, at.reminder + 0.3, 0.1)) })} as="p" className="text-ink">{d.notes.sent}</M>
            <M f={(t) => ({ opacity: k(t, at.reminder + 0.4, 0.3) * (1 - k(t, bookAt, 0.2)) })} as="p" className="flex items-center gap-1.5 font-medium text-ink"><span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-warn" />{d.notes.reminder}</M>
            <M f={(t) => ({ opacity: k(t, bookAt + 0.2, 0.3) })} className="flex items-center gap-2 font-medium text-ok-ink"><Tick at={bookAt + 0.3} className="h-4 w-4" />{d.notes.booked}</M>
          </div>
        </div>

        {/* The payment arrives under the invoice and is matched to it (connector); both stay as the end frame */}
        <div className="relative mt-4 self-end w-[86%] cq-md:w-[70%]">
          <M f={(t) => ({ scaleY: k(t, matchAt - 0.1, 0.35) })} style={{ transformOrigin: "50% 100%" }} aria-hidden className="absolute -top-4 right-10 h-4 w-px bg-cobalt" />
          <M f={(t) => {
            const inP = k(t, paidAt + 0.1, 0.7);
            return { opacity: k(t, paidAt + 0.1, 0.25), x: lerp(60, 0, inP) };
          }} className={`${CARD} px-3 py-2.5`}>
            <div className="flex items-baseline justify-between gap-3">
              <span className={MONO}>{d.payment.label}</span>
              <span className="whitespace-nowrap font-display text-[17px] font-bold tabular-nums text-ink">{d.payment.amount}</span>
            </div>
            <p className="text-[13px] text-slate">{d.payment.from}</p>
            <M f={(t) => ({ opacity: k(t, matchAt, 0.3) })} as="p" className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-cobalt">
              <Tick at={matchAt + 0.05} className="h-3.5 w-3.5" />{d.payment.match}
            </M>
          </M>
        </div>
      </div>
    </div>
  );
}
