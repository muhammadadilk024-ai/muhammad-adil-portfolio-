import { motion, useReducedMotion } from 'framer-motion'

const profileImage = '/images/adil-about.jpg'
const resumeFile = '/files/adil-cv.pdf'
const ease = [0.16, 1, 0.3, 1]

const journey = [
  {
    period: '2021 — 2022',
    label: 'Learning by building',
    title: 'The starting point',
    description: 'Started with WordPress and front end fundamentals, then went deeper into PHP, JavaScript, Python and Java.',
    accent: '#8f7fff',
  },
  {
    period: '2023 — Present',
    label: 'Independent client work',
    title: 'From practice to real projects',
    description: 'Built websites, ecommerce stores and custom-coded WordPress plugins (roles, multilingual, listings) for businesses across different industries.',
    accent: '#8f7fff',
  },
  {
    period: '2024 — Present',
    label: 'Tech Joint Solution · Calgary',
    title: 'Full stack developer',
    description: 'Building client websites in Laravel and WordPress at a Calgary web agency, as part of the team and as the solo developer on projects like BC Scrap Cars, Medaan and Beauty Supply Call.',
    accent: '#8f7fff',
  },
  {
    period: 'Now',
    label: 'AI and mobile',
    title: 'Building KnowWhere',
    description: 'A voice-first memory app with Flutter, Kotlin, Gemini Live and a secure Cloudflare backend, built to learn what production-grade mobile and AI really takes.',
    accent: '#fe9d4a',
  },
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
        className="absolute -left-[5px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#121217] transition duration-300 group-hover:scale-125"
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
      className="relative -mt-px overflow-hidden bg-[#121217] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[20%] top-0 h-[30rem] w-[30rem] rounded-full bg-[#8f7fff]/6 blur-[170px]" />
        <div className="absolute -right-52 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#8f7fff]/5 blur-[170px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_76%_65%_at_50%_42%,black,transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,23,.06),rgba(18,18,23,.62))]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduceMotion ? 0 : 0.68, ease }}
          className="border-b border-white/10 pb-7"
        >
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.27em] text-[#8f7fff]">
              About and Experience
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.03] tracking-[-0.05em] sm:text-5xl">
              A short story, backed by real work.
            </h2>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.76, ease }}
            className="lg:col-span-4"
          >
            <div className="group relative mx-auto max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d11] shadow-[0_26px_80px_rgba(0,0,0,.3)] lg:mx-0">
              <img
                src={profileImage}
                alt="Muhammad Adil"
                loading="lazy"
                decoding="async"
                className="h-[470px] w-full object-cover object-[50%_35%] transition duration-700 group-hover:scale-[1.02] sm:h-[560px] lg:h-[520px] xl:h-[560px]"
              />
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
              I&apos;m Muhammad Adil, a full-stack developer in Canada with 5 years of experience building web platforms, mobile apps and AI-powered products.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.16, ease }}
              className="mt-5 text-sm leading-7 text-white/50 sm:text-[15px]"
            >
              I learn fast and ship end to end, from design and database to deployment. I use AI-assisted engineering to move quickly, and I check the result with builds, tests and careful review before anything goes live.
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.2, ease }}
              className="mt-4 text-sm leading-7 text-white/50 sm:text-[15px]"
            >
              I&apos;m open to remote roles in Canada and the US, and to client projects of any size.
            </motion.p>

            <motion.div
              id="resume"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.22, ease }}
              className="scroll-mt-28"
            >
              <a
                href={resumeFile}
                download="Muhammad-Adil-Resume.pdf"
                className="group mt-8 inline-flex items-center gap-3 border-b border-[#8f7fff] pb-1.5 text-sm font-medium text-[#a99dff] transition hover:text-[#c2baff]"
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
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f7fff]">My journey</p>
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
