import { composeMiddleware } from '@/features/api/middleware'
import { withLogging } from '@/features/api/middleware/with-logging'
import { withJsonResponse } from '@/features/api/middleware/with-json-response'
import { Endpoint, PayloadRequest } from 'payload'
import { PageService } from '../services/page-service'
import { createServiceContext } from '@/types/service-context'

export const pagesEndpoints: Endpoint[] = [
  {
    path: '/v1/pages',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const url = new URL(request.url || '', `http://${request.headers.get('host')}`)
      const limit = url.searchParams.get('limit')
        ? parseInt(url.searchParams.get('limit')!)
        : 100

      const serviceContext = await createServiceContext({ req: request })
      const result = await PageService.findAll({
        serviceContext,
        limit,
      })

      if (result.error) {
        return Response.json(
          { error: true, message: result.message },
          { status: 500 },
        )
      }

      return Response.json({
        success: true,
        data: result.data,
        total: result.data?.length || 0,
      })
    }),
  },
  {
    path: '/v1/pages/:slug',
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
      const result = await PageService.findBySlug({
        serviceContext,
        slug: slug as string,
      })

      if (!result.data) {
        return Response.json({ error: true, message: 'Page not found' }, { status: 404 })
      }

      return Response.json({
        success: true,
        data: result.data,
      })
    }),
  },
  {
    path: '/v1/pages/recent',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withJsonResponse,
    )(async (request: PayloadRequest): Promise<Response> => {
      const url = new URL(request.url || '', `http://${request.headers.get('host')}`)
      const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 5

      const serviceContext = await createServiceContext({ req: request })
      const result = await PageService.findRecent({
        serviceContext,
        limit,
      })

      return Response.json({
        success: true,
        data: result.data,
        total: result.data?.length || 0,
      })
    }),
  },
]
