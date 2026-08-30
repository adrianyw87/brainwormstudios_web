import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useT, colorMap } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useT();
  const navigate = useNavigate();
  const detail = t.services.details[slug];
  const meta = t.services.list.find((s) => s.slug === slug);

  if (!detail || !meta) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-white/50">404 · Service not found</p>
        <Link to="/desarrollos" className="border border-amber px-6 py-3 font-mono text-xs uppercase tracking-widest text-amber">
          {t.common.backToServices}
        </Link>
      </div>
    );
  }

  const c = colorMap[meta.color];
  const currentIndex = t.services.list.findIndex((s) => s.slug === slug);
  const next = t.services.list[(currentIndex + 1) % t.services.list.length];

  return (
    <div className="relative min-h-screen pt-28">
      <div className="absolute inset-0 grid-lines opacity-10" />
      <div className={`absolute -top-20 right-0 h-[400px] w-[400px] rounded-full ${c.bg} opacity-[0.06] blur-[140px]`} />

      <article className="relative mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <Reveal>
          <Link to="/desarrollos" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-amber">
            <ArrowLeft size={14} />
            {t.common.backToServices}
          </Link>
          <div className="mt-8">
            <Kicker>{detail.kicker}</Kicker>
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tighter text-amber lg:text-7xl">{detail.title}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/70">{detail.lead}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ImagePlaceholder label={t.freejefry.galleryLabel} ratio="21/9" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div className="space-y-5">
              {detail.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="text-lg leading-relaxed text-white/65"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="border border-white/10 bg-ink-800/40 p-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber">Incluye</h3>
              <ul className="mt-5 space-y-3">
                {detail.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <Check size={16} className={`mt-0.5 shrink-0 ${c.text}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-12 text-center">
          <p className="font-display text-2xl font-bold uppercase tracking-tight text-amber lg:text-3xl">{t.home.contactTitle}</p>
          <Link
            to="/contacto"
            className="group inline-flex items-center gap-2 border border-amber bg-amber px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_40px_-6px_rgba(248,183,29,0.8)]"
          >
            {t.home.contactCta} →
          </Link>
        </Reveal>

        {/* next service */}
        <Reveal className="mt-16">
          <button
            onClick={() => navigate(`/desarrollos/${next.slug}`)}
            className="group flex w-full items-center justify-between border border-white/10 bg-ink-800/40 p-6 text-left transition-colors hover:bg-ink-800"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Siguiente servicio</div>
              <div className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-amber">{next.title}</div>
            </div>
            <ArrowRight size={20} className="text-amber transition-transform group-hover:translate-x-2" />
          </button>
        </Reveal>
      </article>
    </div>
  );
}