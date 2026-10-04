import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const caseStudies = [
  {
    id: '01',
    name: 'KnowWhere',
    kind: 'Flagship · AI and mobile',
    status: 'In development · testing on Android',
    accent: '#8f7fff',
    glow: 'rgba(143, 127, 255, 0.16)',
    summary:
      'A private, voice-first memory assistant that remembers where you put things. Speak in English, Hindi or Urdu and it saves and finds items without opening the app.',
    challenge:
      'Make voice recall fast, private and usable on any phone, without putting an API key on the device or sending locations and photos to the cloud.',
    built: [
      'Flutter app with Riverpod state management, a repository layer and an encrypted local SQLite database (Drift with SQLite3MultipleCiphers).',
      'Cloudflare Worker proxy that keeps the Gemini API key off the phone.',
      'Real-time voice conversation with Gemini Live. The model calls tools (save, find, list, undo) that run against the local database, with an automatic on-device speech fallback when offline.',
      'Native Android work in Kotlin: a home-screen widget, a Quick Settings tile and a background listening service for hands-free use.',
      'Privacy by design: only the voice request, saved item names and short replies leave the device. Locations and photos never do.',
    ],
    stack: ['Flutter', 'Dart', 'Kotlin', 'Riverpod', 'Drift', 'Encrypted SQLite', 'Cloudflare Workers', 'Gemini Live API'],
    flow: [
      { label: 'Flutter app', detail: 'Voice in, spoken reply out' },
      { label: 'Cloudflare Worker', detail: 'Holds the API key' },
      { label: 'Gemini Live', detail: 'Understands and speaks' },
    ],
    side: [
      { label: 'Encrypted SQLite', detail: 'Memories stay on the device' },
      { label: 'Offline fallback', detail: 'On-device speech and voices' },
    ],
  },
  {
    id: '02',
    name: 'SB TraWorld',
    kind: 'Custom WordPress platform · Travel',
    status: 'Live',
    accent: '#fe9d4a',
    glow: 'rgba(254, 157, 74, 0.14)',
    url: 'https://sb-traworld.com/',
    summary:
      'A bilingual travel and pilgrimage platform that brings destinations, Hajj and Umrah packages, travel updates and enquiries together in one clear booking experience.',
    challenge:
      'Give travellers one clear place to compare packages and ask questions in English or German, while keeping the content easy for the team to manage.',
    built: [
      'Brand identity, logo and UI/UX design.',
      'WordPress build with custom-coded functionality.',
      'A bilingual experience in English and German across the whole site.',
      'Hajj and Umrah packages, destinations, travel and visa updates and enquiry forms in one place, then deployment.',
    ],
    stack: ['WordPress', 'PHP', 'JavaScript', 'Custom plugins', 'Bilingual UX'],
    flow: [
      { label: 'Traveller', detail: 'Reads in English or German' },
      { label: 'Bilingual site', detail: 'Destinations and updates' },
      { label: 'Packages and enquiries', detail: 'One clear booking path' },
    ],
  },
]

function FlowNode({ node, accent }) {
  return (
    <div className="flex-1 rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-center md:text-left" style={{ borderColor: `${accent}33` }}>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: accent }}>{node.label}</p>
      <p className="mt-1 text-xs leading-5 text-white/52">{node.detail}</p>
    </div>
  )
}

function FlowDiagram({ flow, side, accent }) {
  return (
    <div style={{ '--flow-accent': accent }} role="img" aria-label={`How it fits together: ${flow.map((node) => node.label).join(', then ')}`}>
      <div className="flex flex-col items-stretch md:flex-row md:items-center">
        {flow.map((node, index) => (
          <Fragment key={node.label}>
            {index > 0 && <span className="flow-link" aria-hidden="true" />}
            <FlowNode node={node} accent={accent} />
          </Fragment>
        ))}
      </div>

      {side && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {side.map((node) => (
            <div key={node.label} className="rounded-xl border border-dashed border-white/16 px-4 py-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/62">{node.label}</p>
              <p className="mt-1 text-xs leading-5 text-white/42">{node.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CaseStudyCard({ study, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121217] p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)] transition-colors duration-500 hover:border-white/20 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full blur-[110px] transition-opacity duration-700 group-hover:opacity-100"
        style={{ backgroundColor: study.glow, opacity: 0.75 }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${study.accent}, transparent)` }} />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em]" style={{ color: study.accent }}>{study.id}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{study.kind}</span>
        </div>
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: study.accent, borderColor: `${study.accent}55`, backgroundColor: `${study.accent}12` }}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: study.accent }} />
          {study.status}
        </span>
      </div>

      <div className="relative mt-7 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h3 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{study.name}</h3>
          <p className="mt-5 text-[15px] leading-7 text-white/68">{study.summary}</p>

          <div className="mt-7 border-l-2 pl-4" style={{ borderColor: `${study.accent}88` }}>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/34">The challenge</p>
            <p className="mt-2 text-sm leading-6 text-white/58">{study.challenge}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] text-white/62">
                {item}
              </span>
            ))}
          </div>

          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#0b0b0f] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              style={{ backgroundColor: study.accent }}
            >
              Visit live site <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div className="lg:col-span-7">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/34">What I built</p>
          <ul className="mt-4 space-y-3">
            {study.built.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-white/66">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: study.accent }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/34">How it fits together</p>
          <div className="mt-4">
            <FlowDiagram flow={study.flow} side={study.side} accent={study.accent} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function CaseStudies() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="relative overflow-hidden bg-[#0b0b0f] px-4 py-24 text-[#f7f5fb] sm:px-7 md:py-32 lg:px-12">
      <div aria-hidden="true" className="terminal-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1300px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8f7fff]">Case studies</p>
          <h2 id="case-studies-title" className="mt-4 text-4xl font-light leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            How I think, build and <span className="font-serif italic text-white/62">ship.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/52 sm:text-[15px]">
            Two projects in more depth: the problem, what I built, and how the pieces fit together.
          </p>
        </motion.div>

        <div className="mt-14 space-y-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
