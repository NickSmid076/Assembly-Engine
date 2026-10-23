// The five services · one explorer, opened by the demo video of them working together.
// Content: ServicesBlock (ACF layout `services`).
import type { ServicesBlock } from "./schema";
import { H2, Heading } from "../ui";
import DemoVideo from "./DemoVideo";
import Explorer from "./Explorer";

export default function Services({ content: c }: { content: ServicesBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-ink text-white">
      <div className="frame frame-dark py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} accentClass="text-white/55" className={`${H2} max-w-[620px]`} />
          <p data-reveal="" className="max-w-[460px] text-pretty text-[18px] leading-[1.55] text-white/80">{c.body}</p>
        </div>

        {c.video && (
          <figure data-reveal="" className="mt-14 lg:mt-16">
            <DemoVideo {...c.video} />
            <figcaption className="mt-4 flex flex-col gap-1 text-[14px] text-white/65 sm:flex-row sm:justify-between">
              <span>{c.video.caption}</span>
              <span>{c.video.note}</span>
            </figcaption>
          </figure>
        )}

        <div className="mt-16 lg:mt-24">
          <Explorer items={c.items} label={c.list_label} labels={c.story_labels} />
        </div>
      </div>
    </section>
  );
}
