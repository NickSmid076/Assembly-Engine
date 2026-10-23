import { z } from "zod";

/** A client's own words. Empty until the client gives one: `quote: null` renders nothing. ACF layout `quote`. */
export const quoteSchema = z.object({
  acf_fc_layout: z.literal("quote"),
  quote: z.object({ text: z.string().min(1), name: z.string().min(1), role: z.string().min(1) }).nullable(),
});
export type QuoteBlock = z.infer<typeof quoteSchema>;
