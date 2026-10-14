import React from 'react'
import { BadgeCheck, Clock, Globe2, ShieldCheck } from 'lucide-react'

/* Original, license-free hero artwork: a stylised property skyline plus floating "product" cards.
   Pure SVG/CSS — no image requests, no layout shift. Illustrative figures only (match the calculator defaults). */

export const Skyline: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1200 220"
    preserveAspectRatio="xMidYMax slice"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="sky-a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#27397b" stopOpacity=".55" />
        <stop offset="1" stopColor="#27397b" stopOpacity=".15" />
      </linearGradient>
      <linearGradient id="sky-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1b2a5e" stopOpacity=".9" />
        <stop offset="1" stopColor="#14204a" stopOpacity=".9" />
      </linearGradient>
    </defs>
    {/* far layer */}
    <g fill="url(#sky-a)">
      <rect x="20" y="110" width="70" height="110" />
      <rect x="110" y="70" width="56" height="150" />
      <rect x="190" y="125" width="90" height="95" />
      <rect x="300" y="55" width="64" height="165" />
      <rect x="386" y="100" width="80" height="120" />
      <rect x="490" y="40" width="58" height="180" />
      <rect x="570" y="95" width="96" height="125" />
      <rect x="690" y="65" width="62" height="155" />
      <rect x="776" y="115" width="84" height="105" />
      <rect x="884" y="50" width="66" height="170" />
      <rect x="974" y="105" width="88" height="115" />
      <rect x="1086" y="75" width="70" height="145" />
    </g>
    {/* near layer */}
    <g fill="url(#sky-b)">
      <rect x="0" y="150" width="120" height="70" />
      <rect x="140" y="130" width="76" height="90" />
      <rect x="240" y="160" width="100" height="60" />
      <rect x="365" y="120" width="70" height="100" />
      <rect x="460" y="155" width="110" height="65" />
      <rect x="596" y="135" width="74" height="85" />
      <rect x="696" y="165" width="96" height="55" />
      <rect x="818" y="125" width="72" height="95" />
      <rect x="916" y="158" width="104" height="62" />
      <rect x="1046" y="138" width="154" height="82" />
    </g>
    {/* lit windows */}
    <g fill="#dc4433" opacity=".7">
      <rect x="316" y="80" width="6" height="8" />
      <rect x="332" y="96" width="6" height="8" />
      <rect x="504" y="64" width="6" height="8" />
      <rect x="520" y="88" width="6" height="8" />
      <rect x="704" y="90" width="6" height="8" />
      <rect x="900" y="76" width="6" height="8" />
      <rect x="916" y="100" width="6" height="8" />
      <rect x="126" y="96" width="6" height="8" />
    </g>
  </svg>
)

/* Illustrative example per product (keyed by product slug). Never presented as a real offer. */
const HERO_EXAMPLES: Record<string, { amount: number; product: string; term: string; ltv: number }> = {
  'bridging-loans': { amount: 450_000, product: 'Bridging loan', term: '9 months', ltv: 64 },
  'buy-to-let-mortgages': { amount: 320_000, product: 'Buy-to-let mortgage', term: '5 years', ltv: 75 },
  'development-loans': { amount: 1_500_000, product: 'Development finance', term: '18 months', ltv: 60 },
  'property-auction-finance': { amount: 280_000, product: 'Auction finance', term: '3 months', ltv: 60 },
  'commercial-mortgages': { amount: 1_200_000, product: 'Commercial mortgage', term: '15 years', ltv: 65 },
  'business-loans': { amount: 250_000, product: 'Business loan', term: '3 years', ltv: 50 },
}

const Chip: React.FC<{
  icon: React.ReactNode
  title: string
  text: string
  className?: string
  delay?: string
}> = ({ icon, title, text, className = '', delay = '0s' }) => (
  <div
    className={`animate-float-slow absolute flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-navy-900 shadow-xl shadow-navy-950/30 ${className}`}
    style={{ animationDelay: delay }}
  >
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">{icon}</span>
    <span>
      <span className="block text-sm font-bold leading-tight">{title}</span>
      <span className="block text-xs text-navy-900/55">{text}</span>
    </span>
  </div>
)

export const HeroVisual: React.FC<{ example?: string }> = ({ example = 'bridging-loans' }) => {
  const ex = HERO_EXAMPLES[example] ?? HERO_EXAMPLES['bridging-loans']
  const gbp = (n: number) =>
    n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
  return (
    <div className="relative mx-auto hidden h-[420px] w-full max-w-[480px] lg:block" aria-hidden="true">
      {/* glow */}
      <div className="absolute inset-x-8 top-10 h-64 rounded-full bg-brand-600/20 blur-3xl" />

      {/* main illustrative quote card */}
      <div className="absolute left-1/2 top-8 w-[320px] -translate-x-1/2 rounded-2xl bg-white p-6 text-navy-900 shadow-2xl shadow-navy-950/40">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900/45">Indicative terms</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <BadgeCheck size={12} /> In principle
          </span>
        </div>
        <p className="mt-4 font-serif text-4xl font-bold">{gbp(ex.amount)}</p>
        <p className="text-xs text-navy-900/50">{ex.product} · {ex.term}</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-navy-100">
          <div className="h-full rounded-full bg-brand-600" style={{ width: `${ex.ltv}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-navy-900/55">
          <span>{ex.ltv}% LTV</span>
          <span>{gbp(Math.round(ex.amount / (ex.ltv / 100)))} property</span>
        </div>
        <p className="mt-5 border-t border-navy-100 pt-3 text-[10px] leading-snug text-navy-900/40">
          Illustrative example only — not an offer. Subject to underwriting and valuation.
        </p>
      </div>

      <Chip className="-left-2 top-0" icon={<Clock size={18} />} title="24hr decision" text="Average turnaround" delay="0s" />
      <Chip className="-right-2 top-[19.5rem]" icon={<Globe2 size={18} />} title="Whole of market" text="85+ lenders compared" delay="1.2s" />
      <Chip className="bottom-4 left-0" icon={<ShieldCheck size={18} />} title="FCA authorised" text="FRN 808769" delay="2.4s" />
    </div>
  )
}
