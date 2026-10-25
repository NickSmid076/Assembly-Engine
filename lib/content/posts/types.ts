// What a post module exports: the body HTML (default), the rich blocks it places with <!--block:key--> markers,
// and the cover's alt text. Labels are left out here; the content layer adds them from the i18n dictionaries.
import type { ArticleSection } from "@/lib/content/types";

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type BlockData = DistributiveOmit<Exclude<ArticleSection, { acf_fc_layout: "prose" }>, "labels">;
export type PostBlocks = Record<string, BlockData>;

export interface PostModule {
  default: string;
  blocks?: PostBlocks;
  cover?: { alt: string };
}
