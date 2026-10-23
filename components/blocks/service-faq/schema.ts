import { z } from "zod";
import { headingParts } from "../shared";

/** Questions and answers. ACF layout `service_faq`. Plain text answers (no rich text). */
export const serviceFaqSchema = z.object({
  acf_fc_layout: z.literal("service_faq"),
  anchor: z.string(),
  heading_parts: headingParts,
  items: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(1).max(10),
});
export type ServiceFaqBlock = z.infer<typeof serviceFaqSchema>;
