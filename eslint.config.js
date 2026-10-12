import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Pages export their SEO meta next to the component, and Reveal.jsx exports a hook. The site is a
    // prerendered multi page build, so fast refresh boundaries do not matter here.
    files: ['src/pages/**/*.jsx', 'src/components/Reveal.jsx', 'src/entry-server.jsx', 'src/mount.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
