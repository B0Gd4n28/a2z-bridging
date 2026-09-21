import type { Metadata } from 'next'
import React from 'react'
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { LeadForm } from '@/components/site/LeadForm'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us — Book a Free Consultation',
  description:
    'Speak to a named advisor at A2Z Bridging. Call 020 7780 0130, email info@a2zbridging.co.uk, or request a call back — typically within one business hour.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="bg-mist">
      <section className="py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl font-bold text-navy-900 lg:text-5xl">
              Speak to a Named Advisor
            </h1>
            <p className="mt-4 max-w-md leading-relaxed text-navy-900/60">
              Tell us what you need and we&apos;ll match you with the right specialist advisor within
              one business hour — no call centres, no rotating queues.
            </p>

            <dl className="mt-10 space-y-6">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <Phone size={19} />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-navy-900/50">Phone</dt>
                  <dd className="mt-1 space-x-4">
                    <a href={SITE.phoneHref} className="font-serif text-lg font-bold text-navy-900 hover:text-brand-600">{SITE.phone}</a>
                    <a href={SITE.phone2Href} className="font-serif text-lg font-bold text-navy-900 hover:text-brand-600">{SITE.phone2}</a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <Mail size={19} />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-navy-900/50">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${SITE.email}`} className="font-serif text-lg font-bold text-navy-900 hover:text-brand-600">{SITE.email}</a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <MapPin size={19} />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-navy-900/50">Office</dt>
                  <dd className="mt-1 text-navy-900/70">{SITE.legalName}, {SITE.address}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm">
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-navy-900/50">Regulation</dt>
                  <dd className="mt-1 text-sm text-navy-900/60">
                    Authorised & regulated by the Financial Conduct Authority — FRN {SITE.fcaNumber}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div id="callback" className="scroll-mt-24">
            <LeadForm source="contact-page" />
          </div>
        </div>
      </section>
    </div>
  )
}
