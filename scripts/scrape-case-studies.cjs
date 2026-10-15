// Scrapes the 29 case-study posts from the OLD WordPress site into scripts/data/case-studies.json,
// merged with the metadata (slug, category, SEO) from the migration spreadsheet TSV.
// Usage: node scripts/scrape-case-studies.cjs <path-to-06-Case_Studies_CMS_.tsv>
const fs = require('fs')
const path = require('path')

const tsvPath = process.argv[2]
const outDir = path.join(__dirname, 'data')
fs.mkdirSync(outDir, { recursive: true })

const NAMED = { pound: '£', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', frac12: '½', nbsp: ' ', lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' }
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z0-9]+);/gi, (m, n) => NAMED[n] ?? m)
const text = (html) => decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const paragraphs = (html) => [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).filter(Boolean)
const items = (html, cls) =>
  [...html.matchAll(new RegExp(`<div[^>]*class="${cls}"[^>]*>([\\s\\S]*?)</div>`, 'g'))].map((m) => text(m[1].replace(/<span[^>]*__(?:icon|check)[^>]*>[\s\S]*?<\/span>/, ''))).filter(Boolean)

const faqsFromDetails = (html) =>
  [...html.matchAll(/<details[\s\S]*?<\/details>/g)]
    .map((m) => {
      const q = (m[0].match(/e-n-accordion-item-title-text">([\s\S]*?)<\/div>/) || [])[1]
      const a = paragraphs(m[0].split('</summary>')[1] || '')
      return q && a.length ? { q: text(q), a: a.join(' ') } : null
    })
    .filter(Boolean)

function parseStructured(html) {
  const parts = html.split(/<!--[^>]*?SECTION (\d+)[^>]*?-->/)
  const s = {}
  for (let i = 1; i < parts.length; i += 2) s[Number(parts[i])] = parts[i + 1]
  const g = (re, str) => (str.match(re) || [])[1] || ''
  const sections = []
  for (const [n, tone] of [[3, 'default'], [4, 'risk'], [5, 'solution']]) {
    const c = s[n] || ''
    sections.push({
      heading: text(g(/<h2[^>]*>([\s\S]*?)<\/h2>/, c)),
      tone,
      paragraphs: paragraphs(c),
      bullets: items(c, 'cs-risk-item').concat(items(c, 'cs-solution-item')),
    })
  }
  return {
    h1: text(g(/<h1[^>]*>([\s\S]*?)<\/h1>/, html)),
    intro: text(g(/<p[^>]*class="cs-intro"[^>]*>([\s\S]*?)<\/p>/, s[1] || '')),
    tags: [...(s[1] || '').matchAll(/<span[^>]*class="cs-tag[^"]*"[^>]*>([\s\S]*?)<\/span>/g)].map((m) => text(m[1])),
    snapshot: [...(s[2] || '').matchAll(/cs-snapshot__label">([\s\S]*?)<\/span>\s*<span[^>]*cs-snapshot__value">([\s\S]*?)<\/span>/g)].map((m) => ({ label: text(m[1]), value: text(m[2]) })),
    sections,
    outcomeStats: [...(s[7] || '').matchAll(/cs-outcome__stat">([\s\S]*?)<\/span>\s*<span[^>]*cs-outcome__label">([\s\S]*?)<\/span>/g)].map((m) => ({ value: text(m[1]), label: text(m[2]) })),
    faqs: [...(s[9] || '').matchAll(/<div[^>]*class="cs-faq__item"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)].map((m) => ({
      q: text((m[1].match(/cs-faq__question[^>]*>([\s\S]*?)<\/(?:button|div|h3|summary)>/) || [])[1] || '').replace(/[+−-]$/, '').trim(),
      a: text((m[1].match(/cs-faq__answer[^>]*>([\s\S]*)$/) || [])[1] || ''),
    })),
  }
}

function parseElementor(html) {
  let body = html.slice(html.indexOf('<h1'))
  const stop = body.search(/Leave a Comment|<h3[^>]*>\s*Contact Us|Related Case Stud/i)
  if (stop > 0) body = body.slice(0, stop)
  const h1 = text((body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '')
  const faqIdx = body.search(/Frequently Asked Questions/i)
  const main = faqIdx > 0 ? body.slice(0, faqIdx) : body
  const faqs = faqIdx > 0 ? faqsFromDetails(body.slice(faqIdx)) : []
  const re = /<tr[^>]*>([\s\S]*?)<\/tr>|<h2[^>]*>([\s\S]*?)<\/h2>|<li[^>]*>([\s\S]*?)<\/li>|<p[^>]*>([\s\S]*?)<\/p>/g
  const snapshot = []
  const intro = []
  const sections = []
  let cur = null
  let m
  while ((m = re.exec(main))) {
    if (m[1] !== undefined) {
      const cells = [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((x) => text(x[1]))
      if (cells.length >= 2) snapshot.push({ label: cells[0], value: cells[1] })
    } else if (m[2] !== undefined) {
      cur = { heading: text(m[2]), tone: /risk|wrong|challenge/i.test(text(m[2])) ? 'risk' : /solution|how we/i.test(text(m[2])) ? 'solution' : 'default', paragraphs: [], bullets: [] }
      sections.push(cur)
    } else if (m[3] !== undefined) {
      if (cur) cur.bullets.push(text(m[3]))
    } else {
      const t = text(m[4])
      if (!t) continue
      if (cur) cur.paragraphs.push(t)
      else if (!/^If you need help with/i.test(t)) intro.push(t)
    }
  }
  const outcomeIdx = sections.findIndex((x) => /^the outcome$/i.test(x.heading))
  let outcomeStats = []
  if (outcomeIdx >= 0) {
    outcomeStats = sections[outcomeIdx].bullets.map((b) => ({ value: '✓', label: b }))
    sections.splice(outcomeIdx, 1)
  }
  return { h1, intro: intro.join(' '), tags: [], snapshot, sections: sections.filter((x) => x.paragraphs.length || x.bullets.length), outcomeStats, faqs }
}

const parsePost = (html) => (html.includes('cs-snapshot') ? parseStructured(html) : parseElementor(html))

;(async () => {
  const rows = fs.readFileSync(tsvPath, 'utf8').split('\n').slice(1).filter((l) => l.trim().startsWith('/'))
  const result = []
  for (const line of rows) {
    const c = line.split('\t')
    const [oldUrl, title, slug, category, amount, ltv, term, time, advisor, metaTitle, , metaDescription, , parent] = c
    const res = await fetch('https://a2zbridging.co.uk' + oldUrl.trim())
    const html = await res.text()
    let parsed = parsePost(html)
    if (slug === 'auction-finance-750000-28-days') {
      // Old page used a different layout and named the client / the firm's own address: re-built without personal data.
      parsed = {
        h1: '£750,000 Auction Finance Completed Within 28 Days',
        intro: 'How A2Z Bridging structured a £750,000 auction bridging loan so an experienced investor could secure a £1,000,000 property at auction inside the 28-day completion window.',
        tags: [],
        snapshot: [
          { label: 'Loan Amount', value: '£750,000' },
          { label: 'LTV', value: '75%' },
          { label: 'Purchase Price', value: '£1,000,000' },
          { label: 'Product', value: 'Auction bridging loan' },
          { label: 'Term', value: '12 months' },
          { label: 'Rate', value: '0.75% per month' },
          { label: 'Security', value: '3-bed semi-detached house (1st charge)' },
          { label: 'Exit', value: 'Sale of renovated property' },
        ],
        sections: [
          { heading: 'The Client Scenario', tone: 'default', paragraphs: ['An experienced property investor won a £1,000,000 lot at auction with the aim of renovating and reselling it. Completion had to happen within the 28-day auction deadline, and the client was already committed to several other projects, so capital was tied up elsewhere.'], bullets: [] },
          { heading: 'The Solution', tone: 'solution', paragraphs: ['Given the tight deadline, speed of underwriting was critical, so the case was presented to lenders with a complete, well-packaged submission from day one. That produced competitive monthly interest terms and 75% loan-to-value, which let the client complete the purchase without tying up further capital.'], bullets: ['£750,000 bridging loan (auction finance), 12-month term', '0.75% per month, 1st charge only on the security property', 'Exit strategy: sale of the renovated property'] },
        ],
        outcomeStats: [
          { value: '£750k', label: 'Facility Secured' },
          { value: '28', label: 'Days to Completion' },
          { value: '75%', label: 'LTV Achieved' },
          { value: '0.75%', label: 'Per Month' },
        ],
        faqs: [],
      }
    }
    parsed.sections = parsed.sections.filter((x) => !/get in touch/i.test(x.heading))
    if (!parsed.intro || /Facility Amount/.test(parsed.intro)) parsed.intro = (metaDescription || '').trim()
    result.push({ oldUrl: oldUrl.trim(), title, slug, category, amount, ltv, term, time, metaTitle, metaDescription, parent, ...parsed })
    console.log(res.status, slug, '| snap', parsed.snapshot.length, '| sec', parsed.sections.map((x) => x.paragraphs.length + '/' + x.bullets.length).join(','), '| out', parsed.outcomeStats.length, '| faq', parsed.faqs.length, '| intro', parsed.intro.length)
  }
  fs.writeFileSync(path.join(outDir, 'case-studies.json'), JSON.stringify(result, null, 1))
  console.log('wrote', result.length)
})()
