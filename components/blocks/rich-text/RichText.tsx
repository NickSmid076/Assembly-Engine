// Rich text · the article body from WordPress: headings, lists, quotes, images, code, tables and video embeds,
// styled by `.rich` in globals.css on a 680px measure. HTML is sanitised here, on the server, whatever the source.
// No body yet: an honest "being written" note with what the article will cover, never skeleton bars.
// Content: RichTextBlock. Server component.
import type { RichTextBlock } from "./schema";
import { CtaLink } from "../ui";
import { cleanHtml } from "./sanitize";

export default function RichText({ content: c }: { content: RichTextBlock }) {
  if (c.html) {
    return (
      <section className="bg-white">
        <div className="frame frame-light pb-24 sm:pb-28">
          <article className="rich mx-auto max-w-[680px]" dangerouslySetInnerHTML={{ __html: cleanHtml(c.html) }} />
        </div>
      </section>
    );
  }
  if (!c.soon) return null;
  return (
    <section className="bg-white">
      <div className="frame frame-light pb-24 sm:pb-28">
        <div className="mx-auto max-w-[760px] border-t-2 border-ink pt-8">
          <h2 className="font-display text-[26px] font-bold leading-[1.25] tracking-[-0.02em] text-ink">{c.soon.title}</h2>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{c.soon.about}</p>
          <p className="mt-2 text-pretty text-[18px] leading-[1.6] text-ink">{c.soon.excerpt}</p>
          <CtaLink link={c.soon.back} className="focus-ring mt-8 inline-flex min-h-[44px] items-center rounded-md text-[15px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">
            <><span aria-hidden className="mr-1.5">←</span>{c.soon.back.title}</>
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
