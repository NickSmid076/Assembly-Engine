import { z } from "zod";
import { link } from "../shared";

export const ART = ["orbit", "well", "grid", "waves"] as const;

/** The blog index. A post without a body is "planned": listed honestly, never linked. ACF: native posts
 *  (category = tag; ACF `read_minutes`, `art`, `status_label`). */
export const blogListSchema = z.object({
  acf_fc_layout: z.literal("blog_list"),
  anchor: z.string(),
  labels: z.object({ min_read: z.string(), planned_title: z.string(), planned_note: z.string() }),
  ask: link,
  posts: z.array(z.object({
    slug: z.string().min(1),
    /** null = not published yet. */
    url: z.string().nullable(),
    tag: z.string().min(1),
    read: z.number().int().positive(),
    date: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    art: z.enum(ART),
  })),
});
export type BlogListBlock = z.infer<typeof blogListSchema>;
