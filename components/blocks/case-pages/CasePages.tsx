// Case pages · the live site, page by page. Pattern P5 (demonstration) with the Brand signature's proof
// language: pick a page and a screen, see the real page and the figures measured on it, each with its source.
// Replaces the case video iframe (own fonts, own player). Content: CasePagesBlock. The viewer is a small island.
import type { CasePagesBlock } from "./schema";
import { H2, Heading } from "../ui";
import dynamic from "next/dynamic";

// Lazy, so the island ships only with routes that render it (the block registry imports every block).
const Viewer = dynamic(() => import("./Viewer"));

export default function CasePages({ content: c }: { content: CasePagesBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-white">
      <div className="frame frame-light py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <Heading id={`${c.anchor}-h`} parts={c.heading_parts} className={`${H2} max-w-[640px]`} />
          {c.body && <p data-reveal="" className="max-w-[440px] text-pretty text-[16px] leading-[1.55] text-ink/75">{c.body}</p>}
        </div>
        <Viewer pages={c.pages} labels={c.labels} initial={c.initial} site={c.site} />
      </div>
    </section>
  );
}
