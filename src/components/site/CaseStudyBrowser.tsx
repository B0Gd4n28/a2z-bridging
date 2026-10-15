'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { ArrowUpRight, Clock, MapPin, Percent } from 'lucide-react'

export type CaseCard = {
  id: number | string
  slug: string
  title: string
  category: string
  categoryLabel: string
  amount?: string | null
  ltv?: string | null
  time?: string | null
  location?: string | null
  summary?: string | null
}

export const CaseStudyBrowser: React.FC<{ cases: CaseCard[]; categories: { value: string; label: string }[] }> = ({
  cases,
  categories,
}) => {
  const [active, setActive] = useState('all')
  const visible = useMemo(() => (active === 'all' ? cases : cases.filter((c) => c.category === active)), [cases, active])

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter case studies">
        {[{ value: 'all', label: 'All' }, ...categories].map((c) => {
          const count = c.value === 'all' ? cases.length : cases.filter((x) => x.category === c.value).length
          const on = active === c.value
          return (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c.value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                on
                  ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'border-navy-900/10 bg-white text-navy-900/70 hover:border-brand-400 hover:text-brand-700'
              }`}
            >
              {c.label} <span className={on ? 'text-white/70' : 'text-navy-900/40'}>({count})</span>
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((cs) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 pb-6 pt-14">
              <div className="hero-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <span className="absolute left-5 top-5 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white">
                {cs.categoryLabel}
              </span>
              <p className="relative font-serif text-3xl font-bold text-white">{cs.amount ?? '—'}</p>
              <p className="relative mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-400">Facility arranged</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-serif text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600">
                {cs.title}
              </h2>
              {cs.summary && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy-900/60">{cs.summary}</p>}
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-xs text-navy-900/60">
                {cs.location && (
                  <span className="inline-flex items-center gap-1"><MapPin size={13} className="text-brand-600" />{cs.location}</span>
                )}
                {cs.ltv && (
                  <span className="inline-flex items-center gap-1"><Percent size={13} className="text-brand-600" />{cs.ltv} LTV</span>
                )}
                {cs.time && (
                  <span className="inline-flex items-center gap-1"><Clock size={13} className="text-brand-600" />{cs.time}</span>
                )}
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-600">
                  Read <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
