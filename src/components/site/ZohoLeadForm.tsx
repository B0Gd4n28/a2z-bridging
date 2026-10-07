'use client'

import Script from 'next/script'
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import React, { useEffect, useId, useRef, useState } from 'react'

/* Zoho CRM web-to-lead forms, provided directly by the client (7 Oct 2026).
   Hidden field names/values below are Zoho's own tracking tokens — do not change them.
   Reimplemented as a React form (instead of Zoho's raw <script> embed) so it matches the
   site's styling and works reliably inside Next.js, but submits to the exact same Zoho
   endpoint with the exact same fields, honeypot and reCAPTCHA that Zoho requires. */

const ZOHO_ENDPOINT = 'https://crm.zoho.eu/crm/WebToLeadForm'
const RECAPTCHA_SITEKEY = '6LdCTOMtAAAAAKJqBMUK9zAKYF2KaGxHiOiyacpF'

type Status = 'idle' | 'submitting' | 'success' | 'error'

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; theme?: string; callback: () => void },
      ) => void
    }
  }
}

const windowAsRecord = () => window as unknown as Record<string, (() => void) | undefined>

export const ZohoLeadForm: React.FC<{
  formName: string
  xnQsjsdp: string
  xmIwtLD: string
  descriptionLabel?: string
}> = ({ formName, xnQsjsdp, xmIwtLD, descriptionLabel = 'Tell us about your deal' }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const recaptchaCallbackName = `onA2ZRecaptchaLoad_${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  const renderRecaptcha = () => {
    if (window.grecaptcha && recaptchaRef.current && recaptchaRef.current.childElementCount === 0) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: RECAPTCHA_SITEKEY,
        theme: 'light',
        callback: () => setCaptchaVerified(true),
      })
    }
  }

  useEffect(() => {
    // Google only finishes initialising grecaptcha some time after the <script> tag's own
    // load event — the explicit onload=... callback is the reliable way to know it's ready.
    windowAsRecord()[recaptchaCallbackName] = renderRecaptcha
    if (window.grecaptcha) renderRecaptcha()
    return () => {
      delete windowAsRecord()[recaptchaCallbackName]
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting' || !formRef.current) return
    if (!captchaVerified) {
      setError('Please complete the captcha before submitting.')
      return
    }
    setStatus('submitting')
    setError(null)
    try {
      const formData = new FormData(formRef.current)
      const res = await fetch(ZOHO_ENDPOINT, { method: 'POST', body: formData, cache: 'no-cache' })
      const contentType = res.headers.get('Content-Type') || ''
      const data = contentType.includes('application/json') ? await res.json() : await res.text()

      if (typeof data === 'object' && data) {
        if (data.invalidCaptcha === 'true' || data.actionsubmit === 'captcha_error') {
          setCaptchaVerified(false)
          setError('Captcha validation failed. Please try again.')
          setStatus('idle')
          return
        }
        if (data.actionsubmit === 'redirect_url' || data.actionsubmit === 'thankyou_page' || data.actionsubmit === 'parent_redirect') {
          window.location.assign(data.redirectUrl || '/lp/thank-you')
          return
        }
        if (data.actionsubmit === 'error_msg') {
          setError(data.message || 'Something went wrong. Please try again or email us directly.')
          setStatus('error')
          return
        }
      }
      // Default: Zoho "Splash Message" (inline success) or any other 2xx response.
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-navy-100 bg-mist px-4 py-3 text-navy-900 outline-none focus:border-brand-500'

  if (status === 'success') {
    return (
      <div id="enquiry-form" className="scroll-mt-24 rounded-2xl bg-white p-8 text-center shadow-xl lg:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-bold text-navy-900">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-900/60">
          Thank you. A named advisor will call you back — typically within one business hour during
          office hours.
        </p>
      </div>
    )
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?onload=${recaptchaCallbackName}&render=explicit`}
        strategy="afterInteractive"
      />
      <form
        id="enquiry-form"
        ref={formRef}
        onSubmit={submit}
        name={formName}
        acceptCharset="UTF-8"
        className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-xl lg:p-10"
      >
        {/* Zoho tracking fields — required for the lead to reach the right Zoho form/account. */}
        <input type="hidden" name="xnQsjsdp" value={xnQsjsdp} />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input type="hidden" name="xmIwtLD" value={xmIwtLD} />
        <input type="hidden" name="actionType" value="TGVhZHM=" />
        <input type="hidden" name="returnURL" value="null" />
        {/* Honeypot — must stay empty; real users never see this field. */}
        <input type="hidden" name="aG9uZXlwb3Q" tabIndex={-1} autoComplete="off" defaultValue="" />

        <h3 className="font-serif text-2xl font-bold text-navy-900">Get Your Quote</h3>
        <p className="mt-2 text-sm text-navy-900/60">Tell us what you need — a named advisor calls you back the same day.</p>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="First_Name" className="text-sm font-semibold text-navy-900">First name *</label>
              <input id="First_Name" name="First Name" required maxLength={40} className={`mt-2 ${inputCls}`} autoComplete="given-name" />
            </div>
            <div>
              <label htmlFor="Last_Name" className="text-sm font-semibold text-navy-900">Last name *</label>
              <input id="Last_Name" name="Last Name" required maxLength={80} className={`mt-2 ${inputCls}`} autoComplete="family-name" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="Email" className="text-sm font-semibold text-navy-900">Email *</label>
              <input id="Email" name="Email" type="email" required maxLength={100} className={`mt-2 ${inputCls}`} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="Phone" className="text-sm font-semibold text-navy-900">Phone *</label>
              <input id="Phone" name="Phone" type="tel" required maxLength={30} className={`mt-2 ${inputCls}`} autoComplete="tel" />
            </div>
          </div>
          <div>
            <label htmlFor="Description" className="text-sm font-semibold text-navy-900">
              {descriptionLabel} <span className="font-normal text-navy-900/50">(optional)</span>
            </label>
            <textarea id="Description" name="Description" rows={3} className={`mt-2 ${inputCls}`} />
          </div>

          <div ref={recaptchaRef} className="g-recaptcha" />
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-brand-100 px-4 py-3 text-sm text-brand-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Get My Quote'}
          <ArrowRight size={15} />
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-navy-900/50">
          <Lock size={12} className="text-brand-600" />
          Your details go straight to our team — no spam, no obligation.
        </p>
      </form>
    </>
  )
}
