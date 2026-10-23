import type { SceneData } from "@/components/ui/scenes";
import type { Moment } from "@/components/blocks/services/moments/schema";

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
  usps: [{ title: string; text: string }, { title: string; text: string }];
  gridTitle: [string, string];
  grid: { title: string; text: string }[];
  stat: { title: [string, string]; value: string; label: string };
  watchTitle: [string, string];
  principlesTitle: [string, string];
  principles: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  /** `home` = the homepage explorer moment (components/blocks/services/moments); service pages use the rest. */
  scenes: { hero: SceneData; steps: [SceneData, SceneData, SceneData]; watch: SceneData; home: Moment };
};

/** One example run in "How it runs" on the home page (fictional data). Shape: components/blocks/how-it-runs/schema.ts. */
export type HomeRun = {
  tab: string;
  duration: number;
  start: { label: string; title: string; detail: string; via: string; time: string };
  rows: { at: number; label: string; time: string; tool: string; text: string; person: { name: string; waiting: string; approve: string; approved: string } | null }[];
  done: string;
};

const flowStates: [string, string, string] = ["Waiting", "Running", "Done"];

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
    usps: [
      { title: "An identity that looks established.", text: "Logo, palette, and typography come together as one brand guide that you own and can reuse everywhere." },
      { title: "A website that books the call.", text: "Design comes first, then code, so visitors land, enquire, and arrive in your CRM ready to book." },
    ],
    gridTitle: ["Everything a firm needs", "to look established online."],
    grid: [
      { title: "Logo & identity", text: "A mark and wordmark that work from favicon to signboard." },
      { title: "Brand guide", text: "Colours, type and rules in one document you own." },
      { title: "Website design", text: "Every page designed and approved before a line of code." },
      { title: "Website build", text: "Fast, accessible and easy for you to update." },
      { title: "Enquiry to CRM", text: "Every form lands in your CRM with source and context." },
      { title: "Online booking", text: "Visitors pick a time in your calendar themselves." },
      { title: "Google Business Profile", text: "Set up and complete, so you show up locally." },
      { title: "Technical SEO", text: "Structure, metadata and speed done properly." },
      { title: "Copywriting", text: "Clear pages that say what you do, for whom, and where." },
      { title: "Analytics", text: "Know which pages bring enquiries, privacy-friendly." },
    ],
    stat: { title: ["From audit to launch,", "in one clear plan."], value: "4 wk", label: "Typical time from audit to a live website" },
    watchTitle: ["Watch the enquiries come in.", "Every lead lands where you work."],
    principlesTitle: ["Built for the long run.", "Not just for launch day."],
    principles: [
      { title: "You own everything.", text: "Domain, files, accounts and brand guide are yours. No lock-in." },
      { title: "Built to be found.", text: "Local search and technical SEO are part of the build, not an extra." },
      { title: "Measured, not guessed.", text: "Speed, accessibility and enquiries are checked before and after launch." },
    ],
    faq: [
      { q: "Do I need to have a logo already?", a: "No. We can start from scratch or refine what you have. The audit decides which makes more sense." },
      { q: "Which platform do you build on?", a: "We design first and pick the platform that fits how you want to work: a coded site for speed, or WordPress if you want to edit everything yourself." },
      { q: "Can you work with my existing website?", a: "Yes. Sometimes a redesign and better structure is enough. We will tell you honestly after the audit." },
      { q: "What do I need to provide?", a: "Access to your current accounts, an hour for the kickoff and feedback at the agreed moments. We handle the rest." },
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
      hero: { kind: "flow", title: "vandijk-accountancy.nl · enquiry", states: flowStates, nodes: [
        { label: "Visitor on website", sub: "Services · Bookkeeping", icon: "globe" },
        { label: "Enquiry form sent", sub: "Sanne de Vries", icon: "form" },
        { label: "Lead in CRM", sub: "Owner: P. van Dijk", icon: "user" },
        { label: "Intro call booked", sub: "Thu 10:30 · 30 min", icon: "calendar" },
      ], log: ["Enquiry received from the contact page", "Lead created with source 'website'", "Confirmation sent to Sanne", "Intro call added to the calendar"] },
      steps: [
        { kind: "checklist", title: "Audit · Van Dijk Accountancy", heading: "Brand & website audit", sub: "What we review before designing anything", done: "Audit complete", progress: "reviewed", items: [
          { label: "Brand and logo", meta: "Dated, no guide" }, { label: "Website structure", meta: "3 pages" }, { label: "Speed and accessibility", meta: "Measured" }, { label: "Google Business Profile", meta: "Incomplete" }, { label: "Competitors in the region", meta: "5 compared" },
        ] },
        { kind: "brand", title: "Brand guide v1.0", mono: "vD", name: "Van Dijk", tagline: "Accountancy · Utrecht", colors: [["Teal", "#0F5C63"], ["Mint", "#E3F1F0"], ["Amber", "#E0A526"], ["Ink", "#10252A"]], display: "Literata · headlines", body: "Source Sans · body text", specimen: "Calm books, clear advice.", labels: { logo: "Logo", palette: "Palette", type: "Type" } },
        { kind: "calendar", title: "Bookings · intro calls", week: "Week 42 · 13–17 Oct", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], times: ["09:00", "10:30", "13:00", "15:00"], busy: [[0, 0, "Client"], [1, 2, "Review"], [2, 1, "Client"], [4, 3, "Team"], [3, 2, "Client"]], booked: { day: 3, slot: 1, label: "Intro · Sanne", who: "Sanne de Vries" }, confirm: "Intro call booked · confirmation sent to Sanne" },
      ],
      watch: { kind: "pipeline", title: "CRM · website enquiries", columns: ["Contact", "Firm", "Source", "Status"], rows: [
        { cells: ["Sanne de Vries", "De Vries Installatie", "Contact form"], avatar: "Sanne de Vries", states: [{ l: "New", t: "blue" }, { l: "Contacted", t: "warn" }, { l: "Call booked", t: "ok" }] },
        { cells: ["Mark Jansen", "Jansen Logistiek", "Google profile"], avatar: "Mark Jansen", states: [{ l: "New", t: "blue" }, { l: "Call booked", t: "ok" }] },
        { cells: ["Eva Bakker", "Bakker Advocaten", "Website"], avatar: "Eva Bakker", states: [{ l: "New", t: "blue" }, { l: "Contacted", t: "warn" }] },
        { cells: ["Tom de Wit", "De Wit Bouw", "Contact form"], avatar: "Tom de Wit", states: [{ l: "New", t: "blue" }, { l: "Contacted", t: "warn" }, { l: "Call booked", t: "ok" }] },
      ] },
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
    usps: [
      { title: "Find the buyers who are looking.", text: "Agents watch for hiring, growth and news, then score every firm against your ideal client." },
      { title: "Free your team to sell.", text: "Research and busywork are handled. Your people only step in when a buyer replies." },
    ],
    gridTitle: ["The work behind a full pipeline.", "Done every day, not when there is time."],
    grid: [
      { title: "Ideal client profile", text: "Who you want, written down and scored." },
      { title: "Signal tracking", text: "Hiring, growth and news, checked daily." },
      { title: "Firm research", text: "Context on every firm before anyone reaches out." },
      { title: "Personal first message", text: "Drafted per firm, approved by you." },
      { title: "Follow-ups", text: "Polite reminders that stop when someone replies." },
      { title: "CRM updates", text: "Every touchpoint logged without typing." },
      { title: "Meeting booking", text: "Interested buyers pick a time themselves." },
      { title: "Weekly pipeline summary", text: "What moved, what stalled, what is next." },
    ],
    stat: { title: ["Outreach that sounds like you,", "because you approve it."], value: "100%", label: "Of first messages approved by a person before sending" },
    watchTitle: ["Watch your pipeline move.", "From signal to booked meeting."],
    principlesTitle: ["Personal, at scale.", "Never spammy."],
    principles: [
      { title: "A person approves.", text: "Nothing goes out in your name without your yes." },
      { title: "Shows its reasoning.", text: "Every score comes with the signals behind it." },
      { title: "Respects the rules.", text: "GDPR-aware lists and an easy opt-out in every message." },
    ],
    faq: [
      { q: "Is this cold email?", a: "It is targeted, personal outreach to a short list of firms that fit and show a reason to talk. Volume is low on purpose." },
      { q: "Which CRM do I need?", a: "We work with the CRM you have, such as HubSpot or Pipedrive, or set up a simple one if you have none." },
      { q: "Do agents send messages on their own?", a: "Only if you want them to. By default every first message waits for your approval." },
      { q: "How quickly will I see meetings?", a: "That depends on your market and offer. We agree on realistic goals during the audit and report on them weekly." },
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
      hero: { kind: "flow", title: "Acquisition run · today", states: flowStates, nodes: [
        { label: "Signal found", sub: "Jansen Logistiek is hiring", icon: "signal" },
        { label: "Scored vs profile", sub: "Fit 86 / 100", icon: "score" },
        { label: "Message drafted", sub: "Waiting for approval", icon: "mail" },
        { label: "Meeting booked", sub: "Tue 14:00 · Mark", icon: "calendar" },
      ], log: ["New vacancy: financial controller", "Fit score 86 · size, region and sector match", "First message approved by Pieter", "Mark replied and booked a call"] },
      steps: [
        { kind: "checklist", title: "Ideal client profile", heading: "Who we look for", sub: "Agreed with you in the kickoff", done: "Profile ready", progress: "defined", items: [
          { label: "Sector: logistics, construction, retail", meta: "3 sectors" }, { label: "Size: 10–80 employees", meta: "Range" }, { label: "Region: Utrecht and surroundings", meta: "40 km" }, { label: "Signals: hiring finance staff", meta: "Trigger" }, { label: "Signals: new location or funding", meta: "Trigger" },
        ] },
        { kind: "pipeline", title: "Signals · this week", columns: ["Firm", "Signal", "Fit", "Status"], rows: [
          { cells: ["Jansen Logistiek", "Hiring controller", "86"], avatar: "Jansen Logistiek", states: [{ l: "Scoring", t: "neutral" }, { l: "Strong fit", t: "ok" }] },
          { cells: ["De Wit Bouw", "Second location", "78"], avatar: "De Wit Bouw", states: [{ l: "Scoring", t: "neutral" }, { l: "Good fit", t: "blue" }] },
          { cells: ["Smit Retail", "New director", "41"], avatar: "Smit Retail", states: [{ l: "Scoring", t: "neutral" }, { l: "Skip", t: "warn" }] },
          { cells: ["Visser Transport", "Hiring bookkeeper", "81"], avatar: "Visser Transport", states: [{ l: "Scoring", t: "neutral" }, { l: "Strong fit", t: "ok" }] },
        ] },
        { kind: "message", title: "Outreach · draft for approval", fromLabel: "From", from: "Pieter van Dijk", toLabel: "To", to: "Mark Jansen · Jansen Logistiek", subject: "Your new controller role", body: "Hi Mark,\n\nI saw Jansen Logistiek is hiring a financial controller. Congratulations on the growth.\n\nWe help logistics firms keep their books current while they scale. Worth a short call?", button: "Approve & send", sent: "Sent", reply: { from: "Mark Jansen", text: "Good timing. Tuesday afternoon works for me." } },
      ],
      watch: { kind: "pipeline", title: "Pipeline · Van Dijk Accountancy", columns: ["Firm", "Owner", "Next step", "Stage"], rows: [
        { cells: ["Jansen Logistiek", "Pieter", "Intro call Tue"], avatar: "Jansen Logistiek", states: [{ l: "Contacted", t: "neutral" }, { l: "Replied", t: "blue" }, { l: "Meeting", t: "ok" }] },
        { cells: ["Visser Transport", "Anne", "Follow-up Fri"], avatar: "Visser Transport", states: [{ l: "Contacted", t: "neutral" }, { l: "Follow-up", t: "warn" }] },
        { cells: ["De Wit Bouw", "Pieter", "Send proposal"], avatar: "De Wit Bouw", states: [{ l: "Meeting", t: "blue" }, { l: "Proposal", t: "ok" }] },
        { cells: ["Bakker Advocaten", "Jos", "Approve message"], avatar: "Bakker Advocaten", states: [{ l: "Draft", t: "neutral" }, { l: "Contacted", t: "blue" }] },
      ] },
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
    usps: [
      { title: "Never chase a document again.", text: "Clients get one clear checklist. Reminders go out on their own, and every upload lands in the right folder." },
      { title: "Deadlines handle themselves.", text: "Every task gets an owner and a date. The workflow creates, assigns and reminds, so nothing slips." },
    ],
    gridTitle: ["The admin between the real work.", "Running on its own."],
    grid: [
      { title: "Client onboarding", text: "Engagement letter, ID check and intake in one flow." },
      { title: "Document requests", text: "A checklist per client and period." },
      { title: "Automatic reminders", text: "Friendly first, firmer later, stopped when done." },
      { title: "Filing and naming", text: "Uploads land in the right folder with clear names." },
      { title: "Deadline tracking", text: "Every filing date visible, with owner and status." },
      { title: "Approvals", text: "Sensitive steps wait for a person. Every decision is logged." },
      { title: "Task creation", text: "The next task is created when the last one is done." },
      { title: "Status overview", text: "One view of every client and what is waiting." },
    ],
    stat: { title: ["A human on every", "sensitive step."], value: "0", label: "Client documents filed by hand in the example workflow" },
    watchTitle: ["Watch the workflow run.", "Every client, every period."],
    principlesTitle: ["Automation you can trust.", "Because you can see it."],
    principles: [
      { title: "Logged, step by step.", text: "See what happened, when, and who approved it." },
      { title: "In your own tools.", text: "Built around your current software. No migration." },
      { title: "Easy to change.", text: "New step or new rule? We adjust the workflow, not your team." },
    ],
    faq: [
      { q: "Which processes are a good start?", a: "Repetitive work with clear steps: onboarding, document collection, period closing and deadline tracking." },
      { q: "Do we need new software?", a: "Usually not. We connect what you already use, such as your client portal, email, file storage and practice software." },
      { q: "What about client data?", a: "Access is limited to what each step needs, data stays in your systems where possible, and every action is logged." },
      { q: "Who maintains it?", a: "We do. We monitor the workflows and adjust them when your process changes." },
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
      hero: { kind: "flow", title: "Workflow · new client", states: flowStates, nodes: [
        { label: "Client signed", sub: "De Vries Installatie", icon: "user" },
        { label: "Checklist sent", sub: "6 documents", icon: "task" },
        { label: "Documents filed", sub: "/2026/Q3/De Vries", icon: "folder" },
        { label: "Task to accountant", sub: "VAT return · 31 Oct", icon: "clock" },
      ], log: ["Engagement letter signed", "Document checklist sent to Sanne", "4 of 6 uploads filed and named", "VAT task assigned to Anne"] },
      steps: [
        { kind: "message", title: "Reminder · sent automatically", fromLabel: "From", from: "Van Dijk Accountancy", toLabel: "To", to: "Sanne de Vries", subject: "Two documents still missing for Q3", body: "Dear Sanne,\n\nThank you for the documents so far. To finish your Q3 VAT return we still need:\n\n· Bank statement September\n· Receipts for the new van\n\nYou can upload them via your personal link.", button: "Send reminder", sent: "Sent automatically" },
        { kind: "checklist", title: "Client portal · De Vries Installatie", heading: "Documents for Q3 2026", sub: "Requested on 1 October", done: "All received", progress: "received", items: [
          { label: "Bank statements July–September", meta: "PDF · 3 files" }, { label: "Purchase invoices", meta: "48 files" }, { label: "Sales invoices", meta: "Synced" }, { label: "Receipts for the new van", meta: "Photo" }, { label: "Mileage log", meta: "Excel" }, { label: "Signed engagement letter", meta: "PDF" },
        ] },
        { kind: "pipeline", title: "Deadlines · October", columns: ["Client", "Task", "Owner", "Status"], rows: [
          { cells: ["De Vries Installatie", "VAT return Q3", "Anne"], avatar: "De Vries Installatie", states: [{ l: "Waiting docs", t: "warn" }, { l: "In progress", t: "blue" }, { l: "Filed", t: "ok" }] },
          { cells: ["Jansen Logistiek", "Payroll October", "Jos"], avatar: "Jansen Logistiek", states: [{ l: "Planned", t: "neutral" }, { l: "In progress", t: "blue" }] },
          { cells: ["Bakker Advocaten", "Annual accounts", "Pieter"], avatar: "Bakker Advocaten", states: [{ l: "Review", t: "warn" }, { l: "Approved", t: "ok" }] },
          { cells: ["De Wit Bouw", "VAT return Q3", "Anne"], avatar: "De Wit Bouw", states: [{ l: "Planned", t: "neutral" }, { l: "Filed", t: "ok" }] },
        ] },
      ],
      watch: { kind: "pipeline", title: "Clients · period Q3", columns: ["Client", "Documents", "Next step", "Status"], rows: [
        { cells: ["De Vries Installatie", "6 / 6", "Prepare VAT"], avatar: "De Vries Installatie", states: [{ l: "Collecting", t: "warn" }, { l: "Ready", t: "blue" }, { l: "Done", t: "ok" }] },
        { cells: ["Jansen Logistiek", "5 / 6", "Reminder sent"], avatar: "Jansen Logistiek", states: [{ l: "Collecting", t: "warn" }, { l: "Reminded", t: "warn" }] },
        { cells: ["Bakker Advocaten", "4 / 4", "Partner review"], avatar: "Bakker Advocaten", states: [{ l: "Ready", t: "blue" }, { l: "Approval", t: "warn" }, { l: "Done", t: "ok" }] },
        { cells: ["De Wit Bouw", "3 / 6", "Reminder Thu"], avatar: "De Wit Bouw", states: [{ l: "Collecting", t: "warn" }, { l: "Reminded", t: "warn" }] },
      ] },
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
    usps: [
      { title: "Invoices write themselves.", text: "Every invoice starts from the work you did. Hours, services and prices flow in, so billing takes a click." },
      { title: "Late payments chase themselves.", text: "Reminders go out on a schedule. Friendly first, firmer later, and they stop when the payment lands." },
    ],
    gridTitle: ["Billing without the busywork.", "From hours to booked payment."],
    grid: [
      { title: "Hours to invoice", text: "Approved time and fees collected per client." },
      { title: "Invoice creation", text: "Built from your rates, in your house style." },
      { title: "Payment links", text: "iDEAL, card or transfer in one click." },
      { title: "Reminder schedule", text: "Friendly, then firmer, stopped on payment." },
      { title: "Bank matching", text: "Payments matched to the right invoice." },
      { title: "Bookkeeping", text: "Booked in your accounting software." },
      { title: "Credit notes", text: "Corrections handled with an approval step." },
      { title: "Cash overview", text: "What is open, overdue and expected." },
    ],
    stat: { title: ["Every euro matched,", "nothing retyped."], value: "0", label: "Amounts typed by hand in the example flow" },
    watchTitle: ["Watch invoices get paid.", "And booked, without a hand on the keyboard."],
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
      hero: { kind: "flow", title: "Billing run · October", states: flowStates, nodes: [
        { label: "Hours approved", sub: "De Vries · 8 h", icon: "clock" },
        { label: "Invoice created", sub: "2026-014 · € 1.052,70", icon: "file" },
        { label: "Sent with link", sub: "iDEAL · card", icon: "mail" },
        { label: "Paid and booked", sub: "Matched · closed", icon: "euro" },
      ], log: ["8 approved hours collected for De Vries", "Invoice 2026-014 created from rates", "Sent with payment link to Sanne", "Payment received and booked"] },
      steps: [
        { kind: "pipeline", title: "Work to invoice · October", columns: ["Client", "Hours", "Fixed fees", "Status"], rows: [
          { cells: ["De Vries Installatie", "8 h", "€ 180"], avatar: "De Vries Installatie", states: [{ l: "Collecting", t: "neutral" }, { l: "Approved", t: "blue" }, { l: "Invoiced", t: "ok" }] },
          { cells: ["Jansen Logistiek", "14 h", "€ 450"], avatar: "Jansen Logistiek", states: [{ l: "Collecting", t: "neutral" }, { l: "Approved", t: "blue" }] },
          { cells: ["Bakker Advocaten", "5 h", "—"], avatar: "Bakker Advocaten", states: [{ l: "Review", t: "warn" }, { l: "Approved", t: "blue" }] },
          { cells: ["De Wit Bouw", "11 h", "€ 180"], avatar: "De Wit Bouw", states: [{ l: "Collecting", t: "neutral" }, { l: "Invoiced", t: "ok" }] },
        ] },
        { kind: "document", title: "Invoice 2026-014", firm: "Van Dijk Accountancy", number: "2026-014", date: "12 Oct 2026", client: "De Vries Installatie · Utrecht", head: ["Description", "Qty", "Amount"], lines: [["Bookkeeping, October", "6 h", "€ 450,00"], ["VAT return, Q3", "fixed", "€ 180,00"], ["Advisory call", "2 h", "€ 240,00"]], sub: ["Subtotal", "€ 870,00"], vat: ["VAT 21%", "€ 182,70"], total: ["Total", "€ 1.052,70"], states: [{ l: "Draft", t: "neutral" }, { l: "Sent", t: "blue" }, { l: "Paid", t: "ok" }] },
        { kind: "message", title: "Payment reminder · day 7", fromLabel: "From", from: "Van Dijk Accountancy", toLabel: "To", to: "Mark Jansen · Jansen Logistiek", subject: "Friendly reminder: invoice 2026-011", body: "Dear Mark,\n\nA quick reminder that invoice 2026-011 (€ 1.210,00) is still open. You can pay in one click via the link below.\n\nAlready paid? Then please ignore this message.", button: "Send reminder", sent: "Sent · stops on payment" },
      ],
      watch: { kind: "pipeline", title: "Invoices · October", columns: ["Invoice", "Client", "Amount", "Status"], rows: [
        { cells: ["2026-014", "De Vries Installatie", "€ 1.052,70"], states: [{ l: "Sent", t: "blue" }, { l: "Viewed", t: "blue" }, { l: "Paid", t: "ok" }] },
        { cells: ["2026-011", "Jansen Logistiek", "€ 1.210,00"], states: [{ l: "Overdue", t: "warn" }, { l: "Reminded", t: "warn" }, { l: "Paid", t: "ok" }] },
        { cells: ["2026-015", "Bakker Advocaten", "€ 605,00"], states: [{ l: "Draft", t: "neutral" }, { l: "Sent", t: "blue" }] },
        { cells: ["2026-016", "De Wit Bouw", "€ 2.178,00"], states: [{ l: "Sent", t: "blue" }, { l: "Paid", t: "ok" }] },
      ] },
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
    usps: [
      { title: "Numbers you can trust.", text: "One dashboard, built on your real data. Invoices, hours and pipeline sit side by side." },
      { title: "Insight without asking.", text: "A short summary lands in your inbox every Monday, with what changed and what needs attention." },
    ],
    gridTitle: ["The numbers a partner meeting needs.", "Ready before Monday."],
    grid: [
      { title: "Revenue and margin", text: "Per month, per client, per service." },
      { title: "Hours and utilisation", text: "Billable time per person and team." },
      { title: "Outstanding invoices", text: "What is open, overdue and expected." },
      { title: "Pipeline", text: "Deals per stage and expected value." },
      { title: "Daily refresh", text: "Synced every morning before work starts." },
      { title: "Weekly digest", text: "What changed, in plain language." },
      { title: "Alerts", text: "A message the moment a number crosses a line." },
      { title: "Targets", text: "Your goals next to the actual numbers." },
    ],
    stat: { title: ["Refreshed before", "your first coffee."], value: "07:00", label: "Daily refresh time in the example setup" },
    watchTitle: ["Watch the numbers move.", "And hear about it the moment they do."],
    principlesTitle: ["Clear numbers.", "Clear decisions."],
    principles: [
      { title: "One source of truth.", text: "Built on your systems, not on spreadsheets someone forgot to update." },
      { title: "Plain language.", text: "Every dashboard comes with a short explanation of what it means." },
      { title: "Yours to keep.", text: "Dashboards live in your own account, for example in Power BI." },
    ],
    faq: [
      { q: "Which tools do you use for dashboards?", a: "Usually Power BI or Looker Studio, depending on what you already have and who needs access." },
      { q: "Where does the data come from?", a: "From your own systems: accounting, time tracking, CRM and payments. We connect them once and sync daily." },
      { q: "Can I get alerts instead of dashboards?", a: "Yes. Many partners prefer a weekly email and an alert when something needs attention." },
      { q: "How accurate are the numbers?", a: "As accurate as your source data. We check them against your books before go-live." },
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
          { tool: "Toggl Track", what: "Hours", rows: [["Billable", "71%"], ["Logged", "1,214 h"]] },
          { tool: "HubSpot", what: "Pipeline", rows: [["Open quotes", "€ 126,000"], ["New deals", "4"]] },
        ],
        dashboard: {
          tool: "Power BI", title: "Van Dijk Accountancy · October",
          kpis: [{ label: "Revenue", value: "€ 84,200", note: "+6% on September" }, { label: "Billable", value: "71%", note: "target 75%" }, { label: "Pipeline", value: "€ 126,000", note: "4 open quotes" }],
          bars: [58, 64, 61, 70, 74, 82], bars_label: "Revenue, last 6 weeks",
        },
        email: { tool: "Microsoft 365", from: "Weekly report", time: "Mon 07:00", subject: "Week 43 summary", lines: ["Revenue in October: € 84,200, 6% above September.", "Billable hours at 71%, target 75%.", "4 quotes open in HubSpot, € 126,000 in total."] },
      },
      hero: { kind: "flow", title: "Reporting run · Monday 07:00", states: flowStates, nodes: [
        { label: "Schedule", sub: "Every weekday · 07:00", icon: "clock" },
        { label: "Sources synced", sub: "Invoices · hours · CRM", icon: "sync" },
        { label: "Dashboard refreshed", sub: "Firm overview", icon: "chart" },
        { label: "Digest sent", sub: "3 partners", icon: "mail" },
      ], log: ["Invoices synced from accounting", "Hours synced from time tracking", "Dashboard refreshed", "Weekly summary sent to partners"] },
      steps: [
        { kind: "checklist", title: "Data sources", heading: "Synced this morning", sub: "Every weekday at 07:00", done: "All sources synced", progress: "synced", items: [
          { label: "Accounting · invoices", meta: "Moneybird" }, { label: "Time tracking · hours", meta: "Daily" }, { label: "CRM · pipeline", meta: "HubSpot" }, { label: "Payments", meta: "Mollie" },
        ] },
        { kind: "chart", title: "Firm overview · October", heading: "Revenue vs target", kpis: [{ label: "Revenue", value: "€ 48.200", delta: "+12% vs Sep" }, { label: "Billable hours", value: "312", delta: "+6% vs Sep" }, { label: "Outstanding", value: "€ 9.800", delta: "−18% vs Sep" }], series: [31, 33, 36, 35, 39, 41, 40, 44, 43, 48.2], target: [32, 34, 36, 38, 40, 42, 44, 45, 46, 47], x: ["Jan", "Mar", "May", "Jul", "Sep", "Oct"], legend: ["Actual", "Target"] },
        { kind: "message", title: "Weekly digest · Monday 07:30", fromLabel: "From", from: "Firm reporting", toLabel: "To", to: "Pieter, Anne, Jos", subject: "Your week in numbers", body: "Good morning,\n\n· Revenue is 2% above target\n· Two invoices are overdue (Jansen, De Wit)\n· VAT returns due in 9 days, on track\n\nOpen the dashboard for details.", button: "Send digest", sent: "Sent at 07:30" },
      ],
      watch: { kind: "pipeline", title: "Watchlist · this week", columns: ["Metric", "This week", "Target", "Status"], rows: [
        { cells: ["Revenue", "€ 12.400", "€ 12.000"], states: [{ l: "Checking", t: "neutral" }, { l: "On track", t: "ok" }] },
        { cells: ["Utilisation", "71%", "75%"], states: [{ l: "Checking", t: "neutral" }, { l: "Attention", t: "warn" }] },
        { cells: ["Overdue invoices", "2", "0"], states: [{ l: "Checking", t: "neutral" }, { l: "Alert sent", t: "warn" }] },
        { cells: ["New enquiries", "6", "5"], states: [{ l: "Checking", t: "neutral" }, { l: "On track", t: "ok" }] },
      ] },
    },
  },
];

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
    bookAudit: "Book a free audit", seeHow: "See how it works", worksWith: "Works with the tools you already use", watchLabel: "Example run",
    faqTitle: ["Questions,", "answered."], ctaTitle: "Ask more from your admin.", ctaSub: "A free audit shows where your firm loses the most time, and what to automate first.", other: "Other services", stepLabel: "Step",
  },
  tools: ["HubSpot", "Microsoft 365", "Google Workspace", "Moneybird", "Exact Online", "Twinfield", "Mollie", "Power BI", "Cal.com", "n8n", "WordPress", "Slack"],
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
    asideTitle: "What happens next", aside: ["We read your answers and look at your website.", "You get a reply within one working day.", "In a 30-minute call we go through where automation will help most."],
  },
  blogPage: {
    eyebrow: "Blog", title: "Learn as you grow.", muted: "Practical automation ideas for firms that run on deadlines.",
    all: "All", back: "All posts", placeholder: "Placeholder article", placeholderNote: "This article is a placeholder. The real text will be published soon.", related: "More to read", minRead: "min read", by: "By",
  },
  posts: [
    { slug: "five-admin-tasks-to-automate-first", tag: "Guide", read: 8, art: "orbit", date: "Coming soon", title: "Five admin tasks every accounting firm can automate first", excerpt: "Where the quickest wins usually are, how to spot them in your own week, and what to leave alone." },
    { slug: "what-a-free-automation-audit-looks-at", tag: "Process", read: 5, art: "well", date: "Coming soon", title: "What a free automation audit actually looks at", excerpt: "The questions we ask and the processes we map." },
    { slug: "build-on-the-software-you-already-use", tag: "Tools", read: 6, art: "grid", date: "Coming soon", title: "Why we build on the software you already use", excerpt: "No migrations, no new logins for your team." },
    { slug: "client-intake-for-law-firms", tag: "Legal", read: 7, art: "waves", date: "Coming soon", title: "Client intake for law firms, without the chasing", excerpt: "Checklists, reminders and filing that run themselves." },
  ] as { slug: string; tag: string; read: number; art: "orbit" | "well" | "grid" | "waves"; date: string; title: string; excerpt: string }[],
};

export type Dict = typeof en;
