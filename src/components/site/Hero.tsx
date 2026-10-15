import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import React from 'react'
import { ScrollLink } from './ScrollLink'
import { HeroVisual, Skyline } from './HeroVisual'

type Cta = { label: string; href: string }

export const Hero: React.FC<{
  eyebrow?: string
  title: React.ReactNode
  text?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  visualExample?: string
  children?: React.ReactNode
}> = ({ eyebrow, title, text, primaryCta, secondaryCta, visualExample, children }) => {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* decorative layers */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-float-slow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-navy-700/40 blur-[1px]" aria-hidden="true" />
      <div className="animate-float-slower pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-brand-600/10" aria-hidden="true" />
      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-80 sm:h-32 lg:h-44" />
      <div className="container relative pb-28 pt-16 sm:pb-32 lg:pb-40 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="anim-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/70 backdrop-blur sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h1 className="anim-fade-up anim-d1 font-serif text-4xl font-bold leading-tight lg:text-5xl">{title}</h1>
          {text && <p className="anim-fade-up anim-d2 mt-5 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">{text}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="anim-fade-up anim-d3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 [&>a]:w-full [&>a]:justify-center sm:[&>a]:w-auto">
              {primaryCta && (
                primaryCta.href.startsWith('#') ? (
                  <ScrollLink
                    targetId={primaryCta.href.slice(1)}
                    className="btn-sheen inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
                  >
                    {primaryCta.label}
                    <ArrowRight size={16} />
                  </ScrollLink>
                ) : (
                  <Link
                    href={primaryCta.href}
                    className="btn-sheen inline-flex min-h-12 items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
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
                ) : secondaryCta.href.startsWith('tel:') || secondaryCta.href.startsWith('mailto:') ? (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                  >
                    <PhoneCall size={15} />
                    {secondaryCta.label}
                  </a>
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
        <HeroVisual example={visualExample} />
        </div>
        {children}
      </div>
    </section>
  )
}
