import React from 'react'
import { ArrowRight, PhoneCall, type LucideIcon } from 'lucide-react'
import { Hero } from './Hero'
import { StatsBar } from './StatsBar'
import { TrustBar } from './TrustBar'
import { EnquiryWizard, type WizardVariant } from './EnquiryWizard'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { ScrollLink } from './ScrollLink'
import { SITE } from '@/lib/site'

export type CampaignLandingProps = {
  eyebrow: string
  titlePre: string
  titleHighlight: string
  titlePost?: string
  heroText: string
  stats: { value: string; label: string }[]
  infoEyebrow: string
  infoTitle: string
  infoText: string
  infoItems: { icon: LucideIcon; title: string; text: string }[]
  calculatorTitle: string
  calculatorText: string
  product: string
  variants: WizardVariant[]
  minAmount?: number
  formSource: string
  ctaTitle: string
  ctaText: string
}

export const CampaignLanding: React.FC<CampaignLandingProps> = (p) => (
  <>
    <Hero
      eyebrow={p.eyebrow}
      title={
        <>
          {p.titlePre} <span className="text-brand-500">{p.titleHighlight}</span>
          {p.titlePost ? <> {p.titlePost}</> : null}
        </>
      }
      text={p.heroText}
      primaryCta={{ label: 'Get Your Quote', href: '#enquiry-form' }}
      secondaryCta={{ label: 'Request a Call Back', href: '#enquiry-form' }}
    />

    <StatsBar stats={p.stats} />
    <TrustBar />

    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading eyebrow={p.infoEyebrow} title={p.infoTitle} text={p.infoText} />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {p.infoItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="group h-full rounded-xl border border-navy-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-mist text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <item.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-mist py-16 lg:py-24" id="calculator">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Start Your Enquiry"
            title={p.calculatorTitle}
            text={p.calculatorText}
          />
        </Reveal>
        <Reveal delay={150} className="mx-auto mt-10 max-w-3xl">
          <EnquiryWizard
            product={p.product}
            source={p.formSource}
            variants={p.variants}
            minAmount={p.minAmount}
          />
        </Reveal>
      </div>
    </section>

    <CtaSection title={p.ctaTitle} text={p.ctaText} />
  </>
)

/* Self-contained final CTA — anchors and tel: only, safe for standalone domains. */
const CtaSection: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <section className="bg-white py-16 lg:py-20">
    <div className="container">
      <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-6 py-14 text-center text-white lg:px-16">
        <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-navy-700/50" aria-hidden="true" />
        <h2 className="relative font-serif text-2xl font-bold lg:text-3xl">{title}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-white/70 lg:text-base">{text}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <ScrollLink
            targetId="enquiry-form"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Get Your Quote
            <ArrowRight size={16} />
          </ScrollLink>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <PhoneCall size={15} />
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  </section>
)
