// Before / after · two columns: the steps today vs automated (`process`), or what to automate vs keep human
// (`split`). Today/keep sits on paper with slate markers; automated/automate on white with cobalt markers.
// Stacks on phone. Content: BeforeAfterBlock. Server component.
import type { BeforeAfterBlock } from "./schema";
import { Icon } from "@/components/icons";

function Col({ label, steps, on, numbered }: { label: string; steps: string[]; on: boolean; numbered: boolean }) {
  const List = numbered ? "ol" : "ul";
  return (
    <div className={`min-w-0 p-5 sm:p-6 ${on ? "bg-white" : "bg-paper"}`}>
      <p className={`font-mono text-[12px] uppercase tracking-[0.1em] ${on ? "text-cobalt" : "text-slate"}`}>{label}</p>
      <List className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="grid grid-cols-[22px_minmax(0,1fr)] gap-3 text-[15.5px] leading-[1.5] text-ink">
            <span aria-hidden className={`mt-[1px] grid h-[22px] w-[22px] place-items-center rounded-full font-mono text-[11px] tabular-nums ${on ? "bg-ice text-cobalt" : "border border-line-2 bg-white text-slate"}`}>{numbered ? i + 1 : on ? "✓" : "·"}</span>
            <span className="text-pretty">{s}</span>
          </li>
        ))}
      </List>
    </div>
  );
}

export default function BeforeAfter({ content: c }: { content: BeforeAfterBlock }) {
  const L = c.labels;
  const process = c.variant === "process";
  return (
    <figure className="overflow-hidden rounded-xl border border-line">
      {c.title && <figcaption className="border-b border-line bg-white px-5 py-3.5 font-display text-[16px] font-bold leading-[1.3] text-ink sm:px-6">{c.title}</figcaption>}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-px bg-line sm:grid-cols-2">
        <Col label={process ? L.before : L.automate} steps={c.before} on={!process} numbered={process} />
        <Col label={process ? L.after : L.keep} steps={c.after} on={process} numbered={process} />
      </div>
      {c.human && (
        <p className="flex gap-3 border-t border-line bg-white px-5 py-3.5 text-[15px] leading-[1.5] text-ink sm:px-6">
          <Icon name="person" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-slate" />
          <span><span className="font-semibold">{L.human}:</span> {c.human}</span>
        </p>
      )}
    </figure>
  );
}
