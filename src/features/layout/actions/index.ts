'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { HeaderService } from '../services/header-service'
import { FooterService } from '../services/footer-service'
import { Header, Footer } from '@/payload-types'

/**
 * Get header configuration from global settings
 */
export const getHeader = async (): Promise<Header | null> => {
  try {
    const result = await HeaderService.getHeader({
      serviceContext: {
        payload: await getPayload({ config }),
      },
    })
    return result.data ?? null
  } catch {
    return null
  }
}

/**
 * Get footer configuration from global settings
 */
export const getFooter = async (): Promise<Footer | null> => {
  try {
    const result = await FooterService.getFooter({
      serviceContext: {
        payload: await getPayload({ config }),
      },
    })
    return result.data ?? null
  } catch {
    return null
  }
}
