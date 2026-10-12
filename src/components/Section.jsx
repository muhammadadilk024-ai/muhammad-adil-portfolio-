import { Icon } from './Icons.jsx'

export function SectionHeading({ eyebrow, title, intro, align = 'left', as: Tag = 'h2', id }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{title}</Tag>
      {intro && <p className="mt-4 text-base text-cream/70 sm:text-lg">{intro}</p>}
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="hero-rise">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-cream/55">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <Icon name="arrow-right" className="h-3 w-3 opacity-60" />}
              {last ? (
                <span aria-current="page" className="text-cream/80">{item.name}</span>
              ) : (
                <a href={item.path} className="hover:text-accent">{item.name}</a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHeader({ eyebrow, title, lead, crumbs }) {
  return (
    <section className="grain overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="container-x relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow hero-rise">{eyebrow}</p>}
          <h1 className="h-gradient hero-rise mt-3 text-4xl sm:text-5xl lg:text-6xl" style={{ '--d': '80ms' }}>
            {title}
          </h1>
          {lead && (
            <p className="hero-rise mt-6 max-w-2xl text-lg text-cream/75 sm:text-xl" style={{ '--d': '160ms' }}>
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export function Stats({ items, className = '' }) {
  return (
    <dl className={`grid grid-cols-3 gap-4 ${className}`}>
      {items.map((stat, index) => (
        <div key={stat.label} className="border-l border-white/12 pl-4" data-reveal style={{ '--d': `${index * 80}ms` }}>
          <dd className="text-3xl font-semibold text-cream sm:text-4xl">{stat.value}</dd>
          <dt className="mt-1 text-xs text-cream/60 sm:text-sm">{stat.label}</dt>
        </div>
      ))}
    </dl>
  )
}

export function CtaBand({ title, text, primary = { label: 'Start a conversation', href: '/contact/' }, secondary }) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="surface grain overflow-hidden px-6 py-12 sm:px-12 sm:py-16" data-reveal>
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
              <p className="mt-4 max-w-xl text-base text-cream/70 sm:text-lg">{text}</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:col-span-4 lg:justify-end">
              <a href={primary.href} className="btn btn-primary">
                {primary.label} <Icon name="arrow-up-right" className="h-4 w-4" />
              </a>
              {secondary && (
                <a href={secondary.href} className="btn btn-secondary">
                  {secondary.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
