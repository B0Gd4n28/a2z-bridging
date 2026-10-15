import React from 'react'
import type { LegalBlock } from '@/lib/legal'

export const LegalDocument: React.FC<{ eyebrow: string; title: string; intro?: string; blocks: LegalBlock[] }> = ({
  eyebrow,
  title,
  intro,
  blocks,
}) => (
  <>
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container relative py-14 text-center lg:py-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{eyebrow}</p>
        <h1 className="font-serif text-3xl font-bold lg:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-4 max-w-2xl text-white/70">{intro}</p>}
      </div>
    </section>
    <section className="bg-white py-14 lg:py-20">
      <div className="container mx-auto max-w-3xl space-y-9">
        {blocks.map((b, i) => {
          const List = b.ordered ? 'ol' : 'ul'
          return (
            <div key={b.heading ?? i}>
              {b.heading && <h2 className="font-serif text-xl font-bold text-navy-900">{b.heading}</h2>}
              <div className={`${b.heading ? 'mt-3 ' : ''}space-y-3 leading-relaxed text-navy-900/70`}>
                {b.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              </div>
              {b.list && (
                <List className={`mt-3 space-y-2 pl-6 leading-relaxed text-navy-900/70 ${b.ordered ? 'list-decimal' : 'list-disc'}`}>
                  {b.list.map((li) => <li key={li}>{li}</li>)}
                </List>
              )}
            </div>
          )
        })}
      </div>
    </section>
  </>
)
