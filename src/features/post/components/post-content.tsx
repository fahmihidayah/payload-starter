import { Post } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface PostContentProps {
  post: Post
}

export function PostContent({ post }: PostContentProps) {
  if (!post.content) return null

  return (
    <article className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
          <RichText data={post.content} />
        </div>
      </div>
    </article>
  )
}
