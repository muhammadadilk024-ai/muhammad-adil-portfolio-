import { useEffect } from 'react'
import { Nav } from './Nav.jsx'
import { Footer } from './Footer.jsx'
import { useReveal } from './Reveal.jsx'

// Old single page anchors that may still be linked from LinkedIn and elsewhere.
const aliases = {
  '#case-studies': '#work',
  '#projects': '#work',
  '#skills': '/about/#stack',
  '#resume': '/about/',
  '#contact': '/contact/',
  '#testimonials': '#proof',
}

export function Layout({ current, children }) {
  useReveal()

  useEffect(() => {
    if (current !== '/') return
    const target = aliases[window.location.hash]
    if (!target) return
    if (target.startsWith('/')) {
      window.location.replace(target)
      return
    }
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView()
      window.history.replaceState(null, '', target)
    }
  }, [current])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
