import { z } from "zod";
import { link } from "../shared";

export const CALLOUT_TONES = ["note", "tip", "warning", "check"] as const;

/** A short aside in an article. `check` marks a fact still to verify, or a claim the post must not make. */
export const calloutSchema = z.object({
  acf_fc_layout: z.literal("callout"),
  tone: z.enum(CALLOUT_TONES),
  title: z.string().nullable(),
  body: z.string().min(1),
  link: link.nullable(),
  labels: z.object({ note: z.string(), tip: z.string(), warning: z.string(), check: z.string() }),
});
export type CalloutBlock = z.infer<typeof calloutSchema>;
