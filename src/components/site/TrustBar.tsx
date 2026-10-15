import React from 'react'
import { SITE } from '@/lib/site'
import { LogoMarquee } from './LogoMarquee'
import { TrustBadges } from './TrustBadges'

export const TrustBar: React.FC = () => (
  <section className="border-b border-navy-100 bg-white py-14">
    <div className="container text-center">
      <p className="text-[11px] font-semibold uppercase tracking-normal text-navy-900/50 sm:tracking-[0.25em]">
        Our Lender Panel
      </p>
      <h2 className="mx-auto mt-3 max-w-2xl font-serif text-2xl font-bold text-navy-900 lg:text-3xl">
        Whole-of-Market Access To {SITE.lenderCount} Lenders
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-900/60">
        We are not tied to one lender. We compare banks, specialist funds and private lenders to find the right fit for your deal and your deadline.
      </p>
      <LogoMarquee className="mt-8" large twoRows />
      <TrustBadges className="mt-10" />
    </div>
  </section>
)
