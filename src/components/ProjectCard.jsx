import { Icon } from './Icons.jsx'
import { testimonialFor } from '../data/testimonials.js'
import { ProjectQuote } from './Testimonials.jsx'

export function ProjectImage({ project, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', priority = false }) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/10 ${className}`}
      style={{ backgroundColor: project.background || '#1f1f1f', aspectRatio: '16 / 10' }}
    >
      <img
        src={project.image}
        alt={project.imageAlt || `Homepage of ${project.domain}, built by Muhammad Adil`}
        width={project.width}
        height={project.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        sizes={sizes}
        className={`h-full w-full ${project.fit === 'contain' ? 'object-contain p-2' : 'object-cover object-top'} transition-transform duration-700 ease-fluid group-hover:scale-[1.03]`}
      />
    </div>
  )
}

/** Compact card for the projects grid. */
export function ProjectCard({ project, index = 0 }) {
  const href = project.caseStudy ? `/projects/${project.slug}/` : project.url
  const external = !project.caseStudy
  return (
    <article className="surface surface-hover group flex flex-col p-2" data-reveal style={{ '--d': `${(index % 3) * 80}ms` }}>
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined} className="block rounded-lg" tabIndex={-1} aria-hidden="true">
        <ProjectImage project={project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </a>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{project.type}</p>
        <h3 className="mt-2 text-xl">{project.name}</h3>
        <p className="mt-2 text-sm text-cream/70">{project.summary}</p>
        <p className="mt-3 text-xs text-cream/55">{project.role}</p>
        <ProjectQuote item={testimonialFor(project.slug)} className="mt-4" />
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
          {project.caseStudy && (
            <a href={`/projects/${project.slug}/`} className="link-arrow text-sm">
              Case study <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          )}
          <a href={project.url} target="_blank" rel="noopener" className="link-arrow text-sm text-cream/70">
            {project.domain} <Icon name="arrow-up-right" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
