import { z } from "zod";

/** Dated or ordered milestones inside an article. `expected` marks a date that isn't fixed yet. */
export const timelineSchema = z.object({
  acf_fc_layout: z.literal("timeline"),
  title: z.string().nullable(),
  items: z.array(z.object({ date: z.string().min(1), title: z.string().min(1), text: z.string().nullable(), expected: z.boolean() })).min(2).max(8),
  caption: z.string().nullable(),
  labels: z.object({ expected: z.string() }),
});
export type TimelineBlock = z.infer<typeof timelineSchema>;
