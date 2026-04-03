'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { PostService } from '../services/post-service'

export const getPosts = async (
  limit?: number,
  page?: number,
  status: 'draft' | 'published' | 'archived' = 'published',
): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> => {
  try {
    const posts = await PostService.findAll({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      limit,
      page,
      status,
    })
    return (
      posts.data ?? {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
      }
    )
  } catch {
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
    }
  }
}

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const post = await PostService.findBySlug({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      slug,
    })
    return post.data ?? null
  } catch {
    return null
  }
}

export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const post = await PostService.findById({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      id,
    })
    return post.data ?? null
  } catch {
    return null
  }
}

export const getRecentPosts = async (limit?: number, excludeId?: string): Promise<Post[]> => {
  try {
    const posts = await PostService.findRecent({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      limit,
      excludeId,
    })
    return posts.data ?? []
  } catch {
    return []
  }
}

export const getPostsByCategory = async (
  categoryId: string,
  limit?: number,
  page?: number,
): Promise<{ docs: Post[]; totalDocs: number; totalPages: number; page: number }> => {
  try {
    const posts = await PostService.findByCategory({
      serviceContext: {
        payload: await getPayload({
          config,
        }),
      },
      categoryId,
      limit,
      page,
    })
    return (
      posts.data ?? {
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
      }
    )
  } catch {
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
    }
  }
}
