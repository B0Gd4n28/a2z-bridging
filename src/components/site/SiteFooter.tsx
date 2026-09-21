import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Clock,
} from 'lucide-react'
import { FOOTER_COMPANY, FOOTER_PRODUCTS, SITE } from '@/lib/site'

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.1 20.14a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.14-.14z" />
  </svg>
)

const SOCIALS = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { label: 'TikTok', href: SITE.social.tiktok, Icon: TikTokIcon },
  { label: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
  { label: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
]

export const SiteFooter: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="container relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2.5 font-serif text-lg font-bold">
            <Image src="/a2z-logo.jpg" alt="A2Z Bridging logo" width={34} height={34} className="rounded-md ring-1 ring-white/20" />
            <span>
              A2Z <span className="text-brand-500">Bridging</span>
            </span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Whole-of-market bridging and commercial finance, with a named advisor on every case.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/70">
            <ShieldCheck size={14} className="text-brand-400" />
            FCA Authorised · FRN {SITE.fcaNumber}
          </div>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-600 hover:text-white"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Products</p>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_PRODUCTS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white">
                  <ArrowRight size={12} className="text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Company</p>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white">
                  <ArrowRight size={12} className="text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Get in Touch</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
                <Mail size={15} className="shrink-0 text-brand-400" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
                <Phone size={15} className="shrink-0 text-brand-400" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.phone2Href} className="inline-flex items-center gap-2.5 hover:text-white">
                <Phone size={15} className="shrink-0 text-brand-400" />
                {SITE.phone2}
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-white/55">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-400" />
              {SITE.address}
            </li>
            <li className="inline-flex items-center gap-2.5 text-white/55">
              <Clock size={15} className="shrink-0 text-brand-400" />
              Mon–Fri, 9:00–18:00
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container py-6">
          <p className="text-xs leading-relaxed text-white/45">{SITE.disclaimer}</p>
          <p className="mt-3 text-xs text-white/45">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
