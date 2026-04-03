'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Page } from '@/payload-types'
import { PageService } from '../services/page-service'

export const getPages = async (limit?: number): Promise<Page[]> => {
  try {
    const pages = await PageService.findAll({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      limit,
    })
    return pages.data ?? []
  } catch {
    return []
  }
}

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  try {
    const page = await PageService.findBySlug({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      slug,
    })
    return page.data ?? null
  } catch {
    return null
  }
}

export const getPageById = async (id: string): Promise<Page | null> => {
  try {
    const page = await PageService.findById({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      id,
    })
    return page.data ?? null
  } catch {
    return null
  }
}

export const getRecentPages = async (limit?: number): Promise<Page[]> => {
  try {
    const pages = await PageService.findRecent({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      limit,
    })
    return pages.data ?? []
  } catch {
    return []
  }
}
