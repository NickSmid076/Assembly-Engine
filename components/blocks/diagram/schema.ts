import { z } from "zod";
import { link } from "../shared";

/** An inline SVG diagram from /public (inlined so it uses the site fonts), with a caption and alt text. */
export const diagramSchema = z.object({
  acf_fc_layout: z.literal("diagram"),
  src: z.string().regex(/^\/blog\/[a-z0-9-]+\/[a-z0-9.-]+\.svg$/),
  alt: z.string().min(1),
  caption: z.string().nullable(),
  source: link.nullable(),
  labels: z.object({ source: z.string() }),
});
export type DiagramBlock = z.infer<typeof diagramSchema>;
