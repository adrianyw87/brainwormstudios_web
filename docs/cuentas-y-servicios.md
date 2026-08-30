# Cuentas y servicios

Referencia rápida de dónde gestionar cada cosa. **No guardes contraseñas en este archivo**; anótalas en un gestor de contraseñas (Bitwarden, 1Password, etc.).

---

## Resumen

| Servicio | Para qué sirve | Cuenta / acceso | URL |
|----------|----------------|-----------------|-----|
| **Piensa Solutions** | Dominio `brainwormstudios.com` (registro y nameservers) | La cuenta con la que compraste el dominio | [Panel Piensa Solutions](https://www.piensasolutions.com/) |
| **Cloudflare** | Hosting (Pages), DNS, SSL, API de contacto | `brainwormgamestudios@gmail.com` | [dash.cloudflare.com](https://dash.cloudflare.com) |
| **GitHub** | Código fuente y deploy automático | Usuario `adrianyw87` | [github.com/adrianyw87/brainwormstudios_web](https://github.com/adrianyw87/brainwormstudios_web) |

---

## Piensa Solutions

**Qué gestionas aquí**

- Propiedad del dominio `brainwormstudios.com`
- Renovación del dominio
- Nameservers (ahora apuntan a Cloudflare)

**Dónde entrar en el panel**

1. Inicio de sesión en Piensa Solutions
2. Dominio → **brainwormstudios.com**
3. Menú lateral → **Dominio** → **Servidores DNS**

**Nameservers actuales (Cloudflare)**

```
colin.ns.cloudflare.com
raegan.ns.cloudflare.com
```

**Nameservers antiguos (ya no usar)**

```
ns97.piensasolutions.com
ns98.piensasolutions.com
```

> El hosting web **no** está en Piensa Solutions. Solo el dominio. La web la sirve Cloudflare Pages.

---

## Cloudflare

**Cuenta:** `brainwormgamestudios@gmail.com`

**Qué gestionas aquí**

- Sitio web en producción
- DNS del dominio
- Certificado HTTPS (automático)
- Formulario de contacto (KV + variables de entorno)
- Deploys automáticos al hacer push a GitHub

### Enlaces directos útiles

| Qué | Dónde en el panel |
|-----|-------------------|
| Proyecto Pages | **Workers & Pages** → **brainwormstudios-web** |
| Deploys | Proyecto → pestaña **Deployments** |
| Dominio custom | Proyecto → pestaña **Custom domains** |
| Build settings | Proyecto → **Settings** → **Build** |
| KV (mensajes) | Proyecto → **Settings** → **Functions** → KV bindings |
| Variables admin | Proyecto → **Settings** → **Environment variables** |
| DNS del dominio | Menú lateral → **brainwormstudios.com** → **DNS** |
| SSL | **brainwormstudios.com** → **SSL/TLS** |

### URLs del sitio

| URL | Uso |
|-----|-----|
| https://brainwormstudios.com | Dominio oficial (producción) |
| https://brainwormstudios-web.pages.dev | URL de Pages (siempre funciona; útil para probar deploys) |

### Proyecto Pages

| Campo | Valor |
|-------|-------|
| Nombre del proyecto | `brainwormstudios-web` |
| Rama de producción | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| Repo conectado | `adrianyw87/brainwormstudios_web` |

**Importante:** al crear el proyecto hay que elegir **Pages** (en “Create application” → enlace “Looking to deploy Pages? Get started”). No crear un **Worker** con deploy command `wrangler deploy`.

---

## GitHub

**Repositorio:** [adrianyw87/brainwormstudios_web](https://github.com/adrianyw87/brainwormstudios_web)

**Qué gestionas aquí**

- Código fuente
- Historial de cambios
- Push a `main` → Cloudflare hace build y deploy solo

**Flujo habitual**

```bash
git add .
git commit -m "descripción del cambio"
git push
```

La carpeta `dist/` **no** se sube a Git (está en `.gitignore`). Cloudflare genera el build en sus servidores.

### Problema conocido: git push y SSL (Avast)

Si `git push` falla con *SSL certificate problem: unable to get local issuer certificate*, suele ser **Avast** interceptando HTTPS. Solución recomendada:

```powershell
git config --global http.sslbackend schannel
```

---

## Panel de mensajes (admin)

| Qué | Valor |
|-----|-------|
| URL producción | https://brainwormstudios.com/view-mensajes |
| URL local | http://localhost:8788/view-mensajes (con `npm run pages:dev`) |
| Usuario por defecto | `admin` |
| Contraseña | La definida en Cloudflare (`ADMIN_PASS`) o en `.dev.vars` en local |

Credenciales locales: archivo `.dev.vars` en la raíz (no está en git). En producción: **Cloudflare** → proyecto → **Settings** → **Environment variables**.

---

## Checklist: qué falta por hacer (si aún no lo hiciste)

- [ ] Crear namespace **KV** y enlazarlo como `MESSAGES` en el proyecto Pages
- [ ] Añadir variables `ADMIN_USER` y `ADMIN_PASS` en Production
- [ ] Cambiar la contraseña admin por una segura
- [ ] (Opcional) Añadir `www.brainwormstudios.com` en Custom domains
