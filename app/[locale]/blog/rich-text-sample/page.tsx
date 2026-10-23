// Development only: renders the article template with a sample body for visual QA. 404 in production.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import { getPost, getPostSlugs } from "@/lib/content";
import { RICH_TEXT_SAMPLE } from "@/lib/content/fixtures/rich-text-sample";
import { isLocale } from "@/lib/i18n/config";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (process.env.NODE_ENV === "production" || !isLocale(locale)) notFound();
  const [slug] = await getPostSlugs();
  const page = await getPost(locale, slug);
  if (!page) notFound();
  const sections = page.sections.map((s) => (s.acf_fc_layout === "rich_text" ? { ...s, html: RICH_TEXT_SAMPLE, soon: null } : s));
  return <>{renderBlocks(sections)}</>;
}
