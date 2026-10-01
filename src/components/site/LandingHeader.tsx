'use client'

import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ScrollLink } from './ScrollLink'

/* Minimal conversion-focused header for standalone landing pages — no site navigation, no phone (keeps focus on the form). */
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
      className={`sticky top-0 z-50 bg-navy-900 transition-shadow ${scrolled ? 'shadow-lg' : ''}`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <span className="flex shrink-0 flex-col leading-[1.05] font-serif font-extrabold tracking-tight text-white">
          <span className="text-lg lg:text-xl">
            A2Z <span className="text-brand-500">|</span>
          </span>
          <span className="text-lg lg:text-xl">BRIDGING</span>
        </span>

        <ScrollLink
          targetId="enquiry-form"
          className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get Your Quote
          <ArrowRight size={14} />
        </ScrollLink>
      </div>
    </header>
  )
}
