'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CountUp } from './CountUp'

export const StatsBar: React.FC<{ stats: { value: string; label: string }[] }> = ({ stats }) => {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setActive(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-brand-600 text-white">
      <div className="container grid grid-cols-2 divide-white/15 py-7 max-lg:gap-y-7 lg:grid-cols-4 lg:divide-x">
        {stats.map((s, i) => (
          <div key={s.label} className="px-3 text-center sm:px-6">
            <p className="whitespace-nowrap font-serif text-lg font-bold sm:text-2xl lg:text-3xl">
              <CountUp value={s.value} active={active} />
            </p>
            <div className="mx-auto mt-2 h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-white/20" aria-hidden="true">
              <div
                className="h-full origin-left rounded-full bg-white"
                style={{
                  transform: active ? 'scaleX(1)' : 'scaleX(0)',
                  transition: `transform ${1500 + i * 250}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-white/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
