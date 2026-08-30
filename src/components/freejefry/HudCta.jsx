import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Heart } from "lucide-react";
import { useT } from "@/lib/useT";

// Sticky HUD call-to-action fixed at bottom corners of the Free Jefry page.
export default function HudCta() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
        >
          <div className="mx-auto flex max-w-7xl items-end justify-between px-5 pb-5 lg:px-8">
            <div className="pointer-events-auto hidden font-mono text-[10px] uppercase tracking-[0.3em] text-amber/70 sm:block">
              ◆ FREE JEFRY · HUD
            </div>
            <div className="pointer-events-auto flex w-full gap-3 sm:w-auto">
              <a
                href="#demo"
                className="group flex flex-1 items-center justify-center gap-2 border border-amber bg-amber px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_30px_-4px_rgba(248,183,29,0.8)] sm:flex-none"
              >
                <Download size={15} />
                <span className="hidden sm:inline">{t.freejefry.downloadDemo}</span>
                <span className="sm:hidden">DEMO</span>
              </a>
              <a
                href="#crowdfunding"
                className="group flex flex-1 items-center justify-center gap-2 border border-magma bg-magma/10 px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-magma transition-all hover:bg-magma hover:text-ink-900 sm:flex-none"
              >
                <Heart size={15} />
                <span className="hidden sm:inline">{t.freejefry.backCrowdfunding}</span>
                <span className="sm:hidden">BACK</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}