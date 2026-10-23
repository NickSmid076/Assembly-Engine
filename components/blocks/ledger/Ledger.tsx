// Ledger · Pattern P7: a set of equals as numbered hairline rows, title left and text right.
// Same voice as the homepage "why us" promises. No cards, no icons. Content: LedgerBlock. Server component.
import type { LedgerBlock } from "./schema";
import { H2, Heading } from "../ui";

export default function Ledger({ content: c }: { content: LedgerBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className={`scroll-mt-20 ${c.tone === "paper" ? "bg-paper" : "bg-white"}`}>
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[760px]`} />
        {c.body && <p data-reveal="" className="mt-6 max-w-[600px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>}
        <ol data-stagger="" className="mt-12 border-t-2 border-ink lg:mt-16">
          {c.items.map((it, i) => (
            <li key={it.title} data-reveal=""
              className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-1 border-b border-line-2 py-6 md:grid-cols-[64px_minmax(0,5fr)_minmax(0,6fr)] md:gap-x-6">
              <span aria-hidden className="pt-[3px] font-mono text-[13px] tabular-nums text-slate">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-[20px] font-bold leading-[1.25] tracking-[-0.015em] [overflow-wrap:anywhere] md:text-[22px]">{it.title}</h3>
              <p className="col-start-2 text-pretty text-[16px] leading-[1.55] text-ink/75 md:col-start-3 md:pt-[2px]">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
