"use client";
import { useTimeline } from "@/lib/useTimeline";
import { AppFrame, Avatar, Check, Pill, type Tone } from "./kit";

/* ------------------------------------------------------------------ */
/* Data shapes (all example data is fictional, labelled in the frame)  */
/* ------------------------------------------------------------------ */
export type St = { l: string; t: Tone };
export type FlowData = { kind: "flow"; title: string; nodes: { label: string; sub: string; icon: IconName }[]; log: string[]; states: [string, string, string] };
export type PipelineData = { kind: "pipeline"; title: string; columns: string[]; rows: { cells: string[]; avatar?: string; states: St[] }[] };
export type ChecklistData = { kind: "checklist"; title: string; heading: string; sub: string; items: { label: string; meta: string }[]; done: string; progress: string };
export type MessageData = { kind: "message"; title: string; fromLabel: string; from: string; toLabel: string; to: string; subject: string; body: string; button: string; sent: string; reply?: { from: string; text: string } };
export type CalendarData = { kind: "calendar"; title: string; week: string; days: string[]; times: string[]; busy: [number, number, string][]; booked: { day: number; slot: number; label: string; who: string }; confirm: string };
export type DocumentData = { kind: "document"; title: string; firm: string; number: string; date: string; client: string; head: [string, string, string]; lines: [string, string, string][]; sub: [string, string]; vat: [string, string]; total: [string, string]; states: St[] };
export type BrandData = { kind: "brand"; title: string; mono: string; name: string; tagline: string; colors: [string, string][]; display: string; body: string; specimen: string; labels: { logo: string; palette: string; type: string } };
export type ChartData = { kind: "chart"; title: string; heading: string; kpis: { label: string; value: string; delta: string }[]; series: number[]; target?: number[]; x: string[]; legend: [string, string] };
export type SceneData = FlowData | PipelineData | ChecklistData | MessageData | CalendarData | DocumentData | BrandData | ChartData;

type IconName = "globe" | "form" | "user" | "calendar" | "signal" | "score" | "mail" | "check" | "file" | "folder" | "task" | "clock" | "sync" | "chart" | "euro" | "bank";
const ICON: Record<IconName, string> = {
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  form: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  signal: "M4 18l5-6 4 3 7-9",
  score: "M12 3l2.6 5.6 6 .7-4.5 4 1.3 6L12 16.3 6.6 19.3l1.3-6-4.5-4 6-.7z",
  mail: "M3 6h18v12H3zM3.5 6.5L12 13l8.5-6.5",
  check: "M5 12.5l4.5 4.5L19 7.5",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6",
  folder: "M3 7h6l2 2h10v10H3z",
  task: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  sync: "M20 11a8 8 0 0 0-14.5-4.5L3 9M3 4v5h5M4 13a8 8 0 0 0 14.5 4.5L21 15M21 20v-5h-5",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  euro: "M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9",
  bank: "M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
};
function Ico({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={ICON[name]} /></svg>;
}

const fade = (on: boolean) => `transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`;

/* ------------------------------------------------------------------ */
function FlowScene({ d, tag }: { d: FlowData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(7.5);
  const at = (i: number) => 0.5 + i * 1.5;
  const state = (i: number) => (t >= at(i) + 1.1 ? 2 : t >= at(i) ? 1 : 0);
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <ol className="grid gap-3 md:grid-cols-4 md:gap-0">
          {d.nodes.map((n, i) => {
            const s = state(i);
            return (
              <li key={n.label} className="relative flex md:block">
                <div className="relative flex w-full items-center md:pr-4">
                  <div className={`relative z-10 w-full rounded-lg border bg-white p-3 transition-all duration-500 ${s === 1 ? "border-cobalt shadow-[0_0_0_3px_rgba(46,91,255,.08)]" : "border-line"}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`grid h-7 w-7 place-items-center rounded-md transition-colors duration-500 ${s ? "bg-ice text-cobalt" : "bg-sunken text-slate"}`}><Ico name={n.icon} /></span>
                      <Pill tone={s === 2 ? "ok" : s === 1 ? "blue" : "neutral"}>{d.states[s]}</Pill>
                    </div>
                    <p className="mt-3 text-[13px] font-semibold leading-tight text-ink">{n.label}</p>
                    <p className="mt-0.5 truncate text-[11.5px] text-slate">{n.sub}</p>
                  </div>
                  {i < d.nodes.length - 1 && (
                    <span aria-hidden className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-line-2 md:block">
                      <span className="block h-full bg-cobalt transition-all duration-700" style={{ width: s === 2 ? "100%" : "0%" }} />
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 rounded-lg border border-line">
          <ul className="divide-y divide-line">
            {d.log.map((l, i) => {
              const on = state(Math.min(i, d.nodes.length - 1)) === 2 || (i >= d.nodes.length && t >= at(d.nodes.length - 1) + 1.6);
              return (
                <li key={l} className={`flex h-9 items-center gap-3 px-3 text-[12.5px] ${on ? "text-ink" : "text-slate"} transition-colors duration-500`}>
                  <Check done={on} />
                  <span className="min-w-0 flex-1 truncate">{l}</span>
                  <span className="font-mono text-[10.5px] text-slate">{on ? `09:1${i + 2}` : "--:--"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </AppFrame>
    </div>
  );
}

function PipelineScene({ d, tag }: { d: PipelineData; tag: string }) {
  const n = d.rows.length;
  const { ref, t } = useTimeline<HTMLDivElement>(1.2 + n * 0.5 + 3);
  const stateIdx = (r: number, max: number) => Math.min(max - 1, Math.max(0, Math.floor((t - 0.8 - r * 0.5) / 1.4) + 1));
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag} bare>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-line bg-sunken/60 text-[11px] font-medium uppercase tracking-[0.05em] text-slate">
                {d.columns.map((c, i) => <th key={c} className={`px-4 py-2.5 font-medium ${i === d.columns.length - 1 ? "text-right" : ""}`}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((r, i) => {
                const k = stateIdx(i, r.states.length);
                const changed = k > 0 && t - (0.8 + i * 0.5 + (k - 1) * 1.4) < 0.9;
                return (
                  <tr key={r.cells[0]} className={`border-b border-line last:border-0 transition-colors duration-700 ${changed ? "bg-ice/60" : ""}`}>
                    {r.cells.map((c, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-ink" : "text-slate"}`}>
                        {j === 0 && r.avatar ? <span className="flex items-center gap-2.5"><Avatar name={r.avatar} />{c}</span> : c}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right"><Pill tone={r.states[k].t}>{r.states[k].l}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AppFrame>
    </div>
  );
}

function ChecklistScene({ d, tag }: { d: ChecklistData; tag: string }) {
  const n = d.items.length;
  const { ref, t } = useTimeline<HTMLDivElement>(1 + n * 0.9 + 1);
  const done = Math.max(0, Math.min(n, Math.floor((t - 0.6) / 0.9) + 1));
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">{d.heading}</p>
            <p className="mt-0.5 text-[12px] text-slate">{d.sub}</p>
          </div>
          <Pill tone={done === n ? "ok" : "blue"}>{done === n ? d.done : `${done}/${n} ${d.progress}`}</Pill>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-sunken"><div className="h-full rounded-full bg-cobalt transition-all duration-700" style={{ width: `${(done / n) * 100}%` }} /></div>
        <ul className="mt-3 divide-y divide-line">
          {d.items.map((it, i) => (
            <li key={it.label} className="flex items-center gap-3 py-2.5">
              <Check done={i < done} active={i === done} />
              <span className={`min-w-0 flex-1 truncate text-[13px] transition-colors duration-500 ${i < done ? "text-ink" : "text-slate"}`}>{it.label}</span>
              <span className={`shrink-0 text-[11.5px] ${i < done ? "text-slate" : "text-slate"}`}>{it.meta}</span>
            </li>
          ))}
        </ul>
      </AppFrame>
    </div>
  );
}

function MessageScene({ d, tag }: { d: MessageData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(7);
  const typed = Math.max(0, Math.min(d.body.length, Math.floor((t - 0.6) * 70)));
  const typingDone = typed >= d.body.length;
  const sent = t > 0.6 + d.body.length / 70 + 0.8;
  const reply = d.reply && t > 0.6 + d.body.length / 70 + 2.2;
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <div className="divide-y divide-line rounded-lg border border-line text-[12.5px]">
          <div className="flex gap-3 px-3 py-2"><span className="w-12 shrink-0 text-slate">{d.fromLabel}</span><span className="truncate text-ink">{d.from}</span></div>
          <div className="flex gap-3 px-3 py-2"><span className="w-12 shrink-0 text-slate">{d.toLabel}</span><span className="truncate text-ink">{d.to}</span></div>
          <div className="px-3 py-2 font-semibold text-ink">{d.subject}</div>
          <div className="min-h-[112px] whitespace-pre-line px-3 py-3 leading-relaxed text-ink/85">
            {d.body.slice(0, typed)}
            {!typingDone && <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-cobalt" />}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          {sent ? <Pill tone="ok">{d.sent}</Pill> : <span />}
          <span className={`inline-flex h-8 items-center rounded-md px-3.5 text-[12.5px] font-semibold transition-colors duration-300 ${sent ? "bg-sunken text-slate" : "bg-ink text-white"}`}>{d.button}</span>
        </div>
        {d.reply && (
          <div className={`mt-3 flex items-start gap-2.5 rounded-lg border border-line bg-sunken/60 p-3 ${fade(!!reply)}`}>
            <Avatar name={d.reply.from} tone="neutral" />
            <div className="min-w-0"><p className="text-[12px] font-semibold text-ink">{d.reply.from}</p><p className="text-[12.5px] text-slate">{d.reply.text}</p></div>
          </div>
        )}
      </AppFrame>
    </div>
  );
}

function CalendarScene({ d, tag }: { d: CalendarData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(5);
  const booked = t > 1.6, confirmed = t > 2.8;
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <p className="mb-3 text-[12px] font-medium text-slate">{d.week}</p>
        <div className="grid grid-cols-[44px_repeat(5,minmax(0,1fr))] gap-1 text-[11px]">
          <span />
          {d.days.map((x) => <span key={x} className="pb-1 text-center font-medium text-slate">{x}</span>)}
          {d.times.map((tm, s) => (
            <div key={tm} className="contents">
              <span className="pt-1.5 font-mono text-[10.5px] text-slate">{tm}</span>
              {d.days.map((_, day) => {
                const busy = d.busy.find(([bd, bs]) => bd === day && bs === s);
                const isBooked = d.booked.day === day && d.booked.slot === s;
                return (
                  <div key={day} className="h-9 rounded-md border border-line bg-white p-0.5">
                    {busy && <div className="h-full truncate rounded bg-sunken px-1.5 py-1 text-[10.5px] text-slate">{busy[2]}</div>}
                    {isBooked && (
                      <div className={`h-full truncate rounded px-1.5 py-1 text-[10.5px] font-semibold transition-all duration-500 ${booked ? "bg-cobalt text-white" : "bg-transparent text-transparent"}`}>{d.booked.label}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className={`mt-3 flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 ${fade(confirmed)}`}>
          <Avatar name={d.booked.who} />
          <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{d.confirm}</span>
          <Pill tone="ok">✓</Pill>
        </div>
      </AppFrame>
    </div>
  );
}

function DocumentScene({ d, tag }: { d: DocumentData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(6.5);
  const lines = Math.max(0, Math.min(d.lines.length, Math.floor((t - 0.4) / 0.6) + 1));
  const k = t > 4.6 ? 2 : t > 3 ? 1 : 0;
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13.5px] font-semibold text-ink">{d.firm}</p>
            <p className="mt-0.5 text-[12px] text-slate">{d.client}</p>
          </div>
          <div className="text-right">
            <Pill tone={d.states[k].t}>{d.states[k].l}</Pill>
            <p className="mt-1.5 font-mono text-[10.5px] text-slate">{d.number} · {d.date}</p>
          </div>
        </div>
        <table className="mt-4 w-full text-[12.5px]">
          <thead><tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.05em] text-slate"><th className="pb-2 font-medium">{d.head[0]}</th><th className="pb-2 font-medium">{d.head[1]}</th><th className="pb-2 text-right font-medium">{d.head[2]}</th></tr></thead>
          <tbody>
            {d.lines.map((l, i) => (
              <tr key={l[0]} className={`border-b border-line ${fade(i < lines)}`}>
                <td className="py-2.5 text-ink">{l[0]}</td><td className="py-2.5 text-slate">{l[1]}</td><td className="py-2.5 text-right font-mono tabular-nums text-ink">{l[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="ml-auto mt-3 w-full max-w-[220px] space-y-1 text-[12.5px]">
          {[d.sub, d.vat].map(([a, b]) => <div key={a} className="flex justify-between text-slate"><dt>{a}</dt><dd className="font-mono tabular-nums">{b}</dd></div>)}
          <div className="flex justify-between border-t border-line pt-1.5 font-semibold text-ink"><dt>{d.total[0]}</dt><dd className={`font-mono tabular-nums ${fade(lines === d.lines.length)}`}>{d.total[1]}</dd></div>
        </dl>
      </AppFrame>
    </div>
  );
}

function BrandScene({ d, tag }: { d: BrandData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(5);
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-slate">{d.labels.logo}</p>
        <div className={`mt-2 flex items-center gap-4 rounded-lg border border-line p-4 ${fade(t > 0.3)}`}>
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#0F5C63] font-serif text-[22px] font-semibold text-white">{d.mono}</span>
          <div className="min-w-0"><p className="font-serif text-[22px] font-semibold leading-none text-[#10252A]">{d.name}</p><p className="mt-1.5 text-[10.5px] uppercase tracking-[0.18em] text-[#0F5C63]">{d.tagline}</p></div>
        </div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.06em] text-slate">{d.labels.palette}</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {d.colors.map(([n, hex], i) => (
            <div key={hex} className={`overflow-hidden rounded-lg border border-line ${fade(t > 1 + i * 0.25)}`}>
              <div className="h-10" style={{ background: hex }} />
              <div className="flex justify-between px-2 py-1.5 font-mono text-[10px] text-slate"><span>{n}</span><span className="hidden sm:inline">{hex}</span></div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.06em] text-slate">{d.labels.type}</p>
        <div className={`mt-2 grid grid-cols-2 gap-2 ${fade(t > 2.4)}`}>
          <div className="rounded-lg border border-line p-3"><p className="font-serif text-[28px] leading-none text-ink">Aa</p><p className="mt-2 text-[11px] text-slate">{d.display}</p></div>
          <div className="rounded-lg border border-line p-3"><p className="text-[28px] leading-none text-ink">Aa</p><p className="mt-2 text-[11px] text-slate">{d.body}</p></div>
        </div>
        <p className={`mt-3 text-[12.5px] italic text-slate ${fade(t > 3)}`}>{d.specimen}</p>
      </AppFrame>
    </div>
  );
}

function ChartScene({ d, tag }: { d: ChartData; tag: string }) {
  const { ref, t } = useTimeline<HTMLDivElement>(5);
  const W = 520, H = 170, P = 8;
  const all = [...d.series, ...(d.target ?? [])];
  const lo = Math.min(...all) * 0.92, hi = Math.max(...all) * 1.04;
  const pt = (v: number, i: number, n: number) => `${P + (i * (W - 2 * P)) / (n - 1)},${H - P - ((v - lo) / (hi - lo)) * (H - 2 * P)}`;
  const line = d.series.map((v, i) => pt(v, i, d.series.length)).join(" ");
  const area = `${P},${H - P} ${line} ${W - P},${H - P}`;
  const draw = Math.min(1, Math.max(0, (t - 0.8) / 1.6));
  return (
    <div ref={ref}>
      <AppFrame title={d.title} tag={tag}>
        <p className="text-[13.5px] font-semibold text-ink">{d.heading}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {d.kpis.map((k, i) => (
            <div key={k.label} className={`rounded-lg border border-line p-3 ${fade(t > 0.2 + i * 0.2)}`}>
              <p className="text-[11px] text-slate">{k.label}</p>
              <p className="mt-1 font-mono text-[18px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{k.value}</p>
              <p className="mt-0.5 text-[11px] text-ok-ink">{k.delta}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-line p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={d.heading}>
            {[0.25, 0.5, 0.75].map((g) => <line key={g} x1={P} x2={W - P} y1={H * g} y2={H * g} stroke="#E4E8F0" />)}
            {d.target && <polyline points={d.target.map((v, i) => pt(v, i, d.target!.length)).join(" ")} fill="none" stroke="#9AA5BA" strokeDasharray="4 4" strokeWidth="1.2" />}
            <polygon points={area} fill="rgba(46,91,255,.07)" style={{ opacity: draw, transition: "opacity .4s" }} />
            <polyline points={line} fill="none" stroke="#2E5BFF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-slate">{d.x.map((x) => <span key={x}>{x}</span>)}</div>
          <div className="mt-2 flex gap-4 text-[11px] text-slate">
            <span className="flex items-center gap-1.5"><i className="h-0.5 w-3 bg-cobalt" />{d.legend[0]}</span>
            {d.target && <span className="flex items-center gap-1.5"><i className="h-0 w-3 border-t border-dashed border-slate" />{d.legend[1]}</span>}
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

export default function Scene({ data, tag }: { data: SceneData; tag: string }) {
  switch (data.kind) {
    case "flow": return <FlowScene d={data} tag={tag} />;
    case "pipeline": return <PipelineScene d={data} tag={tag} />;
    case "checklist": return <ChecklistScene d={data} tag={tag} />;
    case "message": return <MessageScene d={data} tag={tag} />;
    case "calendar": return <CalendarScene d={data} tag={tag} />;
    case "document": return <DocumentScene d={data} tag={tag} />;
    case "brand": return <BrandScene d={data} tag={tag} />;
    case "chart": return <ChartScene d={data} tag={tag} />;
  }
}
