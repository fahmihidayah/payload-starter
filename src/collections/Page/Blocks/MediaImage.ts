import type { Block } from 'payload'

export const MediaImage: Block = {
  slug: 'mediaImage',
  labels: {
    singular: 'Media Image',
    plural: 'Media Images',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
