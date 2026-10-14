'use client'

import { ArrowRight, PhoneCall } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ScrollLink } from './ScrollLink'
import { SITE } from '@/lib/site'

/* Minimal conversion-focused header for standalone landing pages — no site navigation. */
export const LandingHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const hasForm = !usePathname()?.endsWith('/thank-you')

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
            aria-label="Call now"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-navy-100 text-navy-900 transition-colors hover:border-brand-500/50 hover:text-brand-600 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:font-semibold"
          >
            <PhoneCall size={16} />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          {hasForm && (
            <ScrollLink
              targetId="enquiry-form"
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:px-5"
            >
              <span className="sm:hidden">Get Quote</span>
              <span className="hidden sm:inline">Get Your Quote</span>
              <ArrowRight size={14} />
            </ScrollLink>
          )}
        </div>
      </div>
    </header>
  )
}
