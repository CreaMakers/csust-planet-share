import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../providers/providers";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "长理星球APP下载",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
