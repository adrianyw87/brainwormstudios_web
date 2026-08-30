import React from "react";
import { cn } from "@/lib/utils";

// Glitchy animated heading. Uses layered pseudo copies via spans.
export default function GlitchText({ children, className, as: Tag = "span", glitch = false }) {
  return (
    <Tag className={cn("relative inline-block", className)} data-glitch={glitch ? "on" : "off"}>
      {glitch && (
        <>
          <span aria-hidden className="absolute inset-0 text-magma/70 mix-blend-screen" style={{ clipPath: "inset(0 0 55% 0)", transform: "translate(-2px,0)" }}>
            {children}
          </span>
          <span aria-hidden className="absolute inset-0 text-neural/70 mix-blend-screen" style={{ clipPath: "inset(55% 0 0 0)", transform: "translate(2px,0)" }}>
            {children}
          </span>
        </>
      )}
      <span className="relative">{children}</span>
    </Tag>
  );
}