import type { Metadata } from 'next'
import { Store, Building2, Percent, type LucideIcon } from 'lucide-react'
import { CampaignLanding } from '@/components/site/CampaignLanding'
import { ZohoLeadForm } from '@/components/site/ZohoLeadForm'

export const metadata: Metadata = {
  title: { absolute: 'Commercial Finance & Mortgages — Fast Decisions | A2Z Bridging' },
  description:
    'Whole-of-market commercial mortgages and loans from £25k to £20m. Offices, retail, industrial and semi-commercial. Instant estimate, named advisor, FCA authorised — FRN 808769.',
  alternates: { canonical: '/lp/commercial-loans' },
}

const INFO_ITEMS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Store,
    title: 'Owner-Occupiers',
    text: 'Stop renting your premises — buy the office, shop, or unit your business trades from, with terms structured around your accounts.',
  },
  {
    icon: Building2,
    title: 'Commercial Investors',
    text: 'Purchase or refinance tenanted commercial property — offices, retail, industrial, and semi-commercial assets like shops with flats above.',
  },
  {
    icon: Percent,
    title: 'Whole-of-Market Rates',
    text: 'High-street banks and specialist lenders compared on rate, term, and covenants — typically 25%–40% deposit depending on the asset.',
  },
]

export default function CommercialLandingPage() {
  return (
    <CampaignLanding
      eyebrow="Whole-of-Market Commercial Finance"
      titlePre="Commercial Finance"
      titleHighlight="Built"
      titlePost="Around Your Business"
      heroText="Buy your premises, refinance an investment property, or raise capital against commercial assets — with high-street and specialist lenders compared by one named advisor."
      stats={[
        { value: '£25k–£20m', label: 'Loan range' },
        { value: 'Up to 75%', label: 'Loan-to-value' },
        { value: '5–30 years', label: 'Term length' },
        { value: '48hrs', label: 'Typical decision' },
      ]}
      infoEyebrow="Commercial Finance, Explained"
      infoTitle="Long-Term Finance for Commercial Property"
      infoText="Commercial mortgages fund owner-occupied premises and investment property alike — from offices and retail to industrial and mixed-use — with terms from 5 to 30 years."
      infoItems={INFO_ITEMS}
      calculatorTitle="Start Your Commercial Enquiry"
      calculatorText="Run the numbers, then send us your details — both live on this page. Our commercial team calls you back the same day."
      product="Commercial Finance"
      minAmount={25_000}
      variants={[
        { label: 'Owner-occupied', rate: 0.0065 },
        { label: 'Investment', rate: 0.0075 },
        { label: 'Semi-commercial', rate: 0.007 },
      ]}
      formSource="lp-commercial-loans"
      ctaTitle="Ready to Talk Commercial?"
      ctaText="Speak to a commercial finance advisor today — owner-occupied, investment, and semi-commercial all covered."
      leadForm={
        <ZohoLeadForm
          formName="WebToLeads268536000003406008"
          xnQsjsdp="3e774c730f9afc0bfa6bc261ec30700977989d8c6983accca5e03118018e130a"
          xmIwtLD="197cb56e2a729bb7f9a0b9cb5714efa30f031aeaa5589a2b6de470cb2c4064cf05a656b68b169d78d2c51e3187928a55"
          descriptionLabel="Tell us about your commercial loan"
        />
      }
    />
  )
}
