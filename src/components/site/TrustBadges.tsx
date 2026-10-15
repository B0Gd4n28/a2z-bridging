import Image from 'next/image'
import React from 'react'
import { Award } from 'lucide-react'

/* Official brand marks supplied by the client (FCA, Trustpilot, Google). There is no NACFB logo file yet,
   so NACFB uses an icon badge — swap in /public/brands/nacfb.* when the real mark is provided. */

const Pill: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => (
  <li
    aria-label={label}
    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs font-medium text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md"
  >
    {children}
  </li>
)

export const TrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
    <Pill label="Authorised and regulated by the Financial Conduct Authority, FRN 808769">
      <Image src="/brands/fca.svg" alt="" width={61} height={20} unoptimized className="h-5 w-auto" />
      <span>Authorised · FRN 808769</span>
    </Pill>
    <Pill label="NACFB member">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
        <Award size={14} />
      </span>
      <span>NACFB Member</span>
    </Pill>
    <Pill label="Trustpilot rating 4.9, over 320 reviews">
      <Image src="/brands/trustpilot.svg" alt="" width={20} height={20} unoptimized className="h-5 w-5" />
      <span>
        <strong className="font-bold">Trustpilot</strong> · 4.9★ (320+ reviews)
      </span>
    </Pill>
    <Pill label="Google rating 4.9, over 180 reviews">
      <Image src="/brands/google.svg" alt="" width={20} height={20} unoptimized className="h-5 w-5" />
      <span>
        <strong className="font-bold">Google</strong> · 4.9★ (180+ reviews)
      </span>
    </Pill>
  </ul>
)
