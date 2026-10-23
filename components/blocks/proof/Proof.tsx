// Proof · the one real case, with its measured numbers and where they come from.
// Content: ProofBlock (ACF layout `proof`, fed by the `case_study` post type).
import Image from "next/image";
import type { ProofBlock } from "./schema";
import { BTN_GHOST_LIGHT, CtaLink, H2, Heading } from "../ui";

type Metric = ProofBlock["metrics"][number];

/** A before → after figure: the "before" lands, the arrow draws, then the "after" (CSS, once, on reveal). */
export function Change({ value }: { value: string }) {
  const [before, after] = value.split("→").map((s) => s.trim());
  if (!after) return <>{value}</>;
  return (
    <span className="inline-flex items-baseline gap-[0.18em] whitespace-nowrap">
      <span>{before}</span>
      <span className="proof-arrow inline-block origin-left">→</span>
      <span className="proof-after inline-block">{after}</span>
    </span>
  );
}

/** The lead figure, then the rest grouped by source: one source line under each group, on a hairline ledger. */
function Figures({ metrics }: { metrics: Metric[] }) {
  const [lead, ...rest] = metrics;
  const groups: Metric[][] = [];
  rest.forEach((m) => { const g = groups[groups.length - 1]; if (g && g[0].source === m.source) g.push(m); else groups.push([m]); });
  const Source = ({ children }: { children: string }) => <p className="mt-4 text-[13px] leading-[1.45] text-slate">{children}</p>;
  return (
    <div data-stagger="" className="mt-16 grid grid-cols-[minmax(0,1fr)] border-t border-line lg:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,11fr)_minmax(0,6fr)]">
      <div data-reveal="" className="min-w-0 py-8 lg:pr-10">
        <dl className="flex flex-col-reverse">
          <dt className="mt-2 text-[15px] font-medium text-ink">{lead.label}</dt>
          <dd className="font-display text-[56px] font-bold leading-none tracking-[-0.04em] tabular-nums text-ink sm:text-[72px]"><Change value={lead.value} /></dd>
        </dl>
        <Source>{lead.source}</Source>
      </div>
      {groups.map((g) => (
        <div key={g[0].label} data-reveal="" className="min-w-0 border-t border-line py-8 lg:border-l lg:border-t-0 lg:px-8">
          <dl className={`grid gap-x-4 gap-y-6 sm:gap-x-6 ${g.length >= 3 ? "grid-cols-3" : g.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
            {g.map((m) => (
              <div key={m.label} className="flex min-w-0 flex-col-reverse justify-end">
                <dt className="mt-2 text-[14px] leading-[1.35] text-slate hyphens-auto [overflow-wrap:anywhere]">{m.label}</dt>
                <dd className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] tabular-nums text-ink sm:text-[40px]">{m.value}</dd>
              </div>
            ))}
          </dl>
          <Source>{g[0].source}</Source>
        </div>
      ))}
    </div>
  );
}

export default function Proof({ content: c }: { content: ProofBlock }) {
  const host = c.secondary_link ? c.secondary_link.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <p data-reveal="" className="text-[15px] font-semibold text-cobalt">{c.label}</p>
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} mt-4 max-w-[900px]`} />
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p data-reveal="" className=" max-w-[480px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>
            <div data-reveal="" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CtaLink link={c.link} arrow className={`${BTN_GHOST_LIGHT} h-[52px]`} />
              {c.secondary_link && (
                <CtaLink link={c.secondary_link} className="focus-ring inline-flex min-h-[44px] items-center text-[15px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink" />
              )}
            </div>
          </div>

          <div data-reveal="" className="relative min-w-0 pb-10 pr-6 sm:pr-14">
            <figure className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-40px_rgba(11,27,51,.45)]">
              <div aria-hidden className="flex h-9 items-center border-b border-line bg-paper px-4">
                <span className="truncate font-mono text-[12.5px] text-slate">{host}</span>
              </div>
              <Image src={c.images.desktop.url} alt={c.images.desktop.alt} width={c.images.desktop.width} height={c.images.desktop.height}
                sizes="(min-width: 1240px) 640px, (min-width: 1024px) 55vw, 90vw" className="block h-auto w-full" />
            </figure>
            <figure data-reveal="" className="proof-phone absolute bottom-0 right-0 w-[26%] min-w-[96px] max-w-[170px] overflow-hidden rounded-[18px] border-[5px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(11,27,51,.6)]">
              <Image src={c.images.phone.url} alt={c.images.phone.alt} width={c.images.phone.width} height={c.images.phone.height}
                sizes="170px" className="block aspect-[9/16] h-auto w-full object-cover object-top" />
            </figure>
          </div>
        </div>

        <Figures metrics={c.metrics} />
      </div>
    </section>
  );
}
