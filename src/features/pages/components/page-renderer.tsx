import { Page } from '@/payload-types'
import { HeroBlock } from './hero-block'
import { ArticleBlock } from './article-block'
import { MediaImageBlock } from './media-image-block'

interface PageRendererProps {
  page: Page
}

export function PageRenderer({ page }: PageRendererProps) {
  const { layout } = page

  if (!layout || layout.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-muted-foreground">No content available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {layout.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={block.id || index} block={block} />
          case 'article':
            return <ArticleBlock key={block.id || index} block={block} />
          case 'mediaImage':
            return <MediaImageBlock key={block.id || index} block={block} />
          default:
            return null
        }
      })}
    </div>
  )
}
