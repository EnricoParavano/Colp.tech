import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LangContext'
import './About.css'

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

const valueVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function About() {
  const { t } = useLang()
  const headerRef = useRef(null)
  const valuesRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-40px' })

  const [titleLine1, titleLine2] = t.about.title.split('\n')

  return (
    <section className="section about" id="about">
      {/* Blueprint grid + markers */}
      <div className="about__grid-bg" aria-hidden="true" />
      <div className="about__markers container" aria-hidden="true">
        <span className="about__marker" style={{ top: '9%', left: '44%' }}>+</span>
        <span className="about__marker" style={{ top: '30%', right: '6%' }}>+</span>
        <span className="about__marker" style={{ bottom: '14%', left: '5%' }}>+</span>
      </div>

      <motion.div
        className="about__year-bg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        {t.about.founded}
      </motion.div>

      <div className="container about__inner">
        <motion.div
          ref={headerRef}
          className="about__header"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <p className="section-label section-label--dot">
            <span className="label-dot" />
            {t.about.label}
            <span className="label-meta mono">EST. {t.about.founded}</span>
          </p>
          <h2 className="section-title title-rows">
            <span className="title-row">{titleLine1}</span>
            <span className={`title-row title-row--accent ${headerInView ? 'title-row--filled' : ''}`}>
              {titleLine2}
            </span>
          </h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </motion.div>

        <div ref={valuesRef} className="about__values">
          {t.about.values.map((value, i) => (
            <motion.div
              key={value.number}
              className="about__value"
              custom={i}
              variants={valueVariants}
              initial="hidden"
              animate={valuesInView ? 'visible' : 'hidden'}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              <span className="about__value-num">{value.number}</span>
              <div className="about__value-content">
                <h3 className="about__value-title">{value.title}</h3>
                <p className="about__value-desc">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
