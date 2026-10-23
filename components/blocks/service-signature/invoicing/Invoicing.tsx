"use client";
// "Volg één regel" · the invoicing signature (2D). Four documents in a row: approved hours → invoice → payment →
// booking. Pick a client, then a line of hours, and the same amount lights up in each document in turn, left to
// right, so you can follow it from the timesheet into the ledger. Below: the reminder lane for that client, with a
// switch that turns reminders off for them. Desktop: the four documents side by side, joined by connectors that
// fill as the amount travels. Tablet: two by two. Phone: stacked, joined top to bottom. Reduced motion: no
// travel; the end state shows at once.
import { useState } from "react";
import type { InvoicingSignature } from "../schema";

type Client = InvoicingSignature["clients"][number];

const segBtn = (on: boolean) =>
  `focus-ring min-h-[44px] rounded-lg border px-2 py-1.5 text-left font-display text-[13.5px] font-bold leading-[1.2] transition-[background-color,border-color,color] duration-150 ${on ? "border-white bg-white text-ink" : "border-white/15 text-white/80 hover:border-white/40"}`;
/** Each station lights up a beat after the one before it (the amount travelling). Off under reduced motion. */
const beat = (i: number) => ({ transitionDelay: `${(i * 0.15).toFixed(2)}s` });
const HL = "transition-[background-color,box-shadow,color] duration-300 motion-reduce:!delay-0";

/** The followed line lights up in each document in turn: a cobalt ring that pulses once, one beat per station.
 *  `run` restarts it on every new choice (none on first paint); hidden under reduced motion. */
function Pulse({ i, run }: { i: number; run: number }) {
  if (!run) return null;
  return <span key={run} aria-hidden className="inv-pulse pointer-events-none absolute inset-0 rounded-[inherit] ring-2 ring-cobalt" style={{ animationDelay: `${(i * 0.15).toFixed(2)}s` }} />;
}

function Check({ className = "h-3 w-3" }: { className?: string }) {
  return <svg viewBox="0 0 12 12" aria-hidden className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>;
}

/** The join between two stations: across on desktop, down on phone. It fills cobalt as the amount passes, or
 *  stays dashed while the money hasn't arrived. `run` restarts the fill on every new choice (none on first paint). */
function Join({ i, on, run }: { i: number; on: boolean; run: number }) {
  return (
    <span aria-hidden className="pointer-events-none absolute z-[1] max-md:left-6 max-md:top-full max-md:h-4 max-md:w-0.5 md:max-lg:hidden lg:left-full lg:top-[22px] lg:h-0.5 lg:w-5 xl:w-6">
      {on ? (
        <>
          <span className="absolute inset-0 bg-white/15" />
          <span key={run} className={`absolute inset-0 bg-cobalt-2 ${run ? "inv-fill" : ""}`} style={run ? { animationDelay: `${(i * 0.15 + 0.08).toFixed(2)}s` } : undefined} />
        </>
      ) : <span className="absolute inset-0 max-lg:border-l-2 lg:border-t-2 border-dashed border-warn/70" />}
    </span>
  );
}

function Station({ n, title, tool, children, join }: { n: number; title: string; tool: string; children: React.ReactNode; join?: React.ReactNode }) {
  return (
    <li className="relative min-w-0">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-ink">
        <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3">
          <p className="min-w-0 truncate font-display text-[15px] font-bold"><span className="mr-1.5 font-mono text-[12px] font-normal tabular-nums text-slate">{n}</span>{title}</p>
          <p className="shrink-0 font-mono text-[12px] text-slate">{tool}</p>
        </div>
        <div className="flex flex-1 flex-col p-3">{children}</div>
      </div>
      {join}
    </li>
  );
}

export default function Invoicing({ data: d }: { data: InvoicingSignature }) {
  const L = d.labels;
  const [clientId, setClientId] = useState(d.initial.client);
  const [line, setLine] = useState(d.initial.line);
  const [run, setRun] = useState(0);
  const [off, setOff] = useState<Record<string, boolean>>({});

  const c: Client = d.clients.find((x) => x.id === clientId) ?? d.clients[0];
  const l = c.lines[Math.min(line, c.lines.length - 1)];
  const paid = c.payment.state === "paid";
  const remindersOff = !!off[c.id];
  const fill = (s: string, k: string, v: string) => s.replace(`{${k}}`, v);

  const pickClient = (id: string) => { if (id !== clientId) { setClientId(id); setRun((r) => r + 1); } };
  const pickLine = (i: number) => { if (i !== line) { setLine(i); setRun((r) => r + 1); } };

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
        <div className="min-w-0">
          <p className="font-mono text-[13px] text-white/65">{L.example}</p>
          <p id="inv-hint" className="mt-1 max-w-[460px] text-[14px] text-white/80">{L.hint}</p>
        </div>
        <fieldset className="min-w-0">
          <legend className="mb-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{L.client}</legend>
          <div className="grid grid-cols-3 gap-1.5">
            {d.clients.map((x) => (
              <button key={x.id} type="button" aria-pressed={x.id === clientId} aria-describedby="inv-hint" onClick={() => pickClient(x.id)} className={segBtn(x.id === clientId)}>
                <span className="block">{x.name}</span>
                <span className={`mt-0.5 block font-mono text-[12px] font-normal ${x.id === clientId ? "text-slate" : "text-white/65"}`}>
                  {x.payment.state === "paid" ? L.paid : `${x.payment.late} ${L.overdue}`}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <ol aria-live="polite" className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
        {/* 1 · Approved hours: the lines to pick from. */}
        <Station n={1} title={L.stations.hours} tool={d.tools.hours} join={<Join i={0} on run={run} />}>
          <div className="flex items-baseline justify-between gap-3 px-1">
            <p className="min-w-0 text-[13px] text-slate">{c.period}</p>
            <p className="shrink-0 whitespace-nowrap font-mono text-[12px] tabular-nums text-slate">{c.hours_total}</p>
          </div>
          <p id="inv-follow" className="mt-1 px-1 text-[13px] text-slate">{L.follow}</p>
          <ul role="list" className="mt-2 space-y-1.5">
            {c.lines.map((x, i) => {
              const on = x === l;
              return (
                <li key={`${c.id}-${i}`}>
                  <button type="button" aria-pressed={on} aria-describedby="inv-follow" onClick={() => pickLine(i)}
                    className={`focus-ring relative flex min-h-[48px] w-full rounded-xl border px-2.5 py-2 text-left transition-[background-color,border-color,color] duration-150 ${on ? "border-cobalt bg-cobalt text-white" : "border-line bg-paper hover:border-ink/30"}`}>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="min-w-0 text-[13.5px] font-semibold leading-[1.3]">{x.what}</span>
                        <span className="shrink-0 font-mono text-[12.5px] tabular-nums">{x.amount}</span>
                      </span>
                      <span className={`block font-mono text-[12px] tabular-nums ${on ? "text-white" : "text-slate"}`}>{x.who} · <span className="whitespace-nowrap">{x.hours} × {x.rate}</span></span>
                    </span>
                    {on && <Pulse i={0} run={run} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Station>

        {/* 2 · The invoice, composed from those lines. */}
        <Station n={2} title={L.stations.invoice} tool={d.tools.books} join={<Join i={1} on run={run} />}>
          <div className="flex items-baseline justify-between gap-3 px-1">
            <p className="min-w-0 truncate text-[13.5px] font-semibold">{c.name}</p>
            <p className="shrink-0 font-mono text-[12px] tabular-nums text-slate">{c.invoice.number}</p>
          </div>
          <ul role="list" className="mt-2 space-y-0.5">
            {c.lines.map((x, i) => (
              <li key={`${c.id}-${i}`} style={beat(1)} className={`${HL} relative flex items-baseline justify-between gap-2 rounded-md px-1 py-1 text-[13px] ${x === l ? "bg-ice shadow-[inset_2px_0_0_theme(colors.cobalt)]" : ""}`}>
                {x === l && <Pulse i={1} run={run} />}
                <span className="min-w-0">{x.what}</span>
                <span className="shrink-0 font-mono text-[12.5px] tabular-nums">{x.amount}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-auto space-y-0.5 border-t border-line px-1 pt-2 text-[13px]">
            <div className="flex justify-between gap-2 text-slate"><dt>{L.subtotal}</dt><dd className="font-mono text-[12.5px] tabular-nums">{c.invoice.subtotal}</dd></div>
            <div className="flex justify-between gap-2 text-slate"><dt>{L.vat}</dt><dd className="font-mono text-[12.5px] tabular-nums">{c.invoice.vat}</dd></div>
            <div className="flex justify-between gap-2 font-semibold"><dt>{L.total}</dt><dd className="font-mono text-[13px] tabular-nums">{c.invoice.total}</dd></div>
          </dl>
          <p className="mt-2 px-1 text-[12.5px] text-slate">{L.sent} {c.invoice.sent} · {L.due} {c.invoice.due}</p>
        </Station>

        {/* 3 · The payment through the link, matched to the invoice; or still open. */}
        <Station n={3} title={L.stations.payment} tool={d.tools.pay} join={<Join i={2} on={paid} run={run} />}>
          {c.payment.state === "paid" ? (
            <>
              <div className="flex items-baseline justify-between gap-3 px-1">
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ok-ink"><Check />{L.paid} {c.payment.date}</p>
                <p className="shrink-0 font-mono text-[13px] font-semibold tabular-nums">{c.invoice.total}</p>
              </div>
              <p className="mt-1 px-1 text-[13px] text-slate">{c.payment.method} · {c.payment.from}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 self-start rounded-md bg-ok-soft px-2 py-1 text-[12.5px] text-ok-ink"><Check />{fill(L.matched, "n", c.invoice.number)}</p>
            </>
          ) : (
            <>
              <div className="flex items-baseline justify-between gap-3 px-1">
                <p className="text-[13.5px] font-semibold">{L.open}</p>
                <p className="shrink-0 font-mono text-[13px] font-semibold tabular-nums">{c.invoice.total}</p>
              </div>
              <p className="mt-1 px-1 text-[13px] text-slate">{L.due} {c.invoice.due}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 self-start rounded-md bg-warn-soft px-2 py-1 text-[12.5px] text-ink">
                <span aria-hidden className="h-2 w-2 rounded-full bg-warn" />{c.payment.late} {L.overdue}
              </p>
            </>
          )}
          {/* What happened to this invoice: sent with its link, any reminders, paid (or not yet). */}
          <ol className="my-3 space-y-1.5 border-l border-line pl-3 text-[13px]">
            <li><span className="font-mono text-[12px] tabular-nums text-slate">{c.invoice.sent}</span> · {L.linkSent}</li>
            {c.reminders.filter((r) => r.state === "sent").map((r) => (
              <li key={r.label}><span className="font-mono text-[12px] tabular-nums text-slate">{r.when.split(" · ")[0]}</span> · {r.label}</li>
            ))}
            {c.payment.state === "paid" && <li className="text-ok-ink"><span className="font-mono text-[12px] tabular-nums">{c.payment.date}</span> · {L.paid}</li>}
          </ol>
          <div style={beat(2)} className={`${HL} relative mt-auto rounded-md bg-ice px-2 py-1.5 text-[13px] shadow-[inset_2px_0_0_theme(colors.cobalt)]`}>
            <Pulse i={2} run={run} />
            <span className="text-slate">{L.contains}:</span> {l.what} <span className="whitespace-nowrap font-mono text-[12.5px] tabular-nums">{l.amount}</span>
          </div>
        </Station>

        {/* 4 · The booking in the books. */}
        <Station n={4} title={L.stations.ledger} tool={d.tools.books}>
          <p className="px-1 text-[13px] text-slate">{fill(L.booked, "tool", d.tools.books)} · {paid && c.payment.state === "paid" ? c.payment.date : c.invoice.sent}</p>
          <ul role="list" className="mt-2 space-y-0.5">
            {c.ledger.map((r) => (
              <li key={r.account} style={r.revenue ? beat(3) : undefined}
                className={`relative rounded-md px-1 py-1 text-[13px] ${r.revenue ? `${HL} bg-ice shadow-[inset_2px_0_0_theme(colors.cobalt)]` : ""}`}>
                {r.revenue && <Pulse i={3} run={run} />}
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`min-w-0 ${!r.revenue && !paid && r === c.ledger[c.ledger.length - 1] ? "text-ink" : ""}`}>{r.account}</span>
                  <span className={`shrink-0 font-mono text-[12.5px] tabular-nums ${!r.revenue && r === c.ledger[c.ledger.length - 1] ? (paid ? "text-ok-ink" : "") : ""}`}>{r.amount}</span>
                </span>
                {r.revenue && <span className="block text-[12.5px] text-slate">{L.ofWhich} {l.what} <span className="whitespace-nowrap font-mono tabular-nums text-ink">{l.amount}</span></span>}
              </li>
            ))}
          </ul>
        </Station>
      </ol>

      {/* The reminder lane for this client, with its switch. */}
      <div className="mt-4 rounded-2xl border border-white/15 px-4 py-4 sm:px-5 lg:mt-5">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
            {L.reminders.title} · <span className="normal-case tracking-normal text-white">{c.name}</span>
          </p>
          <button type="button" role="switch" aria-checked={!remindersOff} onClick={() => setOff((v) => ({ ...v, [c.id]: !v[c.id] }))}
            className="focus-ring flex min-h-[44px] items-center gap-3 rounded-lg text-left text-[14px] text-white/80">
            <span>{fill(L.reminders.toggle, "client", c.name)}</span>
            <span aria-hidden className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ${remindersOff ? "bg-white/20" : "bg-cobalt-2"}`}>
              <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-150 ${remindersOff ? "" : "translate-x-4"}`} />
            </span>
            <span className="w-7 font-mono text-[12px] text-white">{remindersOff ? L.reminders.off : L.reminders.on}</span>
          </button>
        </div>
        <ol className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-3 sm:gap-4">
          {c.reminders.map((r) => {
            const state = r.state === "planned" && remindersOff ? "off" : r.state;
            return (
              <li key={r.label} className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${state === "sent" ? "bg-white/[0.06]" : "border border-dashed border-white/15"}`}>
                <span aria-hidden className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${state === "sent" ? "bg-warn" : state === "planned" ? "border-2 border-warn" : "border-2 border-white/30"}`} />
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-white">{r.label}</span>
                  <span className="block text-[13px] text-white/70">
                    {r.when} · <span className={state === "sent" || state === "planned" ? "text-white" : ""}>{state === "off" ? L.reminders.off : L.reminders[state]}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-[13.5px] text-peri" aria-live="polite">
          {remindersOff ? L.reminders.offNote : c.payment.state === "paid" ? fill(L.reminders.stopped, "date", c.payment.date) : " "}
        </p>
      </div>
    </div>
  );
}
