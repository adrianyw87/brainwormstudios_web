import { useLang } from "./LanguageContext";
import { translations } from "./translations";

// Returns { t, lang, switching } — t is the current language's full object.
export function useT() {
  const { lang, switching } = useLang();
  return { t: translations[lang], lang, switching };
}

// color name -> tailwind class fragments (kept as literals so purge keeps them)
export const colorMap = {
  amber: {
    text: "text-amber",
    bg: "bg-amber",
    border: "border-amber",
    glow: "shadow-[0_0_30px_-4px_rgba(248,183,29,0.5)]",
    from: "from-amber",
    ring: "group-hover:border-amber",
    dot: "bg-amber",
  },
  neural: {
    text: "text-neural",
    bg: "bg-neural",
    border: "border-neural",
    glow: "shadow-[0_0_30px_-4px_rgba(0,240,255,0.5)]",
    from: "from-neural",
    ring: "group-hover:border-neural",
    dot: "bg-neural",
  },
  magma: {
    text: "text-magma",
    bg: "bg-magma",
    border: "border-magma",
    glow: "shadow-[0_0_30px_-4px_rgba(255,77,0,0.5)]",
    from: "from-magma",
    ring: "group-hover:border-magma",
    dot: "bg-magma",
  },
  slime: {
    text: "text-slime",
    bg: "bg-slime",
    border: "border-slime",
    glow: "shadow-[0_0_30px_-4px_rgba(124,252,0,0.4)]",
    from: "from-slime",
    ring: "group-hover:border-slime",
    dot: "bg-slime",
  },
  gold: {
    text: "text-gold",
    bg: "bg-gold",
    border: "border-gold",
    glow: "shadow-[0_0_30px_-4px_rgba(255,210,63,0.5)]",
    from: "from-gold",
    ring: "group-hover:border-gold",
    dot: "bg-gold",
  },
  butter: {
    text: "text-butter",
    bg: "bg-butter",
    border: "border-butter",
    glow: "shadow-[0_0_30px_-4px_rgba(249,215,126,0.5)]",
    from: "from-butter",
    ring: "group-hover:border-butter",
    dot: "bg-butter",
  },
  honey: {
    text: "text-honey",
    bg: "bg-honey",
    border: "border-honey",
    glow: "shadow-[0_0_30px_-4px_rgba(235,165,24,0.5)]",
    from: "from-honey",
    ring: "group-hover:border-honey",
    dot: "bg-honey",
  },
  mustard: {
    text: "text-mustard",
    bg: "bg-mustard",
    border: "border-mustard",
    glow: "shadow-[0_0_30px_-4px_rgba(201,150,42,0.5)]",
    from: "from-mustard",
    ring: "group-hover:border-mustard",
    dot: "bg-mustard",
  },
  sand: {
    text: "text-sand",
    bg: "bg-sand",
    border: "border-sand",
    glow: "shadow-[0_0_30px_-4px_rgba(217,185,76,0.5)]",
    from: "from-sand",
    ring: "group-hover:border-sand",
    dot: "bg-sand",
  },
  lemon: {
    text: "text-lemon",
    bg: "bg-lemon",
    border: "border-lemon",
    glow: "shadow-[0_0_30px_-4px_rgba(242,210,78,0.5)]",
    from: "from-lemon",
    ring: "group-hover:border-lemon",
    dot: "bg-lemon",
  },
  saffron: {
    text: "text-saffron",
    bg: "bg-saffron",
    border: "border-saffron",
    glow: "shadow-[0_0_30px_-4px_rgba(245,197,24,0.5)]",
    from: "from-saffron",
    ring: "group-hover:border-saffron",
    dot: "bg-saffron",
  },
  brass: {
    text: "text-brass",
    bg: "bg-brass",
    border: "border-brass",
    glow: "shadow-[0_0_30px_-4px_rgba(184,144,32,0.5)]",
    from: "from-brass",
    ring: "group-hover:border-brass",
    dot: "bg-brass",
  },
};