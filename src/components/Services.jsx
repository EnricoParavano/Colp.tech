import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Code, Buildings, PenNib, ArrowRight } from '@phosphor-icons/react'
import { useLang } from '../context/LangContext'
import './Services.css'

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ServiceDetail({ service, icon: Icon, accent, cta }) {
  return (
    <motion.div
      className="service-detail__content"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`service-detail__icon service-detail__icon--${accent}`}>
        <Icon size={26} weight="bold" />
      </div>
      <p className="service-detail__desc">{service.desc}</p>
      <div className="service-detail__tags">
        {service.tags.map(tag => (
          <span key={tag} className="service-detail__tag">{tag}</span>
        ))}
      </div>
      <a href="#contatti" className="service-detail__cta">
        {cta} <ArrowRight size={15} weight="bold" />
      </a>
    </motion.div>
  )
}

export function Services() {
  const { t, lang } = useLang()
  const [active, setActive] = useState(0)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })
  const listInView = useInView(listRef, { once: true, margin: '-60px' })

  const cta = lang === 'it' ? 'Parliamone' : 'Let\'s talk'

  const services = [
    { key: 'dev',     icon: Code,      data: t.services.dev },
    { key: 'consult', icon: Buildings, data: t.services.consult },
    { key: 'design',  icon: PenNib,    data: t.services.design },
  ]

  const activeService = services[active]
  const [titleLine1, titleLine2] = t.services.title.split('\n')

  return (
    <section className="section services" id="servizi">
      {/* Blueprint grid — same language as hero */}
      <div className="services__grid-bg" aria-hidden="true" />

      {/* Crosshair markers */}
      <div className="services__markers container" aria-hidden="true">
        <span className="services__marker" style={{ top: '8%', right: '8%' }}>+</span>
        <span className="services__marker" style={{ top: '34%', left: '46%' }}>+</span>
        <span className="services__marker" style={{ bottom: '12%', left: '3%' }}>+</span>
      </div>

      <div className="container">
        <motion.div
          ref={headerRef}
          className="services__header"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <p className="section-label section-label--dot">
            <span className="label-dot" />
            {t.services.label}
            <span className="label-meta mono">SRV. 01–03</span>
          </p>
          <h2 className="section-title title-rows">
            <span className="title-row">{titleLine1}</span>
            <span className={`title-row title-row--accent ${headerInView ? 'title-row--filled' : ''}`}>
              {titleLine2}
            </span>
          </h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </motion.div>

        <div ref={listRef} className="services-split">
          {/* Index — left */}
          <div className="services-split__index" role="tablist" aria-orientation="vertical">
            {services.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 24 }}
                animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  role="tab"
                  aria-selected={active === i}
                  className={`service-row ${active === i ? 'service-row--active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="service-row__num">0{i + 1}</span>
                  <span className="service-row__title">{s.data.title}</span>
                  <span className="service-row__arrow">
                    <ArrowRight size={22} weight="bold" />
                  </span>
                </button>

                {/* Inline detail — mobile only */}
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      className="service-row__inline"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="service-row__inline-pad">
                        <p className="service-detail__desc">{s.data.desc}</p>
                        <div className="service-detail__tags">
                          {s.data.tags.map(tag => (
                            <span key={tag} className="service-detail__tag">{tag}</span>
                          ))}
                        </div>
                        <a href="#contatti" className="service-detail__cta">
                          {cta} <ArrowRight size={15} weight="bold" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Detail panel — right, desktop */}
          <motion.div
            className="service-detail"
            initial={{ opacity: 0, y: 24 }}
            animate={listInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg className="service-detail__hex" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <path d="M50 4 L89.5 27 L89.5 73 L50 96 L10.5 73 L10.5 27 Z" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <span className="service-detail__corner mono" aria-hidden="true">+</span>
            <div className="service-detail__meta mono">
              <span className="service-detail__meta-index">0{active + 1} / 03</span>
              <span className="service-detail__meta-key">{activeService.key}</span>
            </div>
            <AnimatePresence mode="wait">
              <ServiceDetail
                key={activeService.key}
                service={activeService.data}
                icon={activeService.icon}
                accent={activeService.key}
                cta={cta}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
