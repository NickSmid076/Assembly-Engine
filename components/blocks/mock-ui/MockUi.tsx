"use client";
// Mock UI · a calm, unbranded app window with example data: an email (with a tone switch when there are
// variants), a form, or a document whose {{merge_fields}} show as field chips. Always labelled "Example".
// Never a vendor's screen or logo. Content: MockUiBlock.
import { useState } from "react";
import type { MockUiBlock } from "./schema";
import { Check } from "@/components/icons";

type Mock = MockUiBlock["mock"];

/** `{{field}}` → a chip; the rest stays text. */
function Merge({ line }: { line: string }) {
  return (
    <>
      {line.split(/(\{\{[^}]+\}\})/g).map((part, i) =>
        /^\{\{.+\}\}$/.test(part)
          ? <span key={i} className="mx-0.5 inline-block rounded border border-peri bg-ice px-1.5 font-mono text-[12.5px] leading-[1.55] text-cobalt">{part.slice(2, -2)}</span>
          : <span key={i}>{part}</span>)}
    </>
  );
}

function Email({ mock, labels }: { mock: Extract<Mock, { kind: "email" }>; labels: MockUiBlock["labels"] }) {
  const [v, setV] = useState(0);
  const e = mock.variants[v];
  return (
    <div>
      {mock.variants.length > 1 && (
        <div role="group" aria-label={labels.variants} className="flex flex-wrap gap-2 border-b border-line bg-paper px-4 py-3">
          {mock.variants.map((x, i) => (
            <button key={x.name} type="button" aria-pressed={v === i} onClick={() => setV(i)}
              className={`focus-ring min-h-[36px] rounded-md border px-3 text-[13.5px] font-medium transition-[background-color,border-color,color] duration-150 ${v === i ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink/40"}`}>{x.name}</button>
          ))}
        </div>
      )}
      <dl className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-1.5 border-b border-line px-4 py-3 text-[14px] sm:px-5">
        <dt className="text-slate">{labels.from}</dt><dd className="min-w-0 truncate text-ink">{e.from}</dd>
        <dt className="text-slate">{labels.to}</dt><dd className="min-w-0 truncate text-ink">{e.to}</dd>
        <dt className="text-slate">{labels.subject}</dt><dd className="min-w-0 font-semibold text-ink">{e.subject}</dd>
      </dl>
      <div className="min-h-[220px] space-y-3 px-4 py-4 text-[15px] leading-[1.6] text-ink sm:px-5" aria-live="polite">
        {e.body.map((p, i) => <p key={i} className="text-pretty">{p}</p>)}
        {e.button && <span className="inline-flex h-10 items-center rounded-md bg-cobalt px-4 font-display text-[14px] font-bold text-white">{e.button}</span>}
        {e.signature && <p className="whitespace-pre-line text-slate">{e.signature}</p>}
      </div>
    </div>
  );
}

function Form({ mock, labels }: { mock: Extract<Mock, { kind: "form" }>; labels: MockUiBlock["labels"] }) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="font-display text-[17px] font-bold text-ink">{mock.title}</p>
      {mock.intro && <p className="mt-1 text-[14px] leading-[1.5] text-slate">{mock.intro}</p>}
      <ul className="mt-4 space-y-3">
        {mock.fields.map((f) => (
          <li key={f.label} className="min-w-0">
            <p className="text-[13px] font-medium text-slate">{f.label}</p>
            <div className={`mt-1 flex min-h-[40px] items-center justify-between gap-3 rounded-md border px-3 py-2 text-[14.5px] ${f.state === "done" ? "border-line-2 bg-white text-ink" : "border-dashed border-line-2 bg-paper text-slate"}`}>
              <span className="min-w-0 truncate">{f.value || " "}</span>
              {f.state === "done"
                ? <span className="inline-flex shrink-0 items-center gap-1 rounded bg-ok-soft px-1.5 py-0.5 font-mono text-[11px] text-ok-ink"><Check className="h-3 w-3" />{labels.received}</span>
                : <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-ink"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-warn" />{labels.missing}</span>}
            </div>
          </li>
        ))}
      </ul>
      {mock.status && <p className="mt-4 border-t border-line pt-3 text-[13.5px] leading-[1.5] text-slate">{mock.status}</p>}
    </div>
  );
}

function Doc({ mock }: { mock: Extract<Mock, { kind: "document" }> }) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <p className="font-display text-[19px] font-bold leading-[1.25] tracking-[-0.01em] text-ink"><Merge line={mock.title} /></p>
      {mock.meta.length > 0 && <p className="mt-1.5 flex flex-wrap gap-x-3 font-mono text-[12px] text-slate">{mock.meta.map((m) => <span key={m}><Merge line={m} /></span>)}</p>}
      <div className="mt-4 space-y-4">
        {mock.sections.map((s) => (
          <section key={s.heading} className="border-t border-line pt-3">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-slate">{s.heading}</p>
            <ul className="mt-2 space-y-1.5 text-[14.5px] leading-[1.6] text-ink">
              {s.lines.map((l, i) => <li key={i} className="text-pretty"><Merge line={l} /></li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function MockUi({ content: c }: { content: MockUiBlock }) {
  const m = c.mock;
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-line-2 bg-white shadow-[0_1px_2px_rgba(11,27,51,.05),0_12px_32px_-16px_rgba(11,27,51,.18)]">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-2.5">
          <p className="min-w-0 truncate font-mono text-[12px] text-slate">{c.window}</p>
          <span className="shrink-0 rounded border border-line-2 px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-slate">{c.labels.example}</span>
        </div>
        {m.kind === "email" ? <Email mock={m} labels={c.labels} /> : m.kind === "form" ? <Form mock={m} labels={c.labels} /> : <Doc mock={m} />}
      </div>
      {c.caption && <figcaption className="mt-3 text-[14px] leading-[1.5] text-slate">{c.caption}</figcaption>}
    </figure>
  );
}
