import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Layout',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Footer Links',
          fields: [
            {
              name: 'linkSections',
              type: 'array',
              label: 'Link Sections',
              fields: [
                {
                  name: 'sectionTitle',
                  type: 'text',
                  label: 'Section Title',
                  required: false,
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Links',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'type',
                      type: 'select',
                      required: true,
                      defaultValue: 'page',
                      options: [
                        {
                          label: 'Internal Page',
                          value: 'page',
                        },
                        {
                          label: 'External URL',
                          value: 'url',
                        },
                      ],
                    },
                    {
                      name: 'page',
                      type: 'relationship',
                      relationTo: 'pages',
                      required: false,
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'page',
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      required: false,
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'url',
                      },
                    },
                    {
                      name: 'openInNewTab',
                      type: 'checkbox',
                      defaultValue: false,
                      admin: {
                        condition: (_, siblingData) => siblingData?.type === 'url',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Newsletter',
          fields: [
            {
              name: 'showNewsletterForm',
              type: 'checkbox',
              label: 'Show Newsletter Subscription Form',
              defaultValue: true,
            },
            {
              name: 'newsletterTitle',
              type: 'text',
              label: 'Newsletter Title',
              defaultValue: 'Subscribe to our Newsletter',
              admin: {
                condition: (data) => data?.showNewsletterForm === true,
              },
            },
            {
              name: 'newsletterDescription',
              type: 'textarea',
              label: 'Newsletter Description',
              maxLength: 200,
              admin: {
                condition: (data) => data?.showNewsletterForm === true,
              },
            },
            {
              name: 'newsletterButtonText',
              type: 'text',
              label: 'Button Text',
              defaultValue: 'Subscribe',
              admin: {
                condition: (data) => data?.showNewsletterForm === true,
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Platform',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
                {
                  name: 'customIconName',
                  type: 'text',
                  label: 'Custom Icon Name (if Other)',
                  admin: {
                    condition: (_, siblingData) => siblingData?.platform === 'other',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Copyright',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Copyright Text',
              defaultValue: '© 2026 All rights reserved.',
            },
            {
              name: 'additionalInfo',
              type: 'textarea',
              label: 'Additional Information',
              maxLength: 300,
            },
          ],
        },
      ],
    },
  ],
}
