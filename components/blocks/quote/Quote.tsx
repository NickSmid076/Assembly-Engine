// Quote · a slot for the client's own words. Renders nothing until a real quote exists (never a placeholder).
// Content: QuoteBlock. Server component.
import type { QuoteBlock } from "./schema";

export default function Quote({ content: c }: { content: QuoteBlock }) {
  if (!c.quote) return null;
  return (
    <section className="bg-white">
      <figure className="frame frame-light border-t border-line py-20 sm:py-28">
        <blockquote data-reveal="" className="max-w-[880px] text-pretty font-display text-[26px] font-bold leading-[1.3] tracking-[-0.02em] text-ink sm:text-[34px]">
          “{c.quote.text}”
        </blockquote>
        <figcaption data-reveal="" className="mt-8 text-[15px] leading-[1.4]">
          <span className="block font-semibold text-ink">{c.quote.name}</span>
          <span className="block text-slate">{c.quote.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}
