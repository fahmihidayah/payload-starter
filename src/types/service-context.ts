'use server'
import { User } from '@/payload-types'
import { getPayload, Payload } from 'payload'
import config from '@payload-config'
import { EnhancedRequest } from '@/api/types/request'
export type ServiceContext = {
  payload: Payload
  user?: User | null
  sessionId?: string
}

export async function createServiceContext({
  req,
  user,
  sessionId,
}: {
  req?: EnhancedRequest
  user?: User | null
  sessionId?: string
}): Promise<ServiceContext> {
  return {
    payload: req ? req.payload : await getPayload({ config }),
    user: user ? user : (req?.user ?? undefined),
    sessionId: sessionId ? sessionId : (req?.sessionId ?? undefined),
  }
}
