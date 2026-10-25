import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p><em>Last updated: 25 October 2026. This topic is still moving; we'll update this article after the internet consultation, and again once the bill is published.</em></p>
<p>The Dutch government wants businesses to invoice each other electronically from 2030, and to report those invoices one by one to the Belastingdienst, the Dutch tax authority. It isn't law yet, so the dates below are expectations. Even so, there are steps you can take now that pay for themselves, whatever the final rules look like.</p>

<h2>What has been decided, and what hasn't</h2>
<p>The cabinet has chosen mandatory e-invoicing for domestic and intra-EU transactions between businesses, combined with digital VAT reporting (<a href="https://www.taxlive.nl/nl/documenten/vn-vandaag/kabinet-kiest-voor-verplichte-e-facturatie-en-digitale-rapportage-bij-binnenlandse-b2b-transacties/">Taxlive</a>). An internet consultation follows in autumn 2026. The bill should reach the Tweede Kamer, the Dutch lower house, before the 2027 summer recess (<a href="https://www.grantthornton.nl/insights/tax/btw/nederland-zet-in-op-brede-uitrol-van-e-facturatie-en-digitale-btw-rapportage/">Grant Thornton, September 2026</a>). On 25 October 2026 that consultation hadn't opened yet. The planned dates are e-invoicing between Dutch businesses from 1 July 2030 and digital reporting from 1 July 2031, with businesses under the KOR exempt (<a href="https://www.accountant.nl/nieuws/2026/9/kabinet-wil-e-facturatie-vanaf-2030-verplicht-maken/">Accountant.nl, September 2026</a>).</p>
<p>Until the law exists, a lot can still shift: the dates, the exemptions, the technical requirements. So write "expected" next to every date, in your own planning too.</p>


<!--block:notlaw-->
<h2>The expected timeline</h2>

<!--block:timeline-->

<p>Source for the 2030 and 2031 dates: <a href="https://www.sra.nl/nieuws/011102/2026/09/verplichte-e-facturering-tussen-bedrijven-vanaf-1-juli-2030">SRA, September 2026</a>.</p>

<h2>What changes</h2>
<p>A PDF sent by email won't be enough. An e-invoice is a structured file in an EU standard format that software can read without anyone retyping it. You'll have to issue it within ten working days (<a href="https://www.sra.nl/nieuws/011102/2026/09/verplichte-e-facturering-tussen-bedrijven-vanaf-1-juli-2030">SRA</a>).</p>
<p>On top of that, you'll report invoices one by one, first for intra-EU transactions and a year later for domestic ones too. The Belastingdienst then sees your sales and purchases much sooner, and in much more detail, than it does now through the periodic VAT return.</p>
<p>Today a PDF invoice is perfectly allowed. There's no reason to overhaul your invoicing in a panic. It is sensible to know how far along your software is.</p>
<h3>An example of the difference</h3>
<p>Take an imaginary installation company, De Vries Installatie. Today the bookkeeper creates an invoice in the accounting package, saves it as a PDF and emails it to the customer. The customer retypes the details into their own package, or has software read the PDF. Under the new rules the invoice goes as a structured file straight into the customer's package. Amounts, VAT and invoice number arrive correctly, with no retyping. And the data goes to the Belastingdienst as well.</p>
<p>For the sender, the change is mostly in the software. For the receiver, a step disappears, and that saves time, provided the software cooperates.</p>

<!--block:compare-->
<h3>What per-invoice reporting means</h3>
<p>Today you file a VAT return periodically, based on your books for a month or a quarter. Mistakes in invoices often only surface at that return. With per-invoice reporting the Belastingdienst sees each invoice shortly after it's issued. A wrong VAT rate or a missing VAT number gets noticed sooner.</p>
<p>That calls for books that are up to date. If you currently enter invoices at the end of the quarter, you'll have to work differently. How the reporting will work technically isn't settled yet; that will follow from the bill.</p>

<h2>Who is exempt</h2>
<p>Businesses using the small business scheme (kleineondernemersregeling, KOR) are exempt from the domestic e-invoicing obligation (<a href="https://www.sra.nl/nieuws/011102/2026/09/verplichte-e-facturering-tussen-bedrijven-vanaf-1-juli-2030">SRA</a>). Note that this is about sending. A KOR business that receives invoices from suppliers will also get e-invoices and needs to be able to process them.</p>
<p>Invoices to consumers fall outside these plans, because they cover transactions between businesses.</p>

<h2>Is your invoicing software ready?</h2>
<p>Most businesses aren't yet. Research by Billogram (June 2025) found that only about 10% of SMBs are ready for mandatory e-invoicing, and that 46% still email PDF invoices (<a href="https://www.mkbservicedesk.nl/nieuws/ondernemersnieuws/slechts-1-op-de-10-mkbers-klaar-voor-verplichte-e-facturatie-per-2026">MKB Servicedesk</a>). That study was about Belgium's 2026 deadline, and the respondents weren't exclusively Dutch. Treat it as an indication of where SMBs stand, nothing more.</p>
<p>Changes in laws and regulations are also the top financial-admin worry for 32% of Dutch SMBs (<a href="https://files.exact.com/static/web/pdf/mkb-barometer/2025/NL_All-mkb-barometer-2025.pdf">Exact MKB Barometer 2025</a>). Asking a few questions now means less to do later.</p>
<p>Questions you can put to your software vendor:</p>
<ol>
<li>Can the package already send and receive structured e-invoices? In which format?</li>
<li>Over which network? Many vendors work with Peppol. Which network the Dutch rules will require hasn't been decided yet.</li>
<li>What's the plan for per-invoice digital reporting, and when will it be available?</li>
<li>Will your connections (with your CRM, your web shop or your payment provider) still work, or do they need to change too?</li>
</ol>
<p>We don't name packages as ready here, because support changes quickly and the Dutch requirements aren't fixed yet. Your vendor's answer to these questions tells you more.</p>

<h2>What accounting firms can offer their clients</h2>
<p>For an accounting or bookkeeping firm, this is a conversation you can have with every business client from 2027. Which software does the client use? Do they still invoice from Word or Excel? Are they under the KOR, and do they receive e-invoices?</p>
<p>You can record per client how far along they are, and guide a switch before the deadline gets close. An automation can help: a questionnaire to every client, the answers in one overview, and a reminder for anyone who hasn't replied. The advice itself is your firm's work.</p>
<p>Questions that fit such a questionnaire: which package do you invoice from? Do you invoice businesses in other EU countries? Do you use the KOR? Do you already receive e-invoices from suppliers? The answers quickly show which clients have work to do and which have little.</p>

<h2>What you don't need to do yet</h2>
<p>Buying a new package just for e-invoicing is premature right now. The technical requirements aren't fixed. Ask your current vendor what they're planning first, and hold off on big decisions until the bill is out. You can still switch then, with more certainty about what's needed.</p>
<p>You don't need to change your current invoices either. Until the law is in place, the existing invoicing rules apply.</p>

<h2>Steps you won't regret</h2>
<p>These steps pay off even if the rules change:</p>

<!--block:steps-->

<p>That last one is where we come in most often. A connection that forwards a PDF today will need to pass on a structured file. It's usually manageable, if you know about it in time. For more on invoices and payments, read <a href="/en/blog/automatic-payment-reminders">automatic payment reminders</a>.</p>
` + auditCta("en");

export const cover = { alt: "Line drawing: a stack of paper invoices on the left, the same invoice as a grid of structured cells on the right." };

export const blocks: PostBlocks = {
  "notlaw": {
    "acf_fc_layout": "callout",
    "tone": "note",
    "title": "Not law yet",
    "body": "Every date in this article is an expectation. The dates, the exemptions and the technical requirements can still change until the bill is passed.",
    "link": null
  },
  "timeline": {
    "acf_fc_layout": "timeline",
    "title": "The expected timeline",
    "items": [
      {
        "date": "Autumn 2026",
        "title": "Internet consultation on the bill",
        "text": null,
        "expected": true
      },
      {
        "date": "Before summer 2027",
        "title": "The bill goes to the Tweede Kamer",
        "text": null,
        "expected": true
      },
      {
        "date": "1 July 2030",
        "title": "E-invoicing mandatory for domestic and intra-EU B2B transactions",
        "text": "Per-invoice digital reporting for intra-EU B2B starts the same day, replacing the Opgaaf ICP.",
        "expected": true
      },
      {
        "date": "1 July 2031",
        "title": "Digital reporting for domestic transactions",
        "text": null,
        "expected": true
      }
    ],
    "caption": null
  },
  "compare": {
    "acf_fc_layout": "diagram",
    "src": "/blog/e-invoicing-mandatory-2030/pdf-vs-structured.en.svg",
    "alt": "Today: your accounting package creates a PDF, it goes by email, the customer retypes it, and it lands in the customer's package. Expected from 1 July 2030: your package sends a structured e-invoice straight into the customer's package, and the invoice is reported to the Belastingdienst one by one, EU transactions first and domestic ones expected from 2031.",
    "caption": "The expected route. The technical details follow from the bill.",
    "source": {
      "title": "SRA, September 2026",
      "url": "https://www.sra.nl/nieuws/011102/2026/09/verplichte-e-facturering-tussen-bedrijven-vanaf-1-juli-2030",
      "target": "_blank"
    }
  },
  "steps": {
    "acf_fc_layout": "checklist",
    "id": "e-invoicing-steps",
    "title": "Steps you won't regret",
    "items": [
      {
        "id": "i1",
        "text": "Invoice from one system, with no loose Word invoices next to your accounting package"
      },
      {
        "id": "i2",
        "text": "Check your customers' KvK number, VAT number and billing address in your package"
      },
      {
        "id": "i3",
        "text": "Ask suppliers for e-invoices, so you practise receiving them"
      },
      {
        "id": "i4",
        "text": "List the connections that pass invoices along; they'll need to handle a different format"
      }
    ]
  }
};
