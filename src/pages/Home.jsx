import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useT, colorMap } from "@/lib/useT";
import Reveal, { Stagger, StaggerItem, Kicker } from "@/components/Reveal";
import { Image } from "@/components/ui/image";

const HERO_IMG = "/images/hero.png";

export default function Home() {
  const { t } = useT();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const titleY = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={HERO_IMG} alt="" className="h-full w-full object-cover" fittingType="fill" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/60 to-ink-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-transparent to-ink-900/40" />
        </motion.div>
        <div className="absolute inset-0 grid-lines opacity-20" />

        <motion.div style={{ opacity: heroOpacity, y: titleY }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Kicker>{t.home.tag}</Kicker>
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-[0.85] tracking-tighter">
            {["title1", "title2", "title3"].map((k, i) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, y: 40, skewY: 6 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                <span className="text-amber">{t.home[k]}</span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {t.home.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/free-jefry"
              className="group relative overflow-hidden border border-amber bg-amber px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_40px_-6px_rgba(248,183,29,0.8)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.home.ctaPrimary} <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
            <Link
              to="/desarrollos"
              className="group border border-white/20 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white/5"
            >
              {t.home.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          ▼ scroll
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-white/10 bg-ink-800/40">
        <Stagger className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-5 lg:grid-cols-4 lg:px-8">
          {t.home.stats.map((s, i) => (
            <StaggerItem key={i} className="px-4 py-8 text-center lg:py-10">
              <div className="font-display text-4xl font-bold text-amber lg:text-5xl">{s.value}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ===== FEATURED: FREE JEFRY ===== */}
      <section className="relative overflow-hidden border-y border-white/10 bg-ink-800/30">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-magma/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-magma">{t.home.featuredTag}</div>
            <h2 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tighter text-amber lg:text-8xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">{t.home.featuredDesc}</p>
            <Link
              to="/free-jefry"
              className="group mt-8 inline-flex items-center gap-2 border border-amber px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber transition-all hover:bg-amber hover:text-ink-900"
            >
              {t.home.featuredCta}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/free-jefry" className="group relative block overflow-hidden border border-white/10">
              <Image
                src="/images/castle.png"
                alt="Free Jefry castle"
                className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                fittingType="fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-amber">Adventure · Mystery</div>
                  <div className="font-display text-2xl font-bold uppercase text-amber">Free Jefry</div>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber bg-amber/10 text-amber transition-all group-hover:bg-amber group-hover:text-ink-900">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>{t.home.servicesTitle}</Kicker>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-amber lg:text-6xl">{t.home.servicesSubtitle}</h2>
          </div>
          <Link to="/desarrollos" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber">
            {t.home.servicesCta}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.list.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={`/desarrollos/${s.slug}`}
                  className="group relative flex h-full flex-col bg-ink-900 p-7 transition-colors hover:bg-ink-800"
                >
                  <span className={`h-1 w-8 ${c.bg} transition-all duration-500 group-hover:w-full`} />
                  <span className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-tight text-amber">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/45">{s.short}</p>
                  <span className={`mt-6 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${c.text}`}>
                    {t.common.knowMore} →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/10 blur-[140px]" />
        <Reveal className="relative mx-auto max-w-4xl px-5 py-28 text-center lg:py-36">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-amber lg:text-7xl">{t.home.contactTitle}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">{t.home.contactDesc}</p>
          <Link
            to="/contacto"
            className="group mt-10 inline-flex items-center gap-2 border border-amber bg-amber px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_40px_-6px_rgba(248,183,29,0.8)]"
          >
            {t.home.contactCta}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}