// Comparison table · scrolls inside its own focusable box (never the page), with the first column sticky so the
// row labels stay in view. Content: ComparisonTableBlock. Server component.
import type { ComparisonTableBlock } from "./schema";

export default function ComparisonTable({ content: c }: { content: ComparisonTableBlock }) {
  const id = `tbl-${c.caption.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
  return (
    <figure>
      <div role="region" aria-labelledby={id} tabIndex={0} className="focus-ring relative overflow-x-auto rounded-xl border border-line [scrollbar-width:thin]">
        <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px] leading-[1.45]">
          <caption id={id} className="sr-only">{c.caption}</caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="sticky left-0 z-[1] w-[150px] bg-paper px-4 py-3 font-mono text-[12px] font-normal uppercase tracking-[0.08em] text-slate"><span className="sr-only">{c.caption}</span></th>
              {c.columns.map((col) => <th key={col} scope="col" className="bg-paper px-4 py-3 font-display text-[15px] font-bold text-ink">{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-0">
                <th scope="row" className="sticky left-0 z-[1] bg-white px-4 py-3 align-top font-medium text-ink shadow-[1px_0_0_#E4E8F0]">{r.label}</th>
                {r.cells.map((cell, i) => <td key={i} className="px-4 py-3 align-top text-ink/85">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 space-y-1 text-[13.5px] leading-[1.5] text-slate">
        <span className="block sm:hidden">{c.labels.scroll}</span>
        {c.note && <span className="block">{c.note}</span>}
        {c.source && (
          <span className="block font-mono text-[12px]">
            <span className="uppercase tracking-[0.1em]">{c.labels.source}</span>{" "}
            <a href={c.source.url} target="_blank" rel="noopener noreferrer" className="focus-ring rounded text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink">{c.source.title}</a>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
