"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Reveal } from "@/lib/motion";
import PageHeader from "./PageHeader";
import LineArt from "./LineArt";
import CtaBand from "./CtaBand";
import { useHref, useI18n } from "./I18nProvider";

export default function BlogArticle({ index }: { index: number }) {
  const { t } = useI18n();
  const h = useHref();
  const b = t.blogPage;
  const p = t.posts[index];
  const more = t.posts.filter((_, i) => i !== index).slice(0, 3);
  return (
    <>
      <PageHeader eyebrow={`${p.tag} · ${p.read} ${b.minRead}`} title={p.title} lead={p.excerpt}>
        <div className="mt-8 flex items-center gap-3">
          <img src="/images/nick-smid.jpg" alt="" className="h-9 w-9 rounded-full object-cover object-[50%_30%]" />
          <p className="text-[14px] text-slate">{b.by} <span className="font-semibold text-ink">Nick Smid</span> · {p.date}</p>
        </div>
      </PageHeader>
      <section className="bg-white">
        <div className="frame frame-light pb-24">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line bg-ink">
              <LineArt kind={p.art} className="absolute inset-0 h-full w-full text-white" />
            </div>
          </Reveal>
          <article className="mx-auto mt-16 max-w-[680px]">
            <p className="rounded-lg border border-dashed border-line-2 bg-sunken px-4 py-3 text-[14px] text-slate">{b.placeholderNote}</p>
            <div className="mt-10 space-y-5" aria-hidden>
              {[92, 100, 84, 96, 70].map((w, i) => <div key={i} className="h-3.5 rounded bg-sunken" style={{ width: `${w}%` }} />)}
              <div className="!mt-10 h-6 w-1/2 rounded bg-line" />
              {[100, 88, 94, 60].map((w, i) => <div key={`b${i}`} className="h-3.5 rounded bg-sunken" style={{ width: `${w}%` }} />)}
            </div>
            <Link href={h("/blog")} className="focus-ring mt-12 inline-flex rounded text-[14px] font-medium text-cobalt hover:underline">← {b.back}</Link>
          </article>
        </div>
      </section>
      <section className="bg-white">
        <div className="frame frame-light border-t border-line py-20">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-slate">{b.related}</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} href={h(`/blog/${m.slug}`)} className="focus-ring group block">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-cobalt">{m.tag}</p>
                <p className="mt-2 text-[17px] font-bold leading-[1.35] text-ink group-hover:text-cobalt">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
