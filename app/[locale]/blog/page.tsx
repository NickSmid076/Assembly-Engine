import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import { getBlogIndex } from "@/lib/content";
import { isLocale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n";
import { Newsletter } from "@/components/Newsletter";
import { FEATURES } from "@/lib/features";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = await getBlogIndex(locale);
  return { title: page.title, description: page.description };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = await getBlogIndex(locale);
  const blocks = renderBlocks(page.sections);
  // The newsletter stays off until a mailing tool is connected (lib/features.ts); then it sits before the closer.
  if (!FEATURES.newsletter) return <>{blocks}</>;
  return <>{blocks.slice(0, -1)}<section className="bg-white"><div className="frame frame-light"><Newsletter labels={getDict(locale).home.newsletter} /></div></section>{blocks.slice(-1)}</>;
}
