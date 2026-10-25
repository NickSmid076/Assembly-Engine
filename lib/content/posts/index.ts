// Article bodies for the local source: one module per post and locale with the body HTML (WordPress
// `content.rendered`), sanitised per prose chunk, and the rich blocks placed in it by <!--block:key--> markers. A slug without a body shows the "being written" state.
// <mark>[CHECK: …]</mark> flags a fact that must be verified before the post is indexed.
import type { Locale } from "@/lib/i18n/config";
import { NL } from "./nl";
import { EN } from "./en";

import type { PostModule } from "./types";

export const POSTS: Record<Locale, Record<string, PostModule>> = { nl: NL, en: EN };
export type { PostModule, PostBlocks, BlockData } from "./types";
