/* One-off production fix: upload the real team photos (dropped into the project root by the
   client) into the Media collection (Vercel Blob storage) and attach them to the matching
   TeamMembers records.

   NOTE: Photo-to-name mapping is a BEST GUESS (no name labels were provided with the photos —
   5 photos for 7 team members, including 2 female names but only 1 clearly-female photo).
   Flagged to the client for confirmation/correction via the admin panel. */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const ASSET_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const PHOTO_ASSIGNMENTS = [
  { file: '1750617049066.jpeg', name: 'Syed Abbas', alt: 'Syed Abbas, CEO at A2Z Bridging' },
  { file: '1698970623240.jpeg', name: 'Jimeet Kakar', alt: 'Jimeet Kakar, Partner at A2Z Bridging' },
  { file: '1739205914775.jpeg', name: 'Ani Sheikh', alt: 'Ani Sheikh, Sales Director at A2Z Bridging' },
  { file: '1602372007660.jpeg', name: 'Zain Abbas', alt: 'Zain Abbas, Director of Business Development at A2Z Bridging' },
  { file: '1757955220345.jpeg', name: 'Tanveer Kakar', alt: 'Tanveer Kakar, Business Development Manager at A2Z Bridging' },
]

async function run() {
  const payload = await getPayload({ config })

  for (const a of PHOTO_ASSIGNMENTS) {
    const filePath = path.join(ASSET_DIR, a.file)
    const buffer = fs.readFileSync(filePath)
    const stat = fs.statSync(filePath)

    payload.logger.info(`Uploading ${a.file} for ${a.name}…`)
    const media = await payload.create({
      collection: 'media',
      data: { alt: a.alt },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: a.file,
        size: stat.size,
      },
    })

    const existing = await payload.find({
      collection: 'team-members',
      where: { name: { equals: a.name } },
      limit: 1,
    })

    if (!existing.docs[0]) {
      payload.logger.warn(`No team member found named "${a.name}" — skipping link.`)
      continue
    }

    await payload.update({
      collection: 'team-members',
      id: existing.docs[0].id,
      data: { photo: media.id },
    })
    payload.logger.info(`Linked photo to ${a.name}.`)
  }

  payload.logger.info('✅ Done.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
