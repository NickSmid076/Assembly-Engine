import { z } from "zod";
import { headingParts, image, link } from "../shared";

const page = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  url: z.string().min(1),
  images: z.object({ desktop: image, phone: image }),
  /** Measured facts for this page; `device` limits a fact to one screen (a mobile score next to the phone shot). */
  facts: z.array(z.object({ value: z.string().min(1), label: z.string().min(1), source: z.string().min(1), device: z.enum(["all", "desktop", "phone"]) })).min(1).max(6),
  note: z.string().nullable(),
});

/** The live site, page by page, on both screens (real screenshots). Native replacement for the case video iframe.
 *  ACF: case_study `pages` repeater. */
export const casePagesSchema = z.object({
  acf_fc_layout: z.literal("case_pages"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().nullable(),
  labels: z.object({ page: z.string(), device: z.string(), desktop: z.string(), phone: z.string(), source: z.string() }),
  pages: z.array(page).min(1).max(6),
  initial: z.object({ page: z.string(), device: z.enum(["desktop", "phone"]) }),
  site: link,
}).refine((s) => s.pages.some((p) => p.id === s.initial.page), { message: "initial.page must be one of the pages" });
export type CasePagesBlock = z.infer<typeof casePagesSchema>;
export type CasePage = z.infer<typeof page>;
