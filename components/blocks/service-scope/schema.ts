import { z } from "zod";
import { headingParts, image } from "../shared";

const text = z.string().min(1);

/** What the service delivers, what it doesn't, and the tools it is usually built with.
 *  ACF layout `service_scope`. Tools are a repeater of 4–8: `name` (always; it is the alt text and the tooltip),
 *  `logo` (media, one-colour SVG; null shows the name instead) and an optional `order`. */
export const serviceScopeSchema = z.object({
  acf_fc_layout: z.literal("service_scope"),
  anchor: z.string(),
  heading_parts: headingParts,
  included: z.object({ label: text, items: z.array(text).min(2).max(8) }),
  excluded: z.object({ label: text, items: z.array(text).max(6) }),
  tools: z.object({
    label: text,
    items: z.array(z.object({ name: text, logo: image.nullable(), order: z.number().int().nullable() })).min(4).max(8),
    tail: z.string(),
  }),
});
export type ServiceScopeBlock = z.infer<typeof serviceScopeSchema>;
