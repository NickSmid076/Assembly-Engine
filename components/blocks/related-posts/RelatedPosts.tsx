// Related posts · three further articles in hairline columns, each with its cover. Pattern: blog list rows.
// Content: RelatedPostsBlock. Server component.
import Link from "next/link";
import Image from "next/image";
import LineArt from "@/components/LineArt";
import type { RelatedPostsBlock } from "./schema";

export default function RelatedPosts({ content: c }: { content: RelatedPostsBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-24 bg-white">
      <div className="frame frame-light border-t border-line pb-20 pt-14 sm:pb-24">
        <h2 id={`${c.anchor}-h`} className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink">{c.title}</h2>
        <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] border-t-2 border-ink sm:grid-cols-3">
          {c.posts.map((p, i) => (
            <li key={p.url} className={`border-b border-line sm:border-b-0 ${i ? "sm:border-l sm:border-line" : ""}`}>
              <Link href={p.url} className={`focus-ring group flex h-full flex-col gap-4 py-6 sm:pr-5 ${i ? "sm:pl-5" : ""}`}>
                <span aria-hidden className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-line bg-paper">
                  {p.cover
                    ? <Image src={p.cover.url} alt="" width={p.cover.width} height={p.cover.height} unoptimized className="h-full w-full object-cover" />
                    : <LineArt kind={p.art} still className="absolute inset-0 h-full w-full text-cobalt" />}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate"><span className="text-ink">{p.tag}</span> · {p.read} {c.labels.min_read}</span>
                <span className="font-display text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-ink transition-colors duration-150 [overflow-wrap:anywhere] group-hover:text-cobalt">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
