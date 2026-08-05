import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/#home', type: 'section' },
  { label: 'Services', href: '/#services', type: 'section' },
  { label: 'Skills', href: '/#skills', type: 'section' },
  { label: 'About Me', href: '/#about', type: 'section' },
  { label: 'Projects', href: '/#projects', type: 'section' },
  { label: 'Resume', href: '/#resume', type: 'section' },
  { label: 'Contact', href: '/#contact', type: 'section' },
]

const topLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adil-khan-15aa61297/',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:muhammad.adilk024@gmail.com',
    external: false,
  },
  {
    label: 'Projects',
    href: '/#projects',
    external: false,
  },
]

const featuredCards = [
  {
    title: 'WordPress',
    subtitle: 'Custom websites, Elementor builds, plugins',
    href: '/#services',
  },
  {
    title: 'Shopify',
    subtitle: 'Store setup, product pages, ecommerce flow',
    href: '/#services',
  },
  {
    title: 'Frontend',
    subtitle: 'HTML, CSS, JavaScript, React, Tailwind',
    href: '/#services',
  },
]

function BrandIcon() {
  return (
    <svg
      viewBox="0 0 90 90"
      className="h-10 w-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="70" height="70" rx="24" fill="#c8f135" />
      <rect x="22" y="22" width="46" height="46" rx="16" fill="#111111" />

      <path
        d="M39 39L33 45L39 51"
        stroke="#c8f135"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M51 39L57 45L51 51"
        stroke="#c8f135"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M48 35L42 55"
        stroke="#c8f135"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle cx="66" cy="24" r="7" fill="#111111" opacity="0.95" />
      <circle cx="68" cy="22" r="2" fill="#c8f135" />
    </svg>
  )
}

const panelVariants = {
  hidden: {
    opacity: 0,
    maxHeight: 0,
    y: -10,
    clipPath: 'inset(0 0 100% 0 round 0 0 1.35rem 1.35rem)',
  },
  visible: {
    opacity: 1,
    maxHeight: 780,
    y: 0,
    clipPath: 'inset(0 0 0% 0 round 0 0 1.35rem 1.35rem)',
    transition: {
      maxHeight: {
        duration: 0.62,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.38,
        ease: 'easeOut',
      },
      y: {
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
      },
      clipPath: {
        duration: 0.58,
        ease: [0.16, 1, 0.3, 1],
      },
      staggerChildren: 0.075,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    maxHeight: 0,
    y: -8,
    clipPath: 'inset(0 0 100% 0 round 0 0 1.35rem 1.35rem)',
    transition: {
      maxHeight: {
        duration: 0.58,
        ease: [0.76, 0, 0.24, 1],
      },
      opacity: {
        duration: 0.34,
        ease: 'easeOut',
      },
      y: {
        duration: 0.44,
        ease: [0.76, 0, 0.24, 1],
      },
      clipPath: {
        duration: 0.54,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  },
}

const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function Navbar() {
  const [isWide, setIsWide] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const timersRef = useRef([])

  const isMenuActive = isWide || isPanelOpen

  function clearTimers() {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []
  }

  function addTimer(callback, delay) {
    const timer = setTimeout(callback, delay)
    timersRef.current.push(timer)
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuActive)

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuActive])

  useEffect(() => {
    return () => clearTimers()
  }, [])

  function openMenu() {
    clearTimers()
    setIsWide(true)

    addTimer(
      () => {
        setIsPanelOpen(true)
      },
      prefersReducedMotion ? 0 : 520
    )
  }

  function closeMenu() {
    clearTimers()
    setIsPanelOpen(false)

    addTimer(
      () => {
        setIsWide(false)
      },
      prefersReducedMotion ? 0 : 620
    )
  }

  function handleToggle() {
    if (isMenuActive) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  function handleSectionClick(event, href) {
    closeMenu()

    if (!href.includes('#')) return

    const currentPath = window.location.pathname

    if (currentPath === '/') {
      event.preventDefault()

      const sectionId = href.split('#')[1]
      const section = document.getElementById(sectionId)

      if (section) {
        addTimer(
          () => {
            section.scrollIntoView({
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
              block: 'start',
            })
          },
          prefersReducedMotion ? 0 : 720
        )
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {isMenuActive && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/62"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 top-5 z-50 w-full px-4"
        initial={{ opacity: 0, y: -28, scale: 0.96, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{
          delay: 4.05,
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="relative mx-auto flex w-fit items-start justify-center">
          <motion.nav
            className="overflow-hidden rounded-[1.35rem] border border-[#222222] bg-[#161616]/98 text-[#f0f0f0] shadow-[0_26px_72px_rgba(0,0,0,0.42)] backdrop-blur-sm will-change-transform"
            initial={false}
            animate={{
              width: isWide ? 'min(94vw, 980px)' : 'min(92vw, 460px)',
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : isWide ? 0.58 : 0.62,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="relative flex h-[72px] items-center justify-between px-4 sm:px-5">
              <a href="/#home" className="flex items-center gap-3" onClick={(event) => handleSectionClick(event, '/#home')}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                  <BrandIcon />
                </div>

                <div className="leading-tight">
                  <p className="text-[15px] font-semibold tracking-[-0.03em] text-[#f0f0f0] sm:text-base">
                    Muhammad Adil
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-[#d0d0d0] sm:text-[10px]">
                    Web Developer
                  </p>
                </div>
              </a>

              <button
                onClick={handleToggle}
                className="ml-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8f135] text-black shadow-[0_10px_25px_rgba(200,241,53,0.14)] transition-transform duration-300 hover:scale-[1.03] hover:bg-[#d8ff4d]"
                aria-label="Toggle menu"
                aria-expanded={isMenuActive}
                type="button"
              >
                <span className="relative block h-4 w-5">
                  <motion.span
                    className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-black"
                    animate={isMenuActive ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <motion.span
                    className="absolute left-0 top-2 h-0.5 w-5 rounded-full bg-black"
                    animate={isMenuActive ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-black"
                    animate={isMenuActive ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isPanelOpen && (
                <motion.div
                  className="overflow-hidden border-t border-[#222222] px-5 pb-7 pt-6 sm:px-8 will-change-transform"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div className="mx-auto w-full max-w-[900px]">
                    <motion.div
                      className="mb-7 grid grid-cols-3 text-xs font-medium text-[#d0d0d0]"
                      variants={menuItemVariants}
                    >
                      {topLinks.map((link, index) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                          onClick={(event) => {
                            if (!link.external) {
                              handleSectionClick(event, link.href)
                            } else {
                              closeMenu()
                            }
                          }}
                          className={`transition-colors duration-300 hover:text-[#c8f135] ${
                            index === 1 ? 'text-center' : ''
                          } ${index === 2 ? 'text-right' : ''}`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>

                    <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
                      <motion.div variants={menuItemVariants}>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#9a9a9a]">
                          Navigation
                        </p>

                        <div className="space-y-1">
                          {navLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={(event) => handleSectionClick(event, link.href)}
                              className="group flex items-center justify-between border-b border-[#222222] py-2.5 text-3xl font-semibold tracking-[-0.04em] text-[#f0f0f0] transition-colors duration-300 hover:text-[#c8f135] sm:text-4xl"
                            >
                              <span>{link.label}</span>

                              <span className="text-lg text-[#9a9a9a] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#c8f135]">
                                →
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
                        variants={menuItemVariants}
                      >
                        {featuredCards.map((card) => (
                          <a
                            key={card.title}
                            href={card.href}
                            onClick={(event) => handleSectionClick(event, card.href)}
                            className="group relative overflow-hidden rounded-3xl border border-[#222222] bg-[#111111] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#c8f135]/45 hover:bg-[#181818]"
                          >
                            <div className="absolute inset-x-0 top-0 h-1 bg-[#2a2a2a] transition duration-500 group-hover:bg-[#c8f135]" />

                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#c8f135]/7 blur-2xl transition-transform duration-500 group-hover:scale-125" />

                            <p className="relative text-lg font-bold text-[#f0f0f0]">
                              {card.title}
                            </p>

                            <p className="relative mt-2 text-sm leading-6 text-[#b5b5b5]">
                              {card.subtitle}
                            </p>
                          </a>
                        ))}
                      </motion.div>
                    </div>

                    <motion.div
                      className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#222222] pt-5"
                      variants={menuItemVariants}
                    >
                      <p className="max-w-md text-xs leading-5 text-[#b5b5b5]">
                        Available for junior web roles, remote projects, contract work,
                        and client website builds.
                      </p>

                      <a
                        href="/#contact"
                        onClick={(event) => handleSectionClick(event, '/#contact')}
                        className="rounded-2xl bg-[#c8f135] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_15px_30px_rgba(200,241,53,0.12)] transition-transform duration-300 hover:scale-[1.03] hover:bg-[#d8ff4d]"
                      >
                        Start a Project
                      </a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </motion.header>
    </>
  )
}

export default Navbar