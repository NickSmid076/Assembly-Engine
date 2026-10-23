import { z } from "zod";
import { headingParts } from "../shared";

/** What happened after launch, dated. ACF: case_study `behind` repeater (date, title, text, figure) + `next`. */
export const caseTimelineSchema = z.object({
  acf_fc_layout: z.literal("case_timeline"),
  anchor: z.string(),
  heading_parts: headingParts,
  items: z.array(z.object({
    date: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
    figure: z.object({ value: z.string().min(1), label: z.string().min(1) }).nullable(),
    /** Not happened yet: drawn dashed, never presented as a result. */
    future: z.boolean(),
  })).min(2).max(6),
});
export type CaseTimelineBlock = z.infer<typeof caseTimelineSchema>;
