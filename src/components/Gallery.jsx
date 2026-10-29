import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'

/**
 * Picture tiles with captions. Each image opens larger in a native <dialog>, so the page itself
 * stays short while the full screenshot is one tap away. Items with `render` are drawn inline (no lightbox).
 */
export function Gallery({ items, label = 'KnowWhere gallery' }) {
  const [open, setOpen] = useState(-1)
  const dialog = useRef(null)
  const current = open >= 0 ? items[open] : null

  useEffect(() => {
    const el = dialog.current
    if (!el) return undefined
    if (current && !el.open) el.showModal()
    if (!current && el.open) el.close()
    return undefined
  }, [current])

  const close = useCallback(() => setOpen(-1), [])
  const onBackdrop = useCallback((event) => {
    if (event.target === dialog.current) close()
  }, [close])

  return (
    <>
      <ul className="gallery" aria-label={label}>
        {items.map((item, index) => (
          <li key={item.src || item.key} className={`gallery-item ${item.kind || ''}`} data-reveal style={{ '--d': `${index * 90}ms` }}>
            <figure>
              {item.render ? (
                <div className="gallery-tile">{item.render()}</div>
              ) : (
                <button type="button" className="gallery-tile" onClick={() => setOpen(index)} aria-label={`See larger: ${item.name}`} data-cursor="Zoom">
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes={item.sizes || '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw'}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-zoom" aria-hidden="true"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
                </button>
              )}
              <figcaption>
                <span className="hand text-xl leading-none text-leaf">{item.name}</span>
                <span className="mt-1 block text-sm text-mute">{item.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} className="lightbox" onClose={close} onClick={onBackdrop} aria-label={current ? current.name : 'Larger image'}>
        {current && (
          <figure className="lightbox-body">
            <div className="lightbox-pic">
              <img src={current.src} alt={current.alt} width={current.width} height={current.height} decoding="async" />
            </div>
            <figcaption>
              <span className="font-bold text-ink">{current.name}.</span> {current.caption}
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
          <Icon name="x" className="h-5 w-5" />
        </button>
      </dialog>
    </>
  )
}

/** The real app, in a phone shape, with the logo stuck to the corner. Used as the KnowWhere case study hero. */
export function AppHero({ shot, logo, note }) {
  return (
    <div className="app-hero" role="group" aria-label="KnowWhere, the app and its logo">
      <div className="app-hero-phone">
        <img
          src={shot.src}
          srcSet={shot.srcSet}
          sizes="(min-width: 640px) 18rem, 62vw"
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <img className="app-hero-logo" src={logo.src} srcSet={logo.srcSet} sizes="7rem" alt={logo.alt} width={logo.width} height={logo.height} loading="eager" decoding="async" />
      {note && <p className="note note-sky app-hero-note" style={{ '--rot': '4deg' }}>{note}</p>}
    </div>
  )
}
