import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Layout',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company Info',
          fields: [
            {
              name: 'companyLogo',
              type: 'upload',
              relationTo: 'media',
              label: 'Company Logo',
              required: false,
            },
            {
              name: 'companyTitle',
              type: 'text',
              label: 'Company Title',
              required: true,
              defaultValue: 'My Company',
            },
            {
              name: 'companyBriefDescription',
              type: 'textarea',
              label: 'Company Brief Description',
              required: false,
              maxLength: 200,
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'showAuthLinks',
              type: 'checkbox',
              label: 'Show Login/Register Links',
              defaultValue: true,
            },
            {
              name: 'showSearch',
              type: 'checkbox',
              label: 'Show Search Input',
              defaultValue: true,
            },
            {
              name: 'navigationLinks',
              type: 'array',
              label: 'Navigation Links',
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
        {
          label: 'Settings',
          fields: [
            {
              name: 'stickyHeader',
              type: 'checkbox',
              label: 'Sticky Header',
              defaultValue: false,
            },
            {
              name: 'transparentOnTop',
              type: 'checkbox',
              label: 'Transparent When at Top',
              defaultValue: false,
            },
            {
              name: 'showThemeToggle',
              type: 'checkbox',
              label: 'Show Theme Toggle (Dark/Light Mode)',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
