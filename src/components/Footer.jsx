import React from "react";
import { Link } from "react-router-dom";
import { useT } from "@/lib/useT";

const socials = [
  { label: "Instagram", to: "#" },
  { label: "YouTube", to: "#" },
];

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute -top-px left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 font-display text-lg font-bold text-amber">B</span>
              <span className="font-display text-base font-bold uppercase tracking-[0.2em] text-white">
                Brain<span className="text-amber">Worm</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">{t.footer.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.to}
                  className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-all hover:border-amber/50 hover:text-amber"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {t.footer.sections.map((sec) => (
            <div key={sec.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber/80">{sec.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {sec.links.map((l) => (
                  <li key={l}>
                    <Link to="/contacto" className="text-sm text-white/55 transition-colors hover:text-white">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">© {new Date().getFullYear()} {t.footer.rights}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}