// Contenido del evento (relevado de tandiltechweek.com) y de los juegos.

export const SITE = "https://tandiltechweek.com";

export const ORGANIZAN = [
  { name: "Picante", url: "https://picante.fund", label: "VC Fund" },
  { name: "Relaw", url: "https://relaw.io", label: "Venture Legal" },
  { name: "Paisanos", url: "https://paisanos.io", label: "Product Studio" },
  { name: "HackTandil", url: "https://hacktandil.org", label: "Community" },
  { name: "Geonosis", url: "https://geonosisgroup.com", label: "Tech Partner" },
  { name: "Fardo", url: "https://heyfardo.com", label: "Brand Intelligence" },
];

export const ACOMPANAN = [
  { name: "Grupo Rotonda", url: "https://gruporotonda.com.ar" },
  { name: "The Red Guild", url: "https://theredguild.org" },
  { name: "Payoneer", url: "https://www.payoneer.com" },
];

export const GAMES = {
  firewall: {
    id: "firewall",
    title: "Firewall Breach",
    day: "Hacking Day",
    date: "14 OCT · UNICEN",
    dateISO: "2026-10-14",
    color: "blue",
    pitch: "Tipeá los comandos antes de que el IDS te detecte. 5 niveles, 3 vidas.",
    register: "https://luma.com/8dy1oypg",
    dayUrl: `${SITE}/hacking-day`,
    levels: 5,
    achievement: "hacker",
  },
  pitch: {
    id: "pitch",
    title: "Pitch Perfect",
    day: "Startup Day",
    date: "15 OCT · DISTRITO AVELLANEDA",
    dateISO: "2026-10-15",
    color: "green",
    pitch: "Repetí la secuencia de tu pitch frente al jurado VC. Llegá a 8 slides y cerrá tu ronda.",
    register: "https://luma.com/esg42kt8",
    dayUrl: `${SITE}/startup-day`,
    levels: 6,
    achievement: "founder",
  },
};

export const ACHIEVEMENTS = {
  "first-coin": "Player 1 ready",
  hacker: "Root access · Hacking Day",
  founder: "Series A · Startup Day",
  "full-week": "Full week completada",
  "new-record": "Nuevo récord",
  konami: "Cheat code activado",
};

// Comandos reales e inocuos, con una línea de explicación (sirve de pista y de contenido educativo).
export const COMMANDS = [
  // nivel 1 · recon
  [
    { cmd: "whoami", tip: "Mostrá con qué usuario estás logueado." },
    { cmd: "pwd", tip: "Mostrá en qué directorio estás parado." },
    { cmd: "ls -la", tip: "Listá todos los archivos, incluso los ocultos." },
    { cmd: "id", tip: "Mostrá tu UID y los grupos a los que pertenecés." },
    { cmd: "uname -a", tip: "Averiguá qué kernel y sistema corre el server." },
  ],
  // nivel 2 · scan
  [
    { cmd: "nmap -sV 10.0.0.5", tip: "Escaneá puertos y versiones de servicios del target." },
    { cmd: "ping -c 3 10.0.0.5", tip: "Comprobá si el host responde (3 paquetes)." },
    { cmd: "dig unicen.edu.ar", tip: "Consultá los registros DNS de un dominio." },
    { cmd: "curl -I tandiltechweek.com", tip: "Pedí solo los headers HTTP de un sitio." },
    { cmd: "ss -tulpn", tip: "Listá los puertos que están escuchando." },
  ],
  // nivel 3 · access
  [
    { cmd: "ssh guest@10.0.0.5", tip: "Conectate por SSH al target con el usuario guest." },
    { cmd: "sudo -l", tip: "Mirá qué comandos podés correr como root." },
    { cmd: "cat /etc/passwd", tip: "Leé la lista de usuarios del sistema." },
    { cmd: "ps aux | grep root", tip: "Buscá procesos que corren como root." },
    { cmd: "history | tail -5", tip: "Mirá los últimos 5 comandos ejecutados." },
  ],
  // nivel 4 · escalate
  [
    { cmd: "find / -perm -4000 2>/dev/null", tip: "Buscá binarios SUID para escalar privilegios." },
    { cmd: "grep -ri password /var/www", tip: "Buscá contraseñas olvidadas en el código web." },
    { cmd: "chmod +x exploit.sh", tip: "Dale permiso de ejecución a tu script." },
    { cmd: "base64 -d secret.b64", tip: "Decodificá un archivo en base64." },
    { cmd: "crontab -l", tip: "Revisá las tareas programadas del usuario." },
  ],
  // nivel 5 · exfil
  [
    { cmd: "tail -f /var/log/auth.log", tip: "Seguí en vivo los intentos de login." },
    { cmd: "sha256sum flag.txt", tip: "Calculá el hash de la flag para verificarla." },
    { cmd: "tar czf loot.tgz /tmp/flag", tip: "Comprimí la flag en un .tgz." },
    { cmd: "scp loot.tgz me@10.0.0.9:", tip: "Copiá el archivo a tu máquina por SSH." },
    { cmd: "echo TTW{h4ck_t4nd1l} > flag", tip: "Escribí la flag ganadora en un archivo." },
  ],
];

export const LEVEL_NAMES = ["RECON", "SCAN", "ACCESS", "ESCALATE", "EXFIL"];

export const PITCH_PADS = [
  { key: "1", label: "Problema", hint: "el dolor" },
  { key: "2", label: "Solución", hint: "tu producto" },
  { key: "3", label: "Mercado", hint: "TAM · SAM" },
  { key: "4", label: "Tracción", hint: "métricas" },
  { key: "5", label: "Equipo", hint: "founders" },
  { key: "6", label: "Ask", hint: "la ronda" },
];

export const PITCH_ROUNDS = ["Pre-seed", "Seed", "Seed+", "Series A", "Series A+", "Series A ✓"];
