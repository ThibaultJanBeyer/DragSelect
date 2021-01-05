import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import fs from 'fs'
import path from 'path'

const banner = `/***

 ~~~ Version ${process.env.npm_package_version} ~~~

 ******************************************

    ____                   _____      __          __ 
   / __ \\_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ \`/ __ \`/\\__ \\/ _ \\/ / _ \\/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \\__,_/\\__, //____/\\___/_/\\___/\\___/\\__/  
               /____/                              

 ******************************************
 
 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************
 Created 2017 by ThibaultJanBeyer
 web: http://www.thibaultjanbeyer.com/
 github: https://github.com/ThibaultJanBeyer/DragSelect

*/`

export default {
  input: 'src/DragSelect.js',
  output: [
    {
      file: 'dist/DragSelect.es6m.js',
      format: 'es',
      name: 'DragSelect',
      banner: banner,
    },
    {
      file: 'dist/DragSelect.js',
      format: 'umd',
      name: 'DragSelect',
      banner: banner,
    },
    {
      file: 'dist/ds.es6m.min.js',
      format: 'es',
      name: 'DragSelect',
      compact: true,
      plugins: [terser()],
    },
    {
      file: 'dist/ds.min.js',
      format: 'umd',
      name: 'DragSelect',
      compact: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    {
      name: 'copy',
      writeBundle(options) {
        if (!process.argv.includes('--travis')) return
        if (!fs.existsSync('docs/')) fs.mkdirSync('docs')
        fs.copyFileSync(
          `.v1/${path.basename(options.file)}`,
          `docs/${path.basename(options.file)}`
        )
        console.log(
          `.v1/${path.basename(options.file)}`,
          `docs/${path.basename(options.file)}`
        )
        if (!fs.existsSync('docs/v2')) fs.mkdirSync('docs/v2')
        fs.copyFileSync(options.file, `docs/v2/${path.basename(options.file)}`)
        console.log(options.file, `docs/v2/${path.basename(options.file)}`)
      },
    },
    {
      name: 'disable-treeshaking',
      transform(code, id) {
        if (id.endsWith('types.js')) {
          return { moduleSideEffects: 'no-treeshake' }
        }
      },
    },
  ],
}
