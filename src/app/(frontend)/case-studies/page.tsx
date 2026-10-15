import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { CaseStudyBrowser, type CaseCard } from '@/components/site/CaseStudyBrowser'
import { CASE_CATEGORY_LABELS } from '@/lib/case-studies'
import { SITE } from '@/lib/site'

export const revalidate = 600

export const metadata: Metadata = {
  title: { absolute: 'Bridging Finance Case Studies UK — Real Completions | A2Z Bridging' },
  description:
    'Bridging finance case studies UK: real A2Z completions with loan amounts, LTVs and completion times across bridging, auction, buy-to-let and commercial finance.',
  alternates: { canonical: '/case-studies' },
}

export default async function CaseStudiesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'case-studies',
    limit: 100,
    sort: '-createdAt',
    depth: 0,
  })

  const cases: CaseCard[] = docs.map((cs) => ({
    id: cs.id,
    slug: String(cs.slug),
    title: cs.title,
    category: cs.category,
    categoryLabel: CASE_CATEGORY_LABELS[cs.category] ?? cs.category,
    amount: cs.stats?.loanAmount,
    ltv: cs.stats?.ltv,
    time: cs.stats?.timeToCompletion,
    location: cs.location,
    summary: cs.intro,
  }))

  const present = Object.keys(CASE_CATEGORY_LABELS).filter((k) => docs.some((d) => d.category === k))
  const categories = present.map((value) => ({ value, label: CASE_CATEGORY_LABELS[value] }))

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container relative py-16 text-center lg:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Case Studies</p>
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight lg:text-5xl">
            Bridging Finance Case Studies
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            Real deals, real deadlines. Every case study is a completed A2Z deal, with the loan amount, LTV and the
            timeline from first call to completion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get Your Quote <ArrowRight size={16} />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PhoneCall size={15} /> {SITE.phone}
            </a>
          </div>
          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-8">
            <div>
              <dt className="text-xs text-white/50">Completed deals shown</dt>
              <dd className="mt-1 font-serif text-3xl font-bold text-brand-400">{docs.length}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/50">Finance types</dt>
              <dd className="mt-1 font-serif text-3xl font-bold text-brand-400">{categories.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-20">
        <div className="container">
          {docs.length === 0 ? (
            <p className="text-center text-navy-900/60">
              Case studies are being added — check back soon or{' '}
              <Link href="/contact" className="font-semibold text-brand-600 underline">talk to an advisor</Link>.
            </p>
          ) : (
            <CaseStudyBrowser cases={cases} categories={categories} />
          )}
          <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-navy-900/50">
            Each case reflects the individual circumstances of that borrower and property. Terms, rates and availability
            differ for every deal and are subject to status, valuation and lender approval. A2Z Bridging Ltd is authorised and
            regulated by the Financial Conduct Authority (FRN {SITE.fcaNumber}). We are a broker, not a lender.
          </p>
        </div>
      </section>
    </>
  )
}
