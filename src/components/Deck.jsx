import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { useScrollProgress } from './hooks.js'

const thumb = (project) => project.image.replace(/\.webp$/, '-560.webp')
const href = (project) => (project.caseStudy ? `/projects/${project.slug}/` : project.url)
const count = projects.length
const middle = (count - 1) / 2

function Card({ project, index, geo }) {
  const c = (index - middle) / middle
  const external = !project.caseStudy
  const style = {
    '--w': `${geo.w}px`,
    '--h': `${Math.round(geo.w * 0.6875)}px`,
    '--x': `${Math.round(c * geo.spread)}px`,
    '--y': `${Math.round(c * c * geo.drop)}px`,
    '--r': (c * 24).toFixed(1),
    '--r0': ((index * 37) % 7) - 3,
    height: `${Math.round(geo.w * 0.6875)}px`,
    zIndex: index + 1,
  }
  return (
    <div className="deck-card" style={style}>
      <a href={href(project)} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined} data-cursor={external ? 'Open site' : 'Case study'}>
        <img src={thumb(project)} alt={`${project.name}, ${project.type.toLowerCase()} built by Muhammad Adil`} width="560" height="385" loading="lazy" decoding="async" />
        <span className="deck-label">
          {project.name}
          <span className="block text-xs font-medium opacity-80">{project.caseStudy ? 'Read the case study' : project.domain}</span>
        </span>
      </a>
    </div>
  )
}

/** Nine project cards, stacked like a hand of cards, that fan out as the section scrolls. Swipeable strip on phones. */
export function Deck() {
  const stage = useRef(null)
  const [geo, setGeo] = useState({ w: 250, spread: 460, drop: 90 })
  // Starts a third of the way open so every card is already a visible, tappable target, then fans the rest on scroll.
  const compute = useCallback((rect, vh) => {
    const raw = (-rect.top + vh * 0.1) / ((rect.height - vh) * 0.78)
    return 0.32 + 0.68 * Math.min(1, Math.max(0, raw))
  }, [])
  useScrollProgress(stage, compute)

  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const measure = () => {
      const width = el.clientWidth
      const w = Math.round(Math.min(276, Math.max(170, width * 0.2)))
      const spread = Math.round(Math.min(width / 2 - w / 2 - 12, 540))
      setGeo({ w, spread, drop: Math.round(Math.min(110, width * 0.075)) })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={stage} className="deck-stage hidden md:block" style={{ height: '165vh' }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div className="container-x pt-24">
            <p className="eyebrow">go on, click one. they're all live.</p>
            <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">Nine client sites and one app, built end to end.</h2>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-0 top-6">
              {projects.map((project, index) => (
                <Card key={project.slug} project={project} index={index} geo={geo} />
              ))}
            </div>
          </div>
          <div className="container-x pb-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="hand text-xl text-sprout">the three with a story:</span>
              {caseStudies.map((study) => (
                <a key={study.slug} href={study.path} className="link-arrow text-sm">
                  {study.name}
                </a>
              ))}
              <a href="/projects/" className="ml-auto link-arrow text-sm">
                Every project, with my exact role
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="container-x">
          <p className="eyebrow">go on, tap one. they're all live.</p>
          <h2 className="mt-2 text-4xl">Nine client sites and one app, built end to end.</h2>
        </div>
        <div className="strip mt-6">
          {projects.map((project) => (
            <a key={project.slug} href={href(project)} className="strip-card" target={project.caseStudy ? undefined : '_blank'} rel={project.caseStudy ? undefined : 'noopener'}>
              <img src={thumb(project)} alt={`${project.name}, ${project.type.toLowerCase()} built by Muhammad Adil`} width="560" height="385" loading="lazy" decoding="async" />
              <span className="deck-label">
                {project.name}
                <span className="block text-xs font-medium opacity-80">{project.caseStudy ? 'Read the case study' : project.domain}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="container-x flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="hand text-xl text-sprout">the three with a story:</span>
          {caseStudies.map((study) => (
            <a key={study.slug} href={study.path} className="link-arrow text-sm">
              {study.name}
            </a>
          ))}
          <a href="/projects/" className="link-arrow text-sm">
            Every project, with my exact role
          </a>
        </div>
      </div>
    </>
  )
}
