import { z } from "zod";
import { headingParts } from "../shared";

/** A set of equals as a numbered ledger (the homepage "why us" rows). ACF layout `ledger`. */
export const ledgerSchema = z.object({
  acf_fc_layout: z.literal("ledger"),
  anchor: z.string(),
  heading_parts: headingParts,
  body: z.string().nullable(),
  items: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1).max(10),
  tone: z.enum(["white", "paper"]),
});
export type LedgerBlock = z.infer<typeof ledgerSchema>;
