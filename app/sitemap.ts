// sitemap.xml: every public page in both locales, with hreflang alternates. Posts only when indexable.
import type { MetadataRoute } from "next";
import { getPost, getPostSlugs, getServiceSlugs } from "@/lib/content";
import { LOCALES } from "@/lib/i18n/config";

const BASE = "https://www.assembly-engine.com";

const entry = (path: string): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}/nl${path}`,
  alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${path}`])) },
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServiceSlugs();
  const posts = [];
  for (const slug of await getPostSlugs()) {
    const page = await getPost("nl", slug);
    if (page?.index) posts.push(slug);
  }
  const paths = [
    "", "/about", "/contact", "/blog", "/case-studies/energielabel-breda",
    ...services.map((s) => `/services/${s}`),
    ...posts.map((s) => `/blog/${s}`),
  ];
  // One entry per locale, each listing both language versions.
  return paths.flatMap((p) => LOCALES.map((l) => ({ ...entry(p), url: `${BASE}/${l}${p}` })));
}
