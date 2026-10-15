'use client'

import { usePathname } from 'next/navigation'
import { CheckCircle2, Loader2, Mail, MessageCircle, PhoneCall, Send, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site'

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_API || '/api/leads'

/* UK office hours: Mon–Fri 09:00–18:00 (Europe/London). Evaluated on the client only. */
function isOnline(): boolean {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(new Date())
  const day = parts.find((p) => p.type === 'weekday')?.value ?? ''
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24
  return !['Sat', 'Sun'].includes(day) && hour >= 9 && hour < 18
}

export const ContactWidget: React.FC = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [online, setOnline] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [hp, setHp] = useState('')
  const mountedAt = useRef(Date.now())
  const firstField = useRef<HTMLInputElement>(null)
  const launcher = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOnline(isOnline())
    const t = setInterval(() => setOnline(isOnline()), 60_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!open) return
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcher.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (hp || Date.now() - mountedAt.current < 1500) {
      setStatus('done') // silently drop bots
      return
    }
    setStatus('sending')
    setError('')
    try {
      const email = String(fd.get('email') ?? '').trim()
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') ?? '').trim(),
          phone: String(fd.get('phone') ?? '').trim(),
          ...(email ? { email } : {}),
          message: String(fd.get('message') ?? '').trim() || 'Quick message from the website contact widget.',
          source: `widget:${pathname ?? '/'}`,
          company: hp,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('done')
    } catch {
      setStatus('error')
      setError(`Sorry, that didn't send. Please call us on ${SITE.phone} or try again.`)
    }
  }

  const input =
    'w-full rounded-md border border-navy-100 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-900/40 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Contact A2Z Bridging"
          className="widget-panel w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-navy-900/10"
        >
          <div className="relative bg-navy-900 px-5 py-4 text-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close contact panel"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
            <p className="font-serif text-base font-bold">Talk to an advisor</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-white/70">
              <span className={`inline-block h-2 w-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {online ? 'We’re online now — usually reply within the hour' : 'Office closed — leave a message and we’ll call you back'}
            </p>
          </div>

          {status === 'done' ? (
            <div className="px-5 py-8 text-center">
              <CheckCircle2 size={36} className="mx-auto text-brand-600" />
              <p className="mt-3 font-serif text-lg font-bold text-navy-900">Message received</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/60">
                An advisor will call you back {online ? 'shortly' : 'on the next working day'} (Mon–Fri, 9:00–18:00).
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setOpen(false)
                }}
                className="mt-5 text-sm font-semibold text-brand-600 hover:underline"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="px-5 py-4">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={SITE.phoneHref}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  <PhoneCall size={15} /> Call now
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-navy-100 px-3 text-sm font-semibold text-navy-900 transition-colors hover:border-brand-500/50"
                >
                  <Mail size={15} className="text-brand-600" /> Email
                </a>
              </div>

              <p className="my-3 flex items-center gap-3 text-[11px] uppercase tracking-widest text-navy-900/40">
                <span className="h-px flex-1 bg-navy-100" /> or send a message <span className="h-px flex-1 bg-navy-100" />
              </p>

              <form onSubmit={onSubmit} className="space-y-2.5">
                <label className="sr-only" htmlFor="cw-name">Your name</label>
                <input ref={firstField} id="cw-name" name="name" required autoComplete="name" placeholder="Your name" className={input} />
                <label className="sr-only" htmlFor="cw-phone">Phone number</label>
                <input id="cw-phone" name="phone" type="tel" required autoComplete="tel" placeholder="Phone number" className={input} />
                <label className="sr-only" htmlFor="cw-email">Email (optional)</label>
                <input id="cw-email" name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={input} />
                <label className="sr-only" htmlFor="cw-message">How can we help?</label>
                <textarea id="cw-message" name="message" rows={3} placeholder="How can we help? (e.g. £400k bridging loan, 3-week deadline)" className={`${input} resize-none`} />
                <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="cw-company">Company</label>
                  <input id="cw-company" name="company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
                {status === 'error' && <p className="text-xs text-brand-700" role="alert">{error}</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
                >
                  {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-navy-900/50">
                  <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>
                    We only use your details to respond to your enquiry. See our{' '}
                    <Link href="/privacy-policy" className="underline">privacy policy</Link>.
                  </span>
                </p>
              </form>
            </div>
          )}
        </div>
      )}

      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close contact panel' : 'Contact us'}
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-14 items-center gap-2.5 rounded-full bg-brand-600 pl-4 pr-5 text-sm font-semibold text-white shadow-xl shadow-brand-600/30 ring-1 ring-white/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {open ? <X size={20} /> : <MessageCircle size={21} />}
          {!open && (
            <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-brand-600 ${online ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          )}
        </span>
        <span className="hidden sm:inline">{open ? 'Close' : 'Contact us'}</span>
      </button>
    </div>
  )
}
