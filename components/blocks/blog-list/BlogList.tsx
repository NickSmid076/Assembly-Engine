// Blog list · published posts as linked rows first; posts still being written as a numbered ledger under
// "In preparation": honest status, no links to empty pages, no skeletons. Covers are still (no idle loops).
// Pattern P7 rows. Content: BlogListBlock. Server component.
import Link from "next/link";
import LineArt from "@/components/LineArt";
import type { BlogListBlock } from "./schema";
import { CtaLink } from "../ui";

type Post = BlogListBlock["posts"][number];

function Row({ p, n, minRead }: { p: Post; n: number; minRead: string }) {
  const body = (
    <>
      <span aria-hidden className="pt-[3px] font-mono text-[13px] tabular-nums text-slate">{String(n).padStart(2, "0")}</span>
      <div aria-hidden className="relative hidden aspect-[16/10] overflow-hidden rounded-lg border border-line bg-paper sm:block">
        <LineArt kind={p.art} still className="absolute inset-0 h-full w-full text-cobalt" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate"><span className="text-ink">{p.tag}</span> · {p.read} {minRead}</p>
        <h3 className={`mt-2 font-display text-[20px] font-bold leading-[1.3] tracking-[-0.015em] text-ink [overflow-wrap:anywhere] sm:text-[22px] ${p.url ? "transition-colors duration-150 group-hover:text-cobalt" : ""}`}>{p.title}</h3>
        <p className="mt-2 max-w-[560px] text-pretty text-[16px] leading-[1.55] text-ink/75">{p.excerpt}</p>
      </div>
      <span className="col-start-2 justify-self-start rounded-full border border-line-2 px-2.5 py-1 font-mono text-[12px] text-slate sm:col-start-auto sm:justify-self-end">{p.date}</span>
    </>
  );
  const cls = "grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-3 gap-y-3 border-b border-line-2 py-7 sm:grid-cols-[48px_176px_minmax(0,1fr)_auto] sm:gap-x-6";
  return p.url
    ? <li data-reveal=""><Link href={p.url} className={`focus-ring group ${cls}`}>{body}</Link></li>
    : <li data-reveal="" className={cls}>{body}</li>;
}

export default function BlogList({ content: c }: { content: BlogListBlock }) {
  const published = c.posts.filter((p) => p.url);
  const planned = c.posts.filter((p) => !p.url);
  return (
    <section id={c.anchor} className="scroll-mt-20 bg-white">
      <div className="frame frame-light pb-24 sm:pb-28">
        {published.length > 0 && (
          <ol data-stagger="" className="border-t-2 border-ink">
            {published.map((p, i) => <Row key={p.slug} p={p} n={i + 1} minRead={c.labels.min_read} />)}
          </ol>
        )}
        {planned.length > 0 && (
          <div className={published.length ? "mt-20" : ""}>
            <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-4 border-b-2 border-ink pb-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10">
              <div>
                <h2 className="font-display text-[24px] font-bold tracking-[-0.02em] text-ink">{c.labels.planned_title} <span className="font-mono text-[15px] font-normal tabular-nums text-slate">({planned.length})</span></h2>
                <p className="mt-2 max-w-[560px] text-[16px] leading-[1.55] text-ink/75">{c.labels.planned_note}</p>
              </div>
              <CtaLink link={c.ask} arrow className="focus-ring btn border border-line-2 text-ink hover:border-ink/40" />
            </div>
            <ol data-stagger="">
              {planned.map((p, i) => <Row key={p.slug} p={p} n={published.length + i + 1} minRead={c.labels.min_read} />)}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
