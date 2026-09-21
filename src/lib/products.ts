export type Product = {
  slug: string
  navLabel: string
  title: string
  heroTitle: string
  heroText: string
  eyebrow: string
  letter: string
  cardText: string
  stats: { value: string; label: string }[]
  steps: { title: string; text: string }[]
  rates?: { type: string; rate: string; ltv: string; term: string }[]
  faqs: { q: string; a: string }[]
  metaTitle: string
  metaDescription: string
}

export const PRODUCTS: Product[] = [
  {
    slug: 'bridging-loans',
    navLabel: 'Bridging Loans',
    title: 'Bridging Loans',
    eyebrow: 'Bridging Loans',
    letter: 'B',
    heroTitle: 'Bridge the Gap in Days, Not Months',
    heroText:
      'Short-term finance to complete a purchase, cover a chain break, or fund a time-sensitive opportunity — with a named advisor managing your case from first call to completion.',
    cardText: 'Short-term finance to complete a purchase before your onward sale or refinance completes.',
    stats: [
      { value: '£50k–£10m', label: 'Loan range' },
      { value: 'Up to 75%', label: 'Loan-to-value' },
      { value: '1–24 months', label: 'Term length' },
      { value: '24 hours', label: 'Typical decision' },
    ],
    steps: [
      { title: 'Tell Us Your Needs', text: 'A short call or form to understand your situation, timeline, and the property involved.' },
      { title: 'We Search the Panel', text: 'Your advisor compares terms across our whole-of-market lender panel on your behalf.' },
      { title: 'Complete the Application', text: 'We handle the paperwork and liaise directly with the lender and your solicitor.' },
      { title: 'Receive Your Funds', text: 'Funds are released on completion — typically within days of formal offer.' },
    ],
    rates: [
      { type: 'Regulated bridging (residential)', rate: '0.55% – 0.85%', ltv: '75%', term: '1–12 months' },
      { type: 'Unregulated bridging (investment)', rate: '0.60% – 0.95%', ltv: '70%', term: '1–18 months' },
      { type: 'Heavy refurbishment bridging', rate: '0.70% – 1.05%', ltv: '65%', term: '3–24 months' },
    ],
    faqs: [
      { q: 'How fast can a bridging loan complete?', a: 'Straightforward cases can complete in as little as 5–7 working days from a full application; more complex cases typically take 2–3 weeks.' },
      { q: 'What can I use a bridging loan for?', a: 'Common uses include chain breaks, auction purchases, downsizing before a sale completes, and short-term cash flow against property.' },
      { q: 'Do I need an exit strategy?', a: 'Yes — lenders require a clear, credible exit route, typically a property sale or refinance onto a longer-term mortgage.' },
    ],
    metaTitle: 'Bridging Loans — Decisions in 24 Hours | A2Z Bridging',
    metaDescription:
      'Whole-of-market bridging loans from £50k to £10m, up to 75% LTV. Named advisor on every case, typical decision within 24 hours. FCA authorised broker.',
  },
  {
    slug: 'buy-to-let-mortgages',
    navLabel: 'Buy-to-Let',
    title: 'Buy-to-Let Mortgages',
    eyebrow: 'Buy-to-Let',
    letter: 'BL',
    heroTitle: 'Build Your Portfolio With the Right BTL Terms',
    heroText:
      'Standard and specialist BTL mortgages for individual landlords, portfolio investors, and limited companies — sourced across the whole market by a named advisor.',
    cardText: 'Standard and specialist BTL mortgages for individual landlords and portfolio investors.',
    stats: [
      { value: '£75k–£5m', label: 'Loan range' },
      { value: 'Up to 80%', label: 'Loan-to-value' },
      { value: '2–30 years', label: 'Term length' },
      { value: '24 hours', label: 'Typical decision' },
    ],
    steps: [
      { title: 'Tell Us Your Needs', text: 'Your property, rental income, and whether you buy personally or via a limited company.' },
      { title: 'We Search the Panel', text: 'We compare rates and stress tests across mainstream and specialist BTL lenders.' },
      { title: 'Complete the Application', text: 'We package the case and manage the lender, valuer, and solicitors for you.' },
      { title: 'Receive Your Offer', text: 'Formal mortgage offer issued — you complete on your schedule.' },
    ],
    faqs: [
      { q: 'Can I get a BTL mortgage through a limited company?', a: 'Yes — SPV limited company BTL is now one of the most common structures, and many specialist lenders price it competitively.' },
      { q: 'What rental coverage do lenders require?', a: 'Most lenders stress-test at 125%–145% of the mortgage payment depending on your tax band and the product.' },
      { q: 'Do you handle HMOs and multi-unit blocks?', a: 'Yes — we work with specialist lenders covering HMOs, MUFBs, holiday lets, and mixed-use property.' },
    ],
    metaTitle: 'Buy-to-Let Mortgages for Landlords & SPVs | A2Z Bridging',
    metaDescription:
      'Whole-of-market buy-to-let mortgages for individual landlords, portfolio investors, and limited companies. HMO, MUFB and specialist BTL covered.',
  },
  {
    slug: 'development-loans',
    navLabel: 'Development',
    title: 'Development Finance',
    eyebrow: 'Development Finance',
    letter: 'D',
    heroTitle: 'Funding From Ground-Up Builds to Heavy Refurbs',
    heroText:
      'Development finance for ground-up builds, conversions, and heavy refurbishment projects — structured around your build programme and exit.',
    cardText: 'Funding for ground-up builds, conversions, and heavy refurbishment projects.',
    stats: [
      { value: '£100k–£25m', label: 'Facility size' },
      { value: 'Up to 70% GDV', label: 'Leverage' },
      { value: '6–36 months', label: 'Term length' },
      { value: '48 hours', label: 'Typical decision' },
    ],
    steps: [
      { title: 'Share Your Appraisal', text: 'Site details, build costs, GDV, and your experience — a one-page summary is enough to start.' },
      { title: 'We Structure the Deal', text: 'Your advisor matches the facility to your build programme, drawdowns, and exit.' },
      { title: 'Valuation & Monitoring', text: 'We coordinate the valuer and monitoring surveyor to keep the timeline on track.' },
      { title: 'Draw Down in Stages', text: 'Funds released against build progress, with interest typically rolled up.' },
    ],
    faqs: [
      { q: 'Do I need development experience?', a: 'Experience helps but is not always essential — first-time developers can be placed with the right lender, often alongside an experienced contractor.' },
      { q: 'How are funds released?', a: 'In arrears against certified build progress, verified by the lender’s monitoring surveyor at each drawdown.' },
      { q: 'What exit routes do lenders accept?', a: 'Sale of the completed units or refinance onto a development exit / term facility are the standard routes.' },
    ],
    metaTitle: 'Development Finance up to 70% GDV | A2Z Bridging',
    metaDescription:
      'Development loans for ground-up builds, conversions and heavy refurbishments. £100k–£25m, staged drawdowns, whole-of-market lender access.',
  },
  {
    slug: 'property-auction-finance',
    navLabel: 'Auction Finance',
    title: 'Auction Finance',
    eyebrow: 'Auction Finance',
    letter: 'A',
    heroTitle: 'Built Around the 28-Day Auction Deadline',
    heroText:
      'Fast-turnaround funding built around the tight 28-day auction completion deadline — so you never risk losing your deposit.',
    cardText: 'Fast-turnaround funding built around the tight 28-day auction completion deadline.',
    stats: [
      { value: '£50k–£5m', label: 'Loan range' },
      { value: 'Up to 75%', label: 'Loan-to-value' },
      { value: '9 days', label: 'Fastest completion' },
      { value: 'Same day', label: 'Decision in principle' },
    ],
    steps: [
      { title: 'Call Before You Bid', text: 'Get an agreement in principle before auction day so you bid with confidence.' },
      { title: 'Win the Lot', text: 'Exchange happens on the day — your 28-day countdown starts immediately.' },
      { title: 'We Fast-Track the Case', text: 'Valuation and legals run in parallel with lenders who understand auction deadlines.' },
      { title: 'Complete on Time', text: 'Funds released well inside the deadline — our fastest case completed in 9 days.' },
    ],
    faqs: [
      { q: 'Can you really complete within 28 days?', a: 'Yes — auction finance is designed for exactly this. Our fastest completion was 9 days from first contact.' },
      { q: 'Should I arrange finance before bidding?', a: 'Ideally yes. A decision in principle before auction day means you know your budget and can move immediately after the hammer falls.' },
      { q: 'What if the property is unmortgageable?', a: 'Bridging lenders regularly fund properties mainstream banks decline — no kitchen, no bathroom, structural issues, or mixed use.' },
    ],
    metaTitle: 'Auction Finance — Complete Inside 28 Days | A2Z Bridging',
    metaDescription:
      'Property auction finance built for the 28-day deadline. Same-day decisions in principle, completions in as little as 9 days. FCA authorised broker.',
  },
  {
    slug: 'commercial-mortgages',
    navLabel: 'Commercial Mortgages',
    title: 'Commercial Mortgages',
    eyebrow: 'Commercial Mortgages',
    letter: 'C',
    heroTitle: 'Long-Term Finance for Commercial Property',
    heroText:
      'Long-term finance for owner-occupied and investment commercial property — offices, retail, industrial, semi-commercial, and more.',
    cardText: 'Long-term finance for owner-occupied and investment commercial property.',
    stats: [
      { value: '£25k–£20m', label: 'Loan range' },
      { value: 'Up to 75%', label: 'Loan-to-value' },
      { value: '5–30 years', label: 'Term length' },
      { value: '48 hours', label: 'Typical decision' },
    ],
    steps: [
      { title: 'Tell Us About the Property', text: 'The asset, tenancy or trading position, and what the finance needs to achieve.' },
      { title: 'We Search the Panel', text: 'High-street and specialist commercial lenders compared on rate, term, and covenants.' },
      { title: 'Complete the Application', text: 'We package accounts, leases, and valuations so underwriting moves quickly.' },
      { title: 'Receive Your Offer', text: 'Formal offer issued and drawdown coordinated with your solicitor.' },
    ],
    faqs: [
      { q: 'Owner-occupier or investment — do you cover both?', a: 'Both. We arrange mortgages for trading businesses buying their premises and for investors purchasing tenanted commercial property.' },
      { q: 'What deposit do I need?', a: 'Typically 25%–40% depending on the asset class, tenant strength, and whether the property is owner-occupied.' },
      { q: 'Do you handle semi-commercial property?', a: 'Yes — mixed-use assets such as shops with flats above are a core part of what we place.' },
    ],
    metaTitle: 'Commercial Mortgages for Owner-Occupiers & Investors | A2Z Bridging',
    metaDescription:
      'Whole-of-market commercial mortgages from £25k to £20m. Offices, retail, industrial and semi-commercial. FCA authorised broker.',
  },
  {
    slug: 'business-loans',
    navLabel: 'Business Loans',
    title: 'Business Loans',
    eyebrow: 'Business Loans',
    letter: '£',
    heroTitle: 'Working Capital That Keeps Pace With Your Business',
    heroText:
      'Secured and unsecured funding to support cash flow and growth — term loans, revolving facilities, and asset-backed lending.',
    cardText: 'Secured and unsecured funding to support cash flow and growth.',
    stats: [
      { value: '£25k–£2m', label: 'Loan range' },
      { value: '1–7 years', label: 'Term length' },
      { value: 'Unsecured', label: 'Options available' },
      { value: '24 hours', label: 'Typical decision' },
    ],
    steps: [
      { title: 'Tell Us Your Needs', text: 'What the funds are for, how much you need, and your trading history.' },
      { title: 'We Match the Lender', text: 'Banks, challenger lenders, and fintechs compared on speed, rate, and flexibility.' },
      { title: 'Complete the Application', text: 'We prepare the application and financials so approval moves quickly.' },
      { title: 'Receive Your Funds', text: 'Unsecured facilities can pay out within days of approval.' },
    ],
    faqs: [
      { q: 'Do I need to offer security?', a: 'Not always — unsecured loans up to around £250k are available for established businesses, usually with a personal guarantee.' },
      { q: 'How long does approval take?', a: 'Unsecured facilities can be approved within 24–48 hours; secured lending typically takes 1–3 weeks.' },
      { q: 'What will lenders look at?', a: 'Trading history, turnover, profitability, and existing commitments — we help you present these in the strongest light.' },
    ],
    metaTitle: 'Business Loans — Secured & Unsecured Funding | A2Z Bridging',
    metaDescription:
      'Business loans from £25k to £2m, secured and unsecured. Fast decisions from banks, challengers, and fintech lenders via one FCA authorised broker.',
  },
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
