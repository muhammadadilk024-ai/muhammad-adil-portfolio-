import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const isCurrent = (current, href) => (href === '/' ? current === '/' : current.startsWith(href))

export function Nav({ current }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="pointer-events-auto relative z-10 mt-4 flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-white/10 bg-ink/75 p-2 shadow-card backdrop-blur-xl sm:mt-6 lg:w-max"
      >
        <a href="/" className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3" aria-label="Muhammad Adil, home">
          <img src="/favicon.svg" alt="" width="32" height="32" className="h-8 w-8 rounded-lg" />
          <span className="text-sm font-semibold text-cream">Muhammad Adil</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(current, link.href) ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="/contact/" className="btn btn-primary btn-sm ml-2 hidden lg:inline-flex">
          Start a project
        </a>

        <button
          type="button"
          className="burger relative h-10 w-10 rounded-full border border-white/10 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="mobile-menu" className={`menu pointer-events-auto lg:hidden ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {[{ label: 'Home', href: '/' }, ...site.nav].map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-item flex items-center justify-between rounded-2xl px-4 py-3 text-3xl font-semibold text-cream"
              style={{ '--d': `${100 + index * 60}ms` }}
              aria-current={isCurrent(current, link.href) ? 'page' : undefined}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
              {isCurrent(current, link.href) && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="menu-item mt-8 flex flex-col gap-4 px-4" style={{ '--d': '420ms' }}>
          <a href="/contact/" className="btn btn-primary" tabIndex={open ? 0 : -1}>
            Start a project <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
          <a href={`mailto:${site.email}`} className="text-sm text-cream/70" tabIndex={open ? 0 : -1}>
            {site.email}
          </a>
        </div>
      </div>
    </header>
  )
}
