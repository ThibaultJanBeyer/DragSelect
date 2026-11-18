import { defineConfig } from 'vite'

// Only used by `vite preview`: serves the production build from `ng build`,
// the same way the other example apps are served in the Playwright run.
export default defineConfig({
  build: { outDir: 'dist/browser' },
})
