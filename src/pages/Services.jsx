import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader, SectionHeading, CtaBand } from '../components/Section.jsx'
import { FaqList } from '../components/FaqList.jsx'
import { Testimonials } from '../components/Testimonials.jsx'
import { services } from '../data/services.js'
import { steps } from '../data/home.js'
import { servicesFaq } from '../data/faq.js'
import { graph, person, employer, website, webPage, breadcrumb, professionalService, faqPage } from '../seo/schema.js'

const path = '/services/'
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path },
]

export const meta = {
  path,
  title: 'Web, Mobile & AI Development Services | Muhammad Adil',
  ogTitle: 'Web, mobile and AI development services',
  description:
    'Custom Laravel and WordPress platforms, AI apps and agents, Flutter mobile apps, ecommerce stores and technical SEO, built end to end by one developer in Canada. Fixed quotes, your hosting, your code.',
  schema: graph(
    webPage({ path, name: 'Web, mobile and AI development services by Muhammad Adil', description: 'Services offered by Muhammad Adil: custom web platforms, AI apps and agents, mobile apps, ecommerce stores, SEO and performance.' }),
    professionalService(services),
    faqPage(servicesFaq, path),
    person(),
    employer(),
    website(),
    breadcrumb(crumbs),
  ),
}

const isExternal = (href) => href.startsWith('http')

function ServicesPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="what I can build for you"
        title="Websites, stores, apps and AI, built end to end"
        lead="Five things I do well, each backed by a project you can open. Fixed quotes for a defined scope, hourly for ongoing work, and everything delivered to your own hosting."
        note="first call is free"
      />

      <section className="section pt-0">
        <div className="container-x space-y-6">
          {services.map((service, index) => (
            <article key={service.slug} id={service.slug} className="sheet scroll-mt-24 grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-10" data-reveal style={{ '--d': `${(index % 2) * 80}ms` }}>
              <div className="lg:col-span-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-ink">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-6 text-2xl sm:text-3xl">{service.title}</h2>
                <p className="mt-3 text-lg font-semibold text-ink">{service.benefit}</p>
                <p className="mt-3 text-base text-mute">{service.detail}</p>
                <p className="mt-4 text-sm text-mute">
                  <span className="hand text-lg text-leaf">good fit: </span>
                  {service.fit}
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="hand text-xl text-leaf">what you get</p>
                <ul className="mt-2 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base text-ink/85">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="hand text-xl text-leaf">tools</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <li key={tool} className="chip">{tool}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="hand text-xl text-leaf">proof</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {service.proof.map((item) => (
                        <li key={item.href}>
                          <a href={item.href} className="chip" target={isExternal(item.href) ? '_blank' : undefined} rel={isExternal(item.href) ? 'noopener' : undefined}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-x">
          <SectionHeading eyebrow="three steps, no surprises" title="How a project goes" intro="You get a quote and a timeline before any work starts, a working preview early, and support after launch." />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="sheet p-6 sm:p-8" data-reveal style={{ '--d': `${index * 100}ms` }}>
                <span className="hand text-4xl leading-none text-leaf" aria-hidden="true">{index + 1}</span>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-3 text-base text-mute">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="sheet sheet-sky mt-5 grid gap-6 p-6 sm:grid-cols-3 sm:p-8" data-reveal>
            <div>
              <p className="hand text-xl text-leaf">pricing</p>
              <p className="mt-1 text-base text-ink/85">Fixed quote for a defined scope, or hourly for ongoing work. No fee for the first call.</p>
            </div>
            <div>
              <p className="hand text-xl text-leaf">ownership</p>
              <p className="mt-1 text-base text-ink/85">Code, content and accounts stay yours, on your hosting.</p>
            </div>
            <div>
              <p className="hand text-xl text-leaf">hours</p>
              <p className="mt-1 text-base text-ink/85">Remote, North American hours. Replies within one business day.</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials intro="What it is like to work with me, from the people who did." />

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="before you hire a developer" title="Questions clients ask" />
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={servicesFaq} />
          </div>
        </div>
      </section>

      <CtaBand title="Tell me what you need built." text="A link to your current site, a rough budget and a date are enough to start. You get a reply within one business day." secondary={{ label: 'See the work', href: '/projects/' }} />
    </Layout>
  )
}

export default { meta, Component: ServicesPage }
