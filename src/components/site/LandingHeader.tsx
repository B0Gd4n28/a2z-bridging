'use client'

import { ArrowRight, PhoneCall } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ScrollLink } from './ScrollLink'
import { SITE } from '@/lib/site'

/* Minimal conversion-focused header for standalone landing pages — no site navigation. */
export const LandingHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-navy-100'}`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <span className="flex shrink-0 items-baseline gap-1.5 font-serif text-lg font-extrabold tracking-tight text-navy-900 lg:text-xl">
          <span>A2Z</span>
          <span className="text-brand-600">|</span>
          <span>BRIDGING</span>
        </span>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-md border border-navy-100 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-500/50 hover:text-brand-600 sm:inline-flex"
          >
            <PhoneCall size={14} />
            Call Now
          </a>
          <ScrollLink
            targetId="enquiry-form"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get Your Quote
            <ArrowRight size={14} />
          </ScrollLink>
        </div>
      </div>
    </header>
  )
}
