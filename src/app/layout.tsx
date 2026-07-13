import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PickStay — 个性化旅行住宿街区推荐",
  description:
    "通过 7 维偏好权重实时推荐最适合的城市宿区，支持地图 API 动态增强与多街区对比。",
  openGraph: {
    title: "PickStay — 个性化旅行住宿街区推荐",
    description: "8 城 57 街区 · 7 维偏好引擎 · 地图 API 实时增强",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
