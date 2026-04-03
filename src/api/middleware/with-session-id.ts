// src/api/middleware/withSessionId.ts

// import { EnhancedRequest } from '@/feature/api/types/request'
import { ApiMiddleware } from '.'
import { EnhancedRequest } from '../types/request'

export const withSessionId: ApiMiddleware = (handler) => {
  return async (req) => {
    ;(req as EnhancedRequest).sessionId = req.headers.get('sessionId') ?? undefined

    return handler(req)
  }
}
