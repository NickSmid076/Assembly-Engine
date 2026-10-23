"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Dict } from "@/lib/i18n";
import { en } from "@/lib/i18n/en";
import { nl } from "@/lib/i18n/nl";
import type { Locale } from "@/lib/i18n/config";

const Ctx = createContext<{ locale: Locale; t: Dict }>({ locale: "nl", t: nl });

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <Ctx.Provider value={{ locale, t: locale === "en" ? en : nl }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
/** Prefix an internal path with the current locale: lh("/about") → "/nl/about". Hash-only links stay as they are. */
export function useHref() {
  const { locale } = useI18n();
  return (p: string) => (p.startsWith("#") ? p : `/${locale}${p === "/" ? "" : p}`);
}
