import { Post } from '@/payload-types'
import { PostCard } from './post-card'

interface PostListProps {
  posts: Post[]
  locale: string
}

export function PostList({ posts, locale }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  )
}
