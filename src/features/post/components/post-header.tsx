import { Post, Media, Category } from '@/payload-types'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface PostHeaderProps {
  post: Post
  locale: string
}

export function PostHeader({ post, locale }: PostHeaderProps) {
  const featuredImage = post.featuredImage as Media | undefined
  const categories = post.categories as Category[] | undefined

  return (
    <header className="w-full border-b bg-muted/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {categories && categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${locale}/posts?category=${category.id}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>

          {post.excerpt && (
            <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
          )}

          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(new Date(post.publishedAt))}
              </time>
            )}
          </div>

          {featuredImage?.url && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title || 'Post featured image'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
