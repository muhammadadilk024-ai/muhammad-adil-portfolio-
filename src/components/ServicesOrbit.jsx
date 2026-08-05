import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'WordPress Development',
    text: 'Custom WordPress websites using Elementor, themes, plugins, PHP customization, and clean responsive layouts.',
    tags: ['WordPress', 'Elementor', 'PHP'],
    icon: 'wordpress',
  },
  {
    number: '02',
    title: 'Custom Web Development',
    text: 'Custom-coded sections, pages, and web features using HTML, CSS, JavaScript, React, Node.js, and PHP.',
    tags: ['React', 'Node', 'JavaScript'],
    icon: 'frontend',
  },
  {
    number: '03',
    title: 'Shopify Development',
    text: 'Shopify store setup, theme customization, product pages, sections, design improvements, and payment-ready store structure.',
    tags: ['Shopify', 'Store Setup', 'Theme Edit'],
    icon: 'shopify',
  },
  {
    number: '04',
    title: 'Website Troubleshooting',
    text: 'Fixing broken layouts, mobile issues, plugin conflicts, form errors, speed problems, and WordPress bugs.',
    tags: ['Bug Fixing', 'Debugging', 'Support'],
    icon: 'fixes',
  },
  {
    number: '05',
    title: 'Custom Features & Integrations',
    text: 'Adding custom forms, payment gateways, booking flows, API integrations, dashboards, and website functionality.',
    tags: ['API', 'Forms', 'Payments'],
    icon: 'ecommerce',
  },
  {
    number: '06',
    title: 'Website Redesign & UI Improvement',
    text: 'Improving old websites with better layout, modern sections, cleaner spacing, responsive design, and better user experience.',
    tags: ['UI Design', 'Redesign', 'Responsive'],
    icon: 'maintenance',
  },
]

function ServiceIcon({ type }) {
  const common = 'h-7 w-7'

  const icons = {
    wordpress: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M4.2 12a7.8 7.8 0 1 0 15.6 0a7.8 7.8 0 0 0-15.6 0Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.2 8.2h2.2l2.1 7.1l1.7-5.2l-.6-1.9h2.1l2.1 7.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shopify: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M7.4 9.2h9.2l-.7 9.1a2 2 0 0 1-2 1.8H10a2 2 0 0 1-2-1.8L7.4 9.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.2 9.2V7.8a2.8 2.8 0 0 1 5.6 0v1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 13.2c.7.7 2.8.8 3.5.2c.6-.5.3-1.4-.8-1.7l-1.2-.3c-1.1-.3-1.4-1.3-.7-1.9c.8-.7 2.6-.5 3.3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    frontend: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M9 8l-4 4l4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8l4 4l-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5 6.5l-3 11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
    maintenance: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M14.5 6.5l3 3l-8.9 8.9H5.5v-3.1l9-8.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M13.2 7.8l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6.4 6.2h4.2M6.4 9.4h2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    ecommerce: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M6.3 8.5h12l-1 7.2a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.7l-.9-7.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.3 8.5a2.8 2.8 0 0 1 5.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 12.8h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    fixes: (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path d="M15.8 5.8a4.2 4.2 0 0 0-5.1 5.1l-5.2 5.2a2 2 0 0 0 2.8 2.8l5.2-5.2a4.2 4.2 0 0 0 5.1-5.1l-2.7 2.7l-2.8-2.8l2.7-2.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  }

  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.15rem] bg-gradient-to-br from-[#c8f135] via-[#d4f94a] to-[#a8d42a] text-black shadow-[0_0_0_1px_rgba(200,241,53,0.35),0_16px_40px_rgba(200,241,53,0.18)] transition duration-500 group-hover:scale-105 group-hover:shadow-[0_0_0_1px_rgba(200,241,53,0.55),0_20px_50px_rgba(200,241,53,0.28)]">
      <div className="absolute inset-[1px] rounded-[1.05rem] bg-gradient-to-br from-white/25 to-transparent" />
      <div className="relative">{icons[type]}</div>
    </div>
  )
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
              key={`${char}-${charIndex}`}
              className="inline-block"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 34,
                  rotateX: -55,
                  filter: 'blur(6px)',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.55,
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

function ServiceCard({ service, index, progress }) {
  const prefersReducedMotion = useReducedMotion()

  const start = 0.1 + index * 0.055
  const end = start + 0.28

  const y = useTransform(
    progress,
    [start, end],
    prefersReducedMotion ? [0, 0] : [90, 0]
  )

  const opacity = useTransform(progress, [start, end], [0, 1])

  const scale = useTransform(
    progress,
    [start, end],
    prefersReducedMotion ? [1, 1] : [0.95, 1]
  )

  return (
    <motion.article
      style={{ y, opacity, scale }}
      className="group relative flex min-h-[17.5rem] flex-col rounded-[1.75rem] border border-[#2a2a2a]/80 bg-[linear-gradient(160deg,#1a1a1a_0%,#141414_55%,#111111_100%)] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-2 hover:border-[#c8f135]/30 will-change-transform"
    >
      <div className="relative flex h-full flex-col rounded-[1.7rem] bg-[#151515] p-6 sm:p-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-4 select-none text-[4.5rem] font-bold leading-none tracking-[-0.08em] text-[#c8f135]/[0.05] transition duration-500 group-hover:text-[#c8f135]/[0.09]"
        >
          {service.number}
        </span>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8f135]/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c8f135]/8 blur-3xl transition duration-700 group-hover:bg-[#c8f135]/14" />

        <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] bg-[radial-gradient(circle_at_0%_0%,rgba(200,241,53,0.07),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative mb-5 flex items-start justify-between gap-4">
          <ServiceIcon type={service.icon} />

          <span className="shrink-0 rounded-full border border-[#c8f135]/25 bg-[#c8f135]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c8f135]">
            {service.number}
          </span>
        </div>

        <h3 className="relative text-lg font-semibold tracking-[-0.04em] text-[#f0f0f0] transition duration-300 group-hover:text-white sm:text-xl">
          {service.title}
        </h3>

        <p className="relative mt-3 flex-1 text-[13px] leading-6 text-[#c2c2c2] transition duration-300 group-hover:text-[#d8d8d8] sm:text-sm sm:leading-[1.65]">
          {service.text}
        </p>

        <div className="relative mt-5 border-t border-[#222222] pt-4">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2a2a2a] bg-[#111111] px-3 py-1 text-[10px] font-semibold text-[#d0d0d0] transition duration-300 group-hover:border-[#c8f135]/30 group-hover:bg-[#c8f135]/[0.06] group-hover:text-[#c8f135]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function ServicesOrbit() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 96%', 'end start'],
  })

  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.36, 1],
    prefersReducedMotion ? [0, 0, 0] : [105, 0, -24]
  )

  const headingOpacity = useTransform(scrollYProgress, [0, 0.16, 0.92], [0, 1, 1])

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [95, -80]
  )

  const lineWidth = useTransform(scrollYProgress, [0.04, 0.45], ['0%', '100%'])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />

        <motion.div
          style={{ y: glowY }}
          className="absolute left-1/2 top-[-8%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[#c8f135]/5 blur-2xl"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute right-[7%] top-[24%] h-[22rem] w-[22rem] rounded-full bg-[#c8f135]/4 blur-2xl"
        />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_2%,transparent_0%,rgba(17,17,17,0.22)_34%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <motion.div
        style={{
          y: sectionY,
          opacity: headingOpacity,
        }}
        className="relative z-10 mx-auto max-w-7xl will-change-transform"
      >
        <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 18, letterSpacing: '0.12em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.34em' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-xs font-semibold uppercase text-[#c8f135] sm:text-sm"
          >
            My Services
          </motion.p>

          <RevealText
            text="Practical web development services for real projects"
            className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#d0d0d0] sm:text-base sm:leading-8"
          >
            I focus on the services that clients actually need: building websites,
            fixing technical issues, improving design, adding custom features, and
            making websites work better on every device.
          </motion.p>

          <div className="mx-auto mt-7 h-px max-w-xl overflow-hidden bg-[#2a2a2a]">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-transparent via-[#c8f135] to-transparent"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}