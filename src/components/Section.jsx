import { Icon } from './Icons.jsx'
import { CopyEmail } from './CopyEmail.jsx'

export function SectionHeading({ eyebrow, title, intro, align = 'left', as: Tag = 'h2', id, className = '' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="mt-2 text-4xl sm:text-5xl">{title}</Tag>
      {intro && <p className="lead mt-4">{intro}</p>}
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="hero-rise">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-mute">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <Icon name="arrow-right" className="h-3 w-3 opacity-60" />}
              {last ? (
                <span aria-current="page" className="font-semibold text-ink">{item.name}</span>
              ) : (
                <a href={item.path} className="hover:text-leaf">{item.name}</a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHeader({ eyebrow, title, lead, crumbs, note }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <div className="container-x relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="max-w-3xl lg:col-span-9">
            {eyebrow && <p className="eyebrow hero-rise">{eyebrow}</p>}
            <h1 className="hero-rise mt-2 text-4xl sm:text-5xl lg:text-6xl" style={{ '--d': '80ms' }}>
              {title}
            </h1>
            {lead && (
              <p className="lead hero-rise mt-5 max-w-2xl" style={{ '--d': '160ms' }}>
                {lead}
              </p>
            )}
          </div>
          {note && (
            <div className="hero-rise lg:col-span-3 lg:justify-self-end" style={{ '--d': '300ms' }}>
              <span className="note" style={{ '--rot': '3deg' }}>{note}</span>
            </div>
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
        <div key={stat.label} className="border-l-2 border-sprout pl-4" data-reveal style={{ '--d': `${index * 80}ms` }}>
          <dd className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">{stat.value}</dd>
          <dt className="mt-1 text-xs text-mute sm:text-sm">{stat.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** The closing block on every page: leaf green, the email in big type, one button. */
export function CtaBand({ title = 'Got something in mind? Tell me.', text = 'A link to your current site, a rough budget and a date are enough to start. I reply within one business day.', primary = { label: "Tell me what you're building", href: '/contact/' }, secondary }) {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <div className="on-dark relative overflow-hidden rounded-[2rem] bg-leaf px-6 py-12 text-paper sm:px-12 sm:py-16" data-reveal>
          <span className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sprout/25 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="hand text-2xl text-sprout">no forms required, an email is fine</p>
            <h2 className="mt-2 max-w-3xl text-4xl text-paper sm:text-5xl lg:text-6xl">{title}</h2>
            <div className="mt-6 text-paper [&_.link-inline]:text-paper [&_.link-inline]:decoration-sprout [&_.link-inline:hover]:text-sprout [&_button]:border-paper/30 [&_button]:bg-transparent [&_button]:text-paper [&_button:hover]:border-sprout [&_button:hover]:text-sprout">
              <CopyEmail size="lg" />
            </div>
            <p className="mt-5 max-w-xl text-base text-paper/80 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={primary.href} className="btn btn-paper">
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
