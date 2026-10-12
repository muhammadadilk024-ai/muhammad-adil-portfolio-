import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))

// One HTML entry per page. Each page is prerendered to static HTML after the build (scripts/prerender.mjs).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        about: resolve(root, 'about/index.html'),
        services: resolve(root, 'services/index.html'),
        projects: resolve(root, 'projects/index.html'),
        knowwhere: resolve(root, 'projects/knowwhere/index.html'),
        bcScrapCars: resolve(root, 'projects/bc-scrap-cars/index.html'),
        sbTraworld: resolve(root, 'projects/sb-traworld/index.html'),
        contact: resolve(root, 'contact/index.html'),
        privacy: resolve(root, 'privacy/index.html'),
        notFound: resolve(root, '404.html'),
      },
    },
  },
})
