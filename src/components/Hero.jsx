import { motion, useReducedMotion } from 'framer-motion'

const proof = [
  { value: '4+', label: 'Years building' },
  { value: '20+', label: 'Client projects' },
  { value: '3', label: 'Core specialties' },
]

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f4f1e9] px-5 pb-20 pt-32 text-[#171a1c] sm:px-6 sm:pb-24 sm:pt-36 lg:min-h-screen lg:pb-28 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(24,50,74,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(24,50,74,0.045)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -right-24 top-8 h-96 w-96 rounded-full bg-[#dce4df] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div>
          <motion.div
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.05}
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full border border-[#cfc9bd] bg-[#faf8f3] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#18324a]">
              Independent web developer
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-[#687074]">
              <span className="h-2 w-2 rounded-full bg-[#5f806d]" />
              Available for selected projects
            </span>
          </motion.div>

          <motion.h1
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.12}
            className="max-w-3xl text-[clamp(3.2rem,7vw,6.7rem)] font-semibold leading-[0.92] tracking-[-0.065em]"
          >
            Websites that make businesses feel{' '}
            <span className="font-serif italic font-normal text-[#c6654c]">credible.</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.2}
            className="mt-7 max-w-xl text-base leading-7 text-[#5c6468] sm:text-lg sm:leading-8"
          >
            I&apos;m Muhammad Adil. I design and build WordPress, ecommerce and
            front-end experiences that are clear, fast and made for real business goals.
          </motion.p>

          <motion.div
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.28}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[#18324a] px-5 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(24,50,74,0.18)] transition hover:-translate-y-0.5 hover:bg-[#10283d]"
            >
              See selected work
              <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-[#cbc5b9] bg-[#faf8f3] px-5 py-3.5 text-sm font-bold text-[#272c2f] transition hover:-translate-y-0.5 hover:border-[#a9a296]"
            >
              Start a conversation
            </a>
          </motion.div>

          <motion.div
            variants={reveal}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            custom={0.36}
            className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#d8d2c7] py-5"
          >
            {proof.map((item, index) => (
              <div key={item.label} className={index ? 'border-l border-[#d8d2c7] pl-5 sm:pl-7' : ''}>
                <p className="text-2xl font-bold tracking-[-0.04em] text-[#18324a] sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-[#6f7476] sm:text-xs">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[620px] lg:mx-0"
        >
          <div className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border border-[#c9c3b8]" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#c8c2b7] bg-[#18324a] p-3 shadow-[0_35px_80px_rgba(35,44,50,0.2)] sm:p-4">
            <div className="mb-3 flex items-center justify-between px-1 text-[#dce4df]">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#e7a48e]" />
                <span className="h-2 w-2 rounded-full bg-[#e7d49a]" />
                <span className="h-2 w-2 rounded-full bg-[#98b7a3]" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Selected work · SB TraWorld</p>
            </div>

            <div className="overflow-hidden rounded-[1.35rem] bg-white">
              <img
                src="/images/projects/sb-traworld.jpg"
                alt="SB TraWorld website designed and developed by Muhammad Adil"
                className="aspect-[16/10] w-full object-cover object-top"
                fetchPriority="high"
              />
            </div>

            <div className="grid gap-3 px-2 pb-2 pt-5 text-white sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#bdc9c3]">Travel platform</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.035em]">Bilingual packages and inquiry experience</p>
              </div>
              <span className="w-fit rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-[#eef1ed]">WordPress · EN/DE</span>
            </div>
          </div>

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -right-2 w-[48%] overflow-hidden rounded-2xl border-4 border-[#f4f1e9] bg-white shadow-[0_18px_45px_rgba(35,44,50,0.18)] sm:-right-7"
          >
            <img
              src="/images/projects/lavishbath.jpg"
              alt="Lavish Bath Calgary ecommerce website"
              className="aspect-[16/10] w-full object-cover object-top"
              loading="lazy"
            />
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <p className="text-xs font-bold text-[#272c2f]">Lavish Bath</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#c6654c]">Ecommerce</p>
            </div>
          </motion.div>

          <div className="absolute -left-5 bottom-10 hidden rounded-xl border border-[#c8c2b7] bg-[#faf8f3] px-4 py-3 shadow-[0_14px_35px_rgba(35,44,50,0.12)] sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6f7476]">Built for</p>
            <p className="mt-1 text-sm font-bold text-[#18324a]">Trust · clarity · results</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
