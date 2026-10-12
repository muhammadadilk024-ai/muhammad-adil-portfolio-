export const services = [
  {
    slug: 'web-platforms',
    icon: 'code',
    title: 'Custom web platforms',
    benefit: 'A site built around how your business works, not a template.',
    detail:
      'Laravel applications and WordPress sites with custom coded plugins: user roles, multilingual content, listings, quote forms and integrations with the tools you already use.',
    bullets: [
      'Laravel or WordPress, chosen for the job rather than habit',
      'Custom plugins instead of a stack of paid add ons',
      'Roles, multilingual content, listings and forms done properly',
      'Deployed to your hosting, with nothing tying you to me',
    ],
    fit: 'Businesses that have outgrown a brochure site, agencies that need a reliable builder, teams with a workflow a template cannot express.',
    proof: [
      { name: 'BC Scrap Cars', href: '/projects/bc-scrap-cars/' },
      { name: 'SB TraWorld', href: '/projects/sb-traworld/' },
    ],
    tools: ['Laravel', 'PHP', 'WordPress', 'MySQL', 'JavaScript'],
  },
  {
    slug: 'ai-apps',
    icon: 'sparkle',
    title: 'AI apps and agents',
    benefit: 'AI that is wired into your product and your data, with the keys kept safe.',
    detail:
      'Assistants, agents and voice features built on LLM APIs, connected to real workflows, with a backend that keeps API keys off the client and automation that saves actual hours.',
    bullets: [
      'LLM and voice features built on Gemini and other APIs',
      'Tool calling against your own data and systems',
      'A small backend (Cloudflare Workers or Supabase) that protects keys and limits abuse',
      'Honest scope: AI where it helps, plain code where it does not',
    ],
    fit: 'Founders adding an assistant to a product, teams automating a repetitive workflow, apps that need voice.',
    proof: [{ name: 'KnowWhere', href: '/projects/knowwhere/' }],
    tools: ['Gemini API', 'LLM APIs', 'Python', 'Node.js', 'Cloudflare Workers', 'Supabase'],
  },
  {
    slug: 'mobile-apps',
    icon: 'device-mobile',
    title: 'Mobile apps',
    benefit: 'One Flutter codebase for iOS and Android, with native depth where it matters.',
    detail:
      'Cross platform apps built with Flutter, with native Android integration such as widgets, Quick Settings tiles and background services, plus encrypted local storage and reliable API connections.',
    bullets: [
      'Flutter and Dart for both platforms',
      'Kotlin for widgets, tiles and background work on Android',
      'Encrypted on device storage and offline behaviour',
      'Store ready builds and testing on real devices',
    ],
    fit: 'Products that need an app, not a wrapped website; teams that want one codebase without losing native features.',
    proof: [{ name: 'KnowWhere', href: '/projects/knowwhere/' }],
    tools: ['Flutter', 'Dart', 'Kotlin', 'Riverpod', 'Drift', 'SQLite'],
  },
  {
    slug: 'ecommerce',
    icon: 'storefront',
    title: 'Ecommerce stores',
    benefit: 'A store that is easy to buy from and easy to run.',
    detail:
      'WooCommerce, Shopify and Laravel stores with organised catalogues, secure payments, customer accounts, custom theme work and a checkout that works on every phone.',
    bullets: [
      'WooCommerce, Shopify or a custom Laravel store',
      'Catalogue structure, filters and product content that sells',
      'Payments, accounts, reviews and order flows',
      'Speed and SEO basics built in from the start',
    ],
    fit: 'Retailers moving online, stores that have outgrown a marketplace, brands that need custom catalogue logic.',
    proof: [
      { name: 'Beauty Supply Call', href: 'https://beautysupplycall.com/' },
      { name: 'Lavish Bath', href: 'https://lavishbathcalgary.ca/' },
    ],
    tools: ['WooCommerce', 'Shopify', 'Laravel', 'Payment gateways'],
  },
  {
    slug: 'seo-performance',
    icon: 'gauge',
    title: 'SEO and performance',
    benefit: 'A site that loads fast and can actually be found.',
    detail:
      'Technical SEO, structured data, Core Web Vitals and speed work, so the site you paid for is crawlable, quick and ready to rank, with clean code behind it.',
    bullets: [
      'Technical audit: crawling, indexing, canonicals, sitemaps',
      'Structured data for services, FAQs, locations and products',
      'Core Web Vitals fixes: images, scripts, fonts, layout shift',
      'Local SEO pages for every city or area you serve',
    ],
    fit: 'Local service businesses, stores with slow pages, sites that never got indexed properly.',
    proof: [
      { name: 'BC Scrap Cars', href: '/projects/bc-scrap-cars/' },
      { name: 'Medaan', href: 'https://medaan.ca/' },
    ],
    tools: ['Structured data', 'Core Web Vitals', 'Search Console', 'Lighthouse'],
  },
]

export const process = [
  {
    step: '01',
    icon: 'chat-circle-dots',
    title: 'Discover',
    text: 'A short call to agree goals, audience, scope and what done looks like. You get a written quote and a timeline before any work starts.',
  },
  {
    step: '02',
    icon: 'wrench',
    title: 'Design and build',
    text: 'One pair of hands from interface to database. You see a working preview early and get updates as it grows. AI assisted for speed, then verified with builds, tests and manual review.',
  },
  {
    step: '03',
    icon: 'lightning',
    title: 'Launch and support',
    text: 'Deployment to your hosting, SEO basics, structured data and a handover you can understand. I stay around after launch for changes and fixes.',
  },
]
