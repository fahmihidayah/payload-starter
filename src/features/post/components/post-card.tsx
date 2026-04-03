import { Post, Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
  locale: string
}

export function PostCard({ post, locale }: PostCardProps) {
  const featuredImage = post.featuredImage as Media | undefined
  const imageUrl = featuredImage?.url || '/placeholder-post.jpg'

  return (
    <Link
      href={`/${locale}/posts/${post.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {featuredImage?.url && (
          <Image
            src={imageUrl}
            alt={featuredImage.alt || post.title || 'Post image'}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {formatDate(new Date(post.publishedAt))}
            </time>
          )}
        </div>
        <h3 className="mb-2 text-xl font-semibold line-clamp-2 group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        )}
      </div>
    </Link>
  )
}
