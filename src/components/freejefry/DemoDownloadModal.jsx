import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Download, FileText, KeyRound, Loader2, X } from "lucide-react";
import { useT } from "@/lib/useT";
import { cn } from "@/lib/utils";

function triggerDownload(url, fileName) {
  const a = document.createElement("a");
  a.href = url;
  if (fileName) a.download = fileName;
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function DemoDownloadModal({ open, onClose }) {
  const { t } = useT();
  const d = t.freejefry.demoModal;
  const [step, setStep] = useState("password"); // password | unlock
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [questionnaireDone, setQuestionnaireDone] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep("password");
    setPassword("");
    setError("");
    setLoading(false);
    setPayload(null);
    setQuestionnaireDone(false);
    setDemoStarted(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error === "invalid_password" ? d.wrongPassword : d.errorGeneric);
      }
      setPayload(data);
      setStep("unlock");
    } catch (err) {
      setError(err.message || d.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const onDownloadQuestionnaire = () => {
    if (!payload?.questionnaireUrl) return;
    triggerDownload(payload.questionnaireUrl, "cuestionario-tester-free-jefry.pdf");
    setQuestionnaireDone(true);
    // Unlock + kick off the demo download once the questionnaire has been requested.
    window.setTimeout(() => {
      if (!payload?.demoUrl) return;
      triggerDownload(payload.demoUrl, payload.fileName || "FreeJefryDemo2026.zip");
      setDemoStarted(true);
    }, 600);
  };

  const onDownloadDemo = () => {
    if (!questionnaireDone || !payload?.demoUrl) return;
    triggerDownload(payload.demoUrl, payload.fileName || "FreeJefryDemo2026.zip");
    setDemoStarted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="relative z-10 w-full max-w-lg border border-white/15 bg-ink-900 p-6 shadow-[0_0_60px_-12px_rgba(248,183,29,0.35)] lg:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-white/40 transition-colors hover:text-amber"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {step === "password" && (
              <form onSubmit={onSubmitPassword} className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">Free Jefry · Demo</div>
                  <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-amber">{d.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{d.intro}</p>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{d.passwordLabel}</label>
                  <div className="relative mt-2">
                    <KeyRound size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber/70" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoFocus
                      className="w-full border border-white/15 bg-ink-800/60 py-3 pl-10 pr-4 text-white outline-none transition-colors focus:border-amber"
                      placeholder={d.passwordPlaceholder}
                    />
                  </div>
                </div>

                {error && <p className="font-mono text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !password}
                  className="flex w-full items-center justify-center gap-2 border border-amber bg-amber px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-900 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                  {loading ? d.unlocking : d.unlock}
                </button>
              </form>
            )}

            {step === "unlock" && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-amber">
                    <Check size={14} /> {d.successBadge}
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-amber">{d.successTitle}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{d.successDesc}</p>
                </div>

                <ol className="space-y-4 text-left">
                  <li className="border border-white/10 bg-ink-800/40 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">01</div>
                        <h3 className="mt-1 font-display text-lg font-bold uppercase text-amber">{d.step1Title}</h3>
                        <p className="mt-2 text-sm text-white/55">{d.step1Desc}</p>
                      </div>
                      {questionnaireDone && <Check size={18} className="mt-1 shrink-0 text-amber" />}
                    </div>
                    <button
                      type="button"
                      onClick={onDownloadQuestionnaire}
                      className="mt-4 inline-flex items-center gap-2 border border-amber/60 bg-amber/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-amber transition-colors hover:bg-amber hover:text-ink-900"
                    >
                      <FileText size={14} />
                      {questionnaireDone ? d.step1Again : d.step1Cta}
                    </button>
                  </li>

                  <li
                    className={cn(
                      "border p-4 transition-opacity",
                      questionnaireDone ? "border-white/10 bg-ink-800/40 opacity-100" : "border-white/5 bg-ink-900/40 opacity-45"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-white/35">02</div>
                        <h3 className="mt-1 font-display text-lg font-bold uppercase text-amber">{d.step2Title}</h3>
                        <p className="mt-2 text-sm text-white/55">{d.step2Desc}</p>
                      </div>
                      {demoStarted && <Check size={18} className="mt-1 shrink-0 text-amber" />}
                    </div>
                    <button
                      type="button"
                      disabled={!questionnaireDone}
                      onClick={onDownloadDemo}
                      className="mt-4 inline-flex items-center gap-2 border border-amber bg-amber px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink-900 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download size={14} />
                      {demoStarted ? d.step2Again : d.step2Cta}
                    </button>
                    {!questionnaireDone && (
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-magma/80">{d.step2Locked}</p>
                    )}
                  </li>
                </ol>

                {(questionnaireDone || demoStarted) && (
                  <div className="border border-amber/20 bg-amber/5 p-4 text-left">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">{d.howTitle}</h3>
                    <ul className="mt-3 space-y-2 text-sm text-white/65">
                      {d.howSteps.map((line, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-amber">→</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
