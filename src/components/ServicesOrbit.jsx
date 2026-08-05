import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'Web Development',
    shortTitle: 'Web',
    tagline: 'Custom coded and WordPress websites',
    description:
      'Responsive business websites and web platforms built around your goals, using custom code or WordPress with clean functionality and room to grow.',
    deliverables: ['Custom websites', 'WordPress development', 'Frontend and backend'],
    icon: 'web',
    image: '/services/web-development-20260806.webp',
    accent: '#8b7cff',
    glow: 'rgba(139, 124, 255, 0.22)',
  },
  {
    number: '02',
    title: 'Ecommerce Development',
    shortTitle: 'Ecommerce',
    tagline: 'Online stores built for simple buying',
    description:
      'Complete ecommerce websites with organized products, secure payments, customer accounts, shipping rules and a smooth shopping experience on every device.',
    deliverables: ['WooCommerce', 'Payment gateways', 'Product systems'],
    icon: 'commerce',
    image: '/services/ecommerce-development-20260806.webp',
    accent: '#ff9568',
    glow: 'rgba(255, 149, 104, 0.2)',
  },
  {
    number: '03',
    title: 'Shopify Development',
    shortTitle: 'Shopify',
    tagline: 'Professional Shopify stores ready to sell',
    description:
      'Shopify stores with custom theme sections, product setup, conversion focused pages, useful apps, payment configuration and complete launch support.',
    deliverables: ['Store setup', 'Theme customization', 'Shopify apps'],
    icon: 'shopify',
    image: '/services/shopify-development-20260806.webp',
    accent: '#9bc45a',
    glow: 'rgba(155, 196, 90, 0.18)',
  },
  {
    number: '04',
    title: 'AI Integration and Automation',
    shortTitle: 'AI Integration',
    tagline: 'Useful AI connected to real workflows',
    description:
      'AI features connected to your website or product, including assistants, smart search, content workflows, business automation and external AI services.',
    deliverables: ['AI assistants', 'API integration', 'Workflow automation'],
    icon: 'ai',
    image: '/services/ai-integration-20260806.webp',
    accent: '#66a8ff',
    glow: 'rgba(102, 168, 255, 0.2)',
  },
  {
    number: '05',
    title: 'UI and UX Design',
    shortTitle: 'UI and UX',
    tagline: 'Clear interfaces shaped around the user',
    description:
      'User journeys, wireframes, responsive interfaces and design systems that make websites, apps and digital products easier to understand and use.',
    deliverables: ['User flows', 'Wireframes', 'Interactive prototypes'],
    icon: 'design',
    image: '/services/ui-ux-design-20260806.webp',
    accent: '#d98cff',
    glow: 'rgba(217, 140, 255, 0.2)',
  },
  {
    number: '06',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Cross platform apps for iOS and Android',
    description:
      'Mobile applications connected to reliable APIs, designed for smooth everyday use and developed to feel consistent across phones and tablets.',
    deliverables: ['React Native', 'iOS and Android', 'API connectivity'],
    icon: 'mobile',
    image: '/services/mobile-apps-20260806.webp',
    accent: '#f1bd6a',
    glow: 'rgba(241, 189, 106, 0.19)',
  },
]

const ease = [0.16, 1, 0.3, 1]

function ServiceIcon({ type }) {
  const iconClass = 'h-6 w-6'
  const icons = {
    web: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 9h17M7 6.8h.01M10 6.8h.01M8.5 13l-2 2l2 2M15.5 13l2 2l-2 2M13.4 12l-2.8 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    commerce: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M4 5h2l1.5 9.2a2 2 0 0 0 2 1.7h7.2a2 2 0 0 0 1.9-1.5L20 8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 10 20ZM17 20a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 17 20Z" fill="currentColor" />
      </svg>
    ),
    shopify: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M7.3 9.2h9.4l-.7 9.1a2 2 0 0 1-2 1.8h-4a2 2 0 0 1-2-1.8l-.7-9.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.3 9.2V7.7a2.7 2.7 0 0 1 5.4 0v1.5M14.7 12.1c-.7-.7-3.1-.8-3.5.4c-.5 1.5 3.5 1 3 3c-.4 1.5-3.2 1.1-3.8.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M12 3.5l1.3 4.2a4.3 4.3 0 0 0 3 3L20.5 12l-4.2 1.3a4.3 4.3 0 0 0-3 3L12 20.5l-1.3-4.2a4.3 4.3 0 0 0-3-3L3.5 12l4.2-1.3a4.3 4.3 0 0 0 3-3L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M18.2 3.7l.5 1.5a1.5 1.5 0 0 0 1.1 1.1l1.5.5l-1.5.5a1.5 1.5 0 0 0-1.1 1.1l-.5 1.5l-.5-1.5a1.5 1.5 0 0 0-1.1-1.1l-1.5-.5l1.5-.5a1.5 1.5 0 0 0 1.1-1.1l.5-1.5Z" fill="currentColor" />
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M4 18.5l4.2-.9l9.7-9.7a2.1 2.1 0 0 0-3-3l-9.7 9.7L4 18.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M13.5 6.3l4.2 4.2M4.8 14.9l4.2 4.2M12.5 19.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 5.6h4M10.8 18.2h2.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  }

  return icons[type]
}

function ServiceBackdrop({ image, accent }) {
  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden="true">
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d11]/95 via-[#0d0d11]/72 to-[#0d0d11]/22" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/16 to-black/15" />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background: `radial-gradient(120% 90% at 18% 100%, ${accent}55 0%, transparent 62%)`,
        }}
      />
    </div>
  )
}

function ServicePanel({ service, index, active, onSelect, reduceMotion }) {
  const duration = reduceMotion ? 0 : 0.62

  return (
    <motion.article
      layout={reduceMotion ? false : 'size'}
      onMouseEnter={() => onSelect(index)}
      initial={reduceMotion ? false : { opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.72,
        delay: reduceMotion ? 0 : index * 0.07,
        ease,
        layout: { duration: reduceMotion ? 0 : 0.42, ease },
      }}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-[1.35rem] border outline-none transition-[flex,border-color,box-shadow] md:h-[470px] md:min-h-0 md:w-auto ${
        active
          ? 'min-h-[410px] md:flex-[5.5]'
          : 'h-[82px] min-h-[82px] md:flex-[0.82]'
      }`}
      style={{
        borderColor: active ? `${service.accent}66` : 'rgba(255,255,255,0.1)',
        background: active
          ? `linear-gradient(145deg, ${service.accent}18 0%, rgba(22,22,28,0.98) 38%, rgba(13,13,17,1) 100%)`
          : 'linear-gradient(160deg, rgba(24,24,30,0.96), rgba(14,14,18,0.98))',
        boxShadow: active
          ? `0 30px 90px rgba(0,0,0,0.42), 0 0 65px ${service.glow}`
          : '0 18px 50px rgba(0,0,0,0.26)',
        transitionDuration: `${duration}s`,
      }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.72 }}
        transition={{ duration, ease }}
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full blur-[95px]"
        style={{ backgroundColor: service.glow }}
      />

      <motion.div
        aria-hidden="true"
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration, ease }}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.06 }}
        transition={{ duration: reduceMotion ? 0 : 0.62, ease }}
        className="pointer-events-none absolute inset-0 will-change-[opacity,transform]"
      >
        <ServiceBackdrop image={service.image} accent={service.accent} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d0d11]/30 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col md:flex-row">
        <button
          type="button"
          aria-expanded={active}
          aria-label={`${service.title}. ${active ? 'Expanded' : 'Open service details'}`}
          onClick={() => onSelect(index)}
          onFocus={() => onSelect(index)}
          className="flex h-[82px] shrink-0 items-center gap-4 border-b border-white/8 px-4 text-left outline-none focus-visible:bg-white/[0.035] md:h-full md:w-[76px] md:flex-col md:justify-between md:border-b-0 md:border-r md:px-0 md:py-5"
        >
          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: active ? 0 : -5,
                    scale: active ? 1.08 : 1,
                  }
            }
            transition={{ duration: 0.45, ease }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
            style={{
              color: service.accent,
              borderColor: `${service.accent}55`,
              backgroundColor: `${service.accent}15`,
              boxShadow: active ? `0 12px 34px ${service.glow}` : 'none',
            }}
          >
            <ServiceIcon type={service.icon} />
          </motion.span>

          <AnimatePresence initial={false}>
            {!active && (
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.28 }}
                className="min-w-0 flex-1 truncate text-left text-sm font-semibold text-white/66 md:flex-none md:[writing-mode:vertical-rl] md:rotate-180 md:overflow-visible"
              >
                {service.shortTitle}
              </motion.span>
            )}
          </AnimatePresence>

          <span className="ml-auto font-mono text-[10px] font-semibold tracking-[0.16em] md:ml-0" style={{ color: service.accent }}>
            {service.number}
          </span>
        </button>

        <AnimatePresence initial={false} mode="wait">
          {active && (
            <motion.div
              key={service.number}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.05, ease }}
              className="flex min-w-0 flex-1 flex-col justify-between p-6 sm:p-7 md:p-8 lg:p-9"
            >
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: service.accent }}>
                  Service {service.number}
                </p>
                <h3 className="mt-4 max-w-xl text-3xl font-medium leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-[2.7rem]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-lg text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
                  {service.tagline}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-[15px]">
                  {service.description}
                </p>
              </div>

              <div className="mt-7">
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.22 + itemIndex * 0.06 }}
                      className="rounded-full border bg-black/20 px-3 py-1.5 text-[10px] font-medium text-white/65"
                      style={{ borderColor: `${service.accent}3d` }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(event) => event.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-white transition hover:gap-4"
                >
                  Discuss this service
                  <span className="grid h-8 w-8 place-items-center rounded-full text-[#0b0b0f]" style={{ backgroundColor: service.accent }} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function ServicesOrbit() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const current = services[active]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headingY = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    reduceMotion ? [0, 0, 0] : [70, 0, -24],
  )
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [110, -100],
  )
  const progressScale = (active + 1) / services.length

  const heading = 'Everything needed to build a complete digital product.'

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative -mt-px overflow-hidden bg-[#0d0d11] px-4 py-24 text-[#f7f5fb] sm:px-7 md:py-32 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: glowY, backgroundColor: current.glow }}
          className="absolute left-[58%] top-[4%] h-[34rem] w-[34rem] rounded-full blur-[150px] transition-colors duration-700"
        />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(13,13,17,.28)_42%,#0d0d11_92%)]" />
      </div>

      <motion.div style={{ y: headingY }} className="relative mx-auto max-w-[1400px] will-change-transform">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.65, ease }}
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em]"
              style={{ color: current.accent }}
            >
              Services · Complete Digital Delivery
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.55 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055 } },
              }}
              className="mt-4 max-w-4xl text-4xl font-light leading-[1.02] tracking-[-0.052em] sm:text-5xl lg:text-6xl"
            >
              {heading.split(' ').map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={{
                    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, filter: 'blur(7px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.58, ease } },
                  }}
                  className="mr-[0.24em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.38, ease }}
              className="mt-5 max-w-2xl text-sm leading-7 text-white/52 sm:text-[15px]"
            >
              From the first interface to the final deployment, I design and develop complete experiences across web, commerce, AI and mobile.
            </motion.p>
          </div>

          <div className="min-w-[180px] lg:pb-1">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              <span>Explore services</span>
              <span style={{ color: current.accent }}>{String(active + 1).padStart(2, '0')} / 06</span>
            </div>
            <div className="mt-3 h-px overflow-hidden bg-white/10">
              <motion.div
                animate={{ scaleX: progressScale }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
                className="h-full origin-left"
                style={{ backgroundColor: current.accent }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:flex-row">
          {services.map((service, index) => (
            <ServicePanel
              key={service.number}
              service={service}
              index={index}
              active={index === active}
              onSelect={setActive}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.55 }}
          className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/26 md:hidden"
        >
          Tap a service to explore
        </motion.p>
      </motion.div>
    </section>
  )
}
