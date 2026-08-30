import React from "react";
import { motion } from "framer-motion";
import { Zap, Shirt, Package, Cookie, Users } from "lucide-react";
import { useT } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import { MECHANICS_IMAGES } from "@/components/freejefry/gallery";

const icons = [Zap, Shirt, Package, Cookie, Users];

function MechanicCard({ mechanic, image, index, mechanicTag, delay = 0 }) {
  const Icon = icons[index] || Zap;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="group flex h-full flex-col overflow-hidden border border-white/10 bg-ink-900 transition-colors hover:border-amber/30 hover:bg-ink-800"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-ink-950">
        <Image
          src={image}
          alt={mechanic.title}
          className="h-full w-full object-contain p-2"
          fittingType="fit"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            {mechanicTag} · {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-amber/30 bg-amber/5 text-amber transition-all group-hover:bg-amber group-hover:text-ink-900">
            <Icon size={20} />
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-amber lg:text-2xl">{mechanic.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{mechanic.desc}</p>
      </div>
    </motion.article>
  );
}

export default function MechanicsTrack() {
  const { t } = useT();
  const mechanics = t.freejefry.mechanics;
  const topRow = mechanics.slice(0, 3);
  const bottomRow = mechanics.slice(3);

  return (
    <section className="relative border-t border-white/10 bg-ink-800/30">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <Kicker>{t.freejefry.mechanicsTitle}</Kicker>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 lg:text-lg">{t.freejefry.mechanicsIntro}</p>
        </Reveal>

        <div className="mt-12 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topRow.map((m, i) => (
              <MechanicCard
                key={m.title}
                mechanic={m}
                image={MECHANICS_IMAGES[i]}
                index={i}
                mechanicTag={t.freejefry.mechanicTag}
                delay={i * 0.08}
              />
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc((100%-3rem)/3*2+1.5rem)] lg:grid-cols-2">
            {bottomRow.map((m, i) => (
              <MechanicCard
                key={m.title}
                mechanic={m}
                image={MECHANICS_IMAGES[i + 3]}
                index={i + 3}
                mechanicTag={t.freejefry.mechanicTag}
                delay={(i + 3) * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
