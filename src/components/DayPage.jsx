import { days } from '../data'

export function DayPage({ day }) {
  const other = days.find((item) => item.id !== day.id)

  return (
    <article className="day-page" data-accent={day.accent}>
      <p className="slot">Save {day.slot}</p>
      <p className="eyebrow">{day.date}</p>
      <h1>{day.title}</h1>
      <p className="tagline">{day.description}</p>
      <dl className="stat-sheet">
        <div>
          <dt>Fecha</dt>
          <dd>{day.date}</dd>
        </div>
        <div>
          <dt>Sede</dt>
          <dd>{day.venue}</dd>
        </div>
        <div>
          <dt>Track</dt>
          <dd>{day.track}</dd>
        </div>
      </dl>
      <div className="btn-row">
        <a className="btn btn-coin" href="/#inscripciones">
          Insert coin
        </a>
        <a className={`btn btn-${other.accent}`} href={other.url}>
          {other.title}
        </a>
      </div>
    </article>
  )
}
