# BrainWorm Studios - Sitio Web

Sitio web oficial del estudio de videojuegos independiente BrainWorm Studios.

## Tecnologías

- **Angular 19** - Framework frontend
- **SCSS** - Estilos con variables centralizadas
- **Font Awesome** - Iconografía

## Estructura del proyecto

```
src/
├── app/
│   ├── core/           # Servicios compartidos (SEO, etc.)
│   ├── app.component.*
│   └── app.config.ts
├── styles/
│   ├── _variables.scss # Variables CSS centralizadas (colores, tipografía, etc.)
│   └── _layout.scss    # Layout one-page con navegación vertical
├── index.html
└── styles.scss         # Punto de entrada de estilos globales
```

## Secciones

- **El Estudio** - Presentación del estudio
- **Free Jefry** - Juego principal
- **Otros** - Otros proyectos
- **Contacto** - Información de contacto

## Personalización de estilos

Edita `src/styles/_variables.scss` para cambiar:

- Paleta de colores (`--bws-gold-primary`, `--bws-brown-dark`, etc.)
- Tipografía
- Transiciones y animaciones
- Dimensiones del layout

## Desarrollo

```bash
npm install
npm start
```

Abre http://localhost:4200

## Build de producción

```bash
npm run build
```

Los archivos se generan en `dist/brainwormstudios-web/`

## SEO

- Meta tags configurados en `index.html`
- Servicio `SeoService` para actualización dinámica de título y meta tags
- Estructura semántica (main, nav, section)
- Atributos aria para accesibilidad
