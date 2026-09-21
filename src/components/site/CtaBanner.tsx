import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import React from 'react'

export const CtaBanner: React.FC<{
  title: string
  text?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}> = ({
  title,
  text,
  primaryLabel = 'Book a Free Consultation',
  primaryHref = '/contact',
  secondaryLabel = 'Request a Call Back',
  secondaryHref = '/contact#callback',
}) => (
  <section className="bg-white py-16 lg:py-20">
    <div className="container">
      <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-6 py-14 text-center text-white lg:px-16">
        <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-navy-700/50" aria-hidden="true" />
        <h2 className="relative font-serif text-2xl font-bold lg:text-3xl">{title}</h2>
        {text && <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/70 lg:text-base">{text}</p>}
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            {primaryLabel}
            <ArrowRight size={16} />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <PhoneCall size={15} />
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  </section>
)
