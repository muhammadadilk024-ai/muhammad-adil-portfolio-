import { useState } from 'react'
import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please add an email address I can reply to.'
  if (values.message.trim().length < 20) errors.message = 'Tell me a little more. A couple of sentences is enough.'
  return errors
}

function ErrorText({ id, children }) {
  return <p id={id} className="mt-2 text-sm text-[#f0a79b]">{children}</p>
}

export function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      const field = form.querySelector(`[name="${firstInvalid}"]`)
      if (field) field.focus()
      return
    }
    setStatus('sending')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target
    const result = validate({ name: '', email: '', message: '', [name]: value })
    setErrors((current) => ({ ...current, [name]: result[name] }))
  }

  if (status === 'success') {
    return (
      <div className="surface flex min-h-80 flex-col items-start justify-center p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl">Message sent.</h3>
        <p className="mt-2 max-w-sm text-cream/70">Thanks for writing. I read every message and usually reply within one business day.</p>
        <button type="button" onClick={() => setStatus('idle')} className="link-inline mt-6 text-sm">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface space-y-6 p-6 sm:p-8">
      <input type="hidden" name="_subject" value="New message from muhammadadil.cloud" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-cream">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" className="input" aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'name-error' : undefined} onBlur={handleBlur} />
          {errors.name && <ErrorText id="name-error">{errors.name}</ErrorText>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-cream">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className="input" aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'email-error' : undefined} onBlur={handleBlur} />
          {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-semibold text-cream">What is this about?</label>
        <select id="topic" name="topic" className="input" defaultValue="A project">
          <option>A project</option>
          <option>A remote role</option>
          <option>Fixing or improving an existing site</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-cream">Message</label>
        <textarea id="message" name="message" rows="6" className="input min-h-40 resize-y" placeholder="What are you building, what already exists, and when do you need it?" aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? 'message-error' : 'message-help'} onBlur={handleBlur} />
        {errors.message ? (
          <ErrorText id="message-error">{errors.message}</ErrorText>
        ) : (
          <p id="message-help" className="mt-2 text-sm text-cream/50">A link to your current site or a rough budget helps me reply with something useful.</p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-[#e06a5c]/40 bg-[#e06a5c]/10 px-4 py-3 text-sm text-[#f0a79b]">
          The message could not be sent. Please try again or email {site.email} directly.
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending' : 'Send message'} <Icon name="paper-plane-tilt" className="h-4 w-4" />
      </button>
      <p className="text-xs text-cream/50">
        Your details are only used to reply to you. See the <a href="/privacy/" className="link-inline">privacy note</a>.
      </p>
    </form>
  )
}
