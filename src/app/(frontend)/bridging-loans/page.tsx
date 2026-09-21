import type { Metadata } from 'next'
import { ProductPage } from '@/components/site/ProductPage'
import { getProduct } from '@/lib/products'

const product = getProduct('bridging-loans')!

export const metadata: Metadata = {
  title: { absolute: product.metaTitle },
  description: product.metaDescription,
  alternates: { canonical: `/${product.slug}` },
}

export default function Page() {
  return <ProductPage product={product} />
}
