import { z } from "zod";
import { image } from "../shared";
import { ART } from "../blog-list/schema";

/** Further reading under an article (later an ACF relationship field). Only posts that have a body. */
export const relatedPostsSchema = z.object({
  acf_fc_layout: z.literal("related_posts"),
  anchor: z.string(),
  title: z.string().min(1),
  posts: z.array(z.object({
    url: z.string().min(1), tag: z.string().min(1), read: z.number().int().positive(), title: z.string().min(1),
    cover: image.nullable(), art: z.enum(ART),
  })).min(1).max(3),
  labels: z.object({ min_read: z.string() }),
});
export type RelatedPostsBlock = z.infer<typeof relatedPostsSchema>;
