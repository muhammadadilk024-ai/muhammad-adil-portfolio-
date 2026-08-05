import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const projects = [
  {
    index: '01',
    name: 'SB TraWorld',
    type: 'Bilingual travel platform',
    stack: 'WordPress · EN/DE',
    image: '/images/projects/sb-traworld.jpg',
    url: 'https://sb-traworld.com/',
  },
  {
    index: '02',
    name: 'Lavish Bath',
    type: 'Commerce experience',
    stack: 'WooCommerce · UX',
    image: '/images/projects/lavishbath.jpg',
    url: 'https://lavishbathcalgary.ca/',
  },
  {
    index: '03',
    name: 'Propexa',
    type: 'Business platform',
    stack: 'WordPress · Front-end',
    image: '/images/projects/propexa.jpg',
    url: 'https://propexa.ca/',
  },
]

const ease = [0.16, 1, 0.3, 1]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const activeProject = projects[activeIndex]

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 22 })
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 22 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3.5, 3.5])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3.5, -3.5])
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const imageY = useTransform(smoothY, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    if (reduceMotion || isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [isPaused, reduceMotion])

  function handlePointerMove(event) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
    setIsPaused(false)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0e1014] px-5 pb-0 pt-28 text-[#f2eee6] sm:px-7 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-noise opacity-40" />
      <div className="pointer-events-none absolute left-[12%] top-[16%] h-[420px] w-[420px] rounded-full bg-[#32423b]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[4%] right-[8%] h-[420px] w-[420px] rounded-full bg-[#ef7253]/10 blur-[110px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1500px] items-center gap-12 pb-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:pb-20">
        <div className="relative z-10 pt-4 lg:pt-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ef7253]">Independent developer</span>
            <span className="h-px w-10 bg-white/20" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">Windsor · Canada</span>
          </motion.div>

          <h1 className="max-w-[760px] text-[clamp(4.25rem,9.5vw,9.4rem)] font-semibold leading-[0.78] tracking-[-0.075em]">
            <span className="block overflow-hidden pb-4">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.9, ease }}
              >
                Muhammad
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-4">
              <motion.span
                className="block font-serif font-normal italic text-[#ef7253]"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease }}
              >
                Adil.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
            className="mt-7 grid max-w-2xl gap-7 border-t border-white/12 pt-6 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div>
              <p className="max-w-lg text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                I design and build distinctive WordPress, commerce and front-end
                experiences—combining clear thinking with polished execution.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#f2eee6] px-5 py-3 text-xs font-bold uppercase tracking-[0.11em] text-[#0e1014] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Explore work <ArrowIcon />
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/18 px-5 py-3 text-xs font-bold uppercase tracking-[0.11em] text-white transition hover:-translate-y-0.5 hover:border-[#ef7253] hover:text-[#ef7253]"
                >
                  Start a project
                </a>
              </div>
            </div>
            <div className="flex gap-7 sm:block sm:text-right">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em]">4+</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/38">Years</p>
              </div>
              <div className="sm:mt-5">
                <p className="text-2xl font-semibold tracking-[-0.04em]">20+</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/38">Client builds</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 45, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 1, ease }}
          className="relative mx-auto w-full max-w-[760px] lg:mx-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={resetPointer}
          onPointerMove={handlePointerMove}
        >
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">Selected project</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProject.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 text-xl font-semibold tracking-[-0.035em] sm:text-2xl"
                >
                  {activeProject.name}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-serif text-4xl italic text-[#ef7253] sm:text-5xl">{activeProject.index}</p>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-[1.4rem] border border-white/14 bg-[#181b20] shadow-[0_38px_90px_rgba(0,0,0,0.48)]"
            style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
          >
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#ef7253]" />
                <span className="h-2 w-2 rounded-full bg-white/25" />
                <span className="h-2 w-2 rounded-full bg-[#91ad9c]" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">Live client work</span>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#20242b] sm:aspect-[16/11]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.image}
                  src={activeProject.image}
                  alt={`${activeProject.name} website project`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  style={reduceMotion ? undefined : { x: imageX, y: imageY, scale: 1.035 }}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.08, x: 32 }}
                  animate={{ opacity: 1, scale: 1.035, x: 0 }}
                  exit={{ opacity: 0, scale: 0.99, x: -22 }}
                  transition={{ duration: 0.75, ease }}
                  fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e1014]/90 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.type}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.12 }}
                  >
                    <p className="text-xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{activeProject.type}</p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/52">{activeProject.stack}</p>
                  </motion.div>
                </AnimatePresence>
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${activeProject.name}`}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#ef7253] text-white transition hover:rotate-12 hover:scale-105 sm:h-14 sm:w-14"
                >
                  ↗
                </a>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Choose featured project">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group border-t pt-3 text-left transition ${index === activeIndex ? 'border-[#ef7253]' : 'border-white/12 hover:border-white/35'}`}
                aria-pressed={index === activeIndex}
              >
                <span className={`block text-[9px] font-bold uppercase tracking-[0.15em] ${index === activeIndex ? 'text-[#ef7253]' : 'text-white/30'}`}>
                  {project.index}
                </span>
                <span className={`mt-1 hidden text-xs font-semibold sm:block ${index === activeIndex ? 'text-white' : 'text-white/45 group-hover:text-white/70'}`}>
                  {project.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-white/10 bg-[#12151a] py-3.5">
        <div className="hero-marquee-track flex w-max items-center whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">
          {[0, 1].map((group) => (
            <span key={group} className="flex items-center">
              <span className="mx-6">WordPress development</span><span className="text-[#ef7253]">✦</span>
              <span className="mx-6">Commerce experiences</span><span className="text-[#ef7253]">✦</span>
              <span className="mx-6">Front-end systems</span><span className="text-[#ef7253]">✦</span>
              <span className="mx-6">Selected client work</span><span className="text-[#ef7253]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
