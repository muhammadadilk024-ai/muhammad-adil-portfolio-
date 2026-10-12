/** Questions and answers fully visible: easier to read on a phone and easier for search engines to quote. */
export function FaqList({ items, columns = 2 }) {
  return (
    <dl className={`grid gap-x-12 gap-y-8 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {items.map((item, index) => (
        <div key={item.q} className="border-t border-white/10 pt-6" data-reveal style={{ '--d': `${(index % 2) * 80}ms` }}>
          <dt className="text-lg font-semibold text-cream">{item.q}</dt>
          <dd className="mt-3 text-base text-cream/70">{item.a}</dd>
        </div>
      ))}
    </dl>
  )
}
