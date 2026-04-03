import { Media, Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

type HeroBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

interface HeroBlockProps {
  block: HeroBlock
}

export function HeroBlock({ block }: HeroBlockProps) {
  const { heading, subheading, backgroundImage, ctaButton } = block

  return (
    <section className="relative w-full overflow-hidden">
      {backgroundImage && typeof backgroundImage !== 'string' && (
        <div className="absolute inset-0 z-0">
          <Image
            src={(backgroundImage as Media)?.url || ''}
            alt={(backgroundImage as Media)?.alt || heading}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{heading}</h1>

          {subheading && <p className="text-xl md:text-2xl text-white/90 mb-8">{subheading}</p>}

          {ctaButton?.label && ctaButton?.link && (
            <Button asChild size="lg" className="text-lg">
              <Link href={ctaButton.link}>{ctaButton.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
