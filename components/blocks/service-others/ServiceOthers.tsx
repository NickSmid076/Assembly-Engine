// The other services · a strip of links on hairlines, each with its module mark.
// Content: ServiceOthersBlock (ACF layout `service_others`).
import { ArrowRight } from "@/components/icons";
import type { ServiceOthersBlock } from "./schema";
import { CtaLink } from "../ui";
import Glyph from "../service-hero/Glyph";

export default function ServiceOthers({ content: c }: { content: ServiceOthersBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-paper">
      <div className="frame frame-light py-16 sm:py-20">
        <h2 id={`${c.anchor}-h`} className="font-mono text-[13px] uppercase tracking-[0.1em] text-slate">{c.label}</h2>
        <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-px border-t-2 border-ink bg-line-2 pb-px sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((o) => (
            <li key={o.service} className="bg-paper">
              <CtaLink link={o.link} className="focus-ring flex h-full min-h-[132px] flex-col gap-4 px-1 py-6 transition-colors duration-150 hover:bg-white sm:px-5">
                <span className="flex items-center gap-3">
                  <Glyph service={o.service} className="h-6 w-6 text-ink" />
                  <span className="min-w-0 font-display text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">{o.name}</span>
                </span>
                <span className="mt-auto flex items-end justify-between gap-4 text-[15px] leading-[1.45] text-ink/75">
                  {o.lead}
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </CtaLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
