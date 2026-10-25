// Callout · a short aside in an article: note, tip, warning, or `check` (a fact still to verify). Status colour
// only on the marker; text stays ink (AA). Content: CalloutBlock. Server component.
import type { CalloutBlock } from "./schema";
import { Icon } from "@/components/icons";
import { CtaLink } from "../ui";

const TONE = {
  note: { icon: "info", box: "border-line bg-paper", mark: "bg-white text-slate" },
  tip: { icon: "bulb", box: "border-peri/70 bg-ice/60", mark: "bg-white text-cobalt" },
  warning: { icon: "alert", box: "border-warn/30 bg-warn-soft", mark: "bg-white text-warn" },
  check: { icon: "flag", box: "border-warn/30 bg-warn-soft", mark: "bg-white text-warn" },
} as const;

export default function Callout({ content: c }: { content: CalloutBlock }) {
  const t = TONE[c.tone];
  return (
    <aside className={`flex gap-4 rounded-xl border p-5 sm:p-6 ${t.box}`} aria-label={c.labels[c.tone]}>
      <span aria-hidden className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line ${t.mark}`}><Icon name={t.icon} className="h-[18px] w-[18px]" /></span>
      <div className="min-w-0">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{c.labels[c.tone]}</p>
        {c.title && <p className="mt-1.5 font-display text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">{c.title}</p>}
        <p className="mt-1.5 text-pretty text-[16px] leading-[1.6] text-ink/85">{c.body}</p>
        {c.link && <CtaLink link={c.link} arrow className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded text-[15px] font-medium text-cobalt underline decoration-peri underline-offset-4 hover:decoration-cobalt" />}
      </div>
    </aside>
  );
}
