import { z } from "zod";
import { link } from "../shared";

/** Long-form body from WordPress (`content.rendered`), sanitised by the block before render.
 *  `html: null` = not written yet: the block shows an honest "being written" state instead. */
export const richTextSchema = z.object({
  acf_fc_layout: z.literal("rich_text"),
  html: z.string().nullable(),
  soon: z.object({ title: z.string().min(1), about: z.string().min(1), excerpt: z.string().min(1), back: link }).nullable(),
});
export type RichTextBlock = z.infer<typeof richTextSchema>;
