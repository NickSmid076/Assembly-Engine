// Page intro · the opening of an inner page (contact, blog). Static: the H1 is the LCP element and the lead
// is readable on the first frame. Two-tone heading, each part on its own line from sm.
// Content: PageIntroBlock. Server component.
import type { PageIntroBlock } from "./schema";
import { Heading } from "../ui";

export default function PageIntro({ content: c }: { content: PageIntroBlock }) {
  return (
    <section className="bg-white">
      <div className="frame frame-light pb-12 pt-20 sm:pb-16 sm:pt-28">
        <p className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink">{c.eyebrow}</p>
        <Heading as="h1" reveal={false} parts={c.heading_parts} stacked
          className="mt-6 max-w-[900px] font-display text-[40px] font-bold leading-[1.05] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[56px] lg:text-[64px]" />
        {c.lead && <p className="mt-6 max-w-[620px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.lead}</p>}
      </div>
    </section>
  );
}
