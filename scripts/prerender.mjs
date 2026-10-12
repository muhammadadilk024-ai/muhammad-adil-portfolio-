// Renders every page to static HTML after `vite build`, so crawlers and AI assistants get the full content
// without running JavaScript. React then hydrates the same markup in the browser.
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = process.cwd()
const ssrOut = path.join(root, 'dist-ssr')

await build({
  configFile: false,
  root,
  logLevel: 'warn',
  plugins: [react()],
  build: { ssr: 'src/entry-server.jsx', outDir: ssrOut, emptyOutDir: true },
})

const { render, routes } = await import(pathToFileURL(path.join(ssrOut, 'entry-server.js')).href)

for (const route of routes) {
  const file = path.join(root, 'dist', route.replace(/^\//, ''), 'index.html')
  let html = await readFile(file, 'utf8')
  const { html: app, head } = render(route)
  if (!html.includes('<!--app-html-->') || !html.includes('<!--seo-head-->')) {
    throw new Error(`Placeholders missing in ${file}`)
  }
  html = html.replace('<!--seo-head-->', head).replace('<!--app-html-->', app)
  await writeFile(file, html)
  console.log(`prerendered ${route}`)
}

await rm(ssrOut, { recursive: true, force: true })
