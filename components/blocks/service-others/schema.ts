import { z } from "zod";
import { link } from "../shared";
import { serviceKey } from "../service-hero/schema";

/** The other services, as a strip of links. ACF layout `service_others` (relationship to `service` posts). */
export const serviceOthersSchema = z.object({
  acf_fc_layout: z.literal("service_others"),
  anchor: z.string(),
  label: z.string().min(1),
  items: z.array(z.object({ service: serviceKey, name: z.string().min(1), lead: z.string().min(1), link })).min(1).max(5),
});
export type ServiceOthersBlock = z.infer<typeof serviceOthersSchema>;
