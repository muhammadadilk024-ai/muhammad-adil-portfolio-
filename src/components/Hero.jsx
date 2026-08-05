import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const stack = ['WordPress', 'WooCommerce', 'React', 'PHP', 'JavaScript']
const ease = [0.16, 1, 0.3, 1]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TerminalLine({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 85, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 85, damping: 24 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4.5, 4.5])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4])
  const terrainX = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const terrainY = useTransform(smoothY, [-0.5, 0.5], [-7, 7])

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
      className="terminal-hero relative flex min-h-screen items-center overflow-hidden bg-[#09090d] px-5 pb-14 pt-28 text-[#f7f5fb] sm:px-7 sm:pb-16 sm:pt-32 lg:px-12"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5"
        style={reduceMotion ? undefined : { x: terrainX, y: terrainY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.07 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.45, ease }}
      >
        <img
          src="/images/terrain.png"
          alt=""
          className="terminal-terrain h-full w-full object-cover object-center opacity-[0.72]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,13,.76)_0%,rgba(9,9,13,.2)_45%,rgba(9,9,13,.7)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_54%_48%,transparent_5%,rgba(9,9,13,.3)_62%,#09090d_100%)]" />
      </motion.div>

      <div aria-hidden="true" className="terminal-grid pointer-events-none absolute inset-0 opacity-35" />
      <div aria-hidden="true" className="terminal-glow terminal-glow-violet pointer-events-none absolute left-[12%] top-[23%]" />
      <div aria-hidden="true" className="terminal-glow terminal-glow-orange pointer-events-none absolute bottom-[16%] right-[12%]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1420px] items-center gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16 xl:gap-24">
        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            className="mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9b8cff]"
          >
            <span className="text-[#ff9a58]">{'//'}</span>
            WordPress + front-end developer
          </motion.div>

          <h1 className="max-w-[760px] text-[clamp(3.25rem,6.2vw,6.6rem)] font-light leading-[0.99] tracking-[-0.052em]">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.14, duration: 0.85, ease }}
              >
                Hi, I&apos;m Muhammad Adil.
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.23, duration: 0.85, ease }}
              >
                I turn ideas into
              </motion.span>
            </span>
            <span className="mt-2 block overflow-hidden pb-[0.12em]">
              <motion.span
                className="terminal-gradient-text block font-mono font-normal tracking-[-0.065em]"
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.32, duration: 0.85, ease }}
              >
                standout websites.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.68, ease }}
            className="mt-7 max-w-[590px] text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8"
          >
            I design and build fast, conversion-focused WordPress, ecommerce and
            front-end experiences — from the first idea to the final pixel.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.64, duration: 0.65, ease }}
            className="mt-7 flex flex-wrap gap-2 font-mono text-[10px]"
          >
            {stack.map((item, index) => (
              <span
                key={item}
                className="terminal-skill rounded-md border border-white/13 bg-white/[0.045] px-3 py-2 text-white/58 backdrop-blur-md"
                style={{ '--skill-delay': `${index * 80}ms` }}
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.65, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-[#7564f5] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(117,100,245,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8b7cff]"
            >
              View projects <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/17 bg-black/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white/72 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-[#ff9a58]/70 hover:text-white"
            >
              Start a project
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 45, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.28, duration: 1, ease }}
          className="relative mx-auto w-full max-w-[720px]"
          style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
        >
          <div className="terminal-window terminal-float relative overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#111117]/72 shadow-[0_40px_110px_rgba(0,0,0,.62),0_0_65px_rgba(117,100,245,.12)] backdrop-blur-xl">
            <div className="terminal-sheen pointer-events-none absolute inset-0 z-10" />

            <div className="flex h-12 items-center border-b border-white/10 bg-white/[0.025] px-4">
              <div className="flex gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6e70] shadow-[0_0_12px_rgba(255,110,112,.55)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffad55] shadow-[0_0_12px_rgba(255,173,85,.45)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#8b7cff] shadow-[0_0_12px_rgba(139,124,255,.55)]" />
              </div>
              <span className="ml-4 font-mono text-[10px] text-white/38">~/muhammad-adil — portfolio</span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-[#9eb7a6]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8fb69b]" /> live
              </span>
            </div>

            <div className="relative min-h-[380px] space-y-2.5 p-5 font-mono text-[12px] leading-6 sm:min-h-[430px] sm:p-7 sm:text-[13px] sm:leading-7">
              <TerminalLine delay={0.65} className="text-white/48">
                <span className="mr-2 text-[#9b8cff]">$</span>whoami
              </TerminalLine>
              <TerminalLine delay={0.82} className="font-semibold text-white/88">
                muhammad_adil
              </TerminalLine>
              <TerminalLine delay={1.05} className="pt-1 text-white/48">
                <span className="mr-2 text-[#9b8cff]">$</span>cat expertise.json
              </TerminalLine>
              <TerminalLine delay={1.2}>
                <pre className="overflow-x-auto text-white/78">{`{
  "web":       ["WordPress", "React"],
  "commerce":  ["WooCommerce", "UX"],
  "backend":   ["PHP", "MySQL"],
  "focus":     ["Speed", "Conversion"]
}`}</pre>
              </TerminalLine>
              <TerminalLine delay={1.52} className="pt-1 text-white/48">
                <span className="mr-2 text-[#ff9a58]">$</span>open selected-work
                <span className="terminal-cursor ml-1.5 inline-block h-[1.05em] w-[7px] bg-[#f7f5fb] align-[-0.12em]" />
              </TerminalLine>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.65, ease }}
            className="absolute -bottom-5 right-5 rounded-lg border border-[#8b7cff]/35 bg-[#13121d]/88 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-right-5 sm:bottom-8"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">Current status</p>
            <p className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-white/84">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8fb69b]" />
              Available for selected projects
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 font-mono text-[8px] uppercase tracking-[0.22em] text-white/28 lg:flex">
        <span className="terminal-scroll-line h-px w-10 bg-gradient-to-r from-transparent to-[#9b8cff]" />
        Scroll to explore
      </div>
    </section>
  )
}

export default Hero
