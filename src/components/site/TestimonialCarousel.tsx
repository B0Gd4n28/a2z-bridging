'use client'

import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type TestimonialItem = { quote: string; author: string; context?: string }

export const TestimonialCarousel: React.FC<{ items: TestimonialItem[] }> = ({ items }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const child = track.children[i] as HTMLElement | undefined
    if (child) track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  const go = useCallback(
    (dir: number) => {
      const next = (index + dir + items.length) % items.length
      setIndex(next)
      scrollTo(next)
    },
    [index, items.length, scrollTo],
  )

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => go(1), 5500)
    return () => clearInterval(id)
  }, [go, paused, items.length])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <figure
            key={t.author + t.quote.slice(0, 16)}
            className="w-[85%] shrink-0 snap-start rounded-2xl bg-white p-7 shadow-sm sm:w-[46%] lg:w-[31.5%]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Quote size={16} />
              </span>
              <span className="flex gap-0.5 text-brand-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-navy-900/75">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-navy-100 pt-4">
              <p className="text-sm font-bold text-navy-900">{t.author}</p>
              {t.context && <p className="text-xs text-navy-900/50">{t.context}</p>}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-900 transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setIndex(i)
                scrollTo(i)
              }}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand-600' : 'w-2 bg-navy-100'}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-900 transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
