// Next step · the free audit. The page's one centred moment: the morning's work, done by 07:00.
// Content: ClosingCtaBlock (ACF layout `closing_cta`). Native replacement for the hours-band iframe.
import type { ClosingCtaBlock } from "./schema";
import { BTN_GHOST_DARK, CtaLink, Heading } from "../ui";
import Clock from "./Clock";

export default function ClosingCta({ content: c }: { content: ClosingCtaBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-ink text-white">
      <div className="frame frame-dark flex flex-col items-center py-24 text-center sm:py-32 lg:py-36">
        {c.clock && <Clock {...c.clock} />}
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} accentClass="text-peri" stacked
          className={`${c.clock ? "mt-16" : ""} max-w-[1100px] font-display text-[40px] font-extrabold leading-[1.02] tracking-[-0.045em] [overflow-wrap:anywhere] sm:text-[60px] lg:text-[76px]`} />
        <p data-reveal="" className="mt-6 max-w-[520px] text-pretty text-[18px] leading-[1.55] text-white/80">{c.body}</p>
        <div data-reveal="" className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaLink link={c.primary_cta} arrow className="btn-primary focus-ring h-[52px] px-6" />
          {c.secondary_cta && <CtaLink link={c.secondary_cta} className={`${BTN_GHOST_DARK} h-[52px]`} />}
        </div>
      </div>
    </section>
  );
}
