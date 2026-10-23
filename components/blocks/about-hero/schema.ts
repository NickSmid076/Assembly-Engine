import { z } from "zod";
import { headingParts, image, link } from "../shared";

/** About opening: the person, their statement, where they work. ACF layout `person` on the `about` page. */
export const aboutHeroSchema = z.object({
  acf_fc_layout: z.literal("about_hero"),
  eyebrow: z.string().min(1),
  heading_parts: headingParts,
  statement: z.string().min(1),
  where: z.string().min(1),
  person: z.object({ image, name: z.string().min(1), role: z.string().min(1) }),
  cta: link,
});
export type AboutHeroBlock = z.infer<typeof aboutHeroSchema>;
