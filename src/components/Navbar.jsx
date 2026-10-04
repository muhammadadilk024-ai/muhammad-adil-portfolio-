import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '/files/adil-cv.pdf', download: 'Muhammad-Adil-Resume.pdf' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  // Highlight the nav link of the section that is currently in view.
  useEffect(() => {
    const hashLinks = links.filter((link) => link.href.startsWith('#'))
    const observed = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    // Sections load lazily, so keep looking until every target exists.
    function attach() {
      hashLinks.forEach((link) => {
        const element = document.querySelector(link.href)
        if (element && !observed.has(element)) {
          observed.add(element)
          observer.observe(element)
        }
      })
      return observed.size >= hashLinks.length
    }

    const timer = attach() ? undefined : window.setInterval(() => {
      if (attach()) window.clearInterval(timer)
    }, 400)

    return () => {
      window.clearInterval(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090d]/82 px-5 text-[#f7f5fb] backdrop-blur-xl sm:px-7"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between"
        aria-label="Main navigation"
      >
        <a href="#home" className="group flex items-center gap-3 py-2" onClick={() => setIsOpen(false)} aria-label="Muhammad Adil — Home">
          <img src="/favicon.svg" alt="" width="36" height="36" className="h-9 w-9 rounded-[10px] transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
          <span className="site-signature block bg-gradient-to-r from-[#f7f3ee] via-[#b8abef] to-[#e2a06d] bg-clip-text text-[21px] font-semibold italic leading-none tracking-[-0.04em] text-transparent transition duration-300 group-hover:brightness-125 sm:text-[23px]">
            Muhammad Adil
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download}
              aria-current={activeId === link.href ? 'true' : undefined}
              className={`group relative py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:text-white ${activeId === link.href ? 'text-white' : 'text-white/66'}`}
            >
              {link.label}
              <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-[#8b7cff] to-[#ff9a58] transition-transform duration-300 group-hover:scale-x-100 ${activeId === link.href ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#93ad9e] shadow-[0_0_12px_rgba(147,173,158,.45)]" />
            Open to work
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md border border-[#8b7cff]/45 bg-[#8b7cff]/10 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition duration-300 hover:border-[#8b7cff] hover:bg-[#7564f5]"
          >
            Let&apos;s work
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white transition hover:border-[#8b7cff] lg:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="relative h-4 w-5">
            <span className={`absolute left-0 top-1 h-px w-5 bg-current transition duration-300 ${isOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`absolute bottom-1 left-0 h-px w-5 bg-current transition duration-300 ${isOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mx-auto max-w-[1500px] overflow-hidden border-b border-white/10 bg-[#09090d]/98 px-2 pb-5 pt-2 text-[#f7f5fb] shadow-2xl backdrop-blur-xl lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                download={link.download}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between border-b border-white/8 px-2 py-4 text-xl font-semibold"
              >
                <span>{link.label}</span>
                <span className="text-xs text-white/35">0{index + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-between rounded-lg bg-[#7564f5] px-4 py-4 font-bold text-white"
            >
              Start a project <span>↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
