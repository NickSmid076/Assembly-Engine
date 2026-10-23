import { z } from "zod";
import { headingParts, link } from "../shared";

/** Home hero. ACF layout `hero_home`. */
export const heroHomeSchema = z.object({
  acf_fc_layout: z.literal("hero_home"),
  eyebrow: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  primary_cta: link,
  secondary_cta: link.nullable(),
  /** The five engine modules, in service order: the service's name and where a click takes the visitor. */
  modules: z.array(z.object({ label: z.string().min(1), url: z.string().min(1) })).length(5),
  /** Screen-reader hint after a module's name ("See the example"). */
  module_hint: z.string(),
});
export type HeroHomeBlock = z.infer<typeof heroHomeSchema>;
