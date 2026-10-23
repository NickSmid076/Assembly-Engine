"use client";
// "Eén merkgids, elke pagina" · the brand signature. A brand guide (logo, two typefaces, three colours) becomes a
// handful of components, and the components become every page. Desktop: an exploded view of the example page
// (CSS 3D) that puts itself together once when it comes into view; take it apart again, switch page or screen and
// the same parts settle into the new page. Phones and tablets: the finished page, flat, with the same choices.
// "Echt" swaps the example for the real Energielabel Breda pages in the same frame, with their sourced figures.
// Why depth: the layers (guide → components → page) sit on top of each other; pulling them apart shows that every
// page is built from the same few parts. Rules: .claude/skills/ae-ui-3d (CSS 3D), .claude/skills/ae-motion.
import { useEffect, useRef, useState } from "react";
import type { BrandComponent, BrandDevice, BrandPage, BrandSignature } from "../schema";
import { ASSEMBLED_AT, LAYOUT, TOKENS, USES, type Token } from "./geometry";

// Local, not imported from ../schema: a value import from the schema would ship zod to the browser.
const DEVICES: BrandDevice[] = ["desktop", "phone"];
import Stage, { type Highlight } from "./Stage";

type Mode = "build" | "proof";

/** The house control: separate bordered buttons, white when active (as in the Operations signature). */
const segBtn = (on: boolean) => `focus-ring min-h-[44px] rounded-lg border px-2 py-1.5 font-display text-[13.5px] font-bold leading-[1.2] transition-[background-color,border-color,color] duration-150 ${on ? "border-white bg-white text-ink" : "border-white/15 text-white/80 hover:border-white/40"}`;

function DeviceIcon({ d }: { d: BrandDevice }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mx-auto h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      {d === "desktop" ? <><rect x="2.5" y="3.5" width="15" height="10" rx="1.5" /><path d="M7 16.5h6" strokeLinecap="round" /></> : <><rect x="6" y="2.5" width="8" height="15" rx="2" /><path d="M9 14.5h2" strokeLinecap="round" /></>}
    </svg>
  );
}

export default function Brand({ data: d }: { data: BrandSignature }) {
  const L = d.labels;
  const [mode, setMode] = useState<Mode>("build");
  const [page, setPage] = useState<BrandPage>(d.initial.page);
  // This island is never hydrated: Signature wraps it in <Deferred>, so the client always renders it fresh and
  // may read the screen in its initial state. The server can't, so it renders the stage for both devices and CSS
  // shows the right one; the client's first render then matches what is on screen (no shift on phones).
  const server = typeof window === "undefined";
  const [device, setDevice] = useState<BrandDevice>(() => (!server && matchMedia("(max-width: 639px)").matches ? "phone" : d.initial.device));
  // Exploded only on desktop with motion allowed (CSS shows the assembled page everywhere else anyway).
  const [exploded, setExploded] = useState(() => server || matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches);
  const [hl, setHl] = useState<Highlight>(null);
  const [settle, setSettle] = useState(0);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  // Phones and tablets: the flat page from the start (a phone screen on a phone).
  useEffect(() => {
    const flat = !matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    if (flat) setExploded(false);
    if (matchMedia("(max-width: 639px)").matches) setDevice("phone");
  }, []);

  // Desktop with motion: put it together once, shortly after it is in view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      t = window.setTimeout(() => assemble(true), 900);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  function assemble(on: boolean) {
    setExploded(!on);
    setBusy(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setBusy(false), on ? ASSEMBLED_AT : 1500);
  }
  const pick = (fn: () => void) => { fn(); setSettle((n) => n + 1); };

  const layout = LAYOUT[page][device];
  const parts = layout.blocks.map((b) => b.id);
  const label = (id: BrandComponent) => d.components.find((c) => c.id === id)?.label ?? id;
  const words = d.pages.find((p) => p.id === page)!;
  const proof = d.proof.pages.find((p) => p.page === page)!;
  const facts = proof.facts.filter((f) => f.device === "all" || f.device === device);
  const summary = L.summary.replace("{page}", words.label).replace("{device}", L.devices[device]).replace("{n}", String(parts.length));
  const colour = (id: "ink" | "accent" | "tint") => d.brand.colours.find((c) => c.id === id)!;
  const toggleHl = (h: NonNullable<Highlight>) => setHl((cur) => (cur && cur.kind === h.kind && cur.id === h.id ? null : h));
  const isHl = (h: NonNullable<Highlight>) => !!hl && hl.kind === h.kind && hl.id === h.id;
  const tokenUsed = (t: Token) => USES[t].some((p) => parts.includes(p));

  const tokenLabel = (t: Token): { swatch?: string; text: string; sub: string } => {
    if (t === "mark") return { text: L.roles.mark, sub: "\u00a0" }; // the firm name already heads the card
    if (t === "display") return { text: d.brand.type.display, sub: L.roles.display };
    if (t === "body") return { text: d.brand.type.body, sub: L.roles.body };
    const c = colour(t);
    return { swatch: c.hex, text: c.name, sub: L.roles.colour };
  };


  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-x-10 xl:gap-x-14">
      {/* Stage: after the controls on phones, beside them on desktop. */}
      <div ref={stageRef} className="order-2 min-w-0 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-center">
        {server && device === "desktop" ? (
          <>
            <div className="max-sm:hidden"><Stage d={d} page={page} device="desktop" mode={mode} exploded={exploded} hl={hl} settle={settle} /></div>
            <div className="sm:hidden"><Stage d={d} page={page} device="phone" mode={mode} exploded={exploded} hl={hl} settle={settle} /></div>
          </>
        ) : (
          <Stage d={d} page={page} device={device} mode={mode} exploded={exploded} hl={hl} settle={settle} />
        )}
        {mode === "build" && (
          <div className="bs-explode-ctl mt-6 hidden items-center gap-4 lg:flex">
            {/* aria-disabled, not disabled: a disabled button loses keyboard focus mid-animation. */}
            <button type="button" onClick={() => { if (!busy) assemble(exploded); }} aria-disabled={busy}
              className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 text-[14px] font-semibold text-white transition-[border-color,opacity] duration-150 hover:border-white/50 aria-disabled:opacity-60">
              <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {exploded ? <path d="M3 5.5h10M3 8h10M3 10.5h10" /> : <path d="M3 3.5h10M3 8h10M3 12.5h10" />}
              </svg>
              {exploded ? L.assemble : L.explode}
            </button>
            <p className="text-[13px] text-white/65">{L.layers.guide} → {L.layers.parts} → {L.layers.page}</p>
          </div>
        )}
      </div>

      {/* Panel: the example label and hint, the quiet "real work" switch on its own row, one control row (page + screen), then one
          card: the brand guide (build) or the real pages' figures (proof). */}
      <div className="order-1 min-w-0 lg:order-none lg:col-start-2 lg:row-start-1">
        <p className="font-mono text-[13px] text-white/65">{mode === "build" ? L.example : d.proof.live}</p>
        <p id="brand-hint" className="mt-1 min-h-[42px] text-[14px] leading-[1.5] text-white/80">{mode === "build" ? L.hint : L.proofHint}</p>
        {/* The switch keeps its own row in both modes, so it never moves under the pointer. */}
        <div className="mt-2">
          <button type="button" role="switch" aria-checked={mode === "proof"} onClick={() => { setMode(mode === "build" ? "proof" : "build"); setHl(null); }}
            className="focus-ring -ml-1 inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-1 text-[13.5px] text-white/80 transition-colors duration-150 hover:text-white">
            <span aria-hidden className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ${mode === "proof" ? "bg-cobalt-2" : "bg-white/20"}`}>
              <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-150 ${mode === "proof" ? "translate-x-4" : ""}`} />
            </span>
            {L.proof}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-1.5">
          <fieldset className="min-w-0">
            <legend className="sr-only">{L.page}</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {d.pages.map((p) => (
                <button key={p.id} type="button" aria-pressed={p.id === page} onClick={() => p.id !== page && pick(() => { setPage(p.id); setHl(null); })} className={segBtn(p.id === page)}>{p.label}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className="ml-2.5">
            <legend className="sr-only">{L.device}</legend>
            <div className="grid grid-cols-2 gap-1.5">
              {DEVICES.map((v) => (
                <button key={v} type="button" aria-pressed={v === device} aria-label={L.devices[v]} title={L.devices[v]}
                  onClick={() => v !== device && pick(() => { setDevice(v); setHl(null); })} className={`${segBtn(v === device)} w-11 px-0`}>
                  <DeviceIcon d={v} />
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-5">
          {mode === "build" ? (
            <div className="overflow-hidden rounded-2xl bg-white text-ink">
              <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
                <p className="min-w-0 truncate font-display text-[15px] font-bold">{d.brand.firm}</p>
                <p className="shrink-0 font-mono text-[12px] text-slate">{L.guide}</p>
              </div>
              <p id="brand-pick" className="px-4 pt-4 text-[13px] text-slate sm:px-5">{L.pickToken}</p>
              <ul role="list" aria-describedby="brand-pick" className="grid grid-cols-3 gap-2 p-4 pt-3 sm:p-5 sm:pt-3">
                {TOKENS.filter(tokenUsed).map((t) => {
                  const x = tokenLabel(t);
                  const on = isHl({ kind: "token", id: t });
                  return (
                    <li key={t} className="min-w-0">
                      <button type="button" aria-pressed={on} aria-controls="brand-uses" onClick={() => toggleHl({ kind: "token", id: t })}
                        className={`focus-ring flex h-full min-h-[84px] w-full min-w-0 flex-col items-start rounded-xl border p-2.5 text-left transition-[background-color,border-color,color] duration-150 sm:p-3 ${on ? "border-cobalt bg-cobalt text-white" : "border-line bg-paper hover:border-ink/30"}`}>
                        {x.swatch
                          ? <span aria-hidden className={`h-6 w-6 rounded-md ${on ? "ring-1 ring-white/60" : "ring-1 ring-ink/10"}`} style={{ background: x.swatch }} />
                          : t === "mark"
                            ? <span aria-hidden className={`grid h-6 min-w-6 place-items-center rounded-md px-1 font-display text-[12px] font-extrabold ${on ? "bg-white text-cobalt" : "bg-ink text-white"}`}>{d.brand.mark}</span>
                            : <span aria-hidden className={`text-[22px] leading-6 ${t === "display" ? "font-display font-bold" : "font-sans"}`}>Aa</span>}
                        <span className="mt-auto block w-full truncate pt-2 text-[13.5px] font-semibold leading-tight">{x.text}</span>
                        <span className={`block w-full truncate text-[12.5px] ${on ? "text-white" : "text-slate"} ${x.swatch ? "font-mono" : ""}`}>{x.swatch ?? x.sub}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p id="brand-uses" aria-live="polite" className="min-h-[52px] border-t border-line bg-paper px-4 py-3.5 text-[13.5px] leading-[1.45] sm:px-5">
                {hl?.kind === "token"
                  ? <><span className="text-slate">{L.usedIn}: </span><span className="font-medium">{USES[hl.id].filter((p) => parts.includes(p)).map(label).join(", ")}</span></>
                  : <span className="text-slate">{summary}</span>}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white text-ink">
              <div className="border-b border-line px-4 py-3 sm:px-5">
                <p className="font-display text-[15px] font-bold">{d.proof.client}</p>
                <p className="mt-0.5 truncate font-mono text-[12px] text-slate">{proof.url}</p>
              </div>
              <dl className="divide-y divide-line px-4 sm:px-5">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-x-4 py-3.5">
                    <dt className="col-start-2 row-start-1 min-w-0">
                      <span className="block text-[14px] font-medium leading-[1.35]">{f.label}</span>
                      <span className="mt-1 block text-[13px] leading-[1.4] text-slate"><span className="sr-only">{L.source}: </span>{f.source}</span>
                    </dt>
                    <dd className="col-start-1 row-start-1 font-display text-[26px] font-bold leading-none tracking-[-0.03em] tabular-nums">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {page === "home" && <p className="border-t border-line bg-paper px-4 py-2.5 text-[13px] text-slate sm:px-5">{L.proofNote}</p>}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3.5 sm:px-5">
                <a href={d.proof.link.url} target={d.proof.link.target || undefined}
                  className="focus-ring inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-ink px-4 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-cobalt">
                  {d.proof.link.title} <span aria-hidden>→</span>
                </a>
                <a href={d.proof.site.url} target="_blank" rel="noopener noreferrer"
                  className="focus-ring inline-flex min-h-[44px] items-center text-[14px] font-medium text-ink underline decoration-line-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink">
                  {d.proof.site.title} <span aria-hidden className="ml-1">↗</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
