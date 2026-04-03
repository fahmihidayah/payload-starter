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
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Hero, Article, MediaImage],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  admin: {
                    description: 'SEO title (recommended: 50-60 characters)',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'SEO description (recommended: 150-160 characters)',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Social sharing image (Open Graph/Twitter Card)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
