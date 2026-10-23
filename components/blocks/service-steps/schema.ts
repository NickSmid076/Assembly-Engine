import { z } from "zod";
import { headingParts } from "../shared";

/** How the service works, in three steps. ACF layout `service_steps`. Interim: each service's signature
 *  component (`service_signature`) replaces it as it is built. */
export const serviceStepsSchema = z.object({
  acf_fc_layout: z.literal("service_steps"),
  anchor: z.string(),
  label: z.string(),
  heading_parts: headingParts,
  steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(2).max(4),
});
export type ServiceStepsBlock = z.infer<typeof serviceStepsSchema>;
