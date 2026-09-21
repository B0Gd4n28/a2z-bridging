import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Montserrat } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { BackToTop } from '@/components/site/BackToTop'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { SITE } from '@/lib/site'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: SITE.legalName,
  url: SITE.domain,
  telephone: '+442077800130',
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '500 Great West Road',
    addressLocality: 'London',
    postalCode: 'TW5 0TE',
    addressCountry: 'GB',
  },
  description:
    'Whole-of-market bridging and commercial finance broker. Bridging loans, buy-to-let mortgages, development finance, auction finance, commercial mortgages and business loans.',
  areaServed: 'GB',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(inter.variable, montserrat.variable)}
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <ScrollProgress />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'A2Z Bridging — Whole-of-Market Bridging & Commercial Finance',
    template: '%s | A2Z Bridging',
  },
  description:
    'Whole-of-market bridging and commercial finance broker. Decisions in 24 hours, a named advisor on every case. FCA authorised, FRN 808769.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
