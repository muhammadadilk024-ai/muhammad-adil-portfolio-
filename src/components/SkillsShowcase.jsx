import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const skills = [
  {
    name: 'WordPress Development',
    value: '92%',
    icon: 'wordpress',
  },
  {
    name: 'Shopify Development',
    value: '86%',
    icon: 'shopify',
  },
  {
    name: 'Elementor / Page Builders',
    value: '90%',
    icon: 'elementor',
  },
  {
    name: 'HTML & CSS',
    value: '91%',
    icon: 'htmlcss',
  },
  {
    name: 'JavaScript',
    value: '82%',
    icon: 'js',
  },
  {
    name: 'PHP Development',
    value: '76%',
    icon: 'php',
  },
  {
    name: 'React.js',
    value: '78%',
    icon: 'react',
  },
  {
    name: 'Figma to Website',
    value: '88%',
    icon: 'figma',
  },
]

function SkillIcon({ type }) {
    if (type === 'wordpress') {
      return (
        <svg viewBox="0 0 32 32" className="h-11 w-11" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#21759B" strokeWidth="2.6" />
          <path
            d="M8.8 11.2h3l3.1 10.1l2.4-7.2l-.9-2.9h3l3 10.1"
            stroke="#21759B"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  
    if (type === 'elementor') {
      return (
        <svg viewBox="0 0 32 32" className="h-11 w-11" fill="none">
          <circle cx="16" cy="16" r="13" fill="#92003B" />
          <path
            d="M11 10v12M15 10h7M15 16h7M15 22h7"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  
    if (type === 'shopify') {
      return (
        <svg viewBox="0 0 32 32" className="h-11 w-11" fill="none">
          <path
            d="M9.6 11.8h12.8l-1.1 12.4a2.5 2.5 0 0 1-2.5 2.3h-5.6a2.5 2.5 0 0 1-2.5-2.3L9.6 11.8Z"
            fill="#95BF47"
          />
          <path
            d="M12.9 11.8V9.7a3.1 3.1 0 0 1 6.2 0v2.1"
            stroke="#5E8E3E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M14.2 18.5c.7.7 2.8.8 3.5.2c.6-.5.2-1.3-.8-1.6l-1.1-.3c-1-.3-1.4-1.2-.7-1.8c.8-.7 2.4-.5 3.1.1"
            stroke="#ffffff"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  
    if (type === 'react') {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#61DAFB] text-lg font-black text-[#111827]">
          R
        </div>
      )
    }

    if (type === 'htmlcss') {
      return (
        <div className="relative flex h-11 w-11 overflow-hidden rounded-2xl">
          <div className="flex flex-1 items-center justify-center bg-[#E44D26] text-[9px] font-black text-white">
            H
          </div>
          <div className="flex flex-1 items-center justify-center bg-[#264DE4] text-[9px] font-black text-white">
            C
          </div>
        </div>
      )
    }
  
    if (type === 'js') {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7DF1E] text-lg font-black text-[#111827]">
          JS
        </div>
      )
    }
  
    if (type === 'php') {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#777BB4] text-sm font-black text-white">
          PHP
        </div>
      )
    }
  
    if (type === 'figma') {
      return (
        <svg viewBox="0 0 32 32" className="h-11 w-11">
          <circle cx="12" cy="8" r="5" fill="#F24E1E" />
          <circle cx="20" cy="8" r="5" fill="#FF7262" />
          <circle cx="12" cy="16" r="5" fill="#A259FF" />
          <circle cx="20" cy="16" r="5" fill="#1ABCFE" />
          <circle cx="12" cy="24" r="5" fill="#0ACF83" />
        </svg>
      )
    }
  
    return null
  }

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

function SkillCard({ skill, index }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 55,
        scale: 0.94,
        filter: 'blur(6px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.68,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-[1.55rem] border border-[#222222] bg-[#161616] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.34)] transition duration-500 hover:-translate-y-1.5 hover:border-[#c8f135]/40 hover:bg-[#181818] will-change-transform"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#2a2a2a] transition duration-500 group-hover:bg-[#c8f135]" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c8f135]/6 blur-2xl transition duration-500 group-hover:bg-[#c8f135]/10" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(200,241,53,0.035),transparent_48%)]" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#222222] bg-[#111111]">
          <SkillIcon type={skill.icon} />
        </div>

        <span className="rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#c8f135]">
          {skill.value}
        </span>
      </div>

      <h3 className="relative mt-5 text-xl font-semibold tracking-[-0.045em] text-[#f0f0f0]">
        {skill.name}
      </h3>

      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-[#222222]">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: skill.value }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.9,
            delay: 0.12 + index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#c8f135] via-[#d8ff4d] to-[#f0f0f0]"
        />
      </div>
    </motion.article>
  )
}

export default function SkillsShowcase() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 95%', 'end start'],
  })

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [70, 0, -20]
  )

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [70, -60]
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />

        <motion.div
          style={{ y: glowY }}
          className="absolute left-[10%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-[#c8f135]/5 blur-2xl"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute right-[8%] bottom-[10%] h-[26rem] w-[26rem] rounded-full bg-[#c8f135]/4 blur-2xl"
        />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,transparent_0%,rgba(17,17,17,0.22)_36%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto grid max-w-7xl gap-10 will-change-transform lg:grid-cols-[0.85fr_1.35fr] lg:items-center"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16, letterSpacing: '0.12em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-xs font-semibold uppercase text-[#c8f135] sm:text-sm"
          >
            My Skills
          </motion.p>

          <RevealText
            text="A focused skill set for modern web development"
            className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-sm leading-7 text-[#d0d0d0] sm:text-base"
          >
            I work with the main tools and technologies needed to build, customize,
            fix, and improve real client websites.
          </motion.p>

          <div className="mt-7 flex flex-wrap gap-2">
            {['WordPress', 'Shopify', 'Custom Code', 'Frontend'].map((item) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.45 }}
                className="rounded-full border border-[#2a2a2a] bg-[#161616] px-4 py-2 text-xs font-semibold text-[#d0d0d0] transition hover:border-[#c8f135]/35 hover:text-[#c8f135]"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}