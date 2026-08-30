# BrainWorm Studios

Sitio informativo de BrainWorm Studios (`brainwormstudios.com`), desplegado en Cloudflare Pages.

## Requisitos

- Node.js 18+ (recomendado 20 LTS; Wrangler 3 incluido en el proyecto)
- Cuenta de [Cloudflare](https://dash.cloudflare.com) (plan gratuito sirve)
- Wrangler se instala con `npm install` (no hace falta instalarlo global)

## Desarrollo local (solo frontend)

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. El formulario de contacto necesita las Pages Functions (ver abajo).

## Desarrollo con API (Functions + KV)

```bash
npm install
npm run pages:dev
```

Esto hace build y arranca `wrangler pages dev` con binding KV `MESSAGES`. Las credenciales admin locales están en `.dev.vars` (no se sube a git):

- Usuario: `admin`
- Contraseña: `123admin`

Panel: `/view-mensajes`

## Build

```bash
npm run build
```

Salida en `dist/`.

## Publicar en Cloudflare Pages

### 1. Crear el proyecto

1. Sube este repo a GitHub (o usa deploy directo con Wrangler).
2. En Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → conectar el repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (raíz del repo)

### 2. KV para mensajes

1. Workers & Pages → **KV** → Create namespace (ej. `brainworm-messages`).
2. En el proyecto Pages → **Settings** → **Functions** → **KV namespace bindings**:
   - Variable name: `MESSAGES`
   - Namespace: el que creaste
3. Copia el ID del namespace a `wrangler.toml` (campo `id` / `preview_id`) si usas Wrangler CLI.

### 3. Secrets de admin

En el proyecto Pages → **Settings** → **Environment variables** (Production):

| Name         | Value     |
|--------------|-----------|
| `ADMIN_USER` | `admin`   |
| `ADMIN_PASS` | `123admin`|

Marca `ADMIN_PASS` como secret si el panel lo permite. Cambia la contraseña cuando puedas.

### 4. Dominio `brainwormstudios.com`

1. En el proyecto Pages → **Custom domains** → Add `brainwormstudios.com` (y `www` si quieres).
2. En el registrador del dominio:
   - **Opción A (recomendada):** cambia los nameservers a los de Cloudflare (añade el dominio a Cloudflare DNS).
   - **Opción B:** crea los registros CNAME/A que indique el panel de Pages.
3. Espera la propagación DNS (minutos a horas).

### 5. Comprobar

- `https://brainwormstudios.com/` — home
- Rutas SPA (`/free-jefry`, `/contacto`, etc.)
- Enviar mensaje desde `/contacto`
- Ver mensajes en `/view-mensajes` con admin

## Deploy por CLI (alternativa)

```bash
npx wrangler login
npm run pages:deploy
```

Luego configura KV binding y variables en el dashboard si aún no están.

## Estructura relevante

- `src/` — frontend React (Vite)
- `functions/api/messages/` — Pages Functions (guardar / listar / login)
- `public/images/` — assets locales (sin CDN Base44)
- `public/_redirects` — SPA fallback a `index.html`
- `wrangler.toml` — config Pages / KV
