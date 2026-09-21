'use client'

import { ShieldCheck, Clock, Lock, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

const gbp = (n: number) =>
  n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })

const PRODUCT_OPTIONS = [
  'Bridging Loan',
  'Buy-to-Let Mortgage',
  'Development Finance',
  'Auction Finance',
  'Commercial Mortgage',
  'Business Loan',
  'Not sure yet',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

/* On standalone domains, point the form at the main site's API via env. */
const LEADS_ENDPOINT = process.env.NEXT_PUBLIC_LEADS_API || '/api/leads'

export const LeadForm: React.FC<{ source?: string; dark?: boolean }> = ({
  source = 'website',
  dark = false,
}) => {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(250_000)
  const [product, setProduct] = useState(PRODUCT_OPTIONS[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, amount, product, message, source }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-navy-100 bg-mist px-4 py-3 text-navy-900 outline-none focus:border-brand-500'

  if (status === 'success') {
    return (
      <div
        id="enquiry-form"
        className="rounded-2xl bg-white p-8 text-center shadow-xl lg:p-12"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-bold text-navy-900">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-900/60">
          Thank you, {name.split(' ')[0] || 'there'}. A named advisor will call you back — typically
          within one business hour during office hours.
        </p>
      </div>
    )
  }

  return (
    <form
      id="enquiry-form"
      onSubmit={submit}
      className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-xl lg:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
        Step {step} of 2
      </p>

      {step === 1 ? (
        <>
          <h3 className="mt-3 font-serif text-2xl font-bold text-navy-900">
            How much do you want to borrow?
          </h3>
          <p className="mt-2 text-sm text-navy-900/60">
            A rough figure is fine — this can change as we discuss your case.
          </p>

          <p className="mt-8 text-center font-serif text-4xl font-bold text-navy-900">{gbp(amount)}</p>
          <input
            aria-label="Loan amount"
            type="range"
            min={25_000}
            max={5_000_000}
            step={25_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-6 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-navy-900/50">
            <span>£25k</span>
            <span>£5m+</span>
          </div>

          <div className="mt-8">
            <label htmlFor="lead-product" className="text-sm font-semibold text-navy-900">
              What do you need?
            </label>
            <select
              id="lead-product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={`mt-2 ${inputCls}`}
            >
              {PRODUCT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-8 w-full rounded-md bg-brand-600 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Continue →
          </button>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-navy-900/50">
            <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-brand-600" /> Takes about 90 seconds</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-600" /> No impact on your credit score</span>
          </div>
        </>
      ) : (
        <>
          <h3 className="mt-3 font-serif text-2xl font-bold text-navy-900">
            Where should we send your terms?
          </h3>
          <p className="mt-2 text-sm text-navy-900/60">
            {product} · {gbp(amount)} —{' '}
            <button type="button" onClick={() => setStep(1)} className="font-semibold text-brand-600 underline">
              edit
            </button>
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="lead-name" className="text-sm font-semibold text-navy-900">Full name *</label>
              <input id="lead-name" required value={name} onChange={(e) => setName(e.target.value)} className={`mt-2 ${inputCls}`} autoComplete="name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lead-email" className="text-sm font-semibold text-navy-900">Email *</label>
                <input id="lead-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-2 ${inputCls}`} autoComplete="email" />
              </div>
              <div>
                <label htmlFor="lead-phone" className="text-sm font-semibold text-navy-900">Phone *</label>
                <input id="lead-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={`mt-2 ${inputCls}`} autoComplete="tel" />
              </div>
            </div>
            <div>
              <label htmlFor="lead-message" className="text-sm font-semibold text-navy-900">
                Tell us about your deal <span className="font-normal text-navy-900/50">(optional)</span>
              </label>
              <textarea id="lead-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`mt-2 ${inputCls}`} />
            </div>
          </div>

          {status === 'error' && (
            <p className="mt-4 rounded-md bg-brand-100 px-4 py-3 text-sm text-brand-700">
              Something went wrong. Please try again or call us on 020 7780 0130.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-6 w-full rounded-md bg-brand-600 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Get My Quote →'}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-navy-900/50">
            <Lock size={12} className="text-brand-600" />
            Your details go straight to our team — no spam, no obligation.
          </p>
        </>
      )}
    </form>
  )
}
