/** A small illustration of a KnowWhere conversation. Pure HTML and CSS, no image to load. */
export function PhoneMock({ className = '' }) {
  const lines = [
    { who: 'you', text: 'I put the passport in the grey drawer.' },
    { who: 'app', text: 'Saved: passport, grey drawer.' },
    { who: 'you', text: 'Where is my passport?' },
    { who: 'app', text: 'In the grey drawer. You told me on Tuesday.' },
  ]
  return (
    <div
      className={`mx-auto w-full max-w-xs rounded-[2rem] border border-ink/15 bg-ink p-2 shadow-deck ${className}`}
      role="img"
      aria-label="Illustration of a KnowWhere voice conversation: the user says where the passport is, later asks for it, and the app answers."
    >
      <div className="rounded-[1.6rem] bg-[#15222f] p-4">
        <div className="flex items-center justify-between text-xs text-paper/60">
          <span className="font-semibold text-paper">KnowWhere</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-sprout" /> listening</span>
        </div>
        <ul className="mt-6 space-y-3 text-sm">
          {lines.map((line, index) => (
            <li key={index} className={`flex ${line.who === 'you' ? 'justify-end' : 'justify-start'}`}>
              <span className={`max-w-[85%] rounded-2xl px-3 py-2 ${line.who === 'you' ? 'bg-sprout text-ink' : 'bg-paper/10 text-paper'}`}>
                {line.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-center gap-1" aria-hidden="true">
          {[10, 18, 26, 16, 22, 12, 20].map((h, i) => (
            <span key={i} className="w-1 rounded-full bg-sprout/80" style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
