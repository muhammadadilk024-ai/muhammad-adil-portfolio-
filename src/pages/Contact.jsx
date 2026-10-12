import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader } from '../components/Section.jsx'
import { ContactForm } from '../components/ContactForm.jsx'
import { site } from '../data/site.js'
import { graph, person, website, webPage, breadcrumb } from '../seo/schema.js'

const path = '/contact/'
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path },
]

export const meta = {
  path,
  title: 'Contact Muhammad Adil | Hire a Full Stack Developer (Remote, Canada)',
  ogTitle: 'Contact Muhammad Adil',
  description:
    'Email, phone and a short form to reach Muhammad Adil, full stack and AI developer in Canada, for remote roles, contracts and client projects. Replies within one business day.',
  schema: graph(
    webPage({ path, name: 'Contact Muhammad Adil', description: 'How to reach Muhammad Adil for remote roles, contracts and client projects.', type: 'ContactPage' }),
    person(),
    website(),
    breadcrumb(crumbs),
  ),
}

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: 'envelope-simple' },
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneE164}`, icon: 'phone' },
  { label: 'LinkedIn', value: 'muhammad-adil-15aa61297', href: site.linkedin, icon: 'linkedin-logo', external: true },
  { label: 'GitHub', value: 'muhammadadilk024-ai', href: site.github, icon: 'github-logo', external: true },
]

function ContactPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Let's talk about your project or role"
        lead="Hiring for a remote position, or have something to build? Write a few lines below or use a direct line. I reply within one business day."
      />

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="space-y-4" data-reveal>
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener' : undefined}
                    className="surface surface-hover flex items-center gap-4 p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent">
                      <Icon name={channel.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">{channel.label}</span>
                      <span className="mt-1 block break-all text-base text-cream">{channel.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6 text-base text-cream/70" data-reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Helpful to include</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" /> A link to your current site or product, if there is one</li>
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" /> What you need: a new build, a fix, an app, an AI feature, a role</li>
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" /> A rough budget or salary range and a date</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Availability</p>
                <p className="mt-2">Based in Canada, remote, North American hours. Open to full time remote roles in Canada and the US, contracts and fixed scope projects.</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Resume</p>
                <a href={site.resume} download={site.resumeName} className="link-arrow mt-2">
                  <Icon name="download-simple" className="h-4 w-4" /> Download the one page resume (PDF)
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default { meta, Component: ContactPage }
