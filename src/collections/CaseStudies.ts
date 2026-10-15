import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
    group: 'Content',
    description: 'Success stories shown at /case-studies — challenge, solution, outcome, and key numbers.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ position: undefined }),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Bridging', value: 'bridging' },
        { label: 'Auction Finance', value: 'auction' },
        { label: 'Buy-to-Let', value: 'btl' },
        { label: 'Development', value: 'development' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Business Loans', value: 'business' },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'loanAmount', type: 'text', label: 'Loan amount (e.g. £310,000)' },
        { name: 'ltv', type: 'text', label: 'Loan-to-value (e.g. 68%)' },
        { name: 'term', type: 'text', label: 'Term (e.g. 6 months)' },
        { name: 'timeToCompletion', type: 'text', label: 'Time to completion (e.g. 9 days)' },
      ],
    },
    { name: 'challengeTitle', type: 'text', admin: { description: 'Legacy short-form field. Used only when no Article sections are set.' } },
    { name: 'challenge', type: 'textarea' },
    { name: 'solutionTitle', type: 'text' },
    { name: 'solution', type: 'textarea' },
    { name: 'outcomeTitle', type: 'text' },
    { name: 'outcome', type: 'textarea' },
    { name: 'advisor', type: 'relationship', relationTo: 'team-members' },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro (shown under the title)',
    },
    { name: 'location', type: 'text', label: 'Location (e.g. Northwood)' },
    {
      name: 'snapshot',
      type: 'array',
      label: 'Deal snapshot',
      admin: { description: 'Label / value pairs shown in the "Deal Snapshot" panel (e.g. Property Value — £560,000).' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Article sections',
      admin: { description: 'The story: scenario, what could have gone wrong, the solution, etc.' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Standard', value: 'default' },
            { label: 'Risk / what could go wrong', value: 'risk' },
            { label: 'Solution', value: 'solution' },
          ],
        },
        { name: 'body', type: 'textarea', label: 'Paragraphs (separate with a blank line)' },
        { name: 'bullets', type: 'textarea', label: 'Bullet points (one per line)' },
      ],
    },
    {
      name: 'outcomeStats',
      type: 'array',
      label: 'Outcome figures',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: { position: 'sidebar', description: 'Search-result title (about 50–60 characters).' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Search-result description (about 150 characters).' },
    },
    {
      name: 'oldUrl',
      type: 'text',
      label: 'Old website URL',
      admin: { position: 'sidebar', description: 'Original WordPress path (reference only; redirect is configured in code).' },
    },
  ],
}
