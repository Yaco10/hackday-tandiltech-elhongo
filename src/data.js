export const event = {
  name: 'Tandil Tech Week',
  dates: '14 & 15 octubre 2026',
  location: 'Tandil, Argentina',
  tagline: 'Un encuentro para construir lo que viene',
  hashtags: [
    'UNICEN CAMPUS',
    'DISTRITO AVELLANEDA',
    'HACKING DAY',
    'CIBERSEGURIDAD',
    'STARTUP DAY',
    'AGRITECH & BIO',
    'SOFTWARE & AI',
    'VENTURE CAPITAL',
    'POLO CIENTÍFICO',
    'FOUNDERS & BUILDERS',
  ],
}

export const days = [
  {
    id: 'hacking-day',
    date: '14 Octubre',
    venue: 'Campus Universitario UNICEN',
    track: 'Ciberseguridad',
    title: 'Hacking Day',
    description:
      'Jornada de hacking en equipos. Juntá a tus amigos y vení a divertirte aprendiendo de ciberseguridad.',
    url: '/hacking-day',
    accent: 'hacking',
    slot: '01',
  },
  {
    id: 'startup-day',
    date: '15 Octubre',
    venue: 'Distrito Avellaneda',
    track: 'Startups',
    title: 'Startup Day',
    description:
      'Vení a conocer a los que hacen. Charlas dinámicas y networking entre fundadores, venture capital y estudiantes.',
    url: '/startup-day',
    accent: 'startup',
    slot: '02',
  },
]

export const organizers = [
  {
    name: 'Picante',
    type: 'VC Fund',
    url: 'https://picante.fund',
    desc: 'Acompañan desde el principio a la nueva generación de founders latinoamericanos: AI Natives construyendo productos globales.',
    category: 'Venture Capital',
  },
  {
    name: 'Relaw',
    type: 'Venture Legal',
    url: 'https://relaw.io',
    desc: 'El partner legal de startups y empresas de tecnología. Expertise legal y visión de negocio, con acompañamiento 360°.',
    category: 'Legal Tech',
  },
  {
    name: 'Paisanos',
    type: 'Product Studio',
    url: 'https://paisanos.io',
    desc: 'Estudio global de diseño y desarrollo de productos digitales, acompañando a startups y corporates.',
    category: 'Product & Tech',
  },
  {
    name: 'HackTandil',
    type: 'Community',
    url: 'https://hacktandil.org',
    desc: 'Comunidad tecnológica de Tandil que conecta desarrolladores, estudiantes, emprendedores y entusiastas.',
    category: 'Builder Community',
  },
  {
    name: 'Geonosis',
    type: 'Tech Partner',
    url: 'https://geonosisgroup.com',
    desc: 'El brazo tecnológico de startups y empresas, desde la idea hasta el scale-up.',
    category: 'Idea to Scale',
  },
  {
    name: 'Fardo',
    type: 'Brand Intelligence',
    url: 'https://heyfardo.com',
    desc: 'Primera plataforma de brand intelligence de Latam. Miden cómo aparece tu marca en ChatGPT, Gemini, Perplexity y Claude.',
    category: 'AI Visibility',
  },
]

export const sponsors = [
  { name: 'Grupo Rotonda', url: 'https://gruporotonda.com.ar' },
  { name: 'The Red Guild', url: 'https://theredguild.org' },
  { name: 'Payoneer', url: 'https://www.payoneer.com' },
]

export const inscriptions = {
  opens: '2026-09-17T19:00:00-03:00',
  timezone: 'GMT-3',
  countdown: true,
  cta: 'Construyamos juntos lo que viene',
}

export const social = {
  instagram: 'https://instagram.com/tandiltechweek',
  x: 'https://x.com/tandiltechweek',
  handle: '@tandiltechweek',
}

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#speakers', label: 'Speakers' },
  { href: '/#organizan', label: 'Organizan' },
  { href: '/#acompanan', label: 'Acompañan' },
  { href: '/hacking-day', label: 'Hacking Day' },
  { href: '/startup-day', label: 'Startup Day' },
]

export function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function cabinetLevel(now = Date.now()) {
  const hacking = new Date('2026-10-14T00:00:00-03:00').getTime()
  const startup = new Date('2026-10-15T00:00:00-03:00').getTime()
  const end = new Date('2026-10-16T00:00:00-03:00').getTime()
  if (now < hacking) return { n: '00', name: '14 & 15 OCT' }
  if (now < startup) return { n: '01', name: 'HACKING DAY' }
  if (now < end) return { n: '02', name: 'STARTUP DAY' }
  return { n: '--', name: 'TANDIL' }
}
