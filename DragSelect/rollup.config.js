import babel from '@rollup/plugin-babel'
import fs from 'fs'
import glob from 'glob'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

let typesDone = false
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
 web: http://www.DragSelect.com/
 github: https://github.com/ThibaultJanBeyer/DragSelect

*/`

export default {
  input: 'src/DragSelect.js',
  output: [
    {
      file: 'dist/DragSelect.es6m.js',
      format: 'es',
      name: 'DragSelect',
      banner,
    },
    {
      file: 'dist/DragSelect.js',
      format: 'umd',
      name: 'DragSelect',
      banner,
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
      name: 'add-types', // solves build issue caused by types (#100)
      writeBundle() {
        if (typesDone) return
        typesDone = true
        console.info(`Adding types to all ts files`)
        glob('dist/**/*.d.ts', (er, files) => {
          if (er) throw er
          files.forEach((fileName) => {
            if (fileName.includes('types.d.ts')) return
            const depth = fileName.match(/\//g).length
            const relativeDir = depth === 1 ? './' : '../'.repeat(depth - 1)
            fs.appendFile(fileName, `import "${relativeDir}types"\n`, (err) => {
              if (err) throw err
            })
          })
        })
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
