import fs from 'fs'

const copy = () => {
  if (!fs.existsSync('docs/')) fs.mkdirSync('docs')
  if (!fs.existsSync('docs/v2/')) fs.mkdirSync('docs/v2')
  if (!fs.existsSync('dist/')) fs.mkdirSync('dist')
  
  console.info(`Adding www/build output to docs/ folder`)
  fs.cpSync(`www/build`, `docs/`, { recursive: true })

  console.info(`Copy v1 to docs/ folder`)
  fs.cpSync(`.v1`, `docs/`, { recursive: true })

  console.info(`Copy dragselect/dist to docs/v2 folder`)
  fs.cpSync(`DragSelect/dist`, `docs/v2`, { recursive: true })
}

copy()
