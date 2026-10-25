import type { Moment } from "@/components/blocks/services/moments/schema";
import type { LogoKey } from "@/lib/content/logos";
import type { Art } from "@/components/LineArt";

// All copy for the English site. nl.ts mirrors this shape exactly.
// Example data in scenes is fictional (Van Dijk Accountancy, De Vries Installatie, Jansen Logistiek).

export type ServiceSlug = "brand-digital-presence" | "customer-acquisition" | "operational-automation" | "invoice-payment-automation" | "business-reporting-automation";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  lead: string;
  rest: string;
  hero: { title: string; muted: string; sub: string };
  howTitle: [string, string];
  steps: { title: string; text: string }[];
  gridTitle: [string, string];
  principlesTitle: [string, string];
  principles: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  /** Tools slot: 4–8 tools this service is usually built with. `logo` is a key in lib/content/logos.ts, or null when
   *  no clean official mark exists or the vendor's guidelines rule out a one-colour logo (the name is shown instead). */
  tools: { name: string; logo: LogoKey | null }[];
  /** What you get / what's not included (confirmed by the owner, Oct 2026). */
  included: string[];
  excluded: string[];
  /** `home` = the service's moment (components/blocks/services/moments): the homepage explorer and the service hero. */
  scenes: { home: Moment };
};

/** One example run in "How it runs" on the home page (fictional data). Shape: components/blocks/how-it-runs/schema.ts. */
export type HomeRun = {
  tab: string;
  duration: number;
  start: { label: string; title: string; detail: string; via: string; time: string };
  rows: { at: number; label: string; time: string; tool: string; text: string; person: { name: string; waiting: string; approve: string; approved: string } | null }[];
  done: string;
};

const services: Service[] = [
  {
    slug: "brand-digital-presence",
    name: "Brand & Digital Presence",
    short: "Brand",
    lead: "A brand clients actually trust.",
    rest: "A new identity, a website built to convert, and a Google profile that gets your firm found locally.",
    hero: { title: "A brand clients trust.", muted: "A website that books the call.", sub: "Identity, website and local search, designed and built as one system, so your firm looks as good as the work it does." },
    howTitle: ["Designed first.", "Then built to convert."],
    steps: [
      { title: "Audit what you have.", text: "We review your brand, website, search presence and competitors, and agree on what has to change." },
      { title: "Design the identity.", text: "Logo, palette and type come together as one brand guide that you own and can reuse everywhere." },
      { title: "Build, connect, launch.", text: "The site is built, enquiries flow into your CRM and calendar, and every launch check is done." },
    ],
    gridTitle: ["Everything a firm needs", "to look established online."],
    principlesTitle: ["Built for the long run.", "Not just for launch day."],
    principles: [
      { title: "You own everything.", text: "Domain, files, accounts and brand guide are yours. No lock-in." },
      { title: "Built to be found.", text: "Local search and technical SEO are part of the build, not an extra." },
      { title: "Measured, not guessed.", text: "Speed, accessibility and enquiries are checked before and after launch." },
    ],
    faq: [
      { q: "Do I need to have a logo already?", a: "No. We can start from scratch or refine what you have. The audit decides which makes more sense." },
      { q: "Which platform do you build on?", a: "We design first, then choose the platform per client: Next.js on Vercel when speed comes first, or WordPress with Elementor Pro if you want to edit pages yourself. Both are in your name." },
      { q: "Can you work with my existing website?", a: "Yes. Sometimes a redesign and better structure is enough. We will tell you honestly after the audit." },
      { q: "What do I need to provide?", a: "Access to your current accounts, time for a kickoff and feedback at the agreed moments. We handle the rest." },
    ],
    tools: [
      { name: "WordPress", logo: "wordpress" },
      { name: "Elementor Pro", logo: null },
      { name: "Adobe Creative Cloud", logo: null },
      { name: "Figma", logo: "figma" },
      { name: "Blender", logo: "blender" },
      { name: "Higgsfield", logo: null },
      { name: "Next.js", logo: "nextjs" },
      { name: "Vercel", logo: "vercel" },
    ],
    included: [
      "A logo and identity, set down in a brand guide you own.",
      "A website that says what you do, for whom and where, with copy per service.",
      "An enquiry form that puts requests straight into your CRM or inbox.",
      "Online booking from every page, through for example Cal.com or Calendly.",
      "Technical SEO and a set-up Google Business Profile.",
      "A measurement before and after launch: speed, accessibility, enquiries.",
    ],
    excluded: [
      "Photography and video: we use your images or recommend a photographer.",
      "Ongoing content writing or social media management.",
      "Paid advertising, such as Google Ads or LinkedIn Ads.",
      "Web shops with checkout and stock.",
      "Hosting and domain in our name: everything is in yours.",
    ],
    scenes: {
      // Homepage explorer moment (example data, fictional firm). Choreography per state is in code.
      home: {
        kind: "home_brand", duration: 9,
        steps: [
          { at: 0, label: "Logo mark", state: "mark" },
          { at: 1.6, label: "Type", state: "type" },
          { at: 3, label: "Colour", state: "colour" },
          { at: 4.6, label: "Live page", state: "page" },
          { at: 7, label: "Call booked", state: "booked" },
        ],
        firm: "Van Dijk Accountancy", mark: "vD", tagline: "Accountancy · Utrecht",
        guide: { title: "Brand guide", version: "v1.0", mark: "Logo", type: "Type", colour: "Colour" },
        type: { display: "Manrope · headlines", body: "Inter · body text", specimen: "Aa" },
        colours: [{ name: "Night", hex: "#0B1B33" }, { name: "Signal", hex: "#2E5BFF" }, { name: "Ice", hex: "#EDF1FF" }],
        page: { url: "vandijk-accountancy.nl", nav: ["Services", "About", "Contact"], headline: "Clear books, all year round.", body: "Bookkeeping, annual accounts and tax returns for owner-run businesses in Utrecht.", button: "Book an intro call" },
        booking: { label: "Intro call", when: "Thu 12 Nov, 10:00", via: "via Cal.com", who: "Sanne de Vries" },
      },
    },
  },
  {
    slug: "customer-acquisition",
    name: "Customer Acquisition",
    short: "Acquisition",
    lead: "Your team, amplified.",
    rest: "Agents prospect and reach out when buyers are looking, building a pipeline of deals ready to win.",
    hero: { title: "Your pipeline, filled.", muted: "While you do client work.", sub: "Agents watch for the right firms, score them against your ideal client and prepare the outreach. Your team steps in when a buyer replies." },
    howTitle: ["You decide who to reach.", "The system does the legwork."],
    steps: [
      { title: "Define your ideal client.", text: "Sector, size, region and the moments that make a firm ready to talk: we write them down together." },
      { title: "Watch for buying signals.", text: "Hiring, growth and news are tracked daily, and every firm is scored against your profile." },
      { title: "Reach out at the right moment.", text: "A personal first message is drafted for your approval. Replies go straight to you." },
    ],
    gridTitle: ["The work behind a full pipeline.", "Done every day, not when there is time."],
    principlesTitle: ["Personal, at scale.", "Never spammy."],
    principles: [
      { title: "A person approves.", text: "Nothing goes out in your name without your yes." },
      { title: "Shows its reasoning.", text: "Every score comes with the signals behind it." },
      { title: "Respects the rules.", text: "GDPR-aware lists and an easy opt-out in every message." },
    ],
    faq: [
      { q: "Is this cold email?", a: "No mass email and no bought lists. We approach a short list of firms that fit and have a reason to talk, personally and on the basis of legitimate interest (B2B), with an opt-out in every message." },
      { q: "Which CRM do I need?", a: "We work with the CRM you have, such as HubSpot, or set up a simple one if you have none." },
      { q: "Do agents send messages on their own?", a: "Only if you want them to. By default every first message waits for your approval." },
      { q: "How quickly will I see meetings?", a: "That depends on your market and offer. We agree on realistic goals during the audit and report on them weekly." },
    ],
    tools: [
      { name: "Microsoft 365 (Outlook, Teams)", logo: null },
      { name: "HubSpot", logo: "hubspot" },
      { name: "Google Workspace", logo: null },
      { name: "n8n", logo: null },
      { name: "Custom AI agents (LangChain)", logo: "langchain" },
    ],
    included: [
      "A written ideal client profile with the signals we watch for.",
      "Agents that gather fitting firms and signals for you.",
      "A short list of fitting firms each week, with why they fit now.",
      "A draft of every first message, waiting for your approval.",
      "Follow-up and an up-to-date CRM, with no retyping.",
      "A weekly overview: contacted, replied, booked.",
    ],
    excluded: [
      "Bought lists or mass mailings.",
      "Phone prospecting (cold calling).",
      "Ad campaigns.",
      "Guarantees on a number of meetings.",
    ],
    scenes: {
      // Homepage explorer moment (example data, fictional firms). Choreography per state is in code.
      home: {
        kind: "home_acquisition", duration: 11,
        steps: [
          { at: 0, label: "Signal found", state: "signal" },
          { at: 1.4, label: "Scored", state: "score" },
          { at: 3.4, label: "Message drafted", state: "draft" },
          { at: 6, label: "Approved", state: "approve" },
          { at: 8, label: "Meeting booked", state: "booked" },
        ],
        signal: { label: "New vacancy", title: "Project lead, installations", company: "De Vries Installatie", source: "on their careers page", when: "today 08:12" },
        fit: { label: "Fits your ideal client", criteria: [{ label: "Sector", value: "Installation" }, { label: "Size", value: "20–50 staff" }, { label: "Region", value: "North Brabant" }], result: "3 of 3" },
        draft: {
          tool: "HubSpot", label: "Draft", to_label: "To", to: "Pieter de Vries", subject_label: "Subject", subject: "Your new project lead",
          lines: ["Good morning Pieter, congratulations on the growth.", "A new hire usually means more payroll work.", "Shall we talk it through over coffee next week?"],
          waiting: "Waiting for Anne", approve: "Approve", approved: "Approved by Anne · sent 09:04", approver: "Anne",
        },
        pipeline: {
          columns: ["Signal", "Contacted", "Replied", "Meeting booked"], deal: "De Vries Installatie", contact: "Pieter de Vries", booked: "Tue 17 Nov, 10:00",
          others: [{ firm: "Bakker Advocaten", column: 0 }, { firm: "De Wit Bouw", column: 1 }, { firm: "Jansen Logistiek", column: 2 }],
        },
      },
    },
  },
  {
    slug: "operational-automation",
    name: "Operational Automation",
    short: "Operations",
    lead: "Work that runs itself.",
    rest: "Recurring admin runs on its own, so your team stops chasing documents and deadlines and does the work clients pay for.",
    hero: { title: "Work that runs itself.", muted: "With a person on every key step.", sub: "Client onboarding, document collection, deadlines and approvals run as one workflow, connected to the software you already use." },
    howTitle: ["We map how work moves.", "Then take the busywork out."],
    steps: [
      { title: "Clients get reminded, not chased.", text: "Friendly reminders go out on their own until every document is in." },
      { title: "Documents arrive complete.", text: "One clear checklist per client. Every upload lands in the right folder, named and filed." },
      { title: "Deadlines handle themselves.", text: "Every task gets an owner and a date, so nothing slips before a filing deadline." },
    ],
    gridTitle: ["The admin between the real work.", "Running on its own."],
    principlesTitle: ["Automation you can trust.", "Because you can see it."],
    principles: [
      { title: "Logged, step by step.", text: "See what happened, when, and who approved it." },
      { title: "In your own tools.", text: "Built around your current software. No migration." },
      { title: "Easy to change.", text: "New step or new rule? We adjust the workflow, not your team." },
    ],
    faq: [
      { q: "Which processes are a good start?", a: "Repetitive work with clear steps: onboarding, document collection, period closing and deadline tracking." },
      { q: "Do we need new software?", a: "Usually not. We connect what you already use, such as your client portal, email, file storage and practice software." },
      { q: "What about client data?", a: "Each step only gets access to what it needs. Data stays in your own systems (for example Microsoft 365) and every action goes into a log you can read. We sign a data processing agreement with you." },
      { q: "Who maintains it?", a: "We do. We monitor the workflows and adjust them when your process changes." },
    ],
    tools: [
      { name: "Microsoft 365 (SharePoint, OneDrive, Outlook, Teams)", logo: null },
      { name: "Copilot Studio", logo: null },
      { name: "Google Workspace", logo: null },
      { name: "n8n", logo: null },
      { name: "Custom AI agents (LangChain)", logo: "langchain" },
    ],
    included: [
      "A written map of how the process runs today and how it will run.",
      "Workflows for onboarding, document requests and reminders.",
      "Incoming documents recognised, named and filed in the right dossier.",
      "An assistant in your own Microsoft 365 that answers questions about dossiers.",
      "A status overview per client and per deadline, with a log of every action.",
      "Maintenance: we monitor and adjust the workflows.",
    ],
    excluded: [
      "Replacing your practice or accounting software.",
      "The professional work itself: the return and the advice stay with your team.",
      "Migrating your full archive.",
      "IT management of laptops, network or licences.",
    ],
    scenes: {
      // Homepage explorer moment (example data, fictional client). Choreography per state is in code.
      home: {
        kind: "home_operations", duration: 10,
        steps: [
          { at: 0, label: "Request", state: "request" },
          { at: 1.2, label: "Arrivals", state: "arrive" },
          { at: 2, label: "Recognised and filed", state: "sort" },
          { at: 6.6, label: "File complete", state: "complete" },
          { at: 7.8, label: "Before the deadline", state: "deadline" },
        ],
        dossier: { title: "Income tax 2026", client: "M. Jansen", complete: "Complete" },
        via: "Request sent via Microsoft 365", recognised: "Recognised",
        dividers: ["Income", "Home", "Assets"],
        docs: [
          { name: "Annual statement 2026", divider: 0 }, { name: "WOZ value notice", divider: 1 }, { name: "Mortgage statement 2026", divider: 1 },
          { name: "Bank statement 31 Dec", divider: 2 }, { name: "Investment statement 2026", divider: 2 },
        ],
        checklist: { label: "Documents", progress: "{n} of {total} in", done: "File complete" },
        deadline: { requested: "2027-02-15", done: "2027-03-12", due: "2027-05-01", start_label: "Request 15 Feb", due_label: "Deadline 1 May", done_label: "Complete on 12 March", spare: "50 days to spare" },
      },
    },
  },
  {
    slug: "invoice-payment-automation",
    name: "Invoice & Payment Automation",
    short: "Invoicing",
    lead: "Paid faster. Booked automatically.",
    rest: "Invoices go out on time, payment is one click for your client, and every euro is matched and booked without anyone retyping it.",
    hero: { title: "Paid faster.", muted: "Booked automatically.", sub: "From approved hours to a paid and booked invoice, without retyping a number. Reminders go out on schedule and stop when the money lands." },
    howTitle: ["From the work you did", "to money in the bank."],
    steps: [
      { title: "Start from the work.", text: "Approved hours, fixed fees and expenses are collected per client, ready to invoice." },
      { title: "Invoices write themselves.", text: "Every invoice is built from the work you did, with a payment link included." },
      { title: "Late payments chase themselves.", text: "Reminders go out on a schedule and stop the moment the payment lands." },
    ],
    gridTitle: ["Billing without the busywork.", "From hours to booked payment."],
    principlesTitle: ["Your money, your rules.", "Always visible."],
    principles: [
      { title: "Approval where it matters.", text: "Large or unusual invoices wait for a person." },
      { title: "Works with your books.", text: "Connected to the accounting software you already use." },
      { title: "Clear for your clients.", text: "One link, the payment method they prefer, a receipt right away." },
    ],
    faq: [
      { q: "Which accounting software do you support?", a: "We connect to common Dutch packages such as Moneybird, Exact Online and Twinfield. We check yours in the audit." },
      { q: "Can I check invoices before they go out?", a: "Yes. You choose which invoices go out automatically and which wait for approval." },
      { q: "How do payment links work?", a: "Through a payment provider such as Mollie. Your client pays by iDEAL, card or transfer, and the payment is matched automatically." },
      { q: "Can reminders be stopped for a client?", a: "Yes, per client or per invoice, for example when you have agreed a payment plan." },
    ],
    tools: [
      { name: "Exact Online", logo: null },
      { name: "Twinfield", logo: null },
      { name: "Moneybird", logo: null },
      { name: "Mollie", logo: null },
      { name: "Stripe", logo: "stripe" },
      { name: "DocuSign", logo: "docusign" },
      { name: "Adobe Acrobat Sign", logo: null },
      { name: "PandaDoc", logo: null },
    ],
    included: [
      "Invoices from your hours or agreements, ready to check or sent straight away.",
      "A payment link in every invoice (iDEAL, card, transfer).",
      "A reminder schedule you switch on or off per client.",
      "Payments matched and booked automatically.",
      "A cash overview: what's open, late and expected.",
    ],
    excluded: [
      "Debt collection and bailiff procedures.",
      "Your bookkeeping or VAT return itself.",
      "Payment provider fees: you pay those directly to, for example, Mollie.",
    ],
    scenes: {
      // Homepage explorer moment (example data, fictional firms; amounts are example figures). Choreography per state is in code.
      home: {
        kind: "home_invoicing", duration: 12,
        steps: [
          { at: 0, label: "Hours", state: "hours" },
          { at: 1.6, label: "Invoice", state: "invoice" },
          { at: 3.6, label: "Sent", state: "sent" },
          { at: 5.6, label: "Reminder", state: "reminder" },
          { at: 7.8, label: "Paid", state: "paid" },
          { at: 9.6, label: "Booked", state: "booked" },
        ],
        tool: "Moneybird",
        hours: {
          label: "Time entries · October",
          rows: [
            { who: "Mark", what: "Annual accounts 2025", hours: "6.5 h", amount: "€ 617.50" },
            { who: "Anne", what: "Payroll October", hours: "3.0 h", amount: "€ 285.00" },
            { who: "Mark", what: "Board meeting", hours: "1.5 h", amount: "€ 142.50" },
          ],
          total_label: "Total", total: "11.0 h",
        },
        invoice: { label: "Invoice", number: "2026-0142", client: "Jansen Logistiek", subtotal: ["Subtotal", "€ 1,045.00"], vat: ["VAT 21%", "€ 219.45"], total: ["Total", "€ 1,264.45"] },
        dates: { hours: "31 Oct", sent: "2 Nov", reminder: "17 Nov", paid: "18 Nov", gap: "14 days later" },
        notes: { sent: "Sent with a Mollie payment link", reminder: "Friendly reminder sent", booked: "Paid · matched · booked in Moneybird" },
        payment: { label: "Mollie · iDEAL", from: "Jansen Logistiek B.V.", amount: "€ 1,264.45", match: "Matched to 2026-0142" },
      },
    },
  },
  {
    slug: "business-reporting-automation",
    name: "Business Reporting Automation",
    short: "Reporting",
    lead: "Reports that build themselves.",
    rest: "Your invoices, hours and pipeline come together in one live dashboard that refreshes every morning and sends you the summary.",
    hero: { title: "Reports that build themselves.", muted: "Before you ask for them.", sub: "Invoices, hours and pipeline in one dashboard that refreshes every morning, with a short summary in your inbox every Monday." },
    howTitle: ["One set of numbers.", "Everyone looks at the same."],
    steps: [
      { title: "Connect your sources.", text: "Accounting, time tracking, CRM and payments are synced every night." },
      { title: "Numbers you can trust.", text: "One dashboard built on your real data, so everyone looks at the same numbers." },
      { title: "Insight without asking.", text: "A short summary lands in your inbox every Monday, with what changed and what needs attention." },
    ],
    gridTitle: ["The numbers a partner meeting needs.", "Ready before Monday."],
    principlesTitle: ["Clear numbers.", "Clear decisions."],
    principles: [
      { title: "One source of truth.", text: "Built on your systems, not on spreadsheets someone forgot to update." },
      { title: "Plain language.", text: "Every dashboard comes with a short explanation of what it means." },
      { title: "Yours to keep.", text: "Dashboards live in your own account, for example in Power BI." },
    ],
    faq: [
      { q: "Which tools do you use for dashboards?", a: "Usually Power BI, Excel or Looker Studio, or a custom dashboard, depending on what you already have and who needs access." },
      { q: "Where does the data come from?", a: "From your own systems: accounting, time tracking, CRM and payments. We connect them once and sync daily." },
      { q: "Can I get alerts instead of dashboards?", a: "Yes. You can receive only the weekly summary and an alert when a figure crosses a threshold, without opening a dashboard." },
      { q: "How accurate are the numbers?", a: "As reliable as your source data. Every figure shows which system it came from and when it synced, and before go-live we check everything against your books." },
    ],
    tools: [
      { name: "Power BI", logo: null },
      { name: "Looker Studio", logo: null },
      { name: "Microsoft 365 (Excel)", logo: null },
      { name: "Exact Online", logo: null },
      { name: "Twinfield", logo: null },
      { name: "Moneybird", logo: null },
      { name: "HubSpot", logo: "hubspot" },
      { name: "Custom dashboard", logo: null },
    ],
    included: [
      "One dashboard with revenue, hours, open invoices and pipeline.",
      "The source of every figure: system, data and sync time.",
      "Refreshed every morning, before work starts.",
      "A short plain-language summary every Monday.",
      "Alerts when a figure crosses a threshold.",
      "A check against your books before go-live.",
    ],
    excluded: [
      "Licences for Power BI or other software: they are in your name.",
      "Cleaning up historical source data.",
      "Financial advice on what the figures mean.",
      "Real-time (second-by-second) data: we refresh daily.",
    ],
    scenes: {
      // Homepage explorer moment (example data, fictional firm). Choreography per state is in code.
      home: {
        kind: "home_reporting", duration: 10,
        steps: [
          { at: 0, label: "Three sources", state: "sources" },
          { at: 1.4, label: "Figures flow", state: "flow" },
          { at: 3.4, label: "One view", state: "merge" },
          { at: 5.4, label: "Numbers settle", state: "settle" },
          { at: 7.4, label: "Monday summary", state: "summary" },
        ],
        sources: [
          { tool: "Exact Online", what: "Revenue", rows: [["October", "€ 84,200"], ["Open invoices", "€ 12,900"]] },
          { tool: "Time tracking", what: "Hours", rows: [["Billable", "71%"], ["Logged", "1,214 h"]] },
          { tool: "HubSpot", what: "Pipeline", rows: [["Open quotes", "€ 126,000"], ["New deals", "4"]] },
        ],
        dashboard: {
          tool: "Power BI", title: "Van Dijk Accountancy · October",
          kpis: [{ label: "Revenue", value: "€ 84,200", note: "+6% on September" }, { label: "Billable", value: "71%", note: "target 75%" }, { label: "Pipeline", value: "€ 126,000", note: "4 open quotes" }],
          bars: [58, 64, 61, 70, 74, 82], bars_label: "Revenue, last 6 weeks",
        },
        email: { tool: "Microsoft 365", from: "Weekly report", time: "Mon 07:00", subject: "Week 43 summary", lines: ["Revenue in October: € 84,200, 6% above September.", "Billable hours at 71%, target 75%.", "4 quotes open in HubSpot, € 126,000 in total."] },
      },
    },
  },
];


/* Operations signature: fictional clients and documents (labelled "Example"). File names and folders follow one pattern. */
const opsItems = [
  { id: "bank", label: "Bank statements" },
  { id: "sales", label: "Sales invoices" },
  { id: "purchase", label: "Purchase invoices" },
  { id: "receipts", label: "Receipts" },
  { id: "mileage", label: "Mileage log" },
];
const opsClients = [
  { id: "devries", name: "De Vries Installatie", short: "De Vries" },
  { id: "jansen", name: "Jansen Logistiek", short: "Jansen" },
  { id: "bakker", name: "Bakker Advocaten", short: "Bakker" },
];
function opsDoc(client: string, period: string, item: string, via: "portal" | "email", at: string, pages: number) {
  const c = opsClients.find((x) => x.id === client)!, i = opsItems.find((x) => x.id === item)!;
  return { item, status: "received" as const, via, at, pages: `${pages} pages`, name: `2026-${period} ${i.label} ${c.short}.pdf`, folder: `Clients › ${c.name} › 2026 › ${period}` };
}
const opsMissing = (item: string, requested: string, day3: string, day7: string, sent: number) => ({ item, status: "missing" as const, requested, day3, day7, sent });
const opsSigned = (who: string, at: string) => ({ state: "signed" as const, text: `Signed off by ${who} · ${at}` });

export const en = {
  locale: "en" as "en" | "nl",
  meta: { title: "Assembly Engine · Automation for professional services firms", description: "Brand, client acquisition, operations, invoicing and reporting, built as one system for accounting, legal and consultancy firms." },
  example: "Example",
  nav: { services: "Services", caseStudy: "Case study", resources: "Resources", about: "About", contact: "Contact", cta: "Book a free audit", blog: "Blog", howWeWork: "How we work", newsletter: "Newsletter", menu: "Menu", close: "Close menu", allServices: "All services", language: "Language" },
  footer: { tagline: "Automation for accounting, legal & consulting firms.", services: "Services", company: "Company", contact: "Contact", privacy: "Privacy", terms: "Terms", location: "The Netherlands · working remotely" },
  services,
  home: {
    hero: {
      eyebrow: "Accounting · Legal · Consultancy",
      title: [{ t: "Automation" }, { t: "for" }, { t: "professional", blue: true }, { t: "services", blue: true }, { t: "firms", blue: true }],
      sub: "Purpose-built automation for firms that run on documents, deadlines, and client trust — accounting, legal, consultancy, and the SMBs who work the same way.",
      cta1: "Book your free audit", cta2: "How we work",
      moduleHint: "See the example",
    },
    demo: { caption: "Live simulation · how our services work together", note: "Example data · fictional firm", play: "Play", pause: "Pause", label: "Demo: how the five Assembly Engine services work together" },
    how: {
      eyebrow: "How we work", title: ["A clear path from", "idea to launch."],
      sub: "From your first conversation to a working automation, every step is mapped out in advance — no surprises, no guesswork, live within four weeks.",
      steps: [
        { n: "01", title: "Discover", text: "We learn where your team loses the most time.", detail: "Company analysis, ICP definition, and process or data mapping" },
        { n: "02", title: "Design", text: "We design the exact automation your workflow actually needs.", detail: "Process flows, data mapping, and integration points defined before building" },
        { n: "03", title: "Build", text: "We build your automation around your existing tools.", detail: "Development, API integrations, and testing within your current software" },
        { n: "04", title: "Launch", text: "Your automation goes live, fully tested and ready to use.", detail: "Deployment, QA, and handover to your team within four weeks" },
        { n: "05", title: "Improve", text: "We monitor and improve the automation as your needs change.", detail: "Ongoing monitoring, performance tuning, and updates" },
      ],
    },
    who: {
      eyebrow: "Who we are", title: ["Your firm runs on expertise.", "We automate the rest."],
      paras: [
        "We build automation for accounting, legal, consultancy firms and SMBs starting from how your firm actually works.",
        "Invoices, onboarding, reporting and follow-ups run by themselves, connected to the software you already use.",
        "Fewer manual steps, fewer errors, and your team’s time goes back to the clients who pay for it.",
      ],
    },
    services: { eyebrow: "Services", title: ["Start with a brand and website built to win clients,", "then automate how you find, serve, bill, and report. Your firm grows; your admin doesn’t."], more: "Explore the service" },
    // Homepage service moments: stage controls (docs/service-animations-plan.md)
    moments: { pause: "Pause", play: "Play", replay: "Replay", steps: "Steps in this example", example: "Example · fictional firm" },
    advantages: {
      items: [
        { title: "Made for professional firms", text: "We already know your deadlines and processes.", icon: "briefcase" },
        { title: "Built around your workflow", text: "We first map how your team works today, then build around it.", icon: "workflow" },
        { title: "Works with your software", text: "No migration. We connect the tools you use.", icon: "plug" },
        { title: "We run it for you", text: "We monitor every automation and adjust it when your work changes.", icon: "gauge" },
        { title: "Confidential by design", text: "Client data is protected in every build.", icon: "lock" },
      ],
      pill: "Services", title: ["Find the work you can stop doing.", "Five services, built to run themselves."], explore: "Explore all of them",
    },
    blog: { pill: "Blog", title: ["Learn as you grow.", "Practical automation ideas for firms that run on deadlines."], viewAll: "View all posts", readGuide: "Read the guide", featured: "Featured", read: "read" },
    // Homepage v3 sections (see docs/homepage-v3-plan.md)
    run: {
      title: ["One request.", "The rest runs itself."],
      sub: "An enquiry, a client upload or 07:00 on a weekday starts the run. The system checks, files, books and reports in the software you already use, and asks a person where judgement is needed.",
      points: [
        { title: "Connected to your software", text: "No migration. It runs inside the tools you already use.", focus: "tools" },
        { title: "A person on the steps that matter", text: "Approvals go to the right partner before anything is sent.", focus: "person" },
        { title: "Every step on record", text: "You see what ran, when and why.", focus: "log" },
      ],
      labels: { tabs: "Choose how it starts", log: "Log" },
      // Illustrative example runs, fictional firm (not client data).
      runs: [
        {
          tab: "Website enquiry", duration: 8.5,
          start: { label: "In", title: "Enquiry from the website", detail: "Peter van Dijk · Van Dijk Accountancy", via: "WordPress form", time: "09:12:04" },
          rows: [
            { at: 1.0, label: "Logged", time: "09:12:05", tool: "HubSpot", text: "Contact and deal created", person: null },
            { at: 1.8, label: "Scored", time: "09:12:06", tool: "HubSpot", text: "Checked against your ideal client: a fit", person: null },
            { at: 2.6, label: "Scheduled", time: "09:12:07", tool: "Cal.com", text: "Three times offered for an intro call", person: null },
            { at: 3.6, label: "Approved", time: "09:14:30", tool: "Microsoft 365", text: "Reply to Peter drafted", person: { name: "Anne", waiting: "Waiting for Anne", approve: "Approve", approved: "Approved by Anne" } },
            { at: 6.4, label: "Sent", time: "09:14:31", tool: "Microsoft 365", text: "Reply sent to Peter", person: null },
          ],
          done: "Finished at 09:14:31 · one approval",
        },
        {
          tab: "Client upload", duration: 8.5,
          start: { label: "In", title: "4 documents uploaded", detail: "De Vries Installatie", via: "Client portal", time: "14:03:51" },
          rows: [
            { at: 1.0, label: "Checked", time: "14:03:52", tool: "Microsoft 365", text: "Checked against the checklist: 4 of 4", person: null },
            { at: 1.8, label: "Filed", time: "14:03:53", tool: "Microsoft 365", text: "Filed in /2026/Q3 with clear names", person: null },
            { at: 2.6, label: "Task", time: "14:03:54", tool: "Microsoft 365", text: "Task created: VAT return Q3, 31 Oct", person: null },
            { at: 3.6, label: "Review", time: "14:21:10", tool: "Microsoft 365", text: "Documents reviewed", person: { name: "Anne", waiting: "Waiting for Anne's review", approve: "Approve", approved: "Approved by Anne" } },
            { at: 6.4, label: "Notified", time: "14:21:11", tool: "Slack", text: "Team told: file complete", person: null },
          ],
          done: "Finished at 14:21:11 · one review",
        },
        {
          tab: "Weekday 07:00", duration: 6.5,
          start: { label: "Start", title: "Every weekday at 07:00", detail: "Van Dijk Accountancy", via: "Schedule", time: "07:00:00" },
          rows: [
            { at: 1.0, label: "Invoices", time: "07:00:02", tool: "Exact Online", text: "Yesterday's invoices fetched", person: null },
            { at: 1.7, label: "Pipeline", time: "07:00:03", tool: "HubSpot", text: "Open proposals fetched", person: null },
            { at: 2.4, label: "Dashboard", time: "07:00:05", tool: "Power BI", text: "Dashboard refreshed", person: null },
            { at: 3.1, label: "Summary", time: "07:00:06", tool: "Microsoft 365", text: "Weekly summary written", person: null },
            { at: 3.8, label: "Sent", time: "07:00:07", tool: "Microsoft 365", text: "Sent to 3 partners", person: null },
          ],
          done: "Finished at 07:00:07 · no manual steps",
        },
      ] as HomeRun[],
    },
    track: { span: "Live within 4 weeks", after: "Ongoing", step: "Step" },
    proof: {
      label: "Case study · Energielabel Breda", cta: "Read the case",
      source: "Scores: Google PageSpeed Insights, homepage, 15 Oct 2026. LCP: local Lighthouse lab measurement, 14–15 Oct 2026.",
      altDesktop: "Homepage of energielabel-breda.nl on a desktop screen", altPhone: "The same homepage on a phone", lcpWas: "was {v}",
    },
    why: { name: "Nick Smid", role: "Founder, Assembly Engine" },
    closing: {
      title: ["Built around your firm.", "Hours back."],
      sub: "We assemble the system around how your firm already works. Then it runs on its own, so the work is done before you start.",
      cta2: "See the five services",
      done: [
        { kind: "report", label: "Reporting", title: "Week 43 summary", meta: "Microsoft 365 · to 3 partners", status: "Sent" },
        { kind: "invoice", label: "Invoicing", title: "Invoice 2026-0142", meta: "Jansen Logistiek · € 1,264.45", status: "Sent" },
        { kind: "followup", label: "Acquisition", title: "Follow-up Visser Transport", meta: "HubSpot · Anne · Friday", status: "Queued" },
      ] as { kind: "report" | "invoice" | "followup"; label: string; title: string; meta: string; status: string }[],
      clockLabel: "Example: a weekday at 07:00",
    },
    newsletter: { title: ["Stay ahead of the admin.", "One automation idea in your inbox each month."], placeholder: "Your email address", subscribe: "Subscribe", invalid: "Enter a valid email address, like name@yourfirm.nl.", done: "Thanks! (Not connected yet: the signup still needs a mailing tool.)", label: "Email address" },
  },
  servicePage: {
    scope: { included: "What you get", excluded: "What's not included", tools: "Works with, among others", toolsTail: "or with the software you already use." },
    bookAudit: "Book a free audit", seeHow: "See how it works",
    faqTitle: ["Questions,", "answered."], ctaTitle: "Ask more from your admin.", ctaSub: "A free audit shows where your firm loses the most time, and what to automate first.", other: "Other services",
  },
  /** Service-page signature components (fictional example data, labelled). */
  signatures: {
    brand: {
      labels: {
        example: "Example · fictional firm", hint: "Pick a page and a screen. The same brand guide shapes every page.",
        mode: "View", build: "Assembly", proof: "Real: Energielabel Breda", page: "Page", device: "Screen",
        devices: { desktop: "Desktop", phone: "Phone" },
        explode: "Take it apart", assemble: "Put it together", madeOf: "Made of", guide: "Brand guide", parts: "Components on this page",
        summary: "{page} · {device}: {n} components from one brand guide",
        layers: { guide: "Brand guide", parts: "Components", page: "Page" },
        roles: { mark: "Logo", display: "Headings", body: "Text", colour: "Colour" },
        proofHint: "The same approach, real pages. Pick a page and a screen.", proofNote: "PageSpeed scores were measured on the homepage.", source: "Source",
        usedIn: "Used in", pickToken: "Pick part of the brand guide to see where it is used.",
      },
      brand: {
        firm: "Van Dijk Accountancy", mark: "vD", tagline: "Accountancy · Utrecht", url: "vandijk-accountancy.nl", nav: ["Services", "About", "Contact"],
        type: { display: "Manrope", body: "Inter" },
        colours: [{ id: "ink", name: "Night", hex: "#0B1B33" }, { id: "accent", name: "Signal", hex: "#2E5BFF" }, { id: "tint", name: "Ice", hex: "#EDF1FF" }],
      },
      components: [
        { id: "header", label: "Header" }, { id: "crumb", label: "Breadcrumb" }, { id: "hero", label: "Opening" }, { id: "button", label: "Button" },
        { id: "cards", label: "Service cards" }, { id: "list", label: "Checklist" }, { id: "form", label: "Form" }, { id: "aside", label: "Booking card" },
        { id: "footer", label: "Footer" },
      ],
      pages: [
        { id: "home", label: "Home", path: "", crumb: "", heading: "Clear numbers, all year round.", body: "Bookkeeping, annual accounts and tax returns for business owners in Utrecht.", button: "Book an intro call",
          items: [{ title: "Bookkeeping", text: "Up to date every month." }, { title: "Annual accounts", text: "On time, no surprises." }, { title: "Tax returns", text: "VAT and income tax." }],
          aside: { label: "Intro call", title: "Thu 12 Nov, 10:00", text: "via Cal.com" } },
        { id: "service", label: "Service", path: "/annual-accounts", crumb: "Services › Annual accounts", heading: "Annual accounts, no surprises.", body: "We prepare your annual accounts and go through the numbers with you in person.", button: "Book an intro call",
          items: [{ title: "Annual accounts with notes", text: "" }, { title: "Corporate tax return", text: "" }, { title: "A review of the numbers", text: "" }],
          aside: { label: "Your contact", title: "Sanne de Vries", text: "Reply within one working day" } },
        { id: "contact", label: "Contact", path: "/contact", crumb: "Contact", heading: "Book an intro call.", body: "Tell us briefly what you need help with. We reply within one working day.", button: "Send",
          items: [{ title: "Name", text: "" }, { title: "Email", text: "" }, { title: "Your question", text: "" }],
          aside: { label: "Intro call", title: "Thu 12 Nov, 10:00", text: "via Cal.com · Utrecht" } },
      ],
      proof: {
        client: "Energielabel Breda", live: "Live since 14 October 2026 · WordPress and Elementor Pro",
        pages: [
          { page: "home", url: "energielabel-breda.nl", facts: [
            { value: "100", label: "Performance, desktop", source: "Google PageSpeed Insights, homepage, 15 Oct 2026", device: "desktop" },
            { value: "92", label: "Performance, mobile", source: "Google PageSpeed Insights, homepage, 15 Oct 2026", device: "phone" },
            { value: "2.2–3.4 s", label: "Largest Contentful Paint, mobile (was ±6.6 s)", source: "Lab measurement (local Lighthouse), 14–15 Oct 2026", device: "phone" },
            { value: "100", label: "SEO", source: "Google PageSpeed Insights, homepage, 15 Oct 2026", device: "all" },
            { value: "96", label: "Accessibility", source: "Google PageSpeed Insights, homepage, 15 Oct 2026", device: "all" },
          ] },
          { page: "service", url: "energielabel-breda.nl/energielabel-woning", facts: [
            { value: "3 → 20+", label: "Pages", source: "Old sitemap (April 2026) vs new site (October 2026)", device: "all" },
            { value: "8", label: "Service pages", source: "New site, October 2026", device: "all" },
            { value: "4", label: "Location pages: Breda, Etten-Leur, Oosterhout, Teteringen", source: "New site, October 2026", device: "all" },
          ] },
          { page: "contact", url: "energielabel-breda.nl/contact", facts: [
            { value: "4", label: "Ways to get in touch: phone, WhatsApp, email, form", source: "energielabel-breda.nl/contact, 18 Oct 2026", device: "all" },
            { value: "15", label: "Pages with the request form, which fills in the address from the postcode", source: "New site, October 2026", device: "all" },
          ] },
        ],
        alts: {
          home: ["Homepage of energielabel-breda.nl on a desktop screen", "Homepage of energielabel-breda.nl on a phone"],
          service: ["Service page ‘Energielabel woning’ of energielabel-breda.nl on a desktop screen", "Service page ‘Energielabel woning’ on a phone"],
          contact: ["Contact page of energielabel-breda.nl on a desktop screen", "Contact page of energielabel-breda.nl on a phone"],
        },
      },
      initial: { page: "home" as const, device: "desktop" as const },
    },
    operations: {
      labels: {
        example: "Example · fictional clients", hint: "Pick a client and period, and follow a document.",
        client: "Client", period: "Period", checklist: "VAT return checklist", progress: "{n} of {total} in",
        route: "This document’s route", received: "In", missing: "Missing", inbox: "Inbox", check: "Check",
        steps: { received: "Received", checked: "Checked", named: "Named", filed: "Filed", requested: "Requested", day3: "Reminder day 3", day7: "Reminder day 7", waiting: "Waiting for client" },
        matched: "Matches the checklist", planned: "scheduled",
        channels: { portal: "Client portal", email: "Email" },
        sign: { waiting: "Not complete yet", ready: "Ready to sign off", signed: "Signed off" },
      },
      items: opsItems,
      clients: opsClients.map(({ id, name }) => ({ id, name })),
      periods: [{ id: "K2", label: "Q2 2026" }, { id: "K3", label: "Q3 2026" }],
      dossiers: [
        { client: "devries", period: "K3", deadline: "VAT return due 31 Oct", signoff: { state: "waiting" as const, text: "Sanne signs off once the dossier is complete" }, docs: [
          opsDoc("devries", "Q3", "bank", "portal", "2 Oct 09:14", 12), opsDoc("devries", "Q3", "sales", "portal", "2 Oct 09:16", 31),
          opsDoc("devries", "Q3", "purchase", "email", "6 Oct 14:02", 38), opsMissing("receipts", "1 Oct", "4 Oct", "8 Oct", 2),
          opsDoc("devries", "Q3", "mileage", "portal", "9 Oct 11:40", 3),
        ] },
        { client: "devries", period: "K2", deadline: "VAT return filed 22 Jul", signoff: opsSigned("Sanne", "14 Jul 16:20"), docs: [
          opsDoc("devries", "Q2", "bank", "portal", "2 Jul 08:51", 11), opsDoc("devries", "Q2", "sales", "portal", "2 Jul 08:53", 27),
          opsDoc("devries", "Q2", "purchase", "email", "4 Jul 10:30", 35), opsDoc("devries", "Q2", "receipts", "portal", "9 Jul 19:05", 14),
          opsDoc("devries", "Q2", "mileage", "portal", "10 Jul 12:12", 3),
        ] },
        { client: "jansen", period: "K3", deadline: "VAT return due 31 Oct", signoff: { state: "waiting" as const, text: "Mark signs off once the dossier is complete" }, docs: [
          opsDoc("jansen", "Q3", "bank", "email", "13 Oct 08:02", 18), opsDoc("jansen", "Q3", "sales", "email", "13 Oct 08:03", 64),
          opsMissing("purchase", "12 Oct", "15 Oct", "19 Oct", 1), opsDoc("jansen", "Q3", "receipts", "portal", "14 Oct 17:22", 9),
          opsMissing("mileage", "12 Oct", "15 Oct", "19 Oct", 1),
        ] },
        { client: "jansen", period: "K2", deadline: "VAT return filed 24 Jul", signoff: opsSigned("Mark", "16 Jul 11:05"), docs: [
          opsDoc("jansen", "Q2", "bank", "email", "3 Jul 07:58", 17), opsDoc("jansen", "Q2", "sales", "email", "3 Jul 08:00", 59),
          opsDoc("jansen", "Q2", "purchase", "portal", "7 Jul 15:41", 44), opsDoc("jansen", "Q2", "receipts", "portal", "8 Jul 09:12", 11),
          opsDoc("jansen", "Q2", "mileage", "portal", "11 Jul 16:30", 4),
        ] },
        { client: "bakker", period: "K3", deadline: "VAT return due 31 Oct", signoff: { state: "ready" as const, text: "Complete since 9 Oct · waiting for Pieter to sign off" }, docs: [
          opsDoc("bakker", "Q3", "bank", "portal", "1 Oct 16:44", 9), opsDoc("bakker", "Q3", "sales", "portal", "1 Oct 16:45", 22),
          opsDoc("bakker", "Q3", "purchase", "portal", "3 Oct 10:18", 19), opsDoc("bakker", "Q3", "receipts", "email", "7 Oct 13:50", 6),
          opsDoc("bakker", "Q3", "mileage", "portal", "9 Oct 08:37", 2),
        ] },
        { client: "bakker", period: "K2", deadline: "VAT return filed 18 Jul", signoff: opsSigned("Pieter", "11 Jul 15:48"), docs: [
          opsDoc("bakker", "Q2", "bank", "portal", "1 Jul 17:02", 9), opsDoc("bakker", "Q2", "sales", "portal", "1 Jul 17:03", 20),
          opsDoc("bakker", "Q2", "purchase", "portal", "2 Jul 09:40", 17), opsDoc("bakker", "Q2", "receipts", "email", "4 Jul 12:15", 5),
          opsDoc("bakker", "Q2", "mileage", "portal", "8 Jul 10:02", 2),
        ] },
      ],
      initial: { client: "devries", period: "K3", item: "purchase" },
    },
    acquisition: {
      labels: {
        example: "Example · fictional firms", hint: "Adjust your ideal client and see who fits, and why.",
        icp: "Your ideal client", signals: "Signals this week", fits: "Fits your profile", noFit: "Not a fit now", score: "{n} of 3",
        dimensions: { sector: "Sector", size: "Size", region: "Region" },
        draft: "Draft", to: "To", subject: "Subject", waiting: "Waiting for {name} to approve", approve: "Approve",
        approved: "Approved by {name} · sent {time}", noDraft: "This firm doesn’t fit your profile, so no message is drafted.",
        week: "This week", contacted: "Contacted", replied: "Replied", booked: "Meeting booked", pending: "Waiting for approval: {n}",
      },
      tool: "HubSpot", approver: "Anne",
      options: {
        sector: [{ id: "build", label: "Installation & construction" }, { id: "logistics", label: "Logistics" }, { id: "services", label: "Professional services" }],
        size: [{ id: "s20", label: "20–50" }, { id: "s50", label: "50–250" }, { id: "all", label: "Any size" }],
        region: [{ id: "nb", label: "North Brabant" }, { id: "zh", label: "South Holland" }, { id: "nl", label: "All of NL" }],
      },
      firms: [
        { id: "devries", name: "De Vries Installatie", contact: "Pieter de Vries",
          signal: { type: "Vacancy", text: "Installation project manager", when: "today 08:12" },
          facts: { sector: { value: "Installation", matches: ["build"] }, size: { value: "34 employees", matches: ["s20", "all"] }, region: { value: "Tilburg", matches: ["nb", "nl"] } },
          draft: { subject: "Your new project manager", sent: "09:04", lines: ["Good morning Pieter, congratulations on the growth.", "A new colleague often means more payroll work.", "Shall we talk it over next week, over coffee?"] } },
        { id: "bakker", name: "Bakker Advocaten", contact: "Sanne Bakker",
          signal: { type: "Vacancy", text: "Office manager", when: "today 07:40" },
          facts: { sector: { value: "Law firm", matches: ["services"] }, size: { value: "22 employees", matches: ["s20", "all"] }, region: { value: "Rotterdam", matches: ["zh", "nl"] } },
          draft: { subject: "Your new office manager", sent: "09:07", lines: ["Good morning Sanne, I saw you’re hiring an office manager.", "A new colleague is a good moment to rethink the admin.", "Shall we have a short call next week?"] } },
        { id: "dewit", name: "De Wit Bouw", contact: "Jos de Wit",
          signal: { type: "New office", text: "Second office opened in Breda", when: "yesterday" },
          facts: { sector: { value: "Construction", matches: ["build"] }, size: { value: "48 employees", matches: ["s20", "all"] }, region: { value: "Breda", matches: ["nb", "nl"] } },
          draft: { subject: "Your new office in Breda", sent: "09:11", lines: ["Good afternoon Jos, congratulations on the Breda office.", "A second location usually makes the admin a lot busier.", "May I show you how we handle that for other builders?"] } },
        { id: "jansen", name: "Jansen Logistiek", contact: "Peter Jansen",
          signal: { type: "Growth", text: "Second distribution centre announced", when: "3 days ago" },
          facts: { sector: { value: "Logistics", matches: ["logistics"] }, size: { value: "85 employees", matches: ["s50", "all"] }, region: { value: "Oosterhout", matches: ["nb", "nl"] } },
          draft: { subject: "Your second distribution centre", sent: "09:18", lines: ["Good morning Peter, great news about the second distribution centre.", "A step like that mostly grows the payroll and VAT work.", "Do you have half an hour next week to see what we could take on?"] } },
      ],
      week: { contacted: 11, replied: 4, booked: 2 },
      initial: { sector: "build", size: "s20", region: "nb", firm: "devries" },
    },
    invoicing: {
      labels: {
        example: "Example · fictional clients and amounts", hint: "Pick a client and a line, and follow the amount into the books.",
        client: "Client", follow: "Pick a line to follow",
        stations: { hours: "Hours", invoice: "Invoice", payment: "Payment", ledger: "Booking" },
        total: "Total", subtotal: "Subtotal", vat: "VAT 21%", sent: "Sent", due: "Due", paid: "Paid", open: "Not paid yet", overdue: "overdue",
        linkSent: "Sent with a Mollie payment link", contains: "Includes", ofWhich: "of which", matched: "Matched to {n}", booked: "Booked in {tool}",
        reminders: {
          title: "Reminders", toggle: "Reminders for {client}", on: "On", off: "Off", sent: "Sent", planned: "Planned", skipped: "Not needed",
          offNote: "Off for this client: no more reminders go out, for example because you agreed a payment plan.", stopped: "Stopped: paid on {date}.",
        },
      },
      tools: { hours: "Time tracking", books: "Moneybird", pay: "Mollie" },
      clients: [
        { id: "jansen", name: "Jansen Logistiek", period: "Approved · Oct 2026",
          lines: [
            { who: "Mark", what: "Annual accounts 2025", hours: "6.5 h", rate: "€95.00", amount: "€617.50" },
            { who: "Anne", what: "Payroll Oct", hours: "3.0 h", rate: "€95.00", amount: "€285.00" },
            { who: "Mark", what: "Management meeting", hours: "1.5 h", rate: "€95.00", amount: "€142.50" },
          ],
          hours_total: "11.0 h",
          invoice: { number: "2026-0142", sent: "2 Nov", due: "16 Nov", subtotal: "€1,045.00", vat: "€219.45", total: "€1,264.45" },
          payment: { state: "paid" as const, date: "18 Nov", method: "iDEAL via Mollie", from: "Jansen Logistiek B.V." },
          ledger: [{ account: "Revenue, services", amount: "€1,045.00", revenue: true }, { account: "VAT payable", amount: "€219.45", revenue: false }, { account: "Bank", amount: "+ €1,264.45", revenue: false }],
          reminders: [{ label: "Friendly reminder", when: "17 Nov · day 1", state: "sent" as const }, { label: "Second reminder", when: "24 Nov · day 8", state: "skipped" as const }, { label: "Final reminder", when: "1 Dec · day 15", state: "skipped" as const }] },
        { id: "devries", name: "De Vries Installatie", period: "Approved · Oct 2026",
          lines: [
            { who: "Sanne", what: "VAT return Q3", hours: "4.0 h", rate: "€95.00", amount: "€380.00" },
            { who: "Anne", what: "Payroll Oct", hours: "2.5 h", rate: "€95.00", amount: "€237.50" },
            { who: "Mark", what: "Investment advice", hours: "1.5 h", rate: "€95.00", amount: "€142.50" },
          ],
          hours_total: "8.0 h",
          invoice: { number: "2026-0141", sent: "2 Nov", due: "16 Nov", subtotal: "€760.00", vat: "€159.60", total: "€919.60" },
          payment: { state: "paid" as const, date: "9 Nov", method: "Bank transfer via Mollie", from: "De Vries Installatie B.V." },
          ledger: [{ account: "Revenue, services", amount: "€760.00", revenue: true }, { account: "VAT payable", amount: "€159.60", revenue: false }, { account: "Bank", amount: "+ €919.60", revenue: false }],
          reminders: [{ label: "Friendly reminder", when: "17 Nov · day 1", state: "skipped" as const }, { label: "Second reminder", when: "24 Nov · day 8", state: "skipped" as const }, { label: "Final reminder", when: "1 Dec · day 15", state: "skipped" as const }] },
        { id: "bakker", name: "Bakker Advocaten", period: "Approved · Oct 2026",
          lines: [
            { who: "Sanne", what: "Annual accounts 2025", hours: "5.0 h", rate: "€95.00", amount: "€475.00" },
            { who: "Mark", what: "Tax advice", hours: "2.0 h", rate: "€95.00", amount: "€190.00" },
            { who: "Anne", what: "Payroll Oct", hours: "2.0 h", rate: "€95.00", amount: "€190.00" },
          ],
          hours_total: "9.0 h",
          invoice: { number: "2026-0143", sent: "2 Nov", due: "16 Nov", subtotal: "€855.00", vat: "€179.55", total: "€1,034.55" },
          payment: { state: "open" as const, late: "9 days" },
          ledger: [{ account: "Revenue, services", amount: "€855.00", revenue: true }, { account: "VAT payable", amount: "€179.55", revenue: false }, { account: "Receivables · open", amount: "€1,034.55", revenue: false }],
          reminders: [{ label: "Friendly reminder", when: "17 Nov · day 1", state: "sent" as const }, { label: "Second reminder", when: "24 Nov · day 8", state: "sent" as const }, { label: "Final reminder", when: "1 Dec · day 15", state: "planned" as const }] },
      ],
      initial: { client: "jansen", line: 0 },
    },
    reporting: {
      labels: { example: "Example · fictional firm", hint: "Pick a figure to see where it comes from.", lineage: "Where it comes from", synced: "synced", formula: "Calculation", sources: "Sources", from: "from" },
      dashboard: { tool: "Power BI", title: "Van Dijk Accountancy · October" },
      sources: [
        { id: "exact", tool: "Exact Online", what: "Accounting" },
        { id: "hours", tool: "Time tracking", what: "Hours" },
        { id: "hubspot", tool: "HubSpot", what: "CRM" },
      ],
      kpis: [
        { id: "revenue", label: "Revenue October", value: "€ 84,200", note: "+6% on September", sources: [{ source: "exact", dataset: "Sales invoices, October", records: "214 lines", synced: "07:00:04" }], formula: "" },
        { id: "billable", label: "Billable", value: "71%", note: "Target 75%", sources: [{ source: "hours", dataset: "Hours, October", records: "1,214 h logged, 862 billable", synced: "07:00:06" }], formula: "862 h ÷ 1,214 h" },
        { id: "pipeline", label: "Pipeline", value: "€ 126,000", note: "4 open quotes", sources: [{ source: "hubspot", dataset: "Deals in stage Quote", records: "4 deals", synced: "07:00:07" }], formula: "" },
        { id: "rate", label: "Revenue per billable hour", value: "€ 98", note: "From two sources", sources: [
          { source: "exact", dataset: "Sales invoices, October", records: "€ 84,200", synced: "07:00:04" },
          { source: "hours", dataset: "Billable hours, October", records: "862 h", synced: "07:00:06" },
        ], formula: "€ 84,200 ÷ 862 h" },
      ],
      initial: "rate",
    },
  },
  caseStudy: {
    eyebrow: "Case study", client: "Energielabel Breda", title: "A website that earns its own label.", muted: "From 3 pages to 20+, live on 14 October 2026.",
    intro: "Energielabel Breda is a one-person business run by Jan-Willem Ooms: energy labels, building inspections and sustainability advice in Breda and the surrounding area.",
    facts: [["Client", "Energielabel Breda"], ["Owner", "Jan-Willem Ooms"], ["Service", "Brand & Digital Presence"], ["Live since", "14 October 2026"], ["Built with", "WordPress, Elementor Pro, Next.js prototype"]],
    video: "Old site and new site, side by side",
    problemTitle: ["The old site", "did not say what he does."],
    problem: [
      "Only three pages, built in a website builder and last updated in April 2026.",
      "The homepage was an ‘About us’ page, with no headline saying what he does, for whom, or where, and no call to action.",
      "Long, generic text and a stock photo unrelated to the service or to Breda.",
      "‘Services’ was three webshop tiles: no explanation, no building inspection, no price per home type.",
      "Little trust: no certifications, way of working, service area or FAQ, and a footer without company name or KvK number.",
      "Hardly findable: no pages per service or per town.",
    ],
    builtTitle: ["What we built.", "Designed first, then built."],
    built: [
      { title: "20+ pages", text: "Homepage, 8 service pages, 4 location pages (Breda, Etten-Leur, Oosterhout, Teteringen), prices, request page, about, contact, privacy and terms." },
      { title: "Smart request form", text: "On 15 pages. Fills in the address from postcode and house number (Dutch PDOK service), asks home type, service, preferred date and rush, and confirms by email." },
      { title: "‘Request now’ pop-up", text: "Quick requests, paid afterwards on invoice, replacing an online checkout." },
      { title: "Interactive house cross-section", text: "Shows what the advisor inspects, room by room." },
      { title: "Clear prices", text: "Per home type, with ‘price on request’ where there is no fixed price." },
      { title: "Motion videos", text: "A 32-second homepage overview, three 44-second explainers and a before/after case video." },
      { title: "Technical SEO", text: "RankMath, structured data and speed optimisation." },
    ],
    resultsTitle: ["The result,", "measured."],
    results: [
      { value: "3 → 20+", label: "Pages", note: "Old sitemap (April 2026) vs new site (October 2026)" },
      { value: "92", label: "Performance, mobile", note: "Google PageSpeed Insights, homepage, 15 Oct 2026" },
      { value: "100", label: "Performance, desktop", note: "Google PageSpeed Insights, homepage, 15 Oct 2026" },
      { value: "100", label: "SEO", note: "Google PageSpeed Insights, homepage, 15 Oct 2026" },
      { value: "96", label: "Accessibility", note: "Google PageSpeed Insights, homepage, 15 Oct 2026" },
      { value: "100", label: "Best practices", note: "Google PageSpeed Insights, homepage, 15 Oct 2026" },
    ],
    lcp: { value: "±6.6 s → 2.2–3.4 s", label: "Largest Contentful Paint, mobile", note: "Lab measurement (local Lighthouse) during the speed fix after launch, 14–15 Oct 2026" },
    behindTitle: ["Behind the scenes.", "Launch is where the work continues."],
    behind: [
      { title: "Speed fix after launch", text: "The first scan after launch scored 44 on performance (14 Oct). Fixing how the Elementor styles loaded brought the homepage to 92 on mobile and 100 on desktop the next day." },
      { title: "Request emails, fixed", text: "Requests were saved, but confirmation emails failed because they were sent from a mailbox that didn’t exist. We found and fixed it, and rebuilt both emails in a fixed, clear order (17 Oct 2026)." },
    ],
    nextTitle: "What we measure next",
    next: "Business results take time. After two to three months we measure requests per month and clicks and impressions in Google Search Console. Those numbers will be added here.",
    visit: "Visit energielabel-breda.nl",
    noOldScore: "There was no PageSpeed measurement of the old site, so this case does not show a before/after score.",
    findings: { label: "Findings · old site", meta: "Website builder · 3 pages · last updated April 2026" },
    pagesTitle: ["The new site,", "page by page."],
    pagesBody: "Real pages of energielabel-breda.nl, as they are live today. Pick a page and a screen.",
    timeline: {
      live: { date: "14 Oct 2026", title: "Live", text: "The new site goes live: from 3 pages to 20+." },
      dates: ["14–15 Oct 2026", "17 Oct 2026"],
      speed: { value: "44 → 92", label: "Performance, mobile" },
      later: "After 2–3 months",
    },
    /** A client quote, shown only once it exists (null hides the slot). */
    quote: null as { text: string; name: string; role: string } | null,
  },
  about: {
    eyebrow: "About", title: "Business results first.", muted: "Then the technology.",
    intro: "I’m Nick Smid, founder of Assembly Engine. I build systems that create results for professional services firms: from the brand and website that form your foundation to the automations that run your admin.",
    storyTitle: ["Why Assembly Engine", "exists."],
    story: [
      "A lot of people are talking about AI right now. Too often it is AI for the sake of AI: impressive demos, general advice, and very little that actually changes how a firm runs on Monday morning.",
      "I believe business results need to come first. That means starting with the problem: where does your team lose time, where do clients drop off, which numbers do you not trust?",
      "Then we pick the right tool for the job. Sometimes that is design, sometimes code or automation, and sometimes AI. And sometimes the best answer is no AI at all.",
    ],
    valuesTitle: ["How I work.", "Applied, not conceptual."],
    values: [
      { title: "Problem before tool", text: "Every project starts with what needs to change, not with the technology." },
      { title: "Foundation first", text: "A strong brand and website make every later system work better." },
      { title: "Built into your business", text: "Systems that fit your tools and your team, not a demo on the side." },
      { title: "Honest about results", text: "Real numbers when we have them, and clear about when we don’t yet." },
    ],
    where: "Based in the Netherlands. Working online most of the time, and happy to visit you anywhere in the country.",
    order: { label: "Problem first, then the tool", problem: "The problem", questions: ["Where does your team lose time?", "Where do clients drop off?", "Which numbers do you not trust?"], tool: "The tool", tools: ["Design", "Code", "Automation", "AI"], none: "And sometimes: no AI at all" },
    photoAlt: "Nick Smid on a bridge over an Amsterdam canal",
    cta: "Get to know each other",
  },
  contact: {
    eyebrow: "Contact", title: "Book a free audit.", muted: "Tell us where it hurts.",
    sub: "A short form, then pick a time if you want to talk right away. We reply within one working day.",
    steps: ["Your firm", "How it feels", "Talk"],
    fields: { name: "Your name", firm: "Firm", email: "Work email", phone: "Phone (optional)", services: "What are you interested in?", message: "Anything you want to ask or tell us? (optional)", messagePh: "For example: we spend every Monday chasing documents…" },
    feelTitle: "How do you feel about these today?", feelSub: "Optional. Slide to answer, or leave it untouched.",
    feel: [
      { key: "website", label: "Your website" },
      { key: "acquisition", label: "Finding new clients" },
      { key: "admin", label: "Recurring admin and documents" },
      { key: "invoicing", label: "Invoice processing" },
      { key: "reporting", label: "Knowing your numbers" },
    ],
    scale: ["Not good", "Could be better", "Okay", "Good", "Great"],
    untouched: "Not answered",
    next: "Next", back: "Back", submit: "Send", sending: "Sending…",
    errors: { name: "Please enter your name.", email: "Please enter a valid email address.", services: "Choose at least one topic." },
    sentTitle: "Thanks, we received it.", sentSub: "We’ll reply within one working day. Want to talk sooner? Pick a time below.",
    sentFailed: "Your message could not be sent right now. Please email nick@assembly-engine.com directly.",
    devNote: "Development mode: the email service is not connected yet, so this message was logged instead of sent.",
    calTitle: "Pick a time for a 30-minute call", calOpen: "Open the calendar in a new tab",
    direct: "Prefer email?", privacy: "We only use your details to reply to you.",
    stepOf: "Step {n} of {total}", errorSummary: "Something is missing. Please check the marked fields.", reset: "Clear",
    receipt: "What you sent us", calLoading: "Loading calendar…", emailLabel: "Email",
    asideTitle: "What happens next", aside: ["We read your answers and look at your website.", "You get a reply within one working day.", "In a 30-minute call we go through where automation will help most."],
  },
  blogPage: {
    eyebrow: "Blog", title: "Learn as you grow.", muted: "Practical automation ideas for firms that run on deadlines.",
    plannedTitle: "In preparation", plannedNote: "These articles are coming soon. Don’t want to wait? We’re happy to answer your question in person.",
    soonTitle: "We’re writing this article now.", soonAbout: "What it covers", ask: "Ask your question directly",
    all: "All", back: "All posts", placeholder: "Placeholder article", placeholderNote: "This article is a placeholder. The real text will be published soon.", related: "More to read", minRead: "min read", by: "By",
    blocks: {
      example: "Example", source: "Source",
      callout: { note: "Note", tip: "Tip", warning: "Warning", check: "Still to verify" },
      checklist: { progress: "{done} of {total} done", reset: "Clear ticks", stored: "Your ticks are saved in this browser only." },
      beforeAfter: { before: "Today", after: "Automated", automate: "Automate", keep: "Keep with a person", human: "Stays with a person" },
      flow: { replay: "Play again", human: "Person", steps: "Steps in this workflow" },
      timeline: { expected: "Expected" },
      table: { scroll: "Swipe sideways to see every column." },
      mock: { variants: "Tone of the email", from: "From", to: "To", subject: "Subject", received: "received", missing: "missing" },
      toc: "In this article", tocToggle: "Contents", progress: "Reading progress", auditLink: "What the audit covers",
    },
  },
  posts: [
    { slug: "what-a-free-automation-audit-looks-at", tag: "Process", read: 6, art: "well", date: "Coming soon", index: false, title: "What a free automation audit actually looks at", excerpt: "The questions we ask in the call, and what you keep afterwards if you decide not to hire us." },
    { slug: "five-admin-tasks-to-automate-first", tag: "Guide", read: 7, art: "orbit", date: "25 Oct 2026", index: true, title: "Five admin tasks every accounting firm can automate first", excerpt: "Most quick wins sit in the small jobs between the systems you already have. These are the five we look at first, and how to spot them in your own week." },
    { slug: "e-invoicing-mandatory-2030", tag: "Finance", read: 7, art: "stack", date: "25 Oct 2026", index: true, title: "E-invoicing is expected to become mandatory in 2030. What can you do now?", excerpt: "The expected dates, what changes in VAT reporting, and a few steps that pay off now, whatever the final law looks like." },
    { slug: "build-on-the-software-you-already-use", tag: "Tools", read: 6, art: "grid", date: "25 Oct 2026", index: true, title: "Why we build on the software you already use", excerpt: "Each new tool is another login and another place where your data lives. Connecting what you already pay for is usually cheaper, and your team has nothing new to learn." },
    { slug: "client-intake-for-law-firms", tag: "Legal", read: 8, art: "waves", date: "25 Oct 2026", index: true, title: "Client intake for law firms, without the chasing", excerpt: "You can't start until the ID, the UBO extract and the signed engagement letter are in. Software can do the chasing. The advocaat still makes the call." },
    { slug: "automatic-payment-reminders", tag: "Finance", read: 8, art: "ripple", date: "25 Oct 2026", index: true, title: "Automatic payment reminders, without souring the relationship", excerpt: "Nine in ten Dutch SMBs deal with late payers (Exact, 2025). A fixed reminder schedule with a payment link, written in your own tone, solves most of it with the software you already have." },
    { slug: "what-not-to-automate", tag: "Guide", read: 7, art: "fork", date: "25 Oct 2026", index: true, title: "What not to automate, and where AI still needs a person", excerpt: "Collecting documents and sending reminders are good candidates. A risk assessment or a difficult client conversation isn't, and client files don't belong in a free chatbot." },
    { slug: "n8n-vs-make-vs-zapier-for-dutch-firms", tag: "Tools", read: 9, art: "trio", date: "25 Oct 2026", index: true, title: "n8n, Make or Zapier: which fits a firm that handles client data?", excerpt: "For an accounting or law firm it mostly comes down to where your client data is stored and who keeps the workflows running. We build on n8n and explain why, including when it's the wrong pick." },
    { slug: "engagement-letters-and-conflict-checks-for-law-firms", tag: "Legal", read: 8, art: "lens", date: "25 Oct 2026", index: true, title: "After intake: engagement letters and conflict checks without copy-paste", excerpt: "Every new matter needs a written engagement letter and a conflict check across the whole firm. A template and one search make both consistent. The advocaat still decides." },
  ] as { slug: string; tag: string; read: number; art: Art; date: string; index: boolean; title: string; excerpt: string }[],
};

export type Dict = typeof en;
