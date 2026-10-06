import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'product', 'amount', 'status', 'createdAt'],
    group: 'CRM',
    description:
      'Enquiries submitted through the website forms (quote landing, calculator, contact). Update the status as you work each lead.',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Honeypot: real users never see/fill this field — only bots that blindly fill every input do.
        if (data?.company) {
          throw new Error('Spam detected')
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'amount', type: 'number' },
    { name: 'product', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text', admin: { description: 'Page or campaign that generated the lead' } },
    {
      name: 'company',
      type: 'text',
      admin: { hidden: true, description: 'Honeypot field — should always be empty. Non-empty means the submission was spam.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
