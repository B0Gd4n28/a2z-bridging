'use client'

import Image from 'next/image'
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
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-navy-100'}`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <span className="flex shrink-0 items-center gap-2.5 font-serif text-xl font-bold text-navy-900">
          <Image src="/a2z-logo.jpg" alt="A2Z Bridging" width={34} height={34} className="rounded-md" priority />
          <span>
            A2Z <span className="text-brand-600">Bridging</span>
          </span>
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
