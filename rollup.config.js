import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"
import fs from 'fs'
import path from 'path'

export default {
  input: 'src/DragSelect.js',
  output: [
    {
      file: 'dist/DragSelect.es6m.js',
      format: 'es',
      name: 'DragSelect',
    },
    {
      file: 'dist/DragSelect.js',
      format: 'umd',
      name: 'DragSelect',
    },
    {
      file: 'dist/ds.es6m.min.js',
      format: 'es',
      name: 'DragSelect',
      compact: true,
      plugins: [terser()]
    },
    {
      file: 'dist/ds.min.js',
      format: 'umd',
      name: 'DragSelect',
      compact: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    {
      name: 'copy',
      writeBundle(options) {
        fs.copyFileSync(options.file, `docs/${path.basename(options.file)}`);
        console.log(options.file, `docs/${path.basename(options.file)}`)
      }
    }
  ],
};
