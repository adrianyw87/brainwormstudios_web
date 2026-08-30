import React from "react";
import { useLang } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }) {
  const { lang, toggle, switching } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden border border-white/15 bg-ink-800/60 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 transition-colors hover:border-amber/60 hover:text-amber",
        className
      )}
    >
      <span className={cn("transition-all duration-300", switching ? "blur-sm opacity-30" : "opacity-100", lang === "es" ? "text-amber" : "text-white/40")}>
        ES
      </span>
      <span className="text-white/20">/</span>
      <span className={cn("transition-all duration-300", switching ? "blur-sm opacity-30" : "opacity-100", lang === "en" ? "text-amber" : "text-white/40")}>
        EN
      </span>
    </button>
  );
}