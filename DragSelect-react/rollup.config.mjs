import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

// Marks every export as a client component for React Server Components
// frameworks (e.g. Next.js App Router). Ignored everywhere else.
const banner = `'use client';`

const external = (id) =>
  id === 'react' || id.startsWith('react/') || id === 'dragselect'

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
  {
    input: 'src/index.tsx',
    external,
    output: [
      { file: 'dist/index.mjs', format: 'es', banner },
      { file: 'dist/index.cjs', format: 'cjs', banner, exports: 'named' },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['src/**/__tests__/**'],
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
      warn(warning)
    },
  },
  {
    input: 'src/index.tsx',
    external,
    plugins: [dts()],
    output: { file: 'dist/index.d.ts', format: 'es' },
  },
]
