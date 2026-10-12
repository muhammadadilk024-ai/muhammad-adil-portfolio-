import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const year = site.updated.slice(0, 4)

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="/" className="flex items-center gap-3" aria-label="Muhammad Adil, home">
            <img src="/favicon.svg?v=2" alt="" width="40" height="40" className="h-10 w-10 rounded-xl" />
            <span className="text-lg font-semibold text-cream">Muhammad Adil</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-cream/65">
            Full stack and AI developer in Canada. Laravel and WordPress platforms, Flutter apps and AI products, built end to end and open to remote roles.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.github} className="chip" target="_blank" rel="noopener">
              <Icon name="github-logo" className="mr-2 h-4 w-4" /> GitHub
            </a>
            <a href={site.linkedin} className="chip" target="_blank" rel="noopener">
              <Icon name="linkedin-logo" className="mr-2 h-4 w-4" /> LinkedIn
            </a>
            <a href={site.aatox} className="chip" target="_blank" rel="noopener">
              <Icon name="globe" className="mr-2 h-4 w-4" /> Aatox
            </a>
          </div>
        </div>

        <nav className="md:col-span-3" aria-label="Footer pages">
          <p className="eyebrow">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[{ label: 'Home', href: '/' }, ...site.nav, { label: 'KnowWhere case study', href: '/projects/knowwhere/' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/70 transition-colors duration-300 ease-fluid hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-inline break-all">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneE164}`} className="link-inline">{site.phone}</a>
            </li>
            <li className="text-cream/60">Canada, working remotely on North American hours</li>
            <li>
              <a href={site.resume} download={site.resumeName} className="link-arrow text-sm">
                <Icon name="download-simple" className="h-4 w-4" /> Download resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Muhammad Adil. Designed and built by me in React, Vite and Tailwind, prerendered to static HTML.</p>
          <p className="flex gap-4">
            <a href="/privacy/" className="hover:text-cream">Privacy</a>
            <a href="/sitemap.xml" className="hover:text-cream">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
