// Copy for the home page. Everything here is a claim you can check on this site or on a live client site.

/** Words that roll through the headline. The first one is what crawlers and screen readers get. */
export const rollingWords = ['websites', 'online stores', 'mobile apps', 'AI assistants', 'faster sites']

/** Sticky notes around the portrait. depth drives mouse parallax (bigger moves more). */
export const heroNotes = [
  { text: 'replies within one business day', tone: '', rot: -5, depth: 1.3, className: 'left-[-10%] top-[34%] sm:left-[-24%] sm:top-[30%]', delay: 500 },
  { text: 'you own the code, always', tone: 'note-sky', rot: 4, depth: 0.8, className: 'hidden sm:block right-[-22%] top-[44%]', delay: 650 },
  { text: 'first call is free', tone: 'note-white', rot: -3, depth: 1.7, className: 'hidden sm:block left-[-14%] bottom-[10%]', delay: 800 },
  { text: 'self taught, building since 2021', tone: '', rot: 6, depth: 1, className: 'right-[-8%] bottom-[4%] sm:right-[-16%] sm:bottom-[-2%]', delay: 950 },
]

/** Small true things, one at a time, under the hero. */
export const facts = [
  'Nine client sites on this page, and every one of them is live right now.',
  'BC Scrap Cars has 12 city pages, each with its own structured data for local search.',
  'SB TraWorld runs in English and German, and the client can edit every section in both.',
  'KnowWhere understands English, Hindi and Urdu in the same conversation.',
  'This page is prerendered to plain HTML, so it loads before the JavaScript does.',
  'I use AI to write code faster, then check every change with builds, tests and my own eyes.',
  'Three of these projects were built as the only developer on the job, start to finish.',
]

/** The five things I build, as a picker. Each points at a service and at proof you can open. */
export const offers = [
  {
    slug: 'web-platforms',
    label: 'Websites',
    line: 'A site built around how your business actually works, not a template with your logo on it.',
    bullets: ['Laravel or WordPress, chosen for the job, not out of habit', 'Custom coded plugins instead of a pile of paid add ons', 'User roles, two languages, listings, quote forms, integrations', 'Delivered to your own hosting, with nothing tying you to me'],
    proof: [
      { name: 'BC Scrap Cars', href: '/projects/bc-scrap-cars/' },
      { name: 'SB TraWorld', href: '/projects/sb-traworld/' },
      { name: 'Medaan', href: 'https://medaan.ca/' },
    ],
    tools: ['Laravel', 'PHP', 'WordPress', 'MySQL', 'JavaScript'],
  },
  {
    slug: 'ecommerce',
    label: 'Online stores',
    line: 'A store that is easy to buy from on a phone and easy for you to run on a Tuesday afternoon.',
    bullets: ['WooCommerce, Shopify or a custom Laravel store', 'Catalogue structure, filters and product pages that sell', 'Payments, accounts, reviews and order flows that just work', 'Speed and SEO basics built in from day one'],
    proof: [
      { name: 'Beauty Supply Call', href: 'https://beautysupplycall.com/' },
      { name: 'Lavish Bath', href: 'https://lavishbathcalgary.ca/' },
    ],
    tools: ['WooCommerce', 'Shopify', 'Laravel', 'Payment gateways'],
  },
  {
    slug: 'mobile-apps',
    label: 'Mobile apps',
    line: 'One Flutter codebase for iOS and Android, with real native depth where it matters.',
    bullets: ['Flutter and Dart for both platforms from one codebase', 'Kotlin for widgets, Quick Settings tiles and background work', 'Encrypted on device storage and offline behaviour', 'Store ready builds, tested on real phones'],
    proof: [{ name: 'KnowWhere', href: '/projects/knowwhere/' }],
    tools: ['Flutter', 'Dart', 'Kotlin', 'Riverpod', 'SQLite'],
  },
  {
    slug: 'ai-apps',
    label: 'AI assistants',
    line: 'AI wired into your product and your data, with the API keys kept somewhere safe.',
    bullets: ['Assistants, agents and voice features built on Gemini and other LLM APIs', 'Tool calling against your own data and systems', 'A small backend that protects keys and limits abuse', 'Honest scope: AI where it helps, plain code where it does not'],
    proof: [{ name: 'KnowWhere', href: '/projects/knowwhere/' }],
    tools: ['Gemini API', 'LLM APIs', 'Python', 'Node.js', 'Cloudflare Workers', 'Supabase'],
  },
  {
    slug: 'seo-performance',
    label: 'Speed and SEO',
    line: 'A site that loads fast, gets indexed and can actually be found by the people searching for you.',
    bullets: ['Technical audit: crawling, indexing, canonicals, sitemaps', 'Structured data for services, FAQs, locations and products', 'Core Web Vitals fixes: images, scripts, fonts, layout shift', 'Local pages for every city or area you serve'],
    proof: [
      { name: 'BC Scrap Cars', href: '/projects/bc-scrap-cars/' },
      { name: 'Medaan', href: 'https://medaan.ca/' },
    ],
    tools: ['Structured data', 'Core Web Vitals', 'Search Console', 'Lighthouse'],
  },
]

/** How a project goes. This is a real sequence, so it is numbered. */
export const steps = [
  { title: 'We talk', text: 'A short free call about what you need, who it is for and when. You get a written quote and a timeline before any work starts.' },
  { title: 'I build', text: 'One pair of hands from design to database. You see a working preview early and get updates as it grows.' },
  { title: 'You own it', text: 'Launched on your hosting with the code, content and accounts in your name. I stay around for changes and fixes.' },
]

/** His own lines, used as pull quotes. */
export const quotes = [
  { text: 'I design it, build it and ship it myself. No hand offs, no gaps, and I am still around after launch.', by: 'how I work' },
  { text: 'Every project on this page is live. Open it, click around, judge the work yourself.', by: 'on proof' },
]
