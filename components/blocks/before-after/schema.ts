import { z } from "zod";

/** Two columns side by side. `process`: the steps today vs automated. `split`: what to automate vs keep human. */
export const beforeAfterSchema = z.object({
  acf_fc_layout: z.literal("before_after"),
  variant: z.enum(["process", "split"]),
  title: z.string().nullable(),
  before: z.array(z.string().min(1)).min(1),
  after: z.array(z.string().min(1)).min(1),
  /** What stays with a person, shown under both columns. */
  human: z.string().nullable(),
  labels: z.object({ before: z.string(), after: z.string(), automate: z.string(), keep: z.string(), human: z.string() }),
});
export type BeforeAfterBlock = z.infer<typeof beforeAfterSchema>;
