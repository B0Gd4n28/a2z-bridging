export const CASE_CATEGORY_LABELS: Record<string, string> = {
  bridging: 'Bridging',
  auction: 'Auction Finance',
  btl: 'Buy-to-Let',
  development: 'Development',
  commercial: 'Commercial',
  business: 'Business Loans',
}

export const CASE_CATEGORY_LINKS: Record<string, string> = {
  bridging: '/bridging-loans',
  auction: '/property-auction-finance',
  btl: '/buy-to-let-mortgages',
  development: '/development-loans',
  commercial: '/commercial-mortgages',
  business: '/business-loans',
}

export const splitParagraphs = (s?: string | null): string[] =>
  (s ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

export const splitLines = (s?: string | null): string[] =>
  (s ?? '')
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean)
