/* One-off production fix: remove the fabricated case study and replace placeholder
   team members with the real roster from the migration spec (Harsh Chopra, 29 Sept 2026). */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const REAL_TEAM = [
  { name: 'Syed Abbas', role: 'CEO', bio: 'Leads A2Z Bridging and oversees every case from first call to completion.', tags: ['Leadership'], order: 1 },
  { name: 'Jimeet Kakar', role: 'Partner', bio: 'Works across bridging, development and commercial finance deals.', tags: ['Bridging', 'Commercial'], order: 2 },
  { name: 'Ani Sheikh', role: 'Sales Director', bio: 'Leads the advisory team and manages key lender relationships.', tags: ['Bridging', 'Lender Relations'], order: 3 },
  { name: 'Zain Abbas', role: 'Director of Business Development', bio: 'Builds new partnerships and manages complex, multi-property cases.', tags: ['Business Development'], order: 4 },
  { name: 'Tanveer Kakar', role: 'Business Development Manager', bio: 'Works with brokers and introducers to structure the right finance for each deal.', tags: ['Business Development'], order: 5 },
  { name: 'Aima Hasan', role: 'Case Manager', bio: 'Manages cases from application through to completion.', tags: ['Case Management'], order: 6 },
  { name: 'Abdullah Mansoor', role: 'Case Manager', bio: 'Manages cases from application through to completion.', tags: ['Case Management'], order: 7 },
]

async function run() {
  const payload = await getPayload({ config })

  payload.logger.info('Deleting fabricated case study…')
  const fake = await payload.find({ collection: 'case-studies', where: { slug: { equals: 'auction-completion-in-9-days' } }, limit: 1 })
  if (fake.docs[0]) {
    await payload.delete({ collection: 'case-studies', id: fake.docs[0].id })
    payload.logger.info('Deleted.')
  } else {
    payload.logger.info('Already gone.')
  }

  payload.logger.info('Replacing team roster with the real list…')
  const existing = await payload.find({ collection: 'team-members', limit: 100 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'team-members', id: doc.id })
  }
  for (const m of REAL_TEAM) {
    await payload.create({ collection: 'team-members', data: { ...m, tags: m.tags.map((tag) => ({ tag })) }, context: { disableRevalidate: true } })
  }

  payload.logger.info('✅ Done.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
