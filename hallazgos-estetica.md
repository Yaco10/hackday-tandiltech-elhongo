# Hallazgos: Tandil Tech Week + estética Arcade

Relevado el 2026-10-14 con Playwright (estilos computados + capturas a 1440×900).

- Tandil Tech Week: https://www.tandiltechweek.com (Next.js generado con v0.app, deploy en Vercel)
- Arcade: https://arcade-portfolio.framer.website (template de Framer, "Sanket – Full Stack Developer")

> Corrige `analisis-sitios.md`: la paleta "verde matriz sobre negro" de ese documento no coincide con ninguno de los dos sitios. Los valores de abajo salen de los estilos computados.

---

## 1. Tandil Tech Week: lo que hay hoy

**Estilo:** editorial suizo / neo-brutalista claro. Fondo papel, tinta casi negra, azul eléctrico y verde como acentos, tarjetas con borde de 2px y **sombra dura desplazada**.

### Tokens (están declarados en `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f4f3ef` | fondo principal |
| `--ink` | `#292929` | texto, bordes, sombras |
| `--ink-muted` | `#5c5c5c` | texto secundario |
| `--blue` | `#1000ff` | acento principal, bloque del hero, sección de inscripción |
| `--green` | `#28ad1d` | CTA, "2026", flechas |
| `--green-ink` | `#17700f` | verde para texto |
| `--soft` | `#e6e5e0` | secciones alternadas |
| `--line` | `#d5d3cc` | separadores de 1px |
| `--ease` | `cubic-bezier(.2,.7,.3,1)` | todas las transiciones |

- **Tipografía:** Switzer (una sola familia). Display a 800 con tracking `-0.035em`; labels a 12px/600 en mayúsculas con tracking `0.12em`.
- **Escala fluida:** `--text-h1: clamp(2.5rem, …, 4.75rem)`, `--text-h2: clamp(2rem, …, 3.75rem)`, espaciado `--space-3xs … --space-3xl`, `--content-max: 1280px`.
- **Tarjetas:** `border: 2px solid #292929` + `box-shadow: 5px 5px 0 #292929`, que se anima en hover (0.15s).
- **Movimiento:** marquee de tags (`marquee 45s linear`, separador `✦`), reveal al hacer scroll y flechas que se desplazan en hover (`translate .18s`).
- **Radio:** ninguno. Todo es recto, salvo los pills.
- **Elementos recurrentes:** chips de fecha sobre fondo de color (`14 OCTUBRE`), eyebrows en azul (`TRACK 01 · CIBERSEGURIDAD`), flechas `→` y `↗`, blob orgánico blanco sobre azul en el hero.

### Contenido y estructura

`Header` → `Hero (14&15 OCT. + blob)` → `Marquee` → `#agenda` (2 jornadas) → `#speakers` (próximamente) → `#organizan` (6 cards) → `#acompanan` (3 sponsors) → `Inscripción (azul)` → `Footer`.
Subpáginas: `/hacking-day` y `/startup-day`. La inscripción va por Luma (`luma.com/8dy1oypg`, `luma.com/esg42kt8`).

Los datos (organizadores, sponsors, jornadas) ya están relevados en `analisis-sitios.md` §2 y son correctos.

---

## 2. Arcade portfolio: patrones estéticos

**Estilo:** pixel art 8-bit con secciones que alternan **violeta oscuro** y **crema**, sobre una capa de scanlines.

### Paleta (valores computados)

| Rol | Valor |
|---|---|
| Tinta / bordes / sombras | `#0f0f1e` |
| Fondo violeta | `#2a1b4e` (más oscuro: `#1a1230`) |
| Crema (fondo y texto claro) | `#ffe9b8` |
| Verde "player" / OK | `#7af26a` |
| Rojo vidas / alerta | `#ff4d5a` |
| Cian | `#4fc3f7` |
| Violeta | `#8a5cf6` |

### Tipografía
- **Press Start 2P**: títulos, HUD y botones.
- **Silkscreen**: texto chico y labels.
- Todo en MAYÚSCULAS. Tamaños fijos: 12, 16, 18, 32, 40 y 56px, siempre peso 400.

### Recursos visuales concretos
1. **Transiciones escalonadas con `steps()`**: nada es suave. Hover `transform, filter .12s steps(2)`, aparición `opacity, transform .4s steps(4)`, reveal `clip-path 1s steps(10)`. Es la clave del "feel" retro.
2. **`image-rendering: pixelated`** en todas las imágenes (28 elementos).
3. **Scanlines:** `repeating-linear-gradient(0deg, rgba(15,15,30,.12) 0 2px, transparent 2px 4px)` sobre toda la página, más una trama de puntos `radial-gradient(#0f0f1e 1px, transparent 1.5px)`.
4. **Sombra dura:** `box-shadow: 6px 6px 0 #0f0f1e`. Es el mismo recurso que usa TTW (5px, `#292929`).
5. **Barras segmentadas:** `repeating-linear-gradient(90deg, … 10px, #0f0f1e 10px 12px)` para el loading y las skill bars.
6. **Cards con esquinas marcadas:** triangulitos de color en las 4 esquinas, uno por categoría (verde, rojo, cian, violeta).
7. **Fondos crema con elipses concéntricas** tipo viñeta CRT.

### Patrones de gamificación (lo que más sirve para minijuegos)
- **HUD fijo** en el header: `SCORE 000000` (**sube al scrollear**: 0 → 350 → 690 → 1040 → 1500), `LEVEL n/6` (uno por sección) y `LIVES ♥♥♥`.
- **Pantalla de carga** con moneda pixel, `▶ INSERT COIN`, barra `LOADING 100%` segmentada y `ANY KEY OR TAP` para entrar.
- **Toast "ACHIEVEMENT UNLOCKED"** abajo a la izquierda al entrar a cada sección (`PLAYER PROFILE UNLOCKED`, `SKILL TREE MAXED OUT`, `POWER-UPS AVAILABLE`, `FINAL STAGE REACHED`).
- **Personaje pixel** que camina por el borde inferior siguiendo el scroll.
- **Eyebrows con `◆`** (`◆ SAVE FILES`, `◆ POWER-UPS`, `◆ GAME OVER?`) y CTA `▶`.
- **Footer:** `INSERT COIN TO CONTINUE`.

---

## 3. Puente entre los dos sitios

Los dos ya comparten el ADN neo-brutalista: **bordes duros, sombra desplazada sin blur, cero radio y labels en mayúsculas con tracking**. Una capa arcade puede montarse sobre TTW sin romper la marca:

| TTW | Versión arcade sugerida |
|---|---|
| `--ink #292929` | tinta y sombra (sin cambio) |
| `--paper #f4f3ef` | equivale al crema `#ffe9b8` del arcade; mantener paper |
| `--blue #1000ff` | reemplaza al violeta como "pantalla" del juego |
| `--green #28ad1d` | verde player / score |
| (nuevo) `--red` | vidas y game over (`#ff4d5a`) |
| Switzer | sigue para el contenido; Press Start 2P / Silkscreen **solo** dentro del módulo de juegos y el HUD |
| `--ease` | dentro de los juegos usar `steps(n)` |
| sombra 5px | igual (ya coincide) |

Recomendación: no convertir todo el sitio en arcade. Agregar los minijuegos como **una sección o ruta "cabinet"** (pantalla azul `#1000ff` con scanlines, HUD y tipografía pixel) que conviva con el diseño editorial actual. Así se respeta la identidad que ya tiene el evento.

---

## 4. Insumos concretos para los minijuegos

- **HUD reutilizable:** `SCORE` con 6 dígitos y padding de ceros, `LEVEL`, `LIVES` con corazones en `#ff4d5a`.
- **Flujo de juego:** `INSERT COIN` → loading segmentado → `PRESS START` → juego → `GAME OVER? / CONTINUE`.
- **Feedback:** toast "ACHIEVEMENT UNLOCKED" (ya es un patrón probado en el arcade).
- **Temática por jornada:** Hacking Day (ciberseguridad, terminal o CTF) y Startup Day (pitch, founders, VC). Las ideas de §4 de `analisis-sitios.md` encajan.
- **Técnico:** el sitio real es Next.js, así que conviene hacer los juegos como componentes cliente con `<canvas>` e `image-rendering: pixelated`, más `localStorage` para el high score. Cargar las fuentes pixel solo en la ruta de juegos con `next/font`.
- **Accesibilidad:** respetar `prefers-reduced-motion` (apagar scanlines animadas y walker), aceptar teclado y tap, y no exigir pantalla completa.

Capturas de referencia (temporales): `/tmp/claude-1000/-home-yaco-Escritorio-tandil-tech-web/1e1a160c-b992-443c-bb35-cf492db5e1af/scratchpad/scrape/`
