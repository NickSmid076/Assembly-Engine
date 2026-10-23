import { z } from "zod";
import { headingParts, image, link } from "../shared";

/** One real, measured case. ACF layout `proof` (fields map to the `case_study` post type). */
export const proofSchema = z.object({
  acf_fc_layout: z.literal("proof"),
  anchor: z.string(),
  label: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  /** Measured figures, each with where and when it was measured (required, never optional).
   *  The first figure leads; the rest are grouped by source, so one source line covers a set of scores. */
  metrics: z.array(z.object({ value: z.string().min(1), label: z.string().min(1), source: z.string().min(1) })).min(1).max(6),
  images: z.object({ desktop: image, phone: image }),
  link,
  secondary_link: link.nullable(),
});
export type ProofBlock = z.infer<typeof proofSchema>;
