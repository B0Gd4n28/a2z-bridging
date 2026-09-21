import Image from 'next/image'
import React from 'react'
import { SITE } from '@/lib/site'

export const LogoMarquee: React.FC<{ className?: string }> = ({ className = '' }) => {
  const doubled = [...SITE.lenders, ...SITE.lenders]
  return (
    <div className={`marquee overflow-hidden ${className}`} aria-label="Our lender panel">
      <div className="marquee-track items-center gap-10">
        {doubled.map((l, i) =>
          l.logo ? (
            <Image
              key={`${l.name}-${i}`}
              src={l.logo}
              alt={i < SITE.lenders.length ? l.name : ''}
              aria-hidden={i >= SITE.lenders.length}
              width={120}
              height={40}
              className="h-9 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span
              key={`${l.name}-${i}`}
              aria-hidden={i >= SITE.lenders.length}
              className="whitespace-nowrap font-serif text-base font-bold text-navy-800/50 transition hover:text-navy-800"
            >
              {l.name}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
