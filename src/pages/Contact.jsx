import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Check } from "lucide-react";
import { useT } from "@/lib/useT";
import Reveal, { Kicker } from "@/components/Reveal";

export default function Contact() {
  const { t } = useT();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar el mensaje");
      }
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err.message || "Error al enviar");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full border-b border-white/15 bg-transparent py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-amber font-body";
  const label = "font-mono text-[10px] uppercase tracking-[0.25em] text-white/40";

  return (
    <div className="relative min-h-screen pt-28">
      <div className="absolute inset-0 grid-lines opacity-10" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <Reveal>
          <Kicker>{t.contact.title}</Kicker>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            {t.contact.subtitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/60">{t.contact.desc}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className={label}>{t.contact.name}</label>
                  <input name="name" value={form.name} onChange={onChange} required placeholder={t.contact.placeholderName} className={field} />
                </div>
                <div>
                  <label className={label}>{t.contact.email}</label>
                  <input name="email" type="email" value={form.email} onChange={onChange} required placeholder={t.contact.placeholderEmail} className={field} />
                </div>
              </div>
              <div>
                <label className={label}>{t.contact.subject}</label>
                <input name="subject" value={form.subject} onChange={onChange} placeholder={t.contact.placeholderSubject} className={field} />
              </div>
              <div>
                <label className={label}>{t.contact.message}</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={4} placeholder={t.contact.placeholderMessage} className={`${field} resize-none`} />
              </div>

              {error && (
                <p className="font-mono text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group relative flex items-center gap-3 overflow-hidden border border-amber bg-amber px-10 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-ink-900 transition-all hover:shadow-[0_0_40px_-6px_rgba(248,183,29,0.8)] disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      <Check size={18} /> {t.contact.success}
                    </motion.span>
                  ) : (
                    <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                      {sending ? "..." : t.contact.send} <Send size={16} className="transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-px">
              <div className="border border-white/10 bg-ink-800/40 p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">Studio</div>
                <div className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{t.contact.infoTitle}</div>
              </div>
              <div className="flex items-center gap-4 border border-white/10 bg-ink-800/40 p-7">
                <MapPin size={20} className="text-amber" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Location</div>
                  <div className="text-white">{t.contact.infoLocation}</div>
                </div>
              </div>
              <a href={`mailto:${t.contact.infoEmail}`} className="flex items-center gap-4 border border-white/10 bg-ink-800/40 p-7 transition-colors hover:border-amber/50 hover:bg-ink-800">
                <Mail size={20} className="text-amber" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email</div>
                  <div className="text-white">{t.contact.infoEmail}</div>
                </div>
              </a>
              <div className="border border-white/10 bg-ink-800/40 p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber">{t.contact.social}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Instagram", "YouTube"].map((s) => (
                    <a key={s} href="#" className="border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-all hover:border-amber/50 hover:text-amber">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
