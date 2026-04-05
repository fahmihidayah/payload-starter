import {
  Access,
  AccessResult,
  CollectionConfig,
  CollectionSlug,
  Field,
  GlobalConfig,
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

export function createGlobalConfig(args: {
  globalConfig: GlobalConfig
  isPublic?: boolean
  enableCreatedBy?: boolean
}): GlobalConfig {
  const { globalConfig, isPublic = false, enableCreatedBy = true } = args
  const slug = globalConfig.slug as CollectionSlug

  const fields = globalConfig.fields

  return {
    ...globalConfig,
    fields,
    hooks: globalConfig.hooks,
    access: {
      read: getAccessControl(slug, 'read', isPublic),
      update: getAccessControl(slug, 'update', isPublic),
    },
    versions: globalConfig.versions
      ? {
          drafts: {
            autosave: false,
            schedulePublish: true,
          },
        }
      : undefined,
  }
}
