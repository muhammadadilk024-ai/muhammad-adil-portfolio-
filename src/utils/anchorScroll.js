import { useEffect } from 'react'

let frame = 0
let timers = []

function cancelScroll() {
  cancelAnimationFrame(frame)
  timers.forEach((timer) => window.clearTimeout(timer))
  timers = []
  document.documentElement.style.scrollBehavior = ''
}

/**
 * Scrolls to an element under the fixed header and keeps aiming at it while the
 * page changes. The browser's own smooth scroll for "#section" links is stopped
 * halfway whenever lazy content above shifts the layout (and on phones when the
 * menu closes), so the link looked dead.
 */
export function scrollToElement(element, instant = false) {
  cancelScroll()
  const root = document.documentElement
  const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
  const targetY = () => Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset)

  // The page CSS has scroll-behavior: smooth; switch it off while we drive the scroll.
  root.style.scrollBehavior = 'auto'
  const finish = () => {
    window.scrollTo(0, targetY())
    root.style.scrollBehavior = ''
  }

  if (instant) {
    finish()
    return
  }

  const start = window.scrollY
  const distance = Math.abs(targetY() - start)
  const duration = Math.min(1100, 450 + distance * 0.1)
  const startTime = performance.now()

  function step(now) {
    const progress = Math.min(1, (now - startTime) / duration)
    const eased = 1 - (1 - progress) ** 3
    window.scrollTo(0, start + (targetY() - start) * eased)
    if (progress < 1) {
      frame = requestAnimationFrame(step)
      return
    }
    // Lazy images and sections can still move the target a little; settle on it.
    window.scrollTo(0, targetY())
    timers = [
      window.setTimeout(() => window.scrollTo(0, targetY()), 250),
      window.setTimeout(() => window.scrollTo(0, targetY()), 600),
      window.setTimeout(() => window.scrollTo(0, targetY()), 1000),
      window.setTimeout(finish, 1500),
    ]
  }

  frame = requestAnimationFrame(step)
}

/** Makes every in-page "#section" link scroll reliably, on desktop and on phones. */
export function useAnchorScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return

      event.preventDefault()
      scrollToElement(target, reduceMotion.matches)
      window.history.replaceState(null, '', hash)
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }

    // Anything the visitor does themselves wins over the animation.
    const stop = () => cancelScroll()
    document.addEventListener('click', onClick)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      cancelScroll()
    }
  }, [])
}
