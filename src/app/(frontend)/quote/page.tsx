import type { Metadata } from 'next'
import React from 'react'
import {
  Globe2,
  Zap,
  UserRound,
  ClipboardList,
  SearchCheck,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { LeadForm } from '@/components/site/LeadForm'
import { ScrollLink } from '@/components/site/ScrollLink'
import { FaqAccordion } from '@/components/site/FaqAccordion'
import { SectionHeading } from '@/components/site/SectionHeading'
import { LogoMarquee } from '@/components/site/LogoMarquee'
import { Reveal } from '@/components/site/Reveal'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Get Your Bridging Finance Quote — Terms Same Day',
  description:
    'Get indicative bridging finance terms today. Whole-of-market access, decisions in hours, no impact on your credit score. FCA authorised broker — FRN 808769.',
  alternates: { canonical: '/quote' },
  robots: { index: true, follow: true },
}

const USPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe2, title: 'Whole of Market', text: 'Not tied to one lender panel — we search the entire market for your case.' },
  { icon: Zap, title: 'Fast Turnaround', text: 'Indicative terms in hours, not weeks. Most enquiries answered the same day.' },
  { icon: UserRound, title: 'One Named Advisor', text: 'You deal with the advisor who sourced your terms all the way to completion.' },
]

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ClipboardList, title: 'Tell us what you need', text: 'A 90-second form covering the loan amount, the security, and your timeframe. No credit check, no obligation.' },
  { icon: SearchCheck, title: 'We search whole of market', text: 'We identify which lenders can actually place your deal — and on what terms.' },
  { icon: PhoneCall, title: 'You get a same-day call', text: 'Your dedicated advisor talks you through the options and next steps, so you can move while the opportunity is still live.' },
]

const FAQS = [
  { q: 'Will checking my eligibility affect my credit score?', a: 'No. The initial enquiry and indicative terms are based on the information you provide — no hard credit search is carried out at this stage.' },
  { q: 'How fast can a bridging loan actually complete?', a: 'Bridging finance is built for speed — straightforward cases can complete in days. Cases that require full legal work are typically achieved in 3–4 weeks.' },
  { q: 'What can I use a bridging loan for?', a: 'Common uses include auction purchases, chain breaks, refurbishment projects, and raising capital against property quickly. If you are unsure whether your scenario fits, submit an enquiry and we will advise directly.' },
  { q: 'Is there a cost to get a quote?', a: 'No. Getting indicative terms is free and without obligation. You will only see fee and cost details set out clearly if and when you choose to proceed.' },
]

export default function QuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="animate-float-slow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-navy-700/40" aria-hidden="true" />
        <div className="container relative grid items-start gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <ShieldCheck size={13} className="text-brand-400" />
              FCA Authorised · Whole-of-Market Broker
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight lg:text-5xl">
              Bridging Finance Terms <span className="text-brand-500">the Same Day</span> You Ask
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
              A whole-of-market search and a named advisor on every case — so you get a decision in
              hours, not weeks, without any impact on your credit score.
            </p>

            <ul className="mt-8 space-y-4">
              {USPS.map((u) => (
                <li key={u.title} className="flex gap-4">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-brand-400 ring-1 ring-brand-500/30">
                    <u.icon size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{u.title}</p>
                    <p className="text-sm text-white/65">{u.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {SITE.trustBadges.slice(0, 3).map((b) => (
                <span key={b} className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/70">
                  {b}
                </span>
              ))}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/60">
              <PhoneCall size={14} className="text-brand-400" />
              Prefer to talk?{' '}
              <a href={SITE.phoneHref} className="font-semibold text-white underline">
                Call {SITE.phone}
              </a>
            </p>
          </div>

          <div className="lg:sticky lg:top-24">
            <LeadForm source="quote-landing" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-20">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="The Process" title="Three Steps From Enquiry to Terms" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="group h-full rounded-xl bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-600 transition-transform group-hover:scale-110">
                      <s.icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="font-serif text-3xl font-bold text-navy-100">{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/60">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <LogoMarquee />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Common Questions" title="Before You Get in Touch" />
          </Reveal>
          <Reveal delay={120} className="mt-10 rounded-2xl bg-mist p-4 sm:p-8">
            <FaqAccordion faqs={FAQS} />
          </Reveal>
          <div className="mt-12 text-center">
            <ScrollLink
              targetId="enquiry-form"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get Your Quote
              <ArrowRight size={16} />
            </ScrollLink>
            <p className="mt-3 text-xs text-navy-900/50">Takes about 90 seconds · no impact on your credit score</p>
          </div>
        </div>
      </section>
    </>
  )
}
