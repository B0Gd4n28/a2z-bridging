import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { UserRound, Tag, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/site/Reveal'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Bridging Finance Specialists — Meet the Team | A2Z Bridging',
  description:
    "We're a London team of credit brokers with the energy of a start-up and the lending experience of a high-street bank. No call centre, no rotating queues.",
  alternates: { canonical: '/team' },
}

const FALLBACK_TEAM = [
  { name: 'Syed Abbas', role: 'CEO', bio: 'Leads A2Z Bridging and oversees every case from first call to completion.', tags: ['Leadership'] },
  { name: 'Jimeet Kakar', role: 'Partner', bio: 'Works across bridging, development and commercial finance deals.', tags: ['Bridging', 'Commercial'] },
  { name: 'Ani Sheikh', role: 'Sales Director', bio: 'Leads the advisory team and manages key lender relationships.', tags: ['Bridging', 'Lender Relations'] },
  { name: 'Zain Abbas', role: 'Director of Business Development', bio: 'Builds new partnerships and manages complex, multi-property cases.', tags: ['Business Development'] },
  { name: 'Tanveer Kakar', role: 'Business Development Manager', bio: 'Works with brokers and introducers to structure the right finance for each deal.', tags: ['Business Development'] },
  { name: 'Aima Hasan', role: 'Case Manager', bio: 'Manages cases from application through to completion.', tags: ['Case Management'] },
  { name: 'Abdullah Mansoor', role: 'Case Manager', bio: 'Manages cases from application through to completion.', tags: ['Case Management'] },
]

async function getTeam() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({ collection: 'team-members', limit: 24, sort: 'order' })
    return docs
  } catch {
    return []
  }
}

export default async function TeamPage() {
  const cmsTeam = await getTeam()
  const team =
    cmsTeam.length > 0
      ? cmsTeam.map((m) => ({
          name: m.name,
          role: m.role,
          bio: m.bio ?? '',
          tags: (m.tags ?? []).map((t) => t.tag),
          photoUrl:
            m.photo && typeof m.photo === 'object' && m.photo.url
              ? getMediaUrl(m.photo.url)
              : null,
        }))
      : FALLBACK_TEAM.map((m) => ({ ...m, photoUrl: null as string | null }))

  return (
    <>
      <section className="bg-white py-20 lg:py-24">
        <div className="container">
          <SectionHeading
            as="h1"
            eyebrow="About A2Z Bridging"
            title="Bridging Finance Specialists — Meet the Team"
            text="We're a London team of credit brokers with the energy of a start-up and the lending experience of a high-street bank. No call centre, no rotating queues — your advisor manages your case personally from first call to completion."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 100}>
                <div className="h-full overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-400/60 via-brand-100 to-mist">
                    {m.photoUrl ? (
                      <Image
                        src={m.photoUrl}
                        alt={m.name}
                        width={352}
                        height={176}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={56} strokeWidth={1.2} className="text-white/90 drop-shadow" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-lg font-bold text-navy-900">{m.name}</h2>
                    <p className="text-sm font-semibold text-brand-600">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-900/60">{m.bio}</p>
                    {m.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {m.tags.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs font-medium text-navy-900/70">
                            <Tag size={10} className="text-brand-600" />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-navy-900 px-8 py-10 text-white">
            <div>
              <h2 className="font-serif text-2xl font-bold">Not Sure Who to Speak To?</h2>
              <p className="mt-2 max-w-md text-sm text-white/70">
                Tell us what you need and we&apos;ll match you with the right advisor within one
                business hour.
              </p>
            </div>
            <Link
              href="/contact#callback"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Request a Call Back
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
