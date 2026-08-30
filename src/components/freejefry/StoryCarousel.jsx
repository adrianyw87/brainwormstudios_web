import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

// Replaces the single gallery image next to story text with a swipeable carousel
// of placeholder slides.
export default function StoryCarousel({ label, slides = 3 }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + slides) % slides);
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-px bg-gradient-to-br from-amber/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -50 : 50 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ImagePlaceholder label={`${label} · ${index + 1}/${slides}`} ratio="4/3" className="w-full" />
          </motion.div>
        </AnimatePresence>

        {/* dots */}
        <div className="absolute left-4 top-4 z-10 flex gap-1.5">
          {Array.from({ length: slides }).map((_, i) => (
            <span key={i} className={cn("h-2 w-2 rounded-full transition-colors", i === index ? "bg-amber" : "bg-white/25")} />
          ))}
        </div>
      </div>

      {/* controls */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-ink-900/60 text-white/70 backdrop-blur transition-colors hover:border-amber hover:text-amber"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/15 bg-ink-900/60 text-white/70 backdrop-blur transition-colors hover:border-amber hover:text-amber"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}