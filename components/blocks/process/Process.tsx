// How we work · Pattern P4 (timeline ledger): five stops on one track. A bracket spans first call → go-live
// ("Live binnen 4 weken"), a dashed span marks what continues after. Not cards: one line, read left to right.
// Content: ProcessBlock (ACF layout `process`).
import type { ProcessBlock } from "./schema";
import { H2, Heading } from "../ui";
import Track, { Stop } from "./Track";

export default function Process({ content: c }: { content: ProcessBlock }) {
  const n = c.steps.length;
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-paper">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[600px]`} />
          <p data-reveal="" className="max-w-[460px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>
        </div>

        <div className="mt-14 lg:mt-24">
          <Track liveAt={c.live_step} count={n} span={c.track.span} after={c.track.after}>
            <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-5 lg:gap-8">
              {c.steps.map((s, i) => {
                const kind = i < c.live_step ? "before" : i === c.live_step ? "live" : "after";
                // Phone: the desktop bracket becomes a label at the start of each span.
                const group = i === 0 ? c.track.span : i === c.live_step + 1 ? c.track.after : "";
                return (
                  <li key={s.title} className="relative min-w-0 pl-9 lg:pl-0 lg:pt-10">
                    {group && (
                      <p aria-hidden className={`-mt-1 mb-3 font-mono text-[12px] uppercase tracking-[0.1em] lg:hidden ${i === 0 ? "font-medium text-cobalt" : "text-slate"}`}>{group}</p>
                    )}
                    <div className="relative lg:static">
                    <Stop kind={kind} />
                    <p className={`mb-2 font-mono text-[12px] tabular-nums tracking-[0.1em] ${kind === "live" ? "font-medium text-cobalt" : "text-slate"}`}>
                      <span className="sr-only">{c.track.step} </span>{String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] [overflow-wrap:anywhere]">{s.title}</h3>
                    <p className="mt-2 text-pretty text-[15.5px] leading-[1.55] text-ink/80">{s.text}</p>
                    <p className="mt-3 text-pretty text-[14px] leading-[1.5] text-slate">{s.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Track>
        </div>
      </div>
    </section>
  );
}
