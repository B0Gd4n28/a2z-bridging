import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'A2Z Bridging — fast, whole-of-market bridging and commercial finance for UK property professionals.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: 'A2Z Bridging',
  title: 'A2Z Bridging',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
