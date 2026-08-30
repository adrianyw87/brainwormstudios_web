import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const LanguageContext = createContext();
const STORAGE_KEY = "bw_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "es";
    return localStorage.getItem(STORAGE_KEY) || "es";
  });
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setSwitching(true);
    setTimeout(() => {
      setLang((l) => (l === "es" ? "en" : "es"));
      setTimeout(() => setSwitching(false), 450);
    }, 250);
  }, []);

  const value = { lang, setLang, toggle, switching };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}