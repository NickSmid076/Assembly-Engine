# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of Dutch small and medium-sized businesses (SMBs) who lose time to admin and make the buying decision themselves. Accounting, legal and consultancy firms are the clearest fit, because they run on documents, deadlines and client trust. Any SMB that works the same way counts equally.

They're usually busy doing client work, skeptical of AI hype, and evaluating whether one outside partner can be trusted with their brand, their client pipeline and their back office.

## Product Purpose

Assembly Engine is a one-person studio run by Nick Smid. It builds the systems a firm runs on: the brand and website foundation, plus the automations that take over admin. This site has to convince an owner to book a free audit (a call booked through Cal.com, or the contact form).

Success means qualified owners book the audit, and they arrive already understanding what Assembly Engine would build for them.

## Positioning

- **Brand and automation as one system.** One partner builds the brand and website foundation and also the automations that run on top of it. The five services (Brand & Digital Presence, Customer Acquisition, Operational Automation, Invoice & Payment Automation, Business Reporting Automation) are sold as one system, not separate products.
- **Results before AI.** Every project starts with the business problem and then picks the right tool: design, code, automation, sometimes AI, sometimes no AI at all. This is a deliberate counter to "AI for the sake of AI".

## Operating Context

- Bilingual site: Dutch is the default locale (`/nl`), with English at `/en`. The language is chosen by cookie, then by the browser's `Accept-Language` header.
- Buyers evaluate the offer around their own tools. The site names HubSpot, Microsoft 365, Google Workspace, Moneybird, Exact Online, Twinfield, Mollie, Power BI, Cal.com, n8n, WordPress and Slack.
- The process as currently stated: Discover → Design → Build → Launch → Improve, with "live within four weeks" and one partner from audit to aftercare. These are claims in the current copy, not core positioning.
- Nick works remotely across the Netherlands and visits clients on site when useful.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, Tailwind 3 and Framer Motion. The front end only, apart from `/api/contact`.
- Pages: home, five service pages, About, Contact (a multi-step form, then Cal.com booking), Blog index and articles, and the Energielabel Breda case study.
- Not built yet: blog articles are placeholders (set to noindex), the newsletter signup isn't connected to a mailing tool, and Privacy and Terms pages don't exist.
- Some animated sections still run as iframe embeds (`public/embeds/*.html`) and are meant to become native React components later.
- **Undecided:** the hero currently addresses only professional services firms, while the confirmed audience is SMB owners more broadly. How the copy should balance the two is open.

## Brand Commitments

- Name: Assembly Engine. The official wordmark lives in `public/brand/` (`wordmark.svg` and `wordmark-white.svg`).
- Voice: use "we" for the company and its services, and "I" for Nick's personal story on About. Never hide that it's one person.
- Honest and specific: real numbers when they exist, and say plainly when they don't yet.
- Tone counters hype: plain language about business outcomes rather than AI buzzwords.

## Evidence on Hand

- **Case study:** Energielabel Breda (owner Jan-Willem Ooms), Brand & Digital Presence, live since 14 October 2026. The site grew from 3 to 20+ pages. PageSpeed scores from 15 October 2026: 92 mobile performance, 100 desktop, 100 SEO, 96 accessibility, 100 best practices. Mobile LCP went from about 6.6 s to 2.2–3.4 s (lab). There is no before/after PageSpeed score because the old site was never measured. Business results (requests and Search Console data) come after 2–3 months.
- **Founder:** Nick Smid, photo at `public/images/nick-smid.jpg`.
- **Demo:** a product demo video in `public/video/`.
- **Example data:** Van Dijk Accountancy, De Vries Installatie, Peter, Sanne and all amounts are fictional and always labelled as examples.
- **Absent, never fabricate:** client testimonials, client logos, additional case studies, pricing, team members and published articles.

## Product Principles

1. **The problem comes before the tool.** Lead with the owner's lost time, missed clients and untrusted numbers, not with technology.
2. **One system, one partner.** Show how brand, acquisition, operations, invoicing and reporting connect, rather than presenting five separate offers.
3. **Honest proof.** Show only measured, dated evidence. Label examples as examples, and mark where numbers are still to come.
4. **Fits the firm.** Automations work inside the software and routines the firm already has.
5. **Show, don't claim.** Demonstrations of real workflows do the persuading, not adjectives.

## Accessibility & Inclusion

- Bilingual (NL/EN), so every user-facing string, including ARIA labels, must exist in both languages.
- The site respects `prefers-reduced-motion` throughout. Keep it that way for any new motion.
