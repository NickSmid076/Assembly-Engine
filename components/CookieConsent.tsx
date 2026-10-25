"use client";
// Cookie consent + Google Analytics. GA (gtag.js) only loads after the visitor accepts; until then nothing is
// sent to Google. The choice lives in localStorage; the footer's "Cookie settings" reopens the banner.
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "./I18nProvider";

const GA_ID = "G-XPNXBFKZ2T";
const KEY = "ae-consent";
const OPEN = "ae-consent-open";
type Choice = "granted" | "denied";

const read = (): Choice | null => {
  try { const v = localStorage.getItem(KEY); return v === "granted" || v === "denied" ? v : null; } catch { return null; }
};

/** Reopen the banner (footer link). */
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN));

export default function CookieConsent() {
  const { t } = useI18n();
  const c = t.cookies;
  // Same first render on server and client (nothing); the stored choice is read after mount.
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const v = read();
    setChoice(v);
    if (!v) setOpen(true);
    const reopen = () => { setOpen(true); requestAnimationFrame(() => firstButton.current?.focus()); };
    window.addEventListener(OPEN, reopen);
    return () => window.removeEventListener(OPEN, reopen);
  }, []);

  const decide = (v: Choice) => {
    try { localStorage.setItem(KEY, v); } catch { /* private mode: the choice holds for this visit */ }
    // Withdrawing consent: stop GA for the rest of this visit (the script itself unloads on the next page load).
    if (v === "denied") (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
    setChoice(v);
    setOpen(false);
  };

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
      {open && (
        <section
          role="region"
          aria-label={c.region}
          className="fixed inset-x-4 bottom-4 z-[60] animate-rise sm:left-auto sm:right-6 sm:bottom-6 sm:w-[384px]"
        >
          <div className="rounded-xl border border-line bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(11,27,51,.05),0_24px_48px_-20px_rgba(11,27,51,.35)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">{c.label}</p>
            <h2 className="mt-2 font-display text-[17px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">{c.title}</h2>
            <p className="mt-1.5 text-pretty text-[13.5px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] text-ink/75">{c.body}</p>
            {/* Declining is exactly as easy as accepting: same size, same row. */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                ref={firstButton}
                type="button"
                onClick={() => decide("denied")}
                className="focus-ring h-10 rounded-lg border border-line-2 font-display text-[14px] font-semibold text-ink transition-[border-color,background-color] duration-150 hover:border-ink/30 hover:bg-paper active:scale-[0.97]"
              >
                {c.decline}
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="focus-ring h-10 rounded-lg bg-ink font-display text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-cobalt active:scale-[0.97]"
              >
                {c.accept}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
