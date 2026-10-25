import { z } from "zod";

/** A stretch of article text between two inline blocks (WordPress `content.rendered` or an ACF wysiwyg). */
export const proseSchema = z.object({
  acf_fc_layout: z.literal("prose"),
  html: z.string().min(1),
});
export type ProseBlock = z.infer<typeof proseSchema>;
