import { NextResponse } from "next/server";

type Body = {
  name?: string; firm?: string; email?: string; phone?: string; services?: string[];
  feelings?: Record<string, string | null>; message?: string; locale?: string; company_website?: string;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

export async function POST(req: Request) {
  let b: Body;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  // honeypot: bots fill hidden fields
  if (b.company_website) return NextResponse.json({ ok: true });
  const name = (b.name ?? "").trim(), email = (b.email ?? "").trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !b.services?.length) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const lines = [
    `Name: ${name}`, `Firm: ${b.firm ?? "-"}`, `Email: ${email}`, `Phone: ${b.phone || "-"}`,
    `Interested in: ${b.services.join(", ")}`, "",
    "How they feel today:",
    ...Object.entries(b.feelings ?? {}).map(([k, v]) => `  ${k}: ${v ?? "not answered"}`), "",
    "Message:", b.message?.trim() || "-", "", `Site language: ${b.locale ?? "-"}`,
  ];
  const text = lines.join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "nick@assembly-engine.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Assembly Engine website <website@assembly-engine.com>";
  if (!key) {
    // Not connected yet: log so nothing is lost. In production, report failure so the form
    // shows the direct email address instead of promising a reply that no one will see.
    console.log("[contact] RESEND_API_KEY not set. Submission:\n" + text);
    if (process.env.NODE_ENV === "production") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    return NextResponse.json({ ok: true, dev: true });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `New audit request: ${name}${b.firm ? ` (${b.firm})` : ""}`, text, html: `<pre style="font:14px/1.5 ui-monospace,monospace">${esc(text)}</pre>` }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
