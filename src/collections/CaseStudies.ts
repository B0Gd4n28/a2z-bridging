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
    { name: 'challengeTitle', type: 'text' },
    { name: 'challenge', type: 'textarea' },
    { name: 'solutionTitle', type: 'text' },
    { name: 'solution', type: 'textarea' },
    { name: 'outcomeTitle', type: 'text' },
    { name: 'outcome', type: 'textarea' },
    { name: 'advisor', type: 'relationship', relationTo: 'team-members' },
  ],
}
