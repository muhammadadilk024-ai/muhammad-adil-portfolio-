import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const profileImage = '/images/adil-about.jpg'

const proofStats = [
  ['4+', 'Years Experience'],
  ['50+', 'Projects Worked On'],
  ['20+', 'Client Projects'],
  ['8+', 'Core Skills'],
]

const journeyPoints = [
  'WordPress websites, Shopify stores, and custom development',
  'Website fixes, redesigns, and responsive improvements',
  'Custom features using PHP, JavaScript, React, and Node.js',
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

function StatBox({ value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: 0.55,
        delay: 0.12 + index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-3xl border border-[#222222] bg-[#161616] p-4 transition duration-500 hover:border-[#c8f135]/40"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#2a2a2a] transition duration-500 group-hover:bg-[#c8f135]" />

      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#c8f135]/6 blur-2xl" />

      <p className="relative text-3xl font-semibold tracking-[-0.06em] text-[#c8f135]">
        {value}
      </p>

      <p className="relative mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#b5b5b5]">
        {label}
      </p>
    </motion.div>
  )
}

export default function AboutJourney() {
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

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [110, 0, -35]
  )

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [70, -70]
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />

        <motion.div
          style={{ y: glowY }}
          className="absolute left-[7%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[#c8f135]/5 blur-2xl"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute right-[8%] bottom-[6%] h-[26rem] w-[26rem] rounded-full bg-[#c8f135]/4 blur-2xl"
        />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,transparent_0%,rgba(17,17,17,0.22)_38%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div style={{ y: contentY }} className="will-change-transform">
          <motion.p
            initial={{ opacity: 0, y: 16, letterSpacing: '0.12em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-xs font-semibold uppercase text-[#c8f135] sm:text-sm"
          >
            About Me
          </motion.p>

          <RevealText
            text="A developer shaped by real client work"
            className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-sm leading-7 text-[#d0d0d0] sm:text-base"
          >
            I&apos;m Muhammad Adil, a web developer with 4+ years of hands-on
            experience building, customizing, and improving websites for real
            clients. My work covers WordPress, Shopify, front-end development,
            PHP customization, React basics, and custom website features.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-xl text-sm leading-7 text-[#d0d0d0] sm:text-base"
          >
            I started learning web development at a young age and turned it into
            real project experience. Today, I focus on creating websites that are
            clean, responsive, easy to use, and built with proper attention to
            detail.
          </motion.p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {proofStats.map(([value, label], index) => (
              <StatBox key={label} value={value} label={label} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 rounded-[1.6rem] border border-[#222222] bg-[#161616] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.3)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8f135]">
              Current Focus
            </p>

            <div className="mt-4 grid gap-3">
              {journeyPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c8f135]/10 text-xs text-[#c8f135]">
                    ✓
                  </span>

                  <p className="text-sm leading-6 text-[#d0d0d0]">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, y: 50, scale: 0.96, filter: 'blur(7px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[520px] will-change-transform lg:ml-auto"
        >
          <motion.div
            className="pointer-events-none absolute -right-12 -top-12 hidden h-44 w-44 opacity-70 sm:block"
            initial={{ opacity: 0, x: 24, y: -18 }}
            whileInView={{ opacity: 0.7, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -10, 0],
                  }
            }
          >
            <div className="h-full w-full [background-image:radial-gradient(circle,rgba(200,241,53,0.75)_1.5px,transparent_1.7px)] [background-size:18px_18px]" />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute -left-10 bottom-16 hidden h-28 w-28 opacity-38 sm:block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.38, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 8, 0],
                  }
            }
          >
            <div className="h-full w-full [background-image:radial-gradient(circle,rgba(240,240,240,0.35)_1.4px,transparent_1.6px)] [background-size:16px_16px]" />
          </motion.div>

          <div className="absolute -inset-5 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_25%,rgba(200,241,53,0.12),rgba(200,241,53,0.05)_40%,transparent_72%)] blur-2xl" />

          <div className="group relative overflow-hidden rounded-[2rem] border border-[#222222] bg-[#161616] p-3 shadow-[0_35px_110px_rgba(0,0,0,0.45)]">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <img
                src={profileImage}
                alt="Muhammad Adil"
                loading="lazy"
                decoding="async"
                className="h-[440px] w-full scale-[1.13] object-cover object-[48%_36%] grayscale-[6%] contrast-[1.06] saturate-[0.96] transition duration-700 group-hover:scale-[1.17] sm:h-[520px]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(17,17,17,0.78)_100%)]" />

              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-[#222222] bg-[#111111]/78 p-4 backdrop-blur-sm">
                <p className="text-xl font-semibold tracking-[-0.04em] text-[#f0f0f0]">
                  Muhammad Adil
                </p>

                <p className="mt-1 text-sm text-[#c8f135]/80">
                  Web Developer
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-4 top-8 hidden rounded-2xl border border-[#c8f135]/20 bg-[#c8f135] px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:block"
          >
            4+ Years Experience
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-4 bottom-20 hidden rounded-2xl border border-[#222222] bg-[#161616] px-4 py-3 text-sm font-semibold text-[#c8f135] shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:block"
          >
            Partnered with Tech Joint Solution
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}