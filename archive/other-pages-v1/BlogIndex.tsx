"use client";
import Link from "next/link";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/lib/motion";
import PageHeader from "./PageHeader";
import LineArt from "./LineArt";
import { Newsletter } from "./Blog";
import { useHref, useI18n } from "./I18nProvider";

export default function BlogIndex() {
  const { t } = useI18n();
  const h = useHref();
  const b = t.blogPage;
  const tags = Array.from(new Set(t.posts.map((p) => p.tag)));
  const [tag, setTag] = useState<string | null>(null);
  const posts = t.posts.filter((p) => !tag || p.tag === tag);
  return (
    <>
      <PageHeader eyebrow={b.eyebrow} title={b.title} muted={b.muted} />
      <section className="bg-white">
        <div className="frame frame-light pb-12">
          <div role="tablist" className="flex flex-wrap gap-2 border-b border-line pb-6">
            {[null, ...tags].map((x) => (
              <button key={x ?? "all"} role="tab" aria-selected={tag === x} onClick={() => setTag(x)}
                className={`focus-ring h-9 rounded-full border px-3.5 text-[13.5px] font-medium transition ${tag === x ? "border-ink bg-ink text-white" : "border-line-2 text-ink hover:border-ink/40"}`}>{x ?? b.all}</button>
            ))}
          </div>
          <Stagger key={tag ?? "all"} className="grid gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {posts.map((p, i) => {
              const feat = !tag && i === 0 && posts.length % 3 === 1;
              return (
                <StaggerItem key={p.slug} className={feat ? "sm:col-span-2 lg:col-span-3" : ""}>
                  <Link href={h(`/blog/${p.slug}`)} className={`focus-ring group block ${feat ? "lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-12" : ""}`}>
                    <div className={`relative overflow-hidden rounded-xl border border-line bg-sunken ${feat ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                      <LineArt kind={p.art} className="absolute inset-0 h-full w-full text-cobalt transition-transform duration-1000 ease-out group-hover:scale-[1.06]" />
                    </div>
                    <div>
                      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] lg:mt-5"><span className="text-cobalt">{p.tag}</span><span className="text-slate"> · {p.read} {b.minRead} · {p.date}</span></p>
                      <h2 className={`mt-2.5 font-bold tracking-[-0.01em] text-ink transition-colors group-hover:text-cobalt ${feat ? "text-[20px] leading-[1.3] lg:text-[30px] lg:leading-[1.15] lg:tracking-[-0.02em]" : "text-[20px] leading-[1.3]"}`}>{p.title}</h2>
                      <p className={`mt-2 leading-[1.5] text-slate ${feat ? "text-[14.5px] lg:mt-4 lg:text-[16px]" : "text-[14.5px]"}`}>{p.excerpt}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
      <section className="bg-white"><div className="frame frame-light"><Newsletter /></div></section>
    </>
  );
}
