// Local content source: reshapes the dictionaries in lib/i18n into the WordPress block shapes.
// When WordPress goes live, lib/content/wordpress.ts returns the same shapes and this file can be retired.
import fs from "node:fs";
import path from "node:path";
import { getDict } from "@/lib/i18n";
import { LOGOS } from "./logos";
import { POSTS, type BlockData } from "./posts";
import type { Locale } from "@/lib/i18n/config";
import type {
  ArticleSection, ClosingCtaBlock, ContentPage, HeadingPart, HeroHomeBlock, HomePage, HowItRunsBlock, ProcessBlock, ProofBlock, Section, ServicePage, ServicesBlock, WhyUsBlock, WPLink,
} from "./types";
import { SERVICE_KEYS } from "@/components/blocks/service-hero/schema";
import type { BrandComponent, BrandPage } from "@/components/blocks/service-signature/schema";

type Dict = ReturnType<typeof getDict>;

/** Localise an internal path the way WordPress + Polylang will return it ("/contact" → "/nl/contact"). */
const href = (locale: Locale, path: string) => (path.startsWith("#") || /^https?:/.test(path) ? path : `/${locale}${path === "/" ? "" : path}`);
const link = (locale: Locale, title: string, path: string, target: "" | "_blank" = ""): WPLink => ({ title, url: href(locale, path), target });
/** Two-tone heading: first phrase plain, second phrase accented. */
const two = ([a, b]: readonly string[] | [string, string]): HeadingPart[] => [{ text: a, accent: false }, { text: b, accent: true }];

/** Merge consecutive words with the same accent into one part, as an editor would type them. */
function parts(words: { t: string; blue?: boolean }[]): HeadingPart[] {
  const out: HeadingPart[] = [];
  for (const w of words) {
    const accent = !!w.blue;
    const last = out[out.length - 1];
    if (last && last.accent === accent) last.text += ` ${w.t}`;
    else out.push({ text: w.t, accent });
  }
  return out;
}

const ANCHOR = { run: "how-it-works", process: "how-we-work", services: "services", proof: "case", why: "why-us", closing: "audit" };

function heroHome(locale: Locale, t: Dict): HeroHomeBlock {
  const H = t.home.hero;
  return {
    acf_fc_layout: "hero_home",
    eyebrow: H.eyebrow,
    heading_parts: parts(H.title),
    body: H.sub,
    primary_cta: link(locale, H.cta1, "/contact"),
    secondary_cta: link(locale, H.cta2, `#${ANCHOR.process}`),
    modules: t.services.map((s) => ({ label: s.name, url: `#${ANCHOR.services}` })),
    module_hint: H.moduleHint,
  };
}

function howItRuns(t: Dict): HowItRunsBlock {
  const R = t.home.run;
  return {
    acf_fc_layout: "how_it_runs",
    anchor: ANCHOR.run,
    heading_parts: two(R.title),
    body: R.sub,
    points: R.points.map((p) => ({ title: p.title, text: p.text, focus: p.focus as HowItRunsBlock["points"][number]["focus"] })),
    labels: { ...t.home.moments, ...R.labels },
    runs: R.runs.map((r) => ({ ...r, start: { ...r.start }, rows: r.rows.map((x) => ({ ...x, person: x.person ? { ...x.person } : null })) })),
  };
}

function process(t: Dict): ProcessBlock {
  const H = t.home.how;
  return {
    acf_fc_layout: "process",
    anchor: ANCHOR.process,
    heading_parts: two(H.title),
    body: H.sub,
    track: { ...t.home.track },
    live_step: 3,
    steps: H.steps.map((s) => ({ title: s.title, text: s.text, detail: s.detail })),
  };
}

/** The demo video in the visitor's language when that file exists (assembly-engine-demo-nl.mp4), else the English one. */
function demoVideo(locale: Locale) {
  const own = `/video/assembly-engine-demo-${locale}.mp4`;
  return locale !== "en" && fs.existsSync(path.join(globalThis.process.cwd(), "public", own)) ? own : "/video/assembly-engine-demo.mp4";
}

function services(locale: Locale, t: Dict): ServicesBlock {
  const A = t.home.advantages;
  const D = t.home.demo;
  return {
    acf_fc_layout: "services",
    anchor: ANCHOR.services,
    heading_parts: [{ text: A.title[1], accent: false }],
    body: `${t.home.services.title[0]} ${t.home.services.title[1]}`,
    list_label: A.pill,
    story_labels: t.home.moments,
    items: t.services.map((s) => ({
      name: s.name, lead: s.lead, rest: s.rest,
      link: link(locale, t.home.services.more, `/services/${s.slug}`),
      moment: s.scenes.home,
    })),
    video: {
      src: demoVideo(locale), poster: "/video/assembly-engine-demo-poster.jpg", width: 1280, height: 720,
      label: D.label, caption: D.caption, note: D.note, play: D.play, pause: D.pause,
    },
  };
}

/** "±6.6 s → 2.2–3.4 s" → value "2.2–3.4 s", label "… (was ±6.6 s)", so the figure fits one line. */
function lcpMetric(lcp: { value: string; label: string }, was: string) {
  const [before, after] = lcp.value.split("→").map((s) => s.trim());
  return after ? { value: after, label: `${lcp.label} (${was.replace("{v}", before)})` } : { value: lcp.value, label: lcp.label };
}

function proof(locale: Locale, t: Dict): ProofBlock {
  const C = t.caseStudy;
  const P = t.home.proof;
  const pick = [0, 1, 3, 4].map((i) => C.results[i]);
  return {
    acf_fc_layout: "proof",
    anchor: ANCHOR.proof,
    label: P.label,
    heading_parts: [{ text: C.title, accent: false }],
    body: `${C.muted} ${C.intro}`,
    metrics: [...pick.map((r) => ({ value: r.value, label: r.label, source: r.note })), { ...lcpMetric(C.lcp, P.lcpWas), source: C.lcp.note }],
    images: {
      desktop: { url: "/case/energielabel-breda-desktop.jpg", alt: P.altDesktop, width: 1440, height: 900 },
      phone: { url: "/case/energielabel-breda-phone.jpg", alt: P.altPhone, width: 780, height: 1688 },
    },
    link: link(locale, P.cta, "/case-studies/energielabel-breda"),
    secondary_link: link(locale, C.visit, "https://energielabel-breda.nl", "_blank"),
  };
}

function whyUs(locale: Locale, t: Dict): WhyUsBlock {
  const A = t.about;
  return {
    acf_fc_layout: "why_us",
    anchor: ANCHOR.why,
    heading_parts: [{ text: A.title, accent: false }, { text: A.muted, accent: true }],
    body: A.intro,
    person: { image: { url: "/images/nick-smid.jpg", alt: A.photoAlt, width: 1126, height: 2000 }, name: t.home.why.name, role: t.home.why.role },
    items: t.home.advantages.items.map((i) => ({ title: i.title, text: i.text })),
    link: link(locale, A.cta, "/about"),
  };
}

function closingCta(locale: Locale, t: Dict): ClosingCtaBlock {
  const C = t.home.closing;
  return {
    acf_fc_layout: "closing_cta",
    anchor: ANCHOR.closing,
    heading_parts: two(C.title),
    body: C.sub,
    primary_cta: link(locale, t.nav.cta, "/contact"),
    secondary_cta: link(locale, C.cta2, `#${ANCHOR.services}`),
    clock: { from: "06:58", to: "07:00", done: C.done.map((d) => ({ ...d })), label: C.clockLabel },
  };
}

export async function getHomePage(locale: Locale): Promise<HomePage> {
  const t = getDict(locale);
  return {
    locale,
    title: t.meta.title,
    description: t.meta.description,
    sections: [heroHome(locale, t), howItRuns(t), process(t), services(locale, t), proof(locale, t), whyUs(locale, t), closingCta(locale, t)],
  };
}

/* ------------------------------------------------------------------ service pages (CPT `service`) */

const SERVICE_ANCHOR = { how: "how", scope: "scope", principles: "principles", faq: "faq", others: "other-services" };

function servicePage(locale: Locale, t: Dict, i: number): Section[] {
  const s = t.services[i];
  const P = t.servicePage;
  const key = SERVICE_KEYS[i];
  const signature = (component: Extract<Section, { acf_fc_layout: "service_signature" }>["component"]): Section => ({
    acf_fc_layout: "service_signature",
    anchor: SERVICE_ANCHOR.how,
    heading_parts: two(s.howTitle),
    points: s.steps.map((x) => ({ title: x.title, text: x.text })),
    component,
  });
  const O = t.signatures.operations;
  const B = t.signatures.brand;
  const A = t.signatures.acquisition;
  const I = t.signatures.invoicing;
  const CASE_SHOTS = { home: "", service: "-service", contact: "-contact" } as const;
  const how: Section = key === "brand"
    ? signature({
        kind: "brand",
        labels: { ...B.labels, devices: { ...B.labels.devices }, layers: { ...B.labels.layers }, roles: { ...B.labels.roles } },
        brand: { ...B.brand, nav: [...B.brand.nav], type: { ...B.brand.type }, colours: B.brand.colours.map((c) => ({ ...c, id: c.id as "ink" | "accent" | "tint" })) },
        components: B.components.map((c) => ({ ...c, id: c.id as BrandComponent })),
        pages: B.pages.map((x) => ({ ...x, id: x.id as BrandPage, items: x.items.map((i) => ({ ...i })), aside: { ...x.aside } })),
        proof: {
          client: B.proof.client, live: B.proof.live,
          link: link(locale, t.home.proof.cta, "/case-studies/energielabel-breda"),
          site: link(locale, t.caseStudy.visit, "https://energielabel-breda.nl", "_blank"),
          pages: B.proof.pages.map((x) => {
            const id = x.page as BrandPage;
            const [altD, altP] = B.proof.alts[id];
            return {
              page: id, url: x.url,
              images: {
                desktop: { url: `/case/energielabel-breda${CASE_SHOTS[id]}-desktop.jpg`, alt: altD, width: 1440, height: 900 },
                phone: { url: `/case/energielabel-breda${CASE_SHOTS[id]}-phone.jpg`, alt: altP, width: 780, height: 1688 },
              },
              facts: x.facts.map((f) => ({ ...f, device: f.device as "all" | "desktop" | "phone" })),
            };
          }),
        },
        initial: { ...B.initial },
      })
    : key === "operations"
    ? signature({
        kind: "operations",
        labels: { ...O.labels, steps: { ...O.labels.steps }, channels: { ...O.labels.channels }, sign: { ...O.labels.sign } },
        items: O.items.map((x) => ({ ...x })),
        clients: O.clients.map((x) => ({ ...x })),
        periods: O.periods.map((x) => ({ ...x })),
        dossiers: O.dossiers.map((x) => ({ ...x, signoff: { ...x.signoff }, docs: x.docs.map((y) => ({ ...y })) })),
        initial: { ...O.initial },
      })
    : key === "reporting"
    ? signature({
        kind: "reporting",
        ...t.signatures.reporting,
        labels: { ...t.signatures.reporting.labels },
        dashboard: { ...t.signatures.reporting.dashboard },
        sources: t.signatures.reporting.sources.map((x) => ({ ...x })),
        kpis: t.signatures.reporting.kpis.map((k) => ({ ...k, sources: k.sources.map((x) => ({ ...x })) })),
      })
    : key === "acquisition"
    ? signature({
        kind: "acquisition",
        ...A,
        labels: { ...A.labels, dimensions: { ...A.labels.dimensions } },
        options: { sector: A.options.sector.map((o) => ({ ...o })), size: A.options.size.map((o) => ({ ...o })), region: A.options.region.map((o) => ({ ...o })) },
        firms: A.firms.map((f) => ({
          ...f, signal: { ...f.signal }, draft: { ...f.draft, lines: [...f.draft.lines] },
          facts: { sector: { ...f.facts.sector, matches: [...f.facts.sector.matches] }, size: { ...f.facts.size, matches: [...f.facts.size.matches] }, region: { ...f.facts.region, matches: [...f.facts.region.matches] } },
        })),
        week: { ...A.week },
        initial: { ...A.initial },
      })
    : signature({
        kind: "invoicing",
        labels: { ...I.labels, stations: { ...I.labels.stations }, reminders: { ...I.labels.reminders } },
        tools: { ...I.tools },
        clients: I.clients.map((c) => ({
          ...c, lines: c.lines.map((l) => ({ ...l })), invoice: { ...c.invoice }, payment: { ...c.payment },
          ledger: c.ledger.map((r) => ({ ...r })), reminders: c.reminders.map((r) => ({ ...r })),
        })),
        initial: { ...I.initial },
      });

  return [
    {
      acf_fc_layout: "service_hero",
      service: key,
      eyebrow: s.name,
      heading_parts: two([s.hero.title, s.hero.muted]),
      body: s.hero.sub,
      primary_cta: link(locale, P.bookAudit, "/contact"),
      secondary_cta: link(locale, P.seeHow, `#${SERVICE_ANCHOR.how}`),
      story_labels: t.home.moments,
      moment: s.scenes.home,
    },
    how,
    // Brand's one real case lives in its signature (proof state, with a link to the full case study); no separate
    // proof block, so the numbers don't appear twice (owner, phase 3 review).
    process(t),
    {
      acf_fc_layout: "service_scope",
      anchor: SERVICE_ANCHOR.scope,
      heading_parts: two(s.gridTitle),
      included: { label: P.scope.included, items: [...s.included] },
      excluded: { label: P.scope.excluded, items: [...s.excluded] },
      tools: { label: P.scope.tools, items: s.tools.map((x, k) => ({ name: x.name, logo: x.logo ? { ...LOGOS[x.logo], alt: x.name } : null, order: k + 1 })), tail: P.scope.toolsTail },
    },
    { acf_fc_layout: "service_principles", anchor: SERVICE_ANCHOR.principles, heading_parts: two(s.principlesTitle), items: s.principles.map((x) => ({ ...x })) },
    { acf_fc_layout: "service_faq", anchor: SERVICE_ANCHOR.faq, heading_parts: two(P.faqTitle), items: s.faq.map((x) => ({ ...x })) },
    {
      acf_fc_layout: "service_others",
      anchor: SERVICE_ANCHOR.others,
      label: P.other,
      items: t.services.flatMap((o, k) => (k === i ? [] : [{ service: SERVICE_KEYS[k], name: o.name, lead: o.lead, link: link(locale, o.name, `/services/${o.slug}`) }])),
    },
    { ...closingCta(locale, t), heading_parts: [{ text: P.ctaTitle, accent: false }], body: P.ctaSub, secondary_cta: null },
  ];
}

export async function getServicePage(locale: Locale, slug: string): Promise<ServicePage | null> {
  const t = getDict(locale);
  const i = t.services.findIndex((s) => s.slug === slug);
  if (i < 0) return null;
  const s = t.services[i];
  return { locale, slug, title: s.name, description: s.hero.sub, sections: servicePage(locale, t, i) };
}

export async function getServiceSlugs(): Promise<string[]> {
  return getDict("en").services.map((s) => s.slug);
}

/* ───────────────────────── Inner pages (phase 5) ───────────────────────── */

/** The closing chapter on inner pages: the closing_cta block without the 07:00 clock. */
function closingInner(locale: Locale, t: Dict, secondary: WPLink | null): ClosingCtaBlock {
  return {
    acf_fc_layout: "closing_cta",
    anchor: "next-step",
    heading_parts: [{ text: t.servicePage.ctaTitle, accent: false }],
    body: t.servicePage.ctaSub,
    primary_cta: link(locale, t.nav.cta, "/contact"),
    secondary_cta: secondary,
    clock: null,
  };
}

export const CASE_SLUGS = ["energielabel-breda"] as const;
const CASE_SHOT = { home: "", service: "-service", contact: "-contact" } as const;

function casePage(locale: Locale, t: Dict): Section[] {
  const C = t.caseStudy;
  const B = t.signatures.brand;
  const site = link(locale, C.visit, "https://energielabel-breda.nl", "_blank");
  const [lead, ...psi] = C.results;
  const TL = C.timeline;
  return [
    {
      acf_fc_layout: "case_hero",
      eyebrow: `${C.eyebrow} · ${C.client}`,
      heading_parts: two([C.title, C.muted]),
      intro: C.intro,
      facts: C.facts.map(([label, value]) => ({ label, value })),
      images: {
        desktop: { url: "/case/energielabel-breda-desktop.jpg", alt: t.home.proof.altDesktop, width: 1440, height: 900 },
        phone: { url: "/case/energielabel-breda-phone.jpg", alt: t.home.proof.altPhone, width: 780, height: 1688 },
      },
      site,
    },
    { acf_fc_layout: "case_findings", anchor: "old-site", heading_parts: two(C.problemTitle), report: { ...C.findings }, items: [...C.problem] },
    { acf_fc_layout: "ledger", anchor: "built", heading_parts: two(C.builtTitle), body: null, items: C.built.map((b) => ({ ...b })), tone: "white" },
    {
      acf_fc_layout: "case_pages",
      anchor: "pages",
      heading_parts: two(C.pagesTitle),
      body: C.pagesBody,
      labels: { page: B.labels.page, device: B.labels.device, desktop: B.labels.devices.desktop, phone: B.labels.devices.phone, source: B.labels.source },
      pages: B.proof.pages.map((p) => {
        const id = p.page as keyof typeof CASE_SHOT;
        const [altD, altP] = B.proof.alts[id];
        return {
          id,
          label: B.pages.find((x) => x.id === id)?.label ?? id,
          url: p.url,
          images: {
            desktop: { url: `/case/energielabel-breda${CASE_SHOT[id]}-desktop.jpg`, alt: altD, width: 1440, height: 900 },
            phone: { url: `/case/energielabel-breda${CASE_SHOT[id]}-phone.jpg`, alt: altP, width: 780, height: 1688 },
          },
          facts: p.facts.map((f) => ({ ...f, device: f.device as "all" | "desktop" | "phone" })),
          note: id === "home" ? B.labels.proofNote : null,
        };
      }),
      initial: { page: "service", device: "desktop" },
      site,
    },
    {
      acf_fc_layout: "case_results",
      anchor: "results",
      heading_parts: two(C.resultsTitle),
      lead: { value: lead.value, label: lead.label, source: lead.note },
      groups: [
        { source: psi[0].note, items: psi.map((r) => ({ value: r.value, label: r.label })) },
        { source: C.lcp.note, items: [{ value: C.lcp.value, label: C.lcp.label }] },
      ],
      note: C.noOldScore,
    },
    {
      acf_fc_layout: "case_timeline",
      anchor: "after-launch",
      heading_parts: two(C.behindTitle),
      items: [
        { date: TL.live.date, title: TL.live.title, text: TL.live.text, figure: null, future: false },
        { date: TL.dates[0], title: C.behind[0].title, text: C.behind[0].text, figure: { ...TL.speed }, future: false },
        { date: TL.dates[1], title: C.behind[1].title, text: C.behind[1].text, figure: null, future: false },
        { date: TL.later, title: C.nextTitle, text: C.next, figure: null, future: true },
      ],
    },
    { acf_fc_layout: "quote", quote: C.quote ? { ...C.quote } : null },
    closingInner(locale, t, link(locale, t.services[0].name, `/services/${t.services[0].slug}`)),
  ];
}

export async function getCasePage(locale: Locale, slug: string): Promise<ContentPage | null> {
  if (!(CASE_SLUGS as readonly string[]).includes(slug)) return null;
  const t = getDict(locale);
  const C = t.caseStudy;
  return { locale, slug, title: `${C.eyebrow}: ${C.client}`, description: C.intro, index: true, sections: casePage(locale, t) };
}

const CAL_LINK = globalThis.process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/nick-assembly-engine/30min";
const CONTACT_EMAIL = "nick@assembly-engine.com";
const NICK = (t: Dict) => ({ image: { url: "/images/nick-smid.jpg", alt: t.about.photoAlt, width: 1126, height: 2000 }, name: t.home.why.name, role: t.home.why.role });

export async function getContactPage(locale: Locale): Promise<ContentPage> {
  const t = getDict(locale);
  const c = t.contact;
  return {
    locale, slug: "contact", title: c.title, description: c.sub, index: true,
    sections: [
      { acf_fc_layout: "page_intro", eyebrow: c.eyebrow, heading_parts: two([c.title, c.muted]), lead: c.sub },
      {
        acf_fc_layout: "contact_form",
        anchor: "form",
        locale,
        steps: [...c.steps],
        step_of: c.stepOf,
        fields: { name: c.fields.name, firm: c.fields.firm, email: c.fields.email, phone: c.fields.phone, services: c.fields.services, message: c.fields.message, message_placeholder: c.fields.messagePh },
        services: t.services.map((s) => ({ value: s.name, label: s.name })),
        feel: { title: c.feelTitle, sub: c.feelSub, items: c.feel.map((x) => ({ ...x })), scale: [...c.scale], untouched: c.untouched, reset: c.reset },
        buttons: { next: c.next, back: c.back, submit: c.submit, sending: c.sending },
        errors: { ...c.errors, summary: c.errorSummary },
        sent: { title: c.sentTitle, sub: c.sentSub, failed: c.sentFailed, dev: c.devNote, receipt: c.receipt, email_label: c.emailLabel },
        cal: { url: CAL_LINK, title: c.calTitle, open: c.calOpen, loading: c.calLoading },
        privacy: c.privacy,
        aside: { title: c.asideTitle, items: [...c.aside], direct: c.direct, email: CONTACT_EMAIL, person: NICK(t) },
      },
    ],
  };
}

export async function getAboutPage(locale: Locale): Promise<ContentPage> {
  const t = getDict(locale);
  const a = t.about;
  return {
    locale, slug: "about", title: a.eyebrow, description: a.intro, index: true,
    sections: [
      { acf_fc_layout: "about_hero", eyebrow: a.eyebrow, heading_parts: two([a.title, a.muted]), statement: a.intro, where: a.where, person: NICK(t), cta: link(locale, a.cta, "/contact") },
      { acf_fc_layout: "about_story", anchor: "story", heading_parts: two(a.storyTitle), paragraphs: [...a.story], order: { ...a.order, questions: [...a.order.questions], tools: [...a.order.tools] } },
      { acf_fc_layout: "ledger", anchor: "how-i-work", heading_parts: two(a.valuesTitle), body: null, items: a.values.map((v) => ({ ...v })), tone: "paper" },
      closingInner(locale, t, link(locale, t.nav.caseStudy, "/case-studies/energielabel-breda")),
    ],
  };
}

/** A post's body in this locale (lib/content/posts), or null while it is still being written (not linked).
 *  WordPress will return `content.rendered`. */
const postBody = (locale: Locale, slug: string): string | null => POSTS[locale][slug]?.default ?? null;

const AUDIT_SLUG = "what-a-free-automation-audit-looks-at";
/** Further reading per post (later an ACF relationship field). */
const RELATED: Record<string, string[]> = {
  "what-a-free-automation-audit-looks-at": ["five-admin-tasks-to-automate-first", "what-not-to-automate", "build-on-the-software-you-already-use"],
  "five-admin-tasks-to-automate-first": ["what-a-free-automation-audit-looks-at", "what-not-to-automate", "automatic-payment-reminders"],
  "e-invoicing-mandatory-2030": ["automatic-payment-reminders", "build-on-the-software-you-already-use", "five-admin-tasks-to-automate-first"],
  "build-on-the-software-you-already-use": ["n8n-vs-make-vs-zapier-for-dutch-firms", "what-a-free-automation-audit-looks-at", "five-admin-tasks-to-automate-first"],
  "client-intake-for-law-firms": ["engagement-letters-and-conflict-checks-for-law-firms", "what-not-to-automate", "build-on-the-software-you-already-use"],
  "automatic-payment-reminders": ["e-invoicing-mandatory-2030", "what-a-free-automation-audit-looks-at", "build-on-the-software-you-already-use"],
  "what-not-to-automate": ["five-admin-tasks-to-automate-first", "client-intake-for-law-firms", "what-a-free-automation-audit-looks-at"],
  "n8n-vs-make-vs-zapier-for-dutch-firms": ["build-on-the-software-you-already-use", "what-not-to-automate", "what-a-free-automation-audit-looks-at"],
  "engagement-letters-and-conflict-checks-for-law-firms": ["client-intake-for-law-firms", "what-not-to-automate", "build-on-the-software-you-already-use"],
};

/** The post's cover (public/blog/<slug>/cover.svg, 1600×800) if it exists; alt text from the post module. */
function postCover(locale: Locale, slug: string, alt = "") {
  const url = `/blog/${slug}/cover.svg`;
  if (!fs.existsSync(`${globalThis.process.cwd()}/public${url}`)) return null;
  return { url, alt: alt || (POSTS[locale][slug]?.cover?.alt ?? ""), width: 1600, height: 800 };
}

/** Adds the shared UI labels (i18n) to a block from a post module. */
function withLabels(block: BlockData, t: Dict): ArticleSection {
  const l = t.blogPage.blocks;
  switch (block.acf_fc_layout) {
    case "callout": return { ...block, labels: l.callout };
    case "stat": return { ...block, labels: { source: l.source } };
    case "checklist": return { ...block, labels: l.checklist };
    case "before_after": return { ...block, labels: l.beforeAfter };
    case "flow_diagram": return { ...block, labels: { ...l.flow, example: l.example } };
    case "timeline": return { ...block, labels: l.timeline };
    case "comparison_table": return { ...block, labels: { scroll: l.table.scroll, source: l.source } };
    case "mock_ui": return { ...block, labels: { example: l.example, ...l.mock } };
    case "diagram": return { ...block, labels: { source: l.source } };
  }
}

/** Splits the body on <!--block:key--> markers: prose chunks in between, the post's blocks in their place. */
function articleSections(locale: Locale, slug: string, t: Dict): ArticleSection[] {
  const post = POSTS[locale][slug];
  const parts = post.default.split(/<!--block:([a-z0-9-]+)-->/);
  const out: ArticleSection[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 0) { if (part.trim()) out.push({ acf_fc_layout: "prose", html: part }); return; }
    const block = post.blocks?.[part];
    if (!block) throw new Error(`Post ${locale}/${slug}: no block "${part}"`);
    out.push(withLabels(block, t));
  });
  return out;
}

export async function getBlogIndex(locale: Locale): Promise<ContentPage> {
  const t = getDict(locale);
  const b = t.blogPage;
  return {
    locale, slug: "blog", title: b.eyebrow, description: b.muted, index: true,
    sections: [
      { acf_fc_layout: "page_intro", eyebrow: b.eyebrow, heading_parts: [{ text: b.title, accent: false }], lead: b.muted },
      {
        acf_fc_layout: "blog_list", anchor: "posts",
        labels: { min_read: b.minRead, planned_title: b.plannedTitle, planned_note: b.plannedNote },
        ask: link(locale, b.ask, "/contact"),
        posts: t.posts.map((p) => ({ slug: p.slug, url: postBody(locale, p.slug) ? href(locale, `/blog/${p.slug}`) : null, tag: p.tag, read: p.read, date: p.date, title: p.title, excerpt: p.excerpt, art: p.art, cover: postCover(locale, p.slug) })),
      },
      closingInner(locale, t, link(locale, t.nav.caseStudy, "/case-studies/energielabel-breda")),
    ],
  };
}

export async function getPostSlugs(): Promise<string[]> {
  return getDict("en").posts.map((p) => p.slug);
}

export async function getPost(locale: Locale, slug: string): Promise<ContentPage | null> {
  const t = getDict(locale);
  const b = t.blogPage;
  const p = t.posts.find((x) => x.slug === slug);
  if (!p) return null;
  const html = postBody(locale, slug);
  const back = link(locale, b.back, "/blog");
  // The closing chapter points to the audit post (the audit post itself keeps the case study).
  const secondary = slug === AUDIT_SLUG ? link(locale, t.nav.caseStudy, "/case-studies/energielabel-breda") : link(locale, b.blocks.auditLink, `/blog/${AUDIT_SLUG}`);
  const related = (RELATED[slug] ?? []).map((s) => t.posts.find((x) => x.slug === s)).filter((x) => x && postBody(locale, x.slug));
  const header = { acf_fc_layout: "post_header" as const, back, meta: `${p.tag} · ${p.read} ${b.minRead}`, title: p.title, excerpt: p.excerpt, author: { name: t.home.why.name, image: NICK(t).image }, by: b.by, date: p.date, art: p.art, cover: postCover(locale, slug) };
  // Indexed only with a body and once the post's own `index` flag is flipped (after its [CHECK] markers are cleared).
  const body: Section[] = html
    ? [
      { acf_fc_layout: "post_article", sections: articleSections(locale, slug, t), labels: { toc: b.blocks.toc, toc_toggle: b.blocks.tocToggle, progress: b.blocks.progress } },
      ...(related.length ? [{
        acf_fc_layout: "related_posts" as const, anchor: "related", title: b.related, labels: { min_read: b.minRead },
        posts: related.map((r) => ({ url: href(locale, `/blog/${r!.slug}`), tag: r!.tag, read: r!.read, title: r!.title, cover: postCover(locale, r!.slug), art: r!.art })),
      }] : []),
    ]
    : [{ acf_fc_layout: "rich_text", html, soon: { title: b.soonTitle, about: b.soonAbout, excerpt: p.excerpt, back } }];
  return {
    locale, slug, title: p.title, description: p.excerpt, index: !!html && p.index,
    sections: [header, ...body, closingInner(locale, t, secondary)],
  };
}
