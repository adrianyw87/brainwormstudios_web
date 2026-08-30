import React from "react";
import { cn } from "@/lib/utils";

// Placeholder box for images the user will swap in later. Shows a label + animated scanline.
export default function ImagePlaceholder({ label, className, ratio = "16/9", icon }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 scanlines",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 grid-lines opacity-40" />
      {/* moving scanline */}
      <div className="absolute left-0 right-0 h-px bg-amber/40" style={{ animation: "scan-down 4s linear infinite" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 text-amber">
          {icon || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          )}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{label}</span>
      </div>
      <div className="absolute bottom-2 right-3 font-mono text-[9px] tracking-widest text-amber/30">BW · PLACEHOLDER</div>
    </div>
  );
}