import React from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/useT";
import { Kicker } from "@/components/Reveal";

export default function RewardsGrid() {
  const { t } = useT();
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <Kicker>{t.freejefry.rewardsTitle}</Kicker>
      <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {t.freejefry.rewards.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative bg-ink-900 p-7 transition-colors hover:bg-ink-800"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-4xl font-bold text-amber">{r.price}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">TIER {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-tight text-amber">{r.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{r.desc}</p>
            <span className="mt-5 block h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}