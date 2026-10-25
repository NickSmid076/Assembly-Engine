// Server only (imported by a server component): cleans WordPress HTML down to what the article template styles. Anything else is dropped.
import sanitizeHtml from "sanitize-html";

const EMBED_HOSTS = ["www.youtube-nocookie.com", "www.youtube.com", "player.vimeo.com"];

export function cleanHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "blockquote", "cite",
      "figure", "figcaption", "img", "pre", "code", "kbd", "table", "thead", "tbody", "tr", "th", "td", "iframe", "div", "span", "sup", "sub", "mark"],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading", "srcset", "sizes"],
      iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading"],
      h2: ["id"], th: ["scope", "colspan", "rowspan"], td: ["colspan", "rowspan"], ol: ["start", "reversed"],
      figure: ["class"], div: ["class"], code: ["class"],
    },
    allowedClasses: { figure: ["wp-block-embed", "wp-block-image", "wp-block-table", "wp-block-pullquote"], div: ["wp-block-embed__wrapper"], code: [/^language-/] },
    allowedSchemes: ["https", "mailto"],
    allowedIframeHostnames: EMBED_HOSTS,
    // Drop what sanitising emptied: an iframe whose host isn't allowed, an image without a usable source.
    exclusiveFilter: (frame) =>
      (frame.tag === "iframe" && !frame.attribs.src) || (frame.tag === "img" && !/^(https:\/\/|\/)/.test(frame.attribs.src ?? "")),
    transformTags: {
      a: (tag, attribs) => {
        const external = /^https?:\/\//.test(attribs.href ?? "") && !/assembly-engine\.com/.test(attribs.href ?? "");
        return { tagName: "a", attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : { ...attribs, target: "", rel: "" } };
      },
      img: (tag, attribs) => ({ tagName: "img", attribs: { ...attribs, loading: "lazy" } }),
      iframe: (tag, attribs) => ({ tagName: "iframe", attribs: { ...attribs, loading: "lazy" } }),
      h1: "h2",
    },
  });
}
