import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const year = site.updated.slice(0, 4)

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="/" className="flex items-center gap-3" aria-label="Muhammad Adil, home">
            <img src="/favicon.svg?v=3" alt="" width="40" height="40" className="h-10 w-10 rounded-xl" />
            <span className="text-lg font-bold tracking-[-0.02em] text-ink">Muhammad Adil</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-mute">
            Full stack and AI developer in Canada. Websites, online stores, mobile apps and AI assistants, built end to end by one person and handed over on your own hosting.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
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
          <p className="hand text-xl text-leaf">around the site</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[{ label: 'Home', href: '/' }, ...site.nav, { label: 'KnowWhere case study', href: '/projects/knowwhere/' }].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-semibold text-ink transition-colors duration-300 ease-fluid hover:text-leaf">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="hand text-xl text-leaf">say hello</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-inline break-all">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneE164}`} className="link-inline">{site.phone}</a>
            </li>
            <li className="text-mute">Canada, remote, North American hours. Replies within one business day.</li>
            <li>
              <a href={site.resume} download={site.resumeName} className="link-arrow text-sm">
                <Icon name="download-simple" className="h-4 w-4" /> Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Muhammad Adil. Designed and built by me in React, Vite and Tailwind, prerendered to plain HTML.</p>
          <p className="flex gap-4">
            <a href="/privacy/" className="hover:text-ink">Privacy</a>
            <a href="/sitemap.xml" className="hover:text-ink">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
