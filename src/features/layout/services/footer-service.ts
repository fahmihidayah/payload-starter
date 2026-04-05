import { Footer } from '@/payload-types'
import { ServiceContext } from '@/types/service-context'
import { ServiceResult } from '@/types/service-result'

export const FooterService = {
  /**
   * Get footer global configuration
   */
  getFooter: async ({
    serviceContext,
  }: {
    serviceContext: ServiceContext
  }): Promise<ServiceResult<Footer | null>> => {
    try {
      const footer = await serviceContext.payload.findGlobal({
        slug: 'footer',
        overrideAccess: true,
      })

      return { data: footer as Footer }
    } catch (error) {
      return {
        data: null,
        error: true,
        message: error instanceof Error ? error.message : 'Failed to fetch footer configuration',
      }
    }
  },
}
