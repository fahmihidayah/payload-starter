import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { createCollectionConfig } from '@/lib/collection/create-config'

export const Posts: CollectionConfig = createCollectionConfig({
  collectionConfig: {
    slug: 'posts',
    admin: {
      useAsTitle: 'title',
      group: 'Content',
    },
    fields: [
      {
        name: 'id',
        type: 'text',
        defaultValue: () => crypto.randomUUID(),
        admin: {
          hidden: true,
        },
      },
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      ...slugField(),
      {
        name: 'content',
        type: 'richText',
        required: true,
        editor: lexicalEditor({
          features: ({ defaultFeatures }) => defaultFeatures,
        }),
      },
      {
        name: 'excerpt',
        type: 'textarea',
        admin: {
          description: 'Short description of the post',
        },
      },
      {
        name: 'featuredImage',
        type: 'upload',
        relationTo: 'media',
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'categories',
        type: 'relationship',
        relationTo: 'categories',
        hasMany: true,
        admin: {
          position: 'sidebar',
        },
      },
      {
        name: 'publishedAt',
        type: 'date',
        admin: {
          position: 'sidebar',
          date: {
            pickerAppearance: 'dayAndTime',
          },
        },
      },
      {
        name: 'status',
        type: 'select',
        options: [
          {
            label: 'Draft',
            value: 'draft',
          },
          {
            label: 'Published',
            value: 'published',
          },
          {
            label: 'Archived',
            value: 'archived',
          },
        ],
        defaultValue: 'draft',
        admin: {
          position: 'sidebar',
        },
      },
    ],
    timestamps: true,
  },
  isPublic: true,
  enableCreatedBy: true,
})
