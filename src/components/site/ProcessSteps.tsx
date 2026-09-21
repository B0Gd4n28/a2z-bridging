import React from 'react'
import { PhoneCall, Search, FileCheck2, Banknote, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

const STEP_ICONS: LucideIcon[] = [PhoneCall, Search, FileCheck2, Banknote]

export const ProcessSteps: React.FC<{
  eyebrow?: string
  title: string
  steps: { title: string; text: string }[]
}> = ({ eyebrow = 'How It Works', title, steps }) => (
  <section className="bg-mist py-16 lg:py-24">
    <div className="container">
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} />
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length]
          return (
            <Reveal key={s.title} delay={i * 120}>
              <div className="group relative h-full rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:scale-110">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="font-serif text-3xl font-bold text-navy-100">{i + 1}</span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/60">{s.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  </section>
)
