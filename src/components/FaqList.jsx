/** Questions as native details: the answers are in the HTML for crawlers, one tap away for people. */
export function FaqList({ items, openFirst = false }) {
  return (
    <div className="border-b border-line">
      {items.map((item, index) => (
        <details key={item.q} className="faq" open={openFirst && index === 0 ? true : undefined}>
          <summary>
            <span>{item.q}</span>
            <span className="plus" aria-hidden="true" />
          </summary>
          <div className="faq-body">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
