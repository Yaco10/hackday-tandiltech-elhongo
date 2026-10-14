import { useEffect, useState } from 'react'
import { days, event } from './data'
import { Boot, Footer, Frame, Header } from './components/Chrome'
import { DayPage } from './components/DayPage'
import { Home } from './components/Home'

function currentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function Lost() {
  return (
    <section className="lost">
      <p className="eyebrow">404</p>
      <h1>Game over</h1>
      <p className="tagline">Esa pantalla no existe.</p>
      <a className="btn btn-coin" href="/">
        Continue
      </a>
    </section>
  )
}

export function App() {
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('ttw-boot') === '1'
    } catch {
      return true
    }
  })

  const path = currentPath()
  const day = days.find((item) => item.url === path)

  useEffect(() => {
    if (path === '/') document.title = `${event.name} · ${event.dates}`
    else if (day) document.title = `${day.title} · ${event.name}`
    else document.title = `Game over · ${event.name}`
    window.scrollTo(0, 0)
  }, [path, day])

  function start() {
    try {
      sessionStorage.setItem('ttw-boot', '1')
    } catch {
      /* ignore */
    }
    setBooted(true)
  }

  return (
    <>
      <Frame />
      {!booted && <Boot onStart={start} />}
      <div className="screen" inert={!booted} aria-hidden={!booted}>
        <Header />
        <main>
          {path === '/' && <Home />}
          {day && <DayPage day={day} />}
          {path !== '/' && !day && <Lost />}
        </main>
        <Footer />
      </div>
    </>
  )
}
