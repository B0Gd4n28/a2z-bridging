'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  Clock,
  Facebook,
  Gavel,
  Instagram,
  KeyRound,
  Linkedin,
  Mail,
  PhoneCall,
  Store,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/site'

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  '/bridging-loans': ArrowLeftRight,
  '/buy-to-let-mortgages': KeyRound,
  '/development-loans': Building2,
  '/property-auction-finance': Gavel,
  '/commercial-mortgages': Store,
  '/guides': BookOpen,
}

const COMPANY_LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Loan Calculator', href: '/calculator', icon: Calculator },
  { label: 'Our Team', href: '/team', icon: Users },
  { label: 'Case Studies', href: '/case-studies', icon: Briefcase },
  { label: 'Contact', href: '/contact', icon: Mail },
]

const SOCIALS = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
]

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`flex items-center gap-1.5 font-serif text-lg font-extrabold tracking-tight text-navy-900 ${className}`}>
    <span>A2Z</span>
    <span className="text-brand-600">|</span>
    <span>BRIDGING</span>
  </span>
)

/* Slide-over menu rendered in a portal so no parent stacking context / overflow can break it. */
const MobileMenu: React.FC<{
  open: boolean
  onClose: () => void
  returnFocus: React.RefObject<HTMLButtonElement | null>
}> = ({ open, onClose, returnFocus }) => {
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const prevHtml = html.style.overflow
    const prevBody = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const returnTo = returnFocus.current
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevHtml
      document.body.style.overflow = prevBody
      returnTo?.focus()
    }
  }, [open, onClose, returnFocus])

  if (!mounted || !open) return null

  const linkCls = (active: boolean) =>
    `flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors ${
      active ? 'bg-brand-100 text-brand-700' : 'text-navy-900 hover:bg-mist'
    }`
  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`)

  return createPortal(
    <div className="fixed inset-0 z-[70] xl:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="menu-backdrop absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="menu-panel absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col bg-white shadow-2xl"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-navy-100 px-4">
          <Link href="/" onClick={onClose} aria-label="A2Z Bridging home" className="flex min-h-11 items-center">
            <Logo />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 text-navy-900 transition-colors hover:border-brand-500/50 hover:text-brand-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile navigation">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900/45">Finance</p>
          <ul>
            {NAV_LINKS.map((link) => {
              const Icon = PRODUCT_ICONS[link.href] ?? ArrowLeftRight
              return (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose} className={linkCls(isActive(link.href))}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-brand-600">
                      <Icon size={18} />
                    </span>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="px-3 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900/45">Company</p>
          <ul>
            {COMPANY_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} onClick={onClose} className={linkCls(isActive(href))}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-navy-700">
                    <Icon size={18} />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact widget */}
        <div className="shrink-0 border-t border-navy-100 bg-mist p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="rounded-2xl bg-navy-900 p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="pulse-ring relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-600">
                <PhoneCall size={19} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Speak to an advisor</p>
                <a href={SITE.phoneHref} className="block font-serif text-xl font-bold leading-tight hover:text-brand-400">
                  {SITE.phone}
                </a>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-white/60">
              <Clock size={13} className="shrink-0 text-brand-400" />
              Mon–Fri, 9:00–18:00 · named advisor, no call centre
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={SITE.phoneHref}
                className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold transition-colors hover:bg-brand-700"
              >
                <PhoneCall size={15} /> Call Now
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <CalendarCheck size={15} /> Consultation
              </Link>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <a href={`mailto:${SITE.email}`} className="flex min-h-9 items-center gap-2 truncate text-xs text-white/70 hover:text-white">
                <Mail size={14} className="shrink-0 text-brand-400" />
                {SITE.email}
              </a>
              <div className="flex gap-1.5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-brand-600 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export const SiteHeader: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // If the viewport grows to the desktop layout while the menu is open, close it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 80rem)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = React.useCallback(() => setOpen(false), [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-navy-100'}`}
    >
      <div className="container flex h-16 items-center justify-between gap-3 xl:h-[72px] xl:gap-4">
        <Link href="/" aria-label="A2Z Bridging home" className="flex min-h-11 shrink-0 items-center">
          <Logo className="xl:text-xl" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-600 ${
                pathname?.startsWith(link.href) ? 'text-brand-600' : 'text-navy-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE.phoneHref}
            aria-label="Call now"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-navy-100 text-navy-900 transition-colors hover:border-brand-500/50 hover:text-brand-600 md:w-auto md:gap-2 md:whitespace-nowrap md:px-4 md:text-sm md:font-semibold"
          >
            <PhoneCall size={16} />
            <span className="hidden md:inline">Call Now</span>
          </a>
          <Link
            href="/contact"
            className="btn-sheen hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex xl:px-5"
          >
            <CalendarCheck size={15} />
            <span className="xl:hidden 2xl:inline">Book a Free Consultation</span>
            <span className="hidden xl:inline 2xl:hidden">Free Consultation</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-mist xl:hidden"
          >
            <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
              <span className="block h-0.5 w-full rounded bg-current" />
              <span className="block h-0.5 w-3/4 self-end rounded bg-current" />
              <span className="block h-0.5 w-full rounded bg-current" />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={close} returnFocus={menuButtonRef} />
    </header>
  )
}
