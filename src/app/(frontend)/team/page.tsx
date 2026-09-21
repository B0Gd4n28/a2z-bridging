import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { UserRound, Tag, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/site/Reveal'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Meet the Team — A Named Advisor on Every Case',
  description:
    'No call centres, no rotating queues — just experienced advisors who manage your case personally from first call to completion.',
  alternates: { canonical: '/team' },
}

const FALLBACK_TEAM = [
  { name: 'Zain Rashid', role: 'Senior Finance Advisor', bio: '8 years arranging bridging and development finance. Known for untangling complex, multi-property cases.', tags: ['Bridging', 'Development'] },
  { name: 'Ani Karapetyan', role: 'Bridging Specialist', bio: 'Specialises in fast-turnaround cases where two other lenders have already declined.', tags: ['Bridging', 'Chain Break'] },
  { name: 'Fatima Noor', role: 'Commercial Advisor', bio: 'Focused on commercial mortgages and business loans for owner-occupiers and investors.', tags: ['Commercial', 'Business Loans'] },
  { name: 'Syed Ahmed', role: 'Auction Finance Lead', bio: "Built A2Z's auction finance process around the 28-day completion deadline.", tags: ['Auction', 'Fast Completion'] },
  { name: 'Abbas Karimi', role: 'Buy-to-Let Specialist', bio: 'Works with individual landlords and portfolio investors across standard and specialist BTL.', tags: ['Buy-to-Let', 'Portfolio'] },
  { name: 'Priya Shah', role: 'Client Onboarding Lead', bio: 'Your first point of contact — matches every enquiry to the right specialist advisor.', tags: ['Onboarding', 'All Products'] },
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
        }))
      : FALLBACK_TEAM

  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Meet the Team"
            title="A Named Advisor on Every Case"
            text="No call centres, no rotating queues — just experienced advisors who manage your case personally from first call to completion."
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 100}>
                <div className="h-full overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-brand-400/60 via-brand-100 to-mist">
                    <UserRound size={56} strokeWidth={1.2} className="text-white/90 drop-shadow" aria-hidden="true" />
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
