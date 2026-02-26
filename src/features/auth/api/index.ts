import { composeMiddleware } from '@/features/api/middleware'
import { withAuth } from '@/features/api/middleware/with-auth'
import { withLogging } from '@/features/api/middleware/with-logging'
import { Endpoint, PayloadRequest } from 'payload'

export const usersEndpoints: Endpoint[] = [
  {
    path: '/v1/user/me',
    method: 'get',
    handler: composeMiddleware(
      withLogging,
      withAuth,
    )(async (request: PayloadRequest): Promise<Response> => {
      return Response.json(request.user)
    }),
  },
]
