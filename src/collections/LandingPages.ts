import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { revalidatePath } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { LANDING_ICON_OPTIONS } from '../lib/landing-icons'

const EXAMPLE_OPTIONS = [
  { label: 'Bridging loan', value: 'bridging-loans' },
  { label: 'Buy-to-let mortgage', value: 'buy-to-let-mortgages' },
  { label: 'Development finance', value: 'development-loans' },
  { label: 'Auction finance', value: 'property-auction-finance' },
  { label: 'Commercial mortgage', value: 'commercial-mortgages' },
  { label: 'Business loan', value: 'business-loans' },
]

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  labels: { singular: 'Landing Page', plural: 'Landing Pages' },
  access: {
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    // Visitors only ever see published pages; logged-in editors see drafts too (for previews).
    read: ({ req: { user } }) => (user ? true : { published: { equals: true } }),
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'published', 'updatedAt'],
    description:
      'Standalone ad landing pages (no site menu) published at /lp/<slug>. Tick "Published" to make a page live. Existing pages /lp/bridging-loans and /lp/commercial-loans are built in code and are not listed here.',
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidatePath(`/lp/${doc.slug}`)
          if (previousDoc?.slug && previousDoc.slug !== doc.slug) revalidatePath(`/lp/${previousDoc.slug}`)
        }
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Internal name, e.g. "Meta Ads — Development Loans".' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'eyebrow', type: 'text', required: true, admin: { description: 'Small badge above the headline.' } },
            {
              type: 'row',
              fields: [
                { name: 'titlePre', type: 'text', required: true, admin: { width: '34%' } },
                { name: 'titleHighlight', type: 'text', required: true, admin: { width: '33%', description: 'Shown in red.' } },
                { name: 'titlePost', type: 'text', admin: { width: '33%' } },
              ],
            },
            { name: 'heroText', type: 'textarea', required: true },
            {
              name: 'exampleKey',
              type: 'select',
              label: 'Illustrative card in hero',
              defaultValue: 'bridging-loans',
              options: EXAMPLE_OPTIONS,
              admin: { description: 'Decides which illustrative example card appears beside the headline on desktop.' },
            },
            {
              name: 'stats',
              type: 'array',
              minRows: 2,
              maxRows: 4,
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                { name: 'value', type: 'text', required: true, admin: { description: 'e.g. £50k–£10m' } },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Info cards',
          fields: [
            { name: 'infoEyebrow', type: 'text', required: true },
            { name: 'infoTitle', type: 'text', required: true },
            { name: 'infoText', type: 'textarea', required: true },
            {
              name: 'infoItems',
              type: 'array',
              minRows: 3,
              maxRows: 3,
              labels: { singular: 'Card', plural: 'Cards' },
              fields: [
                { name: 'icon', type: 'select', required: true, defaultValue: 'ShieldCheck', options: LANDING_ICON_OPTIONS },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Form & CTA',
          fields: [
            { name: 'calculatorTitle', type: 'text', required: true, defaultValue: 'Start Your Enquiry' },
            {
              name: 'calculatorText',
              type: 'textarea',
              required: true,
              defaultValue:
                'Run the numbers, then send us your details — both live on this page. A named advisor calls you back the same day.',
            },
            { name: 'product', type: 'text', required: true, admin: { description: 'Saved with each lead, e.g. "Development Finance".' } },
            { name: 'minAmount', type: 'number', defaultValue: 50000 },
            { name: 'ctaTitle', type: 'text', required: true },
            { name: 'ctaText', type: 'textarea', required: true },
            {
              name: 'formType',
              type: 'select',
              defaultValue: 'internal',
              options: [
                { label: 'Internal form (saves to the Leads collection)', value: 'internal' },
                { label: 'Zoho CRM web-to-lead form', value: 'zoho' },
              ],
            },
            {
              type: 'collapsible',
              label: 'Zoho form details',
              admin: {
                description:
                  'Copy these from the Zoho embed code: the form name, and the values of the hidden fields "xnQsjsdp" and "xmIwtLD".',
                condition: (data) => data?.formType === 'zoho',
              },
              fields: [
                { name: 'zohoFormName', type: 'text', admin: { description: 'The form name, e.g. WebToLeads268536000003406001' } },
                { name: 'zohoXnQsjsdp', type: 'text', label: 'Zoho hidden field "xnQsjsdp"' },
                { name: 'zohoXmIwtLD', type: 'text', label: 'Zoho hidden field "xmIwtLD"' },
                { name: 'zohoDescriptionLabel', type: 'text', defaultValue: 'Tell us about your deal' },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', admin: { description: 'Browser tab / Google title (about 60 characters).' } },
            { name: 'metaDescription', type: 'textarea', admin: { description: 'Google snippet (about 150 characters).' } },
          ],
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Only published pages are visible to the public.' },
    },
    slugField(),
  ],
}
