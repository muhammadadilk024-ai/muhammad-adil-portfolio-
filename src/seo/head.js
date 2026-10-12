import { site } from '../data/site.js'

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Builds the <head> tags for a page from its meta object. Used by the prerender step. */
export function buildHead(meta) {
  const url = `${site.url}${meta.path}`
  const image = `${site.url}${meta.image || site.ogImage}`
  const jsonld = JSON.stringify(meta.schema).replace(/</g, '\u003c')
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`,
    `<meta name="author" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:title" content="${esc(meta.ogTitle || meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(meta.imageAlt || 'Muhammad Adil, full stack and AI developer in Canada')}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.ogTitle || meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonld}</script>`,
  ]
  if (meta.ogType === 'profile') {
    tags.push(`<meta property="profile:first_name" content="${site.givenName}" />`, `<meta property="profile:last_name" content="${site.familyName}" />`)
  }
  return tags.join('\n    ')
}
