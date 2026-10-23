import { z } from "zod";
import { headingParts } from "../shared";

/** The promises behind the service. ACF layout `service_principles`. */
export const servicePrinciplesSchema = z.object({
  acf_fc_layout: z.literal("service_principles"),
  anchor: z.string(),
  heading_parts: headingParts,
  items: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(2).max(4),
});
export type ServicePrinciplesBlock = z.infer<typeof servicePrinciplesSchema>;
