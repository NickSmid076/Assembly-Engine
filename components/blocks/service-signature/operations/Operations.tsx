"use client";
// "Wat ontbreekt er nog?" · the operations signature. A dossier per client and period (HTML): choose a
// client and a period to see what is in and what is missing; choose a document to follow its route
// (received → checked → named → filed) or, when it is missing, its reminders (requested → day 3 → day 7 →
// waiting) until a person signs off. Desktop: the same dossier as an isometric object beside it (SVG poster,
// then three.js) where the document travels from its tray through the check into its slot. Phone/tablet:
// the route as a 2D track that fills step by step. Rules: .claude/skills/ae-ui-3d.
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import type { OperationsSignature, OpsDoc } from "../schema";
import { CARD, CHANNEL, DOSSIER, PLATE, GATE, GATE_PARTS, LIFT, SEAL, TRAYS, VIEW, anchor, cardAt, chipAt, route, stepTimes } from "./geometry";
import Poster, { type SlotState } from "./Poster";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function webgl() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

/** Mount the 3D only on a desktop with a fine pointer and motion allowed, after load + idle, near the viewport. */
function use3D(ref: React.RefObject<HTMLElement | null>) {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches || !webgl()) return;
    let idle = 0, timer = 0;
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      near.disconnect();
      const go = () => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) idle = ric(() => setEnabled(true), { timeout: 2000 }); else timer = window.setTimeout(() => setEnabled(true), 400);
      };
      if (document.readyState === "complete") go(); else addEventListener("load", go, { once: true });
    }, { rootMargin: "0px 0px 100% 0px" });
    near.observe(el);
    return () => {
      near.disconnect(); clearTimeout(timer);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cic) cic(idle);
    };
  }, [ref]);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    let seen = false, visible = document.visibilityState === "visible";
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; setActive(seen && visible); });
    const vis = () => { visible = document.visibilityState === "visible"; setActive(seen && visible); };
    io.observe(ref.current);
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, [enabled, ref]);
  return { enabled, active };
}

/** Becomes true once, when the element is mostly in view (starts the first route animation). */
function useSeen(ref: React.RefObject<HTMLElement | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function Check({ className = "h-3 w-3" }: { className?: string }) {
  return <svg viewBox="0 0 12 12" aria-hidden className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.3l2.4 2.4 4.6-5" /></svg>;
}

type Step = { label: string; detail: string; mono?: boolean; state: "done" | "planned" | "waiting" };

function steps(d: OperationsSignature, doc: OpsDoc, deadline: string): Step[] {
  const L = d.labels;
  if (doc.status === "received") return [
    { label: L.steps.received, detail: `${L.channels[doc.via]} · ${doc.at}`, state: "done" },
    { label: L.steps.checked, detail: `${L.matched} · ${doc.pages}`, state: "done" },
    { label: L.steps.named, detail: doc.name, mono: true, state: "done" },
    { label: L.steps.filed, detail: doc.folder, mono: true, state: "done" },
  ];
  return [
    { label: L.steps.requested, detail: doc.requested, state: "done" },
    { label: L.steps.day3, detail: doc.sent >= 1 ? doc.day3 : `${L.planned} · ${doc.day3}`, state: doc.sent >= 1 ? "done" : "planned" },
    { label: L.steps.day7, detail: doc.sent >= 2 ? doc.day7 : `${L.planned} · ${doc.day7}`, state: doc.sent >= 2 ? "done" : "planned" },
    { label: L.steps.waiting, detail: deadline, state: "waiting" },
  ];
}

/** A connector in the phone strip: cobalt when the document came this way, dashed warn while it is missing. */
function Wire({ on, k }: { on: boolean; k: string }) {
  return (
    <span className="relative mx-1.5 h-0.5 min-w-4 flex-1">
      <span className={`absolute inset-0 ${on ? "bg-white/15" : "border-t-2 border-dashed border-warn/70"}`} />
      {on && <span key={k} className="absolute inset-0 bg-cobalt-2" />}
    </span>
  );
}

/** A file name or folder path that may wrap only at its separators (space, - _ . / ›), never inside a word.
 *  A single part longer than the column is cut with an ellipsis; the full name is in the parent's title. */
function Segments({ text }: { text: string }) {
  const parts = text.split(/(?<=[\s_\-./›])/);
  return <>{parts.map((p, i) => <span key={i} className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-pre align-top">{p}</span>)}</>;
}

const pct = (a: { left: number; top: number }) => ({ left: `${a.left * 100}%`, top: `${a.top * 100}%` });

export default function Operations({ data: d }: { data: OperationsSignature }) {
  const [client, setClient] = useState(d.initial.client);
  const [period, setPeriod] = useState(d.initial.period);
  const [slot, setSlot] = useState(() => Math.max(0, d.items.findIndex((i) => i.id === d.initial.item)));
  const [run, setRun] = useState(0); // bumps on every choice, so the route plays again
  const [offset, setOffset] = useState(0); // seconds the 3D waits before the document leaves its tray

  const dossier = d.dossiers.find((x) => x.client === client && x.period === period) ?? d.dossiers[0];
  const doc = dossier.docs[slot];
  const slots: SlotState[] = useMemo(() => dossier.docs.map((x) => ({ received: x.status === "received", sent: x.status === "missing" ? x.sent : 0 })), [dossier]);
  const routePts = useMemo(() => route(doc.status === "received" ? CHANNEL[doc.via] : CHANNEL.email, slot), [doc, slot]);
  const times = stepTimes(routePts);
  const flow = steps(d, doc, dossier.deadline);
  const inCount = slots.filter((s) => s.received).length;
  const clientName = d.clients.find((c) => c.id === client)?.name ?? "";
  const periodLabel = d.periods.find((p) => p.id === period)?.label ?? "";
  const item = (id: string) => d.items.find((i) => i.id === id)?.label ?? id;

  const stageRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);
  const { enabled, active } = use3D(stageRef);
  const [ready, setReady] = useState(false);
  const stageSeen = useSeen(stageRef);
  const routeSeen = useSeen(routeRef);
  const stripRef = useRef<HTMLDivElement>(null);

  const pickDossier = (c: string, p: string) => {
    if (c === client && p === period) return;
    setClient(c); setPeriod(p); setOffset(0.05 + slot * 0.09); setRun((n) => n + 1);
  };
  const pickSlot = (i: number) => { setSlot(i); setOffset(0); setRun((n) => n + 1); };
  // When the 3D takes over, its first document leaves after the cards have settled: replay the steps in step.
  const onReady = () => { setReady(true); setOffset(0.2 + 5 * 0.09); setRun((n) => n + 1); };

  const sel = cardAt(slot);
  const selTop = doc.status === "received"
    ? anchor([sel.x, DOSSIER.h + CARD.h + LIFT.card + 0.22, sel.z])
    : anchor([sel.x, chipAt(slot, Math.max(0, doc.sent - 1)).base + 0.3, sel.z]);
  const animate = ready ? true : routeSeen || stageSeen;
  const delayed = doc.status === "received" && ready; // with the 3D, the steps follow the travelling sheet

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-10 xl:gap-x-14">
      {/* Left column on desktop (stage + route, centred against the panel); on phone its children join the
          grid directly so the route can follow the panel. */}
      <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:justify-center lg:gap-10">
      {/* Desktop stage: the dossier as an object. Labels are HTML at projected anchors. */}
      <div ref={stageRef} className="relative hidden w-full lg:block" style={{ aspectRatio: VIEW.w / VIEW.h }}>
        <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100"}`}>
          <Poster slots={slots} selected={slot} sign={dossier.signoff.state} routePts={routePts} onSelect={pickSlot}
            drawKey={stageSeen ? `${client}-${period}-${slot}-${run}` : null} className="h-full w-full" />
        </div>
        {enabled && (
          <div className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
            <Scene active={active} slots={slots} selected={slot} sign={dossier.signoff.state} routePts={routePts}
              dossierKey={`${client}-${period}`} onSelect={pickSlot} onReady={onReady} />
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[13px]">
          {TRAYS.map((t, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap text-white/70" style={pct(anchor([t.x, t.h + 0.9, t.z]))}>
              {i === CHANNEL.portal ? d.labels.channels.portal : d.labels.channels.email}
            </span>
          ))}
          <span className="absolute -translate-y-1/2 whitespace-nowrap pl-2 text-white/70" style={pct(anchor([GATE.x, GATE_PARTS[2].base + GATE.beam, -GATE_PARTS[2].d / 2]))}>
            {d.labels.check}
          </span>
          {/* Under the drawer's front: whose dossier this is, and the state of the sign-off seal beside it. */}
          <span className="absolute -translate-x-1/2 whitespace-nowrap text-center leading-[1.5] text-white/70" style={pct(anchor([SEAL.x, -PLATE.h, PLATE.z + PLATE.d / 2 + 0.12]))}>
            {clientName} · {periodLabel}
            <span className={`block ${dossier.signoff.state === "signed" ? "text-ok" : dossier.signoff.state === "ready" ? "text-peri" : "text-white/70"}`}>
              {d.labels.sign[dossier.signoff.state]}
            </span>
          </span>
          <span key={`${client}-${period}-${slot}`}
            className={`absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md px-2 py-0.5 font-sans text-[13px] font-semibold transition-[top] duration-300 ${doc.status === "received" ? "bg-cobalt text-white" : "bg-warn-soft text-ink"}`}
            style={pct(selTop)}>
            {item(doc.item)}
          </span>
        </div>
      </div>

      {/* The chosen document's route: horizontal under the stage on desktop, a vertical track on phone. */}
      <div ref={routeRef} id="ops-route" aria-live="polite" className="order-2 min-w-0 lg:order-none">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
          {d.labels.route} · <span className="normal-case tracking-normal text-white">{item(doc.item)}</span>
        </p>
        <ol key={`${client}-${period}-${slot}-${run}`} className="relative mt-4 grid grid-cols-[minmax(0,1fr)] gap-y-0 lg:min-h-[132px] lg:grid-cols-4 lg:gap-x-5">
          {flow.map((s, i) => {
            const delay = animate ? `${((delayed ? offset : 0) + (doc.status === "received" ? (delayed ? times[i] : i * 0.18) : i * 0.12)).toFixed(2)}s` : undefined;
            const last = i === flow.length - 1;
            return (
              <li key={i} className="relative grid min-h-[76px] content-start grid-cols-[28px_minmax(0,1fr)] gap-x-3 pb-4 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)] lg:pb-0">
                {/* connector: down on phone, across on desktop */}
                {!last && <span aria-hidden className={`absolute left-[13px] top-7 bottom-0 w-0.5 lg:left-7 lg:right-[-20px] lg:top-[13px] lg:bottom-auto lg:h-0.5 lg:w-auto ${s.state === "done" && flow[i + 1].state !== "planned" ? (doc.status === "received" ? "bg-cobalt-2" : "bg-white/35") : "bg-white/15"}`} />}
                <span aria-hidden className={`relative z-[1] grid h-7 w-7 place-items-center rounded-full ${animate ? "ops-step" : ""} ${
                  s.state === "done" ? (doc.status === "received" ? "bg-cobalt-2 text-white" : "bg-white text-ink") : s.state === "waiting" ? "border-2 border-warn bg-warn-soft text-ink" : "border-2 border-dashed border-white/35"}`}
                  style={{ animationDelay: delay }}>
                  {s.state === "done" && <Check />}
                </span>
                <div className="min-w-0 lg:mt-3">
                  <p className="text-[14px] font-semibold text-white">{s.label}</p>
                  {s.mono
                    ? <p title={s.detail} className="mt-0.5 font-mono text-[12.5px] leading-[1.4] text-peri"><Segments text={s.detail} /></p>
                    : <p className="mt-0.5 text-[13px] leading-[1.4] text-white/70 [overflow-wrap:anywhere]">{s.detail}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      </div>

      {/* The dossier panel: client and period, the checklist, the sign-off. */}
      <div className="order-1 min-w-0 lg:order-none lg:col-start-2 lg:row-start-1">
        <p className="font-mono text-[13px] text-white/65">{d.labels.example}</p>
        <p id="ops-hint" className="mt-1 text-[14px] text-white/80">{d.labels.hint}</p>

        <div className="mt-5 space-y-3">
          <fieldset>
            <legend className="mb-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{d.labels.client}</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {d.clients.map((c) => (
                <button key={c.id} type="button" aria-pressed={c.id === client} onClick={() => pickDossier(c.id, period)}
                  className={`focus-ring min-h-[44px] rounded-lg border px-2 py-1.5 text-left font-display text-[13.5px] font-bold leading-[1.2] transition-[background-color,border-color,color] duration-150 ${c.id === client ? "border-white bg-white text-ink" : "border-white/15 text-white/80 hover:border-white/40"}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{d.labels.period}</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {d.periods.map((p) => (
                <button key={p.id} type="button" aria-pressed={p.id === period} onClick={() => pickDossier(client, p.id)}
                  className={`focus-ring min-h-[44px] rounded-lg border px-2 py-1.5 font-mono text-[13px] tabular-nums transition-[background-color,border-color,color] duration-150 ${p.id === period ? "border-white bg-white text-ink" : "border-white/15 text-white/80 hover:border-white/40"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Phone/tablet: the dossier in 2D. The document's channel, the check, and the drawer's five slots;
            the chosen slot is cobalt (in) or a dashed outline with one dot per reminder (missing). */}
        <div ref={stripRef} aria-hidden className="mt-5 flex items-center lg:hidden">
          <span className="shrink-0 rounded-md border border-white/20 px-2 py-1.5 font-mono text-[12px] text-white/80">
            {doc.status === "received" ? d.labels.channels[doc.via] : d.labels.channels.email}
          </span>
          <Wire on={doc.status === "received"} k={`a-${client}-${period}-${slot}-${run}`} />
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/20">
            <span className={`h-3.5 w-3.5 rounded-sm border-2 border-b-0 ${doc.status === "received" ? "border-ok" : "border-white/40"}`} />
          </span>
          <Wire on={doc.status === "received"} k={`b-${client}-${period}-${slot}-${run}`} />
          <span className="flex shrink-0 items-end rounded-md bg-white/[0.06] px-1">
            {slots.map((x, i) => (
              <button key={i} type="button" tabIndex={-1} aria-label={item(dossier.docs[i].item)} onClick={() => pickSlot(i)}
                className="flex h-14 w-7 items-end justify-center pb-1.5">
                <span className={`relative block h-9 w-[18px] rounded-[3px] transition-[background-color,transform] duration-300 ${x.received
                  ? (i === slot ? "-translate-y-1.5 bg-cobalt-2" : "bg-white") : `border-[1.5px] border-dashed border-warn ${i === slot ? "bg-warn/30" : "bg-warn/10"}`}`}>
                  {!x.received && x.sent > 0 && (
                    <span className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                      {Array.from({ length: x.sent }, (_, k) => <span key={k} className="h-1.5 w-1.5 rounded-full bg-warn-soft" />)}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl bg-white text-ink">
          <div className="border-b border-line px-4 py-3 sm:px-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="min-w-0 truncate font-display text-[15px] font-bold">{clientName}</p>
              <p className="shrink-0 font-mono text-[12px] tabular-nums text-slate">{periodLabel}</p>
            </div>
            <p className="mt-0.5 text-[13px] text-slate">{dossier.deadline}</p>
          </div>

          <div className="px-4 pt-4 sm:px-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">{d.labels.checklist}</p>
              <p className="font-mono text-[12px] tabular-nums text-ink">{d.labels.progress.replace("{n}", String(inCount)).replace("{total}", String(slots.length))}</p>
            </div>
            {/* Progress as the five slots of the drawer: filled when in, dashed when missing. */}
            <div aria-hidden className="mt-2 grid grid-cols-5 gap-1">
              {slots.map((s, i) => (
                <span key={i} className={`h-1.5 rounded-full transition-colors duration-300 ${s.received ? (i === slot ? "bg-cobalt" : "bg-ink") : "border border-dashed border-warn bg-warn-soft"}`} />
              ))}
            </div>
          </div>

          <ul role="list" aria-describedby="ops-hint" className="space-y-1.5 p-4 pt-3 sm:p-5 sm:pt-3">
            {dossier.docs.map((x, i) => {
              const on = i === slot;
              const badge = x.status === "missing" ? (x.sent >= 2 ? d.labels.steps.day7 : x.sent === 1 ? d.labels.steps.day3 : d.labels.steps.requested) : null;
              return (
                <li key={x.item}>
                  <button type="button" aria-pressed={on} aria-controls="ops-route" onClick={() => pickSlot(i)}
                    className={`focus-ring flex min-h-[48px] w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-[background-color,border-color,color] duration-150 ${on ? "border-cobalt bg-cobalt text-white" : "border-line bg-paper hover:border-ink/30"}`}>
                    {x.status === "received"
                      ? <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${on ? "bg-white text-cobalt" : "bg-ok-soft text-ok-ink"}`}><Check /></span>
                      : <span aria-hidden className={`h-5 w-5 shrink-0 rounded-full border-2 border-dashed ${on ? "border-white" : "border-warn"}`} />}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[14.5px] font-bold">{item(x.item)}</span>
                      <span className={`block text-[13px] leading-[1.35] ${on ? "text-white" : "text-slate"}`}>
                        {x.status === "received" ? `${d.labels.received} · ${x.at}` : <><span className="sr-only">{d.labels.missing} · </span>{d.labels.steps.requested} <span className="whitespace-nowrap">{x.requested}</span>{badge && <span className="ml-1.5 inline-block whitespace-nowrap rounded bg-warn-soft px-1.5 font-mono text-[12px] text-ink sm:hidden">{badge}</span>}</>}
                      </span>
                    </span>
                    {badge && <span className="hidden shrink-0 rounded-md bg-warn-soft px-2 py-1 font-mono text-[12px] text-ink sm:block">{badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={`flex items-start gap-2.5 border-t border-line px-4 py-3.5 text-[13.5px] sm:px-5 ${dossier.signoff.state === "signed" ? "bg-ok-soft text-ok-ink" : "bg-paper text-ink"}`}>
            {dossier.signoff.state === "signed"
              ? <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ok-ink text-white"><Check className="h-2.5 w-2.5" /></span>
              : <span aria-hidden className={`mt-1 h-3 w-3 shrink-0 rounded-full ${dossier.signoff.state === "ready" ? "bg-cobalt" : "border-2 border-slate"}`} />}
            <p><span className="font-semibold">{d.labels.sign[dossier.signoff.state]}.</span> {dossier.signoff.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
