import { z } from "zod";
import { headingParts, image, link } from "../shared";

const text = z.string().min(1);

/** Reporting: a dashboard whose every figure can be traced to the systems and sync it came from.
 *  Example data (fictional firm, labelled). `sources[].source` and `initial` refer to ids in this block. */
export const reportingSignature = z.object({
  kind: z.literal("reporting"),
  labels: z.object({ example: text, hint: text, lineage: text, synced: text, formula: text, sources: text, from: text }),
  dashboard: z.object({ tool: text, title: text }),
  sources: z.array(z.object({ id: text, tool: text, what: text })).length(3),
  kpis: z.array(z.object({
    id: text, label: text, value: text, note: z.string(),
    sources: z.array(z.object({ source: text, dataset: text, records: text, synced: z.string().regex(/^\d\d:\d\d(:\d\d)?$/) })).min(1).max(3),
    /** Empty when the figure is read straight from its source. */
    formula: z.string(),
  })).length(4),
  initial: text,
}).refine((s) => s.kpis.every((k) => k.sources.every((x) => s.sources.some((src) => src.id === x.source))) && s.kpis.some((k) => k.id === s.initial),
  { message: "kpi sources and `initial` must refer to ids in this block" });
export type ReportingSignature = z.infer<typeof reportingSignature>;

/** Operations: a dossier per client and period. Received documents were checked against the period's
 *  checklist, named and filed; missing ones get reminders (day 3, day 7) until they arrive, and a person
 *  signs off. Example data (fictional clients, labelled). Ids in `dossiers` and `initial` refer to this block. */
const opsReceived = z.object({ item: text, status: z.literal("received"), via: z.enum(["portal", "email"]), at: text, pages: text, name: text, folder: text });
const opsMissing = z.object({ item: text, status: z.literal("missing"), requested: text, day3: text, day7: text, sent: z.number().int().min(0).max(2) });
export const operationsSignature = z.object({
  kind: z.literal("operations"),
  labels: z.object({
    example: text, hint: text, client: text, period: text, checklist: text, progress: text, route: text,
    received: text, missing: text, inbox: text, check: text, matched: text, planned: text,
    steps: z.object({ received: text, checked: text, named: text, filed: text, requested: text, day3: text, day7: text, waiting: text }),
    channels: z.object({ portal: text, email: text }),
    sign: z.object({ waiting: text, ready: text, signed: text }),
  }),
  items: z.array(z.object({ id: text, label: text })).length(5),
  clients: z.array(z.object({ id: text, name: text })).min(2).max(4),
  periods: z.array(z.object({ id: text, label: text })).min(2).max(3),
  dossiers: z.array(z.object({
    client: text, period: text, deadline: text,
    signoff: z.object({ state: z.enum(["waiting", "ready", "signed"]), text }),
    docs: z.array(z.discriminatedUnion("status", [opsReceived, opsMissing])).length(5),
  })).min(1),
  initial: z.object({ client: text, period: text, item: text }),
}).refine((s) => s.dossiers.every((d) => s.clients.some((c) => c.id === d.client) && s.periods.some((p) => p.id === d.period)
    && s.items.every((i, k) => d.docs[k].item === i.id))
  && s.clients.every((c) => s.periods.every((p) => s.dossiers.some((d) => d.client === c.id && d.period === p.id)))
  && s.dossiers.some((d) => d.client === s.initial.client && d.period === s.initial.period) && s.items.some((i) => i.id === s.initial.item),
  { message: "every client × period needs a dossier whose docs follow `items` in order; ids must match" });
export type OperationsSignature = z.infer<typeof operationsSignature>;
export type OpsDoc = OperationsSignature["dossiers"][number]["docs"][number];

/** Brand: one brand guide becomes components, and the components become every page. Example data for a fictional
 *  firm (labelled) for the assembly; the proof state shows the real Energielabel Breda pages with their sourced
 *  figures. Layouts per page × device live in code (brand/geometry.ts); this block only carries the words. */
export const BRAND_PAGES = ["home", "service", "contact"] as const;
export const BRAND_DEVICES = ["desktop", "phone"] as const;
const brandPage = z.enum(BRAND_PAGES);
const brandDevice = z.enum(BRAND_DEVICES);
export const BRAND_COMPONENTS = ["header", "crumb", "hero", "button", "cards", "list", "form", "aside", "footer"] as const;
export const brandSignature = z.object({
  kind: z.literal("brand"),
  labels: z.object({
    example: text, hint: text, mode: text, build: text, proof: text, page: text, device: text,
    devices: z.object({ desktop: text, phone: text }),
    explode: text, assemble: text, madeOf: text, guide: text, parts: text, summary: text,
    layers: z.object({ guide: text, parts: text, page: text }),
    roles: z.object({ mark: text, display: text, body: text, colour: text }),
    proofHint: text, proofNote: text, source: text, usedIn: text, pickToken: text,
  }),
  brand: z.object({
    firm: text, mark: text, tagline: text, url: text, nav: z.array(text).length(3),
    type: z.object({ display: text, body: text }),
    colours: z.array(z.object({ id: z.enum(["ink", "accent", "tint"]), name: text, hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/) })).length(3),
  }),
  components: z.array(z.object({ id: z.enum(BRAND_COMPONENTS), label: text })).length(BRAND_COMPONENTS.length),
  pages: z.array(z.object({
    id: brandPage, label: text, path: z.string(), crumb: z.string(), heading: text, body: text, button: text,
    items: z.array(z.object({ title: text, text: z.string() })).length(3),
    aside: z.object({ label: text, title: text, text: text }),
  })).length(3),
  proof: z.object({
    client: text, live: text, link, site: link,
    pages: z.array(z.object({
      page: brandPage, url: text,
      images: z.object({ desktop: image, phone: image }),
      facts: z.array(z.object({ value: text, label: text, source: text, device: z.enum(["all", "desktop", "phone"]) })).min(1).max(5),
    })).length(3),
  }),
  initial: z.object({ page: brandPage, device: brandDevice }),
}).refine((s) => BRAND_PAGES.every((p) => s.pages.some((x) => x.id === p) && s.proof.pages.some((x) => x.page === p))
  && BRAND_COMPONENTS.every((c) => s.components.some((x) => x.id === c)),
  { message: "every page needs its words and its proof, and every component its label" });
export type BrandSignature = z.infer<typeof brandSignature>;
export type BrandPage = (typeof BRAND_PAGES)[number];
export type BrandDevice = (typeof BRAND_DEVICES)[number];
export type BrandComponent = (typeof BRAND_COMPONENTS)[number];

/** Acquisition: signals arrive, each firm is scored against the ideal client profile (ICP) with its reasons, and
 *  the first message waits for a person's approval. Example data (fictional firms, labelled). Each firm lists, per
 *  ICP dimension, its own value and the option ids it satisfies, so the score is data, not code. */
export const ACQ_DIMENSIONS = ["sector", "size", "region"] as const;
const acqOption = z.object({ id: text, label: text });
const acqFact = z.object({ value: text, matches: z.array(text).min(1) });
export const acquisitionSignature = z.object({
  kind: z.literal("acquisition"),
  labels: z.object({
    example: text, hint: text, icp: text, signals: text, fits: text, noFit: text, score: text,
    dimensions: z.object({ sector: text, size: text, region: text }),
    draft: text, to: text, subject: text, waiting: text, approve: text, approved: text, noDraft: text,
    week: text, contacted: text, replied: text, booked: text, pending: text,
  }),
  tool: text, approver: text,
  options: z.object({ sector: z.array(acqOption).min(2).max(3), size: z.array(acqOption).min(2).max(3), region: z.array(acqOption).min(2).max(3) }),
  firms: z.array(z.object({
    id: text, name: text, contact: text,
    signal: z.object({ type: text, text, when: text }),
    facts: z.object({ sector: acqFact, size: acqFact, region: acqFact }),
    draft: z.object({ subject: text, lines: z.array(text).min(2).max(3), sent: text }),
  })).min(3).max(5),
  week: z.object({ contacted: z.number().int().min(0), replied: z.number().int().min(0), booked: z.number().int().min(0) }),
  initial: z.object({ sector: text, size: text, region: text, firm: text }),
}).refine((s) => ACQ_DIMENSIONS.every((k) => s.options[k].some((o) => o.id === s.initial[k])
    && s.firms.every((f) => f.facts[k].matches.every((m) => s.options[k].some((o) => o.id === m)))) && s.firms.some((f) => f.id === s.initial.firm),
  { message: "firm matches and `initial` must refer to option ids in this block" });
export type AcquisitionSignature = z.infer<typeof acquisitionSignature>;
export type AcqDimension = (typeof ACQ_DIMENSIONS)[number];

/** Invoicing: approved hours become an invoice line by line (with VAT), it goes out with a payment link, the
 *  payment is matched and the invoice is booked; late payers get reminders on a schedule that can be switched off
 *  per client. Example data (fictional clients, example amounts, labelled). Amounts are preformatted per locale. */
const invReminder = z.object({ label: text, when: text, state: z.enum(["sent", "planned", "skipped"]) });
export const invoicingSignature = z.object({
  kind: z.literal("invoicing"),
  labels: z.object({
    example: text, hint: text, client: text, follow: text,
    stations: z.object({ hours: text, invoice: text, payment: text, ledger: text }),
    total: text, subtotal: text, vat: text, sent: text, due: text, paid: text, open: text, overdue: text,
    contains: text, ofWhich: text, matched: text, booked: text, linkSent: text,
    reminders: z.object({ title: text, toggle: text, on: text, off: text, sent: text, planned: text, skipped: text, offNote: text, stopped: text }),
  }),
  tools: z.object({ hours: text, books: text, pay: text }),
  clients: z.array(z.object({
    id: text, name: text, period: text,
    lines: z.array(z.object({ who: text, what: text, hours: text, rate: text, amount: text })).min(2).max(4),
    hours_total: text,
    invoice: z.object({ number: text, sent: text, due: text, subtotal: text, vat: text, total: text }),
    payment: z.discriminatedUnion("state", [
      z.object({ state: z.literal("paid"), date: text, method: text, from: text }),
      z.object({ state: z.literal("open"), late: text }),
    ]),
    ledger: z.array(z.object({ account: text, amount: text, revenue: z.boolean() })).min(2).max(4),
    reminders: z.array(invReminder).min(2).max(4),
  })).min(2).max(3),
  initial: z.object({ client: text, line: z.number().int().min(0) }),
}).refine((s) => s.clients.some((c) => c.id === s.initial.client && s.initial.line < c.lines.length)
  && s.clients.every((c) => c.ledger.filter((r) => r.revenue).length === 1),
  { message: "`initial` must name a client and one of its lines; each ledger has exactly one revenue row" });
export type InvoicingSignature = z.infer<typeof invoicingSignature>;

/** A service page's signature: how the service works, shown as one interactive component.
 *  ACF layout `service_signature`; `component` is a flexible-content field with one layout per kind
 *  (reporting, operations, brand, acquisition, invoicing). */
export const serviceSignatureSchema = z.object({
  acf_fc_layout: z.literal("service_signature"),
  anchor: z.string(),
  heading_parts: headingParts,
  points: z.array(z.object({ title: text, text })).min(2).max(4),
  component: z.discriminatedUnion("kind", [reportingSignature, operationsSignature, brandSignature, acquisitionSignature, invoicingSignature]),
});
export type ServiceSignatureBlock = z.infer<typeof serviceSignatureSchema>;
