import React from "react";
import { motion } from "framer-motion";
import { Zap, Shirt, Package, Cookie, Users, Plus } from "lucide-react";
import { useT } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";

const icons = [Zap, Shirt, Package, Cookie, Users];

export default function MechanicsTrack() {
  const { t } = useT();
  return (
    <section className="relative border-t border-white/10 bg-ink-800/30">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <Kicker>{t.freejefry.mechanicsTitle}</Kicker>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 lg:text-lg">{t.freejefry.mechanicsIntro}</p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {t.freejefry.mechanics.map((m, i) => {
            const Icon = icons[i] || Zap;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative flex flex-col bg-ink-900 p-7 transition-colors hover:bg-ink-800"
              >
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-amber transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{t.freejefry.mechanicTag} · {String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-10 w-10 items-center justify-center border border-amber/30 bg-amber/5 text-amber transition-all group-hover:bg-amber group-hover:text-ink-900">
                    <Icon size={20} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight text-white lg:text-2xl">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{m.desc}</p>
                <div className="mt-6 h-px w-full bg-white/5" />
              </motion.div>
            );
          })}
          {/* more to discover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="group relative flex flex-col items-center justify-center bg-ink-900 p-7 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center border border-dashed border-amber/40 text-amber">
              <Plus size={24} />
            </span>
            <p className="mt-5 font-display text-lg font-bold uppercase tracking-tight text-amber">{t.freejefry.moreToDiscover}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}