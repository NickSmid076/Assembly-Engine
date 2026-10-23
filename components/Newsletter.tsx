"use client";
// Newsletter sign-up. Hidden until a mailing tool is connected (lib/features.ts): nothing on the site may promise
// a subscription that doesn't happen. Copy arrives as props (no dictionary import), so the flag costs nothing when off.
import { useState } from "react";
import { FEATURES } from "@/lib/features";

export type NewsletterLabels = { title: readonly string[]; placeholder: string; subscribe: string; invalid: string; done: string; label: string };

export function Newsletter({ labels }: { labels: NewsletterLabels }) {
  // The flag is a build-time constant, so the component below always runs the same hooks.
  if (!FEATURES.newsletter) return null;
  return <NewsletterForm N={labels} />;
}

function NewsletterForm({ N }: { N: NewsletterLabels }) {
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");
  const [email, setEmail] = useState("");
  return (
    <div id="newsletter" className="grid items-center gap-8 border-t border-ink/[0.08] py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
      <p data-reveal="" className="font-display text-[26px] font-bold leading-[1.25] tracking-[-0.02em]">{N.title[0]}<br /><span className="text-slate">{N.title[1]}</span></p>
      <form data-reveal="" noValidate onSubmit={(e) => { e.preventDefault(); setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "invalid"); }}>
        <label htmlFor="nl-email" className="sr-only">{N.label}</label>
        <div className="flex gap-2">
          <input id="nl-email" type="email" autoComplete="email" placeholder={N.placeholder} value={email}
            onChange={(e) => { setEmail(e.target.value); if (state !== "idle") setState("idle"); }} aria-invalid={state === "invalid"} aria-describedby="nl-msg"
            className={`h-11 min-w-0 flex-1 rounded-lg border bg-white px-4 text-[16px] placeholder:text-slate focus:border-cobalt focus:outline-none focus:ring-4 focus:ring-cobalt/10 ${state === "invalid" ? "border-warn" : "border-line-2"}`} />
          <button type="submit" className="focus-ring h-11 rounded-lg bg-ink px-5 font-display text-[14px] font-bold text-white transition-colors duration-150 hover:bg-cobalt">{N.subscribe}</button>
        </div>
        <p id="nl-msg" role="status" className="mt-2 flex min-h-[20px] items-center gap-2 text-[13.5px] text-ink">
          {state === "invalid" && <><span aria-hidden className="h-2 w-2 shrink-0 rounded-[2px] bg-warn" />{N.invalid}</>}
          {state === "done" && N.done}
        </p>
      </form>
    </div>
  );
}
