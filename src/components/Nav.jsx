import { useEffect, useState } from 'react'
import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const isCurrent = (current, href) => (href === '/' ? current === '/' : current.startsWith(href))

export function Nav({ current }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header className={`topbar ${stuck || open ? 'is-stuck' : ''}`}>
      <nav aria-label="Main" className="container-x relative z-50 flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <a href="/" className="flex items-center gap-2.5" aria-label="Muhammad Adil, home">
          <img src="/favicon.svg?v=3" alt="" width="34" height="34" className="h-[34px] w-[34px] rounded-[9px]" />
          <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">Muhammad Adil</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {site.nav.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" aria-current={isCurrent(current, link.href) ? 'page' : undefined}>
              {link.label}
            </a>
          ))}
          <a href="/contact/" className="btn btn-ink btn-sm ml-3">
            Say hello
          </a>
        </div>

        <button
          type="button"
          className="burger relative h-11 w-11 rounded-full border border-line bg-white text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="mobile-menu" className={`menu lg:hidden ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {[{ label: 'Home', href: '/' }, ...site.nav].map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-item flex items-center justify-between rounded-2xl px-3 py-3 text-4xl font-bold tracking-[-0.03em] text-ink"
              style={{ '--d': `${80 + index * 60}ms` }}
              aria-current={isCurrent(current, link.href) ? 'page' : undefined}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
              {isCurrent(current, link.href) && <span className="h-2.5 w-2.5 rounded-full bg-sprout" aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="menu-item mt-8 flex flex-col gap-4 px-3" style={{ '--d': '400ms' }}>
          <a href="/contact/" className="btn btn-primary" tabIndex={open ? 0 : -1}>
            Tell me what you're building <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
          <a href={`mailto:${site.email}`} className="link-inline text-base" tabIndex={open ? 0 : -1}>
            {site.email}
          </a>
        </div>
      </div>
    </header>
  )
}
