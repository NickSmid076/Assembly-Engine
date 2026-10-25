import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>When we help a firm, we rarely recommend a new package. Usually we connect what's already there. That's a deliberate choice, and below we explain why. We also explain when we do advise replacing something.</p>

<h2>Your books are already digital. The gaps are in between</h2>
<p>At about two-thirds of Dutch SMBs, bookkeeping and payroll already run on software (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>). According to CBS, Dutch firms are even in the EU's top three for digitalisation (<a href="https://www.cbs.nl/en-gb/news/2026/14/dutch-firms-in-top-three-in-eu-for-digitalisation-dutch-population-has-best-digital-skills-in-the-eu">CBS, March 2026</a>).</p>
<p>So there's usually plenty of software. What's missing are the connections between the packages. A client comes in through the contact form, gets entered into the CRM by hand, receives a quote from Word and an invoice from the accounting package. Four systems, and between each pair sits someone retyping.</p>

<h2>What a new package costs</h2>
<p>The licence is the smallest part. A new package means an extra login for everyone, one more place where client data lives, and a new habit the team has to learn.</p>
<p>Among Okta's customers, companies with 2,000 or fewer staff use 72 apps on average, and companies in the Netherlands 108 (<a href="https://www.okta.com/sites/default/files/2024-04/Okta-2024_Businesses_at_Work.pdf">Okta, Businesses at Work 2024</a>). Those are mostly larger organisations than a typical Dutch firm, but the direction is clear. And in a 2022 study of 20 teams, the researchers estimated that workers lose close to four hours a week getting back on track after switching between apps (<a href="https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications">Harvard Business Review, 2022</a>).</p>
<!--block:stat-->

<p>Every new package makes those numbers bigger. So we first check whether what you have can do the job.</p>
<p>An example, with a fictional firm of eight people. It takes on a separate package for client communication. Everyone gets a new login. Client data now lives in the accounting package, the CRM and the new package, and after a few months a client's address is wrong in one of the three. Two colleagues keep emailing from Outlook anyway. The package itself was fine. It just didn't fit how the firm worked.</p>


<!--block:copies-->
<h2>Why firms put off switching, and why that's often sensible</h2>
<p>IT research by the SRA, the Dutch association of accounting firms, shows that firms often delay moving to new software because the current software still works, or because a move would disrupt their workflows (via <a href="https://www.accountancyvanmorgen.nl/2025/07/03/ict-accountancy-2025-trends-cijfers-en-knelpunten-in-de-sector/">Accountancy van Morgen</a>).</p>
<p>We often think that's sensible. A migration takes months, the data has to move, and in the meantime the firm runs half on the old system and half on the new one. If your package does what it should, that money and disruption is often better spent on the connections between your tools.</p>

<h2>What connecting means in practice</h2>
<p>Connecting means that data entered in one place flows automatically to wherever it's needed next. A few examples of what we build, using software many firms already have:</p>
<ul>
<li>A request through the contact form lands as a contact and a deal in HubSpot, with a task for the right colleague.</li>
<li>A signed quote creates a client and a first invoice in Moneybird or Exact Online, with a Mollie payment link in it.</li>
<li>A new client automatically gets a folder in Microsoft 365 or Google Workspace, with your firm's standard structure.</li>
<li>A meeting booked through Cal.com lands in the right calendar and sets up the preparation.</li>
<li>Figures from the accounting package flow into a Power BI report every night.</li>
</ul>
<p>Each of these packages has a public API, and that's what makes the connection possible.</p>
<p>The team keeps working in the screens it knows. What goes away is the retyping.</p>
<p>A connection does need maintenance. If a vendor changes its API, the connection has to follow. That's why we record for every connection which systems it touches and what happens when a step fails: who gets notified, and is it retried later?</p>
<p>We usually build these connections in n8n. Why, and when another tool fits better, is in <a href="/en/blog/n8n-vs-make-vs-zapier-for-dutch-firms">n8n, Make or Zapier</a>.</p>


<!--block:flow-->
<h2>Start with one process</h2>
<p>Connecting doesn't have to be a big project. Start with one process and the systems involved in it. Where you can, let the connection run alongside the old way of working for a while, and check that the results match. Only once the team trusts it do you drop the manual step.</p>
<p>Then comes the next process. That way the whole grows step by step, and you can stop at any point without leaving a half-built system behind. Each connection works on its own.</p>
<p>What you need for this is usually modest: access to the packages you already use, and someone in the office who knows how the process runs now. That colleague often matters more than any software, because they know where the exceptions are.</p>

<h2>Structured, connected data first, then AI</h2>
<p>Many firms want to do something with AI. We understand that. Silverfin's CEO put it this way in September 2026: structured data and connected systems have to come first, before AI can do much (<a href="https://www.accountant.nl/nieuws/2026/9/voor-zes-op-de-tien-accountants-is-ai-de-grootste-gamechanger-voor-hun-beroep/">Accountant.nl</a>).</p>
<p>We agree. An AI tool that has to gather client data from four separate systems makes mistakes. When the data is already correct in one place, every next step gets simpler, with or without AI.</p>

<h2>When replacing is the right call</h2>
<p>Sometimes connecting is the wrong choice. For example when:</p>
<ul>
<li>a package has no API, so every connection becomes a shaky workaround;</li>
<li>the vendor is discontinuing the product or no longer releases updates;</li>
<li>the package no longer fits how your firm works, and your team works around it every day;</li>
<li>you have two packages doing the same thing, and the double entry costs more than a switch.</li>
</ul>
<p>If you're unsure, one question helps: if this package disappeared tomorrow, what would you miss? If the answer is "not much", replacing may be better than connecting. If the answer is "everything in it", connecting is usually the wiser move.</p>
<p>Then we say so, and help with the switch. We still start with what you have, because in most cases that's the cheapest route and your team has nothing new to learn.</p>
` + auditCta("en");

export const cover = { alt: "Line drawing: three existing app windows connected to one shared client record." };

export const blocks: PostBlocks = {
  "stat": {
    "acf_fc_layout": "stat",
    "value": "72",
    "label": "apps on average at companies with 2,000 or fewer staff",
    "source": {
      "title": "Okta, Businesses at Work 2024",
      "url": "https://www.okta.com/sites/default/files/2024-04/Okta-2024_Businesses_at_Work.pdf"
    },
    "note": "Okta's own customer data, so mostly larger organisations than a typical Dutch firm."
  },
  "copies": {
    "acf_fc_layout": "diagram",
    "src": "/blog/build-on-the-software-you-already-use/one-source.en.svg",
    "alt": "Example with fictional client De Vries Installatie. Left: the same address kept in three packages, and the client folder still shows the old address after a move. Right: the CRM is the one source, and the accounting package and client folder copy the address from it automatically.",
    "caption": null,
    "source": null
  },
  "flow": {
    "acf_fc_layout": "flow_diagram",
    "title": "Example: one new client, five systems, no retyping",
    "nodes": [
      {
        "label": "Contact form",
        "detail": "A request comes in",
        "human": false
      },
      {
        "label": "CRM",
        "detail": "Contact, deal and a task for a colleague",
        "human": false
      },
      {
        "label": "Accounting package",
        "detail": "Client and first invoice",
        "human": false
      },
      {
        "label": "Payment link",
        "detail": "In the invoice",
        "human": false
      },
      {
        "label": "Client folder",
        "detail": "Created with your standard structure",
        "human": false
      }
    ],
    "caption": "Generic tool types. Each step uses software the firm already has."
  }
};
