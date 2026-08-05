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
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090d]/82 px-5 text-[#f7f5fb] backdrop-blur-xl sm:px-7"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between"
        aria-label="Main navigation"
      >
        <a href="#home" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-md border border-[#8b7cff]/45 bg-[#8b7cff]/10 font-mono text-[10px] font-bold tracking-[-0.04em] text-[#a99cff] shadow-[0_0_24px_rgba(139,124,255,.12)] transition duration-300 group-hover:border-[#ff9a58] group-hover:bg-[#ff9a58]/12 group-hover:text-[#ffad70]">
            MA/
          </span>
          <span>
            <span className="block text-[12px] font-semibold tracking-[0.02em]">Muhammad Adil</span>
            <span className="mt-0.5 hidden font-mono text-[7px] font-medium uppercase tracking-[0.28em] text-white/34 sm:block">Web developer</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-2 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/52 transition hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#8b7cff] to-[#ff9a58] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[8px] font-medium uppercase tracking-[0.18em] text-white/45">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#93ad9e]" />
            Available
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md border border-[#8b7cff]/40 bg-[#8b7cff]/10 px-4 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] transition duration-300 hover:border-[#8b7cff] hover:bg-[#7564f5]"
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
