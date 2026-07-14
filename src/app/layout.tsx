import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getAppUrl } from "@/lib/env";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const appUrl = getAppUrl();
const title = "PickStay — 个性化旅行住宿街区推荐";
const description =
  "通过 7 维偏好权重实时推荐最适合的城市宿区，支持七边形得分可视化、地图 API 动态增强与多街区对比。";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: title,
    template: "%s · PickStay",
  },
  description,
  keywords: [
    "旅行住宿",
    "街区推荐",
    "Next.js",
    "Supabase",
    "旅行规划",
    "PickStay",
  ],
  authors: [{ name: "PickStay" }],
  openGraph: {
    title,
    description: "8 城 57 街区 · 7 维偏好引擎 · 七边形得分可视化",
    type: "website",
    url: appUrl,
    siteName: "PickStay",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "8 城 57 街区 · 7 维偏好引擎 · 七边形得分可视化",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
