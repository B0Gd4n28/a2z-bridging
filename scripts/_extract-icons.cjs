const fs = require('fs')
const icons = ['link-2-off','gavel','hammer','store','building-2','percent','shield-check','award','star','clock','globe','phone-call','lock','badge-check','check']
const out = {}
for (const n of icons) {
  const f = 'node_modules/lucide-react/dist/esm/icons/' + n + '.js'
  if (!fs.existsSync(f)) { out[n] = 'MISSING'; continue }
  const src = fs.readFileSync(f, 'utf8')
  const m = src.match(/const __iconNode = (\[[\s\S]*?\]);\s*const /)
  if (!m) { out[n] = 'NOPARSE'; continue }
  const node = eval(m[1])
  out[n] = node.map(([tag, attrs]) => '<' + tag + ' ' + Object.entries(attrs).filter(([k]) => k !== 'key').map(([k, v]) => k + '="' + v + '"').join(' ') + '/>').join('')
}
fs.writeFileSync('scripts/_icons.json', JSON.stringify(out, null, 1))
console.log(Object.entries(out).map(([k, v]) => k + ': ' + v.length).join('\n'))
