import { useEffect, useRef } from 'react'
import { finePointer, reduceMotion } from './hooks.js'

/** A round green badge that follows the pointer over anything marked data-cursor="label". Mouse only. */
export function CursorBadge() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reduceMotion()) return undefined
    let frame = 0
    let x = 0
    let y = 0
    let shown = false
    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null
      const next = Boolean(target)
      if (next !== shown) {
        shown = next
        el.classList.toggle('is-on', shown)
        if (target) el.textContent = target.getAttribute('data-cursor') || 'Open'
      }
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${shown ? 1 : 0.4})`
        })
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-badge" aria-hidden="true" />
}
