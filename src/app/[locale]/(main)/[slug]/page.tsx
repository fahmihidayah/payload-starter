import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/features/pages/actions'
import { PageRenderer } from '@/features/pages/components/page-renderer'
import { Media } from '@/payload-types'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return <PageRenderer page={page} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {}
  }

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      images: page.meta?.image
        ? [
            {
              url:
                typeof page.meta.image === 'string'
                  ? page.meta.image
                  : (page.meta.image as Media).url || '',
            },
          ]
        : [],
    },
  }
}
