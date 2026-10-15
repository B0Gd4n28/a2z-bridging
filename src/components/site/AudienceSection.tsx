import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { SceneAuction, SceneCrane, SceneHouse, SceneShop } from './Illustrations'

const AUDIENCES = [
  {
    Scene: SceneHouse,
    title: 'Landlords & Investors',
    text: 'Buy-to-let and portfolio finance for individuals, limited companies and SPVs.',
    href: '/buy-to-let-mortgages',
  },
  {
    Scene: SceneCrane,
    title: 'Developers',
    text: 'Ground-up and refurbishment funding, drawn in stages as your build progresses.',
    href: '/development-loans',
  },
  {
    Scene: SceneAuction,
    title: 'Auction Buyers',
    text: 'Fast bridging finance so you can complete inside the 28-day auction deadline.',
    href: '/property-auction-finance',
  },
  {
    Scene: SceneShop,
    title: 'Business Owners',
    text: 'Commercial mortgages and business loans for premises, expansion and working capital.',
    href: '/commercial-mortgages',
  },
]

export const AudienceSection: React.FC = () => (
  <section className="bg-mist py-20 lg:py-28">
    <div className="container">
      <Reveal>
        <SectionHeading
          eyebrow="Who We Help"
          title="Built for People Who Move on Property"
          text="Whatever the deal, you get a named advisor and a whole-of-market search — not a one-size-fits-all product."
        />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCES.map(({ Scene, title, text, href }, i) => (
          <Reveal key={title} delay={i * 100}>
            <Link
              href={href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl"
            >
              <div className="aspect-[8/5] overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                  <Scene />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/60">{text}</p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Explore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
