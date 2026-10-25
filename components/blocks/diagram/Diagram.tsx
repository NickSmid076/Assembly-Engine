// Diagram · an SVG from /public/blog/<slug>/, inlined (so its labels use the site fonts) as one image with alt
// text; caption and source underneath. Content: DiagramBlock. Server component.
import fs from "node:fs";
import path from "node:path";
import type { DiagramBlock } from "./schema";

function readSvg(src: string) {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "public", src), "utf8");
    return raw.replace(/<\?xml[^>]*>/, "").replace(/<svg\b/, '<svg aria-hidden="true" focusable="false" class="block h-auto w-full"');
  } catch {
    return null;
  }
}

export default function Diagram({ content: c }: { content: DiagramBlock }) {
  const svg = readSvg(c.src);
  // Optional phone version next to the file (<name>.m.svg), so labels keep their real size on small screens.
  const phone = svg ? readSvg(c.src.replace(/\.svg$/, ".m.svg")) : null;
  return (
    <figure>
      {svg
        ? (
          <div role="img" aria-label={c.alt} className="diagram-svg overflow-hidden rounded-xl border border-line bg-paper">
            <div className={phone ? "hidden sm:block" : undefined} dangerouslySetInnerHTML={{ __html: svg }} />
            {phone && <div className="sm:hidden" dangerouslySetInnerHTML={{ __html: phone }} />}
          </div>
        )
        : <img src={c.src} alt={c.alt} className="h-auto w-full rounded-xl border border-line bg-paper" />}
      {(c.caption || c.source) && (
        <figcaption className="mt-3 text-[14px] leading-[1.5] text-slate">
          {c.caption}
          {c.source && <> <span className="font-mono text-[12px] uppercase tracking-[0.1em]">{c.labels.source}</span> <a href={c.source.url} target="_blank" rel="noopener noreferrer" className="focus-ring rounded text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink">{c.source.title}</a></>}
        </figcaption>
      )}
    </figure>
  );
}
