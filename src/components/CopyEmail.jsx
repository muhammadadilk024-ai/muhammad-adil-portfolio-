import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site.js'
import { Icon } from './Icons.jsx'

/** The email address as a link, with a copy button next to it and a small toast when it copies. */
export function CopyEmail({ className = '', size = 'base' }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const text = size === 'lg' ? 'text-2xl sm:text-4xl lg:text-5xl' : 'text-base sm:text-lg'

  return (
    <span className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      <a href={`mailto:${site.email}`} className={`link-inline break-all font-bold tracking-[-0.02em] ${text}`}>
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-300 ease-fluid hover:border-leaf hover:text-leaf"
        aria-label={copied ? 'Email copied' : 'Copy email address'}
      >
        <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
      </button>
      <span className={`toast ${copied ? 'is-on' : ''}`} role="status" aria-live="polite">
        {copied ? `Copied ${site.email}` : ''}
      </span>
    </span>
  )
}
