import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import PageThread from "@/components/blocks/PageThread";
import { getServicePage, getServiceSlugs } from "@/lib/content";
import { LOCALES, isLocale } from "@/lib/i18n/config";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = await getServicePage(locale, slug);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = await getServicePage(locale, slug);
  if (!page) notFound();
  return <PageThread>{renderBlocks(page.sections)}</PageThread>;
}
