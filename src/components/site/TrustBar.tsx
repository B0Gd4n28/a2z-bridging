import React from 'react'
import { SITE } from '@/lib/site'
import { LogoMarquee } from './LogoMarquee'
import { TrustBadges } from './TrustBadges'

export const TrustBar: React.FC = () => (
  <section className="border-b border-navy-100 bg-white py-10">
    <div className="container text-center">
      <p className="text-[11px] font-semibold uppercase tracking-normal text-navy-900/50 sm:tracking-[0.25em]">
        Whole-of-Market Access To {SITE.lenderCount} Lenders
      </p>
      <LogoMarquee className="mt-6" />
      <TrustBadges className="mt-8" />
    </div>
  </section>
)
