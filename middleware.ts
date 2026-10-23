import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  const pref = req.cookies.get("locale")?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const locale = pref && (LOCALES as readonly string[]).includes(pref) ? pref : /^en\b/i.test(accept) ? "en" : DEFAULT_LOCALE;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip Next internals, API routes and any file with an extension (images, video, embeds)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
