import React from 'react'
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Gavel,
  HardHat,
  KeyRound,
  Landmark,
  Layers,
  Link2,
  Store,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react'

/* Per-product hero scenes: each page gets its own composition instead of one shared card.
   Pure SVG/CSS, decorative (aria-hidden). All figures are illustrative examples, never offers. */

const Chip: React.FC<{ icon: React.ReactNode; title: string; text: string; className?: string; delay?: string }> = ({
  icon,
  title,
  text,
  className = '',
  delay = '0s',
}) => (
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

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto hidden h-[420px] w-full max-w-[480px] lg:block" aria-hidden="true">
    <div className="absolute inset-x-8 top-10 h-64 rounded-full bg-brand-600/20 blur-3xl" />
    {children}
  </div>
)

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`absolute rounded-2xl bg-white p-6 text-navy-900 shadow-2xl shadow-navy-950/40 ${className}`}>{children}</div>
)

const Note: React.FC = () => (
  <p className="mt-4 border-t border-navy-100 pt-3 text-[10px] leading-snug text-navy-900/40">
    Illustrative example only — not an offer. Subject to underwriting and valuation.
  </p>
)

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-900/45">{children}</span>
)

/* Bridging: speed — a completion timeline */
export const BridgingScene: React.FC = () => {
  const steps = [
    { day: 'Day 1', text: 'Enquiry and indicative terms' },
    { day: 'Day 3', text: 'Valuation instructed' },
    { day: 'Day 5', text: 'Legals agreed, funds ready' },
    { day: 'Day 7', text: 'Completion' },
  ]
  return (
    <Frame>
      <Card className="left-1/2 top-6 w-[330px] -translate-x-1/2">
        <div className="flex items-center justify-between">
          <Label>Speed to completion</Label>
          <Timer size={16} className="text-brand-600" />
        </div>
        <ol className="relative mt-5 space-y-4 pl-8">
          <span className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-navy-100" />
          {steps.map((s, i) => (
            <li key={s.day} className="relative">
              <span
                className={`absolute -left-8 top-0 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === steps.length - 1 ? 'bg-brand-600 text-white' : 'bg-navy-100 text-navy-900'
                }`}
              >
                {i === steps.length - 1 ? <CheckCircle2 size={14} /> : i + 1}
              </span>
              <p className="text-sm font-bold leading-tight">{s.day}</p>
              <p className="text-xs text-navy-900/55">{s.text}</p>
            </li>
          ))}
        </ol>
        <Note />
      </Card>
      <Chip className="-right-3 top-1" icon={<Link2 size={18} />} title="Chain break" text="Bridge the gap" />
      <Chip className="-left-3 bottom-0" icon={<Gavel size={18} />} title="Auction win" text="Beat the deadline" delay="1.4s" />
      <Chip className="-right-3 bottom-0" icon={<Clock size={18} />} title="24hr decision" text="Average turnaround" delay="2.6s" />
    </Frame>
  )
}

/* Buy-to-let: rental cover gauge over a little house */
export const BuyToLetScene: React.FC = () => (
  <Frame>
    <Card className="left-1/2 top-4 w-[330px] -translate-x-1/2">
      <svg viewBox="0 0 300 110" className="h-24 w-full" aria-hidden="true">
        <rect x="0" y="92" width="300" height="3" rx="1.5" fill="#dde4f5" />
        <path d="M150 12 L212 52 H88 Z" fill="#dc4433" />
        <rect x="100" y="52" width="100" height="40" fill="#27397b" />
        <rect x="140" y="64" width="20" height="28" fill="#f1f4fb" />
        <rect x="110" y="62" width="16" height="14" fill="#f1f4fb" />
        <rect x="174" y="62" width="16" height="14" fill="#f1f4fb" />
        <rect x="232" y="46" width="4" height="46" fill="#14204a" />
        <rect x="224" y="40" width="44" height="18" rx="3" fill="#dc4433" />
        <text x="246" y="53" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">TO LET</text>
      </svg>
      <div className="mt-3 flex items-center justify-between">
        <Label>Rental cover</Label>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">145% ICR</span>
      </div>
      <div className="relative mt-4 h-2.5 rounded-full bg-navy-100">
        <div className="h-full w-[72%] rounded-full bg-brand-600" />
        <span className="absolute -top-1 left-[62%] h-4.5 w-0.5 bg-navy-900" />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-navy-900/50">
        <span>Rent £1,750 / month</span>
        <span>Interest £1,200</span>
      </div>
      <Note />
    </Card>
    <Chip className="-left-3 bottom-0" icon={<Building2 size={18} />} title="SPV / Ltd company" text="Personal or company" />
    <Chip className="-right-3 top-1" icon={<Layers size={18} />} title="HMO &amp; multi-unit" text="Specialist lenders" delay="1.3s" />
    <Chip className="-right-3 bottom-0" icon={<KeyRound size={18} />} title="Portfolio landlords" text="Single or multiple" delay="2.5s" />
  </Frame>
)

/* Development: staged drawdown chart under a crane */
export const DevelopmentScene: React.FC = () => {
  const stages = [
    { label: 'Ground', h: 28 },
    { label: 'Frame', h: 52 },
    { label: 'Fit-out', h: 78 },
    { label: 'Sale', h: 100 },
  ]
  return (
    <Frame>
      <Card className="left-1/2 top-4 w-[340px] -translate-x-1/2">
        <svg viewBox="0 0 300 100" className="h-20 w-full" aria-hidden="true">
          <rect x="0" y="90" width="300" height="4" rx="2" fill="#dde4f5" />
          <rect x="60" y="14" width="6" height="76" fill="#14204a" />
          <rect x="30" y="14" width="150" height="6" fill="#14204a" />
          <rect x="150" y="20" width="2" height="26" fill="#dc4433" />
          <rect x="143" y="46" width="16" height="10" fill="#dc4433" />
          <rect x="26" y="8" width="14" height="10" fill="#27397b" />
          <rect x="200" y="46" width="70" height="44" fill="#27397b" />
          <rect x="210" y="56" width="10" height="10" fill="#f1f4fb" />
          <rect x="228" y="56" width="10" height="10" fill="#f1f4fb" />
          <rect x="246" y="56" width="10" height="10" fill="#f1f4fb" />
          <rect x="210" y="72" width="10" height="10" fill="#f1f4fb" />
        </svg>
        <div className="mt-3 flex items-center justify-between">
          <Label>Funds released in stages</Label>
        </div>
        <div className="mt-3 flex h-24 items-end gap-3">
          {stages.map((s, i) => (
            <div key={s.label} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-md ${i === stages.length - 1 ? 'bg-brand-600' : 'bg-navy-700'}`}
                  style={{ height: `${Math.round(s.h * 0.72)}px` }}
                />
              </div>
              <span className="text-[10px] text-navy-900/55">{s.label}</span>
            </div>
          ))}
        </div>
        <Note />
      </Card>
      <Chip className="-left-3 bottom-0" icon={<HardHat size={18} />} title="Ground-up &amp; refurb" text="Light to heavy" />
      <Chip className="-right-3 top-2" icon={<CheckCircle2 size={18} />} title="Drawn on progress" text="Monitoring surveyor" delay="1.3s" />
      <Chip className="-right-3 bottom-0" icon={<TrendingUp size={18} />} title="Exit planned" text="Sale or refinance" delay="2.5s" />
    </Frame>
  )
}

/* Auction: the 28-day completion clock */
export const AuctionScene: React.FC = () => (
  <Frame>
    <Card className="left-1/2 top-4 w-[320px] -translate-x-1/2 text-center">
      <div className="flex items-center justify-between">
        <Label>Completion clock</Label>
        <Gavel size={16} className="text-brand-600" />
      </div>
      <div className="relative mx-auto mt-4 h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#dde4f5" strokeWidth="10" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#dc4433" strokeWidth="10" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="94" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-5xl font-bold">28</span>
          <span className="text-xs text-navy-900/55">days to complete</span>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-navy-900/70">Hammer falls &rarr; funds ready &rarr; completion</p>
      <Note />
    </Card>
    <Chip className="-left-3 bottom-0" icon={<BadgeCheck size={18} />} title="Decision in principle" text="Before you bid" />
    <Chip className="-right-3 top-1" icon={<Landmark size={18} />} title="Unmortgageable OK" text="Lend on value &amp; exit" delay="1.4s" />
    <Chip className="-right-3 bottom-0" icon={<Clock size={18} />} title="Same-day terms" text="Typically" delay="2.6s" />
  </Frame>
)

/* Commercial: a building with the borrower types we cover */
export const CommercialScene: React.FC = () => (
  <Frame>
    <Card className="left-1/2 top-4 w-[340px] -translate-x-1/2">
      <svg viewBox="0 0 300 120" className="h-20 w-full" aria-hidden="true">
        <rect x="0" y="108" width="300" height="4" rx="2" fill="#dde4f5" />
        <rect x="20" y="40" width="90" height="68" fill="#27397b" />
        <rect x="30" y="52" width="14" height="14" fill="#f1f4fb" />
        <rect x="52" y="52" width="14" height="14" fill="#f1f4fb" />
        <rect x="74" y="52" width="14" height="14" fill="#f1f4fb" />
        <rect x="96" y="52" width="8" height="14" fill="#f1f4fb" />
        <rect x="30" y="76" width="14" height="14" fill="#f1f4fb" />
        <rect x="52" y="76" width="14" height="14" fill="#f1f4fb" />
        <rect x="74" y="76" width="14" height="32" fill="#14204a" />
        <rect x="124" y="64" width="150" height="44" fill="#1b2a5e" />
        <path d="M118 64 L199 36 L280 64 Z" fill="#dc4433" />
        <rect x="140" y="80" width="36" height="28" fill="#f1f4fb" />
        <rect x="190" y="80" width="68" height="28" fill="#27397b" />
        <rect x="196" y="86" width="56" height="4" fill="#f1f4fb" opacity=".6" />
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        {['Owner-occupier', 'Investment', 'Semi-commercial'].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${i === 1 ? 'bg-brand-600 text-white' : 'bg-navy-100 text-navy-900'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-mist py-2.5">
          <p className="font-serif text-xl font-bold">£1.2m</p>
          <p className="text-[11px] text-navy-900/50">Loan</p>
        </div>
        <div className="rounded-lg bg-mist py-2.5">
          <p className="font-serif text-xl font-bold">15 yrs</p>
          <p className="text-[11px] text-navy-900/50">Term</p>
        </div>
      </div>
      <Note />
    </Card>
    <Chip className="-left-3 bottom-0" icon={<Store size={18} />} title="Shops &amp; industrial" text="All asset classes" />
    <Chip className="-right-3 top-0" icon={<Users size={18} />} title="Tenanted or vacant" text="We place both" delay="1.4s" />
    <Chip className="-right-3 bottom-0" icon={<Landmark size={18} />} title="Whole of market" text="85+ lenders compared" delay="2.6s" />
  </Frame>
)

/* Business loans: growth chart */
export const BusinessScene: React.FC = () => (
  <Frame>
    <Card className="left-1/2 top-4 w-[330px] -translate-x-1/2">
      <div className="flex items-center justify-between">
        <Label>Business growth</Label>
        <TrendingUp size={16} className="text-brand-600" />
      </div>
      <svg viewBox="0 0 280 140" className="mt-4 h-36 w-full" aria-hidden="true">
        <line x1="0" y1="130" x2="280" y2="130" stroke="#dde4f5" strokeWidth="2" />
        {[
          { x: 14, h: 30 },
          { x: 66, h: 48 },
          { x: 118, h: 64 },
          { x: 170, h: 88 },
          { x: 222, h: 112 },
        ].map((b, i) => (
          <rect key={b.x} x={b.x} y={130 - b.h} width="40" height={b.h} rx="5" fill={i === 4 ? '#dc4433' : '#27397b'} />
        ))}
        <path d="M34 92 L86 74 L138 58 L190 34 L242 10" fill="none" stroke="#dc4433" strokeWidth="2.5" strokeDasharray="5 5" />
      </svg>
      <div className="mt-3 flex justify-between text-[11px] text-navy-900/50">
        <span>Today</span>
        <span>With the right funding</span>
      </div>
      <Note />
    </Card>
    <Chip className="-left-3 bottom-0" icon={<Layers size={18} />} title="Secured &amp; unsecured" text="Fit to your assets" />
    <Chip className="-right-3 top-1" icon={<Clock size={18} />} title="24–48hr approval" text="Unsecured facilities" delay="1.4s" />
    <Chip className="-right-3 bottom-0" icon={<Store size={18} />} title="Working capital" text="Stock, equipment, growth" delay="2.6s" />
  </Frame>
)

export const HERO_SCENES: Record<string, React.FC> = {
  'bridging-loans': BridgingScene,
  'buy-to-let-mortgages': BuyToLetScene,
  'development-loans': DevelopmentScene,
  'property-auction-finance': AuctionScene,
  'commercial-mortgages': CommercialScene,
  'business-loans': BusinessScene,
}
