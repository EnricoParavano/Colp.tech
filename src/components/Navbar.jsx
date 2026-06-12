import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { Logo } from './Logo'
import './Navbar.css'

export function Navbar() {
  const { t, toggle, lang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t.nav.services, href: '#servizi' },
    { label: t.nav.projects, href: '#progetti' },
    { label: t.nav.about,    href: '#about' },
  ]

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo" aria-label="Colp">
          <Logo height={24} />
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <NavLink key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <motion.button
            className="navbar__lang"
            onClick={toggle}
            aria-label="Toggle language"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {lang === 'it' ? 'EN' : 'IT'}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.a
            href="#contatti"
            className="btn-primary navbar__cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {t.nav.contact}
          </motion.a>

          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({ href, children, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      className="navbar__link"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        className="navbar__link-underline"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  )
}
