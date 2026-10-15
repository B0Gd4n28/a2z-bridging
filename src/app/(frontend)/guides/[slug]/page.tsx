import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'
import { ArrowRight, CalendarDays, Clock, Linkedin, Facebook, Mail, ShieldCheck, UserRound } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CtaBanner } from '@/components/site/CtaBanner'
import { GuideCard, type GuideCardData } from '@/components/site/GuideCard'
import { generateMeta } from '@/utilities/generateMeta'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatPublished, readingTime } from '@/utilities/readingTime'
import { getServerSideURL } from '@/utilities/getURL'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SITE } from '@/lib/site'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/guides/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  const categories = (post.categories ?? []).flatMap((c) => (typeof c === 'object' && c?.title ? [c.title] : []))
  const authors =
    post.populatedAuthors && post.populatedAuthors.length > 0 ? formatAuthors(post.populatedAuthors) : ''
  const description = post.meta?.description?.replace(/\s+/g, ' ')
  const minutes = readingTime(post.content)
  const base = getServerSideURL()
  const shareUrl = encodeURIComponent(`${base}${url}`)
  const shareTitle = encodeURIComponent(post.title)

  let related: GuideCardData[] = (post.relatedPosts ?? []).filter(
    (p): p is Exclude<typeof p, number | string> => typeof p === 'object' && p !== null,
  ) as GuideCardData[]
  if (related.length === 0) {
    const payload = await getPayload({ config: configPromise })
    const more = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 3,
      sort: '-publishedAt',
      overrideAccess: false,
      where: { slug: { not_equals: decodedSlug } },
      select: { title: true, slug: true, categories: true, meta: true, publishedAt: true, heroImage: true, content: true },
    })
    related = more.docs
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: SITE.legalName },
    publisher: { '@type': 'Organization', name: SITE.legalName },
    mainEntityOfPage: `${base}${url}`,
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <header className="relative overflow-hidden bg-navy-900 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container relative py-12 lg:py-20">
          <nav className="text-xs text-white/50" aria-label="Breadcrumb">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            {categories[0] && (
              <>
                <span className="mx-2">/</span>
                <span className="text-white/70">{categories[0]}</span>
              </>
            )}
          </nav>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold">{c}</span>
            ))}
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-bold leading-tight lg:text-5xl">{post.title}</h1>
          {description && <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 lg:text-lg">{description}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            {authors && (
              <span className="inline-flex items-center gap-1.5"><UserRound size={15} className="text-brand-400" />{authors}</span>
            )}
            {post.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} className="text-brand-400" />
                <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-brand-400" />{minutes} min read</span>
          </div>
        </div>
      </header>

      <div className="bg-white py-12 lg:py-16">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            {post.heroImage && typeof post.heroImage === 'object' && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
                <Media fill priority imgClassName="object-cover" resource={post.heroImage} />
              </div>
            )}
            <RichText className="mx-auto max-w-3xl lg:mx-0" data={post.content} enableGutter={false} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <p className="font-serif text-lg font-bold">Need finance for your deal?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Tell us the numbers and the deadline. An advisor will come back with indicative terms, usually the same working day.
              </p>
              <Link
                href="/quote"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Get Your Quote <ArrowRight size={15} />
              </Link>
              <a href={SITE.phoneHref} className="mt-3 block text-center text-sm font-semibold text-white/80 hover:text-white">
                or call {SITE.phone}
              </a>
            </div>

            <div className="rounded-2xl bg-mist p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-900/50">Share this guide</p>
              <div className="mt-3 flex gap-2">
                {[
                  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, Icon: Linkedin },
                  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, Icon: Facebook },
                  { label: 'Email', href: `mailto:?subject=${shareTitle}&body=${shareUrl}`, Icon: Mail },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === 'Email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={`Share on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-navy-900/50">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-600" />
                General information only, not financial advice. A2Z Bridging Ltd is authorised and regulated by the FCA (FRN {SITE.fcaNumber}).
              </p>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-mist py-14 lg:py-20">
          <div className="container">
            <h2 className="text-center font-serif text-2xl font-bold text-navy-900 lg:text-3xl">Keep Reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <GuideCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title="Ready to Talk Through Your Deal?" text="Speak to an advisor today. Most cases get an initial answer within hours." />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
