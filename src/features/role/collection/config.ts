import { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'name',
    group: 'User Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'A brief description of this role and its purpose',
      },
    },
    {
      name: 'permissions',
      type: 'array',
      label: 'Permissions',
      admin: {
        description: 'Define granular permissions for each collection',
      },
      fields: [
        {
          name: 'collection',
          type: 'select',
          required: true,
          label: 'Collection',
          options: [
            { label: 'Users', value: 'users' },
            { label: 'Roles', value: 'roles' },
            { label: 'Posts', value: 'posts' },
            { label: 'Categories', value: 'categories' },
            { label: 'Media', value: 'media' },
            { label: 'Pages', value: 'pages' },
          ],
          admin: {
            description: 'Select which collection this permission applies to',
          },
        },
        {
          name: 'actions',
          type: 'group',
          label: 'Actions',
          admin: {
            description: 'Select which actions are allowed for this collection',
          },
          fields: [
            {
              name: 'create',
              type: 'checkbox',
              label: 'Create',
              defaultValue: false,
            },
            {
              name: 'read',
              type: 'checkbox',
              label: 'Read',
              defaultValue: false,
            },
            {
              name: 'update',
              type: 'checkbox',
              label: 'Update',
              defaultValue: false,
            },
            {
              name: 'delete',
              type: 'checkbox',
              label: 'Delete',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
