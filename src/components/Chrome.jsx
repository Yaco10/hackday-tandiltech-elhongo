import { useEffect, useState } from 'react'
import { cabinetLevel, event, nav, social } from '../data'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  return hash
}

function isCurrent(href, path, hash) {
  const url = new URL(href, window.location.origin)
  if (url.pathname === '/' && url.hash) return path === '/' && hash === url.hash
  if (url.pathname === '/') return path === '/' && hash === ''
  return path === url.pathname
}

export function Frame() {
  return (
    <>
      <div className="frame" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}

export function Boot({ onStart }) {
  useEffect(() => {
    const onKey = () => onStart()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onStart])

  return (
    <button className="boot" onClick={onStart}>
      <span className="boot-kicker">SCORE 2026</span>
      <span className="boot-title">
        Tandil
        <br />
        Tech Week
      </span>
      <span className="boot-date">{event.dates}</span>
      <span className="boot-where">{event.location}</span>
      <span className="boot-start">
        <i className="tri blink" aria-hidden="true" /> PRESS START
      </span>
    </button>
  )
}

export function Header() {
  const level = cabinetLevel()
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const hash = useHash()

  return (
    <header className="hud">
      <div className="hud-top">
        <p className="hud-stat">
          <span>Score</span>
          <strong>2026</strong>
        </p>
        <a className="hud-brand" href="/">
          Tandil Tech Week
        </a>
        <p className="hud-stat hud-level">
          <span>Level</span>
          <strong>{level.n}</strong>
        </p>
      </div>
      <p className="hud-now">{level.name}</p>
      <nav className="nav" aria-label="Secciones">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item.href, path, hash) ? 'page' : undefined}
            onClick={(event) => {
              const id = item.href.split('#')[1]
              if (!id || path !== '/') return
              const target = document.getElementById(id)
              if (!target) return
              event.preventDefault()
              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              history.pushState(null, '', `/#${id}`)
              window.dispatchEvent(new HashChangeEvent('hashchange'))
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name">{event.name}</p>
      <p className="footer-meta">
        {event.dates} · {event.location}
      </p>
      <nav className="footer-social" aria-label="Redes sociales">
        <a href={social.instagram} target="_blank" rel="noreferrer">
          Instagram {social.handle}
        </a>
        <a href={social.x} target="_blank" rel="noreferrer">
          X {social.handle}
        </a>
      </nav>
    </footer>
  )
}
