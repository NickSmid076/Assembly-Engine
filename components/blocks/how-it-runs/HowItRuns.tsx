// How it runs · one statement, three points and the example run (one request → every step logged).
// Pattern P1 · statement + scene; the scene is an example moment on the shared story clock.
// Content: HowItRunsBlock (ACF layout `how_it_runs`).
import type { HowItRunsBlock } from "./schema";
import { H2, Heading } from "../ui";
import RunSection from "./RunSection";

export default function HowItRuns({ content: c }: { content: HowItRunsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <RunSection points={c.points} runs={c.runs} labels={c.labels} intro={
          <>
            <Heading id={`${c.anchor}-h`} parts={c.heading_parts} stacked className={`${H2} max-w-[560px] lg:text-[42px] xl:text-[44px]`} />
            <p data-reveal="" className="mt-6 max-w-[480px] text-pretty text-[18px] leading-[1.55] text-ink/80">{c.body}</p>
          </>
        } />
      </div>
    </section>
  );
}
