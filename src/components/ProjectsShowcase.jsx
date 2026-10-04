import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const projects = [
  {
    id: '01',
    name: 'SB TraWorld',
    slug: 'sb-traworld',
    url: 'https://sb-traworld.com/',
    domain: 'sb-traworld.com',
    type: 'Travel and Pilgrimage Platform',
    platform: 'WordPress · Custom Plugins',
    image: '/images/projects/spotlight/sb-traworld.webp',
    accent: '#8b7cff',
    glow: 'rgba(139, 124, 255, 0.15)',
    description:
      'A bilingual travel and pilgrimage platform that brings destinations, Hajj and Umrah packages, travel updates and enquiries together in one clear booking experience.',
    services: ['Brand identity', 'UI/UX design', 'WordPress build', 'Custom functionality', 'Bilingual experience', 'Deployment'],
  },
  {
    id: '02',
    name: 'Fusion Fora',
    slug: 'fusionfora',
    url: 'https://fusionfora.com/',
    domain: 'fusionfora.com',
    type: 'AI Strategy and Consulting',
    platform: 'WordPress',
    image: '/images/projects/spotlight/fusionfora-full-3e94fbe8.webp',
    imageFit: 'contain',
    imageBackground: '#f7f7f7',
    accent: '#5a9cff',
    glow: 'rgba(90, 156, 255, 0.14)',
    description:
      'A polished consulting website that helps leaders understand AI strategy, explore advisory services and take the next step with confidence.',
    services: ['Logo and brand', 'UI/UX design', 'WordPress build', 'Service architecture', 'Lead generation', 'Deployment'],
  },
  {
    id: '03',
    name: 'Paan Express',
    slug: 'paan-express',
    url: 'https://paanexpress.com/',
    domain: 'paanexpress.com',
    type: 'Restaurant and Local Commerce',
    platform: 'WordPress',
    image: '/images/projects/spotlight/paan-express.webp',
    accent: '#f39a45',
    glow: 'rgba(243, 154, 69, 0.14)',
    description:
      'A bold restaurant website that presents the menu clearly, builds local trust and guides Brampton customers towards visiting or ordering.',
    services: ['Logo and brand', 'UI/UX design', 'WordPress build', 'Digital menu', 'Local SEO structure', 'Deployment'],
  },
  {
    id: '04',
    name: 'Lavish Bath',
    slug: 'lavish-bath',
    url: 'https://lavishbathcalgary.ca/',
    domain: 'lavishbathcalgary.ca',
    type: 'Bath and Kitchen Ecommerce',
    platform: 'WordPress · WooCommerce',
    image: '/images/projects/spotlight/lavish-bath.webp',
    accent: '#b7a887',
    glow: 'rgba(183, 168, 135, 0.14)',
    description:
      'A complete bath and kitchen store with organized product categories, detailed product content and a smooth WooCommerce shopping experience.',
    services: ['UI/UX redesign', 'WordPress build', 'WooCommerce', 'Catalog architecture', 'Product content', 'Deployment'],
  },
  {
    id: '05',
    name: 'MindCob',
    slug: 'mindcob',
    url: 'https://mindcob.com/',
    domain: 'mindcob.com',
    type: 'Digital Agency Platform',
    platform: 'Custom Full Stack',
    image: '/images/projects/spotlight/mindcob.webp',
    accent: '#55c8f1',
    glow: 'rgba(85, 200, 241, 0.13)',
    description:
      'A custom digital agency website that explains complex services clearly, supports location focused content and turns visitors into qualified leads.',
    services: ['UI/UX design', 'Frontend development', 'Backend and CMS', 'Service architecture', 'Lead generation', 'Deployment'],
  },
  {
    id: '06',
    name: 'FAM Humanity',
    slug: 'fam-humanity',
    url: 'https://famhumanity.com/',
    domain: 'famhumanity.com',
    type: 'Nonprofit and Donations',
    platform: 'WordPress',
    image: '/images/projects/spotlight/fam-humanity-full-2389696b.webp',
    imageFit: 'contain',
    imageBackground: '#213a34',
    accent: '#9db49c',
    glow: 'rgba(157, 180, 156, 0.14)',
    description:
      'A compassionate charity website that explains the foundation’s mission, presents its healthcare programs and makes it simple for supporters to donate.',
    services: ['Brand identity', 'UI/UX design', 'WordPress build', 'Donation flow', 'Content structure', 'Deployment'],
  },
]

const ease = [0.16, 1, 0.3, 1]

function ArrowIcon({ direction = 'right' }) {
  const rotate = direction === 'left' ? 'rotate-180' : ''

  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${rotate}`} fill="none" aria-hidden="true">
      <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M7 13L13.5 6.5M9 6.5H13.5V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProjectsShowcase() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const active = projects[index]

  const go = useCallback((direction) => {
    setIndex((current) => (current + direction + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === 'ArrowRight') go(1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go])

  useEffect(() => {
    if (reduceMotion || isPaused) return undefined

    const timer = window.setInterval(() => go(1), 6500)
    return () => window.clearInterval(timer)
  }, [go, isPaused, reduceMotion])

  function handleDragEnd(_, info) {
    if (info.offset.x < -70) go(1)
    if (info.offset.x > 70) go(-1)
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0b0b0f] px-5 py-24 text-[#f7f5fb] sm:px-7 md:py-32 lg:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[42%] top-[32%] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[150px] transition-colors duration-700"
        style={{ backgroundColor: active.glow }}
      />
      <div aria-hidden="true" className="terminal-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: active.accent }}>
              Client work · Six projects delivered
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Digital products built to solve <span className="font-serif italic text-white/62">real problems.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-[15px]">
              Every project here was created entirely by me, from the first idea and visual identity to the frontend, backend and final launch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/14 text-white/62 transition hover:border-white/35 hover:text-white"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/14 text-white/62 transition hover:border-white/35 hover:text-white"
            >
              <ArrowIcon />
            </button>
          </div>
        </motion.div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.42fr_0.78fr] lg:gap-14">
          <motion.div
            className="cursor-grab touch-pan-y active:cursor-grabbing"
            drag={reduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={handleDragEnd}
          >
            <div className="overflow-hidden rounded-[1.2rem] border border-white/13 bg-[#121217] shadow-[0_35px_100px_rgba(0,0,0,.48)]">
              <div className="flex h-12 items-center gap-3 border-b border-white/10 bg-white/[0.025] px-4">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6e70]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffad55]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8b7cff]" />
                </div>
                <div className="min-w-0 flex-1 rounded-md border border-white/8 bg-black/20 px-3 py-1.5">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active.domain}
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="truncate text-center font-mono text-[9px] text-white/38"
                    >
                      {active.domain}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className="hidden font-mono text-[8px] uppercase tracking-[0.15em] text-white/28 sm:block">Live build</span>
              </div>

              <div
                className="relative aspect-[16/10] overflow-hidden bg-[#0e0e12]"
                style={{ backgroundColor: active.imageBackground || '#0e0e12' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.image}
                    src={active.image}
                    alt={`${active.name} website desktop preview`}
                    className={`absolute inset-0 h-full w-full ${active.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.035, x: 22 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.985, x: -18 }}
                    transition={{ duration: 0.7, ease }}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0f]/35 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full border border-white/12 bg-[#0b0b0f]/75 px-3 py-2 backdrop-blur-lg sm:bottom-5 sm:left-5">
                  <span className="font-mono text-[9px] font-semibold" style={{ color: active.accent }}>{active.id}</span>
                  <span className="h-3 w-px bg-white/16" />
                  <span className="text-[10px] font-semibold text-white/74 sm:text-xs">{active.name}</span>
                </div>
              </div>

              {!reduceMotion && (
                <div className="h-px bg-white/8">
                  <span
                    key={active.slug}
                    className="spotlight-progress block h-full w-full"
                    style={{ backgroundColor: active.accent, animationPlayState: isPaused ? 'paused' : 'running' }}
                  />
                </div>
              )}
            </div>
            <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 lg:hidden">
              Swipe to explore
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={active.slug}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.52, ease }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: active.accent, borderColor: `${active.accent}55`, backgroundColor: `${active.accent}12` }}
                >
                  {active.platform}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/32">{active.type}</span>
              </div>

              <h3 className="mt-5 text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">{active.name}</h3>
              <p className="mt-5 text-sm leading-7 text-white/56 sm:text-[15px]">{active.description}</p>

              <div className="mt-7 border-y border-white/10 py-5">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-white/28">My role · 100% ownership</p>
                <p className="mt-2 text-sm font-medium leading-6 text-white/82">
                  Strategy, logo and branding, UI/UX, frontend, backend and deployment.
                </p>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-white/28">Delivered</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.services.map((service) => (
                    <span key={service} className="rounded-md border border-white/9 bg-white/[0.035] px-2.5 py-1.5 text-[10px] text-white/52">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {active.url ? (
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#0b0b0f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  style={{ backgroundColor: active.accent }}
                >
                  View live website <ExternalIcon />
                </a>
              ) : (
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">Live link not available right now</p>
              )}
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-12 overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,.18)_transparent]">
          <div className="flex min-w-max gap-3">
            {projects.map((project, projectIndex) => {
              const isActive = projectIndex === index

              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setIndex(projectIndex)}
                  aria-label={`Show ${project.name}`}
                  aria-pressed={isActive}
                  className={`group w-[138px] text-left transition duration-300 sm:w-[158px] ${isActive ? 'opacity-100' : 'opacity-[0.42] hover:opacity-80'}`}
                >
                  <span
                    className="block overflow-hidden rounded-lg border bg-[#111116] transition duration-300"
                    style={{ borderColor: isActive ? project.accent : 'rgba(255,255,255,.1)' }}
                  >
                    <img src={project.image} alt="" className="aspect-[16/9] w-full object-cover object-top transition duration-500 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3">
                    <span className={`truncate text-[10px] font-semibold ${isActive ? 'text-white/84' : 'text-white/42'}`}>{project.name}</span>
                    <span className="font-mono text-[8px]" style={{ color: isActive ? project.accent : 'rgba(255,255,255,.25)' }}>{project.id}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase
