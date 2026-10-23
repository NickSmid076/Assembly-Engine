import { notFound } from "next/navigation";
import { renderBlocks } from "@/components/blocks/render";
import PageThread from "@/components/blocks/PageThread";
import { getHomePage } from "@/lib/content";
import { isLocale } from "@/lib/i18n/config";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = await getHomePage(locale);
  return <PageThread>{renderBlocks(page.sections)}</PageThread>;
}
