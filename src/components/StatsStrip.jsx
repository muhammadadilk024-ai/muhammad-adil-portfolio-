import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const stats = [
  { value: 6, suffix: '', label: 'Client projects delivered' },
  { value: 5, suffix: '+', label: 'Years building, since 2021' },
  { value: 3, suffix: '', label: 'Languages in my voice AI app' },
  { value: 24, suffix: 'h', label: 'Typical reply time' },
]

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return undefined
    const controls = animate(0, to, { duration: 1.4, ease, onUpdate: (latest) => setValue(Math.round(latest)) })
    return () => controls.stop()
  }, [inView, reduceMotion, to])

  return (
    <span ref={ref}>
      {reduceMotion ? to : value}
      {suffix}
    </span>
  )
}

export default function StatsStrip() {
  const reduceMotion = useReducedMotion()

  return (
    <section aria-label="At a glance" className="relative -mt-px border-y border-white/8 bg-[#0b0b0f] px-4 py-10 text-white sm:px-7 lg:px-12">
      <dl className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.08, ease }}
            className="border-l border-white/10 pl-5"
          >
            <dd className="bg-gradient-to-r from-[#f7f3ee] via-[#b8abef] to-[#e2a06d] bg-clip-text text-4xl font-light tracking-[-0.05em] text-transparent sm:text-5xl">
              <Counter to={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/42">{stat.label}</dt>
          </motion.div>
        ))}
      </dl>
    </section>
  )
}
