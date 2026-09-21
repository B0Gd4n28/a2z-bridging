'use client'

import Link from 'next/link'
import { TrendingUp, ArrowRight } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const gbp = (n: number) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })

const RATES: Record<string, number> = { regulated: 0.0075, unregulated: 0.0085, auction: 0.0095 }

export const Calculator: React.FC<{ full?: boolean; quoteHref?: string }> = ({
  full = false,
  quoteHref = '/quote#enquiry-form',
}) => {
  const [amount, setAmount] = useState(450_000)
  const [ltv, setLtv] = useState(64)
  const [term, setTerm] = useState(9)
  const [type, setType] = useState<'regulated' | 'unregulated' | 'auction'>('regulated')

  const { monthly, arrangementFee, total } = useMemo(() => {
    const rate = RATES[type] ?? RATES.regulated
    const monthly = amount * rate
    const arrangementFee = amount * 0.02
    return { monthly, arrangementFee, total: monthly * term + arrangementFee }
  }, [amount, term, type])

  return (
    <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-xl lg:grid-cols-2 lg:p-10">
      <div className="space-y-6">
        <div>
          <label htmlFor="calc-amount" className="text-sm font-semibold text-navy-900">
            Loan Amount
          </label>
          <div className="mt-2 flex items-center rounded-lg border border-navy-100 bg-mist px-4">
            <span className="text-navy-900/60">£</span>
            <input
              id="calc-amount"
              type="number"
              min={50_000}
              max={10_000_000}
              step={10_000}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full bg-transparent px-2 py-3 text-navy-900 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="calc-ltv" className="flex justify-between text-sm font-semibold text-navy-900">
            <span>Property Value (LTV {ltv}%)</span>
            <span className="text-navy-900/50">{gbp(Math.round(amount / (ltv / 100)))}</span>
          </label>
          <input
            id="calc-ltv"
            type="range"
            min={30}
            max={75}
            value={ltv}
            onChange={(e) => setLtv(Number(e.target.value))}
            className="mt-3 w-full accent-brand-600"
          />
        </div>

        <div>
          <label htmlFor="calc-term" className="text-sm font-semibold text-navy-900">
            Loan Term
          </label>
          <select
            id="calc-term"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="mt-2 w-full rounded-lg border border-navy-100 bg-mist px-4 py-3 text-navy-900 outline-none"
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m} month{m > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {full && (
          <div>
            <p className="text-sm font-semibold text-navy-900">Loan Type</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(['regulated', 'unregulated', 'auction'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    type === t
                      ? 'bg-brand-600 text-white'
                      : 'border border-navy-100 bg-white text-navy-900 hover:border-brand-500/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col rounded-xl bg-navy-900 p-6 text-white lg:p-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          <TrendingUp size={14} className="text-brand-400" />
          Your Estimate
        </p>
        <dl className="mt-6 flex-1 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <dt className="text-sm text-white/70">Loan-to-Value</dt>
            <dd className="font-serif text-lg font-bold">{ltv}%</dd>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <dt className="text-sm text-white/70">Est. monthly interest</dt>
            <dd className="font-serif text-lg font-bold">{gbp(monthly)}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <dt className="text-sm text-white/70">Arrangement fee (2%)</dt>
            <dd className="font-serif text-lg font-bold">{gbp(arrangementFee)}</dd>
          </div>
          <div className="flex items-center justify-between pt-1">
            <dt className="text-sm text-white/70">Est. total cost</dt>
            <dd className="font-serif text-2xl font-bold text-brand-400">{gbp(total)}</dd>
          </div>
        </dl>
        <Link
          href={quoteHref}
          className="mt-6 flex items-center justify-center gap-2 rounded-md bg-brand-600 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get Your Quote
          <ArrowRight size={15} />
        </Link>
        <p className="mt-4 text-[11px] leading-relaxed text-white/45">
          Indicative only, not a formal quote or financial promotion. Final rates are subject to
          underwriting, valuation, and status.
        </p>
      </div>
    </div>
  )
}
