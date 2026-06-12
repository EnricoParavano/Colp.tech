import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './Preloader.css'

export function Preloader() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const letters = ['o', 'l', 'p']

  return (
    <motion.div
      className="preloader"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="preloader__mark">
        <svg className="preloader__hex" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <motion.path
            d="M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinejoin="miter"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.text
            x="50" y="50"
            className="preloader__c"
            textAnchor="middle"
            dominantBaseline="central"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.85 }}
          >
            c
          </motion.text>
        </svg>

        <span className="preloader__word">
          {letters.map((l, i) => (
            <span key={i} className="preloader__letter-clip">
              <motion.span
                className="preloader__letter"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.55,
                  delay: 0.7 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </span>
      </div>

      <motion.div
        className="preloader__bar"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.div>
  )
}
