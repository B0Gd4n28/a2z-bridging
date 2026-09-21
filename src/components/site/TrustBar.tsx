import React from 'react'
import { ShieldCheck, Award, Star } from 'lucide-react'
import { SITE } from '@/lib/site'
import { LogoMarquee } from './LogoMarquee'

const BADGE_ICONS = [ShieldCheck, Award, Star, Star]

export const TrustBar: React.FC = () => (
  <section className="border-b border-navy-100 bg-white py-8">
    <div className="container text-center">
      <p className="text-[11px] font-semibold uppercase tracking-normal text-navy-900/50 sm:tracking-[0.25em]">
        Whole-of-Market Access To {SITE.lenderCount} Lenders
      </p>
      <LogoMarquee className="mt-6" />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {SITE.trustBadges.map((b, i) => {
          const Icon = BADGE_ICONS[i % BADGE_ICONS.length]
          return (
            <span
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-mist px-4 py-1.5 text-xs font-medium text-navy-900"
            >
              <Icon size={13} className="text-brand-600" />
              {b}
            </span>
          )
        })}
      </div>
    </div>
  </section>
)
