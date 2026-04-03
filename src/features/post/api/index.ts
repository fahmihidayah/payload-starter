import { composeMiddleware } from '@/api/middleware'
import { withLogging } from '@/api/middleware/with-logging'
import { withJsonResponse } from '@/api/middleware/with-json-response'
import { Endpoint, PayloadRequest } from 'payload'
import { PostService } from '../services/post-service'
import { createServiceContext } from '@/types/service-context'

export const postsEndpoints: Endpoint[] = [
  {
    path: '/v1/posts',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const url = new URL(request.url || '', `http://${request.headers.get('host')}`)
      const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 10
      const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page')!) : 1
      const status = (url.searchParams.get('status') as 'draft' | 'published' | 'archived') || 'published'

      const serviceContext = await createServiceContext({ req: request })
      const result = await PostService.findAll({
        serviceContext,
        limit,
        page,
        status,
      })

      if (result.error) {
        return Response.json({ error: true, message: result.message }, { status: 500 })
      }

      return Response.json({
        success: true,
        data: result.data?.docs,
        pagination: {
          total: result.data?.totalDocs,
          totalPages: result.data?.totalPages,
          page: result.data?.page,
          limit,
        },
      })
    }),
  },
  {
    path: '/v1/posts/:slug',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const slug = request.routeParams?.slug

      if (!slug) {
        return Response.json({ error: true, message: 'Slug is required' }, { status: 400 })
      }

      const serviceContext = await createServiceContext({ req: request })
      const result = await PostService.findBySlug({
        serviceContext,
        slug: slug as string,
      })

      if (!result.data) {
        return Response.json({ error: true, message: 'Post not found' }, { status: 404 })
      }

      return Response.json({
        success: true,
        data: result.data,
      })
    }),
  },
  {
    path: '/v1/posts/recent',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const url = new URL(request.url || '', `http://${request.headers.get('host')}`)
      const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 5
      const excludeId = url.searchParams.get('excludeId') || undefined

      const serviceContext = await createServiceContext({ req: request })
      const result = await PostService.findRecent({
        serviceContext,
        limit,
        excludeId,
      })

      return Response.json({
        success: true,
        data: result.data,
        total: result.data?.length || 0,
      })
    }),
  },
  {
    path: '/v1/posts/category/:categoryId',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const categoryId = request.routeParams?.categoryId
      const url = new URL(request.url || '', `http://${request.headers.get('host')}`)
      const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 10
      const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page')!) : 1

      if (!categoryId) {
        return Response.json({ error: true, message: 'Category ID is required' }, { status: 400 })
      }

      const serviceContext = await createServiceContext({ req: request })
      const result = await PostService.findByCategory({
        serviceContext,
        categoryId: categoryId as string,
        limit,
        page,
      })

      return Response.json({
        success: true,
        data: result.data?.docs,
        pagination: {
          total: result.data?.totalDocs,
          totalPages: result.data?.totalPages,
          page: result.data?.page,
          limit,
        },
      })
    }),
  },
]
