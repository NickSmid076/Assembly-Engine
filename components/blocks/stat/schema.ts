import { z } from "zod";

/** One sourced figure. No source, no figure: the schema requires it and the block renders nothing without it. */
export const statSchema = z.object({
  acf_fc_layout: z.literal("stat"),
  value: z.string().min(1),
  label: z.string().min(1),
  source: z.object({ title: z.string().min(1), url: z.string().url() }),
  note: z.string().nullable(),
  labels: z.object({ source: z.string() }),
});
export type StatBlock = z.infer<typeof statSchema>;
