'use client'

import React, { useState } from 'react'

export const FaqAccordion: React.FC<{ faqs: { q: string; a: string }[] }> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map((f, i) => {
        const open = openIndex === i
        return (
          <div key={f.q} className="rounded-lg bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-bold text-navy-900 lg:text-base">{f.q}</span>
              <span
                className={`shrink-0 text-brand-600 transition-transform ${open ? 'rotate-45' : ''}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {open && (
              <p className="px-6 pb-5 text-sm leading-relaxed text-navy-900/65">{f.a}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
