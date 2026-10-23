// How the service works, shown as its signature component (ink chapter). The heading and three short points
// say it; the component lets the visitor do it. Content: ServiceSignatureBlock (ACF layout `service_signature`).
import type { ServiceSignatureBlock } from "./schema";
import { H2, Heading } from "../ui";
import Signature from "./Signature";

export default function ServiceSignature({ content: c }: { content: ServiceSignatureBlock }) {
  return (
    <section id={c.anchor} aria-labelledby={`${c.anchor}-h`} className="scroll-mt-20 bg-ink text-white">
      <div className="frame frame-dark py-20 sm:py-28 lg:py-32">
        <Heading id={`${c.anchor}-h`} parts={c.heading_parts} accentClass="text-white/60" stacked className={`${H2} max-w-[820px]`} />
        <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-5 md:grid-cols-3">
          {c.points.map((p, i) => (
            <li key={p.title} data-reveal="" className="grid grid-cols-[28px_minmax(0,1fr)] border-t border-white/15 pt-4">
              <span aria-hidden className="font-mono text-[13px] tabular-nums text-peri">{i + 1}</span>
              <p className="text-pretty text-[15.5px] leading-[1.5] text-white/80"><span className="font-semibold text-white">{p.title}</span> {p.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 lg:mt-20">
          <Signature data={c.component} />
        </div>
      </div>
    </section>
  );
}
