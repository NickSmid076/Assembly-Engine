// What you get · Pattern P8 (two-column ledger) + P12 (tool strip). The heading holds the left column; on the
// right, what the service delivers (ruled, full weight) and what it doesn't (lighter), so the edges of the
// work are as clear as its centre. Under it, the tools strip: one-colour logos at one optical height (names where no
// clean mark may be used), ending in "or the software you already use". Content: ServiceScopeBlock (ACF layout `service_scope`).
import type { ServiceScopeBlock } from "./schema";
import { Heading } from "../ui";

type Tool = ServiceScopeBlock["tools"]["items"][number];

/** Height factor for a logo: wide marks get a little lower, compact ones a little taller, so the strip reads at
 *  one optical size (base: a 3.5:1 wordmark). Per-mark weight differences are baked into the files' padding. */
const factor = (w: number, h: number) => Math.round(Math.pow(w / h / 3.5, -0.4) * 1000) / 1000;

function ToolItem({ t }: { t: Tool }) {
  if (!t.logo) {
    return <li className="flex min-h-12 min-w-0 items-center sm:max-w-full sm:shrink-0 font-display text-[18px] font-bold leading-[1.25] tracking-[-0.015em] text-ink sm:text-[20px]">{t.name}</li>;
  }
  return (
    <li className="flex min-h-12 items-center sm:max-w-full sm:shrink-0">
      {/* Items never shrink (sm+): a full row wraps instead of squeezing names into each other. Focusable so keyboard users get the same name the tooltip gives on hover; the alt text names it for screen readers. */}
      <span tabIndex={0} className="group focus-ring relative inline-flex rounded-sm outline-offset-4">
        <img src={t.logo.url} alt={t.logo.alt || t.name} width={t.logo.width} height={t.logo.height} loading="lazy" decoding="async"
          style={{ "--k": factor(t.logo.width, t.logo.height) } as React.CSSProperties}
          className="block h-[calc(var(--k)*26px)] w-auto max-w-full select-none sm:h-[calc(var(--k)*33px)]" draggable={false} />
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[13px] font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
          {t.name}
        </span>
      </span>
    </li>
  );
}

export default function ServiceScope({ content: c }: { content: ServiceScopeBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts}
            className="max-w-[460px] font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] [overflow-wrap:anywhere] sm:text-[38px] lg:sticky lg:top-28 lg:self-start lg:text-[36px] xl:text-[40px]" />
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="min-w-0">
              <h3 className="font-mono text-[13px] uppercase tracking-[0.1em] text-ink">{c.included.label}</h3>
              <ul data-stagger="" className="mt-4 border-t-2 border-ink">
                {c.included.items.map((it) => (
                  <li key={it} data-reveal="" className="grid grid-cols-[22px_minmax(0,1fr)] gap-2 border-b border-line-2 py-4 text-pretty text-[16px] leading-[1.5] text-ink">
                    <svg viewBox="0 0 16 16" aria-hidden className="mt-[3px] h-4 w-4 text-cobalt" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.4l3.2 3.1L13 4.6" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            {c.excluded.items.length > 0 && (
              <div className="min-w-0">
                <h3 className="font-mono text-[13px] uppercase tracking-[0.1em] text-slate">{c.excluded.label}</h3>
                <ul className="mt-4 border-t border-line-2">
                  {c.excluded.items.map((it) => (
                    <li key={it} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2 border-b border-line py-4 text-pretty text-[15px] leading-[1.5] text-ink/70">
                      <svg viewBox="0 0 16 16" aria-hidden className="mt-[3px] h-4 w-4 text-slate" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h8" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-line-2 pt-8 lg:mt-24">
          <h3 className="font-mono text-[13px] uppercase tracking-[0.1em] text-slate">{c.tools.label}</h3>
          <ul className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-4">
            {[...c.tools.items].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).map((t) => <ToolItem key={t.name} t={t} />)}
            {c.tools.tail && <li className="col-span-2 flex min-h-12 items-center text-[16px] text-slate sm:basis-full">{c.tools.tail}</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
