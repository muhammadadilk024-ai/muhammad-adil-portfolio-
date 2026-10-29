import { Icon } from './Icons.jsx'
import { ProjectImage } from './ProjectCard.jsx'
import { PhoneMock } from './PhoneMock.jsx'
import { AppHero } from './Gallery.jsx'

/** Case study teaser used on the projects page. */
export function FeatureCard({ study, index = 0, wide = false }) {
  const visual = study.shot ? (
    <AppHero shot={study.shot} logo={study.logo} note="say it once, ask any time" tile priority={index === 0} />
  ) : study.mock === 'phone' ? (
    <div className="rounded-2xl bg-sky px-4 py-6">
      <PhoneMock />
    </div>
  ) : (
    <ProjectImage
      project={{ image: study.image, imageAlt: study.imageAlt, width: study.width, height: study.height, domain: study.urlLabel }}
      sizes={wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'}
    />
  )

  return (
    <article
      className={`sheet sheet-hover group overflow-hidden ${wide ? 'lg:col-span-12 lg:grid lg:grid-cols-2 lg:items-center' : index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}`}
      data-reveal
      style={{ '--d': `${(index % 3) * 100}ms` }}
    >
      <a href={study.path} className="block p-2" tabIndex={-1} aria-hidden="true" data-cursor="Case study">
        {visual}
      </a>
      <div className="p-6 sm:p-8">
        <p className="hand text-xl leading-none text-leaf">{study.kicker.toLowerCase()}</p>
        <h3 className="mt-3 text-2xl sm:text-3xl">{study.name}</h3>
        <p className="mt-3 text-base text-mute">{study.summary}</p>
        <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex" aria-label="Stack">
          {study.stack.slice(0, 4).map((item) => (
            <li key={item} className="chip">{item}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a href={study.path} className="link-arrow">
            Read the case study
          </a>
          {study.url && (
            <a href={study.url} target="_blank" rel="noopener" className="link-arrow text-mute">
              {study.urlLabel} <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
