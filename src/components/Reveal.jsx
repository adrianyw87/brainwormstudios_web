import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Scroll-triggered reveal wrapper.
export default function Reveal({ children, className, delay = 0, y = 28, once = true, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

// Staggered container + item helpers
export function Stagger({ children, className, stagger = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Big section kicker label
export function Kicker({ children, className }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-amber" />
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">{children}</span>
    </div>
  );
}