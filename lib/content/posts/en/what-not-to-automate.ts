import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p>We make our living from automation. Even so, we regularly advise firms not to automate something. That has little to do with caution. Some tasks get worse when a system takes them over, and for others the build isn't worth what it saves. Below is where we draw the line.</p>

<h2>The rule: automate the preparation and the record-keeping</h2>
<p>The simplest rule of thumb we know: let software collect, remind, prepare and record. Let a person judge and decide.</p>
<p>A system can request documents, check whether they've arrived, prepare figures and log every step in the file with a date. What to do with those documents and figures is a question for someone with expertise and responsibility.</p>


<!--block:split-->
<h2>Judgement calls that stay with a person</h2>
<p>A few examples from accounting and law firms:</p>
<ul>
<li>a client's risk assessment under the Wwft, the Dutch anti-money-laundering act;</li>
<li>taking a tax position in a return;</li>
<li>judging whether there's a conflict of interest;</li>
<li>deciding whether to take on a matter or engagement.</li>
</ul>
<p>The Wwft shows this clearly. Using one uniform risk approach for all clients is itself a common mistake, according to partner content from compliance software vendor ComplianceWise (<a href="https://www.accountancyvanmorgen.nl/2025/07/17/partner-compliancewise-de-9-meest-gemaakte-wwft-compliance-fouten-en-hoe-je-ze-voorkomt/">Accountancy van Morgen, partner content</a>). And the dekens, who supervise Dutch advocaten, reject blanket justifications such as "all factors have been checked" (<a href="https://www.toezichtadvocatuur.nl/cms/public/files/communicatie/20250311-advocatenblad-maart.pdf?dc96f3e2af=">Dekenberaad, March 2025</a>). A system that ticks the same box for everyone makes exactly the mistake the supervisor looks for.</p>
<p>What does work: the system asks the questions, and the professional fills in and justifies the answers. Then the judgement is on paper, and it belongs to a person.</p>
<p>An example (fictional) of how that line runs in practice. In a Wwft intake, the system sends the client the list of required documents, ticks them off and sends reminders. It sets out the answers to the risk questions in the file. The advocaat reads them, assigns the risk and writes the justification. Then the system records the date and the advocaat's name. Four of the five steps run automatically. The fifth, the judgement, is the advocaat's.</p>


<!--block:intake-->
<h2>Free chatbots and client data</h2>
<p>In December 2025 the Autoriteit Persoonsgegevens, the Dutch data protection authority, warned about a growing number of data breaches caused by employees using AI chatbots. Free services may store what you type in and use it to train their models (<a href="https://www.accountant.nl/nieuws/2025/12/ap-slaat-alarm-over-datalekken-door-ai/">Accountant.nl, December 2025</a>).</p>
<p>For a firm with client files, that's a hard line. Annual accounts, a court document or an intake form don't belong in a free chatbot, not even "just to summarise". The NOvA, the Dutch bar association, says the same to advocaten: no free or open AI tools for confidential data (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, AI recommendations</a>).</p>
<p>Whether AI is safe for your firm therefore depends on the service you use, the terms that come with it, and whether there's a data processing agreement in place.</p>


<!--block:chatbot-->
<h2>Accuracy: every AI output gets a review step</h2>
<p>Accountants name accuracy and quality control as the biggest obstacle to AI, at 44% (<a href="https://www.accountant.nl/nieuws/2026/9/voor-zes-op-de-tien-accountants-is-ai-de-grootste-gamechanger-voor-hun-beroep/">Accountant.nl, September 2026</a>). That's a fair objection. A language model can copy an amount wrongly or cite a source that doesn't exist, and it sounds just as sure as when it's right.</p>
<p>That's why the NOvA asks advocaten to check every reference produced by AI, and to tell clients they use AI. In its words, the advocaat's own responsibility remains leading ("de eigen verantwoordelijkheid van de advocaat blijft leidend") (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA</a>).</p>
<p>When we put AI somewhere in a process, for example to sort an incoming email or prepare a draft, there's always a step after it where a person reviews and approves it before anything goes to a client.</p>

<h2>Messages that shouldn't sound automated</h2>
<p>There's no Dutch research on how clients experience automated messages from their accountant or lawyer. What follows is our own view.</p>
<p>A reminder about a missing document can be automatic. Bad news can't: a disappointing tax assessment, a case that's going badly, a mistake by the firm. A difficult conversation about a payment belongs with a person too. That fits the Intrum research, in which only 22% of executives think customers prefer talking to AI about a late payment (<a href="https://www.intrum.com/press/press-releases/press-release-article/?id=40724231-127d-4c21-9211-7d598dc5f407">Intrum, 2025</a>).</p>
<p>An automation can help make sure such a conversation happens on time: a task at the right moment, with the file attached.</p>

<h2>When automating isn't worth it</h2>
<p>Sometimes the answer is simply no. A job that happens four times a year and takes ten minutes saves too little to build and maintain a connection for. A process that runs differently every month is better written down on paper first.</p>
<p>A worked example: a job that takes ten minutes four times a year adds up to 40 minutes a year. If building it takes a few hours and the connection needs some maintenance each year, it won't pay for itself for years. A good checklist is the better solution then.</p>
<p>Every extra tool can also add friction. "Technical problems" are already the third-biggest frustration among accounting staff, named by 13% (<a href="https://www.accountancyvanmorgen.nl/2025/08/06/vier-op-vijf-accountants-vinden-werkdruk-te-hoog/">Accountancy van Morgen, August 2025</a>). An automation that often breaks makes that worse.</p>
<p>And AI isn't needed in many places. Among Dutch firms with 2 to 10 employees, only 14% use AI (<a href="https://www.cbs.nl/nl-nl/nieuws/2025/50/bedrijven-gebruiken-ai-vaakst-voor-marketing-of-verkoop">CBS, December 2025</a>). Much of what we build contains no AI at all. For most admin jobs, a fixed rule that always does the same thing is more reliable.</p>

<h2>A quick test for any task</h2>
<p>If you're unsure about a task, ask these questions:</p>
<ol>
<li>Does the task go the same way every time, or does it depend on the situation?</li>
<li>What happens if it goes wrong once, and who notices?</li>
<li>Does client data go to a service you have no agreement with?</li>
<li>Would the client find it odd if this message came from a system?</li>
<li>Does the task happen often enough to justify building and maintaining it?</li>
</ol>
<p>If the answer to question 1 is "it depends", or to question 4 is "yes", keep it with a person. If the answer to question 3 is "yes", sort out the agreements before you build anything.</p>

<h2>What the AI Act asks of a small firm in 2026</h2>
<p>Most firms use AI rather than build it. For that group the obligations are limited, though they do exist. The points below follow the AI Act as amended by the AI omnibus, Regulation (EU) 2026/1744, in force since 27 July 2026 (<a href="https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force">Hunton</a>).</p>
<ul>
<li>Since February 2025 you have to take measures so that staff who work with AI know enough about it (article 4, AI literacy).</li>
<li>Since 2 August 2026, transparency rules apply: people have to know when they're dealing with an AI system (article 50).</li>
<li>The main rules for high-risk AI systems apply from 2 December 2027, and for AI in regulated products from 2 August 2028 (<a href="https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force">Hunton</a>).</li>
</ul>
<!--block:aiact-->

<p>An ordinary email flow or invoice automation isn't "high risk". Anyone who tells you your reminder emails fall under strict AI rules is exaggerating. If you use AI in contact with clients, you do need to think about the transparency rule. For accountants, the NBA (their professional body) published a guide in October 2024 on keeping AI under control in practice (<a href="https://www.nba.nl/siteassets/tools-en-ondersteuning/publicaties/2024/nba-leidraad-ai-in-control.pdf">NBA, AI in Control</a>).</p>
<p>For where automation does work well, read <a href="/en/blog/five-admin-tasks-to-automate-first">five admin tasks to automate first</a> and <a href="/en/blog/client-intake-for-law-firms">client intake for law firms</a>.</p>
` + auditCta("en");

export const cover = { alt: "Line drawing: one bundle of lines splits; the upper half runs into records, the lower half, dashed, runs to a person." };

export const blocks: PostBlocks = {
  "split": {
    "acf_fc_layout": "before_after",
    "variant": "split",
    "title": null,
    "before": [
      "Collecting documents",
      "Sending reminders",
      "Preparing figures and drafts",
      "Recording every step with a date"
    ],
    "after": [
      "A client's Wwft risk assessment",
      "Taking a tax position",
      "Judging a conflict of interest",
      "Deciding to take on a matter",
      "Bad news and difficult conversations"
    ],
    "human": null
  },
  "intake": {
    "acf_fc_layout": "diagram",
    "src": "/blog/what-not-to-automate/four-and-one.en.svg",
    "alt": "Example of a Wwft intake in five steps. Automated: send the list of required documents, tick off what arrives, send reminders, set out the answers in the file. The advocaat: assign the risk and write the justification. Afterwards the system records the date and the advocaat's name.",
    "caption": null,
    "source": {
      "title": "Dekenberaad, March 2025",
      "url": "https://www.toezichtadvocatuur.nl/cms/public/files/communicatie/20250311-advocatenblad-maart.pdf?dc96f3e2af=",
      "target": "_blank"
    }
  },
  "chatbot": {
    "acf_fc_layout": "callout",
    "tone": "warning",
    "title": "Client files don't go into a free chatbot",
    "body": "Free services may store what you type and use it to train their models. That rules out annual accounts, court documents and intake forms, even \"just to summarise\".",
    "link": {
      "title": "Autoriteit Persoonsgegevens, via Accountant.nl",
      "url": "https://www.accountant.nl/nieuws/2025/12/ap-slaat-alarm-over-datalekken-door-ai/",
      "target": "_blank"
    }
  },
  "aiact": {
    "acf_fc_layout": "callout",
    "tone": "note",
    "title": "What we don't claim",
    "body": "An ordinary email flow or invoice automation isn't high-risk AI. The dates above follow the AI omnibus as published in July 2026.",
    "link": {
      "title": "Hunton",
      "url": "https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force",
      "target": "_blank"
    }
  }
};
