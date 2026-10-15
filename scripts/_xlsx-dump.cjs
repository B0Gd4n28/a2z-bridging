// Temp helper: dump every sheet of the migration xlsx to TSV files (xlsx is a zip of XML).
const fs = require('fs')
const path = require('path')
const root = process.argv[2]
const out = process.argv[3]
fs.mkdirSync(out, { recursive: true })
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&')
const ss = []
const sst = fs.readFileSync(path.join(root, 'xl/sharedStrings.xml'), 'utf8')
for (const m of sst.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
  ss.push(dec([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join('')))
}
const wb = fs.readFileSync(path.join(root, 'xl/workbook.xml'), 'utf8')
const names = [...wb.matchAll(/<sheet [^>]*name="([^"]*)"/g)].map((m) => dec(m[1]))
const col = (ref) => ref.replace(/\d+/g, '').split('').reduce((a, c) => a * 26 + c.charCodeAt(0) - 64, 0) - 1
names.forEach((name, i) => {
  const f = path.join(root, `xl/worksheets/sheet${i + 1}.xml`)
  if (!fs.existsSync(f)) return
  const xml = fs.readFileSync(f, 'utf8')
  const rows = []
  for (const r of xml.matchAll(/<row [^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = []
    for (const c of r[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = c[1]
      const ref = (attrs.match(/r="([A-Z]+\d+)"/) || [])[1]
      const t = (attrs.match(/t="([^"]+)"/) || [])[1]
      const inner = c[2] || ''
      let v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1]
      if (t === 's' && v !== undefined) v = ss[Number(v)]
      else if (t === 'inlineStr') v = dec([...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join(''))
      else if (v !== undefined) v = dec(v)
      if (ref && v !== undefined) cells[col(ref)] = String(v).replace(/[\t\r\n]+/g, ' ')
    }
    rows.push((cells.map((x) => x ?? '')).join('\t'))
  }
  fs.writeFileSync(path.join(out, `${String(i + 1).padStart(2, '0')}-${name.replace(/[^\w]+/g, '_')}.tsv`), rows.join('\n'))
  console.log(i + 1, name, rows.length, 'rows')
})
