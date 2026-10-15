import type { Metadata } from 'next'
import { LegalDocument } from '@/components/site/LegalDocument'
import { PRIVACY_POLICY } from '@/lib/legal'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | A2Z Bridging' },
  description: 'How A2Z Bridging Ltd collects, uses and protects your personal data.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyPage() {
  return <LegalDocument eyebrow="Legal" title="Privacy Policy" blocks={PRIVACY_POLICY} />
}
