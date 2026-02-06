import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "../providers/providers";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "长理星球APP下载",
};

import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-[#F5F5F7] dark:bg-[#000000] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans antialiased transition-colors duration-500">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow flex flex-col relative z-0">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
