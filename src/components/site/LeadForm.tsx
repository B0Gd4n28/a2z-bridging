'use client'

import { ShieldCheck, Clock, Lock, CheckCircle2 } from 'lucide-react'
import React, { useRef, useState } from 'react'

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
  const [amount, setAmount] = useState(250_000)
  const [product, setProduct] = useState(PRODUCT_OPTIONS[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp] = useState('') // honeypot — real users never see or fill this
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(Date.now())

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    // Basic bot protection: honeypot field filled, or submitted implausibly fast.
    if (hp || Date.now() - mountedAt.current < 1500) {
      setStatus('success')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, amount, product, message, source, company: hp }),
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
      className="relative scroll-mt-24 rounded-2xl bg-white p-6 shadow-xl lg:p-10"
    >
      <h3 className="font-serif text-2xl font-bold text-navy-900">Get Your Quote</h3>
      <p className="mt-2 text-sm text-navy-900/60">
        Tell us what you need — a named advisor calls you back the same day.
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

      <div className="mt-6">
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
        {/* Honeypot — hidden from sighted/keyboard users, catches basic bots that fill every field. */}
        <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="lead-company">Company</label>
          <input id="lead-company" name="company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 rounded-md bg-brand-100 px-4 py-3 text-sm text-brand-700">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-md bg-brand-600 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Quote →'}
      </button>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-navy-900/50">
        <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-brand-600" /> Takes about 60 seconds</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-600" /> No impact on your credit score</span>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-navy-900/50">
        <Lock size={12} className="text-brand-600" />
        Your details go straight to our team — no spam, no obligation.
      </p>
    </form>
  )
}
