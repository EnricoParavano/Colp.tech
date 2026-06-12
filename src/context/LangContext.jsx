import { createContext, useContext, useState } from 'react'
import { it } from '../i18n/it'
import { en } from '../i18n/en'

const translations = { it, en }

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('it')

  const toggle = () => setLang(l => l === 'it' ? 'en' : 'it')
  const t = translations[lang]

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
