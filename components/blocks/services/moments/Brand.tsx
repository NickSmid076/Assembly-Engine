"use client";
// Moment 1 · Brand & Digital Presence (9 s, legato with springs).
// A brand guide locks its mark, type and colour; a live page slides over it and the mark, the cobalt
// swatch and the type travel from the guide into the page's nav, button and headline; the button books an
// intro call. Two overlapping sheets; the page with its booking slip is the end frame.
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;
import { M, MPath, antic, eio as eioLocal, k, lerp, spring, useStoryCtx } from "./clock";
import type { BrandMoment } from "./schema";
import { CARD, MONO, Tick, useDeltas } from "./ui";

const lin = (x: number) => x;
const bump = (t: number, a: number, d: number) => (t < a || t > a + d ? 0 : Math.sin(((t - a) / d) * Math.PI));

function Mark({ mark, size, className = "" }: { mark: string; size: number; className?: string }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden className={`block ${className}`}>
      <rect width="44" height="44" rx="9" className="fill-ink" />
      <rect x="30" y="34" width="9" height="4" rx="1" className="fill-cobalt-2" />
      <text x="21" y="28" textAnchor="middle" className="fill-white font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em" }}>{mark}</text>
    </svg>
  );
}

export default function Brand({ d }: { d: BrandMoment }) {
  const { at, w } = useStoryCtx();
  const root = useRef<HTMLDivElement>(null);
  const markSrc = useRef<HTMLDivElement>(null), markDst = useRef<HTMLDivElement>(null);
  const swSrc = useRef<HTMLDivElement>(null), swDst = useRef<HTMLDivElement>(null);
  const aaSrc = useRef<HTMLDivElement>(null), aaDst = useRef<HTMLDivElement>(null);
  const cobalt = Math.max(0, d.colours.findIndex((c) => c.hex === "#2E5BFF"));

  // The guide starts centred (the focal point), then steps left as the page slides in from the right.
  // Travellers live inside the page: they start on the guide's current position and cancel the page's offset.
  const wide = w >= 440;
  const guideCx = (w - w * (wide ? 0.48 : 0.8)) / 2;
  const guideX = (t: number) => lerp(guideCx, 0, k(t, at.page - 0.1, 0.8, eioLocal));
  const pageX = (t: number) => lerp(56, 0, k(t, at.page, 0.75));
  const travel = (t0: number, dl: typeof dm, uniform = true) => (t: number) => {
    const p = antic(k(t, t0, 0.9, lin));
    return {
      opacity: t >= t0 ? 1 : 0,
      x: lerp(dl.dx + guideX(t), 0, p) - pageX(t),
      y: lerp(dl.dy, 0, p),
      ...(uniform ? { scale: lerp(dl.sy, 1, p) } : { scaleX: lerp(dl.sx, 1, p), scaleY: lerp(dl.sy, 1, p) }),
    };
  };
  const tMark = at.page + 0.15, tSw = at.page + 0.3, tAa = at.page + 0.45;
  // On a narrow stage the page covers the guide from its type row down, so no half-letters peek out.
  const typeRow = useRef<HTMLDivElement>(null), guideEl = useRef<HTMLDivElement>(null);
  const [coverTop, setCoverTop] = useState<number | null>(null);
  useIsoLayout(() => {
    if (wide || !typeRow.current || !guideEl.current) return setCoverTop(null);
    setCoverTop(guideEl.current.offsetTop + typeRow.current.offsetTop - 2);
  }, [w, wide]);
  const [dm, ds, da] = useDeltas(root, [[markSrc, markDst], [swSrc, swDst], [aaSrc, aaDst]], [w, coverTop]);
  const appear = (a: number, dy = 6) => (t: number) => ({ opacity: k(t, a, 0.4), y: lerp(dy, 0, k(t, a, 0.5)) });
  const slot = (a: number) => (t: number) => ({ opacity: 1 - k(t, a, 0.3) });

  return (
    <div ref={root} className="relative h-full">
      {/* The brand guide */}
      <div ref={guideEl} className="absolute left-0 top-0 w-[80%] cq-md:w-[48%]">
      <M f={(t) => ({ x: guideX(t), scale: lerp(1, 0.97, k(t, at.page, 0.6)) })} style={{ transformOrigin: "0 0" }}
        className={`${CARD} p-4`}>
        <div className="flex items-baseline justify-between gap-2"><span className={MONO}>{d.guide.title}</span><span className={MONO}>{d.guide.version}</span></div>

        <div className="mt-3 border-t border-line pt-3">
          <p className={MONO}>{d.guide.mark}</p>
          <div className="relative mt-2 flex min-h-[44px] items-center gap-3">
            <M f={slot(at.mark + 0.7)} aria-hidden className="absolute left-0 top-0 h-11 w-11 rounded-[9px] border border-dashed border-line-2" />
            <div ref={markSrc} className="relative h-11 w-11 shrink-0">
              <svg viewBox="0 0 44 44" aria-hidden className="absolute inset-0"><MPath d="M10 1H34A9 9 0 0 1 43 10V34A9 9 0 0 1 34 43H10A9 9 0 0 1 1 34V10A9 9 0 0 1 10 1Z" fill="none" strokeWidth="2" className="stroke-ink" f={(t) => k(t, at.mark + 0.1, 0.7)} /></svg>
              <M f={(t) => ({ opacity: k(t, at.mark + 0.7, 0.3), scale: lerp(0.86, 1, spring(k(t, at.mark + 0.7, 0.55, lin))) })}><Mark mark={d.mark} size={44} /></M>
            </div>
            <M f={(t) => ({ opacity: k(t, at.mark + 0.9, 0.4), x: lerp(-6, 0, k(t, at.mark + 0.9, 0.5)) })} className="min-w-0">
              <p className="font-display text-[15px] font-bold leading-tight text-ink">{d.firm}</p>
              <p className="text-[13px] leading-snug text-slate">{d.tagline}</p>
            </M>
          </div>
        </div>

        <div ref={typeRow} className="mt-3 border-t border-line pt-3">
          <p className={MONO}>{d.guide.type}</p>
          <div className="relative mt-1">
            <M f={slot(at.type)} aria-hidden className="absolute left-0 top-1 h-9 w-12 rounded-md border border-dashed border-line-2" />
            <M f={(t) => ({ opacity: k(t, at.type, 0.35), y: lerp(10, 0, spring(k(t, at.type, 0.6, lin))) })}>
              <div ref={aaSrc} className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-ink">{d.type.specimen}</div>
            </M>
            <div className="mt-1.5 min-w-0 text-[13px] leading-snug">
              <M f={appear(at.type + 0.12)} as="p" className="font-semibold text-ink">{d.type.display}</M>
              <M f={appear(at.type + 0.2)} as="p" className="text-slate">{d.type.body}</M>
            </div>
          </div>
        </div>

        <div className="mt-3 border-t border-line pt-3">
          <p className={MONO}>{d.guide.colour}</p>
          <div className="mt-2 flex gap-2.5">
            {d.colours.map((c, i) => {
              const a = at.colour + i * 0.18;
              return (
                <div key={c.name} className="relative min-w-[48px]">
                  <M f={slot(a)} aria-hidden className="absolute left-0 top-0 h-7 w-12 rounded-md border border-dashed border-line-2" />
                  <M f={(t) => ({ opacity: k(t, a, 0.25), y: lerp(-12, 0, spring(k(t, a, 0.55, lin))) })}>
                    <div ref={i === cobalt ? swSrc : undefined} className="h-7 w-12 rounded-md ring-1 ring-inset ring-ink/10" style={{ background: c.hex }} />
                    <p className="mt-1.5 text-[13px] font-medium leading-tight text-ink">{c.name}</p>
                  </M>
                </div>
              );
            })}
          </div>
        </div>
      </M>
      </div>

      {/* The live page */}
      <M f={(t) => ({ opacity: k(t, at.page, 0.35), x: pageX(t) })} style={coverTop === null ? undefined : { top: coverTop }}
        className={`${CARD} absolute bottom-[46px] left-0 right-0 cq-md:left-auto cq-md:w-[66%]`}>
        <p className={`${MONO} rounded-t-xl border-b border-line px-4 py-2`}>{d.page.url}</p>
        <div className="flex items-center gap-2 px-4 pt-3">
          <M f={travel(tMark, dm)} style={{ transformOrigin: "0 0" }}><div ref={markDst}><Mark mark={d.mark} size={26} /></div></M>
          <M f={appear(tMark + 0.7, 0)} className="font-display text-[13px] font-bold text-ink">{d.firm}</M>
          <M f={appear(at.page + 0.7, 0)} as="p" className="ml-auto hidden gap-3 text-[13px] text-slate cq-lg:flex">
            {d.page.nav.map((n) => <span key={n}>{n}</span>)}
          </M>
        </div>
        <div className="px-4 pb-4 pt-4">
          <div className="relative">
            <M f={(t) => ({ ...travel(tAa, da)(t), opacity: t >= tAa ? 1 - k(t, tAa + 0.75, 0.3) : 0 })} style={{ transformOrigin: "0 0" }} aria-hidden className="absolute left-0 top-0">
              <div ref={aaDst} className="font-display text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-ink cq-lg:text-[23px]">{d.type.specimen}</div>
            </M>
            <M f={appear(tAa + 0.75, 4)} as="p" className="text-balance font-display text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-ink cq-lg:text-[23px]">{d.page.headline}</M>
          </div>
          <M f={appear(at.page + 0.8)} as="p" className="mt-2 max-w-[34ch] text-[13px] leading-[1.45] text-slate">{d.page.body}</M>
          <M f={(t) => ({ scale: 1 - 0.035 * bump(t, at.booked, 0.28) })} className="relative mt-3 inline-flex h-9 items-center rounded-md px-4">
            <M f={travel(tSw, ds, false)} style={{ transformOrigin: "0 0" }} aria-hidden className="absolute inset-0"><div ref={swDst} className="h-full w-full rounded-md bg-cobalt" /></M>
            <M f={(t) => ({ opacity: k(t, tSw + 0.8, 0.3) })} as="span" className="relative text-[13px] font-semibold text-white">{d.page.button}</M>
          </M>
        </div>
      </M>

      {/* The booking */}
      <M f={(t) => ({ opacity: k(t, at.booked + 0.25, 0.3), y: lerp(18, 0, spring(k(t, at.booked + 0.25, 0.6, lin), 1.1)) })}
        className={`${CARD} absolute bottom-0 right-3 flex w-[84%] items-start gap-2.5 px-3 py-2.5 cq-md:right-6 cq-md:w-[56%]`}>
        <Tick at={at.booked + 0.6} className="mt-0.5 h-[18px] w-[18px]" />
        <div className="min-w-0 text-[13px] leading-[1.35]">
          <p className="font-semibold text-ink">{d.booking.label} · {d.booking.when}</p>
          <p className="text-slate">{d.booking.who} · {d.booking.via}</p>
        </div>
      </M>
    </div>
  );
}

