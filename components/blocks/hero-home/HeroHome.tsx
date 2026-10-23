// Home hero · what we do and for whom, with the main action, beside the assembly engine.
// The engine's five modules are the five services (glyphs echo their moments further down the page);
// hovering or focusing one names it, clicking opens it in the services explorer.
// Content: HeroHomeBlock (ACF layout `hero_home`). Rules: .claude/skills/ae-*.
import type { HeroHomeBlock } from "./schema";
import { BTN_GHOST_DARK, CtaLink, Heading } from "../ui";
import EnginePoster from "./EnginePoster";
import EngineVisual from "./EngineVisual";
import { VIEW } from "./engine-geometry";

export default function HeroHome({ content: c }: { content: HeroHomeBlock }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="frame frame-dark relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,11fr)_minmax(0,12fr)] lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-white/65">
            <span aria-hidden className="h-1.5 w-1.5 bg-cobalt" />
            {c.eyebrow}
          </p>
          <Heading as="h1" parts={c.heading_parts} reveal={false} accentClass="text-cobalt-2"
            className="mt-6 max-w-[620px] font-display text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em] [hyphens:manual] sm:text-[58px] lg:text-[60px] xl:text-[66px]" />
          <p className="mt-6 max-w-[500px] text-pretty text-[18px] leading-[1.55] text-white/80 lg:mt-7">{c.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink link={c.primary_cta} arrow className="btn-primary focus-ring h-[52px] px-6" />
            {c.secondary_cta && <CtaLink link={c.secondary_cta} className={`${BTN_GHOST_DARK} h-[52px]`} />}
          </div>
        </div>

        <div className="mx-auto -mt-16 w-full min-w-0 max-w-[560px] animate-rise [animation-delay:.1s] sm:-mt-12 lg:-mr-4 lg:mt-0 lg:max-w-none">
          <EngineVisual ratio={VIEW.w / VIEW.h} modules={c.modules} hint={c.module_hint}>
            <EnginePoster className="h-full w-full" />
          </EngineVisual>
        </div>
      </div>
    </section>
  );
}
