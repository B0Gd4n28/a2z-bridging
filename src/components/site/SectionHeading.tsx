import React from 'react'

export const SectionHeading: React.FC<{
  eyebrow?: string
  title: string
  text?: string
  light?: boolean
}> = ({ eyebrow, title, text, light }) => (
  <div className="mx-auto max-w-2xl text-center">
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
    )}
    <h2 className={`font-serif text-3xl font-bold lg:text-4xl ${light ? 'text-white' : 'text-navy-900'}`}>
      {title}
    </h2>
    {text && (
      <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-navy-900/60'}`}>{text}</p>
    )}
  </div>
)
