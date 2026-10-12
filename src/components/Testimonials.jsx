import { testimonials } from '../data/testimonials.js'
import { Icon } from './Icons.jsx'
import { SectionHeading } from './Section.jsx'

/** Client quotes in an uneven two column grid, each linked to the live site it came from. */
export function Testimonials({ id = 'testimonials', eyebrow = 'Client feedback', title = 'In my clients’ words', intro }) {
  return (
    <section id={id} className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-4 lg:grid-cols-12">
          {testimonials.map((item, index) => (
            <li
              key={item.project}
              className={`surface surface-hover flex flex-col justify-between p-6 sm:p-8 ${index % 4 === 0 || index % 4 === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}
              data-reveal
              style={{ '--d': `${(index % 2) * 80}ms` }}
            >
              <figure>
                <span className="text-4xl font-semibold leading-none text-accent" aria-hidden="true">“</span>
                <blockquote className="mt-2 text-lg text-cream sm:text-xl">{item.quote}</blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-sm text-cream/65">
                  <span className="font-semibold text-cream">{item.client}</span>
                  <span>{item.context}</span>
                  <a href={item.url} target="_blank" rel="noopener" className="link-arrow text-sm text-cream/70">
                    Open the site <Icon name="arrow-up-right" className="h-4 w-4" />
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** One short quote for a project card or case study. */
export function ProjectQuote({ item, className = '' }) {
  if (!item) return null
  return (
    <figure className={`rounded-xl bg-accent/8 p-4 ${className}`}>
      <blockquote className="text-sm text-cream/85">“{item.quote}”</blockquote>
      <figcaption className="mt-2 text-xs text-cream/60">{item.client}</figcaption>
    </figure>
  )
}
