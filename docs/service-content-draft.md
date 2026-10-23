# Service pages · content draft

> **Status: CONFIRMED by the owner (phase 1 review, 18 Oct 2026), with the changes in the changelog below.**
> The live text is in `lib/i18n/{nl,en}.ts` (per service: `tools`, `included`, `excluded`, `faq`) and reaches
> the pages through the `service_scope` and `service_faq` blocks. The tables further down are the original
> draft, kept for reference; where they differ from the changelog, the changelog and `lib/i18n` win.

## Changelog (draft → live)

**All services**
- "Tools" became a "Werkt onder meer met / Works with, among others" strip with up to six tools, followed by
  "of met de software die u al gebruikt / or with the software you already use". Only tools from the owner's
  list appear, ordered by recognition for Dutch accounting, legal and consultancy firms.
- The capabilities ledger (`service_capabilities`, the old "grid") is replaced by `service_scope`: what you get,
  what's not included, and the tools strip. Its heading (`gridTitle`) is kept. The old block is archived in
  `archive/service-pages-v1/`.
- Stated as fact, as confirmed: a data processing agreement (verwerkersovereenkomst) with every client;
  maintenance and monitoring after launch included; hosting, domain, licences and accounts always in the
  client's name; weekly acquisition reporting (contacted, replied, booked).
- Made generic: "een uur voor de kick-off" (removed), named time trackers ("uw urenregistratie"),
  named practice software ("uw praktijksoftware / klantportaal").

**Brand & Digital Presence**
- Tools: WordPress + Elementor Pro, Adobe Creative Cloud, Figma, Next.js, Vercel, Cal.com of Calendly.
  Blender and Higgsfield are allowed but not shown (six max). Google Bedrijfsprofiel and Search Console
  dropped from the tools; technical SEO stays a deliverable.
- Booking line made tool-neutral ("online afspraken plannen via bijvoorbeeld Cal.com of Calendly").
- FAQ "Op welk platform bouwt u?": rewrite, plus the per-client choice (Next.js on Vercel for speed,
  WordPress + Elementor Pro when you want to edit pages yourself), both in your name.

**Customer Acquisition**
- Tools: Microsoft 365 (Outlook, Teams), HubSpot, Google Workspace, n8n, AI-agents op maat (LangChain).
  **Five, not six:** the owner's list has only five tools for this service.
- Pipedrive removed everywhere, including the CRM FAQ.
- Added to "What you get": agents (built with LangChain) that gather fitting companies and signals.
- FAQ "Is dit koude e-mail?": rewrite. Basis: legitimate interest (B2B), an opt-out in every message,
  no mass mail, no bought lists.

**Operational Automation**
- Tools: Microsoft 365 (SharePoint, OneDrive, Outlook, Teams), Copilot Studio, Google Workspace, n8n,
  AI-agents op maat (LangChain). **Five**, for the same reason.
- Added to "What you get": an assistant in your own Microsoft 365 (built in Copilot Studio) that answers
  questions about dossiers.
- FAQ "klantgegevens": rewrite, including the verwerkersovereenkomst.

**Invoice & Payment Automation**
- Tools: Exact Online, Twinfield, Moneybird, Mollie, Stripe, and "DocuSign, Adobe Acrobat Sign of PandaDoc"
  as one entry for quotes and signatures (to stay within six).

**Business Reporting Automation**
- Tools: Power BI, Excel, Exact Online, Twinfield, Moneybird, HubSpot. Looker Studio and a custom-coded
  dashboard are named in the FAQ instead of the strip (six max). Microsoft 365 as a source is on the owner's
  list but not shown anywhere on this page yet.
- FAQ rewrites applied: alerts, reliability, and "which tools" (Power BI, Excel or Looker Studio, or a
  dashboard built to measure).
- **Open:** the signature's example and the locked homepage moment name "Toggl Track" as a source. Kept
  per decision 4 (Reporting example stays as is); flagged in the phase 2 report.

How to read the FAQ tables:
- **Keep**: the current answer is accurate as far as I can tell; still confirm.
- **Rewrite**: the current answer makes a claim I can't verify (marked ⚠︎) or reads vaguely; a proposal follows.

---

## 1 · Merk & Online Zichtbaarheid / Brand & Digital Presence

**Tools (3–6)** · confirmed (see changelog)
| Tool | Why it's listed | Check |
|---|---|---|
| Figma | Logo, huisstijl, page design | Do you design in Figma? |
| WordPress + Elementor Pro | Used for Energielabel Breda (case facts) | ✔ in the case facts |
| Next.js | Coded sites ("een gecodeerde site", FAQ) and the Energielabel Breda prototype | ✔ in the case facts |
| Google Bedrijfsprofiel | In the current deliverables grid | Do you set this up? |
| Cal.com | In the homepage moment (booking) | Do you actually use Cal.com? |
| Google Search Console | Technical SEO | Assumed. Confirm. |

**Wat u krijgt / What you get** (4–6) · confirmed (see changelog)
| NL | EN |
|---|---|
| Een logo en huisstijl, vastgelegd in een merkgids die van u is. | A logo and identity, set down in a brand guide you own. |
| Een website die zegt wat u doet, voor wie en waar, met teksten per dienst. | A website that says what you do, for whom and where, with copy per service. |
| Een aanvraagformulier dat aanvragen direct in uw CRM of mailbox zet. | An enquiry form that puts requests straight into your CRM or inbox. |
| Online afspraken plannen vanaf elke pagina. | Online booking from every page. |
| Technische SEO en een ingericht Google-bedrijfsprofiel. | Technical SEO and a set-up Google Business Profile. |
| Een meting vóór en na de lancering: snelheid, toegankelijkheid, aanvragen. | A measurement before and after launch: speed, accessibility, enquiries. |

**Niet inbegrepen / What's not included** · confirmed (see changelog)
| NL | EN |
|---|---|
| Fotografie en video (we werken met uw beeld of adviseren een fotograaf). | Photography and video (we use your images or recommend a photographer). |
| Doorlopend content schrijven of social media beheren. | Ongoing content writing or social media management. |
| Betaalde advertenties (Google Ads, LinkedIn Ads). | Paid advertising (Google Ads, LinkedIn Ads). |
| Webshops met betaling en voorraad. | Web shops with checkout and stock. |
| Hosting en domein op onze naam: alles staat op uw naam. | Hosting and domain in our name: everything is in yours. |

**FAQ** (4)
| # | Question | Verdict | Proposed answer (NL / EN) |
|---|---|---|---|
| 1 | Moet ik al een logo hebben? | Keep | — |
| 2 | Op welk platform bouwt u? | Rewrite (more specific) | NL: "We ontwerpen eerst en kiezen dan het platform: WordPress als u zelf pagina’s wilt aanpassen, of een gecodeerde site (Next.js) als snelheid voorop staat. Beide staan op uw naam." / EN: "We design first, then choose the platform: WordPress if you want to edit pages yourself, or a coded site (Next.js) when speed comes first. Both are in your name." |
| 3 | Kunt u met mijn huidige website verder? | Keep | — |
| 4 | Wat moet ik zelf aanleveren? | Keep; ⚠︎ "een uur voor de kick-off": confirm the hour | — |

---

## 2 · Klantwerving / Customer Acquisition

**Tools** · confirmed (see changelog)
| Tool | Why | Check |
|---|---|---|
| HubSpot | Homepage moment, FAQ | Confirm |
| Pipedrive | Named in the FAQ | Do you support Pipedrive in practice? |
| LinkedIn (Sales Navigator) | Signals and research | Do you use it? Mind LinkedIn's automation rules. |
| n8n | Agent workflows | Confirm it's your workflow tool |
| Microsoft 365 / Google Workspace | Sending from the firm's own mailbox | Confirm |

**Wat u krijgt** · confirmed (see changelog)
| NL | EN |
|---|---|
| Een uitgeschreven ideaal klantprofiel met de signalen waarop we letten. | A written ideal client profile with the signals we watch for. |
| Een korte lijst passende bedrijven per week, met waarom ze nu passen. | A short list of fitting firms each week, with why they fit now. |
| Een concept van elk eerste bericht, dat op uw goedkeuring wacht. | A draft of every first message, waiting for your approval. |
| Opvolging en een bijgewerkt CRM, zonder overtypen. | Follow-up and an up-to-date CRM, with no retyping. |
| Een wekelijks overzicht: benaderd, gereageerd, gepland. | A weekly overview: contacted, replied, booked. |

**Niet inbegrepen** · confirmed (see changelog)
| NL | EN |
|---|---|
| Gekochte adreslijsten of massamailings. | Bought lists or mass mailings. |
| Telefonische acquisitie (cold calling). | Phone prospecting (cold calling). |
| Advertentiecampagnes. | Ad campaigns. |
| Garanties op een aantal afspraken. | Guarantees on a number of meetings. |

**FAQ**
| # | Question | Verdict | Proposed answer (NL / EN) |
|---|---|---|---|
| 1 | Is dit koude e-mail? | Rewrite (answer the question directly; mention the law) | NL: "Nee, geen massamail. We benaderen een korte lijst bedrijven die passen en een reden hebben om te praten, persoonlijk en binnen de AVG-regels, met in elk bericht een afmelding." / EN: "No, not mass email. We approach a short list of firms that fit and have a reason to talk, personally and within GDPR rules, with an opt-out in every message." ⚠︎ Confirm the legal basis you use (legitimate interest, B2B). |
| 2 | Welk CRM heb ik nodig? | Keep; ⚠︎ Pipedrive (see tools) | — |
| 3 | Versturen agents zelf berichten? | Keep | — |
| 4 | Wanneer zie ik de eerste afspraken? | Keep; ⚠︎ "rapporteren er wekelijks over" is a commitment: confirm | — |

---

## 3 · Operationele Automatisering / Operational Automation

**Tools** · confirmed (see changelog)
| Tool | Why | Check |
|---|---|---|
| Microsoft 365 (Outlook, SharePoint) | Homepage moment | Confirm |
| Google Workspace | Alternative stack | Confirm |
| n8n | Workflows | Confirm |
| A client portal (e.g. a portal from the practice software) | FAQ: "uw klantportaal" | Which portals have you connected? |
| A practice-management package | FAQ: "praktijksoftware" | Name the packages you support. |

**Wat u krijgt** · confirmed (see changelog)
| NL | EN |
|---|---|
| Een uitgewerkte procesbeschrijving van hoe het nu loopt en hoe het straks loopt. | A written map of how the process runs today and how it will run. |
| Workflows voor onboarding, documentaanvragen en herinneringen. | Workflows for onboarding, document requests and reminders. |
| Binnenkomende documenten herkend, benoemd en in het juiste dossier gezet. | Incoming documents recognised, named and filed in the right dossier. |
| Een statusoverzicht per klant en per deadline. | A status overview per client and per deadline. |
| Een logboek van elke handeling. | A log of every action. |
| Onderhoud: we bewaken de workflows en passen ze aan. | Maintenance: we monitor and adjust the workflows. |

**Niet inbegrepen** · confirmed (see changelog)
| NL | EN |
|---|---|
| Vervanging van uw praktijk- of boekhoudsoftware. | Replacing your practice or accounting software. |
| Inhoudelijk werk (de aangifte, het advies) blijft bij uw team. | The professional work itself (the return, the advice) stays with your team. |
| Migratie van uw volledige archief. | Migrating your full archive. |
| IT-beheer van laptops, netwerk of licenties. | IT management of laptops, network or licences. |

**FAQ**
| # | Question | Verdict | Proposed answer |
|---|---|---|---|
| 1 | Met welke processen kunnen we het best beginnen? | Keep | — |
| 2 | Hebben we nieuwe software nodig? | Keep | — |
| 3 | Hoe zit het met klantgegevens? | Rewrite (⚠︎ "elke handeling wordt vastgelegd" must be true for every build; add where data lives) | NL: "Elke stap krijgt alleen toegang tot wat die nodig heeft. Gegevens blijven in uw eigen systemen (bijvoorbeeld Microsoft 365) en elke handeling komt in een logboek dat u kunt inzien. We sluiten een verwerkersovereenkomst met u af." / EN: "Each step only gets access to what it needs. Data stays in your own systems (for example Microsoft 365) and every action goes into a log you can read. We sign a data processing agreement with you." ⚠︎ Confirm you offer a verwerkersovereenkomst. |
| 4 | Wie onderhoudt het? | Keep; ⚠︎ confirm maintenance is part of every engagement (homepage process says "Doorlopend") | — |

---

## 4 · Factuur- & Betaalautomatisering / Invoice & Payment Automation

**Tools** · confirmed (see changelog)
| Tool | Why | Check |
|---|---|---|
| Moneybird | Homepage moment, FAQ | Confirm |
| Exact Online | FAQ | Confirm |
| Twinfield | FAQ | Confirm you have connected it |
| Mollie | Homepage moment, FAQ | Confirm |
| Toggl Track (or other time tracking) | "Uren naar factuur" | Which time trackers do you support? |

**Wat u krijgt** · confirmed (see changelog)
| NL | EN |
|---|---|
| Facturen uit uw uren of afspraken, klaar ter controle of direct verstuurd. | Invoices from your hours or agreements, ready to check or sent straight away. |
| Een betaallink in elke factuur (iDEAL, kaart, overboeking). | A payment link in every invoice (iDEAL, card, transfer). |
| Een herinneringsschema dat u per klant aan- of uitzet. | A reminder schedule you switch on or off per client. |
| Betalingen automatisch gematcht en geboekt. | Payments matched and booked automatically. |
| Een kasoverzicht: wat openstaat, te laat is en verwacht wordt. | A cash overview: what's open, late and expected. |

**Niet inbegrepen** · confirmed (see changelog)
| NL | EN |
|---|---|
| Incasso en deurwaarderstrajecten. | Debt collection and bailiff procedures. |
| Uw boekhouding of btw-aangifte zelf. | Your bookkeeping or VAT return itself. |
| Kosten van de betaalprovider (die betaalt u direct aan bijvoorbeeld Mollie). | Payment provider fees (paid directly to, for example, Mollie). |

**FAQ**
| # | Question | Verdict | Proposed answer |
|---|---|---|---|
| 1 | Welke boekhoudsoftware ondersteunt u? | Keep; ⚠︎ only list packages you've built on | — |
| 2 | Kan ik facturen controleren voordat ze verstuurd worden? | Keep | — |
| 3 | Hoe werken de betaallinks? | Keep | — |
| 4 | Kunnen herinneringen voor een klant uit? | Keep | — |

---

## 5 · Rapportage-automatisering / Business Reporting Automation

**Tools** · confirmed (see changelog)
| Tool | Why | Check |
|---|---|---|
| Power BI | FAQ, homepage moment, signature | Confirm |
| Looker Studio | FAQ | Confirm you build in it |
| Exact Online | Signature source | Confirm |
| Toggl Track | Signature source | Confirm, or name the time tracker you support |
| HubSpot | Signature source | Confirm |
| Microsoft 365 (Outlook) | The Monday summary | Confirm |

**Wat u krijgt** · confirmed (see changelog)
| NL | EN |
|---|---|
| Eén dashboard met omzet, uren, openstaande facturen en pijplijn. | One dashboard with revenue, hours, open invoices and pipeline. |
| Bij elk cijfer de herkomst: bron, gegevens en synchronisatietijd. | The source of every figure: system, data and sync time. |
| Elke ochtend ververst, vóór het werk begint. | Refreshed every morning, before work starts. |
| Elke maandag een korte samenvatting in gewone taal. | A short plain-language summary every Monday. |
| Meldingen zodra een cijfer een grens passeert. | Alerts when a figure crosses a threshold. |
| Een controle tegen uw boekhouding vóór de livegang. | A check against your books before go-live. |

**Niet inbegrepen** · confirmed (see changelog)
| NL | EN |
|---|---|
| Licenties voor Power BI of andere software (op uw naam). | Licences for Power BI or other software (in your name). |
| Het opschonen van historische brondata. | Cleaning up historical source data. |
| Financieel advies over wat de cijfers betekenen. | Financial advice on what the figures mean. |
| Realtime (seconde-voor-seconde) data: we verversen dagelijks. | Real-time (second-by-second) data: we refresh daily. |

**FAQ**
| # | Question | Verdict | Proposed answer |
|---|---|---|---|
| 1 | Welke tools gebruikt u voor dashboards? | Keep | — |
| 2 | Waar komen de gegevens vandaan? | Keep | — |
| 3 | Kan ik meldingen krijgen in plaats van dashboards? | Rewrite (⚠︎ "Veel partners hebben liever…" claims client behaviour we can't source) | NL: "Ja. U kunt ook alleen de wekelijkse samenvatting en een melding ontvangen als een cijfer een grens passeert, zonder dashboard te openen." / EN: "Yes. You can receive only the weekly summary and an alert when a figure crosses a threshold, without opening a dashboard." |
| 4 | Hoe betrouwbaar zijn de cijfers? | Rewrite (tie it to the signature: lineage) | NL: "Zo betrouwbaar als uw brondata. Bij elk cijfer ziet u uit welk systeem het komt en wanneer het is gesynchroniseerd, en vóór de livegang controleren we alles tegen uw boekhouding." / EN: "As reliable as your source data. Every figure shows which system it came from and when it synced, and before go-live we check everything against your books." |

---

## Also to confirm (all services)

- The Reporting signature's example data (Van Dijk Accountancy, October: € 84.200 revenue, 1.214 h logged / 862 billable, € 126.000 pipeline, € 98 per billable hour) is fictional and matches the homepage moment. It is labelled "Voorbeeld · fictief kantoor".
- The homepage process (5 steps, "Live binnen 4 weken") now appears on every service page, as decided.
