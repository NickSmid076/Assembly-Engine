"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal, SplitHeading } from "@/lib/motion";
import { useHref, useI18n } from "./I18nProvider";
import { ArrowRight } from "./icons";

export default function CtaBand({ title, sub }: { title?: string; sub?: string }) {
  const { t } = useI18n();
  const h = useHref();
  const onCase = (usePathname() || "").includes("/case-studies/");
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(90deg,rgba(237,241,255,.04)_0_1px,transparent_1px_32px)]" />
      <div className="frame frame-dark relative py-28 text-center">
        <SplitHeading className="mx-auto max-w-[760px] text-[36px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[52px]" segments={[{ text: title ?? t.servicePage.ctaTitle }]} />
        <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.55] text-white/70">{sub ?? t.servicePage.ctaSub}</p></Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={h("/contact")} className="btn-primary focus-ring h-12 px-6">{t.servicePage.bookAudit} <ArrowRight className="h-4 w-4" /></Link>
          {!onCase && <Link href={h("/case-studies/energielabel-breda")} className="focus-ring inline-flex h-12 items-center rounded-md border border-white/20 px-6 font-display text-[15px] font-bold text-white transition hover:border-white/50">{t.nav.caseStudy}</Link>}
        </Reveal>
      </div>
    </section>
  );
}
