// src/middleware/withJsonResponse.ts
import type { ApiMiddleware } from '.'
import { ApiError } from '../types/response'

export const withJsonResponse: ApiMiddleware = (handler) => {
  return async (req) => {
    try {
      const result = await handler(req)

      // Already a Response — pass through
      if (result instanceof Response) return result

      // Plain object — convert to Response.json()
      return Response.json(result)
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json({ success: false, error: error.message }, { status: error.status })
      }

      console.error('[API] Unhandled error:', error)
      return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
    }
  }
}
