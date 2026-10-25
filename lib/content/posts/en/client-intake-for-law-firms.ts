import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>A new matter rarely starts with legal work. It starts with waiting: for a copy of the ID, for the UBO extract, for the signed engagement letter, for the advance payment. Until those are in, you may not or would rather not begin. So someone in the office calls and emails the client.</p>
<p>A system can take that chasing off your hands. The judgement about the client, the matter and the risk stays with the advocaat. This article is written for Dutch law firms; notaries and legal advisers fall under different rules, and we haven't researched those here.</p>

<h2>What intake legally has to cover</h2>
<p>Three things come back with every new matter. You establish who the client is, and for matters under the Wwft (the Dutch anti-money-laundering act) you carry out full client due diligence, the cliëntenonderzoek. You check whether there's a conflict of interest with other clients of the firm. And you record the agreements with the client in writing, in an engagement letter (opdrachtbevestiging).</p>
<p>The last two steps are covered in a separate article: <a href="/en/blog/engagement-letters-and-conflict-checks-for-law-firms">engagement letters and conflict checks without copy-paste</a>. This one is mostly about the first part: the documents you need from the client.</p>

<h2>When the Wwft applies, and when the procesvrijstelling does</h2>
<p>Advocaten fall under the Wwft only for specific services. Think of property transactions, managing assets, setting up companies, share transactions and comparable tax work. Litigation is covered by the procesvrijstelling, the exemption for litigation work. That exemption is interpreted restrictively (<a href="https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf">NOvA, Handleiding Wwft en UBO-register, 2025</a>).</p>
<p>The first orientation meeting is still outside it. But the client due diligence has to be complete before the business relationship starts, and without a UBO extract you may not enter into a business relationship at all (same source).</p>
<p>Whether a matter falls under the Wwft is the advocaat's decision. An intake form can ask the questions that belong to that decision, and record the outcome. Then every file shows, in the same place, why a matter does or doesn't fall under the Wwft.</p>
<p>Note, as of October 2026: on 10 July 2027 the EU anti-money-laundering regulation (AMLR) takes effect, and the Wwft lapses. From then on, advocaten work directly under the AMLR (<a href="https://www.advocatenorde.nl/voor-advocaten/wwft-en-sanctieregelgeving/europees-aml-pakket">NOvA, Europees AML-pakket</a>). We'll update this article before that date.</p>


<!--block:route-->
<h2>The four moments you wait on the client</h2>
<p>In almost every intake you wait on four things.</p>
<h3>1. The ID document</h3>
<p>A copy of a valid ID document. How you identify the client and verify that identity is set out in the NOvA handleiding.</p>
<h3>2. The UBO extract</h3>
<p>Since 1 August 2024, advocaten must ask the client for a certified UBO extract from the KvK register (the Dutch register of ultimate beneficial owners). The client has to request it themselves (<a href="https://www.advocatenorde.nl/praktijkuitoefening/wwft">NOvA, Wwft</a>). That's exactly the kind of step clients get stuck on, because they don't know where to get it. A reminder with a short explanation and the right link saves a phone call.</p>
<p>The form only asks for documents that fit the type of client. A UBO extract, for example, only comes into play when the client is a legal entity.</p>
<h3>3. The signature</h3>
<p>The engagement letter has to come back signed. With an e-signing service, the client gets a link and you see when it's been signed.</p>
<h3>4. The advance payment</h3>
<p>Many firms ask for an advance before work begins. An invoice with a payment link, and a reminder if it's still open after a few days, means nobody has to track it by hand.</p>
<p>We have no figures on how much time firms spend on this chasing. As far as we know, none exist for the Netherlands. If you want to measure it in your own firm, keep a tally for a month of how many emails and calls each new matter takes.</p>


<!--block:flow-->
<h2>An intake that chases for you and files every step</h2>
<p>Below is an example of how such an intake can run. It's an illustration, not an existing firm.</p>
<ol>
<li>After the first meeting, the client fills in an intake form: their details, the matter in brief, the opposing party.</li>
<li>The system creates a file and sets up a list of what's still needed, depending on the type of matter.</li>
<li>The client gets one message with everything required: a link for identification, an explanation of the UBO extract, the engagement letter to sign and the invoice for the advance.</li>
<li>Each document that comes in is placed in the file and ticked off.</li>
<li>If something is still missing after a few days, a friendly reminder goes out. After the second reminder, the advocaat or secretary gets a task to call personally.</li>
<li>Only when everything is in and the advocaat has completed the client due diligence does the matter go to "active".</li>
</ol>
<p>The message to the client could look like this:</p>
<blockquote><p>Dear Ms Jansen, thank you for this morning's meeting. To start on your matter, we still need four things from you. The link below shows each item, what it is and how to send it. You request the UBO extract yourself from the KvK; the link explains how. Questions? Feel free to call.</p><cite>Example text, fictional client</cite></blockquote>
<!--block:portal-->

<p>We think that's nicer for the client too. Someone who has just talked to an advocaat about a difficult matter doesn't want five separate emails with requests. One overview, showing each item and why it's needed, makes it easier to respond quickly. We have no research on how clients experience this.</p>
<p>Every step is recorded with a date. That helps with supervision. According to the dekens, the local bar presidents who supervise advocaten, the most common finding in Wwft inspections is a risk assessment with no written justification, or with a generic line such as "all factors have been checked" (<a href="https://www.toezichtadvocatuur.nl/cms/public/files/communicatie/20250311-advocatenblad-maart.pdf?dc96f3e2af=">Dekenberaad, March 2025</a>). A fixed form makes the advocaat answer the same questions every time, and puts those answers in the file.</p>
<p>The retention period belongs here too: you keep the due-diligence data for five years after the business relationship ends, or five years after the transaction (<a href="https://wetten.overheid.nl/BWBR0024282">Wwft, article 33</a>). A system can track that period per file.</p>

<h3>Reminders you can switch off per matter</h3>
<p>There's one situation where automatic messages must stop. When a report has been made to the FIU (the Dutch financial intelligence unit), the client may not be told about it (<a href="https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf">NOvA, Handleiding Wwft</a>). A system that cheerfully keeps sending reminders could then become a problem. That's why we build every intake so the advocaat can pause the automatic messages for a matter with a single action.</p>

<h2>What stays with the advocaat</h2>
<p>The software collects documents, sends reminders and keeps the file up to date. There are a few things it never does:</p>
<ul>
<li>decide whether the Wwft applies, or whether the procesvrijstelling does;</li>
<li>assess a client's risk and justify that assessment;</li>
<li>judge whether there's a conflict of interest;</li>
<li>decide whether the firm takes the matter on.</li>
</ul>
<p>The system can prepare those decisions by asking the right questions and putting the answers in one place. The decision and the responsibility stay with the advocaat.</p>

<h2>Where to start</h2>
<p>You don't have to do everything at once. Most firms already have an intake checklist, on paper or in the head of an experienced secretary. Write that list out first, per type of matter. Which documents are always needed? Which only for Wwft matters? Who checks what, and when?</p>
<p>Once that list exists, automating the reminders is the smallest step. Then comes the form, and last the connection with your practice management system. That way you have less chasing after the first step, even if the rest takes a while.</p>


<!--block:list-->
<h2>Privacy: no free AI tools, and a data processing agreement</h2>
<p>Intake data is confidential, and often sensitive. The NOvA advises against using free or open AI tools for confidential data (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, AI recommendations</a>). That applies to intake too: a form that sends answers to a free chatbot to "summarise" them doesn't belong in it.</p>
<p>Every service that processes your clients' data needs a data processing agreement (verwerkersovereenkomst). The NOvA provides model agreements (<a href="https://www.advocatenorde.nl/praktijkuitoefening/voor-uw-praktijk-1/gegevensbescherming-avg">NOvA, data protection</a>). For every intake we build, we list which services see which data, so you know who you need an agreement with.</p>
<p>If you already use a practice management system, we build the intake around it, as far as its API or export options allow. Why we do that is in <a href="/en/blog/build-on-the-software-you-already-use">why we build on the software you already use</a>.</p>
` + auditCta("en");

export const cover = { alt: "Line drawing: four documents along one line (an ID, a UBO chart, a signed letter and an invoice), ending at a dashed circle for the advocaat." };

export const blocks: PostBlocks = {
  "route": {
    "acf_fc_layout": "diagram",
    "src": "/blog/client-intake-for-law-firms/wwft-or-exemption.en.svg",
    "alt": "The advocaat decides which service a matter concerns. Route 1: for example a property transaction, managing assets, setting up a company, share transactions or comparable tax work. Then the Wwft applies: full client due diligence, and a UBO extract before the business relationship starts. Route 2: litigation. Then the procesvrijstelling applies, the exemption for litigation work, which is interpreted restrictively. The intake form asks the questions and records the outcome in the file.",
    "caption": null,
    "source": {
      "title": "NOvA, Handleiding Wwft en UBO-register, 2025",
      "url": "https://www.advocatenorde.nl/sites/default/files/2026-09/Inleiding%20Wwft%20en%20UBO-register%20voor%20advocaten%2007-05-2025.pdf",
      "target": "_blank"
    }
  },
  "flow": {
    "acf_fc_layout": "flow_diagram",
    "title": "Example: the four things you wait for",
    "nodes": [
      {
        "label": "ID document",
        "detail": "A copy of a valid ID",
        "human": false
      },
      {
        "label": "UBO extract",
        "detail": "The client requests it from the KvK",
        "human": false
      },
      {
        "label": "Engagement letter",
        "detail": "Signed through a link",
        "human": false
      },
      {
        "label": "Advance payment",
        "detail": "Invoice with a payment link",
        "human": false
      },
      {
        "label": "Matter starts",
        "detail": "Once the advocaat has completed the client due diligence",
        "human": true
      }
    ],
    "caption": "The system collects and reminds. The last step is the advocaat's."
  },
  "portal": {
    "acf_fc_layout": "mock_ui",
    "window": "Intake overview",
    "caption": "Example, fictional client. What the link in the message could show.",
    "mock": {
      "kind": "form",
      "title": "Your matter: what we still need",
      "intro": "Four items. Each line shows what it is and how to send it.",
      "fields": [
        {
          "label": "ID document",
          "value": "copy-id-jansen.pdf",
          "type": "file",
          "state": "done"
        },
        {
          "label": "UBO extract",
          "value": "To request from the KvK",
          "type": "file",
          "state": "open"
        },
        {
          "label": "Engagement letter",
          "value": "Signed",
          "type": "sign",
          "state": "done"
        },
        {
          "label": "Advance payment",
          "value": "Invoice 2026-031",
          "type": "pay",
          "state": "open"
        }
      ],
      "status": "2 of 4 received"
    }
  },
  "list": {
    "acf_fc_layout": "checklist",
    "id": "intake-list",
    "title": "Your intake list, per type of matter",
    "items": [
      {
        "id": "i1",
        "text": "Which documents are always needed"
      },
      {
        "id": "i2",
        "text": "Which documents only for Wwft matters"
      },
      {
        "id": "i3",
        "text": "Which documents only when the client is a legal entity"
      },
      {
        "id": "i4",
        "text": "Who checks what, and when"
      },
      {
        "id": "i5",
        "text": "When the advocaat completes the client due diligence"
      },
      {
        "id": "i6",
        "text": "Which services see which data, and whether there's a data processing agreement"
      }
    ]
  }
};
