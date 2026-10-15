import Image from 'next/image'
import React from 'react'
import { SITE } from '@/lib/site'

export const LogoMarquee: React.FC<{ className?: string }> = ({ className = '' }) => {
  const doubled = [...SITE.lenders, ...SITE.lenders]
  return (
    <div
      className={`marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] ${className}`}
      aria-label="Our lender panel"
    >
      <div className="marquee-track items-center gap-4 py-2 sm:gap-5">
        {doubled.map((l, i) => {
          const hidden = i >= SITE.lenders.length
          return (
            <div
              key={`${l.name}-${i}`}
              aria-hidden={hidden}
              className="flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-white px-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md sm:w-44"
            >
              {l.logo ? (
                <Image
                  src={l.logo}
                  alt={hidden ? '' : l.name}
                  width={188}
                  height={54}
                  className="max-h-10 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="whitespace-nowrap font-serif text-sm font-bold text-navy-800">{l.name}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
