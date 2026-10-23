import { z } from "zod";
import { headingParts } from "../shared";

/** How an engagement runs, on one track from first call to aftercare. ACF layout `process`. */
export const processSchema = z.object({
  acf_fc_layout: z.literal("process"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  /** Labels on the track: the bracket from the first step to go-live, the span after it, and "Step" (screen readers). */
  track: z.object({ span: z.string().min(1), after: z.string().min(1), step: z.string().min(1) }),
  /** Index of the step that is the go-live moment (the track's marker sits there). */
  live_step: z.number().int().nonnegative(),
  steps: z.array(z.object({ title: z.string().min(1), text: z.string().min(1), detail: z.string() })).min(3).max(6),
});
export type ProcessBlock = z.infer<typeof processSchema>;
