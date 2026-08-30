import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT, colorMap } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";

export default function Services() {
  const { t } = useT();
  return (
    <div className="relative min-h-screen pt-28">
      <div className="absolute inset-0 grid-lines opacity-10" />
      {/* header */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Reveal>
          <Kicker>{t.services.title}</Kicker>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-amber lg:text-8xl">
            {t.services.subtitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{t.services.intro}</p>
        </Reveal>
      </section>

      {/* grid */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.list.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.07}>
                <Link
                  to={`/desarrollos/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden bg-ink-900 p-8 transition-colors hover:bg-ink-800"
                >
                  {/* scanline hover */}
                  <span className={`pointer-events-none absolute inset-x-0 top-0 h-px ${c.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} style={{ animation: "scan-down 2.5s linear infinite" }} />
                  <span className={`h-1 w-10 ${c.bg} transition-all duration-500 group-hover:w-full`} />
                  <div className="mt-8 flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <ArrowUpRight size={18} className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-amber">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{s.short}</p>
                  <span className={`mt-6 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${c.text}`}>
                    {t.common.knowMore} →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}