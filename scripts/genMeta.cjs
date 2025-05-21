const fs = require('fs')
const path = require('path')

const baseDir = path.resolve(__dirname, '../src/pages')
const output = {}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name))
    } else if (entry.name === 'index.md') {
      const folder = path.dirname(path.join(dir, entry.name))
      const stats = fs.statSync(path.join(folder, 'index.md'))
      const titleFile = path.join(folder, 'title.txt')
      const folderName = path.basename(folder)

      const title = fs.existsSync(titleFile)
        ? fs.readFileSync(titleFile, 'utf-8').trim()
        : folderName

      output[`/src/pages/${folderName}/meta.json`] = {
        title,
        mtime: stats.mtime.toISOString(),
      }

      // 保存 meta.json 到每个文件夹下
      fs.writeFileSync(
        path.join(folder, 'meta.json'),
        JSON.stringify(output[`/src/pages/${folderName}/meta.json`], null, 2),
        'utf-8'
      )
    }
  }
}

walk(baseDir)
console.log('✅ meta.json 已生成')
