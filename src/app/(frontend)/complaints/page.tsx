import type { Metadata } from 'next'
import { LegalDocument } from '@/components/site/LegalDocument'
import { COMPLAINTS } from '@/lib/legal'

export const metadata: Metadata = {
  title: { absolute: 'Complaints Procedure | A2Z Bridging' },
  description:
    'How to make a complaint to A2Z Bridging Ltd and how we handle it, including your right to refer to the Financial Ombudsman Service.',
  alternates: { canonical: '/complaints' },
  robots: { index: false, follow: true },
}

export default function ComplaintsPage() {
  return <LegalDocument eyebrow="Legal" title="Complaints Procedure" blocks={COMPLAINTS} />
}
