import { useLang } from '../context/LangContext'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  const { t } = useLang()

  const sections = ['#servizi', '#progetti', '#about', '#contatti']

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo height={20} />
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <nav className="footer__nav">
          {t.footer.links.map((link, i) => (
            <a key={link} href={sections[i]} className="footer__link">
              {link}
            </a>
          ))}
        </nav>

        <p className="footer__copy">{t.footer.copy}</p>
      </div>
    </footer>
  )
}
