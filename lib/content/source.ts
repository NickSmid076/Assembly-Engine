// The one place pages get content from. CONTENT_SOURCE=local (default) maps lib/i18n into the block shapes;
// CONTENT_SOURCE=wordpress will read WP REST + ACF (lib/content/wordpress.ts, not built yet) and must
// return the same shapes. Blocks validate their props with zod in renderBlocks.
import type { Locale } from "@/lib/i18n/config";
import type { ContentPage, HomePage, ServicePage } from "./types";
import * as local from "./local";

type Source = {
  getHomePage(locale: Locale): Promise<HomePage>;
  getServicePage(locale: Locale, slug: string): Promise<ServicePage | null>;
  getServiceSlugs(): Promise<string[]>;
  getCasePage(locale: Locale, slug: string): Promise<ContentPage | null>;
  getContactPage(locale: Locale): Promise<ContentPage>;
  getAboutPage(locale: Locale): Promise<ContentPage>;
  getBlogIndex(locale: Locale): Promise<ContentPage>;
  getPost(locale: Locale, slug: string): Promise<ContentPage | null>;
  getPostSlugs(): Promise<string[]>;
};

function source(): Source {
  const name = process.env.CONTENT_SOURCE ?? "local";
  if (name === "local") return local;
  throw new Error(`CONTENT_SOURCE="${name}" is not available yet; only "local" exists.`);
}

export const getHomePage = (locale: Locale): Promise<HomePage> => source().getHomePage(locale);
export const getServicePage = (locale: Locale, slug: string): Promise<ServicePage | null> => source().getServicePage(locale, slug);
export const getServiceSlugs = (): Promise<string[]> => source().getServiceSlugs();
export const getCasePage = (locale: Locale, slug: string): Promise<ContentPage | null> => source().getCasePage(locale, slug);
export const getContactPage = (locale: Locale): Promise<ContentPage> => source().getContactPage(locale);
export const getAboutPage = (locale: Locale): Promise<ContentPage> => source().getAboutPage(locale);
export const getBlogIndex = (locale: Locale): Promise<ContentPage> => source().getBlogIndex(locale);
export const getPost = (locale: Locale, slug: string): Promise<ContentPage | null> => source().getPost(locale, slug);
export const getPostSlugs = (): Promise<string[]> => source().getPostSlugs();
