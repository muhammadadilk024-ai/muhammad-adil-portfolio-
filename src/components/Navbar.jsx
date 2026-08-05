import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
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

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
      initial={reduceMotion ? false : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[#d9d4c9] bg-[#f7f4ed]/92 px-4 py-3 shadow-[0_12px_35px_rgba(28,37,44,0.08)] backdrop-blur-xl sm:px-5"
        aria-label="Main navigation"
      >
        <a href="#home" className="group flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#18324a] text-sm font-bold tracking-[-0.04em] text-[#f7f4ed] transition-transform duration-300 group-hover:-rotate-3">
            MA
          </span>

          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-[-0.025em] text-[#171a1c]">
              Muhammad Adil
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#6f7476]">
              Web developer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-[#52595c] transition hover:bg-[#ebe7de] hover:text-[#171a1c]"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="ml-2 rounded-xl bg-[#c6654c] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#ae543e]"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#d9d4c9] bg-[#eeeae1] text-[#171a1c] md:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition duration-300 ${
                isOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-[#d9d4c9] bg-[#f7f4ed] p-3 shadow-[0_20px_45px_rgba(28,37,44,0.12)] md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold text-[#272c2f] hover:bg-[#ebe7de]"
              >
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 block rounded-xl bg-[#c6654c] px-4 py-3 text-center font-bold text-white"
            >
              Start a project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
