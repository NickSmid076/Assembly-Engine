import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { getDict } from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { en } from "@/lib/i18n/en";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => en.services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = getDict(locale).services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.hero.sub } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const i = getDict(locale).services.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  return <ServicePage index={i} />;
}
