import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const disciplines = [
  'WordPress development',
  'Ecommerce experiences',
  'Front-end development',
  'Interaction design',
  'Performance',
]

const selectedWork = [
  { name: 'SB TraWorld', type: 'Travel platform' },
  { name: 'Lavish Bath', type: 'Ecommerce' },
  { name: 'Propexa', type: 'Business website' },
]

const facts = [
  { value: '4+', label: 'Years building' },
  { value: '20+', label: 'Client projects' },
  { value: '03', label: 'Core specialties' },
  { value: 'Remote', label: 'Available worldwide' },
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
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 24 })
  const artworkX = useTransform(smoothX, [-0.5, 0.5], [-18, 18])
  const artworkY = useTransform(smoothY, [-0.5, 0.5], [-12, 12])
  const cardX = useTransform(smoothX, [-0.5, 0.5], [10, -10])
  const cardY = useTransform(smoothY, [-0.5, 0.5], [7, -7])

  function handlePointerMove(event) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      id="home"
      className="hero-editorial relative flex min-h-screen flex-col overflow-hidden bg-[#100d0f] pt-[76px] text-[#f6f0e9]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="hero-editorial-noise pointer-events-none absolute inset-0 z-[1] opacity-35" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[-12%] z-0 w-[82%] sm:right-[-7%] lg:w-[62%]"
        style={reduceMotion ? undefined : { x: artworkX, y: artworkY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <img
          src="/images/crimson-silk.png"
          alt=""
          className="hero-silk-motion h-full w-full object-cover object-center opacity-80"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#100d0f_3%,rgba(16,13,15,.88)_20%,rgba(16,13,15,.22)_64%,rgba(16,13,15,.38)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#100d0f_1%,transparent_34%,rgba(16,13,15,.22)_100%)]" />
      </motion.div>

      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-[#100d0f]/50 py-3 backdrop-blur-sm">
        <div className="hero-editorial-marquee flex w-max items-center whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/48">
          {[0, 1].map((group) => (
            <span key={group} className="flex items-center">
              {disciplines.map((item) => (
                <span key={`${group}-${item}`} className="flex items-center">
                  <span className="mx-6 h-1 w-1 rounded-full bg-[#d6524d]" />
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 items-center px-5 py-14 sm:px-7 sm:py-16 lg:px-12 lg:py-20">
        <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[9px] font-medium uppercase tracking-[0.42em] text-white/28 xl:block">
          Portfolio — 2026
        </div>

        <div className="relative w-full max-w-[980px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6, ease }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="font-serif text-base italic text-[#e36962]">01</span>
            <span className="h-px w-14 bg-white/18" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/48">
              Independent web developer
            </span>
          </motion.div>

          <h1 className="max-w-[940px] text-[clamp(4rem,10vw,9.1rem)] font-light leading-[0.84] tracking-[-0.065em]">
            {['Websites', 'built to'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.95, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.13em]">
              <motion.span
                className="hero-move-word block font-serif font-normal italic text-[#df5d56]"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.95, ease }}
              >
                move business.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.72, ease }}
            className="mt-7 max-w-[560px] lg:mt-9"
          >
            <p className="max-w-xl text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
              I&apos;m Muhammad Adil — a WordPress and front-end developer creating
              clear, fast and conversion-focused websites for growing businesses.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[#cf4d47] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.11em] text-white shadow-[0_16px_38px_rgba(207,77,71,.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e05e57]"
              >
                Explore the work <ArrowIcon />
              </a>
              <a
                href="#about"
                className="border-b border-white/25 pb-1 text-xs font-bold uppercase tracking-[0.11em] text-white/60 transition hover:border-white hover:text-white"
              >
                About me
              </a>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#projects"
          aria-label="View selected projects"
          className="absolute bottom-8 right-5 hidden w-[270px] border border-white/14 bg-[#171214]/72 p-5 shadow-[0_26px_80px_rgba(0,0,0,.4)] backdrop-blur-xl transition-colors hover:border-[#d6524d]/50 sm:block lg:bottom-12 lg:right-12"
          style={reduceMotion ? undefined : { x: cardX, y: cardY }}
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/38">Selected work</span>
            <span className="text-[#df5d56]">↗</span>
          </div>
          {selectedWork.map((project, index) => (
            <div key={project.name} className="flex items-baseline justify-between gap-4 border-t border-white/10 py-2.5">
              <span className="text-sm font-medium text-white/84">{project.name}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/34">0{index + 1}</span>
            </div>
          ))}
        </motion.a>
      </div>

      <motion.dl
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78, duration: 0.72, ease }}
        className="relative z-10 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-4"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="bg-[#100d0f]/95 px-5 py-5 sm:px-7 lg:px-12">
            <dt className="text-xl font-light tracking-[-0.04em] text-white sm:text-2xl">{fact.value}</dt>
            <dd className="mt-1 font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">{fact.label}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}

export default Hero
