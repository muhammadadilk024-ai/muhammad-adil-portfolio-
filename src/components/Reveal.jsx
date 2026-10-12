import { useEffect, useRef } from 'react'

/** Adds .is-in to every [data-reveal] element as it enters the viewport. One observer per page. */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    if (!elements.length) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/** Large statement whose words light up one by one as they cross a line two thirds down the viewport. */
export function TaglineReveal({ text, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const words = ref.current ? ref.current.querySelectorAll('.tagline-word') : []
    if (!words.length) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      words.forEach((w) => w.classList.add('is-in'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -34% 0px' },
    )
    words.forEach((w) => observer.observe(w))
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} className="tagline-word" style={{ '--d': `${(index % 8) * 45}ms` }}>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}
