import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "长理星球App",
};

export const dynamic = "force-dynamic";

import Image from "next/image";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Home() {
  return (
    // Height is handled by layout
    <div className="flex flex-col flex-grow items-center justify-center text-center px-4 relative">
      {/* Main Content */}
      <div className="mb-8 transition-all duration-1000 ease-out transform opacity-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards" style={{ animationDelay: "0ms", opacity: 1 }}>
        <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto drop-shadow-2xl">
          <Image src="/logo_transparent.png" alt="CSUST Planet Share" fill className="object-contain" priority />
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1D1D1F] to-[#434344] dark:from-[#F5F5F7] dark:to-[#A1A1A6] transition-all duration-1000 ease-out transform opacity-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards" style={{ animationDelay: "300ms", opacity: 1 }}>
        长理星球
      </h1>

      <p className="text-xl md:text-2xl text-[#86868B] max-w-lg mx-auto mb-10 font-medium leading-relaxed transition-all duration-1000 ease-out transform opacity-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards" style={{ animationDelay: "500ms", opacity: 1 }}>
        你的校园生活，从未如此简单。
      </p>

      <div className="transition-all duration-1000 ease-out transform opacity-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards" style={{ animationDelay: "700ms", opacity: 1 }}>
        <Link href="/install" className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ED] text-white text-lg md:text-xl px-8 py-3 rounded-full font-medium transition-all">
          立即安装 <FaChevronRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
