"use client";
// Moment 2 · Customer Acquisition (11 s: detect, think, wait for a person, glide).
// A buying signal slides in, is scored against the ideal client profile, becomes a HubSpot draft that a
// person approves (a deliberate pause), and the deal is dragged across the pipeline to "meeting booked".
// Composition: work area on top (signal left, draft right), pipeline lane along the bottom. On a narrow
// stage the lane turns into four rows and the deal moves down them.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { M, antic, k, lerp, useStoryCtx } from "./clock";
import type { AcquisitionMoment } from "./schema";
import { CARD, MONO, Tick } from "./ui";

const lin = (x: number) => x;
const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;
type P = { x: number; y: number };

export default function Acquisition({ d }: { d: AcquisitionMoment }) {
  const { at, w } = useStoryCtx();
  const approvedAt = at.approve + 1.1; // the person takes a moment

  // Measure each column's card slot (layout positions, transforms ignored).
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const [pos, setPos] = useState<P[]>([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
  useIsoLayout(() => {
    const s = slots.current;
    if (s.every((el) => el?.offsetParent)) setPos(s.map((el) => ({ x: el!.offsetLeft + (el!.offsetParent as HTMLElement).offsetLeft, y: el!.offsetTop + (el!.offsetParent as HTMLElement).offsetTop })));
  }, [w]);

  // The deal: appears in column 0, then is dragged column by column (anticipation, EASE_IN_OUT legs, short stops).
  const legs = [0, 1, 2].map((i) => at.booked + 0.55 + i * 0.75);
  const where = (t: number): P => {
    let p = pos[0];
    legs.forEach((a, i) => { const q = antic(k(t, a, 0.55, lin)); p = { x: lerp(p.x, pos[i + 1].x, q), y: lerp(p.y, pos[i + 1].y, q) }; });
    return { x: p.x - pos[3].x, y: p.y - pos[3].y };
  };
  const lift = (t: number) => k(t, legs[0] - 0.1, 0.2) * (1 - k(t, legs[2] + 0.55, 0.25));
  const doneAt = legs[2] + 0.6;

  return (
    <div className="relative h-full">
      {/* Signal + fit */}
      <M f={(t) => ({ opacity: k(t, at.signal + 0.1, 0.3), x: lerp(-28, 0, k(t, at.signal + 0.1, 0.6)) })}
        className={`${CARD} absolute left-0 right-0 top-0 cq-md:right-auto cq-md:w-[47%]`}>
        <SignalHead d={d} />
        <div className="border-t border-line px-4 pb-3 pt-2.5">
          <ul className="space-y-1.5">
            {d.fit.criteria.map((c, i) => {
              const a = at.score + 0.15 + i * 0.32;
              return (
                <M as="li" key={c.label} f={(t) => ({ opacity: lerp(0.35, 1, k(t, a, 0.3)) })} className="flex items-center gap-2 text-[13px] leading-snug">
                  <span className="w-[64px] shrink-0 text-slate">{c.label}</span>
                  <span className="min-w-0 flex-1 text-ink">{c.value}</span>
                  <Tick at={a} className="h-4 w-4" />
                </M>
              );
            })}
          </ul>
          <M f={(t) => ({ opacity: k(t, at.score + 1.2, 0.35), y: lerp(4, 0, k(t, at.score + 1.2, 0.4)) })}
            className="mt-2 flex items-baseline justify-between gap-2 border-t border-dashed border-line-2 pt-2 text-[13px]">
            <span className="font-semibold text-ink">{d.fit.label}</span>
            <span className="font-mono tabular-nums text-ok-ink">{d.fit.result}</span>
          </M>
        </div>
      </M>

      {/* HubSpot draft */}
      {/* On a narrow stage the draft covers the fit list but leaves the signal's header in view. An invisible copy
          of the header holds that space in CSS, so the server render already has the final position (no shift). */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 cq-md:left-auto cq-md:w-[50%]">
        <div aria-hidden className="invisible mb-1 border-t border-transparent cq-md:hidden"><SignalHead d={d} /></div>
      <M f={(t) => ({ opacity: k(t, at.draft, 0.35), y: lerp(14, 0, k(t, at.draft, 0.6)) })}
        className={`${CARD} pointer-events-auto`}>
        <div className="flex items-baseline justify-between gap-2 border-b border-line px-4 py-2">
          <span className={MONO}>{d.draft.tool}</span><span className={MONO}>{d.draft.label}</span>
        </div>
        <div className="px-4 pt-2.5 text-[13px] leading-[1.4]">
          <p><span className="text-slate">{d.draft.to_label}</span> <span className="text-ink">{d.draft.to}</span></p>
          <p className="mt-0.5"><span className="text-slate">{d.draft.subject_label}</span> <span className="font-semibold text-ink">{d.draft.subject}</span></p>
          <div className="mt-2 space-y-1 border-t border-line pt-2 text-ink/85">
            {d.draft.lines.map((l, i) => {
              const a = at.draft + 0.55 + i * 0.5;
              return <M as="p" key={i} f={(t) => ({ opacity: k(t, a, 0.35), x: lerp(-4, 0, k(t, a, 0.4)) })}>{l}</M>;
            })}
          </div>
        </div>
        <div className="mx-4 mb-3 mt-3 grid min-h-9 items-center [&>*]:[grid-area:1/1]">
          {/* Before approval: the person, then the button press. After: the sent line, in the same cell. */}
          <M f={(t) => ({ opacity: k(t, at.approve, 0.3) * (1 - k(t, approvedAt + 0.15, 0.2)) })} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2 text-[13px] text-slate">
              <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ice font-display text-[12px] font-bold text-cobalt">{d.draft.approver.slice(0, 1)}</span>
              <span>{d.draft.waiting}</span>
            </span>
            <M f={(t) => ({ scale: 1 - 0.05 * Math.sin(Math.PI * k(t, approvedAt - 0.2, 0.3, lin)) })} as="span"
              className="inline-flex h-8 shrink-0 items-center rounded-md bg-cobalt px-3 text-[13px] font-semibold text-white">{d.draft.approve}</M>
          </M>
          <M f={(t) => ({ opacity: k(t, approvedAt + 0.35, 0.3), y: lerp(4, 0, k(t, approvedAt + 0.35, 0.4)) })} className="flex items-center gap-2 text-[13px] font-medium text-ok-ink">
            <Tick at={approvedAt + 0.3} className="h-4 w-4" />
            <span>{d.draft.approved}</span>
          </M>
        </div>
      </M>
      </div>

      {/* Pipeline lane: 4 columns, or 4 rows on a narrow stage */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 cq-md:grid cq-md:h-[118px] cq-md:grid-cols-4 cq-md:gap-2">
        {d.pipeline.columns.map((c, i) => (
          <div key={c} className="relative flex min-w-0 items-start gap-2 border-t border-line-2 pt-1.5 cq-md:block">
            <p className={`w-[112px] shrink-0 pt-1 text-[13px] leading-tight cq-md:w-auto cq-md:pt-0 ${i === 3 ? "font-semibold text-ink" : "text-slate"}`}>{c}</p>
            <div ref={(el) => { slots.current[i] = el; }} className="relative min-w-0 flex-1 cq-md:mt-2">
              {d.pipeline.others.filter((o) => o.column === i).map((o) => (
                <div key={o.firm} className="inline-block rounded-lg border border-line bg-white px-2 py-1 text-[13px] leading-tight text-ink/80 cq-md:block cq-md:py-1.5">{o.firm}</div>
              ))}
              {i === 3 && (
                <M f={(t) => {
                  const lf = lift(t), p = where(t);
                  return {
                    opacity: k(t, at.booked + 0.1, 0.3),
                    x: p.x,
                    y: p.y + lerp(-10, 0, k(t, at.booked + 0.1, 0.4)) - 3 * lf,
                    scale: 1 + 0.03 * lf,
                    rotate: -1.2 * lf,
                  };
                }} className="relative z-10 inline-block rounded-lg border border-cobalt/40 bg-white px-2 py-1 shadow-[0_10px_24px_-12px_rgba(11,27,51,.45)] cq-md:block cq-md:py-1.5">
                  <p className="text-[13px] font-semibold leading-tight text-ink">{d.pipeline.deal}</p>
                  <div className="mt-0.5 grid text-[13px] leading-tight [&>*]:[grid-area:1/1]">
                    <M f={(t) => ({ opacity: 1 - k(t, doneAt, 0.25) })} as="p" className="text-slate">{d.pipeline.contact}</M>
                    <M f={(t) => ({ opacity: k(t, doneAt + 0.25, 0.3) })} as="p" className="flex items-start gap-1 text-ok-ink"><Tick at={doneAt + 0.3} className="mt-px h-3.5 w-3.5" />{d.pipeline.booked}</M>
                  </div>
                </M>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalHead({ d }: { d: AcquisitionMoment }) {
  return (
    <div className="px-4 pb-3 pt-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[13px] font-semibold text-cobalt">{d.signal.label}</p>
        <p className={MONO}>{d.signal.when}</p>
      </div>
      <p className="mt-1 font-display text-[15px] font-bold leading-snug text-ink">{d.signal.title}</p>
      <p className="text-[13px] leading-snug text-slate"><span className="font-medium text-ink">{d.signal.company}</span> · {d.signal.source}</p>
    </div>
  );
}
