export type PostStatus = 'draft' | 'published' | 'archived'

export interface PostFilter {
  status?: PostStatus
  category?: string
  page?: number
  limit?: number
}
