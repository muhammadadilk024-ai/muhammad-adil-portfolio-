import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { TaglineReveal } from '../components/Reveal.jsx'
import { SectionHeading, Stats, CtaBand } from '../components/Section.jsx'
import { ProjectImage } from '../components/ProjectCard.jsx'
import { FeatureCard } from '../components/FeatureCard.jsx'
import { FaqList } from '../components/FaqList.jsx'
import { Testimonials } from '../components/Testimonials.jsx'
import { site } from '../data/site.js'
import { projects, bySlug } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { services, process } from '../data/services.js'
import { homeFaq } from '../data/faq.js'
import { graph, ids, person, employer, aatox, website, webPage, professionalService, faqPage } from '../seo/schema.js'

const path = '/'

export const meta = {
  path,
  title: 'Muhammad Adil | Full Stack & AI Developer in Canada (Remote)',
  ogTitle: 'Muhammad Adil, full stack and AI developer in Canada',
  description:
    'Full stack and AI developer in Canada with five years of experience: Laravel and WordPress platforms, Flutter apps and AI products, 20+ client projects shipped. Open to remote roles in Canada and the US and to new client work.',
  ogType: 'profile',
  schema: graph(
    webPage({
      path,
      name: 'Muhammad Adil, full stack and AI developer in Canada',
      description: site.description,
      type: 'ProfilePage',
      extra: { mainEntity: { '@id': ids.person } },
    }),
    person(),
    employer(),
    aatox(),
    website(),
    professionalService(services),
    faqPage(homeFaq, path),
  ),
}

const profiles = [
  { name: 'GitHub', href: site.github, icon: 'github-logo', note: 'Code and commit history' },
  { name: 'LinkedIn', href: site.linkedin, icon: 'linkedin-logo', note: 'Experience and recommendations' },
  { name: 'Aatox', href: site.aatox, icon: 'globe', note: 'My company and KnowWhere' },
  { name: 'Tech Joint Solution', href: site.employer.url, icon: 'map-pin', note: 'The Calgary agency I build for' },
]

function Hero() {
  const front = bySlug('bc-scrap-cars')
  const back = bySlug('sb-traworld')
  const mask = 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)'

  return (
    <section id="top" className="grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <img
        src="/images/terrain.webp"
        alt=""
        width="1024"
        height="1024"
        aria-hidden="true"
        decoding="async"
        fetchPriority="low"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow hero-rise">Muhammad Adil, full stack and AI developer, Canada</p>
          <h1 className="h-gradient hero-rise mt-4 max-w-[680px] text-4xl sm:text-5xl xl:text-6xl" style={{ '--d': '80ms' }}>
            Full stack developer for web platforms, apps and AI products.
          </h1>
          <p className="hero-rise mt-6 max-w-[680px] text-lg text-cream/75 sm:text-xl" style={{ '--d': '160ms' }}>
            I am Muhammad Adil. For five years I have built Laravel and WordPress platforms, Flutter apps and AI features for clients, with more than 20 projects shipped. Open to remote roles in Canada and the US, and to new client work.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-6" style={{ '--d': '240ms' }}>
            <a href="/contact/" className="btn btn-primary">
              Start a conversation <Icon name="arrow-up-right" className="h-4 w-4" />
            </a>
            <a href="#work" className="link-arrow">
              See selected work <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </div>
          <p className="hero-rise mt-8 text-sm text-cream/60" style={{ '--d': '320ms' }}>
            Developer at <a href={site.employer.url} className="link-inline" target="_blank" rel="noopener">Tech Joint Solution</a>, Calgary.
            Founder of <a href={site.aatox} className="link-inline" target="_blank" rel="noopener">Aatox</a>. Building since 2021.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none" style={{ aspectRatio: '4 / 3' }}>
            <div className="group hero-rise absolute left-0 top-0 w-[78%] -rotate-2 rounded-xl shadow-card" style={{ '--d': '200ms' }}>
              <ProjectImage project={front} priority sizes="(min-width: 1024px) 36vw, 80vw" />
            </div>
            <div className="group hero-rise absolute bottom-0 right-0 w-[66%] rotate-2 rounded-xl shadow-card" style={{ '--d': '320ms' }}>
              <ProjectImage project={back} sizes="(min-width: 1024px) 30vw, 66vw" />
            </div>
            <div className="surface hero-rise absolute -bottom-4 left-4 flex items-center gap-3 px-4 py-3 shadow-card" style={{ '--d': '440ms' }}>
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-xs text-cream/80">9 live client sites. Open any of them.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x relative mt-16 sm:mt-20">
        <Stats items={site.stats} className="max-w-3xl" />
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Three projects, in depth"
            intro="The problem, what I built and how the pieces fit together. Every live site is one click away, so you can judge the work yourself."
          />
          <a href="/projects/" className="link-arrow shrink-0" data-reveal>
            All nine client projects <Icon name="arrow-right" className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {caseStudies.map((study, index) => (
            <FeatureCard key={study.slug} study={study} index={index} wide={index === 2} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Tagline() {
  return (
    <section className="section">
      <div className="container-x">
        <TaglineReveal
          text="I design it, build it and ship it myself. No hand offs, no gaps, and I am still there after launch."
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl"
        />
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <SectionHeading
          eyebrow="What I build"
          title="Five things I do well"
          intro="Each one links to a project you can open. Benefits first, then the detail."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className={`surface surface-hover p-5 sm:p-8 ${index === services.length - 1 ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''}`}
              data-reveal
              style={{ '--d': `${(index % 2) * 80}ms` }}
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/12 text-accent">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl">{service.title}</h3>
                <p className="mt-2 text-lg font-semibold text-cream">{service.benefit}</p>
                <p className="mt-3 text-sm text-cream/70 sm:text-base">{service.detail}</p>
              </div>
              <div className="mt-6 md:mt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Proof</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {service.proof.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="chip transition-colors duration-300 ease-fluid hover:border-accent/60 hover:text-cream">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <a href="/services/" className="link-arrow mt-10" data-reveal>
          All services and how I work <Icon name="arrow-right" className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <SectionHeading eyebrow="How I work" title="Three steps, one person" intro="No hand offs between a designer, a developer and an agency. You talk to the person building it." />
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
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5" data-reveal>
          <img
            src={site.photo}
            srcSet={`${site.photoSmall} 480w, ${site.photo} 960w`}
            sizes="(min-width: 1024px) 420px, 90vw"
            width={site.photoWidth}
            height={site.photoHeight}
            alt="Muhammad Adil"
            loading="lazy"
            decoding="async"
            className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 shadow-card lg:mx-0"
          />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="About" title="Self taught since 2021, shipping client work since 2023" />
          <div className="mt-6 space-y-4 text-base text-cream/70 sm:text-lg" data-reveal>
            <p>
              I started with WordPress and front end basics, then went deeper into PHP, JavaScript, Python and Java. Since 2024 I have been a developer at Tech Joint Solution in Calgary, building client sites in Laravel and WordPress, often as the only developer on the project.
            </p>
            <p>
              In 2026 I founded Aatox and started KnowWhere, a voice first memory app, which is where my AI and mobile work lives: Flutter, Kotlin, Gemini Live and a Cloudflare backend.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6" data-reveal>
            <a href="/about/" className="link-arrow">
              More about me <Icon name="arrow-right" className="h-4 w-4" />
            </a>
            <a href={site.resume} download={site.resumeName} className="link-arrow text-cream/70">
              <Icon name="download-simple" className="h-4 w-4" /> Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section id="proof" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <SectionHeading eyebrow="Check for yourself" title="Everything on this page is verifiable" intro="Profiles, employer, company and nine live client sites. Nothing here needs you to take my word for it." />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profiles.map((profile, index) => (
            <li key={profile.href} data-reveal style={{ '--d': `${index * 80}ms` }}>
              <a href={profile.href} target="_blank" rel="noopener" className="surface surface-hover flex h-full flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent">
                  <Icon name={profile.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-cream">{profile.name}</span>
                  <span className="mt-1 block text-sm text-cream/60">{profile.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">Live client sites</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={project.url} target="_blank" rel="noopener" className="chip transition-colors duration-300 ease-fluid hover:border-accent/60 hover:text-cream">
                  {project.domain}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="section scroll-mt-24 border-t border-white/10">
      <div className="container-x">
        <SectionHeading eyebrow="Questions" title="Things people ask before they write" intro="Short answers. If yours is not here, the contact page is one click away." />
        <div className="mt-12">
          <FaqList items={homeFaq} />
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <Layout current={path}>
      <Hero />
      <Work />
      <Testimonials intro="Four clients, four live sites you can open. Their words, unedited." />
      <Tagline />
      <Services />
      <Process />
      <About />
      <Proof />
      <Faq />
      <CtaBand
        title="Have a project or a role in mind?"
        text="Tell me what you are building, or what you are hiring for. I reply within one business day."
        secondary={{ label: 'Email me', href: `mailto:${site.email}` }}
      />
    </Layout>
  )
}

export default { meta, Component: HomePage }
