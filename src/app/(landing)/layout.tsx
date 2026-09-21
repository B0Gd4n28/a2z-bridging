import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Montserrat } from 'next/font/google'
import React from 'react'

import { LandingHeader } from '@/components/site/LandingHeader'
import { LandingFooter } from '@/components/site/LandingFooter'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { BackToTop } from '@/components/site/BackToTop'
import { getServerSideURL } from '@/utilities/getURL'

import '../(frontend)/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' })

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(inter.variable, montserrat.variable)}
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ScrollProgress />
        <LandingHeader />
        <main>{children}</main>
        <LandingFooter />
        <BackToTop />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  robots: { index: true, follow: true },
}
