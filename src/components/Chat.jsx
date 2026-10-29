import { useRef } from 'react'
import { testimonials } from '../data/testimonials.js'
import { useInView } from './hooks.js'

const domain = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** Client feedback shown as the messages they are: one thread, in their words, each linked to the live site. */
export function Chat() {
  const ref = useRef(null)
  useInView(ref)

  return (
    <div ref={ref} className="chat mx-auto max-w-2xl space-y-6">
      {testimonials.map((item, index) => (
        <div key={item.project} className="bubble-row" style={{ '--d': `${index * 170}ms` }}>
          <p className="hand mb-1 ml-4 text-xl leading-none text-leaf">{item.client}</p>
          <div className="bubble">
            <p className="text-lg leading-snug text-ink sm:text-xl">{item.quote}</p>
          </div>
          <p className="ml-4 mt-1.5 text-xs text-mute">
            {item.context},{' '}
            <a href={item.url} target="_blank" rel="noopener" className="link-inline">
              {domain(item.url)}
            </a>
          </p>
        </div>
      ))}
      <div className="bubble-row" style={{ '--d': `${testimonials.length * 170 + 100}ms` }}>
        <div className="bubble bubble-me">
          <p className="text-lg leading-snug sm:text-xl">
            Want your site in this thread? <a href="/contact/" className="font-bold underline decoration-2 underline-offset-4">Tell me what you're building.</a>
          </p>
        </div>
        <p className="mr-4 mt-1.5 text-right text-xs text-mute">me, just now</p>
      </div>
    </div>
  )
}
