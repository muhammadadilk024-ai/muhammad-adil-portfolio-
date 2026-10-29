import { Layout } from '../components/Layout.jsx'
import { PageHeader, SectionHeading, CtaBand } from '../components/Section.jsx'
import { FeatureCard } from '../components/FeatureCard.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { site } from '../data/site.js'
import { projects } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { graph, person, website, webPage, breadcrumb, itemList } from '../seo/schema.js'

const path = '/projects/'
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path },
]

export const meta = {
  path,
  title: 'Projects & Case Studies: Laravel, WordPress, Flutter | Muhammad Adil',
  ogTitle: 'Projects and case studies by Muhammad Adil',
  description:
    'Nine live client projects and three case studies by Muhammad Adil: Laravel lead generation and ecommerce sites, bilingual WordPress platforms and KnowWhere, a Flutter voice app built with Gemini Live.',
  schema: graph(
    webPage({ path, name: 'Projects and case studies by Muhammad Adil', description: 'Live client projects and case studies: Laravel, WordPress, WooCommerce and Flutter work by Muhammad Adil.', type: 'CollectionPage' }),
    itemList(
      [
        ...caseStudies.map((study) => ({ name: `${study.name} case study`, href: `${site.url}${study.path}` })),
        ...projects.map((project) => ({ name: project.name, href: project.url })),
      ],
      path,
      'Projects by Muhammad Adil',
    ),
    person(),
    website(),
    breadcrumb(crumbs),
  ),
}

function ProjectsPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="all of it, with my exact role"
        title="Nine client sites you can open, three stories in depth"
        lead="Every card says what I built and whether I did it alone or as part of the Tech Joint Solution team. The live sites are one click away, so you can judge the work yourself."
        note="all nine are live right now"
      />

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="the three with a story" title="Case studies" />
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {caseStudies.map((study, index) => (
              <FeatureCard key={study.slug} study={study} index={index} wide={index === 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-x">
          <SectionHeading
            eyebrow="client work"
            title="Nine live client projects"
            intro="Laravel builds as the solo developer at Tech Joint Solution, and WordPress, WooCommerce and custom builds delivered independently from brand to launch."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want something like this for your business?" text="Send a link to your current site or a short description of what you need. I reply within one business day." secondary={{ label: 'See services', href: '/services/' }} />
    </Layout>
  )
}

export default { meta, Component: ProjectsPage }
