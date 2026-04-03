import { Page } from '@/payload-types'
import { ServiceContext } from '@/types/service-context'
import { ServiceResult } from '@/types/service-result'

export const PageService = {
  findAll: async ({
    serviceContext,
    limit = 100,
  }: {
    serviceContext: ServiceContext
    limit?: number
  }): Promise<ServiceResult<Page[]>> => {
    const pagesDoc = await serviceContext.payload.find({
      collection: 'pages',
      limit,
      sort: '-createdAt',
    })
    return {
      data: pagesDoc.docs,
    }
  },

  findBySlug: async ({
    serviceContext,
    slug,
  }: {
    serviceContext: ServiceContext
    slug: string
  }): Promise<ServiceResult<Page | null>> => {
    const pagesDoc = await serviceContext.payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    return {
      data: pagesDoc.docs[0] || null,
    }
  },

  findById: async ({
    serviceContext,
    id,
  }: {
    serviceContext: ServiceContext
    id: string
  }): Promise<ServiceResult<Page | null>> => {
    try {
      const page = await serviceContext.payload.findByID({
        collection: 'pages',
        id,
      })
      return {
        data: page,
      }
    } catch {
      return {
        data: null,
        error: true,
        message: 'Page not found',
      }
    }
  },

  findRecent: async ({
    serviceContext,
    limit = 5,
  }: {
    serviceContext: ServiceContext
    limit?: number
  }): Promise<ServiceResult<Page[]>> => {
    const pagesDoc = await serviceContext.payload.find({
      collection: 'pages',
      limit,
      sort: '-createdAt',
    })
    return {
      data: pagesDoc.docs,
    }
  },
}
