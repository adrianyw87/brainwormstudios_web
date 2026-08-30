import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Heart, ArrowDown } from "lucide-react";
import { useT } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import StoryBlock from "@/components/freejefry/StoryBlock";
import MechanicsTrack from "@/components/freejefry/MechanicsTrack";
import RewardsGrid from "@/components/freejefry/RewardsGrid";
import HudCta from "@/components/freejefry/HudCta";
import { Image } from "@/components/ui/image";

// Replace with the real trailer ID when available.
const YOUTUBE_ID = "dQw4w9WgXcQ";
const CASTLE_BG = "/images/castle.png";
const BRICK_BG = "/images/brick.png";

export default function FreeJefry() {
  const { t } = useT();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 160]);
  const bgScale = useTransform(scrollY, [0, 800], [1.05, 1.2]);

  return (
    <div className="relative isolate">
      {/* faint medieval brick wall texture */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.07] bg-cover bg-center" style={{ backgroundImage: `url(${BRICK_BG})` }} />
        <div className="absolute inset-0 bg-ink-900/50" />
      </div>
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
          <Image src={CASTLE_BG} alt="" className="h-full w-full object-cover opacity-30" fittingType="fill" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/70 to-ink-900" />
        </motion.div>
        <div className="absolute inset-0 grid-lines opacity-20" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 font-display text-[clamp(3.5rem,14vw,11rem)] font-bold uppercase leading-[0.85] tracking-tighter text-white text-glow"
          >
            FREE <span className="text-amber">JEFRY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/60"
          >
            {t.freejefry.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12"
          >
            <ImagePlaceholder label={t.freejefry.coverLabel} ratio="16/9" className="mx-auto max-w-3xl" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="mt-10 flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            <ArrowDown size={16} className="text-amber" />
            {t.freejefry.hudHint}
          </motion.div>
        </div>
      </section>

      {/* ===== YOUTUBE VIDEO ===== */}
      <section className="relative border-t border-white/10 bg-ink-800/30">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:py-20">
          <div className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-amber/70">▶ {t.freejefry.videoLabel}</div>
          <div className="relative aspect-video overflow-hidden border border-white/15 bg-black shadow-[0_0_60px_-12px_rgba(248,183,29,0.4)]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
              title="Free Jefry trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ===== STORY BLOCKS ===== */}
      <StoryBlock
        index={1}
        kicker={t.freejefry.introTitle}
        title={t.freejefry.introTitle}
        paragraphs={t.freejefry.intro}
        accent="text-white"
        imageLabel={t.freejefry.galleryLabel}
      />
      <StoryBlock
        index={2}
        reverse
        kicker={t.freejefry.gameTitle}
        title={t.freejefry.gameTitle}
        paragraphs={t.freejefry.game}
        accent="text-amber"
        imageLabel={t.freejefry.galleryLabel}
      />
      <StoryBlock
        index={3}
        kicker={t.freejefry.creatorsTitle}
        title={t.freejefry.creatorsTitle}
        paragraphs={t.freejefry.creators}
        accent="text-neural"
        imageLabel={t.freejefry.galleryLabel}
      />
      <StoryBlock
        index={4}
        reverse
        kicker={t.freejefry.whyTitle}
        title={t.freejefry.whyTitle}
        paragraphs={t.freejefry.why}
        accent="text-magma"
        imageLabel={t.freejefry.galleryLabel}
      />

      {/* ===== MECHANICS (horizontal scroll) ===== */}
      <MechanicsTrack />

      <StoryBlock index={5} kicker={t.freejefry.jefryTitle} title={t.freejefry.jefryTitle} paragraphs={t.freejefry.jefry} accent="text-slime" imageLabel={t.freejefry.galleryLabel} />
      <StoryBlock index={6} reverse kicker={t.freejefry.castleTitle} title={t.freejefry.castleTitle} paragraphs={t.freejefry.castle} accent="text-amber" imageLabel={t.freejefry.galleryLabel} />
      <StoryBlock index={7} kicker={t.freejefry.yobtarTitle} title={t.freejefry.yobtarTitle} paragraphs={t.freejefry.yobtar} accent="text-magma" imageLabel={t.freejefry.galleryLabel} />
      <StoryBlock index={8} reverse kicker={t.freejefry.enemiesTitle} title={t.freejefry.enemiesTitle} paragraphs={t.freejefry.enemies} accent="text-magma" imageLabel={t.freejefry.galleryLabel} />
      <StoryBlock index={9} kicker={t.freejefry.friendsTitle} title={t.freejefry.friendsTitle} paragraphs={t.freejefry.friends} accent="text-neural" imageLabel={t.freejefry.galleryLabel} />

      {/* ===== CONTRIBUTE ===== */}
      <section id="crowdfunding" className="relative overflow-hidden border-t border-white/10 bg-ink-800/40">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber to-transparent" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center lg:py-32">
          <Reveal>
            <Kicker className="justify-center">{t.freejefry.contributeTitle}</Kicker>
            <div className="mt-8 space-y-4">
              {t.freejefry.contribute.map((p, i) => (
                <p key={i} className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">{p}</p>
              ))}
            </div>
            <div id="demo" className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#demo"
                className="group flex items-center gap-2 border border-amber bg-amber px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_40px_-6px_rgba(248,183,29,0.8)]"
              >
                <Download size={16} />
                {t.freejefry.downloadDemo}
              </a>
              <a
                href="#crowdfunding"
                className="group flex items-center gap-2 border border-magma bg-magma/10 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-magma transition-all hover:bg-magma hover:text-ink-900"
              >
                <Heart size={16} />
                {t.freejefry.backCrowdfunding}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== REWARDS ===== */}
      <RewardsGrid />

      <HudCta />
    </div>
  );
}