const path = require('path')
const fs = require('fs')
const { isIfStatement } = require('babel-types')

exports.handlers = {
  beforeParse: (e) => {
    const cache = []
    const fullQuery = /\/\*\*\s*?@typedef\s*?{\s*?import.*\*\//gm
    const imports = e.source.match(fullQuery)

    // if(imports && imports.length > 0)
    //   imports.forEach(importQuery => {
    //     const get = importQuery.match(/(?<=import\(.)(.*)(?=.\))/g)[0]
    //     console.log(path.resolve(path.dirname(e.filename), get))
    //     const fileContent = fs.readFileSync(path.resolve(path.dirname(e.filename), get))
    //     const fileContentCleaned = fileContent.toString().replace(/export.*/gm, '')
    //     e.source = e.source.replace(importQuery, '')
    //     e.source += fileContentCleaned
    //   })
    // if(imports && imports.length > 0)
    //   imports.forEach((importQuery, i) => {
    //     const get = importQuery.match(/(?<=import\(.)(.*)(?=.\))/g)[0]
    //     console.log(i, get)
    //     if(cache.includes(get)) return
    //     console.log('wow')
    //     cache.push(get)
    //     e.source = e.source.replace(importQuery, `import '${get}'`)
    //   })

    e.source = e.source.replace(fullQuery, '')
  }
}
