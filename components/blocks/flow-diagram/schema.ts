import { z } from "zod";

/** A workflow as nodes joined by connectors. Generic tool names only, never vendor logos or screens. */
export const flowDiagramSchema = z.object({
  acf_fc_layout: z.literal("flow_diagram"),
  title: z.string().nullable(),
  nodes: z.array(z.object({ label: z.string().min(1), detail: z.string().nullable(), human: z.boolean() })).min(2).max(6),
  caption: z.string().nullable(),
  labels: z.object({ replay: z.string(), human: z.string(), steps: z.string(), example: z.string() }),
});
export type FlowDiagramBlock = z.infer<typeof flowDiagramSchema>;
