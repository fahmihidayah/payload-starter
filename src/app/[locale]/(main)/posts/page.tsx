import { getPosts } from '@/features/post'
import { PostList, PostPagination } from '@/features/post/components'
import { Metadata } from 'next'

interface PostsPageProps {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: PostsPageProps): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Blog Posts',
    description: 'Read our latest blog posts and articles',
    openGraph: {
      title: 'Blog Posts',
      description: 'Read our latest blog posts and articles',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog Posts',
      description: 'Read our latest blog posts and articles',
    },
  }
}

export default async function PostsPage({ params, searchParams }: PostsPageProps) {
  const { locale } = await params
  const { page: pageParam } = await searchParams

  const currentPage = pageParam ? parseInt(pageParam) : 1
  const limit = 9

  const { docs: posts, totalPages } = await getPosts(limit, currentPage, 'published')

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog Posts</h1>
        <p className="text-xl text-muted-foreground">
          Explore our latest articles and insights
        </p>
      </div>

      <PostList posts={posts} locale={locale} />

      {totalPages > 1 && (
        <PostPagination currentPage={currentPage} totalPages={totalPages} locale={locale} />
      )}
    </div>
  )
}
