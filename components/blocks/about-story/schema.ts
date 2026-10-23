import { z } from "zod";
import { headingParts } from "../shared";

/** Why the company exists, with the order it works in: problem first, then the tool. ACF layout `about_story`. */
export const aboutStorySchema = z.object({
  acf_fc_layout: z.literal("about_story"),
  anchor: z.string(),
  heading_parts: headingParts,
  paragraphs: z.array(z.string().min(1)).min(1).max(6),
  order: z.object({
    label: z.string().min(1),
    problem: z.string().min(1),
    questions: z.array(z.string().min(1)).min(1).max(4),
    tool: z.string().min(1),
    tools: z.array(z.string().min(1)).min(2).max(6),
    none: z.string().min(1),
  }),
});
export type AboutStoryBlock = z.infer<typeof aboutStorySchema>;
