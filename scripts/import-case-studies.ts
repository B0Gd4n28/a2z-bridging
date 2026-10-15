/* Import the 29 case studies scraped from the old WordPress site (scripts/data/case-studies.json).
   Upserts by slug, so it can be re-run. Run against Neon with DATABASE_URL + PAYLOAD_SECRET set. */
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type Row = {
  oldUrl: string
  title: string
  slug: string
  category: string
  amount: string
  ltv: string
  term: string
  time: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  snapshot: { label: string; value: string }[]
  sections: { heading: string; tone: string; paragraphs: string[]; bullets: string[] }[]
  outcomeStats: { value: string; label: string }[]
  faqs: { q: string; a: string }[]
}

const CATEGORY: Record<string, string> = { BTL: 'btl', Bridging: 'bridging', Commercial: 'commercial', Auction: 'auction' }
const clean = (v: string | undefined) => (v ?? '').replace(/\r/g, '').trim()
const snap = (row: Row, ...labels: string[]) =>
  row.snapshot.find((s) => labels.some((l) => s.label.toLowerCase() === l.toLowerCase()))?.value

async function run() {
  const rows: Row[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'scripts/data/case-studies.json'), 'utf8'))
  const payload = await getPayload({ config })

  for (const r of rows) {
    const data = {
      title: clean(r.h1) || clean(r.title),
      slug: r.slug,
      category: (CATEGORY[r.category] ?? 'bridging') as 'bridging',
      stats: {
        loanAmount: clean(r.amount) || snap(r, 'Loan Amount'),
        ltv: clean(r.ltv) || snap(r, 'LTV', 'Approx. LTV'),
        term: clean(r.term) || snap(r, 'Term'),
        timeToCompletion: clean(r.time) || snap(r, 'Completion'),
      },
      intro: r.intro,
      location: snap(r, 'Location'),
      snapshot: r.snapshot,
      sections: r.sections.map((s) => ({
        heading: s.heading,
        tone: (s.tone === 'risk' || s.tone === 'solution' ? s.tone : 'default') as 'default',
        body: s.paragraphs.join('\n\n'),
        bullets: s.bullets.join('\n'),
      })),
      outcomeStats: r.outcomeStats,
      faqs: r.faqs.map((f) => ({ question: f.q, answer: f.a })),
      metaTitle: clean(r.metaTitle),
      metaDescription: clean(r.metaDescription),
      oldUrl: r.oldUrl,
    }
    const existing = await payload.find({ collection: 'case-studies', where: { slug: { equals: r.slug } }, limit: 1, depth: 0 })
    if (existing.docs[0]) {
      await payload.update({ collection: 'case-studies', id: existing.docs[0].id, data, context: { disableRevalidate: true } })
      payload.logger.info(`updated ${r.slug}`)
    } else {
      await payload.create({ collection: 'case-studies', data, context: { disableRevalidate: true } })
      payload.logger.info(`created ${r.slug}`)
    }
  }
  const total = await payload.count({ collection: 'case-studies' })
  payload.logger.info(`done — ${total.totalDocs} case studies in DB`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
