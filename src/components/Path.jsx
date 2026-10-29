import { useCallback, useRef } from 'react'
import { journey } from '../data/skills.js'
import { useScrollProgress } from './hooks.js'

/** The years as stops on a line. The line is drawn as you scroll and each stop lights up as the ink reaches it. */
export function Path() {
  const ref = useRef(null)
  const stops = useRef([])
  const compute = useCallback((rect, vh) => (vh * 0.82 - rect.top) / rect.height, [])
  const onChange = useCallback((p) => {
    stops.current.forEach((el, index) => {
      if (el) el.classList.toggle('is-on', p >= (index / (journey.length - 1)) * 0.82 + 0.04)
    })
  }, [])
  useScrollProgress(ref, compute, onChange)

  return (
    <div ref={ref} className="path-line relative">
      <span className="absolute bottom-3 left-[6.5px] top-3 w-[3px] rounded bg-line" aria-hidden="true" />
      <span className="absolute left-[6.5px] top-3 w-[3px] rounded bg-leaf" style={{ height: 'calc(var(--p, 0) * (100% - 1.5rem))' }} aria-hidden="true" />
      <ol className="space-y-9">
        {journey.map((item, index) => (
          <li
            key={item.title}
            ref={(el) => {
              stops.current[index] = el
            }}
            className="stop grid grid-cols-[1rem_1fr] items-start gap-x-5 sm:grid-cols-[1rem_9rem_1fr] sm:gap-x-7"
          >
            <span className="stop-dot mt-1.5" aria-hidden="true" />
            <p className="hand text-2xl leading-none text-leaf">{item.period}</p>
            <div className="col-start-2 sm:col-start-3">
              <h3 className="text-xl sm:text-2xl">{item.title}</h3>
              <p className="mt-1.5 max-w-xl text-base text-mute">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
