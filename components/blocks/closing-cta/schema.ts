import { z } from "zod";
import { headingParts, link } from "../shared";

/** Closing call to action: the work is done by 07:00. ACF layout `closing_cta`. */
export const closingCtaSchema = z.object({
  acf_fc_layout: z.literal("closing_cta"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().min(1),
  primary_cta: link,
  secondary_cta: link.nullable(),
  /** 06:58 → 07:00, then what the night's runs produced lands as small artefacts (fictional, labelled example).
   *  `kind` picks the glyph, echoing the service moment it comes from. Null on inner pages (about, case, blog). */
  clock: z.object({
    from: z.string().regex(/^\d\d:\d\d$/),
    to: z.string().regex(/^\d\d:\d\d$/),
    done: z.array(z.object({ kind: z.enum(["report", "invoice", "followup"]), label: z.string().min(1), title: z.string().min(1), meta: z.string().min(1), status: z.string().min(1) })).min(1).max(3),
    label: z.string(),
  }).nullable(),
});
export type ClosingCtaBlock = z.infer<typeof closingCtaSchema>;
