// Post article · the body of a post: prose and inline blocks in one 680px column, a table of contents (sticky
// rail from lg, collapsible above the text below lg) and the reading progress bar. The sections arrive rendered
// as children (renderBlocks handles this layout), the toc from prepareArticle. Server component.
import type { ReactNode } from "react";
import type { PostArticleBlock } from "./schema";
import ReadingProgress from "./ReadingProgress";
import { TocMobile, TocRail } from "./Toc";

export default function PostArticle({ content: c, toc, children }: { content: PostArticleBlock; toc: { id: string; text: string }[]; children: ReactNode }) {
  const showToc = toc.length >= 3;
  return (
    <section className="bg-white">
      <ReadingProgress target="article-body" />
      <div className="frame frame-light pb-20 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,680px)_minmax(0,1fr)] lg:gap-10">
          <div className="hidden lg:block">{showToc && <div className="ml-auto h-full max-w-[220px]"><TocRail items={toc} label={c.labels.toc} /></div>}</div>
          <div className="mx-auto min-w-0 max-w-[680px]">
            {showToc && <div className="mb-10 lg:hidden"><TocMobile items={toc} label={c.labels.toc} toggle={c.labels.toc_toggle} /></div>}
            <article id="article-body" className="article-flow">{children}</article>
          </div>
        </div>
      </div>
    </section>
  );
}
