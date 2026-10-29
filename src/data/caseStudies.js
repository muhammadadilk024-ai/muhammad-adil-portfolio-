// Three projects in depth. Facts only: what the live product shows or what was actually built.
export const caseStudies = [
  {
    slug: 'knowwhere',
    path: '/projects/knowwhere/',
    name: 'KnowWhere',
    kicker: 'Own product, AI and mobile, in development',
    title: 'KnowWhere Case Study: Voice First Memory App (Flutter, Gemini Live)',
    description:
      'How Muhammad Adil built KnowWhere, a private voice first memory assistant: Flutter and Kotlin app, encrypted local database, Cloudflare Worker backend and real time Gemini Live conversation.',
    h1: 'KnowWhere: a voice first memory app that remembers where you put things',
    status: 'In development, testing on Android',
    url: 'https://aatox.com/knowwhere/',
    urlLabel: 'KnowWhere on aatox.com',
    summary:
      'KnowWhere is a private memory assistant. You say where you put something, in English, Hindi or Urdu, and later you ask where it is. It saves and finds items by voice, without opening the app, and keeps the memories on the phone.',
    challenge:
      'Make voice recall fast, private and usable on any phone, without putting an API key on the device, and with smart voice switched on only after the user agrees to it.',
    built: [
      'A Flutter app with Riverpod state management, a repository layer and an encrypted local SQLite database (Drift with SQLite3MultipleCiphers).',
      'A Cloudflare Worker that keeps the Gemini API key off the phone and only counts requests, so nothing the user says is stored on the backend.',
      'Real time voice conversation with Gemini Live. The model calls tools (save, find, list, undo) that run against the local database, with an automatic on device speech fallback when the phone is offline.',
      'Native Android work in Kotlin: a home screen widget, a Quick Settings tile and a background listening service for hands free use.',
      'Privacy by design: memories live in an encrypted database on the device, smart voice is opt in, photos are never sent, and the user can switch cloud voice off at any time.',
    ],
    flow: [
      { label: 'Flutter app', detail: 'Voice in, spoken reply out' },
      { label: 'Cloudflare Worker', detail: 'Holds the API key, counts requests' },
      { label: 'Gemini Live', detail: 'Understands, calls tools, speaks' },
    ],
    side: [
      { label: 'Encrypted SQLite', detail: 'Memories stay on the device' },
      { label: 'Offline fallback', detail: 'On device speech recognition and voices' },
    ],
    notes: [
      'Three languages in one conversation: English, Hindi, Urdu and mixed speech, with the reply in the language the user spoke.',
      'Built and published under Aatox, the small software company Muhammad founded in 2026.',
      'Automated test suite across repositories, services, flows, accessibility and security, plus a Node test suite for the Worker.',
    ],
    stack: ['Flutter', 'Dart', 'Kotlin', 'Riverpod', 'Drift', 'SQLite3MultipleCiphers', 'Cloudflare Workers', 'Gemini Live API'],
    related: ['bc-scrap-cars', 'sb-traworld'],
    mock: 'phone',
    ogImage: '/images/projects/knowwhere/knowwhere-share-card.jpg',
    ogAlt: 'KnowWhere case study by Muhammad Adil: the Android home screen and the app logo',
    logo: {
      src: '/images/projects/knowwhere/knowwhere-logo.webp',
      srcSet: '/images/projects/knowwhere/knowwhere-logo-320.webp 320w, /images/projects/knowwhere/knowwhere-logo.webp 640w',
      width: 640,
      height: 640,
      title: 'KnowWhere logo',
      name: 'The logo',
      alt: 'KnowWhere app logo: a glossy blue and purple location pin curled around a glowing orb, for the voice first memory app by Aatox',
      caption: 'A location pin wrapped around a glowing orb, the thing you are trying to find. Blue, violet and peach, the same tones as the app.',
    },
    shot: {
      src: '/images/projects/knowwhere/knowwhere-android-home-screen.webp',
      srcSet: '/images/projects/knowwhere/knowwhere-android-home-screen-450.webp 450w, /images/projects/knowwhere/knowwhere-android-home-screen.webp 900w',
      width: 900,
      height: 2000,
      title: 'KnowWhere Android home screen',
      name: 'Home screen',
      alt: 'KnowWhere Android app home screen with the greeting Good evening, a Search your things bar and one saved item, passport in the desk drawer',
      caption: 'The Android home screen: a greeting, a search bar that understands plain questions, and everything you have saved so far.',
    },
  },
  {
    slug: 'bc-scrap-cars',
    path: '/projects/bc-scrap-cars/',
    name: 'BC Scrap Cars',
    kicker: 'Client work, Laravel, local SEO',
    title: 'BC Scrap Cars Case Study: Laravel Lead Generation Site with 12 City Pages',
    description:
      'How Muhammad Adil built bcscrapcars.com as the solo developer at Tech Joint Solution: Laravel, a multistep quote form, 12 city landing pages and FAQ and city structured data for local search.',
    h1: 'BC Scrap Cars: turning local junk car searches into quote requests',
    status: 'Live',
    url: 'https://bcscrapcars.com/',
    urlLabel: 'bcscrapcars.com',
    summary:
      'A lead generation website for a junk car removal service across the Lower Mainland of British Columbia. The site competes city by city for scrap and junk car searches and turns visitors into quote requests.',
    challenge:
      'Rank for junk and scrap car searches in each city the business serves, while keeping the quote process quick enough that visitors actually finish it.',
    built: [
      'A multistep instant quote form that collects contact details, vehicle details and condition in small steps.',
      'Landing pages for 12 Lower Mainland cities, plus separate service pages for cash for cars, junk removal, free towing and ICBC write offs.',
      'FAQ and city structured data (schema markup) to support local search visibility.',
      'The whole Laravel (PHP) application, built, tested and launched as the only developer on the project at Tech Joint Solution.',
    ],
    flow: [
      { label: 'Visitor in their city', detail: 'Searches for junk car removal' },
      { label: 'Laravel site', detail: 'City and service pages' },
      { label: 'Instant quote form', detail: 'Contact, vehicle, condition' },
    ],
    notes: [
      '12 city landing pages and four service pages, each with its own structured data.',
      'Built as the sole developer: architecture, code, integrations, testing and launch.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Structured data', 'Local SEO'],
    related: ['sb-traworld', 'knowwhere'],
    image: '/images/projects/spotlight/bc-scrap-cars.webp',
    imageAlt: 'Homepage of bcscrapcars.com with the instant quote form',
    width: 1280,
    height: 800,
  },
  {
    slug: 'sb-traworld',
    path: '/projects/sb-traworld/',
    name: 'SB TraWorld',
    kicker: 'Client work, WordPress, two languages',
    title: 'SB TraWorld Case Study: Bilingual WordPress Travel Platform',
    description:
      'How Muhammad Adil designed and built sb-traworld.com: brand identity, a custom WordPress build with custom plugins, and a full English and German experience for Hajj, Umrah and travel packages.',
    h1: 'SB TraWorld: one clear booking path in English and German',
    status: 'Live',
    url: 'https://sb-traworld.com/',
    urlLabel: 'sb-traworld.com',
    summary:
      'A bilingual travel and pilgrimage platform that brings destinations, Hajj and Umrah packages, travel and visa updates and enquiries together in one place.',
    challenge:
      'Give travellers one clear place to compare packages and ask questions in English or German, while keeping every page easy for the team to update without a developer.',
    built: [
      'Brand identity, logo and the UI and UX design.',
      'A WordPress build with custom coded functionality instead of heavy page builder bloat.',
      'A complete bilingual experience, English and German, across the whole site.',
      'Hajj and Umrah packages, destinations, travel and visa updates and enquiry forms, followed by deployment.',
    ],
    flow: [
      { label: 'Traveller', detail: 'Reads in English or German' },
      { label: 'Bilingual site', detail: 'Destinations and updates' },
      { label: 'Packages and enquiries', detail: 'One clear booking path' },
    ],
    notes: [
      'Delivered end to end: brand, design, build, content structure and launch.',
      'Every section is editable by the client in both languages.',
    ],
    stack: ['WordPress', 'PHP', 'JavaScript', 'Custom plugins', 'Bilingual UX'],
    related: ['bc-scrap-cars', 'knowwhere'],
    image: '/images/projects/spotlight/sb-traworld.webp',
    imageAlt: 'Homepage of sb-traworld.com showing travel packages',
    width: 1280,
    height: 800,
  },
]

export const caseStudyBySlug = (slug) => caseStudies.find((c) => c.slug === slug)
