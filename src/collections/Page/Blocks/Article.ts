import type { Block } from 'payload'

export const Article: Block = {
  slug: 'article',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
