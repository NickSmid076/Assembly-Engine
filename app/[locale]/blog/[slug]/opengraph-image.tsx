// Social share image per post and locale (1200×630): wordmark, tag and read time, the title in Manrope,
// and the post's line-art cover on a paper panel. Data from the content layer (post_header), fonts from lib/og/fonts.
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { getPost, getPostSlugs } from "@/lib/content";
import { LOCALES, isLocale } from "@/lib/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Assembly Engine";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

const read = (p: string) => fs.readFile(path.join(process.cwd(), p));
const dataUri = async (p: string) => {
  try { return `data:image/svg+xml;base64,${(await read(p)).toString("base64")}`; } catch { return null; }
};

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const page = isLocale(locale) ? await getPost(locale, slug) : null;
  const header = page?.sections.find((s) => s.acf_fc_layout === "post_header");
  const title = header && "title" in header ? header.title : "Assembly Engine";
  const meta = header && "meta" in header ? header.meta : "";
  const [manrope, inter, mono, wordmark, cover] = await Promise.all([
    read("lib/og/fonts/manrope-800.ttf"), read("lib/og/fonts/inter-500.ttf"), read("lib/og/fonts/plex-mono-500.ttf"),
    dataUri("public/brand/wordmark.svg"), dataUri(`public/blog/${slug}/cover.svg`),
  ]);
  const long = title.length > 70;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", fontFamily: "Inter", color: "#0B1B33" }}>
        <div style={{ width: 660, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 56px 56px 64px" }}>
          {wordmark ? <img src={wordmark} width={213} height={26} alt="" /> : <div style={{ fontFamily: "Manrope", fontSize: 26 }}>Assembly Engine</div>}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Plex Mono", fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2E5BFF" }}>{meta}</div>
            <div style={{ marginTop: 22, fontFamily: "Manrope", fontSize: long ? 46 : 54, lineHeight: 1.1, letterSpacing: "-0.035em" }}>{title}</div>
          </div>
          <div style={{ fontFamily: "Plex Mono", fontSize: 16, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5C6B85" }}>Blog</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F7FB", borderLeft: "1px solid #E4E8F0", overflow: "hidden" }}>
          {/* The cover keeps its art inside x 180–1420 of 1600, so it can bleed past the panel edges. */}
          {cover && <img src={cover} width={680} height={340} alt="" style={{ flexShrink: 0 }} />}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manrope, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
