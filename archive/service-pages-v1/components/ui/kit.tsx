import type { ReactNode } from "react";

/** Small, restrained UI primitives used inside every product scene. */

export type Tone = "neutral" | "blue" | "ok" | "warn";
const toneCls: Record<Tone, string> = {
  neutral: "bg-sunken text-slate ring-line",
  blue: "bg-ice text-cobalt ring-cobalt/15",
  ok: "bg-ok-soft text-ok-ink ring-ok/15",
  warn: "bg-warn-soft text-warn ring-warn/15",
};
const dotCls: Record<Tone, string> = { neutral: "bg-slate/50", blue: "bg-cobalt", ok: "bg-ok", warn: "bg-warn" };

export function Pill({ tone = "neutral", children, dot = true }: { tone?: Tone; children: ReactNode; dot?: boolean }) {
  return (
    <span className={`inline-flex h-[22px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2 text-[11.5px] font-medium ring-1 ring-inset transition-colors duration-500 ${toneCls[tone]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotCls[tone]}`} />}
      {children}
    </span>
  );
}

export function Avatar({ name, tone = "blue" }: { name: string; tone?: "blue" | "ink" | "neutral" }) {
  const initials = name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const cls = tone === "ink" ? "bg-ink text-white" : tone === "neutral" ? "bg-sunken text-slate ring-1 ring-line" : "bg-ice text-cobalt";
  return <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold ${cls}`}>{initials}</span>;
}

export function Check({ done, active }: { done: boolean; active?: boolean }) {
  return (
    <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border transition-all duration-500 ${done ? "border-ok bg-ok text-white" : active ? "border-cobalt" : "border-line-2 bg-white"}`}>
      {done ? (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>
      ) : active ? (
        <span className="h-2 w-2 animate-pulse rounded-full bg-cobalt" />
      ) : null}
    </span>
  );
}

/** Window frame around a scene: a calm app chrome with a title and a quiet "Example" tag. */
export function AppFrame({ title, tag, children, className = "", bare = false }: { title: string; tag?: string; children: ReactNode; className?: string; bare?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(11,27,51,.05),0_12px_32px_-16px_rgba(11,27,51,.18)] ${className}`}>
      <div className="flex h-10 items-center gap-3 border-b border-line px-3.5">
        <span className="flex gap-1.5">{[0, 1, 2].map((k) => <i key={k} className="h-2.5 w-2.5 rounded-full bg-line" />)}</span>
        <span className="truncate text-[12.5px] font-medium text-ink/80">{title}</span>
        {tag && <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-slate">{tag}</span>}
      </div>
      <div className={bare ? "" : "p-4 sm:p-5"}>{children}</div>
    </div>
  );
}

/** The quiet grey stage a scene sits on (Attio-style sunken panel with dot grid). */
export function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-sunken ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(11,27,51,.07)_1px,transparent_1.2px)] [background-size:18px_18px]" />
      <div className="relative">{children}</div>
    </div>
  );
}
