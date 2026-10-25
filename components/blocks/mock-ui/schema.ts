import { z } from "zod";

/** A small, unbranded UI mock with example data. Always labelled as an example; never a vendor's screen. */
const email = z.object({
  kind: z.literal("email"),
  /** One email per tone; more than one shows a switch. */
  variants: z.array(z.object({
    name: z.string().min(1), from: z.string().min(1), to: z.string().min(1), subject: z.string().min(1),
    body: z.array(z.string().min(1)).min(1), button: z.string().nullable(), signature: z.string().nullable(),
  })).min(1).max(3),
});
const form = z.object({
  kind: z.literal("form"),
  title: z.string().min(1),
  intro: z.string().nullable(),
  fields: z.array(z.object({ label: z.string().min(1), value: z.string(), type: z.enum(["text", "file", "sign", "pay"]), state: z.enum(["done", "open"]) })).min(1),
  status: z.string().nullable(),
});
/** `{{merge_field}}` in a line shows as a field chip. */
const document = z.object({
  kind: z.literal("document"),
  title: z.string().min(1),
  meta: z.array(z.string()),
  sections: z.array(z.object({ heading: z.string().min(1), lines: z.array(z.string().min(1)).min(1) })).min(1),
});

export const mockUiSchema = z.object({
  acf_fc_layout: z.literal("mock_ui"),
  window: z.string().min(1),
  mock: z.discriminatedUnion("kind", [email, form, document]),
  caption: z.string().nullable(),
  labels: z.object({ example: z.string(), variants: z.string(), from: z.string(), to: z.string(), subject: z.string(), received: z.string(), missing: z.string() }),
});
export type MockUiBlock = z.infer<typeof mockUiSchema>;
