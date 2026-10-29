import { Layout } from '../components/Layout.jsx'
import { Icon } from '../components/Icons.jsx'
import { SectionHeading, CtaBand } from '../components/Section.jsx'
import { Hero } from '../components/Hero.jsx'
import { Deck } from '../components/Deck.jsx'
import { Picker } from '../components/Picker.jsx'
import { Chat } from '../components/Chat.jsx'
import { Path } from '../components/Path.jsx'
import { FaqList } from '../components/FaqList.jsx'
import { site } from '../data/site.js'
import { services } from '../data/services.js'
import { steps, quotes } from '../data/home.js'
import { homeFaq } from '../data/faq.js'
import { graph, ids, person, employer, aatox, website, webPage, professionalService, faqPage } from '../seo/schema.js'

const path = '/'

export const meta = {
  path,
  title: 'Muhammad Adil | Full Stack & AI Developer in Canada (Remote)',
  ogTitle: 'Muhammad Adil, full stack and AI developer in Canada',
  description:
    'Full stack and AI developer in Canada with five years of experience: Laravel and WordPress platforms, online stores, Flutter apps and AI assistants, 20+ client projects shipped. Open to new client work and remote roles in Canada and the US.',
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

function Work() {
  return (
    <section id="work" className="on-dark relative bg-ink py-16 md:py-0">
      <Deck />
    </section>
  )
}

function Build() {
  return (
    <section id="build" className="section scroll-mt-16">
      <div className="container-x">
        <SectionHeading
          eyebrow="pick one, or all five"
          title="One developer. The whole job."
          intro="Websites, stores, apps, AI, speed. Hover a word, or tap it, to see what that means for you and which live project proves it."
        />
        <div className="mt-10 lg:mt-14">
          <Picker />
        </div>
      </div>
    </section>
  )
}

function Feedback() {
  return (
    <section id="testimonials" className="section scroll-mt-16 bg-sky/60">
      <div className="container-x">
        <SectionHeading eyebrow="actual messages, unedited" title="What clients say after launch" intro="Four clients, four live sites you can open. Their words, as they sent them." align="center" />
        <div className="mt-10 lg:mt-14">
          <Chat />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="the short version" title="From the first line of code to founder, in five years." />
          <figure className="mt-8 border-l-[3px] border-sprout pl-5" data-reveal>
            <blockquote className="text-xl font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-2xl">{quotes[0].text}</blockquote>
            <figcaption className="hand mt-2 text-xl text-leaf">{quotes[0].by}</figcaption>
          </figure>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3" data-reveal>
            <a href="/about/" className="link-arrow">
              More about me
            </a>
            <a href={site.resume} download={site.resumeName} className="link-arrow">
              <Icon name="download-simple" className="h-4 w-4" /> Resume (PDF)
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <Path />
        </div>
      </div>
    </section>
  )
}

function HowItGoes() {
  return (
    <section id="how" className="section pt-0 scroll-mt-16">
      <div className="container-x">
        <div className="sheet sheet-sky p-6 sm:p-10" data-reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">How a project goes</h2>
            <p className="hand text-2xl text-leaf">three steps, no surprises</p>
          </div>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="relative border-t-2 border-ink/15 pt-5">
                <span className="hand absolute -top-5 left-0 bg-sky px-2 text-3xl leading-none text-leaf" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="text-xl sm:text-2xl">{step.title}</h3>
                <p className="mt-2 text-base text-ink/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="section scroll-mt-16 pt-0">
      <div className="container-x grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="before you email" title="Questions people ask first" intro="Short answers. If yours is not here, the contact page is one click away." />
        </div>
        <div className="lg:col-span-8" data-reveal>
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
      <Build />
      <Feedback />
      <About />
      <HowItGoes />
      <Faq />
      <CtaBand />
    </Layout>
  )
}

export default { meta, Component: HomePage }
