import React from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { Hero } from './Hero'
import { StatsBar } from './StatsBar'
import { ProcessSteps } from './ProcessSteps'
import { FaqAccordion } from './FaqAccordion'
import { CtaBanner } from './CtaBanner'
import { SectionHeading } from './SectionHeading'

export const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Hero
        eyebrow={product.eyebrow}
        title={product.heroTitle}
        text={product.heroText}
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact' }}
        secondaryCta={{ label: 'Request a Call Back', href: '/contact#callback' }}
      />

      <StatsBar stats={product.stats} />

      <ProcessSteps title="From Enquiry to Completion in Four Steps" steps={product.steps} />

      {product.rates && (
        <section className="bg-white py-16 lg:py-24">
          <div className="container">
            <SectionHeading eyebrow="Indicative Pricing" title="Typical Rates & Terms" />
            <div className="mx-auto mt-10 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="rounded-l-md px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Loan Type</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Typical Rate (PCM)</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Max LTV</th>
                    <th className="rounded-r-md px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Term</th>
                  </tr>
                </thead>
                <tbody>
                  {product.rates.map((r, i) => (
                    <tr key={r.type} className={i % 2 === 0 ? 'bg-mist' : 'bg-white'}>
                      <td className="px-5 py-4 font-medium text-navy-900">{r.type}</td>
                      <td className="px-5 py-4 text-navy-900/70">{r.rate}</td>
                      <td className="px-5 py-4 text-navy-900/70">{r.ltv}</td>
                      <td className="px-5 py-4 text-navy-900/70">{r.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-navy-900/50">
                Rates shown are indicative and vary by lender, LTV, and case complexity. Confirm exact
                pricing with an advisor or the loan calculator.
              </p>
            </div>

            <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-between gap-6 rounded-2xl bg-navy-900 px-8 py-8 text-white">
              <div>
                <p className="font-serif text-lg font-bold">Want your exact number?</p>
                <p className="mt-1 text-sm text-white/65">
                  Use the interactive calculator to get an instant, indicative cost estimate for your specific case.
                </p>
              </div>
              <Link
                href="/calculator"
                className="rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold transition-colors hover:bg-brand-700"
              >
                Get Your Quote →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-mist py-16 lg:py-24">
        <div className="container">
          <SectionHeading eyebrow="Common Questions" title={`${product.title} FAQ`} />
          <div className="mt-10">
            <FaqAccordion faqs={product.faqs} />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Move Faster?"
        text="Speak to a named advisor today, or get an instant estimate with the calculator."
      />
    </>
  )
}
