// Prose · a stretch of article text between inline blocks, sanitised on the server like rich_text.
// Styled by `.rich` in globals.css. Content: ProseBlock. Server component.
import type { ProseBlock } from "./schema";
import { cleanHtml } from "../rich-text/sanitize";

export default function Prose({ content: c }: { content: ProseBlock }) {
  return <div className="rich" dangerouslySetInnerHTML={{ __html: cleanHtml(c.html) }} />;
}
