import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    // Tests run against the built package (`yarn build` first): that is what ships,
    // and its partial compilation output carries the signal inputs/outputs metadata.
    alias: {
      '@dragselect/angular': fileURLToPath(
        new URL('./dist/fesm2022/dragselect-angular.mjs', import.meta.url)
      ),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/__tests__/setup.ts'],
  },
})
