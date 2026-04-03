import { Post } from '@/payload-types'
import { PostCard } from './post-card'

interface RecommendedPostsProps {
  posts: Post[]
  locale: string
}

export function RecommendedPosts({ posts, locale }: RecommendedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="w-full border-t bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold">Recommended Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
