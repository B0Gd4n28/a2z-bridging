import Link from 'next/link'
import React from 'react'
import { ArrowRight, Gavel, LifeBuoy, Percent, ReceiptText, ScanSearch, Layers, type LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const SITUATIONS: { Icon: LucideIcon; title: string; text: string; href: string }[] = [
  {
    Icon: Gavel,
    title: 'You won a lot at auction',
    text: 'The 28-day clock is running. See how an auction purchase in Canary Wharf was funded and completed.',
    href: '/case-studies/auction-bridging-loan-canary-wharf',
  },
  {
    Icon: Percent,
    title: 'Buying below market value',
    text: 'A £390k purchase funded at 100% of the price against a £560k valuation, completed in 7 days.',
    href: '/case-studies/bridging-loan-northwood-7-days',
  },
  {
    Icon: LifeBuoy,
    title: 'Time-critical rescue finance',
    text: 'Receivership looming? See how £550,000 was arranged to protect a property.',
    href: '/case-studies/rescue-bridging-finance-receivership',
  },
  {
    Icon: ReceiptText,
    title: 'VAT on a commercial purchase',
    text: 'A commercial mortgage plus a VAT loan, both landing on the same completion day.',
    href: '/case-studies/commercial-mortgage-vat-loan-ilford',
  },
  {
    Icon: Layers,
    title: 'Releasing equity with a second charge',
    text: 'Short-term funding secured behind an existing mortgage. See a real second charge bridging loan.',
    href: '/case-studies/second-charge-bridging-loan-london',
  },
  {
    Icon: ScanSearch,
    title: 'No time for a full valuation',
    text: 'An AVM bridging loan completed without a physical valuation.',
    href: '/case-studies/avm-bridging-loan-ryde',
  },
]

export const SituationsSection: React.FC = () => (
  <section className="bg-white py-20 lg:py-28">
    <div className="container">
      <Reveal>
        <SectionHeading
          eyebrow="Real Situations"
          title="Which of These Sounds Like Your Deal?"
          text="Every scenario below is a real A2Z case study, with the numbers and the timeline."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SITUATIONS.map(({ Icon, title, text, href }, i) => (
          <Reveal key={title} delay={(i % 3) * 100}>
            <Link
              href={href}
              className="group flex h-full gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-serif text-base font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/60">{text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  See the case <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export const HOME_FAQS = [
  {
    q: 'What is a bridging loan?',
    a: 'A bridging loan is short-term, property-secured finance used to move quickly: buying at auction, breaking a chain, funding a refurbishment, or covering the gap until a sale or refinance completes. Terms are typically measured in months, not years.',
  },
  {
    q: 'How fast can a bridging loan complete?',
    a: 'Straightforward cases can complete in as little as 5–7 working days from a full application; more complex cases typically take 2–3 weeks. Speed depends on valuation, legal work and how quickly documents are provided.',
  },
  {
    q: 'Do I need an exit strategy?',
    a: 'Yes. Lenders require a clear, credible way to repay the loan, typically a property sale or a refinance onto a longer-term mortgage. Your advisor will help you present it in the strongest way.',
  },
  {
    q: 'Can you fund a property that a high-street bank would decline?',
    a: 'Often, yes. Bridging lenders regularly fund properties that mainstream lenders decline, for example with no kitchen or bathroom, structural issues or mixed use, because they lend against the property and the exit rather than a standard mortgage checklist.',
  },
  {
    q: 'Does it cost anything to get a quote?',
    a: 'Getting an indicative quote is free and carries no obligation. We will tell you about any fees, and the commission we may receive from the lender, before you decide to proceed.',
  },
  {
    q: 'Are you a lender?',
    a: 'No. A2Z Bridging Ltd is a credit broker authorised and regulated by the Financial Conduct Authority (FRN 808769). We compare lenders on your behalf and introduce you to the one that fits your deal.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'We arrange finance for property across the UK. Our case studies include deals in London, the Midlands, the North East, Berkshire, Kent and the Isle of Wight.',
  },
]
