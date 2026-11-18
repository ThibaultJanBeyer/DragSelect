import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Print which published versions are under test, so a run can be tied to a release.
const version = (app, pkg) => {
  const path = fileURLToPath(new URL(`../${app}/node_modules/${pkg}/package.json`, import.meta.url))
  try {
    return JSON.parse(readFileSync(path, 'utf8')).version
  } catch {
    throw new Error(`${pkg} is not installed in ${app}. Run \`npm run install:latest\` first.`)
  }
}

export default function globalSetup() {
  console.log('\nTesting published packages:')
  console.log(`  js-test       dragselect@${version('js-test', 'dragselect')}`)
  console.log(`  react-test    dragselect@${version('react-test', 'dragselect')}`)
  console.log(`  react-test    @dragselect/react@${version('react-test', '@dragselect/react')}`)
  console.log(`  angular-test  dragselect@${version('angular-test', 'dragselect')}`)
  console.log(`  angular-test  @dragselect/angular@${version('angular-test', '@dragselect/angular')}\n`)
}
