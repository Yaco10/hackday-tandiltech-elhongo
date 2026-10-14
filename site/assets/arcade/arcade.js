import { SITE, ORGANIZAN, ACOMPANAN, GAMES, ACHIEVEMENTS, COMMANDS, LEVEL_NAMES, PITCH_PADS, PITCH_ROUNDS } from "./data.js";

const root = document.querySelector("[data-arcade]");
if (root) init();

function init() {
  const $ = (sel, el = root) => el.querySelector(sel);
  const stage = $("[data-stage]");
  const announcer = $("[data-announce]");
  const toasts = document.querySelector("[data-toasts]");
  const hudEl = { score: $('[data-hud="score"]'), level: $('[data-hud="level"]'), lives: $('[data-hud="lives"]') };
  const coarse = matchMedia("(pointer: coarse)").matches;

  // ---------- Persistencia (por dispositivo) ----------
  const KEY = "ttw-arcade:v1";
  const state = { best: {}, ach: [], ...load() };
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }
  function session(k, v) { try { return v === undefined ? sessionStorage.getItem(k) : sessionStorage.setItem(k, v); } catch { return null; } }

  // ---------- HUD, avisos y logros ----------
  const pad6 = (n) => String(Math.max(0, Math.floor(n))).padStart(6, "0");
  const totalBest = () => Object.values(state.best).reduce((a, b) => a + b, 0);
  const completed = () => ["hacker", "founder"].filter((a) => state.ach.includes(a)).length;

  function hud({ score = totalBest(), level = `${completed()}/2`, lives = 3 } = {}) {
    hudEl.score.textContent = pad6(score);
    hudEl.level.textContent = level;
    hudEl.lives.textContent = "♥".repeat(lives) + "♡".repeat(Math.max(0, 3 - lives));
    hudEl.lives.setAttribute("aria-label", `${lives} vidas`);
  }
  const say = (t) => { announcer.textContent = t; };

  function toast(title, body) {
    const el = document.createElement("div");
    el.className = "arc-toast";
    el.innerHTML = `<b>${px(title)}</b>${px(body)}`;
    toasts.append(el);
    setTimeout(() => el.remove(), 3300);
  }
  function unlock(id) {
    if (state.ach.includes(id)) return;
    state.ach.push(id);
    save();
    toast("Achievement unlocked", ACHIEVEMENTS[id]);
    if (id !== "full-week" && state.ach.includes("hacker") && state.ach.includes("founder")) unlock("full-week");
  }

  // ---------- Ticker de partners (publicidad del evento) ----------
  const tickerItems = [
    `<span><b>▶</b> Tandil Tech Week · 14 &amp; 15 OCT</span>`,
    `<span><b>Organizan</b></span>`,
    ...ORGANIZAN.map((p) => `<span><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a> <b>✦</b></span>`),
    `<span><b>Acompañan</b></span>`,
    ...ACOMPANAN.map((p) => `<span><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a> <b>✦</b></span>`),
    `<span>@tandiltechweek <b>✦</b></span>`,
  ].join("");
  $("[data-ticker]").innerHTML = tickerItems + tickerItems.replaceAll("<a ", '<a tabindex="-1" aria-hidden="true" ');

  // ---------- Banner "en vivo" según el día (hora de Argentina) ----------
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
  const live = Object.values(GAMES).find((g) => g.dateISO === today);
  if (live) {
    const banner = $("[data-live]");
    banner.textContent = `En vivo hoy: ${live.day} · ${live.date}`;
    banner.hidden = false;
  }

  // ---------- Motor de pantallas ----------
  let cleanup = () => {};
  function show(render) {
    cleanup();
    cleanup = render() || (() => {});
  }
  const html = (s) => { stage.innerHTML = s; };
  const focusFirst = () => stage.querySelector("[autofocus], button, input")?.focus({ preventScroll: true });

  // 1) INSERT COIN
  function attract() {
    hud();
    html(`
      <div class="arc-center">
        ${coinSvg()}
        <p class="arc-eyebrow">Tandil Tech Week 2026 · Arcade</p>
        <h3 class="arc-title">${px("Hackeá. Pitcheá.")}<br><em>${px("Ganá la semana.")}</em></h3>
        <button class="px-btn px-btn--big" data-coin>▶ Insert coin</button>
        <p class="arc-sub">Gratis. Sin registro. Tu récord queda en este dispositivo.</p>
      </div>`);
    const btn = stage.querySelector("[data-coin]");
    btn.addEventListener("click", () => show(session("ttw-arcade-booted") ? select : loading));
  }

  // 2) LOADING → PRESS START
  function loading() {
    html(`
      <div class="arc-center">
        ${coinSvg()}
        <div class="arc-loading">LOADING <div class="seg-bar"><i data-bar></i></div> <span data-pct>0%</span></div>
        <p class="arc-press" data-press hidden>Press start · any key or tap</p>
      </div>`);
    const bar = stage.querySelector("[data-bar]");
    const pct = stage.querySelector("[data-pct]");
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(10, p + 1);
      bar.style.setProperty("--p", p / 10);
      pct.textContent = `${p * 10}%`;
      if (p === 10) {
        clearInterval(t);
        stage.querySelector("[data-press]").hidden = false;
        say("Listo. Presioná cualquier tecla o tocá la pantalla.");
        root.focus({ preventScroll: true });
        const go = (e) => {
          if (e.type === "keydown" && ["Tab", "Shift", "Alt", "Meta", "Control"].includes(e.key)) return;
          session("ttw-arcade-booted", "1");
          unlock("first-coin");
          show(select);
        };
        root.addEventListener("keydown", go, { once: true });
        stage.addEventListener("pointerdown", go, { once: true });
        stopPress = () => { root.removeEventListener("keydown", go); stage.removeEventListener("pointerdown", go); };
      }
    }, 110);
    let stopPress = () => {};
    return () => { clearInterval(t); stopPress(); };
  }

  // 3) SELECT GAME
  function select() {
    hud();
    const card = (g, n) => `
      <article class="corner-card ${g.color === "blue" ? "corner-card--blue" : ""}">
        <div class="corner-card__top"><span class="corner-card__tag">${g.date}</span><span>[${n}]</span></div>
        <h3>${g.title}</h3>
        <p class="arc-sub">${g.pitch}</p>
        <p class="corner-card__best">Record <b>${pad6(state.best[g.id] || 0)}</b> · ${g.day}</p>
        <button class="px-btn ${g.color === "blue" ? "px-btn--info" : ""}" data-play="${g.id}">▶ Jugar</button>
      </article>`;
    html(`
      <div class="arc-select">
        <div class="arc-select__head">
          <p class="arc-eyebrow">Select game</p>
          <h3 class="arc-title">${px("Elegí tu jornada")}</h3>
        </div>
        <div class="arc-games">${card(GAMES.firewall, 1)}${card(GAMES.pitch, 2)}</div>
        <div class="arc-badges" aria-label="Logros">
          ${Object.entries(ACHIEVEMENTS).map(([id, name]) => `<span class="${state.ach.includes(id) ? "is-on" : ""}">${state.ach.includes(id) ? name : id === "konami" ? "???" : name}</span>`).join("")}
        </div>
      </div>`);
    stage.querySelectorAll("[data-play]").forEach((b) => b.addEventListener("click", () => show(() => play(b.dataset.play))));
    const keys = (e) => { if (e.key === "1") show(() => play("firewall")); if (e.key === "2") show(() => play("pitch")); };
    root.addEventListener("keydown", keys);
    return () => root.removeEventListener("keydown", keys);
  }

  function play(id) {
    return id === "firewall" ? firewall() : pitch();
  }

  // 4) GAME OVER
  function gameOver(game, { score, won }) {
    const prev = state.best[game.id] || 0;
    const record = score > prev;
    if (record) { state.best[game.id] = score; save(); if (prev > 0) unlock("new-record"); }
    if (won) unlock(game.achievement);
    hud({ score, level: won ? `${game.levels}/${game.levels}` : hudEl.level.textContent, lives: 0 });
    say(`${won ? "Ganaste" : "Game over"}. Puntaje ${score}.`);
    show(() => {
      html(`
        <div class="arc-center">
          <p class="arc-eyebrow">${won ? "Stage clear" : "Game over?"}</p>
          <h3 class="arc-title">${won ? (game.id === "firewall" ? "Access <em>granted</em>" : "Ronda <em>cerrada</em>") : "Continue?"}</h3>
          <p class="arc-score">${pad6(score)}</p>
          ${record ? `<p class="arc-record">★ Nuevo record ★</p>` : `<p class="arc-sub">Tu récord: ${pad6(prev)}</p>`}
          <div class="arc-actions">
            <button class="px-btn" data-retry>↻ Continue</button>
            <button class="px-btn px-btn--cream" data-share>Compartir</button>
            <button class="px-btn px-btn--ghost" data-menu>Otro juego</button>
          </div>
          <div class="arc-cta">
            <p>¿Te gustó? Viví el ${game.day} en persona · ${game.date}</p>
            <a class="px-btn px-btn--info" href="${game.register}" target="_blank" rel="noopener noreferrer">Inscribirme al ${game.day} →</a>
          </div>
        </div>`);
      stage.querySelector("[data-retry]").addEventListener("click", () => show(() => play(game.id)));
      stage.querySelector("[data-menu]").addEventListener("click", () => show(select));
      stage.querySelector("[data-share]").addEventListener("click", () => share(game, score));
      focusFirst();
    });
  }

  async function share(game, score) {
    const text = `Hice ${score} pts en ${game.title.toUpperCase()} 🕹️ el arcade de #TandilTechWeek (${game.day}, ${game.date}). ¿Me superás? @tandiltechweek`;
    const data = { title: "Tandil Tech Week · Arcade", text, url: `${SITE}/#arcade` };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(`${text} ${data.url}`);
      toast("Copiado", "Pegalo en tu story o en X");
    } catch (e) {
      if (e?.name !== "AbortError") toast("Ups", "No se pudo compartir");
    }
  }

  // ---------- G1 · FIREWALL BREACH ----------
  function firewall() {
    const game = GAMES.firewall;
    let level = 0, step = 0, lives = 3, score = 0, mode = coarse ? "choice" : "type";
    let current, deadline, total, raf, done = false;
    const PER_LEVEL = 3;
    const used = new Set();

    html(`
      <div class="term">
        <div class="term__window">
          <div class="term__bar"><span>root@ttw-ctf:~</span><span data-lvl></span></div>
          <div class="term__log" data-log aria-hidden="true"></div>
          <div class="term__task" data-task></div>
        </div>
        <div class="term__meta">
          <span>Tiempo</span>
          <div class="seg-bar seg-bar--wide"><i data-time></i></div>
          <button class="term__mode" data-mode></button>
        </div>
      </div>`);
    const log = stage.querySelector("[data-log]");
    const task = stage.querySelector("[data-task]");
    const time = stage.querySelector("[data-time]");
    const modeBtn = stage.querySelector("[data-mode]");
    const timeBar = time.parentElement;

    const line = (text, cls = "") => {
      const p = document.createElement("div");
      p.className = cls;
      p.textContent = text;
      log.append(p);
      while (log.children.length > 8) log.firstChild.remove();
    };
    const updateHud = () => hud({ score, level: `${level + 1}/${game.levels}`, lives });
    const secondsFor = (cmd) => Math.max(4.5, 3 + cmd.length * (0.55 - level * 0.06));

    modeBtn.addEventListener("click", () => { mode = mode === "type" ? "choice" : "type"; renderTask(); });

    function next() {
      const pool = COMMANDS[level].filter((c) => !used.has(c.cmd));
      current = pool[Math.floor(Math.random() * pool.length)];
      used.add(current.cmd);
      total = secondsFor(current.cmd) * (mode === "choice" ? 0.7 : 1) * 1000;
      deadline = performance.now() + total;
      renderTask();
      tick();
    }

    function renderTask() {
      modeBtn.textContent = mode === "type" ? "¿Desde el celu? Modo opciones" : "Modo tipear";
      stage.querySelector("[data-lvl]").textContent = `LVL ${level + 1} · ${LEVEL_NAMES[level]} · ${step + 1}/${PER_LEVEL}`;
      if (mode === "type") {
        task.innerHTML = `
          <p class="term__hint">› ${current.tip}</p>
          <p class="term__target" data-target></p>
          <label class="term__prompt"><span aria-hidden="true">$</span><span class="sr-only">Tipeá: ${current.cmd}</span>
            <input class="term__input" data-input autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="send"></label>`;
        const input = task.querySelector("[data-input]");
        const target = task.querySelector("[data-target]");
        const paint = () => {
          const v = input.value;
          let ok = 0;
          while (ok < v.length && v[ok] === current.cmd[ok]) ok++;
          const wrong = v.length > ok;
          target.innerHTML = `<span class="done">${esc(current.cmd.slice(0, ok))}</span>${wrong ? `<span class="err">${esc(current.cmd.slice(ok, ok + 1) || " ")}</span>${esc(current.cmd.slice(ok + 1))}` : esc(current.cmd.slice(ok))}`;
          if (v === current.cmd) hit();
        };
        input.addEventListener("input", paint);
        input.addEventListener("keydown", (e) => { if (e.key === "Enter" && input.value !== current.cmd) miss("Comando incorrecto"); });
        paint();
        input.focus({ preventScroll: true });
      } else {
        const others = COMMANDS[level].filter((c) => c.cmd !== current.cmd).sort(() => Math.random() - 0.5).slice(0, 2);
        const opts = [current, ...others].sort(() => Math.random() - 0.5);
        task.innerHTML = `
          <p class="term__hint">› ${current.tip}</p>
          <div class="term__choices">${opts.map((o, i) => `<button class="px-btn" data-opt="${esc(o.cmd)}">[${i + 1}] ${esc(o.cmd)}</button>`).join("")}</div>`;
        task.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => (b.dataset.opt === current.cmd ? hit() : miss("Ese no era"))));
      }
      say(`Nivel ${level + 1}. ${current.tip}`);
    }

    function tick() {
      cancelAnimationFrame(raf);
      const loop = (now) => {
        if (done) return;
        const left = Math.max(0, deadline - now);
        time.style.setProperty("--p", left / total);
        timeBar.classList.toggle("seg-bar--danger", left / total < 0.3);
        if (left <= 0) return miss("Timeout: el IDS te detectó");
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    function hit() {
      const left = Math.max(0, deadline - performance.now()) / 1000;
      const pts = 100 * (level + 1) + Math.ceil(left * 10);
      score += pts;
      line(`$ ${current.cmd}`, "ok");
      line(`[OK] +${pts}`, "gold");
      step++;
      if (step === PER_LEVEL) {
        step = 0;
        level++;
        if (level === game.levels) return end(true);
        line(`>> ACCESS LEVEL ${level + 1} GRANTED · ${LEVEL_NAMES[level]}`, "info");
        toast(`Level ${level + 1}/${game.levels}`, LEVEL_NAMES[level]);
      }
      updateHud();
      next();
    }

    function miss(reason) {
      lives--;
      line(`[ALERTA] ${reason}`, "bad");
      line(`tip: ${current.cmd} → ${current.tip}`, "info");
      stage.querySelector(".term__window").classList.remove("shake");
      void stage.offsetWidth;
      stage.querySelector(".term__window").classList.add("shake");
      updateHud();
      if (lives <= 0) return end(false);
      next();
    }

    function end(won) {
      done = true;
      cancelAnimationFrame(raf);
      if (won) score += lives * 500;
      setTimeout(() => gameOver(game, { score, won }), won ? 300 : 700);
    }

    const keys = (e) => {
      if (mode !== "choice" || !/^[1-3]$/.test(e.key)) return;
      task.querySelectorAll("[data-opt]")[+e.key - 1]?.click();
    };
    root.addEventListener("keydown", keys);
    // Pausa el reloj si la pestaña queda en segundo plano
    let pausedLeft = null;
    const onHidden = () => {
      if (done) return;
      if (document.hidden) { pausedLeft = deadline - performance.now(); cancelAnimationFrame(raf); }
      else if (pausedLeft !== null) { deadline = performance.now() + pausedLeft; pausedLeft = null; tick(); }
    };
    document.addEventListener("visibilitychange", onHidden);

    line("Conectado a ttw-ctf (servidor de práctica)", "info");
    line("Objetivo: llegar a la flag en 5 niveles", "info");
    updateHud();
    next();
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      root.removeEventListener("keydown", keys);
      document.removeEventListener("visibilitychange", onHidden);
    };
  }

  // ---------- G2 · PITCH PERFECT ----------
  function pitch() {
    const game = GAMES.pitch;
    const MIN = 3, MAX = 8;
    let seq = [], input = 0, lives = 3, score = 0, accepting = false, startedAt = 0, alive = true;
    const timers = new Set();
    const wait = (ms) => new Promise((r) => { const t = setTimeout(() => { timers.delete(t); r(); }, ms); timers.add(t); });

    html(`
      <div class="pitch">
        <div class="pitch__status">
          <p class="arc-eyebrow" data-round></p>
          <p class="arc-sub" data-msg></p>
        </div>
        <div class="pitch__pads">
          ${PITCH_PADS.map((p, i) => `<button class="pad pad--${i + 1}" data-pad="${i}" disabled>${px(p.label)}<small>[${p.key}] ${p.hint}</small></button>`).join("")}
        </div>
        <div class="pitch__progress" data-progress aria-hidden="true"></div>
      </div>`);
    const pads = [...stage.querySelectorAll("[data-pad]")];
    const msg = stage.querySelector("[data-msg]");
    const roundEl = stage.querySelector("[data-round]");
    const progress = stage.querySelector("[data-progress]");

    const round = () => seq.length - MIN; // 0..5
    const updateHud = () => hud({ score, level: `${round() + 1}/${game.levels}`, lives });
    const setPads = (on) => { accepting = on; pads.forEach((p) => (p.disabled = !on)); };
    const paintProgress = () => { progress.innerHTML = seq.map((_, i) => `<i class="${i < input ? "is-on" : ""}"></i>`).join(""); };

    async function flash(i, ms) {
      pads[i].classList.add("is-lit");
      await wait(ms);
      pads[i].classList.remove("is-lit");
    }

    async function playSequence() {
      setPads(false);
      input = 0;
      paintProgress();
      roundEl.textContent = px(`Ronda ${PITCH_ROUNDS[round()]} · ${seq.length} slides`);
      msg.textContent = "El jurado VC mira tu deck… memorizá el orden.";
      say(`Ronda ${round() + 1}. Memorizá ${seq.length} slides.`);
      await wait(700);
      const speed = Math.max(260, 520 - round() * 45);
      for (const i of seq) {
        if (!alive) return;
        await flash(i, speed);
        await wait(140);
      }
      if (!alive) return;
      msg.textContent = "¡Tu turno! Repetí el pitch.";
      say("Tu turno.");
      startedAt = performance.now();
      setPads(true);
      pads[0].focus({ preventScroll: true });
    }

    async function press(i) {
      if (!accepting) return;
      flash(i, 160);
      if (i !== seq[input]) {
        setPads(false);
        lives--;
        updateHud();
        msg.textContent = `"${PITCH_PADS[i].label}" no iba ahí. El jurado frunce el ceño…`;
        if (lives <= 0) return end(false);
        await wait(900);
        return playSequence();
      }
      input++;
      paintProgress();
      if (input < seq.length) return;
      setPads(false);
      const secs = (performance.now() - startedAt) / 1000;
      const bonus = Math.max(0, Math.round((seq.length * 1.2 - secs) * 40));
      const pts = 150 * seq.length + bonus;
      score += pts;
      msg.textContent = `¡Pitch impecable! +${pts}`;
      if (seq.length === MAX) return end(true);
      toast(`Ronda superada`, `${PITCH_ROUNDS[round()]} → ${PITCH_ROUNDS[round() + 1]}`);
      seq.push(rand());
      updateHud();
      await wait(800);
      playSequence();
    }

    function end(won) {
      alive = false;
      setPads(false);
      if (won) score += lives * 500;
      setTimeout(() => gameOver(game, { score, won }), 700);
    }

    const rand = () => Math.floor(Math.random() * PITCH_PADS.length);
    pads.forEach((p) => p.addEventListener("click", () => press(+p.dataset.pad)));
    const keys = (e) => { const i = PITCH_PADS.findIndex((p) => p.key === e.key); if (i >= 0) { e.preventDefault(); press(i); } };
    root.addEventListener("keydown", keys);

    seq = Array.from({ length: MIN }, rand);
    updateHud();
    playSequence();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      root.removeEventListener("keydown", keys);
    };
  }

  // ---------- Easter egg: Konami code ----------
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kIdx = 0;
  document.addEventListener("keydown", (e) => {
    kIdx = e.key === KONAMI[kIdx] ? kIdx + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (kIdx === KONAMI.length) {
      kIdx = 0;
      root.classList.toggle("is-cheat");
      unlock("konami");
      root.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    }
  });

  show(attract);
}

// Press Start 2P dibuja mal las mayúsculas acentuadas: las quitamos solo en textos con esa fuente.
function px(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function esc(s) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function coinSvg() {
  // Moneda pixel 8×8
  const px = ["..XXXX..", ".XYYYYX.", "XYYXXYYX", "XYYXYYYX", "XYYXYYYX", "XYYXXYYX", ".XYYYYX.", "..XXXX.."];
  const rects = px.flatMap((row, y) => [...row].map((c, x) => (c === "." ? "" : `<rect x="${x}" y="${y}" width="1" height="1" fill="${c === "X" ? "#0f0f1e" : "#ffc93c"}"/>`))).join("");
  return `<svg class="arc-coin" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}
