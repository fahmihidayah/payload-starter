import { Post } from '@/payload-types'
import { ServiceContext } from '@/types/service-context'
import { ServiceResult } from '@/types/service-result'

export const PostService = {
  findAll: async ({
    serviceContext,
    limit = 100,
    page = 1,
    status = 'published',
  }: {
    serviceContext: ServiceContext
    limit?: number
    page?: number
    status?: 'draft' | 'published' | 'archived'
  }): Promise<
    ServiceResult<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }>
  > => {
    const postsDoc = await serviceContext.payload.find({
      collection: 'posts',
      limit,
      page,
      where: {
        status: {
          equals: status,
        },
      },
      sort: '-publishedAt',
    })
    return {
      data: {
        docs: postsDoc.docs,
        totalDocs: postsDoc.totalDocs,
        totalPages: postsDoc.totalPages,
        page: postsDoc.page || 1,
      },
    }
  },

  findBySlug: async ({
    serviceContext,
    slug,
  }: {
    serviceContext: ServiceContext
    slug: string
  }): Promise<ServiceResult<Post | null>> => {
    const postsDoc = await serviceContext.payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    return {
      data: postsDoc.docs[0] || null,
    }
  },

  findById: async ({
    serviceContext,
    id,
  }: {
    serviceContext: ServiceContext
    id: string
  }): Promise<ServiceResult<Post | null>> => {
    try {
      const post = await serviceContext.payload.findByID({
        collection: 'posts',
        id,
      })
      return {
        data: post,
      }
    } catch {
      return {
        data: null,
        error: true,
        message: 'Post not found',
      }
    }
  },

  findRecent: async ({
    serviceContext,
    limit = 5,
    excludeId,
  }: {
    serviceContext: ServiceContext
    limit?: number
    excludeId?: string
  }): Promise<ServiceResult<Post[]>> => {
    const where: any = {
      status: {
        equals: 'published',
      },
    }

    if (excludeId) {
      where.id = {
        not_equals: excludeId,
      }
    }

    const postsDoc = await serviceContext.payload.find({
      collection: 'posts',
      limit,
      where,
      sort: '-publishedAt',
    })
    return {
      data: postsDoc.docs,
    }
  },

  findByCategory: async ({
    serviceContext,
    categoryId,
    limit = 10,
    page = 1,
  }: {
    serviceContext: ServiceContext
    categoryId: string
    limit?: number
    page?: number
  }): Promise<
    ServiceResult<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }>
  > => {
    const postsDoc = await serviceContext.payload.find({
      collection: 'posts',
      limit,
      page,
      overrideAccess: true,
      where: {
        categories: {
          contains: categoryId,
        },
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
    })
    return {
      data: {
        docs: postsDoc.docs,
        totalDocs: postsDoc.totalDocs,
        totalPages: postsDoc.totalPages,
        page: postsDoc.page || 1,
      },
    }
  },
}
