import { z } from "zod";
import { headingParts } from "../shared";

/** Inner-page opening: small label, two-tone H1, one lead. ACF layout `page_intro`. */
export const pageIntroSchema = z.object({
  acf_fc_layout: z.literal("page_intro"),
  eyebrow: z.string().min(1),
  heading_parts: headingParts,
  lead: z.string().nullable(),
});
export type PageIntroBlock = z.infer<typeof pageIntroSchema>;
