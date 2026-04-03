import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { Hero, Article, MediaImage } from './Blocks'

export const Page: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [Hero, Article, MediaImage],
    },
  ],
  timestamps: true,
}
