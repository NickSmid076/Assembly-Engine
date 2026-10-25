import { z } from "zod";
import { link } from "../shared";

/** A comparison with a sticky first column; it scrolls inside its own box on narrow screens. */
export const comparisonTableSchema = z.object({
  acf_fc_layout: z.literal("comparison_table"),
  caption: z.string().min(1),
  columns: z.array(z.string().min(1)).min(2).max(5),
  rows: z.array(z.object({ label: z.string().min(1), cells: z.array(z.string()) })).min(1),
  note: z.string().nullable(),
  source: link.nullable(),
  labels: z.object({ scroll: z.string(), source: z.string() }),
});
export type ComparisonTableBlock = z.infer<typeof comparisonTableSchema>;
