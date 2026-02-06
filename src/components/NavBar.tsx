"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export function NavBar() {
  return (
    <nav className="absolute top-0 w-full flex justify-between items-center p-6 z-50">
      <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
        长理星球
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/install" className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ED] text-white text-sm px-4 py-2 rounded-full font-medium transition-all">
          安装 <FaChevronRight className="text-xs" />
        </Link>
      </div>
    </nav>
  );
}
