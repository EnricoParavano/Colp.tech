import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import './CursorAndProgress.css'

export function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const dotConfig  = { damping: 18, stiffness: 180, mass: 0.3 }

  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)
  const smoothDotX = useSpring(dotX, dotConfig)
  const smoothDotY = useSpring(dotY, dotConfig)

  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const move = e => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }
    const enter = () => setHidden(false)
    const leave = () => setHidden(true)

    const checkHover = e => {
      const el = e.target
      setHovered(
        el.closest('a, button, [role="tab"], .project-card, .service-card') !== null
      )
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHover)
    document.documentElement.addEventListener('mouseenter', enter)
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      document.documentElement.removeEventListener('mouseenter', enter)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className={`cursor-ring ${hovered ? 'cursor-ring--hover' : ''} ${hidden ? 'cursor-ring--hidden' : ''}`}
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className={`cursor-dot ${hidden ? 'cursor-dot--hidden' : ''}`}
        style={{ x: smoothDotX, y: smoothDotY }}
      />
    </>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  )
}
