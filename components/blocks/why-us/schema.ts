import { z } from "zod";
import { headingParts, image, link } from "../shared";

/** Who is behind it, and what working together guarantees. ACF layout `why_us`. */
export const whyUsSchema = z.object({
  acf_fc_layout: z.literal("why_us"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  person: z.object({ image, name: z.string(), role: z.string() }),
  items: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1).max(6),
  link: link.nullable(),
});
export type WhyUsBlock = z.infer<typeof whyUsSchema>;
