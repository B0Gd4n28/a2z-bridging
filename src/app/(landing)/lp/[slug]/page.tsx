import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CampaignLanding } from '@/components/site/CampaignLanding'
import { ZohoLeadForm } from '@/components/site/ZohoLeadForm'
import { LANDING_ICONS } from '@/lib/landing-icons'
import type { LandingPage } from '@/payload-types'

/* CMS-managed landing pages. The two hand-built pages (/lp/bridging-loans, /lp/commercial-loans)
   and /lp/thank-you are static routes and take precedence over this dynamic one. */

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

async function getLandingPage(slug: string): Promise<LandingPage | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'landing-pages',
      where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })
    return (docs[0] as LandingPage | undefined) ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getLandingPage(slug)
  if (!page) return { title: 'Page not found' }
  return {
    title: { absolute: page.metaTitle || `${page.title} | A2Z Bridging` },
    description: page.metaDescription || page.heroText,
    alternates: { canonical: `/lp/${page.slug}` },
  }
}

export default async function CmsLandingPage({ params }: Props) {
  const { slug } = await params
  const p = await getLandingPage(slug)
  if (!p) notFound()

  const zoho =
    p.formType === 'zoho' && p.zohoFormName && p.zohoXnQsjsdp && p.zohoXmIwtLD ? (
      <ZohoLeadForm
        formName={p.zohoFormName}
        xnQsjsdp={p.zohoXnQsjsdp}
        xmIwtLD={p.zohoXmIwtLD}
        descriptionLabel={p.zohoDescriptionLabel || 'Tell us about your deal'}
      />
    ) : undefined

  return (
    <CampaignLanding
      eyebrow={p.eyebrow}
      titlePre={p.titlePre}
      titleHighlight={p.titleHighlight}
      titlePost={p.titlePost || undefined}
      heroText={p.heroText}
      stats={(p.stats ?? []).map((s) => ({ value: s.value, label: s.label }))}
      infoEyebrow={p.infoEyebrow}
      infoTitle={p.infoTitle}
      infoText={p.infoText}
      infoItems={(p.infoItems ?? []).map((i) => ({
        icon: LANDING_ICONS[i.icon] ?? LANDING_ICONS.ShieldCheck,
        title: i.title,
        text: i.text,
      }))}
      calculatorTitle={p.calculatorTitle}
      calculatorText={p.calculatorText}
      product={p.product}
      minAmount={p.minAmount ?? 50_000}
      variants={[{ label: p.product, rate: 0.0085 }]}
      formSource={`lp-${p.slug}`}
      ctaTitle={p.ctaTitle}
      ctaText={p.ctaText}
      visualExample={p.exampleKey ?? undefined}
      leadForm={zoho}
    />
  )
}
