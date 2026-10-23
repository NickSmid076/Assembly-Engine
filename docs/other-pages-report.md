# Other pages · phase 5 report

Date: 19 Oct 2026. Pages: case study (Energielabel Breda), contact, about, blog index and article, NL + EN.
Audit and plan: `docs/other-pages-plan.md`. Screenshots: `docs/other-pages/before/` and `docs/other-pages/after/`
(desktop slices + phone first slice, NL + EN; same names, so they compare one to one).

Home and the five service pages were not changed. Shared code was changed add-only (listed in §6) and
checked for regressions (§3).

## 1. What changed

**All four pages** are now server-rendered blocks: each section has a zod schema, its content comes from a
content-layer getter (`getCasePage`, `getContactPage`, `getAboutPage`, `getBlogIndex`, `getPost`), copy stays in
`lib/i18n` (NL + EN), and there is an ACF draft (`wordpress/acf-json/group_case_study.json`,
`group_page_sections.json`, `group_post.json`). The old client components (`CaseStudy`, `Contact`, `About`,
`BlogIndex`, `BlogArticle`, `CtaBand`, `PageHeader`) and the case video iframe are archived in
`archive/other-pages-v1/`. Every page ends with the homepage's closing block (without the clock).

**Case study**
- Hero: the H1 says the result (3 → 20+ pages, live since 14 Oct 2026); facts ledger; the real desktop and phone screenshots of the new site on the first screen.
- Old site: the six problems as an inspection report ("Bevindingen · oude site", April 2026) instead of an empty left column.
- What we built: seven ledger rows instead of seven equal cards.
- **The iframe video is replaced** by a native viewer: Home / Dienst / Contact × Desktop / Telefoon, real screenshots, and each page's facts with their source. It reuses the Brand signature's proof data, so the two can't drift apart. The old iframe was 153 KB of HTML with its own fonts and player; the viewer loads only the screenshots you pick.
- Results: one lead figure (3 → 20+ pages, the arrow draws once), the PageSpeed scores grouped under one source line, LCP ±6,6 s → 2,2–3,4 s as its own before/after, and the "no old score" note.
- Behind the scenes is now a timeline: 14 Oct live → 14–15 Oct speed fix (44 → 92) → 17 Oct confirmation mails repaired → next: measure after 2–3 months (hollow dot, it hasn't happened yet).
- A hidden quote slot (`caseStudy.quote`, `null` today): it renders nothing until you fill it.

**Contact**
- The 3-step form, the optional sliders and the Cal.com step are kept, and rebuilt:
  - the step tabs never truncate on phone (number with the label under it);
  - fields have `aria-invalid` and `aria-describedby`; an error summary appears and the cursor jumps to the first wrong field; errors use ink text with the amber marker (no off-system red);
  - services are a real checkbox group (Space toggles);
  - sliders stay native (arrow keys work), with a visible "Wissen" button per slider;
  - step 3 shows a receipt of what you sent, then the Cal.com calendar with a loading state and an "open in new tab" link.
- Honeypot and `/api/contact` (Resend) kept. **One change in the API:** in production without `RESEND_API_KEY`, it now answers "failed", so the form shows "Mail ons direct via nick@…" instead of "we received it". Before, a live site without the key would have thanked people while nothing was mailed. Development still logs and shows the dev note.
- The aside follows the form: Nick's photo, "what happens next" as a short timeline, and the direct email.

**About**
- Hero: Nick's photo and the H1 "Eerst bedrijfsresultaat. Dan de technologie." on the first screen, with where you work from (Netherlands, mostly online, happy to visit) and the CTA. The scroll parallax is gone.
- Story: the three paragraphs plus a small diagram of paragraph 3: the problem's questions → the tool (design, code, automation, AI), and "sometimes no AI at all".
- Values: the homepage "why us" ledger style instead of four cards. No credentials were added.

**Blog**
- The index is honest: with no published posts, the four planned articles sit in an "In voorbereiding (4)" list with a note and an "ask your question directly" button. The rows aren't links, so nobody lands on an empty page. A post becomes a link automatically once it has a body. The filter tabs return when there are 6+ published posts (code kept).
- Covers are still (no endless rotation).
- Article template: header, a `RichText` block for WordPress HTML (sanitised on the server: headings, lists, quotes, images, code, YouTube/Vimeo embeds; scripts, event handlers and unknown iframes removed) and an honest "Dit artikel schrijven we nu" state instead of grey skeleton bars. Articles without a body stay `noindex`.
- The "related posts" row is gone: it linked to three more empty pages. It can come back with real posts.
- Newsletter stays switched off (flag); the off switch now adds nothing to the page's JavaScript.

## 2. Scores (ae-anti-vibe, /24, from the after-screenshots)

Bar: ≥ 19, nothing below 2, composition and motion at 3.

| Page · section | Before | After | Notes |
|---|---|---|---|
| Case · hero + facts | 14 | **22** | Illustration 0 → 3 (real screenshots on screen one) |
| Case · old site findings | 16 | **22** | Composition 2 → 3 |
| Case · what we built (ledger) | 12 | **21** | Composition 0 → 3 |
| Case · page viewer (was iframe video) | 11 | **23** | Giveaway 14 gone |
| Case · results | 17 | **23** | One source line instead of six; LCP as its own before/after |
| Case · timeline (behind the scenes) | 14 | **23** | Cards → dated timeline |
| Contact · intro | 15 | **20** | |
| Contact · form | 14 | **23** | Robustness 1 → 3 (keyboard pass, errors, no truncation) |
| Contact · aside | 13 | **23** | Photo + what happens next |
| Contact · Cal.com step | 10 | **18** | **Under the bar:** the embed still uses Cal.com's own look and English. Fixed by the Cal.com settings in the launch checklist (brand colour, Dutch), not by code |
| About · hero | 13 | **23** | Photo on screen one |
| About · story + diagram | 15 | **22** | |
| About · values (ledger) | 13 | **21** | |
| Blog · intro | 12 | **21** | Two-line H1 |
| Blog · planned list (was grid + filter) | 11 | **22** | Giveaway 13 gone |
| Blog · article | 8 | **22** | Honesty 0 → 3 |

**Where the "motion at 3" bar is not met, on purpose.** Motion scores 3 where something changes: the case viewer, the results arrow, the timeline line, the form steps and validation. Static sections (case hero, findings, the two ledgers, about hero and story, blog list, article) score 2: per our motion rules they don't move, and they're complete without it. I didn't add entrance animations to reach a 3, because that is giveaway 5. If you want the bar applied literally, tell me and I'll propose one restrained move per section.

**Illustration on the ledgers** (case "what we built", about values) is a 2 by argument: they are lists of equals, and the case's page viewer directly below shows the built pages. Composition is 3 everywhere except the contact intro and the Cal step (2).

## 3. QA

Production build (`.next-qa`, port 3100), 19 Oct 2026.

| Check | Result |
|---|---|
| Screens viewed | 390 / 768 / 1440 × NL / EN, 5 page types (92 slices) |
| Overflow · cut text · console errors · missing names · heading jumps | **0** on all 30 route × size combinations |
| CLS (QA script) | **0** everywhere |
| axe (phone + desktop, NL + EN) | **0** violations on all 10 routes. One found and fixed: the contact aside was an `<aside>` inside the page's main region |
| Keyboard: contact form | Full flow without a mouse: tab order name → kantoor → email → telefoon → services → Volgende; empty submit focuses the name field and shows the summary; Space toggles a service; arrow keys move a slider; the step heading takes focus on each step; values survive back/forward; receipt correct |
| Keyboard: case viewer | Page and screen buttons reachable in order, `aria-pressed` updates, the facts region announces the change, focus ring visible |
| Reduced motion | All shots run with reduced motion: everything visible in its end state, no hydration errors |
| Rich-text preview route | Renders in development; **404 in production** (checked) |
| Build | Passes. One warning, on a locked page (see §5) |

**Note on one screenshot.** The QA script's full-page capture of the about page at 1440 drew the hero with the phone padding and the photo on the right. A normal browser capture shows the correct layout (photo left, text right): `docs/other-pages/after/nl_about__desktop__01-viewport.png`. It's a capture artefact on that page only; I measured the live layout to confirm.

### Lighthouse mobile (3 clean runs per page, median)

Run on a busy machine, so only runs with a clean server response (TTFB < 100 ms) count. Targets: performance ≥ 90, accessibility ≥ 95.

| Page | NL perf (runs) | EN perf (runs) | Accessibility | Best pr. | SEO | CLS | LCP (sim.) |
|---|---|---|---|---|---|---|---|
| Case study | **93** (93 93 91) | **92** (92 91 93) | 100 | 100 | 100 | 0 | 3,2–3,4 s |
| Contact | **95** (98 95 95) | **97** (82 97 98) | 100 | 100 | 100 | 0 | 2,5–3,2 s |
| About | **95** (95 94 95) | **94** (94 95 94) | 100 | 100 | 100 | 0 | 3,0 s |
| Blog index | **94** (94 93 94) | **94** (94 93 94) | 100 | 100 | 100 | 0 | 3,0 s |
| Article (coming soon) | **95** (95 94 95) | **95** (95 95 95) | 100 | 100 | 63* | 0 | 2,9–3,0 s |

\* SEO 63 on the article is the `noindex` we set on purpose for posts without a body; it goes to 100 when a post is published.

**Regression (locked pages, NL, 3 clean runs, median):** home **96**, Brand **93**, Acquisition **93**, Invoicing **93**,
Operations **94**, Reporting **94**; accessibility 100 and CLS 0 on all. Phase 4 had 91–93 on the same pages, so nothing got slower.
LCP is simulated at 2,5–3,4 s on every page (target 2,5 s); as agreed in phase 4, judge it with PageSpeed Insights on the live site (checklist).

### Bundle (First Load JS, gzip)

| Route | Before | After |
|---|---|---|
| Home, services, case, contact, about, article | 177 KB (home, services) | **177.5–177.9 KB** |
| Blog index | 214 KB (mid-phase: both dictionaries were pulled in by the newsletter form) | **178.5 KB** |

Budget 180 KB. The newsletter form now gets its labels as props, so the switched-off form no longer
loads the NL + EN dictionaries on the blog page. `sanitize-html` runs on the server only and adds nothing to the page.

## 4. Decisions (applied; tell me if you want any of them changed)
1. **Case video iframe archived**, replaced by the native viewer. Its HTML is kept in `archive/other-pages-v1/public-case/energielabel-breda.html`.
2. **Blog "related posts" removed** until there are real posts.
3. **Contact API fails visibly in production without the Resend key** (see §1).
4. **New UI labels** in both languages (they're interface text, not marketing copy): case "Bevindingen · oude site", "De nieuwe site, pagina voor pagina", timeline titles; contact "Stap 1 van 3", error summary, "Wissen", "Wat u ons stuurde", "Agenda laden…"; about diagram "Eerst het probleem, dan het gereedschap", "En soms: geen AI"; blog "In voorbereiding", "Dit artikel schrijven we nu", "Stel uw vraag direct". All in `lib/i18n`. Tell me if any wording should change.

## 5. Decisions needed from you
1. **Bug on a locked page (Invoicing).** The active hour line should show a 2px cobalt bar on its left. The class `shadow-[inset_2px_0_0_theme(colors.cobalt)]` is never generated (build warning; `Invoicing.tsx` lines 136, 182 and 194), so the bar is missing. The fix is to write it as `shadow-[inset_2px_0_0_#2E5BFF]` in those three places. The page is locked, so I didn't touch it. OK to fix?
2. **Cal.com look and language.** The embed shows Cal.com's English interface on /nl. Set the event to Dutch and the brand colour to `#2E5BFF` in Cal.com (launch checklist). After that, the step scores about 20.
3. **Motion bar** for static sections (see §2): keep them static, or should I propose one restrained move each?
4. **`@types/sanitize-html`** is in `dependencies` (exact version), next to `sanitize-html`. Move it to `devDependencies` if your host installs dev dependencies for the build (Vercel does).
5. **Privacy and terms pages don't exist.** The footer links "Privacy" and "Voorwaarden" point to `#` (they did before this phase too). The contact form collects personal data, so a privacy statement is needed before launch. I won't write legal text myself: send me the texts, or tell me to hide the two links until they exist. Added to the launch checklist.

## 6. Files touched

- New blocks (`components/blocks/`): `case-hero`, `case-findings`, `case-pages` (client `Viewer`), `case-results`, `case-timeline`, `quote`, `ledger`, `page-intro`, `contact-form` (client `Form`), `about-hero`, `about-story`, `blog-list`, `post-header`, `rich-text` (+ `sanitize.ts`).
- Shared, add-only: `proof/Proof.tsx` (exports `Change`), `closing-cta` (`clock` nullable), `render.tsx` (registry), `lib/content/{types,local,source,index}.ts`, `app/globals.css` (timeline lines, still covers, slider height, `.rich` prose), `components/LineArt.tsx` (`still`), `components/Newsletter.tsx` (new; labels as props), `components/Blog.tsx` (passes labels).
- Routes: `case-studies/energielabel-breda`, `contact`, `about`, `blog`, `blog/[slug]` (server components), `blog/rich-text-sample` (development only).
- API: `app/api/contact/route.ts` (production without key → 503).
- Content: `lib/i18n/nl.ts`, `en.ts` (new labels, `caseStudy.quote: null`); `lib/content/fixtures/rich-text-sample.ts`.
- WordPress: `wordpress/acf-json/group_case_study.json`, `group_page_sections.json`, `group_post.json`.
- Skills: `ae-design-system` (component table), `ae-headless-wp` (case, posts, pages).
- Packages: `sanitize-html@2.14.0`, `@types/sanitize-html@2.13.0`.
- Docs: this report, `docs/other-pages-plan.md`, `docs/launch-checklist.md` (7 new rows), screenshots.

## 7. Site status

| Page | Status | Open |
|---|---|---|
| **Home** (`/nl`, `/en`) | Finished (phase 3–4). Headless-ready. | Demo video NL export (checklist). |
| **5 service pages** | Finished (phase 4). Headless-ready. | Vendor logo checks (checklist §1); the Invoicing cobalt bar (§5.1). |
| **Case: Energielabel Breda** | Finished (phase 5). Headless-ready. | New service and contact facts await your OK (checklist §2); client quote; measure after 2–3 months. |
| **Contact** | Finished (phase 5). Headless-ready. | Resend key and sending domain; Cal.com language and colour; real-device test. |
| **About** | Finished (phase 5). Headless-ready. | None. |
| **Blog** | Index and article template finished (phase 5). Headless-ready; WordPress HTML goes through `RichText`. | No articles written yet; all four show as "In voorbereiding". Newsletter off until a mailing tool is connected. |

**Before launch** (details in `docs/launch-checklist.md`):
1. Privacy statement (and terms) pages, or hide the footer links.
2. Resend: verify the sending domain, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, send one test in NL and EN.
3. Cal.com: Dutch, brand colour, test booking.
4. Deploy, then PageSpeed Insights on the live URLs (mobile LCP is judged there).
5. Real-device tests: five signatures, the contact form, the case viewer; reduced motion on one device.
6. Vendor logo checks; Brand proof wording.
7. Demo video NL export; first real blog article (or launch with the "In voorbereiding" list).
8. Copy proposals in `docs/copy-suggestions.md`.
