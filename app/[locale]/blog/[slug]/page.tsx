import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import { getPost, getPostSlugs } from "@/lib/content";
import { LOCALES, isLocale } from "@/lib/i18n/config";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = await getPost(locale, slug);
  // Posts stay out of search until they have a real body.
  return page ? { title: page.title, description: page.description, robots: { index: page.index, follow: true } } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = await getPost(locale, slug);
  if (!page) notFound();
  return <>{renderBlocks(page.sections)}</>;
}
