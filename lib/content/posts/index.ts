// Article bodies for the local source, as WordPress will return them (`content.rendered`): one HTML string per
// post and locale, sanitised by the rich_text block. A slug without a body shows the "being written" state.
// <mark>[CHECK: …]</mark> flags a fact that must be verified before the post is indexed.
import type { Locale } from "@/lib/i18n/config";
import { NL } from "./nl";
import { EN } from "./en";

export const POST_BODIES: Record<Locale, Record<string, string>> = { nl: NL, en: EN };
