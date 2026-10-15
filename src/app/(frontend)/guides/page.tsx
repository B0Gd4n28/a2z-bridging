import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { GuidesIndex } from '@/components/site/GuidesIndex'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    sort: '-publishedAt',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
      heroImage: true,
      content: true,
    },
  })

  return <GuidesIndex posts={posts.docs} page={posts.page ?? 1} totalPages={posts.totalPages} totalDocs={posts.totalDocs} />
}

export function generateMetadata(): Metadata {
  return {
    title: { absolute: 'Property Finance Guides — Bridging & BTL | A2Z Bridging' },
    description:
      'Plain-English guides to bridging loans, auction finance, buy-to-let and commercial mortgages from the A2Z Bridging team.',
    alternates: { canonical: '/guides' },
  }
}
