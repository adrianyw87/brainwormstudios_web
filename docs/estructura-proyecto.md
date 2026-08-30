# Estructura del proyecto

Dónde está cada parte del sitio y del backend.

---

## Árbol simplificado

```
brainwormstudios_web/
├── docs/                    ← Esta documentación
├── public/                  ← Archivos estáticos (copiados tal cual al build)
│   ├── images/              ← Imágenes del sitio
│   ├── favicon.svg
│   └── _redirects           ← SPA: todas las rutas → index.html
├── src/                     ← Frontend React (Vite)
│   ├── pages/               ← Páginas (Home, Contact, FreeJefry, etc.)
│   ├── components/          ← UI reutilizable, Navbar, Footer, etc.
│   ├── lib/                 ← Traducciones, idioma, utilidades
│   ├── App.jsx              ← Rutas de la aplicación
│   └── main.jsx             ← Entrada de React
├── functions/               ← Cloudflare Pages Functions (API en el edge)
│   ├── api/messages/        ← POST mensajes, GET listado, login admin
│   └── _lib/messages.js     ← Lógica compartida (KV, sesiones)
├── dist/                    ← Build de producción (generado, NO en git)
├── wrangler.toml            ← Config Cloudflare Pages / Wrangler local
├── vite.config.js           ← Config Vite
├── package.json             ← Scripts y dependencias
└── README.md                ← Guía técnica de desarrollo
```

---

## Rutas del sitio (frontend)

Definidas en `src/App.jsx`:

| Ruta | Página | Archivo |
|------|--------|---------|
| `/` | Inicio | `src/pages/Home.jsx` |
| `/servicios` | Servicios | `src/pages/Services.jsx` |
| `/servicios/:slug` | Detalle servicio | `src/pages/ServiceDetail.jsx` |
| `/free-jefry` | Free Jefry | `src/pages/FreeJefry.jsx` |
| `/contacto` | Contacto | `src/pages/Contact.jsx` |
| `/view-mensajes` | Panel admin mensajes | `src/pages/ViewMensajes.jsx` |

---

## API (Pages Functions)

Solo existen en deploy o con `npm run pages:dev` (no con `npm run dev` solo).

| Endpoint | Método | Función |
|----------|--------|---------|
| `/api/messages` | POST | Guardar mensaje de contacto |
| `/api/messages` | GET | Listar mensajes (requiere sesión admin) |
| `/api/messages/login` | POST | Login admin |

Código:

- `functions/api/messages/index.js`
- `functions/api/messages/login.js`
- `functions/_lib/messages.js`

Los mensajes se guardan en **Cloudflare KV** con la variable de entorno `MESSAGES`.

---

## Internacionalización

- `src/lib/translations.js` — textos ES/EN
- `src/lib/LanguageContext.jsx` — contexto de idioma
- `src/components/LanguageToggle.jsx` — selector de idioma

---

## Configuración Cloudflare

| Archivo / lugar | Uso |
|-----------------|-----|
| `wrangler.toml` | Nombre proyecto, `pages_build_output_dir`, notas KV |
| Dashboard → KV binding | `MESSAGES` en producción |
| Dashboard → Env vars | `ADMIN_USER`, `ADMIN_PASS` |
| `public/_redirects` | Fallback SPA para rutas de React |

---

## Scripts npm (`package.json`)

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo frontend |
| `npm run build` | Build producción → `dist/` |
| `npm run pages:dev` | Dev con API + KV local |
| `npm run pages:deploy` | Deploy manual por CLI (alternativa a Git) |
| `npm run lint` | ESLint |
