import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, LogOut, Mail, RefreshCw } from "lucide-react";

const TOKEN_KEY = "bw_admin_token";

export default function ViewMensajes() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const loadMessages = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken("");
        }
        throw new Error(data.error || "No se pudieron cargar los mensajes");
      }
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadMessages(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");
    try {
      const res = await fetch("/api/messages/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Credenciales incorrectas");
      }
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setError(err.message || "Error de login");
    } finally {
      setLoggingIn(false);
    }
  };

  const onLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setMessages([]);
  };

  const field =
    "w-full border-b border-white/15 bg-transparent py-3 text-white placeholder-white/30 outline-none focus:border-amber font-body";
  const label = "font-mono text-[10px] uppercase tracking-[0.25em] text-white/40";

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5 text-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">Admin</div>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-amber">
              Mensajes
            </h1>
            <p className="mt-2 text-white/50">Acceso restringido</p>
          </div>
          <form onSubmit={onLogin} className="space-y-6">
            <div>
              <label className={label}>Usuario</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className={field}
              />
            </div>
            <div>
              <label className={label}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={field}
              />
            </div>
            {error && <p className="font-mono text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 border border-amber bg-amber px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-ink-900 disabled:opacity-60"
            >
              <Lock size={16} />
              {loggingIn ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <Link to="/" className="block text-center font-mono text-xs uppercase tracking-widest text-white/40 hover:text-amber">
            Volver al sitio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 px-5 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber">Admin</div>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-amber">
              Mensajes ({messages.length})
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => loadMessages()}
              disabled={loading}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-amber/50 hover:text-amber"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Actualizar
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-red-400/50 hover:text-red-400"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </div>

        {error && <p className="mt-4 font-mono text-sm text-red-400">{error}</p>}

        <div className="mt-8 space-y-4">
          {loading && messages.length === 0 && (
            <p className="text-white/40">Cargando...</p>
          )}
          {!loading && messages.length === 0 && (
            <p className="text-white/40">No hay mensajes todavía.</p>
          )}
          {messages.map((m) => (
            <article
              key={m.id}
              className="border border-white/10 bg-ink-800/40 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-amber">
                    {m.subject || "(Sin asunto)"}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                    <span>{m.name}</span>
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-amber hover:underline">
                      <Mail size={12} /> {m.email}
                    </a>
                  </div>
                </div>
                <time className="font-mono text-[10px] text-white/30">
                  {new Date(m.createdAt).toLocaleString("es-ES")}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-white/70">{m.message}</p>
            </article>
          ))}
        </div>

        <Link to="/" className="mt-10 inline-block font-mono text-xs uppercase tracking-widest text-white/40 hover:text-amber">
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}
