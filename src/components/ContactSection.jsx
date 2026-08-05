import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const contactEmail = 'muhammad.adilk024@gmail.com'
const contactPhone = '+1 647 966 1710'
const ease = [0.16, 1, 0.3, 1]

const contactDetails = [
  { label: 'Name', value: 'Muhammad Adil', type: 'user' },
  { label: 'Email', value: contactEmail, href: `mailto:${contactEmail}`, type: 'mail' },
  { label: 'Phone', value: contactPhone, href: 'tel:+16479661710', type: 'phone' },
  { label: 'Location', value: 'Canada / Remote Work', type: 'location' },
]

const socialButtons = ['GitHub', 'LinkedIn', 'Instagram']

function ContactIcon({ type, className = 'h-4 w-4' }) {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.3" />
        <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
      </>
    ),
    mail: (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.3" />
        <path d="M4.5 7l7.5 5.7L19.5 7" />
      </>
    ),
    phone: <path d="M7.2 3.8l2.4 4.4l-2.1 1.9c1.4 3 3.4 5 6.4 6.4l1.9-2.1l4.4 2.4l-.8 3c-.3 1-1.2 1.7-2.3 1.7C9.1 21.2 2.8 14.9 2.5 6.9c0-1.1.7-2 1.7-2.3l3-.8Z" />,
    location: (
      <>
        <path d="M12 21s6.5-4.8 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 16.2 12 21 12 21Z" />
        <circle cx="12" cy="10.5" r="2.1" />
      </>
    ),
    send: (
      <>
        <path d="M21 3L10 14" />
        <path d="M21 3l-7 18l-4-7l-7-4l18-7Z" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4.2L19.5 6.5" />,
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type]}
    </svg>
  )
}

function ContactDetail({ item }) {
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.06] text-[#fe9d4a]">
        <ContactIcon type={item.type} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-white/34">{item.label}</span>
        <span className="mt-1 block break-words text-sm text-white/82">{item.value}</span>
      </span>
    </>
  )

  return item.href ? (
    <a href={item.href} className="flex items-center gap-3 transition hover:text-white">{content}</a>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-white/42">{label}</span>
      {children}
    </label>
  )
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion()
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')

    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Message could not be sent')

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative -mt-px overflow-hidden bg-[#0d0d11] px-4 py-24 text-white sm:px-7 md:py-28 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[5%] h-[30rem] w-[30rem] rounded-full bg-[#8f7fff]/7 blur-[160px]" />
        <div className="absolute bottom-0 right-[4%] h-[26rem] w-[26rem] rounded-full bg-[#fe9d4a]/5 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:96px_96px]" />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.76, ease }}
        className="relative mx-auto grid max-w-[1200px] overflow-hidden rounded-[1.7rem] border border-white/10 shadow-[0_36px_110px_rgba(0,0,0,.42)] md:grid-cols-2"
      >
        <div className="relative isolate flex min-h-[610px] flex-col justify-between overflow-hidden bg-[#17131f] p-7 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#8f7fff]/35 blur-[95px]" />
            <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#fe9d4a]/18 blur-[105px]" />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(143,127,255,.14),transparent_48%,rgba(254,157,74,.06))]" />
          </div>

          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#fe9d4a]">Get in touch</p>
            <h2 className="mt-5 max-w-md text-4xl font-medium leading-[1.03] tracking-[-0.052em] sm:text-5xl">
              Let&apos;s build something worth sharing.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/58 sm:text-[15px]">
              Have a project, a role or simply an idea? Send me a message. I usually reply within one day.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {contactDetails.map((item) => <ContactDetail key={item.label} item={item} />)}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">Social profiles coming soon</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialButtons.map((name) => (
                  <button
                    key={name}
                    type="button"
                    aria-disabled="true"
                    title={`${name} link coming soon`}
                    className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/58"
                  >
                    {name}<span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[610px] bg-[#15151b] p-7 sm:p-9 lg:p-11">
          {status === 'success' ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
              className="flex h-full min-h-[430px] flex-col items-center justify-center text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[#8f7fff]/35 bg-[#8f7fff]/12 text-[#a99dff]">
                <ContactIcon type="check" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Message sent</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/48">Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-medium text-[#a99dff] underline decoration-[#8f7fff]/55 underline-offset-4">
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7fff]">Project form</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Tell me what you have in mind.</h3>
              </div>

              <input type="hidden" name="_subject" value="New message from Muhammad Adil Portfolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex="-1" autoComplete="off" />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input required type="text" name="name" autoComplete="name" placeholder="Your name" className="contact-split-input" />
                </Field>
                <Field label="Email">
                  <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className="contact-split-input" />
                </Field>
              </div>

              <Field label="Subject">
                <input required type="text" name="subject" placeholder="Project inquiry" className="contact-split-input" />
              </Field>

              <Field label="Message">
                <textarea required name="message" rows="6" placeholder="Tell me a little about your project..." className="contact-split-input min-h-[150px] resize-y" />
              </Field>

              {status === 'error' && (
                <p role="alert" className="rounded-lg border border-red-400/25 bg-red-400/8 px-4 py-3 text-sm text-red-200">
                  The message could not be sent. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#8f7fff] px-5 py-3.5 text-sm font-semibold text-[#0d0d11] transition duration-300 hover:-translate-y-0.5 hover:bg-[#a99dff] disabled:cursor-wait disabled:opacity-65"
              >
                <ContactIcon type="send" />
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>

              <p className="text-center text-[11px] leading-5 text-white/28">Your details are only used to reply to your message.</p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
