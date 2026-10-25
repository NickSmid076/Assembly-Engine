import { z } from "zod";

/** Tick boxes the reader can work through; progress stays in this browser only (localStorage). */
export const checklistSchema = z.object({
  acf_fc_layout: z.literal("checklist"),
  /** Stable key for localStorage, unique per post and list. */
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  items: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2).max(12),
  labels: z.object({ progress: z.string(), reset: z.string(), stored: z.string() }),
});
export type ChecklistBlock = z.infer<typeof checklistSchema>;
