import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const categoryThemes = {
  WordPress: {
    accent: '#60a5fa',
    gradient: 'from-[#1e3a5f] via-[#162033] to-[#111111]',
  },
  Ecommerce: {
    accent: '#4ade80',
    gradient: 'from-[#14532d] via-[#142018] to-[#111111]',
  },
  Custom: {
    accent: '#c8f135',
    gradient: 'from-[#3a4a12] via-[#1a1f10] to-[#111111]',
  },
}

const projects = [
  {
    title: 'Propexa',
    url: 'https://propexa.ca/',
    category: 'WordPress',
    type: 'Business Website',
    image: '/images/projects/propexa.jpg',
    tags: ['WordPress', 'Business', 'Responsive'],
  },
  {
    title: 'SB TraWorld',
    url: 'https://sb-traworld.com/',
    category: 'WordPress',
    type: 'Travel Agency Website',
    image: '/images/projects/sb-traworld.jpg',
    tags: ['Travel', 'Packages', 'WordPress'],
  },
  {
    title: 'Lavish Bath Calgary',
    url: 'https://lavishbathcalgary.ca/',
    category: 'Ecommerce',
    type: 'Ecommerce Website',
    image: '/images/projects/lavishbath.jpg',
    tags: ['Shopify', 'Ecommerce', 'Responsive'],
  },
  {
    title: 'Mindcob',
    url: 'https://mindcob.com/',
    category: 'Custom',
    type: 'Company Website',
    image: '/images/projects/mindcob.jpg',
    tags: ['Custom Code', 'UI Design', 'Responsive'],
  },
  {
    title: 'MLC Immigration',
    url: 'https://www.mlcimmigration.com/',
    category: 'Custom',
    type: 'Immigration Website',
    image: '/images/projects/mlcimmigration.jpg',
    tags: ['Custom Code', 'Consulting', 'Lead Gen'],
  },
]

const categories = ['All', 'WordPress', 'Ecommerce', 'Custom']

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function BrowserMockup({ project }) {
  const domain = getDomain(project.url)

  return (
    <div className="relative overflow-hidden rounded-[1.1rem] border border-[#2a2a2a] bg-[#0d0d0d]">
      <div className="flex items-center gap-2 border-b border-[#222222] bg-[#161616] px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="min-w-0 flex-1 rounded-md border border-[#2a2a2a] bg-[#111111] px-3 py-1">
          <p className="truncate text-[10px] text-[#b5b5b5]">{domain}</p>
        </div>
      </div>

      <div className="relative h-[188px] overflow-hidden bg-[#141414] sm:h-[200px]">
        <img
          src={project.image}
          alt={`${project.title} website preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0)_0%,rgba(20,20,20,0.22)_100%)]" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_62%,rgba(20,20,20,0.18)_100%)]" />
      </div>
    </div>
  )
}
function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7H17V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ project, onOpen }) {
  const prefersReducedMotion = useReducedMotion()
  const theme = categoryThemes[project.category] || categoryThemes.WordPress

  return (
    <motion.article
      variants={fadeUp}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#222222] bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:border-[#c8f135]/25"
    >
      <div className="p-4 pb-0">
        <BrowserMockup project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{
                borderColor: `${theme.accent}33`,
                backgroundColor: `${theme.accent}12`,
                color: theme.accent,
              }}
            >
              {project.category}
            </span>

            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[#f0f0f0]">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-[#c2c2c2]">{project.type}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2a2a2a] bg-[#111111] px-2.5 py-1 text-[10px] font-semibold text-[#d0d0d0]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-[#222222] pt-4">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 rounded-full bg-[#c8f135] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#d8ff4d]"
          >
            Live Preview
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-4 py-2 text-xs font-semibold text-[#dfdfdf] transition hover:border-[#c8f135]/40 hover:text-[#c8f135]"
          >
            Visit Site
            <ExternalIcon />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectPreviewModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    setLoaded(false)
  }, [project])

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 px-3 py-5 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseDown={onClose}
    >
      <motion.div
        className="relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.7rem] border border-[#222222] bg-[#161616] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#222222] bg-[#161616] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8f135]">
              Website Preview
            </p>

            <h3 className="truncate text-lg font-semibold text-[#f0f0f0] sm:text-xl">
              {project.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[#2a2a2a] px-4 py-2 text-xs font-semibold text-[#dfdfdf] transition hover:border-[#c8f135]/40 hover:text-[#c8f135] sm:inline-flex"
            >
              Open Site
              <ExternalIcon />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-[#c8f135] text-xl font-bold text-black transition-transform duration-300 hover:scale-105 hover:bg-[#d8ff4d]"
              aria-label="Close project preview"
            >
              ×
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-white">
          {!loaded && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#111111]">
              <div className="text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#2a2a2a] border-t-[#c8f135]" />
                <p className="mt-4 text-sm font-medium text-[#d0d0d0]">
                  Loading project preview...
                </p>
              </div>
            </div>
          )}

          <iframe
            title={`${project.title} preview`}
            src={project.url}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0"
          />
        </div>

        <div className="border-t border-[#222222] bg-[#161616] px-4 py-3 text-xs leading-5 text-[#b5b5b5] sm:px-5">
          If preview does not load, the website may block iframe embedding for security.
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="projects"
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#c8f135]/5 blur-2xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(17,17,17,0.2)_36%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        <div className="mb-10 text-center">
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#c8f135] sm:text-sm"
          >
            My Recent Portfolio
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
          >
            Client websites built for real businesses
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#d0d0d0] sm:text-[17px] sm:leading-8"
          >
            WordPress builds, ecommerce stores, and custom-coded websites — shown
            naturally with a soft, easy-on-the-eyes preview.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition duration-300 ${
                  activeCategory === category
                    ? 'border-[#c8f135] bg-[#c8f135] text-black'
                    : 'border-[#2a2a2a] bg-transparent text-[#aaa] hover:border-[#c8f135]/60 hover:text-[#c8f135]'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectPreviewModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
