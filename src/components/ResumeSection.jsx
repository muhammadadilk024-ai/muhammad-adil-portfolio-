import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const resumeFile = '/files/adil-cv.pdf'

const journeyItems = [
  {
    period: '2021 – 2022',
    role: 'Foundation & Early Projects',
    context: 'Self-taught start',
    description:
      'Started learning web development and built my first WordPress websites with HTML, CSS, and responsive layouts.',
    points: ['WordPress', 'HTML / CSS', 'Responsive Design'],
  },
  {
    period: '2022 – 2024',
    role: 'Independent Client Developer',
    context: 'Freelance / client work',
    description:
      'Delivered WordPress and Shopify projects for real clients — stores, business sites, fixes, and custom features.',
    points: ['WordPress', 'Shopify', 'Client Projects', 'Custom Code'],
  },
  {
    period: '2024 – Present',
    role: 'Web Developer · Tech Joint Solution',
    context: 'Partnership role',
    description:
      'Working with Tech Joint Solution on structured client website projects, custom sections, and ongoing improvements.',
    points: ['Client Delivery', 'WordPress', 'Shopify', 'UI Improvements'],
  },
]

const resumeHighlights = [
  ['4+', 'Years Experience'],
  ['50+', 'Projects Worked On'],
  ['20+', 'Client Projects'],
  ['8+', 'Core Skills'],
]

const resumeSkills = [
  'WordPress',
  'Elementor',
  'Shopify',
  'HTML / CSS',
  'JavaScript',
  'PHP',
  'React.js',
  'Node.js',
]

function RevealText({ text, className = '' }) {
  const words = text.split(' ')

  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
          },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${word}-${char}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 28,
                  rotateX: -45,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.h2>
  )
}

function JourneyCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.6,
        delay: 0.08 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex h-full flex-col rounded-[1.35rem] border border-[#222222] bg-[#141414] p-5 transition duration-300 hover:border-[#c8f135]/30"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c8f135]/30 bg-[#c8f135]/10 text-[11px] font-bold text-[#c8f135]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="rounded-full border border-[#2a2a2a] bg-[#111111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c8f135]">
          {item.period}
        </span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c2c2c2]">
        {item.context}
      </p>

      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.04em] text-[#f0f0f0]">
        {item.role}
      </h3>

      <p className="mt-3 flex-1 text-[15px] leading-7 text-[#d0d0d0]">{item.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-[#2a2a2a] pt-4">
        {item.points.map((point) => (
          <span
            key={point}
            className="rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1 text-[11px] font-semibold text-[#c2c2c2]"
          >
            {point}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function ResumeSection() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 95%', 'end start'],
  })

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [80, 0, -24]
  )

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [70, -70]
  )

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />

        <motion.div
          style={{ y: glowY }}
          className="absolute left-[6%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[#c8f135]/5 blur-2xl"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute right-[8%] bottom-[8%] h-[26rem] w-[26rem] rounded-full bg-[#c8f135]/4 blur-2xl"
        />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,transparent_0%,rgba(17,17,17,0.2)_38%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-7xl will-change-transform"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16, letterSpacing: '0.12em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-xs font-semibold uppercase text-[#c8f135] sm:text-sm"
          >
            My Resume
          </motion.p>

          <RevealText
            text="Experience built through real client projects"
            className="text-4xl font-semibold leading-[1.05] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#d0d0d0] sm:text-[17px] sm:leading-8"
          >
            A structured look at how my work grew from early projects into
            independent client delivery and my current partnership role.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#c8f135] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_36px_rgba(200,241,53,0.14)] transition hover:scale-[1.03] hover:bg-[#d8ff4d]"
            >
              Download CV
              <span>↓</span>
            </a>

            <a
              href="mailto:muhammad.adilk024@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#dfdfdf] transition hover:border-[#c8f135]/50 hover:text-[#c8f135]"
            >
              Email Me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {resumeHighlights.map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-[#222222] bg-[#141414] px-4 py-4 text-center"
            >
              <p className="text-2xl font-semibold tracking-[-0.05em] text-[#c8f135] sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#c2c2c2]">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8f135]">
              Career Journey
            </p>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#c2c2c2]">
              2021 — Present
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {journeyItems.map((item, index) => (
              <JourneyCard key={item.period} item={item} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-[1.35rem] border border-[#222222] bg-[#141414] px-5 py-4"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c8f135]">
            Core Stack
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {resumeSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1.5 text-xs font-semibold text-[#c2c2c2] transition hover:border-[#c8f135]/35 hover:text-[#c8f135]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
