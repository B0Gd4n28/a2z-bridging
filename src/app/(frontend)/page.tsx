import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { Hero } from '@/components/site/Hero'
import { StatsBar } from '@/components/site/StatsBar'
import { TrustBar } from '@/components/site/TrustBar'
import { Calculator } from '@/components/site/Calculator'
import { ProductsGrid } from '@/components/site/ProductsGrid'
import { SectionHeading } from '@/components/site/SectionHeading'
import { CtaBanner } from '@/components/site/CtaBanner'
import { Reveal } from '@/components/site/Reveal'
import { TestimonialCarousel, type TestimonialItem } from '@/components/site/TestimonialCarousel'
import { ShieldCheck, BadgePercent, Zap, Handshake, UserRound, BookOpen, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'

export const revalidate = 600

const FALLBACK_ADVISORS = [
  { name: 'Zain Rashid', role: 'Senior Finance Advisor', quote: 'Zain kept me updated every step — completed in 11 days.' },
  { name: 'Ani Karapetyan', role: 'Bridging Specialist', quote: 'Ani found a lender when two banks had already said no.' },
  { name: 'Fatima Noor', role: 'Commercial Advisor', quote: 'Clear, honest advice from the first call to completion.' },
  { name: 'Syed Ahmed', role: 'Auction Finance Lead', quote: 'Syed got terms agreed within 24 hours of my call.' },
]

const FALLBACK_GUIDES = [
  { title: 'What Is a Bridging Loan? A Plain-English Guide', category: 'Bridging', read: '6 min read', href: '/guides' },
  { title: 'Bridging vs. Remortgage: Which Is Right for You?', category: 'Comparison', read: '5 min read', href: '/guides' },
  { title: 'How Auction Finance Works — And Why Speed Matters', category: 'Auction', read: '4 min read', href: '/guides' },
]

/* Real client reviews from a2zbridging.co.uk */
const REAL_TESTIMONIALS: TestimonialItem[] = [
  { quote: 'Very hardworking team! Did multiple cases for my dad and pulled through when no one else could.', author: 'Tanveer', context: 'Google Review' },
  { quote: 'Fantastic service from the team! One of the best brokerages about, especially when it comes to bridging finance — would give 6 stars if I could!', author: 'Ryan', context: 'Google Review' },
  { quote: 'They have done 5 cases for me — refinancing of 3 properties and 2 purchases, completed very quickly and I was always getting updates.', author: 'Sabah Al-Badri', context: 'Google Review' },
  { quote: 'A fantastic company to work with. What most impressed me was their ability to do what they say they will do.', author: 'Tabs Singh', context: 'Google Review' },
  { quote: 'We had our mortgage/bridging accepted after a bad experience with another company. Very professional and kept us updated throughout.', author: 'Aman Malhotra', context: 'Google Review' },
  { quote: 'Excellent fast service — they keep you informed at each and every step of the way until completion.', author: 'Sachin Kaushal', context: 'Google Review' },
]

const WHY_A2Z = [
  { icon: ShieldCheck, title: 'No upfront broker fees', text: 'No hidden charges from us — you only pay when your finance completes.' },
  { icon: BadgePercent, title: 'The most competitive rate', text: 'We work the market to your advantage, collaborating closely with lenders.' },
  { icon: Zap, title: 'Built for speed', text: 'Life moves fast. Business moves faster. And property? Faster still.' },
  { icon: Handshake, title: 'Transparent, personal service', text: 'Startup energy with the sector experience of a high-street lender.' },
]

async function getLatestGuides() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      limit: 3,
      depth: 1,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
      select: { title: true, slug: true, categories: true },
    })
    return docs
  } catch {
    return []
  }
}

export default async function HomePage() {
  const guides = await getLatestGuides()

  return (
    <>
      <Hero
        eyebrow="Whole-of-Market Bridging & Commercial Finance"
        title={
          <>
            Finance <span className="text-brand-500">Without</span> the Wait
          </>
        }
        text="A whole-of-market panel and a named advisor on every case — so you get a decision in hours, not weeks, from people you can actually call back."
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact' }}
        secondaryCta={{ label: 'Request a Call Back', href: '/contact#callback' }}
      />

      <StatsBar stats={SITE.stats} />
      <TrustBar />

      <section className="bg-mist py-16 lg:py-24" id="calculator">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="New — Interactive Tool"
              title="See Your Estimated Cost in Seconds"
              text="Enter your loan amount and term for an instant, indicative estimate — no forms, no waiting."
            />
          </Reveal>
          <Reveal delay={150} className="mx-auto mt-10 max-w-4xl">
            <Calculator />
          </Reveal>
        </div>
      </section>

      <ProductsGrid />

      <section className="bg-white pb-16 lg:pb-24">
        <div className="container">
          <div className="grid gap-6 rounded-2xl bg-mist p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
            {WHY_A2Z.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                    <w.icon size={21} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-navy-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/60">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-16 text-white lg:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
              Why Clients Choose A2Z
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight lg:text-4xl">
              A Named Advisor on Every Case — Not a Call Centre
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/70">
              Every enquiry is handled by a real person you can reach directly, not a rotating queue.
              It&apos;s the difference our clients mention most often.
            </p>
            <Link
              href="/team"
              className="mt-8 inline-block rounded-md border border-white/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Meet the Team →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {FALLBACK_ADVISORS.map((a, i) => (
              <Reveal key={a.name} delay={i * 100}>
                <div className="h-full rounded-xl bg-navy-800 p-5 transition-transform hover:-translate-y-1">
                  <div className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400/60 to-navy-600">
                    <UserRound size={38} strokeWidth={1.4} className="text-white/80" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-bold">{a.name}</p>
                  <p className="text-xs text-brand-400">{a.role}</p>
                  <p className="mt-2 text-xs italic leading-relaxed text-white/60">“{a.quote}”</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title="See What Our Customers Think"
              text="Rated 4.9/5 across 500+ Google and Trustpilot reviews."
            />
          </Reveal>
          <Reveal delay={150} className="mt-12">
            <TestimonialCarousel items={REAL_TESTIMONIALS} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Learn" title="Guides & Insights" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(guides.length > 0
              ? guides.map((g) => ({
                  title: g.title,
                  category:
                    (Array.isArray(g.categories) &&
                      typeof g.categories[0] === 'object' &&
                      g.categories[0] &&
                      'title' in g.categories[0] &&
                      (g.categories[0].title as string)) ||
                    'Guide',
                  read: '',
                  href: `/guides/${g.slug}`,
                }))
              : FALLBACK_GUIDES
            ).map((g) => (
              <Link
                key={g.title}
                href={g.href}
                className="group overflow-hidden rounded-xl border border-navy-100 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-400/50 via-brand-100 to-mist">
                  <BookOpen size={40} strokeWidth={1.3} className="text-brand-600/50 transition-transform group-hover:scale-110" aria-hidden="true" />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white">
                    {g.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-base font-bold text-navy-900 group-hover:text-brand-600">
                    {g.title}
                  </h3>
                  {g.read && <p className="mt-3 text-xs text-navy-900/50">{g.read}</p>}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
              View all guides <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready When You Are"
        text="Talk to a named advisor today — most cases get an initial answer within hours."
      />
    </>
  )
}

export const metadata: Metadata = {
  title: 'A2Z Bridging — Finance Without the Wait | Bridging & Commercial Finance Broker',
  description:
    'Whole-of-market bridging loans, buy-to-let, development, auction and commercial finance. Decisions in 24 hours, a named advisor on every case. FCA authorised — FRN 808769.',
  alternates: { canonical: '/' },
}
