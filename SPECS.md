# SPECS: Tandil Tech Week · Módulo Arcade y Minijuegos

| Campo | Valor |
|---|---|
| Versión | 0.2 |
| Fecha | 2026-10-14 |
| Estado | **En construcción durante la hack.** v1 implementada en `site/`. |
| Fuentes | `hallazgos-estetica.md` (relevamiento con Playwright), `analisis-sitios.md` (datos de contenido) |

## 0. Decisiones confirmadas (v0.2)

| Pregunta | Decisión | Impacto |
|---|---|---|
| Q1 · Momento | **Se termina ahora, durante la hack (14–15/10)** | Alcance mínimo: G1 + G2, sin backend |
| Q4 · Código | **Sin acceso al código fuente.** Solo el relevamiento con Playwright | La home se **reconstruye como sitio estático** (`site/`) a partir del DOM y el CSS de producción, y se le suma el módulo |
| Q5 · Ubicación | **Embebidos como feature en la home**: sección `#arcade` entre Agenda y Speakers, más el ítem "Arcade · NEW" en el menú | Se descarta la ruta `/arcade` |
| Q11 · Publicidad | **Integrados a la difusión del evento**: ticker de Organizan y Acompañan en el cabinet, CTA a Luma en cada game over, compartir el puntaje con `#TandilTechWeek @tandiltechweek` y banner "EN VIVO HOY" según la fecha | Solo se usan los nombres y links públicos de partners, no logos dentro del juego |

**Decisiones por defecto aplicadas** (las recomendaciones de §13, revisables): Q3 → G1 + G2 (más el Konami code como logro); Q6 → pantalla azul `#1000ff`; Q7 → castellano con términos arcade en inglés; Q12 y Q13 → sin leaderboard global ni premios; Q14 → compartir con Web Share o copiar al portapapeles; Q16 → modo de opciones múltiples en mobile; Q20 → sin sonido.

**Stack real de la v1** (reemplaza §9.1): HTML, CSS y JS vanilla con ES modules, sin build ni dependencias. Fuentes Switzer (local), Press Start 2P y Silkscreen (Google Fonts). Despliegue estático (Vercel, Netlify o GitHub Pages).

**Nota de diseño:** Press Start 2P dibuja mal las mayúsculas con tilde, así que esos textos se muestran sin tilde (helper `px()`). Silkscreen sí las soporta.

**Siguen abiertas:** Q2, Q8, Q10, Q15, Q17, Q21–Q24.

> Cómo leer este documento: cada decisión que todavía no está confirmada lleva la marca **[SUPUESTO → Qn]**, donde `Qn` es la pregunta de §13 que la resuelve. Cuando haya respuesta, se reemplaza el supuesto por la decisión y se sube la versión.

---

## 1. Contexto y objetivo

**Tandil Tech Week 2026** es un evento de dos jornadas en Tandil, Argentina:
- **Hacking Day:** 14 de octubre en el Campus UNICEN, track de ciberseguridad.
- **Startup Day:** 15 de octubre en el Distrito Avellaneda, track de startups.

El sitio actual (www.tandiltechweek.com) es informativo y tiene una estética editorial clara.

**Objetivo del proyecto:** sumar al sitio una capa lúdica con estética **arcade/pixel**, inspirada en arcade-portfolio.framer.website, que incluya **minijuegos** temáticos de cada jornada, sin perder la identidad visual del evento.

### 1.1 Objetivos medibles [SUPUESTO → Q1, Q2]
| # | Objetivo | Métrica tentativa |
|---|---|---|
| O1 | Aumentar el engagement en el sitio | Tiempo en página, partidas iniciadas por visita |
| O2 | Difundir el evento | Puntajes compartidos en redes |
| O3 | Llevar tráfico a la inscripción | Clicks a Luma desde la pantalla de game over |
| O4 | Reforzar la temática de cada jornada | Partidas por juego |

---

## 2. Alcance

### 2.1 Dentro del alcance (v1) [SUPUESTO → Q3, Q5]
- Módulo **Arcade** (sección o ruta "cabinet") con su propio sistema visual.
- **2 minijuegos** como mínimo, uno por jornada.
- HUD (score, nivel, vidas), pantalla de entrada "Insert coin" y logros.
- High score local por dispositivo.
- Integración con la navegación y los CTA de inscripción existentes.

### 2.2 Fuera del alcance (v1) [SUPUESTO → Q12, Q13]
- Rediseño completo del sitio a estética arcade.
- Login o cuentas de usuario.
- Leaderboard global con backend.
- Premios físicos y validación antifraude.
- Multijugador.

---

## 3. Fuentes relevadas

| Sitio | URL | Tecnología | Rol en el proyecto |
|---|---|---|---|
| Tandil Tech Week | https://www.tandiltechweek.com | Next.js (v0.app), Vercel | Sitio destino; manda la identidad de marca |
| Arcade Portfolio | https://arcade-portfolio.framer.website | Framer | Referencia estética y de gamificación |

**Estado del código:** este repo **no tiene el código fuente del sitio**; solo contiene notas. → **Q4**

---

## 4. Contenido y modelo de datos

Contenido relevado del sitio en producción. Se modela en TypeScript para reutilizarlo dentro de los juegos (por ejemplo, organizadores como power-ups).

```ts
type Event = {
  name: "Tandil Tech Week";
  edition: 2026;
  dates: { start: "2026-10-14T09:00:00-03:00"; end: "2026-10-15T20:00:00-03:00" };
  location: "Tandil, Buenos Aires, AR";
  tagline: "Un encuentro para construir lo que viene.";
  tags: string[]; // UNICEN CAMPUS, DISTRITO AVELLANEDA, HACKING DAY, CIBERSEGURIDAD, STARTUP DAY,
                  // AGRITECH & BIO, SOFTWARE & AI, VENTURE CAPITAL, POLO CIENTÍFICO, FOUNDERS & BUILDERS
  social: { instagram: "https://instagram.com/tandiltechweek"; x: "https://x.com/tandiltechweek" };
};

type Day = {
  id: "hacking-day" | "startup-day";
  date: string;          // "14 Octubre" | "15 Octubre"
  venue: string;         // "Campus Universitario UNICEN" | "Distrito Avellaneda"
  track: string;         // "Track 01 · Ciberseguridad" | "Track 02 · Startups"
  title: string;
  description: string;
  path: string;          // "/hacking-day" | "/startup-day"
  registerUrl: string;   // luma.com/8dy1oypg | luma.com/esg42kt8
  color: "blue" | "green";
};

type Partner = {
  name: string; url: string;
  kind: "organizer" | "sponsor";
  label?: string;        // "VC Fund", "Venture Legal", ...
  category?: string;     // "Venture Capital", "Legal Tech", ...
  description?: string;
};
```

| Organizadores (6) | Tipo |
|---|---|
| Picante | VC Fund |
| Relaw | Venture Legal |
| Paisanos | Product Studio |
| HackTandil | Community |
| Geonosis | Tech Partner |
| Fardo | Brand Intelligence |

| Sponsors (3) |
|---|
| Grupo Rotonda |
| The Red Guild |
| Payoneer |

**Speakers:** todavía figuran como "Próximamente". → **Q10**
**Uso de logos y marcas de partners dentro de los juegos:** sin confirmar. → **Q11**

---

## 5. Sistema de diseño

### 5.1 Principio rector
> **El sitio sigue siendo editorial. El arcade es una "pantalla" dentro del sitio.**
> Las tipografías pixel, las transiciones con `steps()` y las scanlines se usan **solo** dentro del módulo Arcade. [SUPUESTO → Q5]

### 5.2 Tokens base (heredados de TTW, sin cambios)
```css
--paper:#f4f3ef; --ink:#292929; --ink-muted:#5c5c5c;
--blue:#1000ff;  --green:#28ad1d; --green-ink:#17700f;
--soft:#e6e5e0;  --line:#d5d3cc;
--ease:cubic-bezier(.2,.7,.3,1);
--tracking-label:.12em; --content-max:1280px;
```

### 5.3 Tokens del módulo Arcade (nuevos) [SUPUESTO → Q6]
```css
.arcade {
  --arc-screen: var(--blue);     /* fondo de pantalla. Alternativa: #2a1b4e (violeta de la referencia) */
  --arc-screen-deep: #0a0080;
  --arc-ink: #0f0f1e;            /* bordes y sombras */
  --arc-cream: #ffe9b8;          /* texto claro. Alternativa: var(--paper) */
  --arc-player: #7af26a;         /* score, OK, jugador */
  --arc-danger: #ff4d5a;         /* vidas, game over */
  --arc-info: #4fc3f7;
  --arc-rare: #8a5cf6;
  --arc-shadow: 6px 6px 0 var(--arc-ink);
  --arc-scanlines: repeating-linear-gradient(0deg, rgb(15 15 30 / .12) 0 2px, transparent 2px 4px);
  --arc-segments: repeating-linear-gradient(90deg, currentColor 0 10px, var(--arc-ink) 10px 12px);
}
```

### 5.4 Tipografía
| Uso | Fuente | Tamaños |
|---|---|---|
| Sitio (sin cambios) | Switzer | escala `clamp()` existente |
| Títulos, HUD y botones arcade | Press Start 2P | 12 / 16 / 32 / 40px (múltiplos de 8), peso 400 |
| Texto chico arcade | Silkscreen | 12 / 16px |

- Las fuentes pixel se cargan **solo** en la ruta del módulo, con `next/font` y `display: swap`.
- Dentro del arcade todo el texto va en mayúsculas.
- Idioma: castellano rioplatense, con términos arcade en inglés ("INSERT COIN", "GAME OVER"). → **Q7**

### 5.5 Motion
| Contexto | Regla |
|---|---|
| Sitio | `--ease`, entre 150 y 180ms (sin cambios) |
| Hover arcade | `transform, filter .12s steps(2)` |
| Aparición arcade | `opacity, transform .4s steps(4)` |
| Reveal de pantalla | `clip-path 1s steps(10)` |
| `prefers-reduced-motion` | sin scanlines animadas, sin walker y transiciones instantáneas |

### 5.6 Componentes
| Componente | Descripción | Origen |
|---|---|---|
| `ArcadeScreen` | Contenedor con fondo `--arc-screen`, scanlines y borde de 4px | nuevo |
| `Hud` | `SCORE 000000` · `LEVEL n/N` · `LIVES ♥♥♥` | referencia arcade |
| `InsertCoin` | Moneda pixel, barra de loading segmentada y "PRESS START · ANY KEY OR TAP" | referencia arcade |
| `PixelButton` | Botón con sombra dura y estado presionado (`translate(6px,6px)` sin sombra) | ambos |
| `SegmentBar` | Barra de progreso, vida o tiempo segmentada | referencia arcade |
| `CornerCard` | Card con triangulitos de color en las esquinas | referencia arcade |
| `AchievementToast` | "ACHIEVEMENT UNLOCKED · …", abajo a la izquierda, dura 3s | referencia arcade |
| `GameOver` | Puntaje, récord, `CONTINUE?`, compartir y CTA a inscripción | nuevo |
| `GameCard` | Tarjeta de selección de juego, con estilo de las cards de jornada de TTW | TTW + arcade |
| `Walker` (opcional) | Personaje pixel que acompaña el scroll | referencia arcade → **Q8** |

---

## 6. Arquitectura de información

### 6.1 Rutas [SUPUESTO → Q5]
| Ruta | Contenido |
|---|---|
| `/` | Home actual + **nueva sección "Arcade"** (teaser con `InsertCoin` y CTA) |
| `/arcade` | Cabinet: selección de juegos, HUD global y logros |
| `/arcade/[game]` | Juego a pantalla del módulo |
| `/hacking-day` | Página actual + bloque "Jugá el desafío" que lleva al juego de Hacking Day |
| `/startup-day` | Página actual + bloque que lleva al juego de Startup Day |

### 6.2 Navegación
- Agregar el ítem **"ARCADE"** al header, después de "ACOMPAÑAN". → **Q9**
- Desde cada game over: CTA "Inscribite al [jornada] →" con link a Luma.

---

## 7. Experiencia del módulo Arcade

### 7.1 Flujo
```
Entrada (home o /arcade)
  → INSERT COIN (loading segmentado, ~1.2s; se saltea si ya se vio en la sesión)
  → PRESS START (tecla o tap)
  → SELECT GAME (cards)
  → [Juego] → GAME OVER (score, récord, logro)
       ├─ CONTINUE (reintentar)
       ├─ COMPARTIR → Q14
       └─ INSCRIBIRME → Luma
```

### 7.2 HUD global
- **SCORE:** suma de los mejores puntajes de cada juego, con 6 dígitos y ceros adelante.
- **LEVEL:** cantidad de juegos completados sobre el total (`1/4`).
- **LIVES:** propia de cada juego; dentro del cabinet es decorativa.

### 7.3 Logros (propuesta inicial) [SUPUESTO → Q15]
| ID | Nombre | Condición |
|---|---|---|
| `first-coin` | PLAYER 1 READY | Primera partida jugada |
| `hacker` | ROOT ACCESS | Completar el juego de Hacking Day |
| `founder` | SERIES A | Completar el juego de Startup Day |
| `full-week` | FULL WEEK | Completar ambos |
| `konami` | ??? | Easter egg (Konami code) |
| `high-score` | NEW RECORD | Superar el récord propio |

---

## 8. Minijuegos

Hay cuatro candidatos. La v1 incluye **G1 y G2** [SUPUESTO → Q3]. Las especificaciones de cada juego son una propuesta para validar.

### G1 · FIREWALL BREACH (Hacking Day)
| Campo | Spec |
|---|---|
| Género | Typing / terminal contra reloj |
| Fantasía | Hackeás un servidor de práctica antes de que te detecten |
| Mecánica | Aparece un "prompt" con un comando (`nmap`, `ssh`, `grep`, `chmod`, ...) y hay que tipearlo antes de que se vacíe la barra de tiempo |
| Progresión | 5 niveles; en cada uno baja el tiempo y los comandos son más largos |
| Vidas | 3: se pierde una por error o por timeout |
| Score | `100 × nivel` por comando + bonus por tiempo restante |
| Duración objetivo | 60–90 s |
| Controles | Teclado. En mobile se muestran opciones múltiples en vez de tipear → **Q16** |
| Fin | Al perder 3 vidas, o al terminar el nivel 5 → logro `hacker` |
| Contenido educativo | Al fallar, un tooltip de una línea explica qué hace el comando → **Q17** |

### G2 · PITCH PERFECT (Startup Day)
| Campo | Spec |
|---|---|
| Género | Orden / memoria (Simon says) |
| Fantasía | Armás tu pitch frente a un VC |
| Mecánica | Hay que ordenar las slides de un pitch (Problema, Solución, Mercado, Tracción, Equipo, Ask) o repetir una secuencia que crece |
| Progresión | La secuencia crece de 3 a 8 elementos |
| Vidas | 3 |
| Score | `150 × largo de la secuencia` + bonus por velocidad |
| Duración objetivo | 60–90 s |
| Controles | Click o tap; teclas 1–6 |
| Fin | Al completar la secuencia de 8 → logro `founder` ("SERIES A") |

### G3 · TOKEN COLLECTOR (global, candidato v2)
| Campo | Spec |
|---|---|
| Género | Endless runner en `<canvas>` |
| Mecánica | Saltar bugs y juntar tokens; la velocidad crece con el tiempo |
| Controles | Espacio o tap |
| Score | Distancia + tokens |
| Ambientación | Silueta de las sierras de Tandil, con la Piedra Movediza como hito → **Q18** |

### G4 · CTF TERMINAL (easter egg, candidato v2)
| Campo | Spec |
|---|---|
| Acceso | Konami code (↑↑↓↓←→←→BA) en cualquier página |
| Mecánica | Terminal falsa con comandos `help`, `ls`, `cat` y 3 flags escondidas |
| Recompensa | Contenido exclusivo → **Q19** |

### 8.1 Requisitos comunes a todos los juegos
- Corren 100% en el cliente, sin red durante la partida.
- Pausa automática al perder el foco (`visibilitychange`).
- Escalado del canvas en múltiplos enteros con `image-rendering: pixelated`.
- Sonido apagado por defecto, con botón de mute. → **Q20**
- High score en `localStorage` (con `try/catch`), con clave `ttw-arcade:v1`.

---

## 9. Requisitos técnicos

### 9.1 Stack [SUPUESTO → Q4]
| Capa | Decisión |
|---|---|
| Framework | Next.js (App Router), el mismo del sitio actual |
| Estilos | Tailwind + CSS variables (tokens de §5) |
| Juegos | React con un `<canvas>` propio y un loop con `requestAnimationFrame`, sin motor externo. Se reevalúa si llega G3 |
| Estado | `useReducer` por juego; contexto `ArcadeProvider` para el HUD y los logros |
| Persistencia | `localStorage`. Backend solo si se aprueba el leaderboard → **Q12** |
| Deploy | Vercel (actual) |

### 9.2 Estructura propuesta
```
app/
  arcade/
    layout.tsx           // carga fuentes pixel y ArcadeProvider
    page.tsx             // cabinet / select
    [game]/page.tsx
components/arcade/       // Hud, InsertCoin, PixelButton, SegmentBar, CornerCard, AchievementToast, GameOver
games/
  firewall-breach/       // logic.ts (puro, testeable) + Game.tsx (render)
  pitch-perfect/
lib/arcade/
  storage.ts  achievements.ts  score.ts
content/
  event.ts  days.ts  partners.ts   // modelo de §4
```
La lógica de cada juego va en funciones puras, separada del render, para poder testearla.

### 9.3 No funcionales
| Área | Requisito |
|---|---|
| Performance | El módulo arcade **no** suma JS a `/` más allá del teaser (juegos con `dynamic import`). Juegos a 60fps en un mobile de gama media. LCP de la home sin regresión |
| Accesibilidad | Jugable con teclado; foco visible; `aria-live` para score y vidas; contraste AA en los textos del HUD; `prefers-reduced-motion`; nunca solo color para indicar estado |
| Responsive | Desde 360px de ancho; controles táctiles en pantalla |
| Navegadores | Las dos últimas versiones de Chrome, Safari, Firefox y Edge; iOS Safari 16+ |
| SEO | `/arcade` indexable con metadata y OG image propia → **Q14** |
| Analytics | Vercel Analytics (ya instalado). Eventos: `arcade_start`, `game_start`, `game_over{score}`, `cta_register_click` → **Q21** |
| Privacidad | Sin datos personales en la v1 |

---

## 10. Criterios de aceptación (v1)

- [ ] Desde la home se llega a `/arcade` en 1 click.
- [ ] La pantalla INSERT COIN responde a tecla y tap, y se saltea en la segunda visita de la sesión.
- [ ] G1 y G2 se pueden jugar completos con teclado y con touch.
- [ ] El high score persiste al recargar.
- [ ] Los logros se muestran como toast una sola vez.
- [ ] El game over muestra el CTA a la inscripción correspondiente.
- [ ] Con `prefers-reduced-motion` no hay animación continua.
- [ ] Lighthouse de `/` mantiene performance y accesibilidad (sin regresión mayor a 5 puntos).
- [ ] La tipografía pixel no se carga en `/`, salvo en el teaser si se aprueba.

---

## 11. Supuestos

1. El sitio se puede modificar y tenemos acceso al código (o a v0).
2. La marca TTW manda sobre la referencia arcade.
3. No hay presupuesto de backend en la v1.
4. El contenido de los juegos (comandos, slides) lo redactamos nosotros y lo revisa la organización.

## 12. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **El evento es hoy y mañana (14 y 15/10).** El valor de difusión se agota rápido | Alto | Definir si apuntamos al evento en vivo o a la edición 2027 → **Q1** |
| Sin acceso al repo del sitio | Alto | Construir el módulo standalone para integrarlo después → **Q4** |
| La estética arcade choca con la marca | Medio | Encapsular en `.arcade`; validar con la organización |
| Juegos que no funcionan bien en mobile | Medio | Controles táctiles diseñados desde el inicio |
| Abuso del leaderboard (si se suma) | Medio | Validación del lado del servidor y rate limit → **Q12** |

---

## 13. Preguntas abiertas

Formato: **pregunta** · por qué importa · opciones · *recomendación* (se aplica si no hay respuesta).

### A. Objetivo y contexto
**Q1. ¿Para qué momento es esto?**
El evento es el 14 y 15 de octubre de 2026 (hoy y mañana). La respuesta cambia el alcance y los plazos.
Opciones: (a) uso en vivo durante el evento, por ejemplo en una pantalla en el venue; (b) post-evento / archivo; (c) edición 2027.
*Recomendación: (c) para la v1 completa, o un juego mínimo si se busca (a).*

**Q2. ¿Cuál es el objetivo principal?**
Define qué CTA prioriza el game over y qué se mide.
Opciones: engagement, inscripciones, difusión en redes, branding de sponsors o educativo.
*Recomendación: inscripciones + difusión.*

**Q3. ¿Cuántos juegos entran en la v1 y cuáles?**
Opciones: G1, G2, G3, G4 (§8).
*Recomendación: G1 + G2.*

### B. Proyecto y código
**Q4. ¿Tenemos acceso al código del sitio?**
Puede ser un repo de GitHub, un proyecto de v0 o un deploy en una cuenta de Vercel accesible. Sin acceso, se construye un módulo aparte.
Opciones: (a) repo con permisos; (b) solo v0; (c) sin acceso, construir standalone.
*Recomendación: (a). Si no, (c) con la misma estructura de §9.2.*

**Q5. ¿Dónde viven los juegos?**
Opciones: (a) ruta `/arcade` + teaser en la home; (b) sección embebida en la home; (c) dentro de `/hacking-day` y `/startup-day`; (d) sitio arcade completo.
*Recomendación: (a), con links desde las páginas de cada jornada.*

### C. Diseño
**Q6. ¿De qué color es la "pantalla" arcade?**
Opciones: (a) azul TTW `#1000ff`; (b) violeta de la referencia `#2a1b4e`; (c) negro `#0f0f1e`.
*Recomendación: (a), por coherencia de marca.*

**Q7. ¿En qué idioma están los textos del arcade?**
Opciones: (a) castellano con términos arcade en inglés; (b) todo en castellano ("INSERTÁ FICHA"); (c) todo en inglés.
*Recomendación: (a).*

**Q8. ¿Incluimos el personaje pixel (walker) y la mascota?**
¿Hay mascota o personaje del evento, o lo diseñamos? ¿Quién hace el pixel art?
*Recomendación: un personaje simple de 16×16 hecho por nosotros; opcional en la v1.*

**Q9. ¿Agregamos "ARCADE" al menú principal?**
*Recomendación: sí, con un pequeño badge "NEW".*

### D. Contenido
**Q10. ¿Hay speakers confirmados para usar en los juegos?**
Por ejemplo, como personajes o VCs en G2.
*Recomendación: no depender de ellos en la v1.*

**Q11. ¿Se pueden usar logos y nombres de organizadores y sponsors dentro de los juegos?**
Por ejemplo, power-ups con la marca. Requiere permiso de las marcas.
*Recomendación: solo en los créditos y el game over ("Powered by"), no como elementos del juego, hasta tener permiso.*

### E. Funcionalidad
**Q12. ¿Hace falta un leaderboard global?**
Implica backend (Supabase o Vercel KV), moderación de nicknames y antifraude.
Opciones: (a) no, solo local; (b) sí, con nickname; (c) sí, ligado a la inscripción en Luma.
*Recomendación: (a) en la v1; (b) en la v2.*

**Q13. ¿Va a haber premios?**
Si hay premios, aparecen requisitos de bases y condiciones, verificación y antifraude.
*Recomendación: sin premios en la v1, o premios simbólicos (stickers en el venue con un código en pantalla).*

**Q14. ¿Se puede compartir el puntaje?**
Opciones: (a) no; (b) texto + link (Web Share API); (c) imagen generada (OG dinámica).
*Recomendación: (b) en la v1.*

**Q15. ¿Aprobás la lista de logros de §7.3, o agregamos o quitamos alguno?**

**Q16. ¿Cómo se juega G1 en mobile?**
Opciones: (a) tipear con el teclado del teléfono; (b) opción múltiple; (c) solo desktop.
*Recomendación: (b).*

**Q17. ¿Qué tan "educativo" es G1?**
¿Comandos reales con explicación? ¿Lo revisa alguien de HackTandil o The Red Guild?
*Recomendación: comandos reales e inocuos, con un tip de una línea, y revisión de la comunidad.*

**Q18. ¿Ambientamos G3 en Tandil (sierras, Piedra Movediza, Lago del Fuerte)?**

**Q19. ¿Qué recompensa da el easter egg G4?**
Opciones: wallpapers, stickers digitales, código de merch o nada (solo el logro).

**Q20. ¿Los juegos tienen sonido?**
Opciones: (a) sin sonido; (b) SFX chiptune con mute (apagado por defecto); (c) SFX + música.
*Recomendación: (b).*

### F. Operación
**Q21. ¿Qué analytics se usan?**
¿Alcanza con Vercel Analytics, o hay GA o Meta Pixel?
*Recomendación: Vercel Analytics con eventos custom.*

**Q22. ¿Quién aprueba diseño y contenido, y en qué plazo?**
¿Hay un contacto en la organización (HackTandil, Paisanos, …)?

**Q23. ¿Cuál es la fecha límite de entrega y el criterio de "listo"?**

**Q24. ¿Hay restricciones legales o de marca?**
Por ejemplo, términos de uso, uso de "INSERT COIN" o tipografías con licencia.
Press Start 2P y Silkscreen tienen licencia OFL, libres de uso.

---

## 14. Plan por fases (tentativo)

| Fase | Entregable | Depende de |
|---|---|---|
| 0 | Respuestas de Q1–Q6 y acceso al código | — |
| 1 | Tokens + componentes arcade (§5.6) + página `/arcade` con el flujo INSERT COIN → SELECT | Q4, Q5, Q6 |
| 2 | G1 Firewall Breach jugable (desktop + mobile) | Q16, Q17 |
| 3 | G2 Pitch Perfect | — |
| 4 | Logros, game over con CTA, compartir, analytics | Q14, Q15, Q21 |
| 5 | QA (a11y, performance, dispositivos) y deploy | Q22, Q23 |
| v2 | G3, G4, leaderboard global | Q12, Q18, Q19 |
