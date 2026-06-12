import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { useLang } from '../context/LangContext'
import './Projects.css'

const SEEDS = { 1: 'fiera', 2: 'zonin', 3: 'rizzoli', 4: 'riva', 5: 'sella', 6: 'adriatica' }
const CATEGORY_ACCENT = { dev: 'accent-dev', design: 'accent-design', consult: 'accent-consult' }

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function Projects() {
  const { t } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

  const previewX = useMotionValue(0)
  const previewY = useMotionValue(0)
  const smoothX = useSpring(previewX, { damping: 25, stiffness: 200, mass: 0.6 })
  const smoothY = useSpring(previewY, { damping: 25, stiffness: 200, mass: 0.6 })

  const handleMouseMove = (e) => {
    const rect = listRef.current.getBoundingClientRect()
    previewX.set(e.clientX - rect.left + 32)
    previewY.set(e.clientY - rect.top - 110)
  }

  const filters = [
    { key: 'all',     label: t.projects.filters.all },
    { key: 'dev',     label: t.projects.filters.dev },
    { key: 'design',  label: t.projects.filters.design },
    { key: 'consult', label: t.projects.filters.consult },
  ]

  const visible = activeFilter === 'all'
    ? t.projects.items
    : t.projects.items.filter(p => p.category === activeFilter)

  const counts = Object.fromEntries(
    filters.map(f => [
      f.key,
      f.key === 'all' ? t.projects.items.length : t.projects.items.filter(p => p.category === f.key).length,
    ])
  )

  const hoveredProject = t.projects.items.find(p => p.id === hoveredId)
  const [titleLine1, titleLine2] = t.projects.title.split('\n')

  return (
    <section className="section projects" id="progetti">
      {/* Blueprint grid + markers */}
      <div className="projects__grid-bg" aria-hidden="true" />
      <div className="projects__markers container" aria-hidden="true">
        <span className="projects__marker" style={{ top: '7%', right: '5%' }}>+</span>
        <span className="projects__marker" style={{ top: '26%', left: '52%' }}>+</span>
        <span className="projects__marker" style={{ bottom: '10%', right: '38%' }}>+</span>
      </div>

      <div className="container projects__container">
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="projects__header"
        >
          <p className="section-label section-label--dot">
            <span className="label-dot" />
            {t.projects.label}
            <span className="label-meta mono">PRJ. 01–0{t.projects.items.length}</span>
          </p>
          <h2 className="section-title title-rows">
            <span className="title-row">{titleLine1}</span>
            <span className={`title-row title-row--accent ${headerInView ? 'title-row--filled' : ''}`}>
              {titleLine2}
            </span>
          </h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>
        </motion.div>

        <div className="projects__filters" role="tablist">
          {filters.map(f => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              className={`projects__filter ${activeFilter === f.key ? 'projects__filter--active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
              <sup className="projects__filter-count">{counts[f.key]}</sup>
              {activeFilter === f.key && (
                <motion.span
                  className="projects__filter-underline"
                  layoutId="filterUnderline"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <div
          ref={listRef}
          className="projects__list"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredId(null)}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                cta={t.projects.cta}
                accent={CATEGORY_ACCENT[project.category]}
                onHover={setHoveredId}
                dimmed={hoveredId !== null && hoveredId !== project.id}
              />
            ))}
          </AnimatePresence>

          {/* Floating image preview */}
          <AnimatePresence>
            {hoveredProject && (
              <motion.div
                className="projects__preview"
                style={{ x: smoothX, y: smoothY }}
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={`https://picsum.photos/seed/${SEEDS[hoveredProject.id]}/520/340`}
                  alt=""
                  className="projects__preview-img"
                />
                <span className="projects__preview-caption mono">
                  {hoveredProject.client} — {hoveredProject.year}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, index, cta, accent, onHover, dimmed }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.a
      ref={ref}
      href="#contatti"
      className={`project-row ${dimmed ? 'project-row--dimmed' : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(project.id)}
    >
      <span className="project-row__index">0{index + 1}</span>

      <div className="project-row__main">
        <h3 className="project-row__name">{project.name}</h3>
        <p className="project-row__client">{project.client}</p>
      </div>

      <p className="project-row__desc">{project.desc}</p>

      <div className="project-row__meta">
        <span className={`tag ${accent}__tag`}>{project.category.toUpperCase()}</span>
        <span className="project-row__year">{project.year}</span>
      </div>

      <span className="project-row__arrow">
        <ArrowUpRight size={20} weight="bold" />
      </span>

      {/* Mobile-only thumbnail */}
      <div className="project-row__thumb" aria-hidden="true">
        <img
          src={`https://picsum.photos/seed/${SEEDS[project.id]}/700/440`}
          alt=""
          loading="lazy"
        />
      </div>
    </motion.a>
  )
}
