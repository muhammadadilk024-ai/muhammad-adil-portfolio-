import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Expertise', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-5 sm:px-7"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between border-b border-white/10 bg-[#0e1014]/82 text-[#f2eee6] backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <a href="#home" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[11px] font-bold tracking-[-0.04em] transition group-hover:border-[#ef7253] group-hover:bg-[#ef7253]">
            MA
          </span>
          <span className="text-[13px] font-bold uppercase tracking-[0.12em]">
            Muhammad Adil
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/58 transition hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#ef7253] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#91ad9c]" />
            Available
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition hover:border-[#ef7253] hover:bg-[#ef7253]"
          >
            Let&apos;s work
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
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
            className="mx-auto max-w-[1500px] overflow-hidden border-b border-white/10 bg-[#0e1014]/96 px-2 pb-5 pt-2 text-[#f2eee6] shadow-2xl backdrop-blur-xl lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
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
              className="mt-4 flex items-center justify-between rounded-xl bg-[#ef7253] px-4 py-4 font-bold text-white"
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
