"use client";
// Moment 5 · Business Reporting Automation (10 s: converge, then settle).
// Three systems (accounting, time tracking, pipeline) float as layers above one plane; one figure from
// each drops to the plane, the layers collapse onto it and the plane turns flat to face the visitor as
// the dashboard. The numbers settle (digit roll with a little overshoot) and the Monday email composes.
// Desktop: CSS 3D (real HTML text, no WebGL). Narrow stage: the same story flat (strips slide down).
import { M, eio, k, lerp, spring, useStoryCtx } from "./clock";
import type { ReportingMoment } from "./schema";
import { CARD, MONO, Tick } from "./ui";

const lin = (x: number) => x;
const TILT = { x: 44, z: -10 }; // degrees: the isometric-ish view of the stack
const LINE = 26; // px line height of a KPI value (digit roll)

/** A value whose digits roll up into place, each a little later than the previous, with overshoot. */
function Roll({ value, at }: { value: string; at: number }) {
  let n = 0;
  return (
    <span className="inline-flex">
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} aria-hidden>{ch}</span>;
        const d = Number(ch), a = at + n++ * 0.06;
        return (
          <span key={i} aria-hidden className="relative inline-block overflow-hidden" style={{ height: LINE }}>
            <span className="invisible">{ch}</span>
            <M as="span" f={(t) => ({ y: -lerp(0, d, spring(k(t, a, 0.7, lin), 0.6)) * LINE })} className="absolute left-0 top-0 flex flex-col">
              {"01234567890".split("").map((c, j) => <span key={j} style={{ height: LINE, lineHeight: `${LINE}px` }}>{c}</span>)}
            </M>
          </span>
        );
      })}
    </span>
  );
}

export default function Reporting({ d }: { d: ReportingMoment }) {
  const { at, w } = useStoryCtx();
  const wide = w >= 440;
  const flat = (t: number) => k(t, at.merge + 0.5, 1.1, eio); // 0 = tilted stack, 1 = flat dashboard
  const collapse = (t: number) => k(t, at.merge, 0.7, eio);
  const drops = d.sources.map((_, i) => at.flow + 0.2 + i * 0.45);

  return (
    <div className="relative h-full [perspective:1400px]">
      {/* The plane that becomes the dashboard, carrying the source layers above it while tilted */}
      <M f={(t) => {
        const f = flat(t);
        return wide ? { rotateX: lerp(TILT.x, 0, f), rotateZ: lerp(TILT.z, 0, f), y: lerp(70, 0, f) } : { rotateX: 0, rotateZ: 0, y: 0 };
      }} style={{ transformStyle: "preserve-3d" }} className="absolute inset-x-0 top-0">
        <div className={`${CARD} px-4 pb-3 pt-2.5`}>
          <M f={(t) => ({ opacity: lerp(0.2, 1, k(t, at.merge + 0.4, 0.6)) })}>
          <div className="flex items-baseline justify-between gap-3 border-b border-line pb-2">
            <span className="text-[13px] font-semibold text-ink">{d.dashboard.title}</span>
            <span className={`${MONO} shrink-0`}>{d.dashboard.tool}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {d.dashboard.kpis.map((kp, i) => (
              <M key={kp.label} f={(t) => ({ opacity: lerp(0.25, 1, k(t, at.merge + 0.9 + i * 0.1, 0.4)) })} className="min-w-0">
                <p className="text-[13px] text-slate">{kp.label}</p>
                <p className="font-display text-[19px] font-bold tabular-nums tracking-[-0.02em] text-ink cq-lg:text-[22px]" style={{ lineHeight: `${LINE}px` }}>
                  <Roll value={kp.value} at={at.settle + i * 0.15} />
                </p>
                <p className="text-[13px] leading-snug text-slate">{kp.note}</p>
              </M>
            ))}
          </div>
          <div className="mt-3 border-t border-line pt-2">
            <p className="text-[13px] text-slate">{d.dashboard.bars_label}</p>
            <div className="mt-1.5 flex h-[54px] items-end gap-1.5">
              {d.dashboard.bars.map((b, i) => (
                <M key={i} f={(t) => ({ scaleY: lerp(0.06, 1, k(t, at.settle + 0.3 + i * 0.07, 0.6)) })} style={{ height: `${b}%`, transformOrigin: "50% 100%" }}
                  className={`flex-1 rounded-t-[3px] ${i === d.dashboard.bars.length - 1 ? "bg-cobalt" : "bg-peri"}`} />
              ))}
            </div>
          </div>
          </M>
        </div>

        {/* Source layers: floating above the plane (z) on desktop, stacked strips on a narrow stage */}
        {d.sources.map((s, i) => {
          const lift = 70 + i * 6; // each source floats above the tile it feeds
          return (
            <M key={s.tool} f={(t) => {
              const c = collapse(t);
              return wide
                ? { opacity: (1 - c) * k(t, 0.1 + i * 0.15, 0.4), z: lerp(lift, 0, c), x: 0, y: 0 }
                : { opacity: (1 - c) * k(t, 0.1 + i * 0.15, 0.4), z: 0, x: 0, y: lerp(i * 58, 120, c) };
            }} style={wide ? { transformStyle: "preserve-3d", left: `calc(${i * 33.333}% + ${10 - i * 4}px)`, width: "calc(33.333% - 8px)", top: 44 } : { left: "7%", right: "7%", top: "8%" }}
              className={`${CARD} absolute px-3 py-2`}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold text-ink">{s.tool}</span>
                {!wide && <span className={MONO}>{s.what}</span>}
              </div>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2 text-[13px]">
                <span className="text-slate">{s.rows[0][0]}</span>
                <M as="span" f={(t) => ({ opacity: 1 - 0.6 * k(t, drops[i], 0.2) })} className="font-mono tabular-nums text-cobalt">{s.rows[0][1]}</M>
              </div>
              {/* The figure that drops to the plane */}
              <M as="span" aria-hidden f={(t) => {
                const p = k(t, drops[i], 0.6, eio);
                return wide
                  ? { opacity: t >= drops[i] ? 1 - k(t, drops[i] + 0.5, 0.2) : 0, z: -lift * p, x: 0, y: 0 }
                  : { opacity: t >= drops[i] ? 1 - k(t, drops[i] + 0.5, 0.2) : 0, z: 0, x: 0, y: (120 - i * 58) * p };
              }} className="absolute bottom-2 right-3 rounded bg-cobalt px-1.5 font-mono text-[13px] tabular-nums text-white">
                {s.rows[0][1]}
              </M>
            </M>
          );
        })}
      </M>

      {/* The Monday email */}
      <M f={(t) => ({ opacity: k(t, at.summary, 0.3), y: lerp(24, 0, k(t, at.summary, 0.6)) })}
        className={`${CARD} absolute bottom-0 left-0 right-0 px-4 py-2.5 cq-md:left-auto cq-md:w-[66%]`}>
        <div className="flex items-baseline justify-between gap-3">
          <span className={MONO}>{d.email.tool} · {d.email.from}</span>
          <span className={`${MONO} shrink-0`}>{d.email.time}</span>
        </div>
        <p className="mt-1 text-[13px] font-semibold text-ink">{d.email.subject}</p>
        <ul className="mt-1 space-y-0.5 text-[13px] leading-snug text-ink/85">
          {d.email.lines.map((l, i) => {
            const a = at.summary + 0.5 + i * 0.4;
            return (
              <M as="li" key={i} f={(t) => ({ opacity: k(t, a, 0.3), x: lerp(-4, 0, k(t, a, 0.35)) })} className="flex items-start gap-2">
                <Tick at={a + 0.1} className="mt-0.5 h-3.5 w-3.5" />{l}
              </M>
            );
          })}
        </ul>
      </M>
    </div>
  );
}
