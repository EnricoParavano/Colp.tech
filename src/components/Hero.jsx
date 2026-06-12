import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowDown } from '@phosphor-icons/react'
import { useLang } from '../context/LangContext'
import { Marquee } from './Marquee'
import './Hero.css'

function LineReveal({ text, delay = 0, started }) {
  const words = text.split(' ')
  return (
    <span className="line-reveal">
      {words.map((w, i) => (
        <span key={i} className="line-reveal__clip">
          <motion.span
            className="line-reveal__word"
            initial={{ y: '115%', rotate: 2.5 }}
            animate={started ? { y: '0%', rotate: 0 } : { y: '115%', rotate: 2.5 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function AnimatedCounter({ to, duration = 1.8, delay = 0, enabled }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || !enabled) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / 1000 / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(to)
    }
    const timeout = setTimeout(() => requestAnimationFrame(step), delay * 1000)
    return () => clearTimeout(timeout)
  }, [inView, enabled, to, duration, delay])

  return <span ref={ref}>{count}</span>
}

export function Hero({ started = true }) {
  const { t, lang } = useLang()
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -80])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3])
  const hexY = useTransform(scrollY, [0, 800], [0, 140])

  const metrics = [
    { num: 40, suffix: '+', label: lang === 'it' ? 'Progetti completati' : 'Projects delivered' },
    { num: 6,  suffix: '+', label: lang === 'it' ? 'Anni di attività' : 'Years active' },
    { num: 28, suffix: '+', label: lang === 'it' ? 'Clienti attivi' : 'Active clients' },
  ]

  return (
    <section className="hero" id="home">
      {/* Blueprint engineering grid */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Crosshair markers */}
      <div className="hero__markers container" aria-hidden="true">
        <span className="hero__marker" style={{ top: '18%', left: '4%' }}>+</span>
        <span className="hero__marker" style={{ top: '12%', right: '22%' }}>+</span>
        <span className="hero__marker" style={{ bottom: '30%', left: '38%' }}>+</span>
        <span className="hero__marker" style={{ bottom: '22%', right: '6%' }}>+</span>
      </div>

      {/* Giant rotating brand hexagon */}
      <motion.div className="hero__hex-wrap" style={{ y: hexY }} aria-hidden="true">
        <motion.svg
          className="hero__hex hero__hex--outer"
          viewBox="0 0 100 100"
          fill="none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <path d="M50 2 L91.5 26 L91.5 74 L50 98 L8.5 74 L8.5 26 Z" stroke="currentColor" strokeWidth="0.7" />
        </motion.svg>
        <motion.svg
          className="hero__hex hero__hex--inner"
          viewBox="0 0 100 100"
          fill="none"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
        >
          <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
        </motion.svg>
      </motion.div>

      <motion.div className="container hero__inner" style={{ y: contentY, opacity }}>
        <motion.p
          className="hero__label"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="hero__label-dot" />
          {t.hero.label} — Friuli Venezia Giulia
          <span className="hero__label-coord mono">46.0711° N, 13.2346° E</span>
        </motion.p>

        <h1 className="hero__headline">
          <span className="hero__headline-row">
            <LineReveal text={t.hero.headline1} delay={0.25} started={started} />
          </span>
          <span className={`hero__headline-row hero__headline-row--accent ${started ? 'hero__headline-row--filled' : ''}`}>
            <LineReveal text={t.hero.headline2} delay={0.55} started={started} />
          </span>
        </h1>

        <div className="hero__bottom">
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#servizi" className="btn-primary">{t.hero.cta1}</a>
            <a href="#progetti" className="btn-ghost">{t.hero.cta2}</a>
          </motion.div>
        </div>

        <motion.div
          className="hero__metrics"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="hero__metric">
              <span className="hero__metric-num">
                <AnimatedCounter to={m.num} delay={1.4 + i * 0.15} enabled={started} />{m.suffix}
              </span>
              <span className="hero__metric-label">{m.label}</span>
            </div>
          ))}
          <motion.a
            href="#servizi"
            className="hero__scroll-cue"
            aria-label="Scroll"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} weight="bold" />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <Marquee />
      </motion.div>
    </section>
  )
}
