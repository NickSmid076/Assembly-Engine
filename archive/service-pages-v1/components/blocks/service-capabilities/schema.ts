import { z } from "zod";
import { headingParts } from "../shared";

/** What the service covers, as a ledger. ACF layout `service_capabilities`. */
export const serviceCapabilitiesSchema = z.object({
  acf_fc_layout: z.literal("service_capabilities"),
  anchor: z.string(),
  heading_parts: headingParts,
  items: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(3).max(10),
});
export type ServiceCapabilitiesBlock = z.infer<typeof serviceCapabilitiesSchema>;
