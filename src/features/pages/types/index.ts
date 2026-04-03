import { Page } from '@/payload-types'

export type PageWithMeta = Page & {
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | null
  }
}

export type PageBlock =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'article' }>
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'mediaImage' }>
