# BrainWorm Studios – Documentación del Proyecto

> **Objetivo**: Este documento sirve como contexto para que una IA pueda retomar el proyecto sin tener que analizar todo el código desde cero.

---

## 1. Resumen

**BrainWorm Studios** es la web corporativa de un estudio de videojuegos indie de Madrid. Web one-page con estilo tipo Kill Bill (negro + amarillo, flat). Sin routing Angular: navegación por anclas (`#studio`, `#free-jefry`, etc.) y CSS `:target`.

---

## 2. Stack técnico

- **Angular 19** (standalone components)
- **ngx-translate** (i18n: es, en)
- **SCSS** para estilos globales
- **Font Awesome** para iconos

---

## 3. Arquitectura y estructura

### 3.1 Navegación (hash-based)

- `#studio` → Estudio (p1)
- `#free-jefry` → FreeJefry (p2)
- `#development` → Desarrollo (p3)
- `#contact` → Contacto (p4)

El `main` es un anidado de `div.ct` con id `studio`, `free-jefry`, `development`, `contact`. Cada sección está en un `div.page` (`p1`…`p4`). El CSS usa `:target` para aplicar el slide horizontal (desktop) o superposición (móvil).

### 3.2 Componentes (`src/app/components/`)

| Componente                   | Descripción                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `NavBarComponent`            | Barra lateral (desktop) o topbar (móvil), siempre negra. Logo, menú de secciones, selector de idioma. |
| `EstudioSectionComponent`    | Sección Estudio con CTA y subsección Detalle (slider interno).                                        |
| `FreeJefrySectionComponent`  | Sección del juego Free Jefry.                                                                         |
| `DesarrolloSectionComponent` | Sección de servicios de desarrollo.                                                                   |
| `ContactoSectionComponent`   | Sección de contacto con email.                                                                        |
| `BwsButtonComponent`         | Botón reutilizable estilo btnfos-1 (SVG stroke, subrayado animado).                                   |

### 3.3 Estructura del `AppComponent`

- `estudioView`: `'cta' | 'detalle'` – qué vista mostrar en Estudio
- `estudioAnimationKey`: contador que se incrementa al ir a Estudio para reanimar
- `resetEstudioView()`: vuelve a CTA y dispara animación
- `goToEstudioDetalle()`: pasa a vista Detalle

---

## 4. Sección Estudio (detalle)

Tiene **dos vistas** con slider horizontal:

1. **CTA**: logo, título “El Estudio” (animación letra a letra), hints, botón “Conócenos”.
2. **Detalle**: botón Volver, título “El equipo”, intro, 3 tarjetas de miembros (crew), botón “Ir a contacto”.

- El título del CTA usa `titleChars` (array de caracteres) y animación 3D (letras entrando desde los lados).
- Las 3 personas vienen de `crew` en el componente; datos editables en i18n (`ESTUDIO_MEMBER_X_NAME`, `ESTUDIO_MEMBER_X_ROLE`, etc.).
- Fuente hero del título: Righteous (variable `--bws-font-hero`).

---

## 5. Botón reutilizable (`app-bws-button`)

- **Sin `href`**: se renderiza como `<button>`; contenido vía `ng-content`.
- **Con `href`**: se renderiza como `<a>`; texto vía Input `[label]` (evita problemas con ng-content + translate).
- Estilo: fondo negro, texto blanco, hover con fondo transparente y subrayado animado (SVG + ResizeObserver para que el subrayado quede siempre horizontal).
- Ejemplo:  
  `<app-bws-button href="/contact" [label]="'CTA_IR_CONTACTO' | translate"></app-bws-button>`

---

## 6. Estilos globales

### 6.1 Variables (`src/styles/_variables.scss`)

- **Colores de sección**: `--bws-section-1-bg` … `--bws-section-4-bg` (amarillos de oscuro a claro).
- **Texto**: `--bws-text-primary` (negro en secciones), `--bws-text-on-dark` (blanco en nav).
- **Tipografía**: `--bws-font-family`, `--bws-font-display`, `--bws-font-hero`.
- **Transiciones**: `--bws-transition-main`, etc.

### 6.2 Layout (`src/styles/_layout.scss`)

- Desktop: menú lateral izquierdo; contenido de secciones desliza horizontalmente.
- Móvil: topbar fija; secciones superpuestas con `z-index` y slide.
- Estudio: CTA y Detalle con slider propio; scroll vertical en móvil si hace falta.

---

## 7. i18n

- Archivos: `public/i18n/es.json` y `public/i18n/en.json`.
- Claves para Estudio: `SECTION_ESTUDIO_*`, `ESTUDIO_MEMBER_X_*`, `CTA_*`.
- Idioma guardado en `localStorage` y aplicado al cargar.

---

## 8. Convenciones y detalles a recordar

1. **Estudio**: al hacer clic en el enlace de Estudio en el menú se llama `resetEstudioView`, lo que reinicia la animación del CTA.
2. **BwsButton enlaces**: usar siempre `[label]` con el pipe translate, no `ng-content`, para evitar texto vacío.
3. **Colores**: fondos amarillos → texto negro; barra de navegación negra → texto blanco.
4. **Responsive**: media queries en `_layout.scss` para `768px` y `480px`.

---

## 9. Archivos clave

| Ruta                                  | Descripción                                               |
| ------------------------------------- | --------------------------------------------------------- |
| `src/app/app.component.html`          | Estructura principal (nav + 4 páginas).                   |
| `src/app/app.component.ts`            | Lógica de Estudio (`estudioView`, `estudioAnimationKey`). |
| `src/app/components/estudio-section/` | CTA + Detalle + crew.                                     |
| `src/app/components/bws-button/`      | Botón reutilizable.                                       |
| `src/styles/_variables.scss`          | Variables de diseño.                                      |
| `src/styles/_layout.scss`             | Layout y estilos de secciones.                            |
| `public/i18n/*.json`                  | Traducciones.                                             |
