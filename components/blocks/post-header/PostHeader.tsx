// Post header · back link, meta, the title (static, LCP), the excerpt as lead, author and date; a still line
// drawing as cover. Content: PostHeaderBlock. Server component.
import Image from "next/image";
import LineArt from "@/components/LineArt";
import type { PostHeaderBlock } from "./schema";
import { CtaLink } from "../ui";

export default function PostHeader({ content: c }: { content: PostHeaderBlock }) {
  return (
    <section className="bg-white">
      <div className="frame frame-light pb-12 pt-14 sm:pt-20">
        <CtaLink link={c.back} className="focus-ring -ml-1 inline-flex min-h-[44px] items-center rounded-md px-1 text-[15px] font-medium text-slate transition-colors duration-150 hover:text-ink">
          <><span aria-hidden className="mr-1.5">←</span>{c.back.title}</>
        </CtaLink>
        <div className="mx-auto mt-8 max-w-[760px]">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{c.meta}</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.1] tracking-[-0.035em] [overflow-wrap:anywhere] sm:text-[48px]">{c.title}</h1>
          <p className="mt-6 text-pretty text-[19px] leading-[1.55] text-ink/80">{c.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
            <span className="relative h-10 w-10 overflow-hidden rounded-full bg-ink-2">
              <Image src={c.author.image.url} alt="" fill sizes="40px" className="object-cover object-[50%_28%]" />
            </span>
            <p className="text-[15px] text-slate">{c.by} <span className="font-semibold text-ink">{c.author.name}</span> · {c.date}</p>
          </div>
        </div>
        <div aria-hidden className="relative mx-auto mt-12 aspect-[21/9] max-w-[1100px] overflow-hidden rounded-2xl bg-ink">
          <LineArt kind={c.art} still className="absolute inset-0 h-full w-full text-white/70" />
        </div>
      </div>
    </section>
  );
}
