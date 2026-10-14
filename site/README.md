# Tandil Tech Week · Home + Arcade

Réplica estática de la home de tandiltechweek.com (reconstruida desde el DOM y el CSS de producción) con el módulo **Arcade** embebido en `#arcade`.

## Correr local

```sh
python3 -m http.server 4173 --directory site
# http://localhost:4173/#arcade
```

Hace falta servirlo por HTTP: `arcade.js` es un ES module y no carga con `file://`.

## Estructura

```
index.html              home replicada + sección #arcade (entre Agenda y Speakers)
assets/vendor/          CSS, fuente Switzer e imágenes del sitio original
assets/arcade/
  arcade.css            estilos del módulo (todo bajo .arcade-section)
  arcade.js             cabinet: insert coin → select → juego → game over, HUD, logros, compartir, Konami
  data.js               contenido: partners, juegos, comandos de G1, slides de G2
```

## Juegos

- **Firewall Breach** (Hacking Day): tipear comandos reales antes de que se acabe el tiempo. Son 5 niveles × 3 comandos y 3 vidas. En mobile se juega en modo de opciones múltiples (teclas 1–3).
- **Pitch Perfect** (Startup Day): repetir la secuencia de slides del pitch, de 3 a 8. Teclas 1–6.
- **Easter egg**: el Konami code (↑↑↓↓←→←→BA) desbloquea un logro y cambia la paleta.

Los récords y logros se guardan en `localStorage` (`ttw-arcade:v1`). No hay backend.

## Deploy

Es estático: se puede subir la carpeta `site/` a Vercel, Netlify o GitHub Pages tal cual.
