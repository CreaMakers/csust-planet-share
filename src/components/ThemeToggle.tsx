"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border border-white/50 dark:border-slate-700 transition-all hover:scale-110 active:scale-95 text-slate-700 dark:text-yellow-400"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <FaFaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}

function FaFaSun({ className }: { className?: string }) {
  return <FaSun className={className} />;
}
