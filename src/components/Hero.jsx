import { useEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const stats = [
  {
    value: '4+',
    label: 'Years Experience',
    detail: 'Hands-on web development',
  },
  {
    value: '50+',
    label: 'Projects Worked On',
    detail: 'Websites, stores & custom builds',
  },
  {
    value: '20+',
    label: 'Client Projects',
    detail: 'WordPress, Shopify & custom code',
  },
]

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 4.35,
      staggerChildren: 0.22,
    },
  },
}

const revealItem = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.97,
    filter: 'blur(7px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function CenterLightCanvas() {
  const canvasRef = useRef(null)
  const isVisibleRef = useRef(true)
  const isPageVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    })

    if (!ctx) return

    let width = 0
    let height = 0
    let animationFrameId
    let resizeTimer

    function resize() {
      clearTimeout(resizeTimer)

      resizeTimer = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

        width = canvas.offsetWidth
        height = canvas.offsetHeight

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }, 80)
    }

    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      {
        threshold: 0.08,
      }
    )

    observer.observe(canvas)

    function handleVisibilityChange() {
      isPageVisibleRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const isMobile = () => width < 640
    const TRAIL = isMobile() ? 130 : 190

    const lights = [
      {
        hue: 78,
        phase: 0,
        speed: 0.0032,
        size: isMobile() ? 8 : 12,
      },
      {
        hue: 74,
        phase: Math.PI / 2,
        speed: 0.0032,
        size: isMobile() ? 8 : 11,
      },
      {
        hue: 88,
        phase: Math.PI,
        speed: 0.003,
        size: isMobile() ? 7 : 10,
      },
      {
        hue: 82,
        phase: Math.PI * 1.5,
        speed: 0.003,
        size: isMobile() ? 7 : 10,
      },
    ].map((light) => ({
      ...light,
      t: light.phase,
      trail: [],
    }))

    function getPoint(light, t) {
      const mobile = isMobile()

      const ax = mobile ? 0.32 : 0.36
      const ay = mobile ? 0.23 : 0.28

      return {
        x: 0.5 + ax * Math.sin(t + light.phase),
        y: 0.5 + ay * Math.sin(2 * (t + light.phase)) * 0.82,
      }
    }

    lights.forEach((light) => {
      for (let i = TRAIL - 1; i >= 0; i--) {
        const t = light.t - i * light.speed
        light.trail.push(getPoint(light, t))
      }
    })

    function drawCurve(points, start, end) {
      if (end - start < 2) return

      const first = points[start]

      ctx.beginPath()
      ctx.moveTo(first.x * width, first.y * height)

      for (let i = start + 1; i < end - 1; i++) {
        const current = points[i]
        const next = points[i + 1]

        const midX = ((current.x + next.x) / 2) * width
        const midY = ((current.y + next.y) / 2) * height

        ctx.quadraticCurveTo(current.x * width, current.y * height, midX, midY)
      }

      const last = points[end - 1]
      ctx.lineTo(last.x * width, last.y * height)
    }

    function frame() {
      if (!width || !height) {
        animationFrameId = requestAnimationFrame(frame)
        return
      }

      if (!isVisibleRef.current || !isPageVisibleRef.current) {
        animationFrameId = requestAnimationFrame(frame)
        return
      }

      ctx.fillStyle = 'rgba(17, 17, 17, 0.085)'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'screen'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      lights.forEach((light) => {
        light.t += light.speed
        light.trail.unshift(getPoint(light, light.t))

        if (light.trail.length > TRAIL) {
          light.trail.pop()
        }

        const points = light.trail
        const scale = Math.min(width, 900) / 760
        const CHUNK = 5

        for (let start = 0; start < points.length - 2; start += CHUNK) {
          const end = Math.min(start + CHUNK + 2, points.length)
          const progress = 1 - start / TRAIL
          const eased = Math.pow(progress, 1.22)

          const lineWidth = light.size * eased * scale
          const alpha = eased * 0.56

          if (lineWidth < 0.25) continue

          drawCurve(points, start, end)
          ctx.lineWidth = lineWidth * 2.7
          ctx.strokeStyle = `hsla(${light.hue}, 92%, 55%, ${alpha * 0.045})`
          ctx.stroke()

          drawCurve(points, start, end)
          ctx.lineWidth = lineWidth * 1.55
          ctx.strokeStyle = `hsla(${light.hue}, 92%, 58%, ${alpha * 0.14})`
          ctx.stroke()

          drawCurve(points, start, end)
          ctx.lineWidth = lineWidth * 0.64
          ctx.strokeStyle = `hsla(${light.hue}, 95%, 72%, ${alpha * 0.36})`
          ctx.stroke()
        }
      })

      ctx.globalCompositeOperation = 'source-over'

      const centerDepth = ctx.createRadialGradient(
        width / 2,
        height / 2,
        30,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.62
      )

      centerDepth.addColorStop(0, 'rgba(17, 17, 17, 0.18)')
      centerDepth.addColorStop(0.58, 'rgba(17, 17, 17, 0.04)')
      centerDepth.addColorStop(1, 'rgba(17, 17, 17, 0.24)')

      ctx.fillStyle = centerDepth
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(frame)
    }

    animationFrameId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{
        transform: 'translate3d(0,0,0)',
      }}
    />
  )
}

function Hero() {
  const heroRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -95]
  )

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 0.92, 0.35]
  )

  const canvasScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.16]
  )

  const canvasY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 80]
  )

  const badgesOpacity = useTransform(scrollYProgress, [0, 0.58], [1, 0])
  const bridgeOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.55, 0.85, 1])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-5 pb-24 pt-40 text-[#f0f0f0] sm:px-6 sm:pt-44 lg:pt-40"
    >
      <div className="absolute inset-0 bg-[#111111]" />

      <motion.div
        className="absolute left-1/2 top-[49%] h-[390px] w-[92vw] max-w-[920px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[48%] will-change-transform"
        style={{
          zIndex: 0,
          scale: canvasScale,
          y: canvasY,
        }}
        initial={{ opacity: 0, scale: 0.86, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{
          delay: 4.05,
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <CenterLightCanvas />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[49%] h-[460px] w-[92vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8f135]/7 blur-[52px] will-change-transform"
        style={{
          zIndex: 0,
          scale: canvasScale,
          y: canvasY,
        }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 4.15,
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'rgba(17,17,17,0.18)',
          backdropFilter: 'blur(3px) brightness(0.82)',
          WebkitBackdropFilter: 'blur(3px) brightness(0.82)',
          zIndex: 1,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 58% at 50% 48%, rgba(17,17,17,0.04) 0%, rgba(17,17,17,0.36) 58%, rgba(17,17,17,0.9) 100%)',
          zIndex: 2,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,241,53,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(200,241,53,0.55) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          zIndex: 3,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 4.25, duration: 1 }}
      />

      <motion.div
        className="absolute left-[7%] top-[32%] hidden lg:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
        animate={{ opacity: 0.82, x: 0, filter: 'blur(0px)' }}
        transition={{ delay: 5.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-2xl border border-[#222222] bg-[#161616]/80 px-5 py-4 backdrop-blur-sm"
          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-mono text-xs text-[#c8f135]">WordPress Developer</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[32%] hidden lg:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, x: 30, filter: 'blur(5px)' }}
        animate={{ opacity: 0.82, x: 0, filter: 'blur(0px)' }}
        transition={{ delay: 5.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-2xl border border-[#222222] bg-[#161616]/80 px-5 py-4 backdrop-blur-sm"
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-mono text-xs tracking-[0.12em] text-[#c8f135]">
            Custom Code
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[9%] top-[56%] hidden xl:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, x: 30, filter: 'blur(5px)' }}
        animate={{ opacity: 0.72, x: 0, filter: 'blur(0px)' }}
        transition={{ delay: 5.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-2xl border border-[#222222] bg-[#161616]/80 px-5 py-4 backdrop-blur-sm"
          animate={prefersReducedMotion ? {} : { x: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-mono text-xs text-[#c8f135]">Front-End Developer</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[9%] bottom-[20%] hidden xl:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, x: -30, filter: 'blur(5px)' }}
        animate={{ opacity: 0.72, x: 0, filter: 'blur(0px)' }}
        transition={{ delay: 5.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-2xl border border-[#222222] bg-[#161616]/80 px-5 py-4 backdrop-blur-sm"
          animate={prefersReducedMotion ? {} : { x: [0, -8, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-mono text-xs text-[#c8f135]">Shopify</p>
          <p className="mt-1 text-xs text-[#b5b5b5]">PHP • React • Node</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[16%] top-[20%] hidden h-14 w-14 rounded-[35%] border border-[#c8f135]/20 xl:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.35, scale: 1 }
            : {
                opacity: 0.35,
                scale: 1,
                rotate: [0, 45, 0],
                y: [0, -12, 0],
              }
        }
        transition={{
          opacity: { delay: 5.55, duration: 0.8 },
          scale: { delay: 5.55, duration: 0.8 },
          rotate: { delay: 5.55, duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          y: { delay: 5.55, duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        className="absolute right-[18%] bottom-[16%] hidden h-20 w-20 rounded-full border border-[#c8f135]/20 xl:block will-change-transform"
        style={{ zIndex: 5, opacity: badgesOpacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.38, scale: 1 }
            : {
                opacity: 0.38,
                scale: [1, 1.18, 1],
                rotate: [0, 180, 360],
              }
        }
        transition={{
          opacity: { delay: 5.65, duration: 0.8 },
          scale: { delay: 5.65, duration: 7, repeat: Infinity, ease: 'easeInOut' },
          rotate: { delay: 5.65, duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <motion.div
        variants={revealContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-6xl text-center will-change-transform"
        style={{
          zIndex: 10,
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <motion.p
          variants={revealItem}
          className="mb-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#c8f135] sm:text-xs sm:tracking-[0.42em] lg:text-sm"
        >
          WordPress • Custom Code • Front-End • Shopify
        </motion.p>

        <motion.h1
          variants={revealItem}
          className="mx-auto max-w-5xl text-[9.5vw] font-medium leading-[1.08] tracking-[-0.055em] text-[#f0f0f0] sm:text-[6.8vw] lg:text-[3.85vw]"
        >
          A developer who builds with{' '}
          <span className="relative inline-block text-[#c8f135] drop-shadow-[0_2px_10px_rgba(200,241,53,0.12)]">
            design, logic,
            <motion.span
              className="absolute -bottom-2 left-3 right-3 h-1.5 origin-center rounded-full bg-[#c8f135]/45 will-change-transform"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { scaleX: 1, opacity: 0.65 }
                  : { scaleX: [0.55, 1, 0.55], opacity: [0.35, 0.9, 0.35] }
              }
              transition={{
                delay: 4.8,
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </span>{' '}
          and real project experience.
        </motion.h1>

        <motion.p
          variants={revealItem}
          className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#d0d0d0] sm:text-base lg:text-lg lg:leading-8"
        >
          I&apos;m Muhammad Adil, a web developer with 4+ years of hands-on
          experience in WordPress, Shopify, custom code, and front-end
          development. I create websites that look professional, work smoothly,
          and solve real business problems.
        </motion.p>

        <motion.div
          variants={revealItem}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="/#projects"
            className="rounded-full bg-[#c8f135] px-7 py-3.5 font-semibold text-black shadow-[0_0_35px_rgba(200,241,53,0.18)] transition-transform duration-300 hover:scale-[1.04] hover:bg-[#d8ff4d]"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="rounded-full border border-[#2a2a2a] bg-transparent px-7 py-3.5 font-semibold text-[#dfdfdf] backdrop-blur-sm transition-colors duration-300 hover:border-[#c8f135]/60 hover:text-[#c8f135]"
          >
            Let&apos;s Chat
          </a>
        </motion.div>

        <motion.div
          variants={revealItem}
          className="mx-auto mt-11 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              className="group relative overflow-hidden rounded-3xl border border-[#222222] bg-[#161616] p-5 text-left backdrop-blur-sm transition-colors duration-300 hover:border-[#c8f135]/40 hover:bg-[#181818] will-change-transform"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      y: -6,
                      scale: 1.015,
                    }
              }
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[#2a2a2a] transition duration-500 group-hover:bg-[#c8f135]" />

              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#c8f135]/6 blur-2xl transition group-hover:bg-[#c8f135]/10" />

              <div className="relative">
                <p className="text-3xl font-semibold text-[#c8f135]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-medium text-[#f0f0f0]">
                  {item.label}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#b5b5b5]">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-44 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-10 h-72 w-[82vw] max-w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,241,53,0.11),rgba(200,241,53,0.04)_35%,transparent_72%)] blur-2xl will-change-transform"
          style={{ opacity: bridgeOpacity }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.16, 1],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(17,17,17,0.94)_92%)]" />
      </div>

      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-[#2a2a2a] bg-[#161616] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d0d0d0] backdrop-blur-sm transition-colors duration-300 hover:border-[#c8f135]/60 hover:text-[#c8f135] sm:flex"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Explore Services
        <motion.span
          className="inline-block text-[#c8f135]"
          animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  )
}

export default Hero