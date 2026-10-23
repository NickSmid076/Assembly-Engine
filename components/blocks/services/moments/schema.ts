import { z } from "zod";

// Data contracts for the five homepage service moments (`services[i].scenes.home`).
// Editors change copy, example data and step timing (`at`, seconds). The states and their order are
// fixed per kind: the choreography for each state lives in code. ACF draft:
// wordpress/acf-json/group_home_service_moment.json.

export const MOMENT_STATES = {
  home_brand: ["mark", "type", "colour", "page", "booked"],
  home_acquisition: ["signal", "score", "draft", "approve", "booked"],
  home_operations: ["request", "arrive", "sort", "complete", "deadline"],
  home_invoicing: ["hours", "invoice", "sent", "reminder", "paid", "booked"],
  home_reporting: ["sources", "flow", "merge", "settle", "summary"],
} as const;
export type MomentKind = keyof typeof MOMENT_STATES;

/** Brand palette: example swatches may only use these (no new hues on the site). */
export const BRAND_HEX = ["#0B1B33", "#2E5BFF", "#EDF1FF", "#C3D0FF", "#FFFFFF"] as const;

const text = z.string().min(1);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/** `steps` must list the kind's states in order, with increasing `at` inside the duration. */
function script<K extends MomentKind>(kind: K) {
  const states = MOMENT_STATES[kind];
  return {
    kind: z.literal(kind),
    duration: z.number().min(6).max(12),
    steps: z
      .array(z.object({ at: z.number().min(0), label: text, state: z.enum(states as unknown as [string, ...string[]]) }))
      .length(states.length),
  };
}
const ordered = (m: { duration: number; steps: { at: number; state: string }[]; kind: MomentKind }) =>
  m.steps.every((s, i) => s.state === MOMENT_STATES[m.kind][i] && (i === 0 || s.at > m.steps[i - 1].at) && s.at < m.duration);
const ORDER_MSG = { message: "steps must follow the kind's states in order, with increasing `at` inside the duration" };

export const brandMoment = z.object({
  ...script("home_brand"),
  firm: text,
  mark: z.string().min(1).max(3),
  tagline: text,
  guide: z.object({ title: text, version: text, mark: text, type: text, colour: text }),
  type: z.object({ display: text, body: text, specimen: text }),
  colours: z.array(z.object({ name: text, hex: z.enum(BRAND_HEX) })).length(3),
  page: z.object({ url: text, nav: z.array(text).min(2).max(3), headline: text, body: text, button: text }),
  booking: z.object({ label: text, when: text, via: text, who: text }),
}).refine(ordered, ORDER_MSG);

export const acquisitionMoment = z.object({
  ...script("home_acquisition"),
  signal: z.object({ label: text, title: text, company: text, source: text, when: text }),
  fit: z.object({ label: text, criteria: z.array(z.object({ label: text, value: text })).length(3), result: text }),
  draft: z.object({ tool: text, label: text, to_label: text, to: text, subject_label: text, subject: text, lines: z.array(text).min(2).max(3), waiting: text, approve: text, approved: text, approver: text }),
  pipeline: z.object({
    columns: z.array(text).length(4),
    deal: text,
    contact: text,
    booked: text,
    others: z.array(z.object({ firm: text, column: z.number().int().min(0).max(2) })).max(3),
  }),
}).refine(ordered, ORDER_MSG);

export const operationsMoment = z.object({
  ...script("home_operations"),
  dossier: z.object({ title: text, client: text, complete: text }),
  via: text,
  recognised: text,
  dividers: z.array(text).length(3),
  docs: z.array(z.object({ name: text, divider: z.number().int().min(0).max(2) })).min(3).max(6),
  /** `progress` may use {n} and {total}. */
  checklist: z.object({ label: text, progress: text, done: text }),
  /** Dates place the markers on the bar; the labels are what the visitor reads. */
  deadline: z.object({ requested: isoDate, done: isoDate, due: isoDate, start_label: text, due_label: text, done_label: text, spare: text }),
}).refine(ordered, ORDER_MSG);

export const invoicingMoment = z.object({
  ...script("home_invoicing"),
  tool: text,
  hours: z.object({ label: text, rows: z.array(z.object({ who: text, what: text, hours: text, amount: text })).min(2).max(4), total_label: text, total: text }),
  invoice: z.object({ label: text, number: text, client: text, subtotal: z.tuple([text, text]), vat: z.tuple([text, text]), total: z.tuple([text, text]) }),
  dates: z.object({ hours: text, sent: text, reminder: text, paid: text, gap: text }),
  notes: z.object({ sent: text, reminder: text, booked: text }),
  payment: z.object({ label: text, from: text, amount: text, match: text }),
}).refine(ordered, ORDER_MSG);

export const reportingMoment = z.object({
  ...script("home_reporting"),
  sources: z.array(z.object({ tool: text, what: text, rows: z.array(z.tuple([text, text])).length(2) })).length(3),
  dashboard: z.object({ tool: text, title: text, kpis: z.array(z.object({ label: text, value: text, note: text })).length(3), bars: z.array(z.number().min(0).max(100)).length(6), bars_label: text }),
  email: z.object({ tool: text, from: text, time: text, subject: text, lines: z.array(text).length(3) }),
}).refine(ordered, ORDER_MSG);

export const momentSchema = z.union([brandMoment, acquisitionMoment, operationsMoment, invoicingMoment, reportingMoment]);

export type BrandMoment = z.infer<typeof brandMoment>;
export type AcquisitionMoment = z.infer<typeof acquisitionMoment>;
export type OperationsMoment = z.infer<typeof operationsMoment>;
export type InvoicingMoment = z.infer<typeof invoicingMoment>;
export type ReportingMoment = z.infer<typeof reportingMoment>;
export type Moment = z.infer<typeof momentSchema>;

/** UI labels for the stage controls (both locales, from the content layer). */
export const storyLabels = z.object({ pause: text, play: text, replay: text, steps: text, example: text });
export type StoryLabels = z.infer<typeof storyLabels>;
