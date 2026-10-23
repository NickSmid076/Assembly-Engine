import { z } from "zod";
import { headingParts, link } from "../shared";
import { momentSchema, storyLabels } from "./moments/schema";

/** The five services as one explorer, with the demo video. ACF layout `services`. */
export const servicesSchema = z.object({
  acf_fc_layout: z.literal("services"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  list_label: z.string(),
  /** Stage controls for the service moments (pause, play, replay, step list). */
  story_labels: storyLabels,
  items: z.array(z.object({ name: z.string().min(1), lead: z.string().min(1), rest: z.string().min(1), link, moment: momentSchema })).min(1).max(6),
  video: z.object({
    src: z.string().min(1), poster: z.string().min(1), width: z.number(), height: z.number(),
    label: z.string(), caption: z.string(), note: z.string(), play: z.string(), pause: z.string(),
  }).nullable(),
});
export type ServicesBlock = z.infer<typeof servicesSchema>;
