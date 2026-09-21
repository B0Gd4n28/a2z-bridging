import React from 'react'
import { CountUp } from './CountUp'

export const StatsBar: React.FC<{ stats: { value: string; label: string }[] }> = ({ stats }) => (
  <section className="bg-brand-600 text-white">
    <div className="container grid grid-cols-2 divide-white/15 py-6 max-lg:gap-y-6 lg:grid-cols-4 lg:divide-x">
      {stats.map((s) => (
        <div key={s.label} className="px-2 text-center sm:px-4">
          <p className="whitespace-nowrap font-serif text-lg font-bold sm:text-2xl lg:text-3xl">
            <CountUp value={s.value} />
          </p>
          <p className="mt-1 text-xs text-white/80">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
)
