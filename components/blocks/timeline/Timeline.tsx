// Timeline · milestones on one vertical hairline, like the case timeline: done/fixed dots in ink, expected ones
// dashed in slate with an "expected" label, so a planned date never reads as a fact. Content: TimelineBlock.
import type { TimelineBlock } from "./schema";

export default function Timeline({ content: c }: { content: TimelineBlock }) {
  return (
    <figure>
      {c.title && <p className="mb-5 font-display text-[18px] font-bold leading-[1.3] text-ink">{c.title}</p>}
      <ol className="relative">
        <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line-2" />
        {c.items.map((it, i) => (
          <li key={i} className="relative grid grid-cols-[minmax(0,1fr)] gap-x-6 pb-6 pl-8 last:pb-0 sm:grid-cols-[132px_minmax(0,1fr)]">
            <span aria-hidden className={`absolute left-0 top-[6px] h-[11px] w-[11px] rounded-full border-2 ${it.expected ? "border-slate bg-white" : "border-ink bg-ink"}`} />
            <p className="font-mono text-[13px] leading-[1.5] tabular-nums text-ink">
              {it.date}
              {it.expected && <span className="ml-2 inline-block rounded border border-line-2 px-1.5 text-[11px] uppercase tracking-[0.08em] text-slate sm:ml-0 sm:mt-1 sm:block sm:w-fit">{c.labels.expected}</span>}
            </p>
            <div className="mt-1 min-w-0 sm:mt-0">
              <p className="font-display text-[17px] font-bold leading-[1.35] text-ink">{it.title}</p>
              {it.text && <p className="mt-1 text-pretty text-[15.5px] leading-[1.55] text-ink/80">{it.text}</p>}
            </div>
          </li>
        ))}
      </ol>
      {c.caption && <figcaption className="mt-5 border-t border-line pt-3 text-[14px] leading-[1.5] text-slate">{c.caption}</figcaption>}
    </figure>
  );
}
