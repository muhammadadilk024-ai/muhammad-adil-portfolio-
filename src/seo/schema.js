import { site } from '../data/site.js'

const U = site.url
export const ids = {
  person: `${U}/#person`,
  website: `${U}/#website`,
  service: `${U}/#service`,
  aatox: 'https://aatox.com/#organization',
  employer: `${U}/#tech-joint-solution`,
}

export function person() {
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: site.name,
    givenName: site.givenName,
    familyName: site.familyName,
    jobTitle: site.jobTitle,
    description: site.description,
    url: `${U}/`,
    image: { '@type': 'ImageObject', url: U + site.photo, width: site.photoWidth, height: site.photoHeight },
    email: `mailto:${site.email}`,
    telephone: site.phoneE164,
    address: { '@type': 'PostalAddress', addressCountry: 'CA' },
    homeLocation: { '@type': 'Country', name: 'Canada' },
    worksFor: [{ '@id': ids.employer }, { '@id': ids.aatox }],
    knowsAbout: [
      'Full stack web development', 'Laravel', 'PHP', 'WordPress plugin development', 'WooCommerce', 'Shopify',
      'MySQL', 'JavaScript', 'React', 'Node.js', 'Python', 'Flutter', 'Dart', 'Kotlin', 'Android',
      'AI agents', 'LLM API integration', 'Voice AI', 'Gemini API', 'Supabase', 'Cloudflare Workers',
      'Technical SEO', 'Local SEO', 'Core Web Vitals',
    ],
    sameAs: [site.linkedin, site.github, site.aatoxAbout],
  }
}

export function employer() {
  return {
    '@type': 'Organization',
    '@id': ids.employer,
    name: site.employer.name,
    url: site.employer.url,
    address: { '@type': 'PostalAddress', addressLocality: site.employer.city, addressRegion: 'AB', addressCountry: 'CA' },
  }
}

export function aatox() {
  return {
    '@type': 'Organization',
    '@id': ids.aatox,
    name: 'Aatox',
    url: site.aatox,
    foundingDate: '2026',
    founder: { '@id': ids.person },
    sameAs: [site.aatoxLinkedin],
  }
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${U}/`,
    name: site.name,
    description: site.tagline,
    publisher: { '@id': ids.person },
    inLanguage: 'en',
  }
}

export function webPage({ path, name, description, type = 'WebPage', extra = {} }) {
  return {
    '@type': type,
    '@id': `${U}${path}#webpage`,
    url: `${U}${path}`,
    name,
    description,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.person },
    dateModified: site.updated,
    inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: U + site.ogImage, width: 1200, height: 630 },
    ...extra,
  }
}

export function breadcrumb(items) {
  const last = items[items.length - 1]
  return {
    '@type': 'BreadcrumbList',
    '@id': `${U}${last.path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${U}${item.path}`,
    })),
  }
}

export function faqPage(items, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${U}${path}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function professionalService(services) {
  return {
    '@type': 'ProfessionalService',
    '@id': ids.service,
    name: 'Muhammad Adil, web, mobile and AI development',
    url: `${U}/services/`,
    image: U + site.ogImage,
    founder: { '@id': ids.person },
    employee: { '@id': ids.person },
    areaServed: ['Canada', 'United States', 'Remote'],
    email: site.email,
    telephone: site.phoneE164,
    priceRange: 'Quoted per project',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.detail, url: `${U}/services/#${s.slug}` },
      })),
    },
  }
}

export function itemList(items, path, name) {
  return {
    '@type': 'ItemList',
    '@id': `${U}${path}#list`,
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.href,
    })),
  }
}

export function softwareApp() {
  return {
    '@type': 'SoftwareApplication',
    '@id': 'https://aatox.com/knowwhere/#app',
    name: 'KnowWhere',
    url: site.knowwhere,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Android',
    author: { '@id': ids.person },
    publisher: { '@id': ids.aatox },
    description: 'A private, voice first memory assistant that remembers where you put things, in English, Hindi and Urdu.',
  }
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
