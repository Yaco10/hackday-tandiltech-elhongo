import { useEffect, useState } from 'react'
import { days, event, hostOf, inscriptions, organizers, sponsors } from '../data'

function pad(n) {
  return String(n).padStart(2, '0')
}

function useCountdown(iso) {
  const target = new Date(iso).getTime()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const total = Math.floor(diff / 1000)
  const daysLeft = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  return {
    done: diff <= 0,
    parts: [
      [pad(daysLeft), 'DD'],
      [pad(hours), 'HH'],
      [pad(minutes), 'MM'],
      [pad(seconds), 'SS'],
    ],
  }
}

function opensLabel(iso, timezone) {
  const formatted = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(iso))
  return `${formatted} ${timezone}`
}

export function Home() {
  const countdown = useCountdown(inscriptions.opens)

  return (
    <>
      <section className="hero">
        <p className="eyebrow">{event.dates}</p>
        <h1 className="hero-title">
          <span>Tandil</span>
          <span>Tech Week</span>
        </h1>
        <p className="where">{event.location}</p>
        <p className="tagline">{event.tagline}</p>
        <a className="btn btn-coin" href="#inscripciones">
          <i className="tri blink" aria-hidden="true" /> Insert coin
        </a>
        <ul className="hero-days">
          {days.map((day) => (
            <li key={day.id} data-accent={day.accent}>
              <a href={day.url}>
                <span className="hero-day-title">{day.title}</span>
                <span className="hero-day-meta">
                  {day.date} · {day.venue}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="marquee" aria-label={event.hashtags.join(', ')}>
        <ul className="marquee-track">
          {[...event.hashtags, ...event.hashtags].map((tag, index) => (
            <li key={`${tag}-${index}`} aria-hidden={index >= event.hashtags.length}>
              <i className="px" aria-hidden="true" />
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <section className="block" id="agenda" aria-labelledby="agenda-title">
        <h2 id="agenda-title">Agenda</h2>
        <div className="grid-2">
          {days.map((day) => (
            <a key={day.id} className="card day-card" data-accent={day.accent} href={day.url}>
              <p className="slot">Save {day.slot}</p>
              <p className="track">{day.track}</p>
              <h3>{day.title}</h3>
              <p className="meta">{day.date}</p>
              <p className="meta">{day.venue}</p>
              <p className="desc">{day.description}</p>
              <span className="enter">Select</span>
            </a>
          ))}
        </div>
      </section>

      <section className="block" id="speakers" aria-labelledby="speakers-title">
        <h2 id="speakers-title">Speakers</h2>
        <div className="card mystery">
          <p className="mystery-mark">???</p>
          <p className="mystery-label">Coming soon</p>
        </div>
      </section>

      <section className="block" id="organizan" aria-labelledby="organizan-title">
        <h2 id="organizan-title">Organizan</h2>
        <div className="grid-3">
          {organizers.map((org) => (
            <a
              key={org.name}
              className="card org-card"
              href={org.url}
              target="_blank"
              rel="noreferrer"
            >
              <p className="track">{org.type}</p>
              <h3>{org.name}</h3>
              <p className="host">{hostOf(org.url)}</p>
              <p className="desc">{org.desc}</p>
              <p className="category">{org.category}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="block" id="acompanan" aria-labelledby="acompanan-title">
        <h2 id="acompanan-title">Acompañan</h2>
        <div className="grid-3">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              className="card sponsor-card"
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{sponsor.name}</h3>
              <p className="host">{hostOf(sponsor.url)}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="block insert" id="inscripciones" aria-labelledby="insert-title">
        <p className="eyebrow">{countdown.done ? 'Insert coin' : 'Insert coin in'}</p>
        {inscriptions.countdown && !countdown.done && (
          <div className="timer" aria-live="polite">
            {countdown.parts.map(([value, unit]) => (
              <span key={unit}>
                <strong>{value}</strong>
                <small>{unit}</small>
              </span>
            ))}
          </div>
        )}
        <h2 id="insert-title">{inscriptions.cta}</h2>
        <p className="opens">Apertura · {opensLabel(inscriptions.opens, inscriptions.timezone)}</p>
        <div className="btn-row">
          {days.map((day) => (
            <a key={day.id} className={`btn btn-${day.accent}`} href={day.url}>
              {day.title}
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
