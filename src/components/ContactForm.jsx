import { useState } from 'react'
import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

const ENDPOINT = '/api/contact.php' // public/api/contact.php, runs on the site's own hosting
const TIMEOUT_MS = 15000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const fieldErrors = {
  name: 'Please add your name.',
  email: 'Please add an email address I can reply to.',
  message: 'Tell me a little more. A couple of sentences is enough.',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = fieldErrors.name
  if (!emailPattern.test(values.email.trim())) errors.email = fieldErrors.email
  if (values.message.trim().length < 20) errors.message = fieldErrors.message
  return errors
}

/**
 * Posts the message to the site's own mail script. Always settles: a slow or silent server is cut off
 * after TIMEOUT_MS, and anything other than a clear yes counts as not sent.
 */
async function send(values) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
      signal: controller.signal,
    })
    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }
    if (response.ok && data && data.ok === true) return { ok: true }
    return { ok: false, reason: (data && data.error) || 'failed', fields: (data && data.fields) || [] }
  } catch {
    return { ok: false, reason: 'network', fields: [] }
  } finally {
    clearTimeout(timer)
  }
}

/** The same message as a ready to send email, so nothing the visitor typed is lost if the form fails. */
function mailto(values) {
  const subject = `Website enquiry: ${values.topic || 'A project'}`
  const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function ErrorText({ id, children }) {
  return <p id={id} className="mt-2 text-sm font-semibold text-[#b8361f]">{children}</p>
}

export function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [failed, setFailed] = useState(null)

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
    setFailed(null)
    const result = await send(values)
    if (result.ok) {
      form.reset()
      setStatus('success')
      return
    }
    if (result.reason === 'invalid' && result.fields.length) {
      setErrors(Object.fromEntries(result.fields.filter((name) => fieldErrors[name]).map((name) => [name, fieldErrors[name]])))
      setStatus('idle')
      return
    }
    setFailed({ reason: result.reason, values })
    setStatus('error')
  }

  function handleBlur(event) {
    const { name, value } = event.target
    const result = validate({ name: '', email: '', message: '', [name]: value })
    setErrors((current) => ({ ...current, [name]: result[name] }))
  }

  if (status === 'success') {
    return (
      <div className="sheet flex min-h-80 flex-col items-start justify-center p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sprout/30 text-leaf">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl">Message sent.</h3>
        <p className="mt-2 max-w-sm text-mute">Thanks for writing. I read every message and usually reply within one business day.</p>
        <button type="button" onClick={() => setStatus('idle')} className="link-inline mt-6 text-sm">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="sheet space-y-6 p-6 sm:p-8">
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold text-ink">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" className="input" aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'name-error' : undefined} onBlur={handleBlur} />
          {errors.name && <ErrorText id="name-error">{errors.name}</ErrorText>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-ink">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className="input" aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'email-error' : undefined} onBlur={handleBlur} />
          {errors.email && <ErrorText id="email-error">{errors.email}</ErrorText>}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-bold text-ink">What is this about?</label>
        <select id="topic" name="topic" className="input" defaultValue="A project">
          <option>A project</option>
          <option>A remote role</option>
          <option>Fixing or improving an existing site</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-bold text-ink">Message</label>
        <textarea id="message" name="message" rows="6" className="input min-h-40 resize-y" placeholder="What are you building, what already exists, and when do you need it?" aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? 'message-error' : 'message-help'} onBlur={handleBlur} />
        {errors.message ? (
          <ErrorText id="message-error">{errors.message}</ErrorText>
        ) : (
          <p id="message-help" className="mt-2 text-sm text-mute">A link to your current site or a rough budget helps me reply with something useful.</p>
        )}
      </div>

      {status === 'error' && failed && (
        <div role="alert" className="rounded-xl border border-[#c2412d]/40 bg-[#c2412d]/10 px-4 py-3 text-sm text-[#8f2a18]">
          <p className="font-semibold">
            {failed.reason === 'rate' ? 'That is a lot of messages in a few minutes, so this one was not sent.' : 'The message did not go through. Nothing you typed is lost.'}
          </p>
          <p className="mt-1">
            <a href={mailto(failed.values)} className="font-bold underline underline-offset-4">
              Send it from your email app instead
            </a>
            , with your message already filled in, or write to {site.email}.
          </p>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'} aria-busy={status === 'sending' ? 'true' : undefined}>
        {status === 'sending' ? 'Sending' : 'Send message'} <Icon name="paper-plane-tilt" className="h-4 w-4" />
      </button>
      <p className="text-xs text-mute">
        Your details are only used to reply to you. See the <a href="/privacy/" className="link-inline">privacy note</a>.
      </p>
    </form>
  )
}
