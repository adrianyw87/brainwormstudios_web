# Plan: Sección Free Jefry – Web dentro de la web

## Objetivos

- Promocionar el juego y que la gente conozca todo
- Interesar en crowdfunding
- Descarga de demo
- Experiencia “web dentro de la web”, muy cuidada

---

## 1. Fondo muro de castillo

En la sección Free Jefry (#p2) se sustituye el fondo amarillo por un muro de castillo.

### Opciones técnicas

| Opción                          | Pros                                     | Contras                                           |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| **A) Imagen tileable**          | Resultado fiel, control total del estilo | Necesitas crear/buscar textura de piedra tileable |
| **B) Imagen de fondo grande**   | Un solo asset, efecto potente            | Archivo pesado si es de alta resolución           |
| **C) CSS pattern (SVG inline)** | Ligero, sin imágenes extra               | Difícil conseguir un “castillo” muy creíble       |
| **D) Generada con IA**          | Textura custom si la generas tú          | Hay que generar y exportar como imagen            |

### Recomendación

- **Opción A o B** según lo que tengas:
  - Si tienes o puedes hacer una **textura de piedra de castillo tileable** (ej. 512×512px), usar `background-repeat: repeat` y listo.
  - Si prefieres una imagen más cinematográfica del castillo, una imagen fija a pantalla completa con `background-size: cover` también funciona bien.
- **Ruta sugerida**: `public/img/FreeJefryImagenes/castle-wall.jpg` (o `castle-wall-tile.png`).
- **Contraste**: con el muro oscuro, los textos pueden ir en blanco/crema; mantendremos amarillo/dorado para acentos (botones, títulos) como en el resto del sitio.

---

## 2. Arquitectura de la sección

### Patrón similar a Estudio

- **Vista CTA (entrada)**: Logo Free Jefry + grid/tarjetas para las 6 subsecciones.
- **Slider horizontal**: al hacer clic en una subsección, slide a la vista de detalle.
- **Vista detalle**: contenido de cada subsección con “Volver” para volver al menú.

### Subsecciones (orden inicial)

| #   | Clave       | ES          | EN            |
| --- | ----------- | ----------- | ------------- |
| 1   | El juego    | El juego    | The Game      |
| 2   | El castillo | El castillo | The Castle    |
| 3   | Jefry       | Jefry       | Jefry         |
| 4   | Los Presos  | Los Presos  | The Prisoners |
| 5   | Enemigos    | Enemigos    | Enemies       |
| 6   | Disfraces   | Disfraces   | Disguises     |

Orden flexible: se puede mover o quitar alguna subsección más adelante.

### CTAs globales

- **Apoyar crowdfunding** (enlace externo, por ejemplo Verkami/Kickstarter).
- **Descargar demo** (botón o enlace a descarga).

---

## 3. Contenido por subsección (mapeo)

### El juego (El juego)

- Qué es FREE JEFRY (intro)
- Género: aventura gráfica + plataformas + metroidvania
- Lista de poderes (01–07)
- Mecánicas: poderes, objetos, crafteo, misiones, comida como vida, disfraces
- Crowdfunding: recompensas, riesgos y desafíos
- CTAs: crowdfunding, demo

### El castillo

- Castillo volador, rey caprichoso, guardias Ratas, presos
- Biomas: cuevas, celdas, sala de torturas, zona de obras, sala de máquinas, minas, cocinas, sala de juegos del rey

### Jefry

- Protagonista y su rol en la historia

### Los Presos

- Papel en la historia y misiones secundarias

### Enemigos

- Tipos de enemigos, comportamiento, relación con los poderes

### Disfraces

- Uso de disfraces para entrar en zonas cerradas

---

## 4. Keys i18n propuestas (ES + EN)

Organizadas por bloques para facilitar mantenimiento.

### Navegación / Subsecciones

```json
"FJ_NAV_GAME": "El juego",
"FJ_NAV_CASTLE": "El castillo",
"FJ_NAV_JEFRY": "Jefry",
"FJ_NAV_PRISONERS": "Los Presos",
"FJ_NAV_ENEMIES": "Enemigos",
"FJ_NAV_DISGUISES": "Disfraces",
"FJ_CTA_CROWDFUND": "Apoyar crowdfunding",
"FJ_CTA_DEMO": "Descargar demo"
```

### El juego – intro

```json
"FJ_WHAT_IS": "¿Qué es FREE JEFRY?",
"FJ_WHAT_IS_ES": "FREE JEFRY es el sueño de dos locos y un mago que se encaminaron en los reinos de los videojuegos, creado desde cero, como un proyecto personal. Nació de un sueño y terminó convirtiéndose en un desafío real: el primer videojuego de TRIPLE.Z.",
"FJ_WHAT_IS_EN": "FREE JEFRY is the dream of two crazy people and a wizard who ventured into the realm of video games. Created from scratch as a personal project, it was born from a dream and became a real challenge: the first TRIPLE.Z. video game.",
"FJ_GENRE_ES": "FREE JEFRY es una aventura gráfica con movimiento y exploración plataformera y con toques de metroidvania para hacer evolucionar al protagonista haciéndole adquirir diversos poderes.",
"FJ_GENRE_EN": "FREE JEFRY is a graphic adventure with platform movement and exploration, with metroidvania touches that let the protagonist evolve by acquiring various powers."
```

### Poderes (01–07)

```json
"FJ_POWER_01_ES": "Botas saltarinas - Doble salto",
"FJ_POWER_01_EN": "Spring boots - Double jump",
"FJ_POWER_02_ES": "Billy el Gnomo - Podrás manejarlo para entrar en lugares donde Jefry no entra",
"FJ_POWER_02_EN": "Billy the Gnome - Control him to enter places Jefry can't reach",
"FJ_POWER_03_ES": "El hada de los dientes - Ilumina las zonas oscuras dejándote ver trampas y enemigos",
"FJ_POWER_03_EN": "The Tooth Fairy - Lights up dark areas so you can see traps and enemies",
"FJ_POWER_04_ES": "Traje de buceo - Permite permanecer bajo el agua ilimitado y ver mejor a los enemigos",
"FJ_POWER_04_EN": "Diving suit - Stay underwater indefinitely and spot enemies better",
"FJ_POWER_05_ES": "Guantes pegajosos - Te permite trepar por algunos techos",
"FJ_POWER_05_EN": "Sticky gloves - Climb on certain ceilings",
"FJ_POWER_06_ES": "Técnica El Pisotón - Permite dañar a cualquier enemigo",
"FJ_POWER_06_EN": "The Stomp technique - Damages any enemy",
"FJ_POWER_07_ES": "Deslizarse a lo ninja - Permite esquivar enemigos y ataques veloces",
"FJ_POWER_07_EN": "Ninja slide - Dodge enemies and fast attacks"
```

### Mecánicas

```json
"FJ_MECHANICS_ES": "El juego es una mezcla de poderes, objetos, objetos crafteables, misiones, comida como vida y disfraces, todo dentro de un castillo volador gobernado por un rey caprichoso, guardias Ratas y un sinfín de presos atormentados por el rey.",
"FJ_MECHANICS_EN": "The game mixes powers, items, craftable items, quests, food as health and disguises, all within a flying castle ruled by a whimsical king, Rat guards and endless prisoners tormented by the king."
```

### Bullets mecánicas

```json
"FJ_MECH_POWERS_ES": "Los poderes se consiguen adentrándose en el castillo y ayudando a los presos con los que te vayas encontrando (misiones secundarias opcionales).",
"FJ_MECH_POWERS_EN": "Powers are earned by venturing into the castle and helping the prisoners you meet (optional side quests).",
"FJ_MECH_ITEMS_ES": "Para resolver misiones y puzzles tendrás que usar y mezclar objetos que irás encontrando por el castillo.",
"FJ_MECH_ITEMS_EN": "Solve quests and puzzles by using and combining items found throughout the castle.",
"FJ_MECH_HEALTH_ES": "La vida se recupera con comida encontrada o alimañas dispersas por el castillo. Varios puntos de respawn.",
"FJ_MECH_HEALTH_EN": "Health is restored with food or by defeating critters around the castle. Multiple respawn points.",
"FJ_MECH_DISGUISE_ES": "Cámbiate de ropa o disfrazate para engañar y entrar en zonas cerradas.",
"FJ_MECH_DISGUISE_EN": "Change clothes or disguise yourself to sneak into restricted areas.",
"FJ_MECH_BOSSES_ES": "Algunos bosses requieren destreza plataformera, otros ingenio.",
"FJ_MECH_BOSSES_EN": "Some bosses require platforming skill, others puzzle-solving.",
"FJ_MECH_CASTLE_ES": "El castillo es un gran laberinto lleno de trampas, sorpresas, peligros y futuros amigos, repartidos por diferentes biomas: cuevas, celdas olvidadas, sala de torturas, zona de obras, sala de máquinas, minas abandonadas, cocinas, sala de juegos del rey…",
"FJ_MECH_CASTLE_EN": "The castle is a vast maze full of traps, surprises, dangers and future friends, spread across biomes: caves, forgotten cells, torture room, construction zone, machine room, abandoned mines, kitchens, the king's game room…"
```

### Recompensas crowdfunding

```json
"FJ_REWARDS_TITLE": "Recompensas",
"FJ_REWARD_1_ES": "Nombre en los créditos en el Marco de Honor",
"FJ_REWARD_1_EN": "Name in the credits – Hall of Fame",
"FJ_REWARD_2_ES": "Agradecimiento especial: tu nombre en los créditos y en algún lugar del juego",
"FJ_REWARD_2_EN": "Special thanks: your name in the credits and somewhere in the game",
"FJ_REWARD_3_ES": "Copia de FREE JEFRY antes del lanzamiento + acceso a Discord",
"FJ_REWARD_3_EN": "Copy of FREE JEFRY before launch + Discord access",
"FJ_REWARD_4_ES": "Banda sonora original: más de 20 canciones",
"FJ_REWARD_4_EN": "Original soundtrack: 20+ tracks",
"FJ_REWARD_5_ES": "Folleto digital con diseños e ideas del mundo dibujado a mano",
"FJ_REWARD_5_EN": "Digital booklet with designs and ideas of the hand-drawn world",
"FJ_REWARD_6_ES": "Tu propia ficha técnica como personaje del mundo FREE JEFRY",
"FJ_REWARD_6_EN": "Your own character sheet in the FREE JEFRY world",
"FJ_REWARD_7_ES": "Salir como personaje dentro del juego",
"FJ_REWARD_7_EN": "Appear as a character in the game"
```

### Riesgos y desafíos

```json
"FJ_RISKS_TITLE": "Riesgos y desafíos",
"FJ_RISKS_ES": "Este es un juego indie creado desde cero. Como cualquier proyecto independiente hay desafíos que gestionar: alcance y cronograma. Llevamos dos años prototipando y creando FREE JEFRY; el ritmo es bueno y ya tenemos una demo final y funcional para que podáis probar si os gusta. Nuestro objetivo es ofrecer una experiencia estable y divertida que se sienta como un auténtico clásico de culto de aventura gráfica y plataformas.",
"FJ_RISKS_EN": "This is an indie game built from scratch. Like any independent project, there are challenges: scope and timeline. We've spent two years prototyping and creating FREE JEFRY; the pace is good and we have a final, playable demo so you can try it. Our goal is to deliver a stable, fun experience that feels like a true cult classic of graphic adventure and platforming."
```

### Placeholders para El castillo, Jefry, Presos, Enemigos, Disfraces

(Contenido específico cuando lo tengas)

```json
"FJ_CASTLE_INTRO_ES": "…",
"FJ_JEFRY_INTRO_ES": "…",
"FJ_PRISONERS_INTRO_ES": "…",
"FJ_ENEMIES_INTRO_ES": "…",
"FJ_DISGUISES_INTRO_ES": "…"
```

---

## 5. Estructura de imágenes sugerida

Carpeta: `public/img/FreeJefryImagenes/`

| Archivo                                    | Uso                                    |
| ------------------------------------------ | -------------------------------------- |
| `castle-wall.jpg` o `castle-wall-tile.png` | Fondo muro de castillo                 |
| `portada.jpg` / `hero.jpg`                 | Hero de “El juego”                     |
| `el-castillo.jpg`                          | Subsección El castillo                 |
| `jefry.jpg`                                | Subsección Jefry                       |
| `presos.jpg`                               | Subsección Los Presos                  |
| `enemigos.jpg`                             | Subsección Enemigos                    |
| `disfraces.jpg`                            | Subsección Disfraces                   |
| `power-01.png` … `power-07.png`            | Iconos de poderes (opcionales)         |
| `rewards-*.jpg`                            | Imágenes para recompensas (opcionales) |

---

## 6. Look & feel (alineado con el resto)

- **Fondo**: muro de castillo (gris/piedra oscura) en lugar de amarillo.
- **Texto**: blanco/crema sobre muro oscuro; títulos con estilo logo (amarillo + borde negro tipo CTA cards).
- **Botones**: reutilizar `bws-button` variant="card".
- **Tarjetas**: estilo similar a `cta-card` (hover, sombras).
- **Animaciones**: entradas tipo estudio-detalle, hover en títulos/textos.
- **Transiciones**: reutilizar `--bws-transition-main`, `--bws-transition-content`.

---

## 7. Fases de implementación sugeridas

1. **Fase 1 – Base**
   - Fondo muro de castillo en #p2 (con placeholder si aún no hay imagen).
   - Estructura freejefry-section: slider CTA ↔ detalle (igual que estudio-section).
   - Menú de 6 subsecciones en tarjetas.

2. **Fase 2 – Contenido**
   - Añadir todas las keys i18n (ES + EN).
   - Implementar subsección “El juego” con todo el texto y recompensas.

3. **Fase 3 – Resto de subsecciones**
   - El castillo, Jefry, Los Presos, Enemigos, Disfraces (con placeholders o textos finales).

4. **Fase 4 – CTAs y pulido**
   - Enlaces crowdfunding y demo.
   - Integrar imágenes promocionales.
   - Animaciones y responsive.

---

## Preguntas abiertas

1. **Imagen de muro**: ¿Tienes ya una textura/imagen de piedra de castillo, o quieres que usemos un placeholder temporal?
2. **Enlaces**: URLs definitivas para crowdfunding y descarga de demo.
3. **Idiomas**: ¿Usamos keys separadas (FJ*\*\_ES / FJ*\*\_EN) o un solo key con cambio de idioma en TranslateService?
4. **Orden de subsecciones**: ¿Mantenemos este orden o prefieres otro?
