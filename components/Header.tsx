"use client";
import { FEATURES } from "@/lib/features";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ChevronDown, Menu, Close } from "./icons";
import { useHref, useI18n } from "./I18nProvider";

function Dropdown({ label, items }: { label: string; items: { label: string; href: string; sub?: string }[] }) {
  return (
    <div className="group relative">
      <button type="button" className="focus-ring flex items-center gap-1 rounded px-1 py-2 font-display text-[15px] font-semibold text-ink" aria-haspopup="true">
        {label}<ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="rounded-xl border border-line bg-white p-1.5 shadow-[0_1px_2px_rgba(11,27,51,.05),0_16px_40px_-16px_rgba(11,27,51,.25)]">
          {items.map((i) => (
            <li key={i.label}><Link href={i.href} className="focus-ring block rounded-lg px-3 py-2.5 hover:bg-sunken">
              <span className="block font-display text-[14px] font-semibold text-ink">{i.label}</span>
              {i.sub && <span className="mt-0.5 block text-[12.5px] text-slate">{i.sub}</span>}
            </Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LangSwitch() {
  const { locale, t } = useI18n();
  const path = usePathname() || "/";
  const other = locale === "nl" ? "en" : "nl";
  const target = path.replace(/^\/(nl|en)(?=\/|$)/, `/${other}`);
  return (
    <Link href={target} hrefLang={other} onClick={() => { document.cookie = `locale=${other};path=/;max-age=31536000`; }}
      className="focus-ring inline-flex h-9 items-center gap-1 rounded-md border border-line px-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-slate hover:text-ink">
      {/* The accessible name starts with the visible text ("NL / EN"), then says where the link goes. */}
      <span className={locale === "nl" ? "text-ink" : ""}>NL</span><span aria-hidden className="text-line-2">/</span><span className={locale === "en" ? "text-ink" : ""}>EN</span>
      <span className="sr-only"> · {t.nav.language}: {other.toUpperCase()}</span>
    </Link>
  );
}

export default function Header() {
  const { t } = useI18n();
  const h = useHref();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const services = t.services.map((s) => ({ label: s.name, href: h(`/services/${s.slug}`), sub: s.lead }));
  const resources = [{ label: t.nav.blog, href: h("/blog") }, { label: t.nav.howWeWork, href: h("/#how-we-work") },
    // The newsletter link only shows when the sign-up works (lib/features.ts).
    ...(FEATURES.newsletter ? [{ label: t.nav.newsletter, href: h("/blog#newsletter") }] : [])];
  const links = [{ label: t.nav.caseStudy, href: h("/case-studies/energielabel-breda") }, { label: t.nav.about, href: h("/about") }, { label: t.nav.contact, href: h("/contact") }];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center gap-8 px-5 sm:px-10">
        <Link href={h("/")} className="focus-ring inline-flex min-h-[24px] items-center rounded" aria-label="Assembly Engine home"><Logo /></Link>
        <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Main">
          <Dropdown label={t.nav.services} items={services} />
          {links.slice(0, 1).map((l) => <Link key={l.label} href={l.href} className="focus-ring inline-flex min-h-[24px] items-center rounded px-1 font-display text-[15px] font-semibold">{l.label}</Link>)}
          <Dropdown label={t.nav.resources} items={resources} />
          {links.slice(1).map((l) => <Link key={l.label} href={l.href} className="focus-ring inline-flex min-h-[24px] items-center rounded px-1 font-display text-[15px] font-semibold">{l.label}</Link>)}
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Link href={h("/contact")} className="btn-primary focus-ring h-10 px-4 text-[14px]">{t.nav.cta}</Link>
        </div>
        <button type="button" className="focus-ring ml-auto rounded p-2 lg:hidden" aria-expanded={open} aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(!open)}>
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate">{t.nav.services}</p>
            <ul className="mt-2">{services.map((s) => <li key={s.label}><Link href={s.href} className="block py-2.5 font-display text-[16px] font-semibold">{s.label}</Link></li>)}</ul>
            <ul className="mt-3 border-t border-line pt-3">
              {[...links, { label: t.nav.blog, href: h("/blog") }].map((l) => <li key={l.label}><Link href={l.href} className="block py-2.5 font-display text-[16px] font-semibold">{l.label}</Link></li>)}
            </ul>
            <div className="mt-4 flex items-center gap-3"><LangSwitch /><Link href={h("/contact")} className="btn-primary h-11 flex-1">{t.nav.cta}</Link></div>
          </div>
        </nav>
      )}
    </header>
  );
}
