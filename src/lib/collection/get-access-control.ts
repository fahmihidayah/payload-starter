import { Role } from '@/payload-types'
import { Access, AccessResult, CollectionSlug, PayloadRequest, Where } from 'payload'

export const getAccessControl = (
  collectionSlug: CollectionSlug,
  operation: 'read' | 'create' | 'update' | 'delete',
  isPublic = false,
): Access => {
  return (({
    data,
    id,
    isReadingStaticFile,
    req,
  }: {
    data?: any
    id?: string
    isReadingStaticFile?: boolean
    req: PayloadRequest
  }): AccessResult => {
    const user = req.user

    // Public access for read operations if specified
    if (isPublic && operation === 'read') {
      return true
    }

    // Require authentication
    if (!user) {
      return false
    }

    const role = user.role as Role

    // Admin has full access
    if (role.name === 'admin') {
      return true
    }

    // Find role permissions for this collection
    const permissions = role?.permissions?.find(
      (permission) => permission.collection === collectionSlug,
    )

    // No permissions defined for this collection
    if (!permissions) {
      return false
    }

    // Check if the operation is allowed
    const hasPermission = permissions.actions?.[operation] ?? false

    if (!hasPermission) {
      return false
    }

    // For read and create, role permission is sufficient
    if (operation === 'read' || operation === 'create') {
      return true
    }

    // For update and delete, restrict to documents created by the user
    if (operation === 'update' || operation === 'delete') {
      return {
        createdBy: {
          equals: user.id,
        },
      }
    }

    return false
  }) as Access
}
