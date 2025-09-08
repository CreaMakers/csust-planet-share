import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "长理星球APP下载",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
