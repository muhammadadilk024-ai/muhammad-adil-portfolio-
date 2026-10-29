import { useEffect, useRef, useState } from 'react'

export const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const clamp01 = (value) => Math.min(1, Math.max(0, value))

/**
 * Drives a CSS variable (--p, 0 to 1) on an element from its position in the viewport.
 * `compute(rect, vh)` returns the raw progress; it is clamped and written on every scroll frame.
 * Nothing goes through React state, so it stays cheap on long pages.
 */
export function useScrollProgress(ref, compute, onChange) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reduceMotion()) {
      el.style.setProperty('--p', '1')
      if (onChange) onChange(1)
      return undefined
    }
    let frame = 0
    let last = -1
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clamp01(compute(rect, vh))
      if (Math.abs(p - last) < 0.002) return
      last = p
      el.style.setProperty('--p', p.toFixed(3))
      if (onChange) onChange(p)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, compute, onChange])
}

/** Adds `className` once when the element enters the viewport. */
export function useInView(ref, className = 'is-in', options = { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      el.classList.add(className)
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          observer.disconnect()
        }
      })
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, className, options])
}

/** Writes --mx and --my (-1 to 1) on an element from the pointer position over it. Desktop only. */
export function usePointerVars(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reduceMotion()) return undefined
    let frame = 0
    let x = 0
    let y = 0
    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          el.style.setProperty('--mx', x.toFixed(3))
          el.style.setProperty('--my', y.toFixed(3))
        })
      }
    }
    const onLeave = () => {
      el.style.setProperty('--mx', '0')
      el.style.setProperty('--my', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

/** Cycles an index every `ms`, paused when the tab is hidden or motion is reduced. */
export function useCycle(length, ms) {
  const [index, setIndex] = useState(0)
  const timer = useRef(0)
  useEffect(() => {
    if (length < 2 || reduceMotion()) return undefined
    const tick = () => setIndex((value) => (value + 1) % length)
    const start = () => {
      stop()
      timer.current = window.setInterval(tick, ms)
    }
    const stop = () => {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [length, ms])
  return index
}
