'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, CalendarCheck, PhoneCall } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/site'

export const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-navy-100'}`}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link href="/" className="flex shrink-0 items-baseline gap-1.5 font-serif text-lg font-extrabold tracking-tight text-navy-900 lg:text-xl">
          <span>A2Z</span>
          <span className="text-brand-600">|</span>
          <span>BRIDGING</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                pathname?.startsWith(link.href) ? 'text-brand-600' : 'text-navy-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-md border border-navy-100 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-500/50 hover:text-brand-600 md:inline-flex"
          >
            <PhoneCall size={15} />
            Call Now
          </a>
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            <CalendarCheck size={15} />
            Book a Free Consultation
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-navy-950/40 lg:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-navy-100 bg-white px-4 pb-6 pt-2 shadow-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-navy-100/60 py-3 text-base font-medium text-navy-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              <CalendarCheck size={15} />
              Book a Free Consultation
            </Link>
            <a
              href={SITE.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-md border border-navy-100 px-5 py-3 text-center text-sm font-semibold text-navy-900"
            >
              <PhoneCall size={15} />
              Call Now
            </a>
          </nav>
        </>
      )}
    </header>
  )
}
