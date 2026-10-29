import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader } from '../components/Section.jsx'
import { ContactForm } from '../components/ContactForm.jsx'
import { CopyEmail } from '../components/CopyEmail.jsx'
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
    'Email, phone and a short form to reach Muhammad Adil, full stack and AI developer in Canada, for client projects, contracts and remote roles. Replies within one business day.',
  schema: graph(
    webPage({ path, name: 'Contact Muhammad Adil', description: 'How to reach Muhammad Adil for client projects, contracts and remote roles.', type: 'ContactPage' }),
    person(),
    website(),
    breadcrumb(crumbs),
  ),
}

const channels = [
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneE164}`, icon: 'phone' },
  { label: 'LinkedIn', value: 'muhammad-adil-15aa61297', href: site.linkedin, icon: 'linkedin-logo', external: true },
  { label: 'GitHub', value: 'muhammadadilk024-ai', href: site.github, icon: 'github-logo', external: true },
]

function ContactPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="say hello"
        title="Tell me what you're building"
        lead="A project, a fix, an app, an AI feature or a role. Write a few lines below or use a direct line. I reply within one business day."
        note="replies within one business day"
      />

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sheet sheet-sky p-5 sm:p-6" data-reveal>
              <p className="hand text-xl text-leaf">the fastest way</p>
              <div className="mt-2">
                <CopyEmail />
              </div>
            </div>
            <ul className="mt-4 space-y-3" data-reveal>
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener' : undefined}
                    className="sheet sheet-hover flex items-center gap-4 p-4 sm:p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky text-ink">
                      <Icon name={channel.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="hand block text-lg leading-none text-leaf">{channel.label.toLowerCase()}</span>
                      <span className="mt-1 block break-all text-base font-semibold text-ink">{channel.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6 text-base text-mute" data-reveal>
              <div>
                <p className="hand text-xl text-leaf">helpful to include</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" /> A link to your current site or product, if there is one</li>
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" /> What you need: a new build, a fix, an app, an AI feature, a role</li>
                  <li className="flex gap-3"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-leaf" /> A rough budget or salary range and a date</li>
                </ul>
              </div>
              <div>
                <p className="hand text-xl text-leaf">availability</p>
                <p className="mt-1">Based in Canada, remote, North American hours. Open to fixed scope projects, contracts and full time remote roles in Canada and the US.</p>
              </div>
              <div>
                <p className="hand text-xl text-leaf">resume</p>
                <a href={site.resume} download={site.resumeName} className="link-arrow mt-1">
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
