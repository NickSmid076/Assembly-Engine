import type { ReactNode } from "react";

/**
 * Shared page intro: small pill, two-tone headline, short lead.
 * The headline is static (it is usually the LCP element); the rest rises in with CSS, which renders the
 * same on server and client and is instant under reduced motion (globals.css).
 */
export default function PageHeader({ eyebrow, title, muted, lead, children, center = false }: { eyebrow: string; title: string; muted?: string; lead?: string; children?: ReactNode; center?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(11,27,51,.07)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_30%,transparent)]" />
      <div className={`frame frame-light relative pb-16 pt-24 sm:pt-28 ${center ? "text-center" : ""}`}>
        <span className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[13px] font-medium text-ink">{eyebrow}</span>
        <h1 className={`mt-6 max-w-[880px] text-[40px] font-bold leading-[1.06] tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-[60px] ${center ? "mx-auto" : ""}`}>
          {[title, muted].filter(Boolean).map((line, i) => (
            <span key={i} className={`block ${i ? "text-slate" : ""}`}>{line}</span>
          ))}
        </h1>
        {lead && <p className={`mt-6 max-w-[620px] animate-rise text-[18px] leading-[1.55] text-ink/70 [animation-delay:.1s] [animation-fill-mode:both] ${center ? "mx-auto" : ""}`}>{lead}</p>}
        {children && <div className="animate-rise [animation-delay:.2s] [animation-fill-mode:both]">{children}</div>}
      </div>
    </section>
  );
}
