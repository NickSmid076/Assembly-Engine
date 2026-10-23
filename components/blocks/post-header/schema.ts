import { z } from "zod";
import { image, link } from "../shared";
import { ART } from "../blog-list/schema";

/** A post's opening. ACF/WP: title, excerpt, category, `read_minutes`, `art`, author, date. */
export const postHeaderSchema = z.object({
  acf_fc_layout: z.literal("post_header"),
  back: link,
  meta: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  author: z.object({ name: z.string().min(1), image }),
  by: z.string().min(1),
  date: z.string().min(1),
  art: z.enum(ART),
});
export type PostHeaderBlock = z.infer<typeof postHeaderSchema>;
