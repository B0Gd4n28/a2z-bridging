/* One-off: initialise Payload against the production DB in dev mode so drizzle `push` creates any
   missing tables/columns (push:true is skipped during production builds). Then smoke-test the new tables. */
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const payload = await getPayload({ config })
  const leads = await payload.find({ collection: 'leads', limit: 1, depth: 0 })
  const landing = await payload.find({ collection: 'landing-pages', limit: 1, depth: 0 })
  payload.logger.info(`leads reachable (total ${leads.totalDocs}); landing-pages reachable (total ${landing.totalDocs})`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
