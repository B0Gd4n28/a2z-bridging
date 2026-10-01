import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SectionHeading } from '@/components/site/SectionHeading'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Bridging Finance Case Studies | A2Z Bridging',
  description:
    'Real deals, real deadlines. Every case study is a completed A2Z deal, with the loan amount, LTV and timeline.',
  alternates: { canonical: '/case-studies' },
}

const CATEGORY_LABELS: Record<string, string> = {
  bridging: 'Bridging',
  auction: 'Auction Finance',
  btl: 'Buy-to-Let',
  development: 'Development',
  commercial: 'Commercial',
  business: 'Business Loans',
}

export default async function CaseStudiesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'case-studies',
    limit: 24,
    sort: '-createdAt',
    depth: 0,
  })

  return (
    <section className="bg-mist py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Case Studies"
          title="Bridging Finance Case Studies"
          text="Real deals, real deadlines. Every case study is a completed A2Z deal, with the loan amount, LTV and timeline."
        />

        {docs.length === 0 ? (
          <p className="mt-12 text-center text-navy-900/60">
            Case studies are being added — check back soon or{' '}
            <Link href="/contact" className="font-semibold text-brand-600 underline">talk to an advisor</Link>.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 bg-gradient-to-br from-navy-800 to-navy-600">
                  <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white">
                    {CATEGORY_LABELS[cs.category] ?? cs.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-lg font-bold text-navy-900 group-hover:text-brand-600">
                    {cs.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-navy-900/60">
                    {cs.stats?.loanAmount && <span><strong className="text-brand-600">{cs.stats.loanAmount}</strong> loan</span>}
                    {cs.stats?.timeToCompletion && <span><strong className="text-brand-600">{cs.stats.timeToCompletion}</strong> to completion</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
