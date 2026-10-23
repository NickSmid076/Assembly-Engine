"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useHref, useI18n } from "./I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  const h = useHref();
  const year = new Date().getFullYear();
  return (
    // One tone step down from the closing chapter (ink-2), on the same frame lines; no second CTA here:
    // the closing section and the sticky header already carry it.
    <footer className="border-t border-white/[0.08] bg-ink-2 text-white">
      <div className="frame frame-dark grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Logo tone="white" />
          <p className="mt-4 max-w-[300px] text-[14px] leading-[1.5] text-white/70">{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.footer.services}>
          <p className="text-[14px] font-semibold text-white">{t.footer.services}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">{t.services.map((s) => <li key={s.slug}><Link href={h(`/services/${s.slug}`)} className="focus-ring inline-flex min-h-[24px] items-center rounded-sm text-white/75 transition-colors duration-150 hover:text-white">{s.name}</Link></li>)}</ul>
        </nav>
        <nav aria-label={t.footer.company}>
          <p className="text-[14px] font-semibold text-white">{t.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            {[[t.nav.about, "/about"], [t.nav.caseStudy, "/case-studies/energielabel-breda"], [t.nav.blog, "/blog"], [t.nav.contact, "/contact"]].map(([l, p]) => <li key={l}><Link href={h(p)} className="focus-ring inline-flex min-h-[24px] items-center rounded-sm text-white/75 transition-colors duration-150 hover:text-white">{l}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-[14px] font-semibold text-white">{t.footer.contact}</p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-white/75">
            <li className="select-all">nick@assembly-engine.com</li>
            <li>assembly-engine.com</li>
            <li>{t.footer.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="frame frame-dark flex flex-col gap-3 py-6 text-[13px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Assembly Engine</p>
          <ul className="flex gap-5"><li><a href="#" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm transition-colors duration-150 hover:text-white">{t.footer.privacy}</a></li><li><a href="#" className="focus-ring inline-flex min-h-[24px] items-center rounded-sm transition-colors duration-150 hover:text-white">{t.footer.terms}</a></li></ul>
        </div>
      </div>
    </footer>
  );
}
