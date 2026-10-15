/* Creates (or resets the password of) the CMS admin user.
   Usage: set ADMIN_EMAIL + ADMIN_PASSWORD (+ DATABASE_URL, PAYLOAD_SECRET) then `npx tsx scripts/create-admin.ts`. */
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD')

  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (existing.docs[0]) {
    await payload.update({ collection: 'users', id: existing.docs[0].id, data: { password }, context: { disableRevalidate: true } })
    payload.logger.info(`Password reset for ${email}`)
  } else {
    await payload.create({ collection: 'users', data: { email, password, name: 'A2Z Admin' }, context: { disableRevalidate: true } })
    payload.logger.info(`Created admin ${email}`)
  }
  const total = await payload.count({ collection: 'users' })
  payload.logger.info(`users in DB: ${total.totalDocs}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
