import { z } from "zod";
import { headingParts, image, link } from "../shared";

/** Case study opening: what was built, for whom, and the live site beside it. ACF: CPT `case_study` header fields. */
export const caseHeroSchema = z.object({
  acf_fc_layout: z.literal("case_hero"),
  eyebrow: z.string().min(1),
  heading_parts: headingParts,
  intro: z.string().min(1),
  facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1).max(6),
  images: z.object({ desktop: image, phone: image }),
  site: link,
});
export type CaseHeroBlock = z.infer<typeof caseHeroSchema>;
