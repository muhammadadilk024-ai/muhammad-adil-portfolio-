import { Layout } from '../components/Layout.jsx'
import { PageHeader } from '../components/Section.jsx'
import { site } from '../data/site.js'
import { graph, person, website, webPage, breadcrumb } from '../seo/schema.js'

const path = '/privacy/'
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy', path },
]

export const meta = {
  path,
  title: 'Privacy | Muhammad Adil',
  description: 'What muhammadadil.cloud collects (almost nothing), how the contact form works and who hosts the site.',
  robots: 'noindex, follow',
  schema: graph(webPage({ path, name: 'Privacy note', description: 'Privacy note for muhammadadil.cloud.' }), person(), website(), breadcrumb(crumbs)),
}

function PrivacyPage() {
  return (
    <Layout current={path}>
      <PageHeader crumbs={crumbs} eyebrow="Privacy" title="A short privacy note" lead="This is a personal portfolio. It collects as little as possible." />
      <section className="section pt-0">
        <div className="container-x max-w-3xl space-y-8 text-base text-cream/75">
          <div data-reveal>
            <h2 className="text-2xl">No analytics, no ads, no cookies set by me</h2>
            <p className="mt-3">The site runs no analytics scripts, sets no cookies of its own and shows no advertising. Pages are static files served from Hostinger, whose servers keep standard access logs (IP address, time, page requested) for security.</p>
          </div>
          <div data-reveal>
            <h2 className="text-2xl">The contact form</h2>
            <p className="mt-3">When you send the form, your name, email address, topic and message are delivered to my inbox through FormSubmit, a form to email service. I use them only to reply to you. If you would rather not use a third party service, email me directly at <a href={`mailto:${site.email}`} className="link-inline">{site.email}</a>.</p>
          </div>
          <div data-reveal>
            <h2 className="text-2xl">Links to other sites</h2>
            <p className="mt-3">Client sites, LinkedIn, GitHub and Aatox are separate websites with their own privacy practices.</p>
          </div>
          <div data-reveal>
            <h2 className="text-2xl">Questions</h2>
            <p className="mt-3">Write to <a href={`mailto:${site.email}`} className="link-inline">{site.email}</a> and I will answer. Last updated {site.updated}.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default { meta, Component: PrivacyPage }
