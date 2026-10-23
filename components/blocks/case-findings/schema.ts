import { z } from "zod";
import { headingParts } from "../shared";

/** What was wrong with the old site, written up as an inspection report. ACF: case_study `problem` repeater. */
export const caseFindingsSchema = z.object({
  acf_fc_layout: z.literal("case_findings"),
  anchor: z.string(),
  heading_parts: headingParts,
  report: z.object({ label: z.string().min(1), meta: z.string().min(1) }),
  items: z.array(z.string().min(1)).min(1).max(10),
});
export type CaseFindingsBlock = z.infer<typeof caseFindingsSchema>;
