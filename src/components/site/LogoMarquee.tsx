import Image from 'next/image'
import React from 'react'
import { SITE } from '@/lib/site'

type Lender = (typeof SITE.lenders)[number]

const Row: React.FC<{ items: Lender[]; large: boolean; reverse?: boolean }> = ({ items, large, reverse }) => {
  const doubled = [...items, ...items]
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className={`marquee-track items-center gap-4 py-2 sm:gap-5 ${reverse ? 'marquee-track--reverse' : ''}`}>
        {doubled.map((l, i) => {
          const hidden = i >= items.length
          return (
            <div
              key={`${l.name}-${i}`}
              aria-hidden={hidden}
              className={`flex shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md ${
                large ? 'h-24 w-56 px-6 sm:h-28 sm:w-64' : 'h-16 w-40 px-4 sm:w-44'
              }`}
            >
              {l.logo ? (
                <Image
                  src={l.logo}
                  alt={hidden ? '' : l.name}
                  width={188}
                  height={54}
                  className={`w-auto max-w-full object-contain ${large ? 'max-h-14' : 'max-h-10'}`}
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

export const LogoMarquee: React.FC<{ className?: string; large?: boolean; twoRows?: boolean }> = ({
  className = '',
  large = false,
  twoRows = false,
}) => {
  const half = Math.ceil(SITE.lenders.length / 2)
  const rotated = [...SITE.lenders.slice(half), ...SITE.lenders.slice(0, half)]
  return (
    <div className={`space-y-3 ${className}`} aria-label="Our lender panel">
      <Row items={SITE.lenders} large={large} />
      {twoRows && <Row items={rotated} large={large} reverse />}
    </div>
  )
}
