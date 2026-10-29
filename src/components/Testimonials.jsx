import { testimonials } from '../data/testimonials.js'
import { Icon } from './Icons.jsx'
import { SectionHeading } from './Section.jsx'

/** Client quotes on the services page, each linked to the live site it came from. */
export function Testimonials({ id = 'testimonials', eyebrow = 'actual messages, unedited', title = 'What clients say after launch', intro }) {
  return (
    <section id={id} className="section scroll-mt-16 bg-sky/60">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <li key={item.project} className="bubble max-w-none" data-reveal style={{ '--d': `${(index % 2) * 90}ms` }}>
              <figure>
                <blockquote className="text-lg leading-snug text-ink sm:text-xl">{item.quote}</blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
                  <span className="hand text-xl text-leaf">{item.client}</span>
                  <span>{item.context}</span>
                  <a href={item.url} target="_blank" rel="noopener" className="link-arrow text-sm">
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
    <figure className={`rounded-2xl bg-sky/70 p-4 ${className}`}>
      <blockquote className="text-sm text-ink">“{item.quote}”</blockquote>
      <figcaption className="hand mt-1 text-lg leading-none text-leaf">{item.client}</figcaption>
    </figure>
  )
}
