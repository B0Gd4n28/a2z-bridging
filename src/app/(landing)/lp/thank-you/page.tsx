import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, PhoneCall, Clock } from 'lucide-react'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Thank You — A2Z Bridging' },
  description: 'Your enquiry has been received. A named advisor will call you back shortly.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl lg:p-12">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-bold text-navy-900">Thank You — We've Got Your Enquiry</h1>
          <p className="mt-4 leading-relaxed text-navy-900/60">
            A named advisor will call you back shortly — typically within one business hour during
            office hours (Mon–Fri, 9:00–18:00).
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <PhoneCall size={15} />
              Call Now
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-100 px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-500/50"
            >
              Back to Homepage
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-1.5 text-xs text-navy-900/50">
            <Clock size={12} className="text-brand-600" />
            Office hours: Mon–Fri, 9:00–18:00
          </p>
        </div>
      </div>
    </section>
  )
}
