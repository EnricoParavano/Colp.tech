import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LangProvider } from './context/LangContext'
import { Preloader } from './components/Preloader'
import { CursorFollower, ScrollProgress } from './components/CursorAndProgress'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <LangProvider>
      <AnimatePresence>
        {!introDone && <Preloader key="preloader" />}
      </AnimatePresence>

      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero started={introDone} />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
