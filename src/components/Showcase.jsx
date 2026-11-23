import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { projects, ProjectCount } from '../data/projects.js'
import { caseStudyBySlug } from '../data/caseStudies.js'
import { Icon } from './Icons.jsx'
import { finePointer, reduceMotion, useInView, usePointerVars } from './hooks.js'

const AUTO_MS = 5200 // how long a print stays on top while the pile plays by itself
const TOSS = 64 // pixels of sideways drag before a print is thrown off the pile

const app = caseStudyBySlug('knowwhere')
const sites = projects.map((project) => ({
  slug: project.slug,
  name: project.name,
  type: project.type,
  summary: project.summary,
  role: project.role,
  stack: project.stack,
  note: project.note,
  tint: project.tint,
  image: project.image,
  width: project.width,
  height: project.height,
  contain: project.fit === 'contain',
  background: project.background,
  thumb: project.image.replace(/\.webp$/, '-thumb.webp'),
  caption: project.domain,
  live: true,
  href: project.caseStudy ? `/projects/${project.slug}/` : project.url,
  external: !project.caseStudy,
  url: project.url,
  urlLabel: project.domain,
  caseStudy: Boolean(project.caseStudy),
}))
const knowwhere = {
  slug: app.slug,
  name: app.name,
  ...app.showcase,
  stack: app.stack.slice(0, 4),
  live: true,
  href: app.path,
  external: false,
  url: app.storeUrl,
  urlLabel: app.storeLabel,
  caseStudy: true,
  app: true,
}
// The three with a case study lead the pile, then the rest in list order.
const stories = sites.filter((item) => item.caseStudy)
const items = [...stories.slice(0, 1), knowwhere, ...stories.slice(1), ...sites.filter((item) => !item.caseStudy)]
const n = items.length
const wrap = (index) => ((index % n) + n) % n

/**
 * Full size images are requested only for the print on top and the next one, then two ahead and one behind once
 * somebody is here. They stay once requested; `shown` is that growing set. Until then a print shows its tiny
 * index thumbnail, which is already loaded.
 */
const withShown = (s) => {
  const want = [s.active, wrap(s.active + 1)]
  if (s.warm) want.push(wrap(s.active + 2), wrap(s.active - 1))
  if (want.every((index) => s.shown.has(index))) return s
  const shown = new Set(s.shown)
  want.forEach((index) => shown.add(index))
  return { ...s, shown }
}

/** The pile may play by itself only with a mouse and without a reduced motion preference. */
const subscribeAuto = (onChange) => {
  const queries = [window.matchMedia('(hover: hover) and (pointer: fine)'), window.matchMedia('(prefers-reduced-motion: reduce)')]
  queries.forEach((query) => query.addEventListener('change', onChange))
  return () => queries.forEach((query) => query.removeEventListener('change', onChange))
}
const readAuto = () => finePointer() && !reduceMotion()
const noAuto = () => false

/** Where a print sits: 0 on top, 1 and 2 peeking out, the one just thrown off, everything else waiting underneath. */
const place = (index, active) => {
  const pos = wrap(index - active)
  if (pos <= 2) return String(pos)
  return pos === n - 1 ? 'out' : 'back'
}

function Print({ item, index, active, dir, show, near, onBringUp }) {
  const pos = place(index, active)
  const top = pos === '0'
  return (
    <div className="print" data-pos={pos} style={{ '--dir': dir, '--land': top ? 2 : pos === '1' ? 1 : 0 }} role="group" aria-label={`${item.name}, ${index + 1} of ${n}`} aria-hidden={top ? undefined : 'true'}>
      <a
        className="print-inner"
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener' : undefined}
        tabIndex={top ? 0 : -1}
        draggable={false}
        data-cursor={top ? (item.external ? 'Open site' : 'Case study') : undefined}
        onClick={top ? undefined : (event) => onBringUp(event, index)}
      >
        <div
          className={`print-pic ${item.contain ? 'is-contain' : ''}`}
          style={{ backgroundColor: item.background, backgroundImage: near && !item.contain && !item.app ? `url(${item.thumb})` : undefined }}
        >
          {item.app ? (
            // The same tile as AppHero in Gallery.jsx, drawn here so the home page does not load the gallery script.
            <div className="app-hero app-tile">
              <div className="app-hero-phone">
                <img src={app.shot.src} srcSet={app.shot.srcSet} sizes="(min-width: 640px) 13rem, 46vw" alt={app.shot.alt} width={app.shot.width} height={app.shot.height} loading="lazy" decoding="async" draggable={false} />
              </div>
              <img className="app-hero-logo" src={app.logo.src} srcSet={app.logo.srcSet} sizes="7rem" alt={app.logo.alt} width={app.logo.width} height={app.logo.height} loading="lazy" decoding="async" draggable={false} />
            </div>
          ) : (
            show && (
              <img
                src={item.image}
                srcSet={`${item.image.replace(/\.webp$/, '-720.webp')} 720w, ${item.image} ${item.width}w`}
                sizes="(min-width: 1024px) 34rem, 88vw"
                alt={`Homepage of ${item.urlLabel}, ${item.type.toLowerCase()} built by Muhammad Adil`}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            )
          )}
        </div>
        <div className="print-caption">
          <span className="hand">{item.caption}</span>
          {item.live && <span className="print-live">live</span>}
        </div>
        <span className="sr-only">
          {item.name}, {item.type.toLowerCase()}
        </span>
        {item.note && (
          <span className="note print-note" aria-hidden="true">
            {item.note}
          </span>
        )}
      </a>
    </div>
  )
}

function Info({ item, on }) {
  return (
    <div className={`show-info ${on ? 'is-on' : ''}`}>
      <p className="hand text-2xl leading-none text-sprout">{item.type.toLowerCase()}</p>
      <h3 className="mt-2 text-3xl sm:text-4xl">{item.name}</h3>
      <p className="mt-3 text-base leading-relaxed text-paper/75 sm:text-[1.05rem]">{item.summary}</p>
      <p className="mt-3 hidden text-sm font-semibold text-paper/60 sm:block">{item.role}</p>
      <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex" aria-label="Stack">
        {item.stack.map((entry) => (
          <li key={entry} className="chip">
            {entry}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6">
        {item.caseStudy ? (
          <>
            <a href={item.href} className="btn btn-paper max-sm:min-h-[2.9rem] max-sm:px-5">
              Read the case study
            </a>
            <a href={item.url} target="_blank" rel="noopener" className="link-arrow text-sm">
              {item.urlLabel} <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          </>
        ) : (
          <a href={item.url} target="_blank" rel="noopener" className="btn btn-paper">
            Open the live site <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

/**
 * The work section: a pile of printed screenshots. One project is on top at full size with its details beside it,
 * two peek out behind. Flick the top print away (drag, arrows, keys or the small index) to see the next one.
 * Nothing here is tied to page scroll.
 */
export function Showcase() {
  const root = useRef(null)
  const pile = useRef(null)
  const strip = useRef(null)
  const dragged = useRef(false)
  const [state, setState] = useState(() => ({ active: 0, dirs: {}, warm: false, shown: new Set([0, 1]) }))
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [near, setNear] = useState(false)
  const [held, setHeld] = useState(false)
  const canAuto = useSyncExternalStore(subscribeAuto, readAuto, noAuto)
  const { active, dirs, shown } = state
  const current = items[active]

  useInView(pile)
  usePointerVars(pile)

  const step = useCallback((delta, dir = 1) => {
    setState((s) => withShown({ ...s, active: wrap(s.active + delta), dirs: delta === 1 ? { ...s.dirs, [s.active]: dir } : s.dirs }))
  }, [])
  const jump = useCallback((to) => {
    setState((s) => {
      if (to === s.active) return s
      return withShown({ ...s, active: to, dirs: to === wrap(s.active + 1) ? { ...s.dirs, [s.active]: 1 } : s.dirs })
    })
  }, [])
  const warmUp = useCallback(() => {
    setState((s) => (s.warm ? s : withShown({ ...s, warm: true })))
  }, [])
  const touch = useCallback(() => {
    setAuto(false)
    warmUp()
  }, [warmUp])

  // Plays by itself on desktop, while it is in view, until somebody touches it.
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const view = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    // The small index thumbnails wait until the section is close, so they never compete with the hero on load.
    const approach = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        approach.disconnect()
      },
      { rootMargin: '200px 0px' },
    )
    view.observe(el)
    approach.observe(el)
    return () => {
      view.disconnect()
      approach.disconnect()
    }
  }, [])
  const playing = canAuto && auto && inView && !held
  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setTimeout(() => {
      if (!document.hidden) step(1)
    }, AUTO_MS)
    return () => window.clearTimeout(timer)
  }, [playing, active, step])

  // Keep the lit thumbnail in view inside its own strip, without ever moving the page.
  useEffect(() => {
    const el = strip.current
    const button = el && el.children[active]
    if (!button || el.scrollWidth <= el.clientWidth) return
    el.scrollTo({ left: button.offsetLeft - (el.clientWidth - button.offsetWidth) / 2, behavior: reduceMotion() ? 'auto' : 'smooth' })
  }, [active])

  // Drag the top print sideways and let go to throw it off the pile. Vertical movement stays page scroll.
  const onPointerDown = useCallback(
    (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      if (!event.target.closest('.print[data-pos="0"]')) return
      dragged.current = false
      const el = pile.current
      const start = { x: event.clientX, y: event.clientY, dx: 0, moved: false }
      const move = (e) => {
        start.dx = e.clientX - start.x
        if (!start.moved) {
          if (Math.abs(start.dx) < 8 || Math.abs(start.dx) < Math.abs(e.clientY - start.y)) return
          start.moved = true
          el.classList.add('is-dragging')
        }
        el.style.setProperty('--drag', `${start.dx}px`)
        el.style.setProperty('--dragr', (start.dx / 28).toFixed(2))
      }
      const finish = (e) => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', finish)
        window.removeEventListener('pointercancel', finish)
        if (!start.moved) return
        dragged.current = true
        el.classList.remove('is-dragging')
        el.style.removeProperty('--drag')
        el.style.removeProperty('--dragr')
        if (e.type === 'pointerup' && Math.abs(start.dx) > TOSS) {
          touch()
          step(1, start.dx < 0 ? -1 : 1)
        }
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', finish)
      window.addEventListener('pointercancel', finish)
    },
    [step, touch],
  )
  // A drag must not also count as a click on the link underneath.
  const onClickCapture = useCallback((event) => {
    if (!dragged.current) return
    dragged.current = false
    event.preventDefault()
    event.stopPropagation()
  }, [])
  const onBringUp = useCallback(
    (event, index) => {
      event.preventDefault()
      touch()
      jump(index)
    },
    [jump, touch],
  )
  const onKeyDown = useCallback(
    (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      touch()
      step(event.key === 'ArrowRight' ? 1 : -1)
    },
    [step, touch],
  )

  return (
    <div
      ref={root}
      className="container-x showcase"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        setHeld(true)
        warmUp()
      }}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
      }}
    >
      <div className="show-head">
        <p className="eyebrow" data-reveal>
          flick through them. every one is live.
        </p>
        <h2 className="mt-2 text-4xl sm:text-5xl lg:text-[2.9rem]" data-reveal>
          {ProjectCount} client sites and one app, built end to end.
        </h2>
      </div>

      <div className="show-stage">
        <div ref={pile} className="pile" style={{ '--tint': current.tint }} role="group" aria-roledescription="carousel" aria-label="Projects" onPointerDown={onPointerDown} onClickCapture={onClickCapture}>
          <span className="pile-glow" aria-hidden="true" />
          {items.map((item, index) => (
            <Print key={item.slug} item={item} index={index} active={active} dir={dirs[index] || 1} show={shown.has(index)} near={near} onBringUp={onBringUp} />
          ))}
        </div>
      </div>

      <div className="show-nav" onKeyDown={onKeyDown}>
        <div className="show-meta">
          <p className="show-count hand" aria-hidden="true">
            {active + 1} of {n}
          </p>
          {canAuto && (
            <button type="button" className="show-btn show-btn-sm" onClick={() => setAuto((value) => !value)} aria-label={auto ? 'Pause the slideshow' : 'Play the slideshow'}>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                {auto ? <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" /> : <path d="M4.5 2.3v11.4L13.5 8z" />}
              </svg>
            </button>
          )}
        </div>
        <button
          type="button"
          className="show-btn"
          aria-label="Previous project"
          onClick={() => {
            touch()
            step(-1)
          }}
        >
          <Icon name="arrow-left" className="h-5 w-5" />
        </button>
        <div ref={strip} className="show-index" role="group" aria-label="Choose a project">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className="show-thumb"
              aria-label={`Show ${item.name}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => {
                touch()
                jump(index)
              }}
            >
              {near && <img src={item.thumb} alt="" width="160" height="100" decoding="async" />}
              {playing && index === active && <span className="show-progress" style={{ '--auto-ms': `${AUTO_MS}ms` }} />}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="show-btn"
          aria-label="Next project"
          onClick={() => {
            touch()
            step(1)
          }}
        >
          <Icon name="arrow-right" className="h-5 w-5" />
        </button>
      </div>

      <div className="show-side">
        <p className="sr-only" aria-live="polite">
          {auto ? '' : `${current.name}, ${active + 1} of ${n}`}
        </p>
        <div className="show-infos">
          {items.map((item, index) => (
            <Info key={item.slug} item={item} on={index === active} />
          ))}
        </div>
        <a href="/projects/" className="link-arrow mt-7 text-sm">
          Every project, with my exact role
        </a>
      </div>
    </div>
  )
}
