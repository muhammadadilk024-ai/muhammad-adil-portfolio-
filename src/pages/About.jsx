import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { PageHeader, SectionHeading, CtaBand } from '../components/Section.jsx'
import { site } from '../data/site.js'
import { skillGroups, journey } from '../data/skills.js'
import { graph, ids, person, employer, aatox, website, webPage, breadcrumb } from '../seo/schema.js'

const path = '/about/'
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path },
]

export const meta = {
  path,
  title: 'About Muhammad Adil | Self Taught Full Stack Developer in Canada',
  ogTitle: 'About Muhammad Adil',
  description:
    'Who Muhammad Adil is: a self taught full stack and AI developer in Canada, developer at Tech Joint Solution in Calgary since 2024, founder of Aatox, building since 2021. Background, timeline, stack and profiles.',
  ogType: 'profile',
  schema: graph(
    webPage({
      path,
      name: 'About Muhammad Adil',
      description: 'Background, timeline, stack and official profiles of Muhammad Adil, full stack and AI developer in Canada.',
      type: 'ProfilePage',
      extra: { mainEntity: { '@id': ids.person } },
    }),
    person(),
    employer(),
    aatox(),
    website(),
    breadcrumb(crumbs),
  ),
}

const facts = [
  { label: 'Name', value: 'Muhammad Adil' },
  { label: 'Role', value: 'Full stack and AI developer' },
  { label: 'Based in', value: 'Canada, working remotely' },
  { label: 'Working at', value: 'Tech Joint Solution, Calgary (since 2024)', href: site.employer.url },
  { label: 'Founder of', value: 'Aatox (2026), makers of KnowWhere', href: site.aatox },
  { label: 'Building since', value: '2021, self taught' },
  { label: 'Open to', value: 'Remote roles in Canada and the US, client projects' },
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
]

const principles = [
  {
    title: 'One pair of hands, start to finish',
    text: 'Design, database, frontend, deployment and the SEO basics. Nothing gets lost between a designer, a developer and an agency.',
  },
  {
    title: 'AI assisted, human verified',
    text: 'I use AI tools to move faster on drafts and boilerplate. Every change is checked with builds, automated tests and a manual review before it ships.',
  },
  {
    title: 'Honest claims only',
    text: 'The projects listed here are live and linked. Skills are labelled by where they come from: client work, my own products or foundations.',
  },
  {
    title: 'You keep everything',
    text: 'Code, content and accounts are handed over on your own hosting, so nothing ties you to me after launch.',
  },
]

function AboutPage() {
  return (
    <Layout current={path}>
      <PageHeader
        crumbs={crumbs}
        eyebrow="About"
        title="Muhammad Adil, full stack and AI developer"
        lead="Self taught since 2021. Developer at a Calgary web agency since 2024. Founder of a small software company in 2026. Based in Canada, working remotely with clients and teams in Canada and the US."
      />

      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <img
              src={site.photo}
              srcSet={`${site.photoSmall} 480w, ${site.photo} 960w`}
              sizes="(min-width: 1024px) 420px, 90vw"
              width={site.photoWidth}
              height={site.photoHeight}
              alt="Muhammad Adil"
              decoding="async"
              className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 shadow-card lg:mx-0"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl" data-reveal>At a glance</h2>
            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2" data-reveal>
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-white/10 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">{fact.label}</dt>
                  <dd className="mt-1 text-base text-cream">
                    {fact.href ? (
                      <a href={fact.href} className="link-inline break-words" target={fact.href.startsWith('http') ? '_blank' : undefined} rel={fact.href.startsWith('http') ? 'noopener' : undefined}>
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 space-y-4 text-base text-cream/70 sm:text-lg" data-reveal>
              <p>
                I learned to build by building. The first sites were WordPress, then PHP and JavaScript went deeper, then Python and Java. By 2023 I was delivering websites, ecommerce stores and custom coded WordPress plugins for businesses in travel, food, retail, consulting and nonprofit work.
              </p>
              <p>
                Since 2024 I have been a developer at Tech Joint Solution, a web agency in Calgary, Alberta, where I build client sites in Laravel and WordPress, as part of the team and as the only developer on projects such as BC Scrap Cars, Medaan and Beauty Supply Call.
              </p>
              <p>
                In 2026 I founded Aatox and started its first product, KnowWhere, a private voice first memory app. That is where my AI and mobile work lives: Flutter, Kotlin, an encrypted local database, a Cloudflare Worker backend and real time voice with Gemini Live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Timeline" title="How I got here" />
          </div>
          <ol className="lg:col-span-8">
            {journey.map((item, index) => (
              <li key={item.title} className="grid gap-2 border-t border-white/10 py-6 sm:grid-cols-[160px_1fr] sm:gap-8" data-reveal style={{ '--d': `${index * 80}ms` }}>
                <p className="text-sm font-semibold text-accent">{item.period}</p>
                <div>
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-2 text-base text-cream/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x">
          <SectionHeading eyebrow="How I work" title="Four things you can count on" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {principles.map((item, index) => (
              <li key={item.title} className="surface p-6 sm:p-8" data-reveal style={{ '--d': `${(index % 2) * 80}ms` }}>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/12 text-accent">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mt-2 text-base text-cream/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="stack" className="section scroll-mt-24 border-t border-white/10">
        <div className="container-x">
          <SectionHeading eyebrow="Stack" title="Tools, labelled by where they come from" intro="Client work means I have shipped it for a paying client. Own products means KnowWhere and personal projects. Foundations means solid fundamentals I keep sharp." />
          <div className="mt-12 space-y-8">
            {skillGroups.map((group, index) => (
              <div key={group.label} className="grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[220px_1fr]" data-reveal style={{ '--d': `${index * 60}ms` }}>
                <div>
                  <h3 className="text-lg">{group.label}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{group.level}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="chip gap-2 py-2">
                      {skill.logo && <img src={skill.logo} alt="" width="16" height="16" className="h-4 w-4" loading="lazy" decoding="async" />}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-x">
          <SectionHeading eyebrow="Profiles" title="Where else to find me" />
          <ul className="mt-10 flex flex-wrap gap-4" data-reveal>
            <li><a href={site.linkedin} target="_blank" rel="noopener" className="btn btn-secondary"><Icon name="linkedin-logo" className="h-4 w-4" /> LinkedIn</a></li>
            <li><a href={site.github} target="_blank" rel="noopener" className="btn btn-secondary"><Icon name="github-logo" className="h-4 w-4" /> GitHub</a></li>
            <li><a href={site.aatox} target="_blank" rel="noopener" className="btn btn-secondary"><Icon name="globe" className="h-4 w-4" /> Aatox</a></li>
            <li><a href={site.resume} download={site.resumeName} className="btn btn-secondary"><Icon name="download-simple" className="h-4 w-4" /> Resume (PDF)</a></li>
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want to work together?"
        text="For a remote role, a contract or a project, the quickest route is a short message. I reply within one business day."
        secondary={{ label: 'See the work', href: '/projects/' }}
      />
    </Layout>
  )
}

export default { meta, Component: AboutPage }
