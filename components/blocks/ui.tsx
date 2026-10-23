// Small shared pieces for blocks. No copy lives here: every string arrives through props.
import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import type { HeadingPart, WPLink } from "./shared";
import { ArrowRight } from "@/components/icons";

/** Heading from parts; accent parts take `accentClass` (two-tone slate on light, peri on dark). */
export function Heading({ parts, as: Tag = "h2", className = "", accentClass = "text-slate", reveal = true, id, stacked = false }: {
  parts: HeadingPart[]; as?: ElementType; className?: string; accentClass?: string; reveal?: boolean; id?: string;
  /** Put each part on its own line (from `sm` up). */
  stacked?: boolean;
}) {
  return (
    <Tag id={id} data-reveal={reveal ? "" : undefined} className={className}>
      {parts.map((p, i) => (
        <span key={i} className={`${p.accent ? accentClass : ""} ${stacked ? "sm:block" : ""}`}>{i ? " " : ""}{p.text}</span>
      ))}
    </Tag>
  );
}

/** Section H2 on the house scale. Two lines at most at every width for the current copy. */
export const H2 = "font-display text-[32px] font-bold leading-[1.08] tracking-[-0.035em] [overflow-wrap:anywhere] sm:text-[42px] lg:text-[50px]";

/** A WordPress link: next/link for internal paths, <a> for anchors and external URLs. */
export function CtaLink({ link, className, children, arrow = false }: { link: WPLink; className: string; children?: ReactNode; arrow?: boolean }) {
  const content = (
    <>
      {children ?? link.title}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />}
    </>
  );
  const external = /^https?:/.test(link.url);
  if (external || link.url.startsWith("#"))
    return (
      <a href={link.url} className={`group ${className}`} target={link.target || undefined} rel={link.target === "_blank" ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  return <Link href={link.url} className={`group ${className}`} target={link.target || undefined}>{content}</Link>;
}

/** Secondary button on dark ground. */
export const BTN_GHOST_DARK = "focus-ring btn border border-white/20 text-white hover:border-white/50 hover:bg-white/[0.04]";
/** Secondary button on light ground. */
export const BTN_GHOST_LIGHT = "focus-ring btn border border-line-2 text-ink hover:border-ink/40";
