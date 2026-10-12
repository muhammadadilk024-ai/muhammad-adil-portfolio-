import { renderToString } from 'react-dom/server'
import { pages } from './pages/registry.js'
import { buildHead } from './seo/head.js'

export const routes = Object.keys(pages)

/** Renders one route to HTML plus its head tags. Used by scripts/prerender.mjs. */
export function render(path) {
  const page = pages[path]
  if (!page) throw new Error(`No page registered for ${path}`)
  return { html: renderToString(<page.Component />), head: buildHead(page.meta) }
}
