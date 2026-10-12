import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader, SectionHeading, CtaBand } from '../components/Section.jsx'
import { FaqList } from '../components/FaqList.jsx'
import { services, process } from '../data/services.js'
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

function ServicesPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Services"
        title="Web, mobile and AI development, built end to end"
        lead="Five things I do well, each backed by a project you can open. Fixed quotes for defined scope, hourly for ongoing work, and everything delivered to your own hosting."
      />

      <section className="section pt-0">
        <div className="container-x space-y-6">
          {services.map((service, index) => (
            <article key={service.slug} id={service.slug} className="surface scroll-mt-24 grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:p-10" data-reveal style={{ '--d': `${(index % 2) * 80}ms` }}>
              <div className="lg:col-span-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-cream/60">0{index + 1}</span>
                </div>
                <h2 className="mt-6 text-2xl sm:text-3xl">{service.title}</h2>
                <p className="mt-3 text-lg font-semibold text-cream">{service.benefit}</p>
                <p className="mt-3 text-base text-cream/70">{service.detail}</p>
                <p className="mt-4 text-sm text-cream/60">
                  <strong className="font-semibold text-cream/80">Good fit:</strong> {service.fit}
                </p>
              </div>
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">What you get</p>
                <ul className="mt-3 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base text-cream/80">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Tools</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.tools.map((tool) => (
                        <li key={tool} className="chip">{tool}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Proof</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.proof.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="chip transition-colors duration-300 ease-fluid hover:border-accent/60 hover:text-cream"
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener' : undefined}
                          >
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

      <section className="section border-t border-white/10">
        <div className="container-x">
          <SectionHeading eyebrow="How a project runs" title="Three steps from first call to launch" intro="You get a quote and a timeline before any work starts, a working preview early, and support after launch." />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {process.map((step, index) => (
              <li key={step.step} className="surface p-6 sm:p-8" data-reveal style={{ '--d': `${index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent">
                    <Icon name={step.icon} className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-cream/60">{step.step}</span>
                </div>
                <h3 className="mt-6 text-2xl">{step.title}</h3>
                <p className="mt-3 text-base text-cream/70">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="surface mt-6 grid gap-6 p-6 sm:grid-cols-3 sm:p-8" data-reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Pricing</p>
              <p className="mt-2 text-base text-cream/80">Fixed quote for a defined scope, or hourly for ongoing work. No fee for the first call.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Ownership</p>
              <p className="mt-2 text-base text-cream/80">Code, content and accounts stay yours, on your hosting.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Hours</p>
              <p className="mt-2 text-base text-cream/80">Remote, North American hours. Replies within one business day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x">
          <SectionHeading eyebrow="Questions" title="Before you hire a developer" />
          <div className="mt-12">
            <FaqList items={servicesFaq} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell me what you need built."
        text="A link to your current site, a rough budget and a date are enough to start. You get a reply within one business day."
        secondary={{ label: 'See the work', href: '/projects/' }}
      />
    </Layout>
  )
}

export default { meta, Component: ServicesPage }
