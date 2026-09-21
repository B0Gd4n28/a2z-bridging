import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import React from 'react'
import { ScrollLink } from './ScrollLink'

type Cta = { label: string; href: string }

export const Hero: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  text?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  children?: React.ReactNode
}> = ({ eyebrow, title, text, primaryCta, secondaryCta, children }) => {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* decorative layers */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-float-slow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-navy-700/40 blur-[1px]" aria-hidden="true" />
      <div className="animate-float-slower pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-brand-600/10" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/70 backdrop-blur sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl font-bold leading-tight lg:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">{text}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                primaryCta.href.startsWith('#') ? (
                  <ScrollLink
                    targetId={primaryCta.href.slice(1)}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    {primaryCta.label}
                    <ArrowRight size={16} />
                  </ScrollLink>
                ) : (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    {primaryCta.label}
                    <ArrowRight size={16} />
                  </Link>
                )
              )}
              {secondaryCta && (
                secondaryCta.href.startsWith('#') ? (
                  <ScrollLink
                    targetId={secondaryCta.href.slice(1)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                  >
                    <PhoneCall size={15} />
                    {secondaryCta.label}
                  </ScrollLink>
                ) : (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                  >
                    <PhoneCall size={15} />
                    {secondaryCta.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
