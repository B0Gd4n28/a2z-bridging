'use client'

import Link from 'next/link'
import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, MapPin, Percent } from 'lucide-react'
import type { CaseCard } from './CaseStudyBrowser'

export const CaseStudyCarousel: React.FC<{ cases: CaseCard[] }> = ({ cases }) => {
  const track = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((cs) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.slug}`}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:w-[340px]"
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
              <h3 className="line-clamp-3 font-serif text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600">
                {cs.title}
              </h3>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-xs text-navy-900/60">
                {cs.location && <span className="inline-flex items-center gap-1"><MapPin size={13} className="text-brand-600" />{cs.location}</span>}
                {cs.ltv && <span className="inline-flex items-center gap-1"><Percent size={13} className="text-brand-600" />{cs.ltv} LTV</span>}
                {cs.time && <span className="inline-flex items-center gap-1"><Clock size={13} className="text-brand-600" />{cs.time}</span>}
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-600">
                  Read <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous case studies"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next case studies"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
