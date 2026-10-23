import { z } from "zod";
import { headingParts, link } from "../shared";
import { momentSchema, storyLabels } from "../services/moments/schema";

export const SERVICE_KEYS = ["brand", "acquisition", "operations", "invoicing", "reporting"] as const;
export const serviceKey = z.enum(SERVICE_KEYS);

/** Service page hero: the promise, the main action, and the service's moment playing beside it.
 *  ACF layout `service_hero`. `service` picks the glyph (the hero engine's module mark). */
export const serviceHeroSchema = z.object({
  acf_fc_layout: z.literal("service_hero"),
  service: serviceKey,
  eyebrow: z.string().min(1),
  heading_parts: headingParts,
  body: z.string().min(1),
  primary_cta: link,
  secondary_cta: link.nullable(),
  story_labels: storyLabels,
  moment: momentSchema,
});
export type ServiceHeroBlock = z.infer<typeof serviceHeroSchema>;
