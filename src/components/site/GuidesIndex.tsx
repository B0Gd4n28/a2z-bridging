import Link from 'next/link'
import React from 'react'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Pagination } from '@/components/Pagination'
import { GuideCard, type GuideCardData } from '@/components/site/GuideCard'
import { SITE } from '@/lib/site'

export const GuidesIndex: React.FC<{
  posts: GuideCardData[]
  page: number
  totalPages: number
  totalDocs: number
}> = ({ posts, page, totalPages, totalDocs }) => {
  const [first, ...rest] = posts
  const showFeatured = page === 1 && Boolean(first)
  const grid = showFeatured ? rest : posts

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container relative py-16 text-center lg:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Guides &amp; Insights</p>
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-tight lg:text-5xl">
            Property Finance, Explained Plainly
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            Straight answers on bridging loans, auction finance, buy-to-let and commercial mortgages, written by the advisors who arrange these deals every day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get Your Quote <ArrowRight size={16} />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PhoneCall size={15} /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 lg:py-20">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-center text-navy-900/60">New guides are on the way. In the meantime, <Link href="/contact" className="font-semibold text-brand-600 underline">talk to an advisor</Link>.</p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {showFeatured && first && <GuideCard post={first} featured />}
                {grid.map((p) => (
                  <GuideCard key={p.slug} post={p} />
                ))}
              </div>
              <p className="mt-8 text-center text-xs text-navy-900/50">
                {totalDocs} guide{totalDocs === 1 ? '' : 's'} published
              </p>
              {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
            </>
          )}
        </div>
      </section>
    </>
  )
}
