import { Header } from '@/payload-types'
import { ServiceContext } from '@/types/service-context'
import { ServiceResult } from '@/types/service-result'

export const HeaderService = {
  /**
   * Get header global configuration
   */
  getHeader: async ({
    serviceContext,
  }: {
    serviceContext: ServiceContext
  }): Promise<ServiceResult<Header | null>> => {
    try {
      const header = await serviceContext.payload.findGlobal({
        slug: 'header',
        overrideAccess: true,
      })

      return { data: header as Header }
    } catch (error) {
      return {
        data: null,
        error: true,
        message: error instanceof Error ? error.message : 'Failed to fetch header configuration',
      }
    }
  },
}
