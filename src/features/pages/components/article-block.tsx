import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ArticleBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'article' }>

interface ArticleBlockProps {
  block: ArticleBlock
}

export function ArticleBlock({ block }: ArticleBlockProps) {
  const { content } = block

  if (!content) return null

  return (
    <article className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <RichText data={content} />
        </div>
      </div>
    </article>
  )
}
