// Service hero · Pattern P1 (statement + scene): the promise and the main action on the left, the service's
// moment on the right: the same short product story as on the homepage, played once with its rail.
// Content: ServiceHeroBlock (ACF layout `service_hero`).
import type { ServiceHeroBlock } from "./schema";
import { BTN_GHOST_LIGHT, CtaLink, Heading } from "../ui";
import Stage from "../services/moments/Stage";
import Glyph from "./Glyph";

export default function ServiceHero({ content: c }: { content: ServiceHeroBlock }) {
  // Long promises (Brand's is 67 characters) step down one size on desktop so the H1 stays within four lines.
  const long = c.heading_parts.reduce((n, p) => n + p.text.length, 0) > 56;
  return (
    <section className="bg-white">
      <div className="frame frame-light grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,10fr)_minmax(0,13fr)] lg:gap-14 lg:pb-28 lg:pt-20">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-slate">
            <Glyph service={c.service} className="h-5 w-5 text-ink" />
            {c.eyebrow}
          </p>
          <Heading as="h1" parts={c.heading_parts} reveal={false}
            className={`mt-6 max-w-[600px] font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[56px] ${long ? "lg:text-[44px] xl:text-[50px]" : "lg:text-[54px] xl:text-[60px]"}`} />
          <p className="mt-6 max-w-[500px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink link={c.primary_cta} arrow className="btn-primary focus-ring h-[52px] px-6" />
            {c.secondary_cta && <CtaLink link={c.secondary_cta} className={`${BTN_GHOST_LIGHT} h-[52px]`} />}
          </div>
        </div>
        <div className="min-w-0 rounded-2xl bg-paper p-3 sm:p-6 xl:p-8">
          <Stage moment={c.moment} index={0} labels={c.story_labels} id={`hero-${c.service}`} />
        </div>
      </div>
    </section>
  );
}
