import { useEffect, useRef, useState } from 'react'
import { offers } from '../data/home.js'
import { Icon } from './Icons.jsx'
import { finePointer } from './hooks.js'

const isExternal = (href) => href.startsWith('http')

/** Five big words on the left, one lit. Hover or tap a word and its sheet appears on the right. */
export function Picker() {
  const [active, setActive] = useState(0)
  const hover = useRef(false)
  const tabs = useRef([])

  useEffect(() => {
    hover.current = finePointer()
  }, [])

  function onKeyDown(event) {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next = null
    if (keys[event.key]) next = (active + keys[event.key] + offers.length) % offers.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = offers.length - 1
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="picker-row lg:col-span-5 lg:block lg:overflow-visible lg:pb-0" role="tablist" aria-label="What I build" aria-orientation="vertical">
        {offers.map((offer, index) => (
          <button
            key={offer.slug}
            ref={(el) => {
              tabs.current[index] = el
            }}
            type="button"
            role="tab"
            id={`tab-${offer.slug}`}
            aria-selected={index === active}
            aria-controls={`panel-${offer.slug}`}
            tabIndex={index === active ? 0 : -1}
            className="picker-tab"
            onClick={() => setActive(index)}
            onMouseEnter={() => hover.current && setActive(index)}
            onKeyDown={onKeyDown}
          >
            <span className="tab-dot hidden lg:block" aria-hidden="true" />
            {offer.label}
          </button>
        ))}
      </div>

      <div className="lg:col-span-7">
        {offers.map((offer, index) => (
          <div
            key={offer.slug}
            role="tabpanel"
            id={`panel-${offer.slug}`}
            aria-labelledby={`tab-${offer.slug}`}
            hidden={index !== active}
            className="picker-panel sheet p-6 sm:p-8"
          >
            <p className="text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">{offer.line}</p>
            <ul className="mt-6 space-y-2.5">
              {offer.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-base text-ink/85">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="hand mr-1 text-xl text-leaf">proof:</span>
              {offer.proof.map((item) => (
                <a key={item.href} href={item.href} className="chip" target={isExternal(item.href) ? '_blank' : undefined} rel={isExternal(item.href) ? 'noopener' : undefined}>
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <p className="text-sm text-mute">{offer.tools.join(', ')}</p>
              <a href={`/services/#${offer.slug}`} className="link-arrow text-sm">
                How I do {offer.label.toLowerCase()}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
