import {
  Access,
  AccessResult,
  CollectionConfig,
  CollectionSlug,
  Field,
  PayloadRequest,
  Where,
} from 'payload'
import { getAccessControl } from './get-access-control'

export function createCollectionConfig(args: {
  collectionConfig: CollectionConfig
  isPublic?: boolean
  enableCreatedBy?: boolean
}): CollectionConfig {
  const { collectionConfig, isPublic = false, enableCreatedBy = true } = args
  const slug = collectionConfig.slug as CollectionSlug

  const createdByField: Field = {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    required: true,
    defaultValue: ({ user }) => user?.id,
    admin: {
      readOnly: true,
      position: 'sidebar',
    },
  }

  const fields = enableCreatedBy
    ? [...collectionConfig.fields, createdByField]
    : collectionConfig.fields

  return {
    ...collectionConfig,
    trash: true,
    fields,
    hooks: collectionConfig.hooks,
    access: {
      read: getAccessControl(slug, 'read', isPublic),
      create: getAccessControl(slug, 'create', isPublic),
      update: getAccessControl(slug, 'update', isPublic),
      delete: getAccessControl(slug, 'delete', isPublic),
    },
    versions: collectionConfig.versions
      ? {
          drafts: {
            autosave: false,
            schedulePublish: true,
          },
          maxPerDoc: 20,
        }
      : undefined,
  }
}
