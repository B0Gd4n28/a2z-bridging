import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CtaBanner } from '@/components/site/CtaBanner'

export const revalidate = 600

const CATEGORY_LABELS: Record<string, string> = {
  bridging: 'Bridging',
  auction: 'Auction Finance',
  btl: 'Buy-to-Let',
  development: 'Development',
  commercial: 'Commercial',
  business: 'Business Loans',
}

type Args = { params: Promise<{ slug: string }> }

async function getCaseStudy(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({ collection: 'case-studies', limit: 100, select: { slug: true } })
    return docs.map((d) => ({ slug: String(d.slug) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) return { title: 'Case Study' }
  return {
    title: `${cs.title} — Case Study`,
    description: cs.challenge ?? undefined,
    alternates: { canonical: `/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()

  const advisor = typeof cs.advisor === 'object' ? cs.advisor : null
  const stats = [
    { value: cs.stats?.loanAmount, label: 'Loan amount' },
    { value: cs.stats?.ltv, label: 'Loan-to-value' },
    { value: cs.stats?.term, label: 'Term' },
    { value: cs.stats?.timeToCompletion, label: 'To completion' },
  ].filter((s) => s.value)

  const sections = [
    { eyebrow: 'The Challenge', title: cs.challengeTitle, text: cs.challenge },
    { eyebrow: 'The Solution', title: cs.solutionTitle, text: cs.solution },
    { eyebrow: 'The Outcome', title: cs.outcomeTitle, text: cs.outcome },
  ].filter((s) => s.text)

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container py-12 lg:py-16">
          <nav className="text-xs text-white/50" aria-label="Breadcrumb">
            <Link href="/case-studies" className="hover:text-white">Case Studies</Link>
            <span className="mx-2">/</span>
            <span>{cs.title}</span>
          </nav>
          <span className="mt-6 inline-block rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold">
            {CATEGORY_LABELS[cs.category] ?? cs.category}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight lg:text-4xl">
            {cs.title}
          </h1>
        </div>
        {stats.length > 0 && (
          <div className="border-t border-white/10 bg-navy-950/40">
            <div className="container grid grid-cols-2 gap-y-6 py-6 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-xl font-bold text-brand-400">{s.value}</p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container mx-auto max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.eyebrow}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{s.eyebrow}</p>
              {s.title && <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900">{s.title}</h2>}
              <p className="mt-3 leading-relaxed text-navy-900/70">{s.text}</p>
            </div>
          ))}

          {advisor && (
            <div className="flex items-center gap-4 rounded-xl bg-mist p-6">
              <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-brand-400 to-brand-100" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-navy-900">Handled by {advisor.name}</p>
                <p className="text-xs text-navy-900/60">{advisor.role}, A2Z Bridging</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title="Facing a Tight Deadline of Your Own?"
        text="Talk to an advisor today — most cases get an initial answer within hours."
      />
    </>
  )
}
