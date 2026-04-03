import { usersEndpoints } from '@/features/auth/api'
import { pagesEndpoints } from '@/features/pages/api'
import { postsEndpoints } from '@/features/post/api'
import { Endpoint } from 'payload'
export const endpointsV1: Endpoint[] = [...usersEndpoints, ...pagesEndpoints, ...postsEndpoints]
