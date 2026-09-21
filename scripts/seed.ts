/* Seed initial A2Z content. Run: npm run seed */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const richText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

const TEAM = [
  { name: 'Zain Rashid', role: 'Senior Finance Advisor', bio: '8 years arranging bridging and development finance. Known for untangling complex, multi-property cases.', tags: ['Bridging', 'Development'], order: 1 },
  { name: 'Ani Karapetyan', role: 'Bridging Specialist', bio: 'Specialises in fast-turnaround cases where two other lenders have already declined.', tags: ['Bridging', 'Chain Break'], order: 2 },
  { name: 'Fatima Noor', role: 'Commercial Advisor', bio: 'Focused on commercial mortgages and business loans for owner-occupiers and investors.', tags: ['Commercial', 'Business Loans'], order: 3 },
  { name: 'Syed Ahmed', role: 'Auction Finance Lead', bio: "Built A2Z's auction finance process around the 28-day completion deadline.", tags: ['Auction', 'Fast Completion'], order: 4 },
  { name: 'Abbas Karimi', role: 'Buy-to-Let Specialist', bio: 'Works with individual landlords and portfolio investors across standard and specialist BTL.', tags: ['Buy-to-Let', 'Portfolio'], order: 5 },
  { name: 'Priya Shah', role: 'Client Onboarding Lead', bio: 'Your first point of contact — matches every enquiry to the right specialist advisor.', tags: ['Onboarding', 'All Products'], order: 6 },
]

const TESTIMONIALS = [
  { quote: 'Zain kept me updated every step — completed in 11 days.', author: 'Tanveer', context: 'Bridging loan, London', featured: true },
  { quote: 'Ani found a lender when two banks had already said no.', author: 'Ryan', context: 'Auction purchase', featured: true },
  { quote: 'Clear, honest advice from the first call to completion.', author: 'Tabs Singh', context: 'Commercial mortgage', featured: true },
  { quote: 'Syed got terms agreed within 24 hours of my call.', author: 'Aman Malhotra', context: 'Auction finance', featured: true },
  { quote: 'Some of the most competitive rates in the market and a seamless process throughout.', author: 'Sabah Al-Badri', context: 'Portfolio refinance', featured: false },
]

const GUIDES = [
  {
    title: 'What Is a Bridging Loan? A Plain-English Guide',
    slug: 'what-is-a-bridging-loan',
    description: 'The basics of short-term property finance, explained without the jargon.',
    paragraphs: [
      'A bridging loan is short-term finance secured against property, designed to "bridge" a gap — most often the gap between buying one property and selling another, or between an auction win and arranging longer-term finance.',
      'Unlike a standard mortgage, bridging loans are built for speed. Where a mortgage application might take six to eight weeks, a bridging loan can complete in days when the case is straightforward.',
      'The most common scenarios we see are: buying a new home before your current one has sold, completing an auction purchase within the 28-day deadline, funding a light refurbishment before refinancing onto a term mortgage, and raising quick capital against property for a business opportunity.',
      'Bridging loans are priced monthly rather than annually, typically between 0.55% and 1.05% per month depending on loan-to-value and case complexity, plus an arrangement fee usually around 2%.',
      'Lenders will want a clear exit strategy — usually a property sale or a remortgage onto a standard mortgage — along with a valuation of the security property and standard identity/AML checks.',
    ],
  },
  {
    title: 'Bridging vs. Remortgage: Which Is Right for You?',
    slug: 'bridging-vs-remortgage',
    description: 'How to decide between the two based on speed, cost, and your exit plan.',
    paragraphs: [
      'Bridging finance and remortgaging can both release money from property — but they solve very different problems.',
      'A remortgage is usually cheaper over time but slow: expect six to eight weeks from application to funds. Bridging is faster — days rather than weeks — but priced monthly, so it suits short timeframes with a clear exit.',
      'Choose bridging when the opportunity has a deadline: an auction completion, a chain break, or a purchase that will not wait. Choose a remortgage when time is on your side and the funds are needed for the long term.',
      'A good broker will often combine the two: bridge now to secure the property, then exit onto a remortgage once the work is done or the sale completes.',
    ],
  },
  {
    title: 'How Auction Finance Works — And Why Speed Matters',
    slug: 'how-auction-finance-works',
    description: 'Navigating the 28-day completion deadline without losing your deposit.',
    paragraphs: [
      'When the hammer falls at a property auction, you exchange contracts on the spot and typically have 28 days to complete. Miss the deadline and you can lose your 10% deposit.',
      'Auction finance is bridging finance built around exactly this deadline. Specialist lenders can issue a decision in principle before you bid, run valuation and legals in parallel, and complete well inside 28 days.',
      'The key is preparation: speak to a broker before auction day, know your maximum bid and borrowing capacity, and have your solicitor ready to move as soon as you win the lot.',
      'Our fastest auction completion took nine days from first contact — including a case two high-street banks had already declined.',
    ],
  },
]

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'team-members' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Seed skipped — team members already exist.')
    process.exit(0)
  }

  payload.logger.info('Seeding team members…')
  const teamDocs = []
  for (const m of TEAM) {
    const doc = await payload.create({
      collection: 'team-members',
      data: { ...m, tags: m.tags.map((tag) => ({ tag })) },
      context: { disableRevalidate: true },
    })
    teamDocs.push(doc)
  }

  payload.logger.info('Seeding testimonials…')
  for (const t of TESTIMONIALS) {
    await payload.create({ collection: 'testimonials', data: t, context: { disableRevalidate: true } })
  }

  payload.logger.info('Seeding case study…')
  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'Completing an Auction Purchase in 9 Days After Two Banks Said No',
      slug: 'auction-completion-in-9-days',
      category: 'auction',
      stats: { loanAmount: '£310,000', ltv: '68%', term: '6 months', timeToCompletion: '9 days' },
      challengeTitle: 'A 28-Day Deadline, and Two Declines Already Behind Them',
      challenge:
        "Our client won a mixed-use property at auction with the standard 28-day completion deadline. Two high-street lenders had already declined the case over the property's commercial ground floor — leaving under three weeks to find finance or lose their deposit.",
      solutionTitle: 'A Whole-of-Market Search Found the Right Lender in Days',
      solution:
        "Advisor Ani Karapetyan took the case directly to three specialist lenders on A2Z's panel who were comfortable with mixed-use security, securing terms within 48 hours and moving straight to valuation and legal work.",
      outcomeTitle: 'Completed With Five Days to Spare',
      outcome:
        'Funds were released nine days after first contact — five days ahead of the auction deadline — and the client refinanced onto a standard commercial mortgage six months later once the property was let.',
      advisor: teamDocs.find((d) => d.name === 'Ani Karapetyan')?.id,
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info('Seeding guides…')
  const users = await payload.find({ collection: 'users', limit: 1 })
  const authorId = users.docs[0]?.id

  for (const g of GUIDES) {
    await payload.create({
      collection: 'posts',
      draft: false,
      data: {
        title: g.title,
        slug: g.slug,
        content: richText(g.paragraphs) as never,
        publishedAt: new Date().toISOString(),
        authors: authorId ? [authorId] : undefined,
        meta: { title: `${g.title} | A2Z Bridging`, description: g.description },
        _status: 'published',
      },
      context: { disableRevalidate: true },
    })
  }

  payload.logger.info('✅ Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
