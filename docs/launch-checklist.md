# Launch checklist

For: Nick · Started 18 Oct 2026 (after the phase 3 review) · Tick each box, or write "no" with a note, and I'll act on it.

## 1. Logo rules: 7 vendors to check

Rule until you've answered: every logo stays as it is. If a vendor says no, tell me and I'll switch that tool to its name in Manrope (in WordPress: clear the tool's `logo` field).

How we use every logo: the vendor's own mark, **solid black (#000)**, unchanged except for cropping, 26–40 px high, in a list headed "Werkt onder meer met" / "Works with, among others", with no partner or endorsement wording. Details per file: `docs/logo-usage.md`.

| ✓ | Vendor (used on) | Brand guidelines | The question to check |
|---|---|---|---|
| ☐ | **WordPress** (Brand) | [wordpress.org/about/logos](https://wordpress.org/about/logos/) · [WordPress Foundation trademark policy](https://wordpressfoundation.org/trademark-policy/) | Is the black one-colour WordPress logotype allowed to name WordPress as a tool we work with on a commercial site? |
| ☐ | **Blender** (Brand) | [blender.org/about/logo](https://www.blender.org/about/logo/) | Is a solid black version of the Blender logo (the eye filled black, no white inner circle) allowed, or only the official colour/white versions? |
| ☐ | **Next.js** (Brand) | [vercel.com/geist/brands](https://vercel.com/geist/brands) (Next.js assets are on the Vercel brand page) | Is the black Next.js wordmark allowed for third-party "works with" use? |
| ☐ | **Vercel** (Brand) | [vercel.com/geist/brands](https://vercel.com/geist/brands) | Is the black Vercel logo (triangle + wordmark) allowed for third-party "works with" use? |
| ☐ | **HubSpot** (Acquisition, Reporting) | [hubspot.com/media-kit](https://www.hubspot.com/media-kit) (press logos and usage notes) | Is a solid black version of the HubSpot logo allowed, or must it be the orange (or all-white) version? |
| ☐ | **Stripe** (Invoicing) | [Stripe's Mark Usage Terms](https://stripe.com/legal/marks) · [Stripe press assets](https://stripe.com/newsroom/information) | Is the black Stripe wordmark allowed (the main one is blurple), and do the Mark Usage Terms allow naming Stripe as a tool we integrate with? |
| ☐ | **DocuSign** (Invoicing) | [brand.docusign.com](https://brand.docusign.com/) | Is a solid black one-colour DocuSign logo allowed for third-party "works with" use? |

Already fine: **Figma** (its own black wordmark, unchanged; checked against figma.com/using-the-figma-brand) and **LangChain** (MIT-licensed mark, monochrome by default).

## 2. Brand proof wording: for your OK

Shown in the Brand signature's "Echt: Energielabel Breda" view. The homepage facts come from the case study you already approved. The **service** and **contact** facts are new.

**Home** (already approved, unchanged)

| NL | EN | Source |
|---|---|---|
| 100 · Prestaties, desktop | 100 · Performance, desktop | Google PageSpeed Insights, homepage, 15 Oct 2026 |
| 92 · Prestaties, mobiel | 92 · Performance, mobile | same |
| 2,2–3,4 s · Largest Contentful Paint, mobiel (was ±6,6 s) | 2.2–3.4 s · Largest Contentful Paint, mobile (was ±6.6 s) | Lab measurement (local Lighthouse), 14–15 Oct 2026 |
| 100 · SEO / 96 · Toegankelijkheid | 100 · SEO / 96 · Accessibility | Google PageSpeed Insights, homepage, 15 Oct 2026 |

**Service page** (energielabel-breda.nl/energielabel-woning), new

| ✓ | NL | EN | Source |
|---|---|---|---|
| ☐ | 3 → 20+ · Pagina’s | 3 → 20+ · Pages | Old sitemap (April 2026) vs new site (October 2026) |
| ☐ | 8 · Dienstpagina’s | 8 · Service pages | New site, October 2026 |
| ☐ | 4 · Locatiepagina’s: Breda, Etten-Leur, Oosterhout, Teteringen | 4 · Location pages: Breda, Etten-Leur, Oosterhout, Teteringen | New site, October 2026 |

**Contact page** (energielabel-breda.nl/contact), new

| ✓ | NL | EN | Source |
|---|---|---|---|
| ☐ | 4 · Manieren om contact op te nemen: bellen, WhatsApp, e-mail, formulier | 4 · Ways to get in touch: phone, WhatsApp, email, form | energielabel-breda.nl/contact, checked 18 Oct 2026 |
| ☐ | 15 · Pagina’s met het aanvraagformulier, dat het adres invult op postcode | 15 · Pages with the request form, which fills in the address from the postcode | New site, October 2026 |

Also check the screenshots: the service and contact pages were captured from the live site on 18 Oct 2026. The homepage uses the earlier capture (the live homepage rendered unstyled in a headless browser that day).

## 3. Before launch

| ✓ | What | How |
|---|---|---|
| ☐ | **PageSpeed Insights after deploy** | Run [pagespeed.web.dev](https://pagespeed.web.dev/) on the production URL of `/nl`, `/en` and all five service pages (NL), mobile and desktop. Target: mobile performance ≥ 90, accessibility ≥ 95, CLS ≤ 0.02. Local runs were noisy (machine under load); Brand in particular needs a real-hardware number. |
| ☐ | **Real-device test: Reporting** | Phone: tap each KPI tile; the source strip and lineage update. Laptop: the 3D dashboard appears, and clicking a tile lifts its sources. |
| ☐ | **Real-device test: Operations** | Phone: switch client and period, tap a missing document; the route and reminders update. Laptop: the 3D dossier appears and the document travels into its slot. |
| ☐ | **Real-device test: Brand** | Phone: switch page and device, pick a brand-guide item, flip "Echt: Energielabel Breda". Laptop: the page puts itself together when it scrolls into view; "Uit elkaar halen" takes it apart. |
| ☐ | **Real-device test: Acquisition** | Phone and laptop: change sector, size and region; firms move above or below the line and their ticks change. Pick a firm, press “Goedkeuren”; “Benaderd” goes up by one. |
| ☐ | **Real-device test: Invoicing** | Phone and laptop: pick each client and each hour line; the same line lights up in the invoice, payment and booking. Pick Bakker Advocaten and flip the reminder switch; the planned reminder turns to “Uit”. |
| ☐ | **Reduced motion** | On one phone or laptop, turn on "Reduce motion" (macOS/iOS: Accessibility → Motion). Every signature should show its finished state with no movement, and still respond to taps. |
| ☐ | **Mobile LCP (judge on the live site)** | Local Lighthouse simulates 2.7–3.7 s LCP on mobile (target ≤ 2.5 s); the LCP element is the hero headline. Judge it with PageSpeed Insights on the live URL (field data where available) before deciding on any change. |
| ☐ | **Demo video: NL export** | Export the Dutch version and save it as `public/video/assembly-engine-demo-nl.mp4` (same 1280×720 format as the EN file). /nl picks it up automatically; until then /nl plays the English video. |
| ☐ | **Newsletter (off until a mailing tool is connected)** | Hidden everywhere (header link and forms) by `lib/features.ts`. When a mailing tool is connected and the form really subscribes people, set `NEXT_PUBLIC_FEATURE_NEWSLETTER=1` in production. |
| ☐ | **Contact form: real mail (Resend)** | Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (an address on a domain verified in Resend) in the hosting environment. Without the key the form answers "sent" in development only and mails nothing. After deploy: send one test request in NL and one in EN and check both arrive with every field (services, sliders, message). |
| ☐ | **Cal.com link and look** | Set `NEXT_PUBLIC_CAL_LINK` if the booking link is not `cal.com/nick-assembly-engine/30min`. In Cal.com: set the brand colour to cobalt `#2E5BFF` and the event language to Dutch (the embed currently shows English on /nl). Then book a test slot from step 3 of the form. |
| ☐ | **Real-device test: contact form** | Phone and laptop: fill step 1 with a wrong email (the error shows and the cursor jumps to it), pick services, move and clear a slider on step 2, send. Step 3 shows what you sent and the calendar loads. Also once with the keyboard only (Tab, Space, arrow keys). |
| ☐ | **Real-device test: case study** | Phone and laptop on `/nl/case-studies/energielabel-breda`: switch Home / Service / Contact and Desktop / Phone in "De nieuwe site, pagina voor pagina"; the screenshot and the facts change together. |
| ☐ | **Case study: client quote** | When Energielabel Breda gives a quote (with permission to publish name and role), fill `caseStudy.quote` in `lib/i18n/nl.ts` and `en.ts` (`text`, `name`, `role`). The quote block stays hidden until then. |
| ☐ | **Case study: measure after 2–3 months (mid Dec 2026 – mid Jan 2027)** | Requests per month via the form, and Search Console clicks and impressions, against the months before 14 Oct. Add the results to the case (the timeline's last step says this is coming). |
| ☐ | **Blog: first real article** | Write the body (WordPress rich text, or `POST_BODY` in `lib/content/local.ts` until WordPress is connected). A post with a body is indexed and linked from the blog page automatically; posts without one stay `noindex` and unlinked. |
| ☐ | **Privacy statement and terms** | The footer links "Privacy" and "Voorwaarden" go nowhere (`#`): the pages don't exist. The contact form collects names, emails and phone numbers, so a privacy statement is needed before launch (AVG/GDPR). Send me the texts (or tell me to hide the links until they exist) and I'll add the pages. |
| ☐ | **Copy proposals** | Open items in `docs/copy-suggestions.md` (if any) are approved or dropped. |
| ☐ | **Vendor answers in section 1** | Logos switched to names where a vendor said no. |
