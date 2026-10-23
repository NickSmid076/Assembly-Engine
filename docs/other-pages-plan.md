# Other pages · audit and plan (phase 5)

Date: 18 Oct 2026. Pages: case study (Energielabel Breda), contact, about, blog index and article, NL + EN.
Baseline shots: `docs/other-pages/before/` (desktop slices + phone first slice, NL + EN). Home and the five
service pages are locked: shared code changes are add-only, followed by a regression check.

## 1. Audit

Scored with ae-anti-vibe from the baseline screenshots (8 criteria, 0–3 each). Bar: ≥ 19/24, nothing below 2,
composition and motion at 3.

### Case study (`components/CaseStudy.tsx`)

| Section | Score | Lowest | Issues |
|---|---|---|---|
| Header + facts | 14 | Illustration 0 | Text only; the first screen shows no evidence of the work; the facts ledger is good |
| Case video (iframe) | 11 | Composition 1 | Giveaway 14: its own serif font, own player, orange accents; 153 KB HTML; controls cut off on phone ("O…"); "Oud" chapter shows an energy label, not the old site |
| Old site problems | 16 | Illustration 0 | Good numbered rows; a large empty left column |
| What we built | 12 | Composition 0 | Giveaway 3: seven identical cards; one orphan card on the last row |
| Results (dark) | 17 | Illustration 1 | Sourced, but six equal cells repeat the same source line six times; the LCP sits in a separate box |
| Behind the scenes | 14 | Composition 1 | Cards for a story that is a sequence of dated events (14 → 15 → 17 Oct) |
| CtaBand | 13 | Composition 1 | Old component; generic stripes; not a block |

### Contact (`components/Contact.tsx`)

| Section | Score | Lowest | Issues |
|---|---|---|---|
| Header | 15 | Illustration 1 | Fine; generic |
| 3-step form | 14 | Robustness 1 | Phone step tabs truncate ("Uw ka…", "Hoe h…"); errors in `red-600` (off-system); no `aria-invalid`/`aria-describedby`; service pills are `aria-pressed` buttons, not a checkbox group; `transition` (= all); `text-slate/50` on untouched sliders fails contrast |
| Aside | 13 | Illustration 0 | Plain list; does not follow the step you are on |
| Cal.com step (iframe) | 10 | Composition 1 | Giveaway 14; mounted at full height with no loading state; only reachable after sending |

### About (`components/About.tsx`)

| Section | Score | Lowest | Issues |
|---|---|---|---|
| Header | 13 | Composition 1 | Header and photo are two separate screens; the person, the page's proof, sits below the fold |
| Person | 16 | Motion 1 | Decorative scroll parallax on the photo |
| Story | 15 | Illustration 0 | Three paragraphs; the point (problem first, AI is one tool of several) is not shown |
| Values | 13 | Composition 1 | Four equal cards (giveaway 3); the homepage ledger already does this better |
| CtaBand | 13 | Composition 1 | Same as the case |

### Blog (`components/BlogIndex.tsx`, `components/BlogArticle.tsx`)

| Section | Score | Lowest | Issues |
|---|---|---|---|
| Index header | 12 | Typography 1 | The muted line runs to 4 lines on desktop (two-line rule) |
| Tag filter | 10 | Purpose 1 | Four posts don't need a filter; `role="tab"` without tab panels |
| Post grid | 11 | Honesty 1 | Giveaway 13: four "Binnenkort" posts in prime position, linking to empty pages; `art-spin` covers rotate forever (giveaway 5) |
| Article | 8 | Honesty 0 | Grey skeleton bars as body (filler); a tap target under 24 px; no rich-text renderer |
| Related | 12 | Composition 1 | Links to three more empty pages |

### Debt

- **Client-only rendering:** all four routes render a `"use client"` component that reads `useI18n()`; nothing is a block, there is no zod schema, no content-layer getter and no ACF draft.
- **Old components:** `CtaBand` (via `usePathname`), `PageHeader` (kept for legal pages), and a `Stagger`/`Reveal` entrance on everything.
- **Iframes:** the case video (`/case/energielabel-breda.html`) and the Cal.com embed.
- **Off-system styles:** `red-600`/`red-400`, `transition` without properties, `text-slate/50`, `rounded-2xl` cards with shadow on the form.
- **Blog:** placeholder skeleton body; filter tabs without panels; `art-spin` infinite loop.

## 2. Plan

Route files become server components: `getCasePage`, `getContactPage`, `getAboutPage`, `getBlogIndex`,
`getPost` in `lib/content` → `renderBlocks`. Copy stays in `lib/i18n` (new UI labels in both locales).
ACF drafts: `group_case_study.json`, `group_page_sections.json` (about, contact, blog index), `group_post.json`.

### Shared (add-only)
- `closing_cta.clock` becomes nullable: home and services still pass it, so they render unchanged; inner pages close with the same block without the clock. This replaces `CtaBand` on these pages.
- New `page_intro` block (eyebrow, two-tone H1, lead) for contact and the blog index. The H1 stays static (LCP).
- New `ledger` block, the homepage "why us" ledger style (numbered rows, `border-t-2 ink`), for case "what we built" and about values.

### 5a · Case study, in order
1. `case_hero` · P1: H1 + intro + facts ledger left; the real desktop + phone screenshots right (the homepage proof figure). Evidence on the first screen.
2. `case_findings` · P7 as an artefact: the six problems as an inspection report of the old site (dated April 2026, the last update in the sitemap), each finding with an attention marker. Sticky heading.
3. `ledger` · what we built: seven rows, no cards.
4. `case_pages` · replaces the iframe: the Brand signature's proof viewer (Home / Service / Contact × desktop / phone, real screenshots, facts with source per page), fed from the same `signatures.brand.proof` data. Lighter (lazy JPGs, ~3 KB island) and on the design system.
5. `case_results` · P6 dark band: lead figure 3 → 20+ (the arrow draws once), PageSpeed scores grouped under one source line, LCP ±6.6 s → 2.2–3.4 s as its own before/after figure; "no old score" note.
6. `case_timeline` · P4: 14 Oct live → 14 Oct first scan 44 → 15 Oct 92 / 100 → 17 Oct confirmation mails fixed → next: measure after 2–3 months (dashed, future).
7. `quote` · hidden slot: renders nothing until `quote` is filled.
8. `closing_cta` without clock; secondary link to the Brand service.

### 5a · Contact
1. `page_intro`.
2. `contact_form` (client island, all copy as props): a stepper as an `ol` with `aria-current` that never truncates (number + label under it on phone); step 1 fields with `aria-invalid`, `aria-describedby`, an error summary and focus on the first invalid field; services as a real checkbox group; step 2 sliders keep native range input (keyboard) with a scale readout, ticks and reset; a short x-slide between steps; step 3 a receipt of what was sent, then the Cal.com embed mounted only on that step, in a fixed-height frame with a loading state and an "open in new tab" fallback. Errors use ink text with a warn marker and border (no red). Honeypot and `/api/contact` unchanged.
3. Aside follows the step you are on (what happens next as a short vertical timeline), with Nick's photo, name and direct email.

### 5b · About
1. `about_hero` · P9: photo (4:5) left, two-tone H1 and the intro statement right, on the first screen; where you work from (Netherlands, mostly online, can visit) and the CTA under it. No parallax.
2. `about_story` · story paragraphs with a small diagram from paragraph 3: problem first, then the tool (design, code, automation, AI), and sometimes no AI at all.
3. `ledger` · values (four rows).
4. `closing_cta` without clock.

### 5b · Blog
1. `page_intro` (the long muted line moves to the lead so the H1 is two lines; copy unchanged).
2. `blog_list`: with no published posts, a "planned" ledger: numbered rows (tag · minutes, title, excerpt, small static cover, a "Binnenkort" status), not links. Filter returns automatically from 6 published posts (code kept).
3. Article: `post_header`, `rich_text` (WordPress HTML: headings, lists, quotes, images, code, embeds; sanitised server-side), `post_related`. A post without a body shows an honest "coming soon" state with what it will cover, never skeleton bars. Still `noindex`. A dev-only preview route renders a rich-text sample for QA.
4. `art-spin` stops: covers are static.

### QA
390/768/1440 × NL/EN; axe 0; CLS ≤ 0.02; keyboard pass on the form and the case viewer; reduced motion;
Lighthouse mobile 3 clean runs per page (median); build; regression on home + five services.
