export const LOCALES = ["nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nl";
export const isLocale = (x: string): x is Locale => (LOCALES as readonly string[]).includes(x);
