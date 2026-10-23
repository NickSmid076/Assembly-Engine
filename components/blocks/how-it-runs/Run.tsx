"use client";
// One example run, told on the shared story clock (services/moments/clock): what came in, then each
// step lands in the log in turn (tool, action, time), a person's step makes the run wait until they
// approve, and the run ends "finished". Rhythm: staccato machine steps, one held breath for the person.
// Distinct from the service moments: nothing travels between artefacts here; the log grows, row by row.
import { M, k, lerp, spring, useStoryCtx } from "../services/moments/clock";
import { CARD, MONO, Tick } from "../services/moments/ui";
import type { Run as RunData, RunFocus, RunRow } from "./schema";

const WAIT = 2.0; // how long the run waits for the person (s)
const lin = (x: number) => x;

/** Text that is quietly marked when a point on the left talks about it. */
const mark = (on: boolean) => `rounded-[4px] transition-[background-color,box-shadow] duration-150 ${on ? "bg-ice shadow-[0_0_0_3px_#EDF1FF]" : ""}`;

function Row({ r, last, nextAt, focus }: { r: RunRow; last: boolean; nextAt: number; focus: RunFocus | null }) {
  const a = r.at;
  const approveAt = a + WAIT; // person rows: the moment of approval
  const doneAt = r.person ? approveAt + 0.15 : a + 0.25;
  return (
    <li className="relative grid min-h-[50px] grid-cols-[minmax(0,1fr)_16px] items-start gap-x-3 pb-2 cq-md:grid-cols-[64px_minmax(0,1fr)_16px]">
      {/* spine: this row's node, and the segment down to the next row (fills when the next row starts) */}
      <span aria-hidden className="absolute -left-[22px] top-[5px] h-[11px] w-[11px] rounded-full border border-line-2 bg-white" />
      <M aria-hidden f={(t) => ({ opacity: k(t, a, 0.15), scale: spring(k(t, a, 0.45, lin), 1.6) })} className="absolute -left-[22px] top-[5px] h-[11px] w-[11px] rounded-full bg-cobalt" />
      {!last && (
        <span aria-hidden className="absolute -left-[17px] bottom-0 top-[18px] w-px bg-line-2">
          <M f={(t) => ({ scaleY: k(t, nextAt - 0.35, 0.35) })} style={{ transformOrigin: "50% 0%" }} className="absolute inset-0 bg-cobalt" />
        </span>
      )}
      {/* the newest row is lit for a moment */}
      <M aria-hidden f={(t) => ({ opacity: k(t, a, 0.15) * (1 - k(t, (r.person ? approveAt : a) + 0.6, 0.6)) })} className="pointer-events-none absolute -inset-x-2 -top-1 bottom-1 rounded-md bg-ice" />

      <M as="p" f={(t) => ({ opacity: r.person ? k(t, approveAt, 0.25) : k(t, a, 0.25) })} className={`relative hidden pt-[1px] font-mono text-[13px] tabular-nums text-slate cq-md:block ${mark(focus === "log")}`}>
        {r.time}
      </M>
      <M f={(t) => ({ opacity: k(t, a, 0.3), x: lerp(-6, 0, k(t, a, 0.4)) })} className="relative min-w-0 text-[14px] leading-[1.35]">
        <M as="p" aria-hidden f={(t) => ({ opacity: r.person ? k(t, approveAt, 0.25) : 1 })} className="font-mono text-[13px] tabular-nums text-slate cq-md:hidden">{r.time}</M>
        <p className="text-ink"><span className={`font-semibold ${mark(focus === "tools")}`}>{r.tool}</span> <span className="text-ink/80">· {r.text}</span></p>
        {r.person && (
          <div className={`mt-1.5 grid min-h-[30px] items-center [&>*]:[grid-area:1/1] ${mark(focus === "person")}`}>
            <M f={(t) => ({ opacity: k(t, a + 0.2, 0.3) * (1 - k(t, approveAt + 0.05, 0.2)) })} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2 text-[13px] text-slate">
                <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ice font-display text-[12px] font-bold text-cobalt">{r.person.name.slice(0, 1)}</span>
                {r.person.waiting}
              </span>
              <M as="span" f={(t) => ({ scale: 1 - 0.06 * Math.sin(Math.PI * k(t, approveAt - 0.3, 0.3, lin)) })}
                className="inline-flex h-7 shrink-0 items-center rounded-md bg-cobalt px-2.5 text-[13px] font-semibold text-white">{r.person.approve}</M>
            </M>
            <M f={(t) => ({ opacity: k(t, approveAt + 0.1, 0.3), y: lerp(3, 0, k(t, approveAt + 0.1, 0.4)) })} className="flex items-center gap-2 text-[13px] font-medium text-ok-ink">
              <span aria-hidden className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ok-soft font-display text-[12px] font-bold text-ok-ink">{r.person.name.slice(0, 1)}</span>
              {r.person.approved}
            </M>
          </div>
        )}
      </M>
      <M as="span" f={(t) => ({ opacity: k(t, doneAt - 0.05, 0.2), scale: spring(k(t, doneAt - 0.05, 0.4, lin), 1.4) })} className="relative block pt-0.5"><Tick at={doneAt} className="h-4 w-4" /></M>
    </li>
  );
}

export default function Run({ d, focus, logLabel }: { d: RunData; focus: RunFocus | null; logLabel: string }) {
  const { D } = useStoryCtx();
  const rows = d.rows;
  const end = rows[rows.length - 1];
  const doneAt = Math.min(D - 0.4, (end.person ? end.at + WAIT : end.at) + 0.6);
  return (
    <div className="flex h-full flex-col">
      {/* What came in */}
      <M f={(t) => ({ opacity: k(t, 0.1, 0.3), y: lerp(-14, 0, spring(k(t, 0.1, 0.6, lin), 1.2)) })} className={`${CARD} px-4 py-3`}>
        <div className="flex items-baseline justify-between gap-3">
          <span className={MONO}>{d.start.label} · <span className={mark(focus === "log")}>{d.start.time}</span></span>
          <span className={`${MONO} hidden text-right cq-md:inline`}>{d.start.via}</span>
        </div>
        <p className="mt-1 font-display text-[16px] font-bold leading-snug text-ink">{d.start.title}</p>
        <p className="text-[13px] leading-snug text-slate">{d.start.detail}<span className="cq-md:hidden"> · {d.start.via}</span></p>
      </M>

      {/* The log */}
      <p className="mt-4 text-[13px] font-semibold text-ink">{logLabel}</p>
      <ol className="relative mt-2 pl-[30px]">
        {rows.map((r, i) => (
          <Row key={r.label} r={r} last={i === rows.length - 1} nextAt={rows[i + 1]?.at ?? D} focus={focus} />
        ))}
      </ol>

      {/* Finished */}
      <M f={(t) => ({ opacity: k(t, doneAt, 0.3), y: lerp(6, 0, k(t, doneAt, 0.45)) })}
        className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-[14px] font-semibold text-ok-ink">
        <Tick at={doneAt + 0.1} className="h-4 w-4" />{d.done}
      </M>
    </div>
  );
}
