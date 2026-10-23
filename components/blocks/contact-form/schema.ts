import { z } from "zod";
import { image } from "../shared";

const s = z.string().min(1);

/** The audit request: three steps (your firm → how it feels → talk), posting to /api/contact (Resend).
 *  ACF layout `contact_form` on the `contact` page; the Cal.com link comes from site settings (`cal_link`). */
export const contactFormSchema = z.object({
  acf_fc_layout: z.literal("contact_form"),
  anchor: z.string(),
  locale: z.enum(["nl", "en"]),
  steps: z.array(s).length(3),
  step_of: s,
  fields: z.object({ name: s, firm: s, email: s, phone: s, services: s, message: s, message_placeholder: z.string() }),
  services: z.array(z.object({ value: s, label: s })).min(1),
  feel: z.object({ title: s, sub: s, items: z.array(z.object({ key: s, label: s })).min(1).max(8), scale: z.array(s).length(5), untouched: s, reset: s }),
  buttons: z.object({ next: s, back: s, submit: s, sending: s }),
  errors: z.object({ name: s, email: s, services: s, summary: s }),
  sent: z.object({ title: s, sub: s, failed: s, dev: s, receipt: s, email_label: s }),
  cal: z.object({ url: z.string().url(), title: s, open: s, loading: s }),
  privacy: s,
  aside: z.object({ title: s, items: z.array(s).min(1).max(5), direct: s, email: z.string().email(), person: z.object({ image, name: s, role: s }) }),
});
export type ContactFormBlock = z.infer<typeof contactFormSchema>;
