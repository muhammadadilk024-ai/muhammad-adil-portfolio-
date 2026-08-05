import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const contactEmail = 'muhammad.adilk024@gmail.com'

const contactItems = [
  {
    label: 'Email',
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: 'Muhammad Adil',
    href: 'https://www.linkedin.com/in/adil-khan-15aa61297/',
    icon: 'linkedin',
  },
  {
    label: 'Location',
    value: 'Canada / Remote Projects',
    href: '#contact',
    icon: 'location',
  },
]

const projectTypes = [
  'Business Website',
  'WordPress Fix',
  'Shopify Store',
  'Ecommerce Setup',
  'Landing Page',
  'Website Redesign',
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

function ContactIcon({ type }) {
  const common = 'h-6 w-6'

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path
          d="M4.5 7.5h15v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        <path
          d="M5.2 8.1l6.8 5.2l6.8-5.2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none">
        <path
          d="M7.2 10.2v7.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11.3 17.6v-4.1a3.1 3.1 0 0 1 6.2 0v4.1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7.2 6.9h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M5 3.8h14a1.2 1.2 0 0 1 1.2 1.2v14A1.2 1.2 0 0 1 19 20.2H5A1.2 1.2 0 0 1 3.8 19V5A1.2 1.2 0 0 1 5 3.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none">
      <path
        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.4a2.4 2.4 0 1 0 0-4.8a2.4 2.4 0 0 0 0 4.8Z"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  )
}

function ContactCard({ item, index }) {
  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
      initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        delay: 0.18 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-[1.45rem] border border-[#222222] bg-[#161616] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#c8f135]/45 hover:bg-[#181818]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#2a2a2a] transition duration-500 group-hover:bg-[#c8f135]" />
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#c8f135]/6 blur-2xl transition group-hover:bg-[#c8f135]/10" />

      <div className="relative flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#2a2a2a] bg-[#111111] text-[#c8f135] transition group-hover:border-[#c8f135]/40">
          <ContactIcon type={item.icon} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a9a9a]">
            {item.label}
          </p>
          <p className="mt-2 break-words text-sm font-semibold text-[#f0f0f0]">
            {item.value}
          </p>
        </div>
      </div>
    </motion.a>
  )
}

export default function ContactSection() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 95%', 'end start'],
  })

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    prefersReducedMotion ? [0, 0, 0] : [80, 0, -22]
  )

  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [70, -65]
  )

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#111111] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#111111]" />

        <motion.div
          style={{ y: glowY }}
          className="absolute left-[8%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[#c8f135]/5 blur-2xl"
        />

        <motion.div
          style={{ y: glowY }}
          className="absolute right-[10%] bottom-[10%] h-[24rem] w-[24rem] rounded-full bg-[#c8f135]/4 blur-2xl"
        />

        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(200,241,53,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(200,241,53,.16)_1px,transparent_1px)] [background-size:96px_96px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,transparent_0%,rgba(17,17,17,0.2)_38%,rgba(17,17,17,0.96)_100%)]" />
      </div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-7xl will-change-transform"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16, letterSpacing: '0.12em' }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 text-xs font-semibold uppercase text-[#c8f135] sm:text-sm"
            >
              Get In Touch
            </motion.p>

            <RevealText
              text="Let’s build your next website together"
              className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.065em] text-[#f0f0f0] sm:text-5xl lg:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-sm leading-7 text-[#d0d0d0] sm:text-base"
            >
              Have a project in mind, need a website redesign, or want help with
              WordPress, Shopify, ecommerce, or frontend work? Send me a message
              and I will get back to you.
            </motion.p>

            <div className="mt-8 grid gap-3">
              {contactItems.map((item, index) => (
                <ContactCard key={item.label} item={item} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 rounded-[1.45rem] border border-[#222222] bg-[#161616] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8f135]">
                Available For
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {projectTypes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#2a2a2a] bg-[#111111]/70 px-3 py-1.5 text-[11px] font-semibold text-[#d0d0d0]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(7px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-[#222222] bg-[#161616] p-5 shadow-[0_35px_110px_rgba(0,0,0,0.42)] sm:p-6 lg:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[#c8f135]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#c8f135]/7 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(200,241,53,0.04),transparent_42%)]" />

            <div className="relative mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8f135]">
                Project Form
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-[#f0f0f0] sm:text-3xl">
                Leave a message
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#b5b5b5]">
                This form sends your message directly to my Gmail inbox.
              </p>
            </div>

            <form
              action={`https://formsubmit.co/${contactEmail}`}
              method="POST"
              className="relative grid gap-5"
            >
              <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#f0f0f0]">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-14 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 text-sm text-[#f0f0f0] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#c8f135]/70"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#f0f0f0]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="h-14 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 text-sm text-[#f0f0f0] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#c8f135]/70"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#f0f0f0]">
                    Phone Number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 000 000 0000"
                    className="h-14 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 text-sm text-[#f0f0f0] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#c8f135]/70"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-[#f0f0f0]">
                    Project Type
                  </span>
                  <select
                    name="project_type"
                    defaultValue=""
                    className="h-14 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 text-sm text-[#d0d0d0] outline-none transition focus:border-[#c8f135]/70"
                  >
                    <option value="" disabled>
                      Select project type
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#f0f0f0]">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Project subject"
                  className="h-14 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 text-sm text-[#f0f0f0] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#c8f135]/70"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#f0f0f0]">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows="6"
                  placeholder="Tell me about your website or project..."
                  className="min-h-[160px] resize-y rounded-2xl border border-[#2a2a2a] bg-[#111111] px-4 py-4 text-sm leading-6 text-[#f0f0f0] outline-none transition placeholder:text-[#9a9a9a] focus:border-[#c8f135]/70"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#c8f135] px-7 py-3.5 text-sm font-bold text-black shadow-[0_18px_50px_rgba(200,241,53,0.14)] transition duration-300 hover:scale-[1.04] hover:bg-[#d8ff4d]"
              >
                Send Message
                <span>↗</span>
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}