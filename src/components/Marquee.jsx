import { useLang } from '../context/LangContext'
import './Marquee.css'

export function Marquee() {
  const { t } = useLang()

  const items = [
    t.services.dev.title,
    t.services.consult.title,
    t.services.design.title,
  ]

  const sequence = (
    <>
      {items.map(item => (
        <span key={item} className="marquee__item">
          <span className="marquee__text">{item}</span>
          <span className="marquee__sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {sequence}{sequence}{sequence}{sequence}
      </div>
    </div>
  )
}
