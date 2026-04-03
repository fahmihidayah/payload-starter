import { Media, Page } from '@/payload-types'
import Image from 'next/image'

type MediaImageBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'mediaImage' }>

interface MediaImageBlockProps {
  block: MediaImageBlock
}

export function MediaImageBlock({ block }: MediaImageBlockProps) {
  const { image, caption, alt } = block

  if (!image || typeof image === 'string') return null

  return (
    <figure className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={(image as Media).url || ''}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {caption && (
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </div>
      </div>
    </figure>
  )
}
