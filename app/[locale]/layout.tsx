import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { I18nProvider } from "@/components/I18nProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import MotionRoot from "@/components/MotionRoot";
import CookieConsent from "@/components/CookieConsent";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-plex-mono" });

export const viewport = { themeColor: "#0B1B33" };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL("https://www.assembly-engine.com"),
    title: { default: t.meta.title, template: "%s · Assembly Engine" },
    description: t.meta.description,
    alternates: { languages: { nl: "/nl", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Entrance styles only hide content when scripts run (see lib/motion). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <RevealObserver />
        <I18nProvider locale={locale}>
          <MotionRoot>
            <SmoothScroll />
            <Header />
            <main id="top">{children}</main>
            <Footer />
          </MotionRoot>
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  );
}
