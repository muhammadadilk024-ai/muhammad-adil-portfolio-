import { useEffect, useRef } from 'react'
import { finePointer, reduceMotion } from './hooks.js'

/**
 * Graph paper that notices you. A grid of ink dots; the ones near the pointer swell, turn green and lean away,
 * like grass parting. Draws only while something is moving, then goes to sleep. Static grid on touch devices.
 */
export function DotField({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    const gap = 26
    const radius = 150
    const interactive = finePointer() && !reduceMotion()
    let width = 0
    let height = 0
    let dpr = 1
    let dots = []
    let pointer = { x: -9999, y: -9999 }
    let target = { x: -9999, y: -9999 }
    let frame = 0
    let active = false
    let idle = 0

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.ceil(rect.width)
      height = Math.ceil(rect.height)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const offsetX = (width % gap) / 2
      const offsetY = (height % gap) / 2
      for (let y = offsetY; y <= height; y += gap) {
        for (let x = offsetX; x <= width; x += gap) dots.push({ x, y })
      }
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const px = pointer.x
      const py = pointer.y
      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i]
        const dx = dot.x - px
        const dy = dot.y - py
        const dist = Math.hypot(dx, dy)
        if (dist < radius) {
          const t = 1 - dist / radius
          const ease = t * t * (3 - 2 * t)
          const push = ease * 10
          const nx = dist === 0 ? 0 : dx / dist
          const ny = dist === 0 ? 0 : dy / dist
          const r = 1.1 + ease * 2.4
          ctx.fillStyle = `rgba(23, 122, 76, ${0.18 + ease * 0.75})`
          ctx.beginPath()
          ctx.arc(dot.x + nx * push, dot.y + ny * push, r, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = 'rgba(14, 26, 38, 0.13)'
          ctx.fillRect(dot.x - 1, dot.y - 1, 2.2, 2.2)
        }
      }
    }

    const loop = () => {
      frame = 0
      pointer.x += (target.x - pointer.x) * 0.18
      pointer.y += (target.y - pointer.y) * 0.18
      draw()
      const settled = Math.abs(target.x - pointer.x) < 0.3 && Math.abs(target.y - pointer.y) < 0.3
      idle = settled ? idle + 1 : 0
      if (idle < 6) frame = requestAnimationFrame(loop)
      else active = false
    }

    const wake = () => {
      if (!active) {
        active = true
        idle = 0
        frame = requestAnimationFrame(loop)
      }
    }

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      wake()
    }
    const onLeave = () => {
      target = { x: -9999, y: -9999 }
      wake()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    return () => {
      observer.disconnect()
      if (interactive) {
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('pointerleave', onLeave)
      }
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={ref} className={`hero-grid ${className}`} aria-hidden="true" />
}
