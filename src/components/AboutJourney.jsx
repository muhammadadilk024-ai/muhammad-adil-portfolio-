import { motion, useReducedMotion } from 'framer-motion'

const profileImage = '/images/adil-about.jpg'
const resumeFile = '/files/adil-cv.pdf'
const ease = [0.16, 1, 0.3, 1]

const journey = [
  {
    period: '2021 — 2022',
    label: 'Learning by building',
    title: 'The starting point',
    description: 'Built my first WordPress sites and learned responsive design through real practice.',
    accent: '#8f7fff',
  },
  {
    period: '2023 — Present',
    label: 'Independent client work',
    title: 'From practice to real projects',
    description: 'Building websites, online stores and custom features for businesses in different industries.',
    accent: '#fe9d4a',
  },
  {
    period: '2024 — Present',
    label: 'Tech Joint Solution',
    title: 'Project based web developer',
    description: 'Delivering client websites, custom sections, technical fixes and successful launches.',
    accent: '#8f7fff',
  },
]

const quickFacts = [
  ['Based in', 'Windsor, Ontario'],
  ['Main focus', 'Websites, stores and web apps'],
  ['Working style', 'Clear, practical and reliable'],
]

function TimelineItem({ item, index, reduceMotion }) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.12 + index * 0.1, ease }}
      className="group relative pb-8 pl-7 last:pb-0"
    >
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#151319] transition duration-300 group-hover:scale-125"
        style={{ backgroundColor: item.accent, boxShadow: `0 0 18px ${item.accent}88` }}
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: item.accent }}>
          {item.period}
        </p>
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/30">{item.label}</span>
      </div>
      <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.025em] text-white/90">{item.title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">{item.description}</p>
    </motion.li>
  )
}

export default function AboutJourney() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative -mt-px overflow-hidden bg-[#151319] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-8 h-[34rem] w-[34rem] rounded-full bg-[#8f7fff]/8 blur-[150px]" />
        <div className="absolute -right-52 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#fe9d4a]/7 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_76%_65%_at_50%_42%,black,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,19,25,.15),rgba(21,19,25,.72))]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.68, ease }}
          className="flex flex-col justify-between gap-6 border-b border-white/10 pb-7 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.27em] text-[#8f7fff]">
              About and Experience
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.02] tracking-[-0.052em] sm:text-5xl lg:text-6xl">
              A short story, backed by real work.
            </h2>
          </div>
          <span className="hidden pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/28 sm:block">
            01 — Profile
          </span>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.76, ease }}
            className="lg:col-span-4"
          >
            <div className="group relative mx-auto max-w-[440px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0f0e12] p-2 shadow-[0_30px_90px_rgba(0,0,0,.34)] lg:mx-0">
              <div className="relative overflow-hidden rounded-[1rem]">
                <img
                  src={profileImage}
                  alt="Muhammad Adil"
                  loading="lazy"
                  decoding="async"
                  className="h-[470px] w-full object-cover object-[50%_35%] grayscale-[5%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0 sm:h-[560px] lg:h-[520px] xl:h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e12]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.035em]">Muhammad Adil</p>
                    <p className="mt-1 text-xs text-white/48">Full Stack Web Developer</p>
                  </div>
                  <span className="rounded-full border border-[#8f7fff]/35 bg-[#8f7fff]/12 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#b7adff] backdrop-blur-md">
                    Windsor, ON
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-4 lg:pt-2">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.08, ease }}
              className="text-lg leading-8 tracking-[-0.02em] text-white/78"
            >
              I&apos;m Muhammad Adil, a self taught developer who learned by building and kept growing through real client work.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.16, ease }}
              className="mt-5 text-sm leading-7 text-white/50 sm:text-[15px]"
            >
              I work across design, development and launch, but the goal stays simple: make something useful, clear and dependable for the client.
            </motion.p>

            <motion.dl
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.22, ease }}
              className="mt-7 divide-y divide-white/8 border-y border-white/8"
            >
              {quickFacts.map(([label, value], index) => (
                <div key={label} className="flex items-center justify-between gap-5 py-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/28">{label}</dt>
                  <dd className="max-w-[66%] text-right text-sm text-white/68">{value}</dd>
                  <span className="sr-only">{index + 1}</span>
                </div>
              ))}
            </motion.dl>

            <motion.div
              id="resume"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.28, ease }}
              className="scroll-mt-28"
            >
              <a
                href={resumeFile}
                download="Muhammad-Adil-Resume.pdf"
                className="group mt-7 inline-flex items-center gap-3 rounded-md border border-[#8f7fff]/45 bg-[#8f7fff]/12 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition duration-300 hover:border-[#8f7fff] hover:bg-[#8f7fff]/22"
              >
                Download resume
                <span className="text-[#8f7fff] transition-transform group-hover:translate-y-0.5" aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:pt-2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.08, ease }}
              className="mb-6 flex items-center justify-between gap-4"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fe9d4a]">My journey</p>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/26">2021 — Today</span>
            </motion.div>

            <ol className="relative ml-1 border-l border-white/12">
              {journey.map((item, index) => (
                <TimelineItem key={`${item.period}-${item.title}`} item={item} index={index} reduceMotion={reduceMotion} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
