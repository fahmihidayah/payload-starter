import { notFound } from 'next/navigation'
import { getPostBySlug, getRecentPosts } from '@/features/post'
import { PostHeader, PostContent, RecommendedPosts } from '@/features/post/components'
import { Metadata } from 'next'
import { Media } from '@/payload-types'

interface PostPageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const seoTitle = post.meta?.title || post.title
  const seoDescription = post.meta?.description || post.excerpt || ''
  const seoImage = post.meta?.image || post.featuredImage

  const imageUrl = seoImage
    ? typeof seoImage === 'string'
      ? seoImage
      : (seoImage as Media).url || ''
    : ''

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const recommendedPosts = await getRecentPosts(3, post.id)

  return (
    <div className="w-full">
      <PostHeader post={post} locale={locale} />
      <PostContent post={post} />
      <RecommendedPosts posts={recommendedPosts} locale={locale} />
    </div>
  )
}
