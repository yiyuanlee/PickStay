import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nProvider } from "@/components/I18nProvider";
import { getAppUrl } from "@/lib/env";
import { getMessages } from "@/i18n/messages";
import { getLocale } from "@/i18n/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const appUrl = getAppUrl();

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getMessages(locale).meta;

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: meta.title,
      template: `%s · PickStay`,
    },
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: appUrl,
      siteName: "PickStay",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} className={inter.variable}>
      <body className="min-h-screen antialiased">
        <I18nProvider locale={locale}>{children}</I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
