// The closing paragraph every article ends with: book the free audit.
import type { Locale } from "@/lib/i18n/config";

const AUDIT = "/blog/what-a-free-automation-audit-looks-at";

export function auditCta(locale: Locale, self = false) {
  if (locale === "nl") {
    return self
      ? `<hr/><p><strong>Wilt u zo'n analyse voor uw eigen kantoor?</strong> Het gesprek is gratis en u zit nergens aan vast. <a href="/nl/contact">Plan het hier</a>.</p>`
      : `<hr/><p><strong>Benieuwd waar dit bij u zit?</strong> In een gratis analyse kijken we samen naar uw eigen week: welke software u al heeft, welke klussen steeds terugkomen en wat het oplevert om ze te automatiseren. <a href="/nl${AUDIT}">Lees wat die analyse inhoudt</a>, of <a href="/nl/contact">plan direct een gesprek</a>.</p>`;
  }
  return self
    ? `<hr/><p><strong>Want this audit for your own firm?</strong> The call is free and you're not committing to anything. <a href="/en/contact">Book it here</a>.</p>`
    : `<hr/><p><strong>Wondering where this applies in your firm?</strong> In a free audit we look at your own week together: the software you already have, the jobs that keep coming back, and what automating them would be worth. <a href="/en${AUDIT}">Read what the audit covers</a>, or <a href="/en/contact">book a call now</a>.</p>`;
}
