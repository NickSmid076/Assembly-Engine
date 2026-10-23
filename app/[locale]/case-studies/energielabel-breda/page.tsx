import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import PageThread from "@/components/blocks/PageThread";
import { getCasePage } from "@/lib/content";
import { isLocale } from "@/lib/i18n/config";

const SLUG = "energielabel-breda";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = await getCasePage(locale, SLUG);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = await getCasePage(locale, SLUG);
  if (!page) notFound();
  return <PageThread>{renderBlocks(page.sections)}</PageThread>;
}
