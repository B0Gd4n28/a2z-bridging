import Link from 'next/link'
import React from 'react'
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react'
import { Media } from '@/components/Media'
import { formatPublished, readingTime } from '@/utilities/readingTime'
import type { Post } from '@/payload-types'

export type GuideCardData = Pick<Post, 'slug' | 'title' | 'categories' | 'meta' | 'publishedAt' | 'heroImage' | 'content'>

const categoryNames = (post: GuideCardData): string[] =>
  (post.categories ?? []).flatMap((c) => (typeof c === 'object' && c?.title ? [c.title] : []))

export const GuideCard: React.FC<{ post: GuideCardData; featured?: boolean }> = ({ post, featured }) => {
  const cats = categoryNames(post)
  const image = post.meta?.image ?? post.heroImage
  const hasImage = image && typeof image === 'object'
  const description = post.meta?.description?.replace(/\s+/g, ' ')

  return (
    <Link
      href={`/guides/${post.slug}`}
      className={`group flex overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
        featured ? 'flex-col lg:col-span-full lg:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 ${
          featured ? 'min-h-56 lg:min-h-80 lg:w-1/2' : 'h-44'
        }`}
      >
        {hasImage ? (
          <Media fill imgClassName="object-cover transition-transform duration-500 group-hover:scale-105" resource={image} size="(min-width: 1024px) 40vw, 100vw" />
        ) : (
          <>
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <BookOpen className="absolute bottom-5 right-5 text-white/15" size={featured ? 96 : 64} strokeWidth={1.2} aria-hidden="true" />
          </>
        )}
        {cats[0] && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold text-white">{cats[0]}</span>
        )}
        {featured && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900">Latest guide</span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <h2 className={`font-serif font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
          {post.title}
        </h2>
        {description && (
          <p className={`mt-3 leading-relaxed text-navy-900/60 ${featured ? 'text-base' : 'line-clamp-3 text-sm'}`}>{description}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-navy-900/55">
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>}
          <span className="inline-flex items-center gap-1"><Clock size={13} className="text-brand-600" />{readingTime(post.content)} min read</span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-600">
            Read guide <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
