import React from "react";
import { motion } from "framer-motion";
import Reveal, { Kicker } from "@/components/Reveal";
import StoryCarousel from "@/components/freejefry/StoryCarousel";
import { cn } from "@/lib/utils";

// A narrative block: kicker + title + paragraphs, with an image placeholder slide.
// `reverse` flips the layout; `accent` sets the accent color class.
export default function StoryBlock({ kicker, title, paragraphs, accent = "text-amber", reverse = false, imageLabel, index = 0 }) {
  return (
    <div className="relative border-t border-white/10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <Reveal className={cn("order-2", !reverse && "lg:order-1")}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/25">{String(index).padStart(2, "0")}</span>
            <Kicker>{kicker}</Kicker>
          </div>
          <h2 className={cn("mt-6 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight lg:text-5xl", accent)}>{title}</h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-base leading-relaxed text-white/65 lg:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className={cn("order-1", !reverse && "lg:order-2")}>
          <StoryCarousel label={imageLabel} slides={3} />
        </Reveal>
      </div>
    </div>
  );
}