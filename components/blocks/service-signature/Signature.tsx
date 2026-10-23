"use client";
// Loads each signature kind as its own chunk (still server-rendered), so each island ships only
// on its own page and not with every page that uses the shared block registry.
import dynamic from "next/dynamic";
import Deferred from "./Deferred";
import type { ServiceSignatureBlock } from "./schema";

const Reporting = dynamic(() => import("./reporting/Reporting"));
const Operations = dynamic(() => import("./operations/Operations"));
const Brand = dynamic(() => import("./brand/Brand"));
const Acquisition = dynamic(() => import("./acquisition/Acquisition"));
const Invoicing = dynamic(() => import("./invoicing/Invoicing"));

export default function Signature({ data }: { data: ServiceSignatureBlock["component"] }) {
  if (data.kind === "reporting") return <Reporting data={data} />;
  if (data.kind === "operations") return <Operations data={data} />;
  // Brand hydrates near the viewport: its stage is markup-heavy and sits well below the fold (≈ 0.3–0.7 s of
  // blocking time on a throttled phone when hydrated at load).
  if (data.kind === "brand") return <Deferred><Brand data={data} /></Deferred>;
  if (data.kind === "acquisition") return <Acquisition data={data} />;
  if (data.kind === "invoicing") return <Invoicing data={data} />;
  return null;
}
