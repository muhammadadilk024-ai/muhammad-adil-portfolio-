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
    { label: 'Status', value: study.status },
    { label: 'My role', value: study.slug === 'knowwhere' ? 'Founder and sole developer (Aatox)' : study.slug === 'bc-scrap-cars' ? 'Solo developer at Tech Joint Solution' : 'Independent: brand, design, build, launch' },
    { label: 'Stack', value: study.stack.join(', ') },
  ]
  return (
    <div className="surface p-6 sm:p-8" data-reveal>
      <dl className="grid gap-5 sm:grid-cols-3">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/60">{row.label}</dt>
            <dd className="mt-1 text-base text-cream">{row.value}</dd>
          </div>
        ))}
      </dl>
      {study.url && (
        <a href={study.url} target="_blank" rel="noopener" className="btn btn-secondary btn-sm mt-6">
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
          <li key={node.label} className="surface p-5" data-reveal style={{ '--d': `${index * 100}ms` }}>
            <p className="text-xs font-semibold text-cream/60">0{index + 1}</p>
            <p className="mt-2 font-semibold text-cream">{node.label}</p>
            <p className="mt-1 text-sm text-cream/65">{node.detail}</p>
          </li>
        ))}
      </ol>
      {study.side && (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {study.side.map((node) => (
            <li key={node.label} className="rounded-2xl border border-dashed border-white/15 p-5" data-reveal>
              <p className="font-semibold text-cream">{node.label}</p>
              <p className="mt-1 text-sm text-cream/65">{node.detail}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
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
      <PageHeader crumbs={crumbs} eyebrow={study.kicker} title={study.h1} lead={study.summary} />

      <section className="section pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7" data-reveal>
            {study.mock === 'phone' ? (
              <div className="surface px-6 py-10">
                <PhoneMock />
              </div>
            ) : (
              <ProjectImage project={{ image: study.image, imageAlt: study.imageAlt, width: study.width, height: study.height, domain: study.urlLabel }} priority sizes="(min-width: 1024px) 60vw, 100vw" />
            )}
          </div>
          <div className="lg:col-span-5">
            <Facts study={study} />
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>The challenge</p>
            <h2 className="mt-3 text-3xl" data-reveal>What had to be true</h2>
          </div>
          <p className="text-lg text-cream/75 lg:col-span-8" data-reveal>{study.challenge}</p>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>What I built</p>
            <h2 className="mt-3 text-3xl" data-reveal>The work</h2>
          </div>
          <ul className="space-y-4 lg:col-span-8">
            {study.built.map((item, index) => (
              <li key={item} className="flex gap-4 border-t border-white/10 pt-4 text-base text-cream/80" data-reveal style={{ '--d': `${index * 60}ms` }}>
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x">
          <p className="eyebrow" data-reveal>How it fits together</p>
          <h2 className="mt-3 text-3xl" data-reveal>The flow</h2>
          <div className="mt-8">
            <Flow study={study} />
          </div>
        </div>
      </section>

      {study.notes && (
        <section className="section border-t border-white/10">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow" data-reveal>Notes</p>
              <h2 className="mt-3 text-3xl" data-reveal>Worth knowing</h2>
            </div>
            <ul className="space-y-3 lg:col-span-8">
              {study.notes.map((note) => (
                <li key={note} className="text-base text-cream/75" data-reveal>{note}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {quote && (
        <section className="section border-t border-white/10">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow" data-reveal>Client feedback</p>
              <h2 className="mt-3 text-3xl" data-reveal>In their words</h2>
            </div>
            <figure className="surface p-6 sm:p-8 lg:col-span-8" data-reveal>
              <span className="text-4xl font-semibold leading-none text-accent" aria-hidden="true">“</span>
              <blockquote className="mt-2 text-lg text-cream sm:text-xl">{quote.quote}</blockquote>
              <figcaption className="mt-6 text-sm text-cream/65"><span className="font-semibold text-cream">{quote.client}</span>, {quote.context}</figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="section border-t border-white/10">
        <div className="container-x">
          <p className="eyebrow" data-reveal>More case studies</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug} data-reveal>
                <a href={item.path} className="surface surface-hover block p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{item.kicker}</p>
                  <p className="mt-2 text-xl font-semibold text-cream">{item.name}</p>
                  <p className="mt-2 text-sm text-cream/65">{item.summary}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Need something like this?"
        text="Describe what you are building and I will tell you honestly whether I am the right person for it."
        secondary={{ label: 'All projects', href: '/projects/' }}
      />
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
