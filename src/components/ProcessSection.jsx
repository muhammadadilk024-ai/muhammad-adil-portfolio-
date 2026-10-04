import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const steps = [
  {
    id: '01',
    title: 'Discover',
    text: 'We talk through your goals, audience and what a good result looks like, so the scope is clear before any work starts.',
  },
  {
    id: '02',
    title: 'Design',
    text: 'A clear structure and interface for your brand, shared early so you can react to something real, not a description.',
  },
  {
    id: '03',
    title: 'Build',
    text: 'Clean, fast and responsive development with regular updates. AI-assisted for speed, then verified with builds, tests and manual review.',
  },
  {
    id: '04',
    title: 'Launch and support',
    text: 'Testing, deployment and SEO basics handled for you, with help after launch when something needs changing.',
  },
]

export default function ProcessSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="process" className="relative -mt-px overflow-hidden bg-[#0d0d11] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-[6%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-[#8f7fff]/6 blur-[150px]" />
        <div className="absolute bottom-[4%] left-[4%] h-[22rem] w-[22rem] rounded-full bg-[#fe9d4a]/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#fe9d4a]">How I work</p>
          <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            A simple process, from first call to launch.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/58 sm:text-[15px]">
            One person handles design, development and deployment, so there is no hand-off and nothing gets lost between teams.
          </p>
        </motion.div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08, ease }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#8f7fff]/45 hover:bg-white/[0.05]"
            >
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#8f7fff]">{step.id}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/52">{step.text}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-[#7564f5] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_14px_34px_rgba(117,100,245,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8b7cff]"
          >
            Start a project <span aria-hidden="true">↗</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/38">Usually replies within one day</span>
        </motion.div>
      </div>
    </section>
  )
}
