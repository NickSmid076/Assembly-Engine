import { auditCta } from "../cta";
import type { PostBlocks } from "../types";

export default `
<p><em>Last updated: 25 October 2026. Prices and plans for these services change often; always check them on the vendor's own site.</em></p>
<p>First, something you need to know to weigh this article: we build our automations in n8n. So we have a preference. Below we explain why, and also when we'd recommend something else to a firm.</p>
<p><mark>[CHECK: every pricing, plan and data-region claim in this article against the official Zapier, Make and n8n sites; the comparison figures come from one hosting vendor that favours n8n]</mark></p>

<h2>Why a firm with client data asks different questions</h2>
<p>Most comparisons of n8n, Make and Zapier are written for web shops and marketing teams. They mainly want to know how many integrations there are and how quickly you can click something together.</p>
<p>An accounting or law firm has other concerns. You work with annual accounts, citizen service numbers (BSN), court documents and information under professional secrecy. Then three questions matter more than the number of integrations: where is the data stored, how are you billed, and who maintains it when something breaks?</p>
<p>That concern is widely shared. Of the Dutch firms that considered AI but don't use it, 49% cite privacy as a reason (<a href="https://www.cbs.nl/nl-nl/nieuws/2025/50/bedrijven-gebruiken-ai-vaakst-voor-marketing-of-verkoop">CBS, December 2025</a>). The same question applies to automation without AI: every step in a workflow is a place where client data passes through.</p>

<h2>Where the data lives: the US, the EU or your own server</h2>
<p>According to a comparison by hosting company Virtua.Cloud, it works like this (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>):</p>
<ul>
<li>Zapier stores data in the United States by default. EU storage requires the Enterprise plan.</li>
<li>Make lets you choose the EU when you create an account, on any plan.</li>
<li>n8n Cloud runs on Azure in Frankfurt. You can also host n8n yourself, on a server you choose.</li>
</ul>

<!--block:table-->

<p>Virtua.Cloud sells n8n hosting itself. So read the list as a starting point, and check each point with the vendor.</p>
<p>Data in the US isn't automatically forbidden. Transfers to the US are covered by the EU-US Data Privacy Framework. <mark>[CHECK: the status of the EU-US Data Privacy Framework in 2026]</mark> But for a firm that has to be able to explain to clients where their data is, "in the EU" or "on our own server" is a simpler answer.</p>

<h2>How you're billed: tasks, credits or executions</h2>
<p>The three services charge in different ways, and that makes a big difference once a workflow runs often.</p>
<ul>
<li>Zapier charges per <em>task</em>: every step that does something counts.</li>
<li>Make charged per <em>operation</em> and has moved to <em>credits</em>. <mark>[CHECK: Make's August 2025 rename from operations to credits, and how credits are counted now]</mark></li>
<li>n8n charges per <em>execution</em>: one run through the whole workflow counts as one, however many steps it has.</li>
</ul>
<p>A worked example from Virtua.Cloud: a five-step workflow that runs a hundred times a day comes to about 3,000 executions a month in n8n, and about 15,000 tasks in Zapier (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>).</p>
<p>Think of a concrete case, made up but recognisable. Every incoming email with an attachment is checked (1), the attachment is saved in the client file (2), the client is looked up in the CRM (3), the document is ticked off the list of missing items (4), and the staff member gets a notification (5). A hundred emails a day isn't unusual for a busy firm in tax season. With Zapier all five steps count; with n8n the workflow counts as a whole.</p>
<p>What that means in euros depends on current prices. We deliberately don't list them here, because they change too often.</p>


<!--block:count-->
<h2>Self-hosting isn't free</h2>
<p>You can run the open version of n8n yourself. That still doesn't make it free. According to Virtua.Cloud, a virtual server for it costs roughly 12 to 29 euros a month, plus one to two hours of maintenance a month (<a href="https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy">Virtua.Cloud</a>).</p>
<p>The maintenance is the part people forget. Someone has to install updates, check backups, secure the server and notice when a workflow gets stuck. If nobody in your firm wants to or can, you pay someone to do it, or you choose the cloud version.</p>
<p>And self-hosting doesn't make a firm GDPR compliant by itself. You decide where the server is, and you're also responsible for securing it.</p>

<h2>Who maintains it when something breaks</h2>
<p>Every workflow gets stuck at some point. A vendor changes its API, a password expires, a client sends an attachment in an odd format. The question is who notices, and who fixes it.</p>
<p>At a firm with client data that weighs more heavily than at a web shop. A failed step can mean a document doesn't reach the file, or a reminder doesn't go out while everyone assumes it did. That's why we build a notification into every workflow for when a step fails, and keep an overview of which workflows are running and what they do. Ask any other builder the same: what happens when it goes wrong, and how will I hear about it?</p>
<p>That applies to all three services. Zapier and Make take server management off your hands, but a workflow that breaks because another package changed something still needs someone to repair it.</p>


<!--block:flow-->
<h2>The paperwork that matters more than the tool</h2>
<p>None of these three services is "GDPR compliant" on its own. Whether you comply with the GDPR (the AVG in Dutch) depends on how you use them: which data goes through, who you have agreements with, and what you record.</p>
<p>Two things are needed in any case:</p>
<ol>
<li>A data processing agreement (verwerkersovereenkomst) with every service that processes your clients' personal data. That covers the automation service, and also every service that receives data in a workflow. <mark>[CHECK: cite GDPR art. 28 or the Autoriteit Persoonsgegevens directly for the verwerkersovereenkomst requirement]</mark></li>
<li>A record of processing activities stating which data you process, for what, and through which services.</li>
</ol>
<p>The NOvA, the Dutch bar association, gives advocaten a useful checklist for vendor contracts: look at who controls the data, how liability is arranged and how you get out again, and avoid getting locked in to one vendor (<a href="https://www.advocatenorde.nl/nieuws/aanbevelingen-ai-de-praktijk">NOvA, AI recommendations</a>). Those recommendations are about AI, but the questions fit an automation service just as well.</p>

<h2>Questions for any provider</h2>
<p>Whichever service you choose, and whoever builds it for you, you should be able to get answers to these:</p>
<ul>
<li>Where is my data stored, and can I get that in writing?</li>
<li>Which sub-processors do you use?</li>
<li>How am I billed, and what does it cost if my usage doubles?</li>
<li>Can I export my workflows if I want to switch?</li>
<li>Who fixes it when a workflow stops, and how quickly?</li>
</ul>
<p>If you can't get a clear answer to one of these, that tells you enough.</p>
<p>The fourth question is often forgotten. With all three services your workflows run on that platform. If you want to move to another platform, you rebuild them there. n8n stores workflows as files you can export and load again elsewhere, including on your own server. That's one of our reasons for working with it.</p>

<h2>Our recommendation per type of firm</h2>
<p>This is our assessment. Your situation may differ.</p>
<ul>
<li>Do you run a small firm with a few simple connections and little sensitive data? Then Zapier or Make is fine, as long as the data is in the EU and there's a data processing agreement. You can often set it up yourself.</li>
<li>Do you have many workflows that run often? Then look closely at how you're billed. The difference between per step and per execution can get large.</li>
<li>Do you work with confidential files, as a law firm does? Then choose storage in the EU or on your own server, and make sure someone is responsible for maintenance.</li>
</ul>

<h2>Why we use n8n, and when we'd pick something else</h2>
<p>We build on n8n for three reasons. You can choose where it runs, including on a server in the Netherlands or the EU. It charges per execution, which is easier to predict for busy workflows. And the workflows are yours: if you ever want to continue with someone else, they can take them over.</p>
<p>We'd recommend something else if you want to manage it yourself without technical knowledge. Make and Zapier are more approachable for a beginner. Or if you need one simple connection that Zapier offers ready-made; then your own n8n installation is too much hassle.</p>
<p>The tool is also only half of it. Search for "n8n" on a freelance platform and you'll find countless providers (<a href="https://nl.fiverr.com/n8n_lurd">Fiverr</a>). Building is something anyone can do. For a firm with client data, what counts is who you can hold to account when it goes wrong, who speaks your language, and who knows what a data processing agreement is. That's what we want to be judged on.</p>
<p>For more on why we connect rather than replace, read <a href="/en/blog/build-on-the-software-you-already-use">why we build on the software you already use</a>.</p>
` + auditCta("en");

export const cover = { alt: "Line drawing: the same five-step workflow three times; in one row every step is counted, in another the whole run counts once." };

export const blocks: PostBlocks = {
  "table": {
    "acf_fc_layout": "comparison_table",
    "caption": "Zapier, Make and n8n on storage, billing and self-hosting",
    "columns": [
      "Zapier",
      "Make",
      "n8n"
    ],
    "rows": [
      {
        "label": "EU storage",
        "cells": [
          "With Enterprise",
          "Your choice, any plan",
          "Cloud in Frankfurt, or your own server"
        ]
      },
      {
        "label": "Billed per",
        "cells": [
          "Task (every step)",
          "Credit",
          "Execution (whole workflow)"
        ]
      },
      {
        "label": "Self-hosting",
        "cells": [
          "No",
          "No",
          "Yes"
        ]
      }
    ],
    "note": "Summary based on Virtua.Cloud, which sells n8n hosting itself. Still to be checked with the vendors.",
    "source": {
      "title": "Virtua.Cloud",
      "url": "https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy",
      "target": "_blank"
    }
  },
  "count": {
    "acf_fc_layout": "diagram",
    "src": "/blog/n8n-vs-make-vs-zapier-for-dutch-firms/tasks-vs-executions.en.svg",
    "alt": "Example: one workflow of five steps (check email, save attachment, find the client in the CRM, tick off the document, notify staff) that runs 100 times a day. Zapier counts every step: 5 per run, about 15,000 tasks a month. n8n counts the whole run once: 1 per run, about 3,000 executions a month.",
    "caption": "Make is left out: how its credits are counted is still to be checked.",
    "source": {
      "title": "Virtua.Cloud",
      "url": "https://www.virtua.cloud/learn/nl/concepts/n8n-vs-zapier-vs-make-kosten-privacy",
      "target": "_blank"
    }
  },
  "flow": {
    "acf_fc_layout": "flow_diagram",
    "title": "Example: five steps, and who hears when one fails",
    "nodes": [
      {
        "label": "Check email",
        "detail": "With an attachment",
        "human": false
      },
      {
        "label": "Save attachment",
        "detail": "In the client file",
        "human": false
      },
      {
        "label": "Find client",
        "detail": "In the CRM",
        "human": false
      },
      {
        "label": "Tick off",
        "detail": "On the list of missing documents",
        "human": false
      },
      {
        "label": "Notify staff",
        "detail": "The right colleague",
        "human": false
      },
      {
        "label": "If a step fails",
        "detail": "A person gets a message and fixes it",
        "human": true
      }
    ],
    "caption": "We build a failure notification into every workflow."
  }
};
