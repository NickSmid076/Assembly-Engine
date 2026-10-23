"use client";
// The brand stage: an example page on a plate, its parts above it and the brand-guide tokens above them.
// Desktop with motion allowed: CSS 3D. Exploded, the plate lies at the house isometric angle with every part
// floating over its slot and every token over the part it styles; "put it together" drops the tokens into the
// parts (which take on the brand), settles the parts onto the page and turns the page to face you. Everywhere
// else (phones, tablets, reduced motion) the exploded rules never apply, so the stage is the flat, finished page.
// All the 3D is CSS transforms on HTML (app/globals.css, `.bs-*`), so text stays text. The stage is aria-hidden
// in the assembly view; the panel says the same in words. Rules: .claude/skills/ae-ui-3d.
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { BrandComponent, BrandDevice, BrandPage, BrandSignature } from "../schema";
import { DEVICE, LAYOUT, LIFT, STAGE, TILT, TIMING, TOKENS, TOKEN_Z, USES, VIEW, plateSize, styledAt, type Rect, type Token } from "./geometry";

export type Highlight = { kind: "part"; id: BrandComponent } | { kind: "token"; id: Token } | null;

type Page = BrandSignature["pages"][number];
type Brand = BrandSignature["brand"];

const px = (n: number) => `${n}px`;
const ms = (n: number) => `${Math.round(n)}ms`;

function Check({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={`h-3.5 w-3.5 shrink-0 ${on ? "text-cobalt" : "text-slate"}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.3l2.4 2.4 4.6-5" />
    </svg>
  );
}

/** One face of a part. `s` = styled with the brand guide; otherwise the same part, unstyled (system type, grey,
 *  dashed edges), so the tokens visibly turn parts into the brand. */
function Face({ id, r, s, page, brand, phone }: { id: BrandComponent; r: Rect; s: boolean; page: Page; brand: Brand; phone: boolean }) {
  const display = s ? "font-display font-bold tracking-[-0.02em] text-ink" : "font-sans font-medium text-ink/70";
  const body = s ? "text-ink/70" : "text-slate";
  const edge = s ? "" : "outline-dashed outline-1 -outline-offset-1 outline-slate/50";
  const mark = (size: number) => (
    <span className={`grid shrink-0 place-items-center rounded-md font-display text-[12px] font-extrabold tracking-[-0.03em] ${s ? "bg-ink text-white" : "border border-dashed border-slate/60 text-slate"}`}
      style={{ width: px(size), height: px(size) }}>{brand.mark}</span>
  );
  switch (id) {
    case "header":
      return (
        <div className={`flex h-full items-center gap-2.5 border-b px-4 ${s ? "border-line bg-white" : "border-dashed border-slate/40 bg-white"} ${phone ? "px-3" : "px-6"}`}>
          {mark(phone ? 22 : 24)}
          <span className={`min-w-0 flex-1 truncate text-[13px] ${s ? "font-display font-bold text-ink" : "font-sans text-slate"}`}>{brand.firm}</span>
          {phone ? (
            <span aria-hidden className="flex flex-col gap-1"><span className={`h-0.5 w-4 rounded ${s ? "bg-ink" : "bg-slate/60"}`} /><span className={`h-0.5 w-4 rounded ${s ? "bg-ink" : "bg-slate/60"}`} /></span>
          ) : (
            <span className="flex items-center gap-4 text-[12px]">
              {brand.nav.map((n) => <span key={n} className={s ? "text-ink/75" : "text-slate"}>{n}</span>)}
            </span>
          )}
        </div>
      );
    case "crumb":
      return <p className={`truncate text-[12px] leading-none ${s ? "text-cobalt" : "text-slate"}`}>{page.crumb}</p>;
    case "hero":
      return (
        <div className={`h-full ${edge}`}>
          <p className={`text-balance leading-[1.08] ${display} ${phone ? "text-[21px]" : "text-[30px]"}`}>{page.heading}</p>
          <p className={`mt-2.5 text-pretty leading-[1.45] ${body} ${phone ? "text-[12px]" : "text-[13.5px]"}`}>{page.body}</p>
        </div>
      );
    case "button":
      return (
        <div className={`flex h-full items-center justify-center rounded-lg px-3 text-[13px] font-semibold ${s ? "bg-cobalt text-white" : "border border-dashed border-slate/60 font-normal text-slate"}`}>
          <span className="truncate">{page.button}</span>
        </div>
      );
    case "cards":
      return (
        <div className={`grid h-full gap-2 ${phone ? "grid-rows-3" : "grid-cols-3 gap-3"}`}>
          {page.items.map((it) => (
            <div key={it.title} className={`min-w-0 rounded-lg px-3 py-2.5 ${s ? "bg-ice" : "border border-dashed border-slate/50 bg-white"}`}>
              <p className={`truncate text-[14px] leading-[1.2] ${display}`}>{it.title}</p>
              <p className={`mt-1 line-clamp-2 text-[12px] leading-[1.35] ${body}`}>{it.text}</p>
            </div>
          ))}
        </div>
      );
    case "list":
      return (
        <ul className={`flex h-full flex-col justify-between border-y py-2.5 ${s ? "border-line" : "border-dashed border-slate/40"}`}>
          {page.items.map((it) => (
            <li key={it.title} className={`flex min-w-0 items-center gap-2 ${phone ? "text-[12px]" : "text-[13px]"} ${s ? "text-ink" : "text-slate"}`}>
              <Check on={s} /><span className="truncate">{it.title}</span>
            </li>
          ))}
        </ul>
      );
    case "form":
      return (
        <div className="flex h-full flex-col justify-between">
          {page.items.map((it) => (
            <div key={it.title}>
              <p className={`text-[12px] leading-none ${s ? "font-medium text-ink" : "text-slate"}`}>{it.title}</p>
              <div className={`mt-1.5 h-[22px] rounded-md border ${s ? "border-line-2 bg-white" : "border-dashed border-slate/50"}`} />
            </div>
          ))}
        </div>
      );
    case "aside":
      return (
        <div className={`flex h-full flex-col justify-center rounded-xl px-4 ${s ? "bg-ice" : "border border-dashed border-slate/50 bg-white"}`}>
          <p className={`font-mono text-[12px] uppercase tracking-[0.08em] ${s ? "text-cobalt" : "text-slate"}`}>{page.aside.label}</p>
          <p className={`mt-1.5 text-[15px] leading-[1.2] ${display}`}>{page.aside.title}</p>
          <p className={`mt-1 text-[12px] ${body}`}>{page.aside.text}</p>
        </div>
      );
    case "footer":
      return (
        <div className={`flex h-full items-center gap-2 px-4 text-[12px] ${phone ? "px-3" : "px-6"} ${s ? "bg-ink text-white/80" : "border-t border-dashed border-slate/50 bg-white text-slate"}`}>
          <span className={`font-display font-extrabold ${s ? "text-white" : ""}`}>{brand.mark}</span>
          <span className="truncate">{brand.tagline}</span>
        </div>
      );
  }
}

/** A floating token: always faces the camera (it counter-rotates the tilt), so it reads like a callout. */
function TokenChip({ t, brand, roles, hl }: { t: Token; brand: Brand; roles: BrandSignature["labels"]["roles"]; hl: boolean }) {
  const colour = (id: "ink" | "accent" | "tint") => brand.colours.find((c) => c.id === id)!;
  const ring = hl ? "ring-2 ring-cobalt-2 ring-offset-2 ring-offset-ink" : "";
  const card = `flex items-center gap-2.5 whitespace-nowrap rounded-lg bg-white px-2.5 py-2 text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,.55)] ${ring}`;
  if (t === "mark") {
    return <div className={card}><span className="grid h-8 w-8 place-items-center rounded-md bg-ink font-display text-[14px] font-extrabold tracking-[-0.03em] text-white">{brand.mark}</span><span className="text-[12px] leading-tight text-slate">{roles.mark}</span></div>;
  }
  if (t === "display" || t === "body") {
    const face = t === "display" ? brand.type.display : brand.type.body;
    return (
      <div className={card}>
        <span className={`text-[24px] leading-none ${t === "display" ? "font-display font-bold tracking-[-0.03em]" : "font-sans font-normal"}`}>Aa</span>
        <span className="leading-tight"><span className="block text-[12px] text-slate">{t === "display" ? roles.display : roles.body}</span><span className="block text-[13px] font-semibold">{face}</span></span>
      </div>
    );
  }
  const c = colour(t);
  return (
    <div className={card}>
      <span className={`h-8 w-8 rounded-md ${t === "tint" ? "border border-line-2" : ""}`} style={{ background: c.hex }} />
      <span className="leading-tight"><span className="block text-[13px] font-semibold">{c.name}</span><span className="block font-mono text-[12px] text-slate">{c.hex}</span></span>
    </div>
  );
}

export default function Stage({ d, page, device, mode, exploded, hl, settle }: {
  d: BrandSignature; page: BrandPage; device: BrandDevice; mode: "build" | "proof"; exploded: boolean; hl: Highlight; settle: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const plate = plateSize(device);
  const D = DEVICE[device];
  const layout = LAYOUT[page][device];
  const words = d.pages.find((p) => p.id === page)!;
  const proof = d.proof.pages.find((p) => p.page === page)!;
  const shot = proof.images[device];
  const phone = device === "phone";
  const lit = new Set<BrandComponent>(hl?.kind === "part" ? [hl.id] : hl?.kind === "token" ? USES[hl.id] : []);
  const proofMode = mode === "proof";

  // Fit the logical stage to its box: 800 px wide on desktop (room for the exploded view), the device's own size
  // below lg (flat). Set on the element, not in React state, so server and client render the same markup.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const mq = matchMedia("(min-width: 1024px)");
    const fit = () => el.style.setProperty("--s", String(el.clientWidth / (mq.matches ? STAGE.w : plate.w)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    mq.addEventListener("change", fit);
    return () => { ro.disconnect(); mq.removeEventListener("change", fit); };
  }, [plate.w]);

  const V = VIEW[device];
  const n = layout.blocks.length;
  const url = `${d.brand.url}${words.path}`;

  return (
    <div ref={box} data-state={exploded && !proofMode ? "exploded" : "assembled"} data-device={device}
      aria-hidden={!proofMode}
      className={`bs-stage relative mx-auto w-full overflow-hidden aspect-[var(--ar)] lg:aspect-[4/3] lg:max-w-none lg:overflow-visible ${phone ? "max-w-[270px]" : ""}`}
      style={{
        "--ar": `${plate.w} / ${plate.h}`, "--sa-lg": V.assembled, "--se": V.exploded, "--tx": px(V.shiftX), "--ty": px(V.shiftY),
        "--tx-deg": `${TILT.x}deg`, "--tz-deg": `${TILT.z}deg`,
      } as React.CSSProperties}>
      {/* Fit (no transition) → camera (turns between exploded and assembled). Keyed by device: a new frame starts
          in place instead of tweening from the other device's size. */}
      <div key={device} className="bs-fit absolute inset-0">
      <div className="bs-rig" style={{ width: px(plate.w), height: px(plate.h), left: `calc(50% - ${plate.w / 2}px)`, top: `calc(50% - ${plate.h / 2}px)` }}>
        {/* The plate: the device with the finished page's ground and an empty slot for every part. */}
        <div className={`absolute inset-0 ${phone ? "bg-ink-3 ring-1 ring-inset ring-white/20" : "bg-white"}`} style={{ borderRadius: px(D.radius), boxShadow: "0 40px 80px -40px rgba(0,0,0,.6)" }}>
          {!phone && (
            <div className="flex items-center border-b border-line bg-paper px-3" style={{ height: px(D.bar), borderRadius: `${D.radius}px ${D.radius}px 0 0` }}>
              <span className="mx-auto max-w-[70%] truncate rounded-md bg-white px-3 py-0.5 font-mono text-[12px] text-slate">{proofMode ? proof.url : url}</span>
            </div>
          )}
          <div className="absolute overflow-hidden bg-white" style={{ left: px(D.bezel), top: px(D.bezel + D.bar), width: px(D.screen.w), height: px(D.screen.h), borderRadius: phone ? px(D.radius - D.bezel) : `0 0 ${D.radius}px ${D.radius}px` }}>
            {proofMode && (
              <Image key={shot.url} src={shot.url} alt={shot.alt} width={shot.width} height={shot.height}
                sizes={phone ? "260px" : "(min-width: 1024px) 720px, 92vw"} className="bs-fade block h-full w-full object-cover object-top" />
            )}
          </div>
          {/* Exploded: the page is still a blueprint (dark, with an outline for every part); it turns white as the parts land. */}
          {!proofMode && (
            <div className="bs-blueprint absolute inset-0 bg-ink-2 ring-1 ring-inset ring-peri/25" style={{ borderRadius: px(D.radius) }}>
              <div className="absolute" style={{ left: px(D.bezel), top: px(D.bezel + D.bar), width: px(D.screen.w), height: px(D.screen.h) }}>
                {layout.blocks.map(({ id, r }) => (
                  <span key={`${page}-${device}-${id}`} className="absolute rounded-md border border-dashed border-peri/55"
                    style={{ left: px(r.x), top: px(r.y), width: px(r.w), height: px(r.h) }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {!proofMode && (
          <>
            {/* The parts. Each keeps its own plane (not preserve-3d), so its two faces never z-fight. */}
            <div className="bs-layer absolute" style={{ left: px(D.bezel), top: px(D.bezel + D.bar), width: px(D.screen.w), height: px(D.screen.h) }}>
              {layout.blocks.map(({ id, r }, i) => {
                const sIn = styledAt(layout, id);
                return (
                  <div key={`${page}-${device}-${id}-${settle}`} data-part={id}
                    className={`bs-part absolute ${lit.has(id) ? "is-lit" : ""}`}
                    style={{
                      left: px(r.x), top: px(r.y), width: px(r.w), height: px(r.h),
                      "--z": px(LIFT[id]),
                      "--din": ms(TIMING.partStart + i * TIMING.partStep), "--dout": ms(TIMING.rPartStart + (n - 1 - i) * TIMING.partStep),
                      "--dsin": ms(sIn), "--dsout": ms(TIMING.rTokenStart),
                      "--i": i,
                    } as React.CSSProperties}>
                    <div className="bs-settle relative h-full w-full">
                      <div className="bs-wire absolute inset-0 rounded-md bg-white"><Face id={id} r={r} s={false} page={words} brand={d.brand} phone={phone} /></div>
                      <div className="bs-styled absolute inset-0"><Face id={id} r={r} s page={words} brand={d.brand} phone={phone} /></div>
                      <span aria-hidden className="bs-ring pointer-events-none absolute -inset-1 rounded-lg border-2 border-cobalt-2" />
                    </div>
                  </div>
                );
              })}

              {/* Tokens over the parts they style, each on a dashed drop line down to its part. */}
              {TOKENS.map((t, k) => {
                const p = layout.tokens[t];
                const land = LIFT[p.into];
                return (
                  <div key={t} className="bs-drop-wrap" style={{ "--dtin": ms(k * TIMING.tokenStep), "--dtout": ms(TIMING.rTokenStart + (TOKENS.length - 1 - k) * TIMING.tokenStep) } as React.CSSProperties}>
                    <span className="bs-line absolute border-l border-dashed border-white/50"
                      style={{ left: px(p.x), top: px(p.y), height: px(TOKEN_Z - land), "--z0": px(land) } as React.CSSProperties} />
                    <div className={`bs-token absolute ${hl?.kind === "token" && hl.id === t ? "is-lit" : ""}`}
                      style={{ left: px(p.x), top: px(p.y), "--tz": px(TOKEN_Z), "--tland": px(land) } as React.CSSProperties}>
                      <div className="absolute bottom-0 left-0 -translate-x-1/2">
                        <TokenChip t={t} brand={d.brand} roles={d.labels.roles} hl={hl?.kind === "token" && hl.id === t} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </>
        )}
      </div>
      </div>
    </div>
  );
}
