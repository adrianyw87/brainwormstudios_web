import { Link, useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || '/';

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 p-6 text-white">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="font-display text-7xl font-bold text-white/20">404</h1>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-amber">
          Página no encontrada
        </h2>
        <p className="text-white/60">
          La ruta <span className="font-mono text-amber">&quot;{pageName}&quot;</span> no existe.
        </p>
        <Link
          to="/"
          className="inline-flex border border-amber bg-amber px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink-900"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
