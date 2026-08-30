# Despliegue — lo que hicimos (agosto 2026)

Cronología y pasos del primer despliegue a producción.

---

## Resultado final

- **Sitio en vivo:** https://brainwormstudios.com
- **Pages (alternativa):** https://brainwormstudios-web.pages.dev
- **Hosting:** Cloudflare Pages (plan gratuito)
- **Dominio:** Piensa Solutions → DNS gestionado por Cloudflare

---

## 1. Código en GitHub

1. Repo creado y subido: `adrianyw87/brainwormstudios_web`
2. Rama principal: `main`
3. Primer commit relevante: `primera subida`

**Nota:** no hace falta commitear `dist/`. Cloudflare construye el sitio al recibir el push.

---

## 2. Primer intento fallido (Worker en lugar de Pages)

Se creó por error un proyecto tipo **Worker** (con *Deploy command* `npx wrangler deploy`). Eso fallaba con:

```
It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

**Solución:** borrar ese proyecto Worker y crear uno nuevo como **Pages**:

1. **Workers & Pages** → **Create application**
2. Abajo del modal: **“Looking to deploy Pages? Get started”**
3. **Connect to Git** → repo `brainwormstudios_web`
4. Configuración de build:

| Campo | Valor |
|-------|-------|
| Project name | `brainwormstudios-web` |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |

5. **Save and Deploy** → deploy correcto en `brainwormstudios-web.pages.dev`

---

## 3. Dominio en Cloudflare

### 3.1 Añadir el dominio a la cuenta Cloudflare

1. **Connect a domain** (no “Transfer a domain”)
2. Dominio: `brainwormstudios.com`
3. Revisar registros DNS importados (venían de Piensa: IP `217.160.0.124`)
4. **Continue to activation**

### 3.2 Cambiar nameservers en Piensa Solutions

Panel: **Dominio** → **Servidores DNS** → **Modificar servidores DNS**

| Antes | Después |
|-------|---------|
| `ns97.piensasolutions.com` | `colin.ns.cloudflare.com` |
| `ns98.piensasolutions.com` | `raegan.ns.cloudflare.com` |

Propagación: unos minutos en nuestro caso (puede tardar hasta 24 h).

### 3.3 Enlazar dominio al proyecto Pages

1. **Workers & Pages** → **brainwormstudios-web** → **Custom domains**
2. **Set up a custom domain** → `brainwormstudios.com`
3. **Activate domain** → Cloudflare sustituyó registros A/AAAA antiguos por:

```
CNAME  @  →  brainwormstudios-web.pages.dev
```

4. Estado pasó de **Verifying** a activo; el sitio cargó en https://brainwormstudios.com

---

## 4. Deploy automático (flujo habitual)

```
Editas código en local
    → git push a main
    → Cloudflare detecta el push
    → npm install + npm run build
    → Publica dist + functions/
    → Sitio actualizado en brainwormstudios.com
```

Ver estado: Cloudflare → proyecto → **Deployments**.

---

## 5. Pendiente: formulario de contacto en producción

El formulario de `/contacto` y el panel `/view-mensajes` necesitan configuración extra en Cloudflare:

### KV (almacén de mensajes)

1. **Workers & Pages** → **KV** → Create namespace (ej. `brainworm-messages`)
2. Proyecto **brainwormstudios-web** → **Settings** → **Functions** → **KV namespace bindings**
3. Variable: `MESSAGES` → namespace creado
4. Redeploy del proyecto

### Variables de entorno (admin)

En **Settings** → **Environment variables** (Production):

| Variable | Descripción |
|----------|-------------|
| `ADMIN_USER` | Usuario del panel `/view-mensajes` |
| `ADMIN_PASS` | Contraseña (marcar como secret) |

Sin esto, el contacto puede devolver error de KV no configurado.

---

## 6. Desarrollo local (recordatorio)

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Solo frontend en `localhost:5173` |
| `npm run pages:dev` | Frontend + API + KV local |
| `npm run build` | Genera `dist/` (prueba local) |

Credenciales locales en `.dev.vars` (copiar de `.dev.vars.example` si existe, o crear con `ADMIN_USER` y `ADMIN_PASS`).

---

## 7. Si algo falla en el futuro

| Síntoma | Qué revisar |
|---------|-------------|
| Deploy falla en Cloudflare | **Deployments** → log del build |
| `wrangler deploy` en el log | Proyecto mal creado como Worker; usar Pages |
| Dominio no carga | DNS en Cloudflare; propagación; Custom domains |
| Contacto no guarda | KV binding `MESSAGES` |
| Admin no entra | `ADMIN_USER` / `ADMIN_PASS` en env vars |
| `git push` falla SSL | Avast → `git config --global http.sslbackend schannel` |
