import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, MapPin, PhoneCall, ShieldCheck } from 'lucide-react'
import { CtaBanner } from '@/components/site/CtaBanner'
import { CASE_CATEGORY_LABELS, CASE_CATEGORY_LINKS, splitLines, splitParagraphs } from '@/lib/case-studies'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE } from '@/lib/site'

export const revalidate = 600

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
  const title = cs.metaTitle || `${cs.title} | A2Z Bridging`
  return {
    title: { absolute: title.includes('A2Z Bridging') ? title : `${title} | A2Z Bridging` },
    description: cs.metaDescription || cs.intro || cs.challenge || undefined,
    alternates: { canonical: `/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()

  const advisor = typeof cs.advisor === 'object' ? cs.advisor : null
  const categoryLabel = CASE_CATEGORY_LABELS[cs.category] ?? cs.category
  const highlights = [
    { value: cs.stats?.loanAmount, label: 'Loan amount' },
    { value: cs.stats?.ltv, label: 'Loan-to-value' },
    { value: cs.stats?.term, label: 'Term' },
    { value: cs.stats?.timeToCompletion, label: 'To completion' },
  ].filter((s) => s.value)

  type Section = { heading: string; tone: string; paragraphs: string[]; bullets: string[] }
  let sections: Section[] = (cs.sections ?? []).map((s) => ({
    heading: s.heading,
    tone: s.tone ?? 'default',
    paragraphs: splitParagraphs(s.body),
    bullets: splitLines(s.bullets),
  }))
  if (sections.length === 0) {
    sections = [
      { heading: cs.challengeTitle || 'The Challenge', tone: 'risk', paragraphs: splitParagraphs(cs.challenge), bullets: [] },
      { heading: cs.solutionTitle || 'The Solution', tone: 'solution', paragraphs: splitParagraphs(cs.solution), bullets: [] },
      { heading: cs.outcomeTitle || 'The Outcome', tone: 'default', paragraphs: splitParagraphs(cs.outcome), bullets: [] },
    ].filter((s) => s.paragraphs.length)
  }

  const snapshot = cs.snapshot ?? []
  const outcome = cs.outcomeStats ?? []
  const faqs = cs.faqs ?? []

  const payload = await getPayload({ config: configPromise })
  const related = (
    await payload.find({
      collection: 'case-studies',
      where: { and: [{ category: { equals: cs.category } }, { slug: { not_equals: slug } }] },
      limit: 3,
      sort: '-createdAt',
      depth: 0,
    })
  ).docs

  const base = getServerSideURL()
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: base },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${base}/case-studies` },
        { '@type': 'ListItem', position: 3, name: cs.title, item: `${base}/case-studies/${slug}` },
      ],
    },
    ...(faqs.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container relative py-12 lg:py-16">
          <nav className="text-xs text-white/50" aria-label="Breadcrumb">
            <Link href="/case-studies" className="hover:text-white">Case Studies</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{categoryLabel}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold">{categoryLabel}</span>
            {cs.location && (
              <span className="inline-flex items-center gap-1 text-xs text-white/70">
                <MapPin size={13} /> {cs.location}
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-bold leading-tight lg:text-5xl">{cs.title}</h1>
          {cs.intro && <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 lg:text-lg">{cs.intro}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get a Similar Quote <ArrowRight size={16} />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PhoneCall size={15} /> {SITE.phone}
            </a>
          </div>
        </div>
        {highlights.length > 0 && (
          <div className="relative border-t border-white/10 bg-navy-950/50">
            <div className="container grid grid-cols-2 gap-y-6 py-6 lg:grid-cols-4">
              {highlights.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-xl font-bold text-brand-400 lg:text-2xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-10">
            {sections.map((s) => {
              const tone = s.tone === 'risk' ? 'risk' : s.tone === 'solution' ? 'solution' : 'default'
              return (
                <div
                  key={s.heading}
                  className={
                    tone === 'risk'
                      ? 'rounded-2xl border border-amber-200 bg-amber-50/60 p-6 lg:p-8'
                      : tone === 'solution'
                        ? 'rounded-2xl border border-brand-100 bg-brand-100/30 p-6 lg:p-8'
                        : ''
                  }
                >
                  <h2 className="font-serif text-2xl font-bold text-navy-900">{s.heading}</h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-navy-900/75">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {s.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-navy-900/80">
                          {tone === 'risk' ? (
                            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                          ) : (
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                          )}
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}

            {outcome.length > 0 && (
              <div className="rounded-2xl bg-navy-900 p-6 text-white lg:p-8">
                <h2 className="font-serif text-2xl font-bold">The Outcome</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {outcome.map((o) => (
                    <div key={o.label} className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
                      {o.value === '✓' ? (
                        <CheckCircle2 size={26} className="mx-auto text-brand-400" aria-hidden="true" />
                      ) : (
                        <p className="font-serif text-2xl font-bold text-brand-400">{o.value}</p>
                      )}
                      <p className="mt-2 text-xs leading-snug text-white/70">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faqs.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>
                <div className="mt-5 space-y-3">
                  {faqs.map((f, i) => (
                    <details key={f.question} open={i === 0} className="group rounded-xl border border-navy-900/10 bg-mist">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-navy-900 marker:hidden [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <ChevronDown size={18} className="shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-5 pb-5 text-sm leading-relaxed text-navy-900/70">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

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

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {snapshot.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm">
                <h2 className="bg-navy-900 px-5 py-3 text-sm font-bold text-white">Deal Snapshot</h2>
                <dl className="divide-y divide-navy-900/5">
                  {snapshot.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                      <dt className="text-navy-900/55">{row.label}</dt>
                      <dd className="text-right font-semibold text-navy-900">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className="rounded-2xl bg-mist p-6">
              <p className="font-serif text-lg font-bold text-navy-900">Got a similar deal?</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                Tell us the deadline and the numbers. An advisor will come back with indicative terms, usually the same working day.
              </p>
              <Link
                href="/quote"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Get Your Quote <ArrowRight size={15} />
              </Link>
              {CASE_CATEGORY_LINKS[cs.category] && (
                <Link href={CASE_CATEGORY_LINKS[cs.category]} className="mt-3 block text-center text-sm font-semibold text-brand-600 hover:underline">
                  About {categoryLabel.toLowerCase()} finance
                </Link>
              )}
              <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-navy-900/50">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-600" />
                A2Z Bridging Ltd is authorised and regulated by the FCA (FRN {SITE.fcaNumber}). We are a broker, not a lender.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mist py-14 lg:py-20">
          <div className="container">
            <h2 className="text-center font-serif text-2xl font-bold text-navy-900 lg:text-3xl">More {categoryLabel} Case Studies</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="font-serif text-2xl font-bold text-brand-600">{r.stats?.loanAmount}</p>
                  <h3 className="mt-2 text-sm font-bold leading-snug text-navy-900 group-hover:text-brand-600">{r.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
                    Read case study <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center">
              <Link href="/case-studies" className="text-sm font-semibold text-brand-600 hover:underline">See all case studies</Link>
            </p>
          </div>
        </section>
      )}

      <CtaBanner
        title="Facing a Tight Deadline of Your Own?"
        text="Talk to an advisor today — most cases get an initial answer within hours."
      />
    </>
  )
}
