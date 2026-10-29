import { useRef } from 'react'
import { site } from '../data/site.js'
import { rollingWords, heroNotes, facts } from '../data/home.js'
import { DotField } from './DotField.jsx'
import { CopyEmail } from './CopyEmail.jsx'
import { Icon } from './Icons.jsx'
import { useCycle, usePointerVars } from './hooks.js'

const n = rollingWords.length

/** The word that rolls through the headline. */
function Roll() {
  const index = useCycle(n, 2600)
  const previous = (index - 1 + n) % n
  return (
    <span className="roll" aria-hidden="true">
      {rollingWords.map((word, i) => (
        <span key={word} className={i === index ? 'is-on' : i === previous ? 'is-out' : ''}>
          {word}
        </span>
      ))}
    </span>
  )
}

/** One small true thing at a time. */
function FactLine() {
  const index = useCycle(facts.length, 5200)
  return (
    <div className="hero-rise flex items-start gap-3" style={{ '--d': '560ms' }}>
      <span className="hand shrink-0 text-xl leading-none text-leaf">true thing #{index + 1}:</span>
      <p className="fact flex-1 text-sm text-mute sm:text-base" aria-live="polite">
        {facts.map((fact, i) => (
          <span key={fact} className={i === index ? 'is-on' : ''} aria-hidden={i !== index}>
            {fact}
          </span>
        ))}
      </p>
    </div>
  )
}

function Portrait() {
  return (
    <div className="relative mx-auto mt-4 w-[min(78vw,19rem)] sm:mt-0 sm:w-[21rem] lg:w-[23rem]" style={{ perspective: '1100px' }}>
      <div className="arch tilt aspect-[4/5] w-full">
        <svg className="arch-ring" viewBox="0 0 200 250" aria-hidden="true">
          <path d="M 20 238 C 12 182 10 122 16 72 C 23 22 60 7 100 9 C 140 7 178 23 185 73 C 191 123 189 184 181 234" pathLength="1" />
        </svg>
        <div className="arch-photo">
          <img
            src="/images/muhammad-adil-cutout.webp"
            srcSet="/images/muhammad-adil-cutout-440.webp 440w, /images/muhammad-adil-cutout.webp 880w"
            sizes="(min-width: 1024px) 368px, (min-width: 640px) 336px, 72vw"
            width="880"
            height="1233"
            alt="Muhammad Adil, full stack and AI developer, in a navy blazer"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
      {heroNotes.map((note) => (
        <div key={note.text} className={`float-note ${note.className}`} style={{ '--d': `${note.delay}ms` }}>
          <div className="parallax" style={{ '--depth': note.depth }}>
            <span className={`note ${note.tone}`} style={{ '--rot': `${note.rot}deg` }}>
              {note.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const ref = useRef(null)
  usePointerVars(ref)

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-32 lg:pb-16">
      <DotField />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <h1 className="text-[2.75rem] leading-[1] sm:text-6xl lg:text-[4rem] xl:text-[4.6rem]">
            <span className="hand hero-slide block text-[1.6rem] leading-none text-leaf sm:text-4xl" style={{ '--d': '0ms' }}>
              Hi, I'm Muhammad Adil.
            </span>
            <span className="hero-slide mt-4 block" style={{ '--d': '60ms' }}>
              I build <Roll />
              <span className="sr-only">websites, online stores, mobile apps and AI assistants</span> for businesses that want more customers.
            </span>
          </h1>
          <p className="lead hero-rise mt-6 max-w-[36rem]" style={{ '--d': '200ms' }}>
            Full stack and AI developer in Canada. Five years, 20+ projects shipped, and nine live client sites one scroll away.
            From the first call to launch and after, I'm the one person you talk to.
          </p>
          <div className="hero-rise mt-8 flex flex-wrap items-center gap-4" style={{ '--d': '320ms' }}>
            <a href="/contact/" className="btn btn-primary">
              Tell me what you're building
            </a>
            <a href="#work" className="btn btn-secondary">
              See the work
            </a>
          </div>
          <p className="hero-rise mt-5 flex flex-wrap items-center gap-x-2 text-mute" style={{ '--d': '440ms' }}>
            <span>or email</span>
            <CopyEmail />
          </p>
          <div className="mt-10 max-w-[36rem] border-t border-line pt-5">
            <FactLine />
          </div>
        </div>

        <div className="lg:col-span-5">
          <Portrait />
        </div>
      </div>

      <p className="container-x relative mt-10 hidden items-center gap-2 text-xs text-mute lg:flex">
        <Icon name="arrow-right" className="h-3 w-3 rotate-90" /> scroll, the cards fan out
      </p>
      <span className="sr-only">{site.description}</span>
    </section>
  )
}
