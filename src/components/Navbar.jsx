import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/useT";
import LanguageToggle from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { label: t.nav.studio, to: "/" },
    { label: t.nav.freejefry, to: "/free-jefry" },
    { label: t.nav.developments, to: "/desarrollos" },
    { label: t.nav.contact, to: "/contacto" },
  ];

  const isActive = (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="group flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-amber/20 blur-md transition-all group-hover:bg-amber/40" />
              <span className="relative font-display text-lg font-bold text-amber">B</span>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-magma animate-flicker" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              Brain<span className="text-amber">Worm</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                  isActive(l.to) ? "text-amber" : "text-white/60 hover:text-white"
                )}
              >
                {l.label}
                {isActive(l.to) && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-px h-px bg-amber" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <button
              onClick={() => navigate("/free-jefry")}
              className="group relative overflow-hidden border border-amber bg-amber px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_24px_-4px_rgba(248,183,29,0.7)]"
            >
              {t.nav.cta}
            </button>
          </div>

          <button onClick={() => setOpen(true)} className="text-white md:hidden" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                Brain<span className="text-amber">Worm</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-5">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={l.to}
                    className={cn(
                      "block border-b border-white/10 py-4 font-display text-3xl font-bold uppercase tracking-tight",
                      isActive(l.to) ? "text-amber" : "text-white"
                    )}
                  >
                    <span className="font-mono text-xs text-white/30">0{i + 1} </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between px-5 py-6">
              <LanguageToggle />
              <Link
                to="/free-jefry"
                className="border border-amber bg-amber px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900"
              >
                {t.nav.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}