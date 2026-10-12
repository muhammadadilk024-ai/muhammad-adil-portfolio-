import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'

/** Hydrates prerendered HTML in production, or renders from scratch in development. */
export function mount(page) {
  const root = document.getElementById('root')
  const tree = (
    <StrictMode>
      <page.Component />
    </StrictMode>
  )
  if (root.firstElementChild) {
    hydrateRoot(root, tree)
  } else {
    createRoot(root).render(tree)
  }
  if (import.meta.env.DEV) document.title = page.meta.title
}
