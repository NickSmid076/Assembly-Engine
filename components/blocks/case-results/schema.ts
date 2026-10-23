import { z } from "zod";
import { headingParts } from "../shared";

const figure = z.object({ value: z.string().min(1), label: z.string().min(1) });

/** Measured results, grouped by where they were measured. ACF: case_study `results` repeater (value, label, source). */
export const caseResultsSchema = z.object({
  acf_fc_layout: z.literal("case_results"),
  anchor: z.string(),
  heading_parts: headingParts,
  /** The lead figure (usually a before → after) with its own source. */
  lead: figure.extend({ source: z.string().min(1) }),
  /** Figures that share one source, printed once under the group. */
  groups: z.array(z.object({ source: z.string().min(1), items: z.array(figure).min(1).max(6) })).max(3),
  note: z.string().nullable(),
});
export type CaseResultsBlock = z.infer<typeof caseResultsSchema>;
