import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { Hero, Article, MediaImage } from './Blocks'
import { createCollectionConfig } from '@/lib/collection/create-config'

export const Page: CollectionConfig = createCollectionConfig({
  collectionConfig: {
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
  },
  isPublic: false,
  enableCreatedBy: true,
})
