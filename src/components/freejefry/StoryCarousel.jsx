import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function StoryCarousel({ label, images = [] }) {
  const slides = images.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + slides) % slides);
  };

  if (!slides) {
    return <ImagePlaceholder label={label} ratio="4/3" className="w-full" />;
  }

  const showControls = slides > 1;

  return (
    <div className="group relative">
      <div className="absolute -inset-px bg-gradient-to-br from-amber/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-ink-900">
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
            <Image
              src={images[index]}
              alt={`${label} ${index + 1}`}
              className="h-full w-full object-contain"
              fittingType="fit"
            />
          </motion.div>
        </AnimatePresence>

        {showControls && (
          <div className="absolute left-4 top-4 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <span key={i} className={cn("h-2 w-2 rounded-full transition-colors", i === index ? "bg-amber" : "bg-white/25")} />
            ))}
          </div>
        )}
      </div>

      {showControls && (
        <>
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
        </>
      )}
    </div>
  );
}
