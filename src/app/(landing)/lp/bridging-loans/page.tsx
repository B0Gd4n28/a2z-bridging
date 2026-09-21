import type { Metadata } from 'next'
import { Link2Off, Gavel, Hammer, type LucideIcon } from 'lucide-react'
import { CampaignLanding } from '@/components/site/CampaignLanding'

export const metadata: Metadata = {
  title: { absolute: 'Bridging Loans — Terms the Same Day | A2Z Bridging' },
  description:
    'Whole-of-market bridging loans from £50k to £10m, up to 75% LTV. Instant cost estimate, decision in 24 hours, named advisor on every case. FCA authorised — FRN 808769.',
  alternates: { canonical: '/lp/bridging-loans' },
}

const INFO_ITEMS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Link2Off,
    title: 'Chain Breaks & Fast Purchases',
    text: 'Buy your next property before the current one sells. A bridging loan covers the gap so you never lose the home you want to a slow chain.',
  },
  {
    icon: Gavel,
    title: 'Auction Deadlines',
    text: "Won at auction? You have 28 days to complete or lose your deposit. Bridging finance is built for exactly this. Our fastest case completed in 48 hours.",
  },
  {
    icon: Hammer,
    title: 'Refurbishment & Capital Raise',
    text: 'Fund a light refurb before refinancing onto a term mortgage, or raise quick capital against property for a business opportunity.',
  },
]

export default function BridgingLandingPage() {
  return (
    <CampaignLanding
      eyebrow="Whole-of-Market Bridging Finance"
      titlePre="Bridging Finance"
      titleHighlight="Without"
      titlePost="the Wait"
      heroText="Complete a purchase, cover a chain break, or beat an auction deadline — with a whole-of-market panel and a named advisor who gets you a decision in hours, not weeks."
      stats={[
        { value: '£50k–£10m', label: 'Loan range' },
        { value: 'Up to 75%', label: 'Loan-to-value' },
        { value: '24hrs', label: 'Average decision time' },
        { value: '4.9/5', label: 'Client review score' },
      ]}
      infoEyebrow="What Is a Bridging Loan?"
      infoTitle="Short-Term Finance, Built for Speed"
      infoText="A bridging loan is short-term finance secured against property, designed to bridge a gap. It is priced monthly (typically 0.55%–1.05%), completed in days rather than weeks, and repaid through a sale or refinance."
      infoItems={INFO_ITEMS}
      calculatorTitle="Start Your Bridging Enquiry"
      calculatorText="Three short steps — tell us the amount, see your indicative estimate, and a named advisor calls you back the same day."
      product="Bridging Loan"
      minAmount={50_000}
      variants={[{ label: 'Bridging Loan', rate: 0.0085 }]}
      formSource="lp-bridging-loans"
      ctaTitle="Ready to Bridge the Gap?"
      ctaText="Talk to a named bridging advisor today — most cases get an initial answer within hours."
    />
  )
}
