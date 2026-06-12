import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { useLang } from '../context/LangContext'
import './Contact.css'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const MAX_MESSAGE = 600

function Field({ num, id, label, filled, area = false, children }) {
  return (
    <div className={`cfield ${area ? 'cfield--area' : ''} ${filled ? 'cfield--filled' : ''}`}>
      <span className="cfield__num mono">{num}</span>
      <div className="cfield__box">
        <label className="cfield__label" htmlFor={id}>{label}</label>
        {children}
        <span className="cfield__line" aria-hidden="true" />
      </div>
    </div>
  )
}

export function Contact() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const [titleLine1, titleLine2] = t.contact.title.split('\n')

  return (
    <section className="section contact" id="contatti">
      <div className="contact__bg" aria-hidden="true" />

      {/* Blueprint grid — light, on dark navy */}
      <div className="contact__grid-bg" aria-hidden="true" />

      {/* Rotating hexagons, like the hero */}
      <div className="contact__hex-wrap" aria-hidden="true">
        <svg className="contact__hex contact__hex--outer" viewBox="0 0 100 100" fill="none">
          <path d="M50 2 L91.5 26 L91.5 74 L50 98 L8.5 74 L8.5 26 Z" stroke="currentColor" strokeWidth="0.7" />
        </svg>
        <svg className="contact__hex contact__hex--inner" viewBox="0 0 100 100" fill="none">
          <path d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Crosshair markers */}
      <div className="contact__markers container" aria-hidden="true">
        <span className="contact__marker" style={{ top: '10%', left: '46%' }}>+</span>
        <span className="contact__marker" style={{ top: '16%', right: '5%' }}>+</span>
        <span className="contact__marker" style={{ bottom: '12%', left: '4%' }}>+</span>
      </div>

      <motion.div
        ref={ref}
        className="container contact__inner"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div className="contact__header" variants={itemVariants}>
          <p className="section-label section-label--dot">
            <span className="label-dot" />
            {t.contact.label}
            <span className="label-meta mono">{lang === 'it' ? 'RISPOSTA < 24H' : 'REPLY < 24H'}</span>
          </p>
          <h2 className="section-title title-rows contact__title">
            <span className="title-row">{titleLine1}</span>
            <span className={`title-row title-row--accent ${inView ? 'title-row--filled' : ''}`}>
              {titleLine2}
            </span>
          </h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <motion.a
            href={`mailto:${t.contact.email}`}
            className="contact__email"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {t.contact.email}
          </motion.a>
          <div className="contact__availability mono">
            <span className="contact__availability-dot" />
            {t.contact.availability}
          </div>
        </motion.div>

        <motion.div className="contact__form-wrap" variants={itemVariants}>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                className="contact__success"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="contact__success-icon"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Check size={26} weight="bold" />
                </motion.div>
                <p className="contact__success-title">{t.contact.form.sent}</p>
                <p className="contact__success-note">{t.contact.form.successNote}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              >
                <div className="contact__row">
                  <Field num="01" id="cf-name" label={t.contact.form.name} filled={!!form.name}>
                    <input id="cf-name" className="cfield__input" type="text" name="name"
                      value={form.name} onChange={handleChange} required autoComplete="name" />
                  </Field>
                  <Field num="02" id="cf-company" label={t.contact.form.company} filled={!!form.company}>
                    <input id="cf-company" className="cfield__input" type="text" name="company"
                      value={form.company} onChange={handleChange} autoComplete="organization" />
                  </Field>
                </div>

                <Field num="03" id="cf-email" label={t.contact.form.email} filled={!!form.email}>
                  <input id="cf-email" className="cfield__input" type="email" name="email"
                    value={form.email} onChange={handleChange} required autoComplete="email" />
                </Field>

                <Field num="04" id="cf-message" label={t.contact.form.message} filled={!!form.message} area>
                  <textarea id="cf-message" className="cfield__input cfield__textarea" name="message"
                    value={form.message} onChange={handleChange} rows={5} required maxLength={MAX_MESSAGE} />
                  <span className="cfield__count mono">{form.message.length} / {MAX_MESSAGE}</span>
                </Field>

                <motion.button
                  type="submit"
                  className="contact__submit"
                  disabled={status !== 'idle'}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <span>{status === 'idle' ? t.contact.form.submit : t.contact.form.sending}</span>
                  <span className="contact__submit-arrow">
                    <ArrowRight size={18} weight="bold" />
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}
