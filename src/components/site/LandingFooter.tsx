import Image from 'next/image'
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import React from 'react'
import { SITE } from '@/lib/site'

/* Minimal legal footer for standalone landing pages — no site navigation. */
export const LandingFooter: React.FC = () => (
  <footer className="bg-navy-900 text-white">
    <div className="container flex flex-wrap items-start justify-between gap-8 py-12">
      <div>
        <p className="flex items-center gap-2.5 font-serif text-lg font-bold">
          <Image src="/a2z-logo.jpg" alt="" width={30} height={30} className="rounded-md ring-1 ring-white/20" />
          <span>
            A2Z <span className="text-brand-500">Bridging</span>
          </span>
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/70">
          <ShieldCheck size={14} className="text-brand-400" />
          FCA Authorised · FRN {SITE.fcaNumber}
        </p>
      </div>

      <ul className="space-y-3 text-sm text-white/75">
        <li>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
            <Phone size={15} className="shrink-0 text-brand-400" />
            {SITE.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2.5 hover:text-white">
            <Mail size={15} className="shrink-0 text-brand-400" />
            {SITE.email}
          </a>
        </li>
        <li className="inline-flex items-start gap-2.5 text-white/55">
          <MapPin size={15} className="mt-0.5 shrink-0 text-brand-400" />
          {SITE.address}
        </li>
      </ul>
    </div>

    <div className="border-t border-white/10">
      <div className="container py-6">
        <p className="text-xs leading-relaxed text-white/45">{SITE.disclaimer}</p>
        <p className="mt-3 text-xs text-white/45">
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
