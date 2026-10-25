// Gives every H2 in the article's prose a stable id and collects them for the table of contents.
import type { PostArticleBlock } from "./schema";

const strip = (html: string) => html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
const slug = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";

export function prepareArticle(c: PostArticleBlock) {
  const toc: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();
  const sections = c.sections.map((s) => {
    if (s.acf_fc_layout !== "prose") return s;
    const html = s.html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_m, _attrs, inner: string) => {
      const text = strip(inner);
      const base = slug(text);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n ? `${base}-${n + 1}` : base;
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    });
    return { ...s, html };
  });
  return { sections, toc };
}
