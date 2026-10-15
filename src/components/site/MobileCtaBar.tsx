'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, PhoneCall } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SITE } from '@/lib/site'

/* Mobile-only sticky conversion bar. Appears after the hero, hides while the enquiry form is on screen.
   If the current page has no #enquiry-form it links to `fallbackHref`, or hides when none is given. */
export const MobileCtaBar: React.FC<{ fallbackHref?: string }> = ({ fallbackHref }) => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hasForm, setHasForm] = useState(false)
  const [formInView, setFormInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const form = document.getElementById('enquiry-form')
    setHasForm(Boolean(form))
    setFormInView(false)
    if (!form) return
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      threshold: 0.15,
    })
    io.observe(form)
    return () => io.disconnect()
  }, [pathname])

  if (!hasForm && !fallbackHref) return null

  const visible = scrolled && !formInView
  const btn =
    'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors'

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-3 pt-3 shadow-[0_-8px_24px_rgba(13,20,46,0.12)] backdrop-blur transition-transform duration-300 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      role="region"
      aria-label="Quick actions"
      aria-hidden={!visible}
    >
      <div className="flex gap-3">
        <a
          href={SITE.phoneHref}
          tabIndex={visible ? 0 : -1}
          className={`${btn} border border-navy-100 bg-white text-navy-900 hover:border-brand-500/50`}
        >
          <PhoneCall size={16} className="text-brand-600" />
          Call Now
        </a>
        {hasForm ? (
          <a
            href="#enquiry-form"
            tabIndex={visible ? 0 : -1}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`${btn} pulse-ring bg-brand-600 text-white hover:bg-brand-700`}
          >
            Get Your Quote
            <ArrowRight size={16} />
          </a>
        ) : (
          <Link
            href={fallbackHref!}
            tabIndex={visible ? 0 : -1}
            className={`${btn} pulse-ring bg-brand-600 text-white hover:bg-brand-700`}
          >
            Get Your Quote
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  )
}
