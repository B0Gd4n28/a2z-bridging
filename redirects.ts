import type { NextConfig } from 'next'

// 301 map from the old WordPress site (a2zbridging.co.uk) to the new routes.
// Source: A2Z-Site-Migration-Map.xlsx (sheet "Redirects"). Trailing slashes are normalised by Next.js,
// so each path only needs listing once.
const OLD_TO_NEW: [string, string][] = [
  ['/uks-leading-commercial-finance-broker', '/'],
  ['/services', '/'],
  ['/services/bridging-loans', '/bridging-loans'],
  ['/services/buy-to-let-mortgages', '/buy-to-let-mortgages'],
  ['/services/development-loans', '/development-loans'],
  ['/services/property-auction-finance', '/property-auction-finance'],
  ['/services/commercial-mortgages', '/commercial-mortgages'],
  ['/services/business-loans', '/business-loans'],
  ['/bridging-finance-specialists-uk', '/team'],
  ['/contact-us', '/contact'],
  ['/explore-a2z-bridging-services-for-smarter-uk-property-finance', '/'],
  ['/what-is-a-bridging-loan', '/guides/what-is-a-bridging-loan'],
  ['/category/blog', '/case-studies'],
  ['/category/blog/page/:page*', '/case-studies'],
  ['/author/a2zbridging', '/team'],
  ['/auction-finance-case-study-uk', '/case-studies/auction-finance-750000-28-days'],
  ['/527500-buy-to-let-remortgage-at-59-ltv-london', '/case-studies/buy-to-let-remortgage-london-527500'],
  ['/bridging-loan-northwood', '/case-studies/bridging-loan-northwood-7-days'],
  ['/buy-to-let-mortgage-north-finchley', '/case-studies/buy-to-let-mortgage-north-finchley'],
  ['/commercial-mortgage-vat-loan-warehouse-ilford', '/case-studies/commercial-mortgage-vat-loan-ilford'],
  ['/semi-commercial-auction-bridging-loan-berkshire', '/case-studies/semi-commercial-auction-bridging-berkshire'],
  ['/commercial-bridging-loan-desktop-valuation-dover', '/case-studies/commercial-bridging-desktop-valuation-dover'],
  ['/derelict-pub-bridging-loan-leicester', '/case-studies/derelict-pub-bridging-loan-leicester'],
  ['/auction-bridging-loan-canary-wharf', '/case-studies/auction-bridging-loan-canary-wharf'],
  ['/second-charge-bridging-loan-bedford', '/case-studies/second-charge-bridging-loan-bedford'],
  ['/commercial-re-bridge-leicester-2-44m', '/case-studies/commercial-re-bridge-leicester'],
  ['/buy-to-let-mortgage-leicester', '/case-studies/buy-to-let-mortgage-leicester'],
  ['/commercial-warehouse-bridging-loan-newcastle', '/case-studies/warehouse-bridging-loan-newcastle'],
  ['/warehouse-commercial-mortgage-brentford', '/case-studies/warehouse-commercial-mortgage-brentford'],
  ['/second-charge-bridging-loan-716500-hayes', '/case-studies/second-charge-bridging-loan-hayes'],
  ['/avm-bridging-loan-ryde-143000', '/case-studies/avm-bridging-loan-ryde'],
  ['/spv-buy-to-let-mortgage-newport-153000', '/case-studies/spv-buy-to-let-mortgage-newport'],
  ['/second-charge-bridging-loan-london', '/case-studies/second-charge-bridging-loan-london'],
  ['/commercial-mortgage-wembley-900000-retail', '/case-studies/commercial-mortgage-wembley-retail'],
  ['/high-ltv-bridging-loan-90-percent-southall', '/case-studies/90-ltv-bridging-loan-southall'],
  ['/buy-to-let-mortgage-brentford-320000', '/case-studies/buy-to-let-mortgage-brentford'],
  ['/buy-to-let-bridging-loan-london', '/case-studies/buy-to-let-bridging-loan-london'],
  ['/semi-commercial-bridging-loan-kingston-upon-thames-24-hours', '/case-studies/semi-commercial-bridging-loan-kingston-24-hours'],
  ['/8-million-commercial-loan-industrial-asset', '/case-studies/8m-commercial-loan-industrial'],
  ['/semi-commercial-remortgage-600000-75-ltv', '/case-studies/semi-commercial-remortgage-600000'],
  ['/warehouse-refinance-hounslow', '/case-studies/warehouse-refinance-hounslow'],
  ['/semi-commercial-bridging-loan-1100000-acquisition', '/case-studies/semi-commercial-bridging-loan-1-1m-acquisition'],
  ['/550000-rescue-finance-completed-to-prevent-receivership', '/case-studies/rescue-bridging-finance-receivership'],
  ['/bridging-finance-completion-687000-secured-in-3-days', '/case-studies/bridging-finance-completed-3-days'],
]

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const wwwToApex = {
    source: '/:path*',
    has: [{ type: 'host' as const, value: 'www.a2zbridging.co.uk' }],
    destination: 'https://a2zbridging.co.uk/:path*',
    permanent: true,
  }

  const legacy = OLD_TO_NEW.map(([source, destination]) => ({
    source: source.includes(':') ? source : `${source}{/}?`,
    destination,
    permanent: true,
  }))

  // Everything else: strip a trailing slash (replaces Next's built-in redirect, see skipTrailingSlashRedirect).
  const stripTrailingSlash = { source: '/:path+/', destination: '/:path+', permanent: true }

  return [internetExplorerRedirect, wwwToApex, ...legacy, stripTrailingSlash]
}
