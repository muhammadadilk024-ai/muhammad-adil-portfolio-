import { motion, useReducedMotion } from 'framer-motion'

import { testimonials } from '../data/testimonials'

const ease = [0.16, 1, 0.3, 1]

export default function Testimonials() {
  const reduceMotion = useReducedMotion()

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative -mt-px overflow-hidden bg-[#0d0d11] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[10%] h-[26rem] w-[26rem] rounded-full bg-[#fe9d4a]/6 blur-[150px]" />
        <div className="absolute bottom-0 right-[6%] h-[26rem] w-[26rem] rounded-full bg-[#8f7fff]/7 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#fe9d4a]">Client feedback</p>
          <h2 id="testimonials-title" className="mt-5 text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            In my clients&apos; words.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure
              key={`${item.name}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08, ease }}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#8f7fff]/45"
            >
              <span aria-hidden="true" className="absolute right-6 top-3 font-serif text-6xl leading-none text-[#8f7fff]/30">&ldquo;</span>
              {item.quote && <blockquote className="text-[15px] leading-7 text-white/80">{item.quote}</blockquote>}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.imageAlt || `Message from ${item.name}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full rounded-xl border border-white/10 ${item.quote ? 'mt-5' : ''}`}
                />
              )}
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white/90">{item.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                  {item.role}
                  {item.project && (
                    <>
                      {' · '}
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#a99dff] underline-offset-4 hover:underline">
                          {item.project}
                        </a>
                      ) : (
                        item.project
                      )}
                    </>
                  )}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
