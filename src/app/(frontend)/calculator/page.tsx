import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator } from '@/components/site/Calculator'
import { LeadForm } from '@/components/site/LeadForm'

export const metadata: Metadata = {
  title: 'Bridging Loan Calculator — Instant Indicative Estimate',
  description:
    'Get an instant, indicative estimate of your bridging loan cost. Loan amount, LTV, term and loan type — no forms, no waiting.',
  alternates: { canonical: '/calculator' },
}

const RELATED = [
  { title: 'What Is a Bridging Loan?', href: '/guides' },
  { title: 'Bridging vs. Remortgage', href: '/guides' },
  { title: 'Bridging Loan Glossary', href: '/guides' },
]

export default function CalculatorPage() {
  return (
    <div className="bg-mist">
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Interactive Tool
            </p>
            <h1 className="font-serif text-4xl font-bold text-navy-900 lg:text-5xl">
              Bridging Loan Calculator
            </h1>
            <p className="mt-4 text-navy-900/60">
              Enter your details for an instant, indicative estimate of your bridging loan cost — no
              forms, no waiting.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <Calculator full />
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            <LeadForm source="calculator" />
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <h2 className="font-serif text-lg font-bold text-navy-900">Related Guides</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {RELATED.map((r) => (
                <Link
                  key={r.title}
                  href={r.href}
                  className="rounded-lg bg-white px-5 py-4 text-sm font-bold text-navy-900 shadow-sm transition-colors hover:text-brand-600"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
