"use client";
// The five moments, loaded on demand by Stage (a separate chunk, never in the page's initial JS).
import Acquisition from "./Acquisition";
import Brand from "./Brand";
import Invoicing from "./Invoicing";
import Operations from "./Operations";
import Reporting from "./Reporting";
import type { Moment } from "./schema";

export default function Artefacts({ m }: { m: Moment }) {
  switch (m.kind) {
    case "home_brand": return <Brand d={m} />;
    case "home_acquisition": return <Acquisition d={m} />;
    case "home_operations": return <Operations d={m} />;
    case "home_invoicing": return <Invoicing d={m} />;
    case "home_reporting": return <Reporting d={m} />;
  }
}
