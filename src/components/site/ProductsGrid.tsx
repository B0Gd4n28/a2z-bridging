import Link from 'next/link'
import React from 'react'
import {
  ArrowLeftRight,
  KeyRound,
  Building2,
  Gavel,
  Store,
  Briefcase,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

const ICONS: Record<string, LucideIcon> = {
  'bridging-loans': ArrowLeftRight,
  'buy-to-let-mortgages': KeyRound,
  'development-loans': Building2,
  'property-auction-finance': Gavel,
  'commercial-mortgages': Store,
  'business-loans': Briefcase,
}

export const ProductsGrid: React.FC = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="container">
      <Reveal>
        <SectionHeading eyebrow="Finance, From A to Z" title="Six Ways We Help You Move Faster" />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => {
          const Icon = ICONS[p.slug] ?? Briefcase
          return (
            <Reveal key={p.slug} delay={(i % 3) * 100}>
              <Link
                href={`/${p.slug}`}
                className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-mist text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-navy-900 group-hover:text-brand-600">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/60">{p.cardText}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)
