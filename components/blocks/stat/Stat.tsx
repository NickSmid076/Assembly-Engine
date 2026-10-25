// Stat · one sourced figure, set large, with its source link underneath. Without a source it renders nothing.
// Content: StatBlock. Server component.
import type { StatBlock } from "./schema";

export default function Stat({ content: c }: { content: StatBlock }) {
  if (!c.source?.url || !c.source.title) return null;
  return (
    <figure className="border-t-2 border-ink pt-6">
      <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-x-8 gap-y-3 sm:grid-cols-[auto_minmax(0,1fr)]">
        <p className="font-display text-[64px] font-bold leading-[0.9] tracking-[-0.045em] tabular-nums text-ink sm:text-[84px]">{c.value}</p>
        <p className="max-w-[340px] text-pretty pb-1 text-[17px] leading-[1.45] text-ink">{c.label}</p>
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-2 border-t border-line pt-3 font-mono text-[12px] leading-[1.6] text-slate">
        <span className="uppercase tracking-[0.1em]">{c.labels.source}</span>
        <a href={c.source.url} target="_blank" rel="noopener noreferrer" className="focus-ring rounded text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink">{c.source.title}</a>
        {c.note && <span className="basis-full font-sans text-[13.5px] text-slate">{c.note}</span>}
      </figcaption>
    </figure>
  );
}
