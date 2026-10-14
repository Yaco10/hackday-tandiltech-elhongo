# Análisis Comparativo: Arcade Portfolio vs Tandil Tech Week

## 1. ARCADE PORTFOLIO - Estética Pixel Art / Retro Gaming

### Patrones Estéticos Identificados

#### **UI/Visual**
- **Score/Level System**: `SCORE000000`, `LEVEL1/6`, `LIVES` (corazones pixelados)
- **Menú estilo arcade**: Navegación como botones de máquina (`[ABOUT]`, `[SKILLS]`, `[SERVICES]`)
- **Botón "INSERT COIN"**: CTA principal recurrente
- **Cursor/Pointer**: Estilo `▶` para elementos interactivos
- **Boxes/Containers**: `◆ PLAYER PROFILE`, `◆ STAT SHEET`, `◆ SAVE FILES`, `◆ POWER-UPS`, `◆ GAME OVER?`
- **Tipografía**: Monospace, mayúsculas, estilo terminal/consola
- **Separadores**: Caracteres ASCII (`─`, `│`, `◆`, `▶`, `✦`)
- **Colores**: Fondo oscuro, texto verde/ámbar (estilo matriz/terminal), acentos en cian/magenta
- **Animaciones**: "LOADING 0%", "PRESS START ANY KEY OR TAP"

#### **Gamificación**
- **Player Profile**: Stats como RPG (Role, Focus, Stack, Location, Status)
- **Stat Sheet**: Skills como barras de progreso numéricas (95, 88, 90, 82)
- **Save Files**: Proyectos como "partidas guardadas"
- **Power-ups**: Servicios como "power-ups"
- **Game Over?**: Contacto como "continue screen"

#### **Componentes Reutilizables**
1. **ArcadeHeader** - Score, Level, Lives
2. **ArcadeNav** - Botones estilo cabinet
3. **InsertCoinCTA** - Botón principal pulsante
4. **StatBox** - Container con bordes ASCII (`◆ TITLE`)
5. **ProgressBar** - Skill bars numéricas
6. **SaveFileCard** - Project cards como cartuchos
7. **PowerUpCard** - Service cards
8. **ContinueScreen** - Contact/Game over
9. **LoadingOverlay** - "INSERT COIN TO CONTINUE"
10. **Footer** - Copyright estilo arcade

---

## 2. TANDIL TECH WEEK - Contenido y Componentes Actuales

### Data Estructurada Identificada

#### **Evento Principal**
```json
{
  "name": "Tandil Tech Week",
  "dates": "14 & 15 octubre 2026",
  "location": "Tandil, Argentina",
  "tagline": "Un encuentro para construir lo que viene",
  "hashtags": ["UNICEN CAMPUS", "DISTRITO AVELLANEDA", "HACKING DAY", "CIBERSEGURIDAD", "STARTUP DAY", "AGRITECH & BIO", "SOFTWARE & AI", "VENTURE CAPITAL", "POLO CIENTÍFICO", "FOUNDERS & BUILDERS"]
}
```

#### **Días/Tracks (2 jornadas distintas)**
```json
[
  {
    "id": "hacking-day",
    "date": "14 Octubre",
    "venue": "Campus Universitario UNICEN",
    "track": "Ciberseguridad",
    "title": "Hacking Day",
    "description": "Jornada de hacking en equipos. Juntá a tus amigos y vení a divertirte aprendiendo de ciberseguridad.",
    "type": "competencia-tecnica",
    "url": "/hacking-day"
  },
  {
    "id": "startup-day",
    "date": "15 Octubre",
    "venue": "Distrito Avellaneda",
    "track": "Startups",
    "title": "Startup Day",
    "description": "Vení a conocer a los que hacen. Charlas dinámicas y networking entre fundadores, venture capital y estudiantes.",
    "type": "networking-charlas",
    "url": "/startup-day"
  }
]
```

#### **Organizadores (5 entidades)**
```json
[
  { "name": "Picante", "type": "VC Fund", "url": "https://picante.fund", "desc": "Acompañan desde el principio a la nueva generación de founders latinoamericanos: AI Natives construyendo productos globales.", "category": "Venture Capital" },
  { "name": "Relaw", "type": "Venture Legal", "url": "https://relaw.io", "desc": "El partner legal de startups y empresas de tecnología. Expertise legal y visión de negocio, con acompañamiento 360°.", "category": "Legal Tech" },
  { "name": "Paisanos", "type": "Product Studio", "url": "https://paisanos.io", "desc": "Estudio global de diseño y desarrollo de productos digitales, acompañando a startups y corporates.", "category": "Product & Tech" },
  { "name": "HackTandil", "type": "Community", "url": "https://hacktandil.org", "desc": "Comunidad tecnológica de Tandil que conecta desarrolladores, estudiantes, emprendedores y entusiastas.", "category": "Builder Community" },
  { "name": "Geonosis", "type": "Tech Partner", "url": "https://geonosisgroup.com", "desc": "El brazo tecnológico de startups y empresas, desde la idea hasta el scale-up.", "category": "Idea to Scale" },
  { "name": "Fardo", "type": "Brand Intelligence", "url": "https://heyfardo.com", "desc": "Primera plataforma de brand intelligence de Latam. Miden cómo aparece tu marca en ChatGPT, Gemini, Perplexity y Claude.", "category": "AI Visibility" }
]
```

#### **Sponsors/Acompañan (3)**
```json
[
  { "name": "Grupo Rotonda", "url": "https://gruporotonda.com.ar" },
  { "name": "The Red Guild", "url": "https://theredguild.org" },
  { "name": "Payoneer", "url": "https://www.payoneer.com" }
]
```

#### **Inscripciones**
```json
{
  "opens": "2026-09-17T19:00:00-03:00",
  "timezone": "GMT-3",
  "countdown": true,
  "cta": "Construyamos juntos lo que viene"
}
```

#### **Redes Sociales**
```json
{
  "instagram": "https://instagram.com/tandiltechweek",
  "x": "https://x.com/tandiltechweek",
  "handle": "@tandiltechweek"
}
```

#### **Navegación Actual**
- Inicio
- Agenda (#agenda)
- Speakers (#speakers)
- Organizan (#organizan)
- Acompañan (#acompanan)
- Hacking Day (/hacking-day)
- Startup Day (/startup-day)

---

## 3. MAPEO: Componentes Tandil → Estética Arcade

| Componente Tandil | Componente Arcade Equivalente | Transformación |
|-------------------|------------------------------|----------------|
| Header/Nav | `ArcadeHeader` + `ArcadeNav` | Score = Año/Edición, Level = Día actual, Lives = Cupos disponibles |
| Hero Principal | `InsertCoinCTA` + `PlayerProfile` | "INSERT COIN → INSCRIBITE", Player = Asistente |
| Dos Jornadas | `SaveFileCard` x2 | Cada día = "Save Slot" seleccionable |
| Tracks (Ciberseguridad/Startups) | `StatBox` / `PowerUpCard` | Skills track = Power-ups desbloqueables |
| Organizadores | `PowerUpCard` grid | Cada org = Power-up con rareza (VC=Legendary, Community=Common) |
| Sponsors | `StatBox` "SPONSORS" | Logos como "ACHIEVEMENTS UNLOCKED" |
| Speakers (próximamente) | `SaveFileCard` "COMING SOON" | Slots vacíos con "???" |
| Countdown Inscripciones | `LoadingOverlay` / Timer | "INSERT COIN IN: XX:XX:XX" |
| Footer | `ArcadeFooter` | Copyright + High Scores (asistentes anteriores) |

---

## 4. NUEVOS COMPONENTES: MINIJUEGOS

### Ideas Integradas en la Estética

#### **Mini-juego 1: "Firewall Breach" (Hacking Day)**
- **Tipo**: Terminal hacking simulation
- **Mecánica**: Escribir comandos correctos antes que el timer
- **Recompensa**: Badge "HACKER" + puntos para leaderboard
- **Integración**: Desbloquea info extra del Hacking Day

#### **Mini-juego 2: "Pitch Perfect" (Startup Day)**
- **Tipo**: Typing game / Simon says
- **Mecánica**: Completar pitch deck slides en orden
- **Recompensa**: Badge "FOUNDER" + networking points
- **Integración**: Muestra speakers/VCs ocultos

#### **Mini-juego 3: "Token Collector" (Global)**
- **Tipo**: Endless runner / Platformer simple
- **Mecánica**: Recoger tokens TANDIL evitando bugs
- **Recompensa**: High score global + descuento merch
- **Integración**: Persiste en localStorage, leaderboard semanal

#### **Mini-juego 4: "CTF Terminal" (Easter Egg)**
- **Tipo**: Command-line puzzle
- **Acceso**: Konami code o click secreto
- **Recompensa**: Easter egg content (wallpapers, stickers digitales)

---

## 5. ARQUITECTURA TÉCNICA PROPUESTA

### Stack
- **Framework**: Astro + React (islas interactivas) o Next.js
- **Styling**: Tailwind CSS + CSS Variables para paleta arcade
- **Animaciones**: Framer Motion / CSS keyframes
- **State**: Zustand para game state, localStorage persistence
- **Canvas**: HTML5 Canvas o PixiJS para minijuegos
- **Fonts**: `Press Start 2P`, `VT323`, `Space Mono`, `JetBrains Mono`

### Paleta Colores Arcade
```css
:root {
  --bg-primary: #0a0a0f;        /* Negro profundo */
  --bg-secondary: #12121a;      /* Panel oscuro */
  --fg-primary: #00ff88;        /* Verde matriz/terminal */
  --fg-secondary: #ffaa00;      /* Ámbar score */
  --accent-cyan: #00ffff;       /* Cian highlights */
  --accent-magenta: #ff00aa;    /* Magenta alerts */
  --accent-red: #ff3344;        /* Game over / lives */
  --border: #333344;            /* Bordes ASCII */
  --card-bg: #1a1a24;           /* Cards */
  --text-dim: #666688;          /* Texto secundario */
}
```

### Estructura de Páginas
```
/                    → Arcade Cabinet (Hero + Insert Coin)
/hacking-day         → Save Slot 1: FIREWALL BREACH
/startup-day         → Save Slot 2: PITCH PERFECT
/leaderboard         → HIGH SCORES (asistentes + game scores)
/profile             → PLAYER PROFILE (registro/perfil)
/arcade              → TOKEN COLLECTOR (minijuego global)
```

---

## 6. PRÓXIMOS PASOS

1. **Setup proyecto** con Astro + Tailwind + shadcn/ui base
2. **Design system**: Componentes arcade base (Box, Button, Text, StatBar)
3. **Página principal**: Cabinet completo con Insert Coin → redirect a /register
4. **Páginas de días**: Save slots interactivos con mini-juegos embebidos
5. **Sistema de auth simple**: LocalStorage "player profile" + nickname
6. **Leaderboard**: Supabase/Firebase para scores globales
7. **Minijuegos**: Canvas-based, uno por día + global
8. **Easter eggs**: Konami code, konsole commands
9. **Deploy**: Vercel/Netlify con edge functions para countdown