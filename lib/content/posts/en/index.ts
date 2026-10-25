import * as audit from "./what-a-free-automation-audit-looks-at";
import * as fiveTasks from "./five-admin-tasks-to-automate-first";
import * as eInvoicing from "./e-invoicing-mandatory-2030";
import * as buildOn from "./build-on-the-software-you-already-use";
import * as intake from "./client-intake-for-law-firms";
import * as reminders from "./automatic-payment-reminders";
import * as notToAutomate from "./what-not-to-automate";
import * as tools from "./n8n-vs-make-vs-zapier-for-dutch-firms";
import * as engagement from "./engagement-letters-and-conflict-checks-for-law-firms";

import type { PostModule } from "../types";

export const EN: Record<string, PostModule> = {
  "what-a-free-automation-audit-looks-at": audit,
  "five-admin-tasks-to-automate-first": fiveTasks,
  "e-invoicing-mandatory-2030": eInvoicing,
  "build-on-the-software-you-already-use": buildOn,
  "client-intake-for-law-firms": intake,
  "automatic-payment-reminders": reminders,
  "what-not-to-automate": notToAutomate,
  "n8n-vs-make-vs-zapier-for-dutch-firms": tools,
  "engagement-letters-and-conflict-checks-for-law-firms": engagement,
};
