import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader, CtaBand } from '../components/Section.jsx'
import { ProjectImage } from '../components/ProjectCard.jsx'
import { PhoneMock } from '../components/PhoneMock.jsx'
import { caseStudies, caseStudyBySlug } from '../data/caseStudies.js'
import { site } from '../data/site.js'
import { testimonialFor } from '../data/testimonials.js'
import { graph, ids, person, aatox, website, webPage, breadcrumb, softwareApp } from '../seo/schema.js'

function Facts({ study }) {
  const rows = [
    { label: 'status', value: study.status },
    { label: 'my role', value: study.slug === 'knowwhere' ? 'Founder and sole developer (Aatox)' : study.slug === 'bc-scrap-cars' ? 'Solo developer at Tech Joint Solution' : 'Independent: brand, design, build, launch' },
    { label: 'stack', value: study.stack.join(', ') },
  ]
  return (
    <div className="sheet sheet-sky p-6 sm:p-8" data-reveal>
      <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="hand text-xl leading-none text-leaf">{row.label}</dt>
            <dd className="mt-1.5 text-base font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      {study.url && (
        <a href={study.url} target="_blank" rel="noopener" className="btn btn-ink btn-sm mt-6">
          Open {study.urlLabel} <Icon name="arrow-up-right" className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}

function Flow({ study }) {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3">
        {study.flow.map((node, index) => (
          <li key={node.label} className="sheet p-5" data-reveal style={{ '--d': `${index * 100}ms` }}>
            <p className="hand text-2xl leading-none text-leaf">{index + 1}</p>
            <p className="mt-2 font-bold text-ink">{node.label}</p>
            <p className="mt-1 text-sm text-mute">{node.detail}</p>
          </li>
        ))}
      </ol>
      {study.side && (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {study.side.map((node) => (
            <li key={node.label} className="rounded-2xl border border-dashed border-ink/25 p-5" data-reveal>
              <p className="font-bold text-ink">{node.label}</p>
              <p className="mt-1 text-sm text-mute">{node.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Block({ eyebrow, title, children }) {
  return (
    <section className="section border-t border-line">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow" data-reveal>{eyebrow}</p>
          <h2 className="mt-2 text-3xl" data-reveal>{title}</h2>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}

function CaseStudyPage({ study }) {
  const related = study.related.map((slug) => caseStudyBySlug(slug)).filter(Boolean)
  const quote = testimonialFor(study.slug)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
    { name: study.name, path: study.path },
  ]

  return (
    <Layout current={study.path}>
      <PageHeader crumbs={crumbs} eyebrow={study.kicker.toLowerCase()} title={study.h1} lead={study.summary} />

      <section className="section pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8" data-reveal>
            {study.mock === 'phone' ? (
              <div className="rounded-3xl bg-sky px-6 py-10">
                <PhoneMock />
              </div>
            ) : (
              <ProjectImage project={{ image: study.image, imageAlt: study.imageAlt, width: study.width, height: study.height, domain: study.urlLabel }} priority sizes="(min-width: 1024px) 60vw, 100vw" />
            )}
          </div>
          <div className="lg:col-span-4">
            <Facts study={study} />
          </div>
        </div>
      </section>

      <Block eyebrow="the challenge" title="What had to be true">
        <p className="text-lg text-mute sm:text-xl" data-reveal>{study.challenge}</p>
      </Block>

      <Block eyebrow="what I built" title="The work">
        <ul className="space-y-4">
          {study.built.map((item, index) => (
            <li key={item} className="flex gap-4 border-t border-line pt-4 text-base text-ink/85" data-reveal style={{ '--d': `${index * 60}ms` }}>
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Block>

      <section className="section border-t border-line">
        <div className="container-x">
          <p className="eyebrow" data-reveal>how it fits together</p>
          <h2 className="mt-2 text-3xl" data-reveal>The flow</h2>
          <div className="mt-8">
            <Flow study={study} />
          </div>
        </div>
      </section>

      {study.notes && (
        <Block eyebrow="notes" title="Worth knowing">
          <ul className="space-y-3">
            {study.notes.map((note) => (
              <li key={note} className="text-base text-mute" data-reveal>{note}</li>
            ))}
          </ul>
        </Block>
      )}

      {quote && (
        <Block eyebrow="client feedback" title="In their words">
          <figure className="bubble max-w-none" data-reveal>
            <blockquote className="text-lg text-ink sm:text-xl">{quote.quote}</blockquote>
            <figcaption className="mt-4 text-sm text-mute"><span className="hand text-xl text-leaf">{quote.client}</span>, {quote.context}</figcaption>
          </figure>
        </Block>
      )}

      <section className="section border-t border-line">
        <div className="container-x">
          <p className="eyebrow" data-reveal>more stories</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug} data-reveal>
                <a href={item.path} className="sheet sheet-hover block p-6" data-cursor="Case study">
                  <p className="hand text-lg leading-none text-leaf">{item.kicker.toLowerCase()}</p>
                  <p className="mt-2 text-xl font-bold text-ink">{item.name}</p>
                  <p className="mt-2 text-sm text-mute">{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Need something like this?" text="Describe what you are building and I will tell you honestly whether I am the right person for it." secondary={{ label: 'All projects', href: '/projects/' }} />
    </Layout>
  )
}

/** Builds the page module for one case study. */
export function caseStudyPage(slug) {
  const study = caseStudyBySlug(slug)
  if (!study) throw new Error(`Unknown case study: ${slug}`)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
    { name: study.name, path: study.path },
  ]
  const nodes = [
    webPage({
      path: study.path,
      name: study.title,
      description: study.description,
      extra: slug === 'knowwhere' ? { about: { '@id': 'https://aatox.com/knowwhere/#app' }, author: { '@id': ids.person } } : { author: { '@id': ids.person } },
    }),
    person(),
    website(),
    breadcrumb(crumbs),
  ]
  if (slug === 'knowwhere') nodes.push(softwareApp(), aatox())
  const meta = {
    path: study.path,
    title: study.title,
    ogTitle: study.h1,
    description: study.description,
    ogType: 'article',
    schema: graph(...nodes),
  }
  const Component = () => <CaseStudyPage study={study} />
  return { meta, Component }
}

export const caseStudyPages = Object.fromEntries(caseStudies.map((study) => [study.path, caseStudyPage(study.slug)]))
export { site }
