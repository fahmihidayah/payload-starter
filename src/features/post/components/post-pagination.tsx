'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PostPaginationProps {
  currentPage: number
  totalPages: number
  locale: string
}

export function PostPagination({ currentPage, totalPages, locale }: PostPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/${locale}/posts?${params.toString()}`)
  }

  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const showPages = pages.filter((page) => {
    if (page === 1 || page === totalPages) return true
    if (page >= currentPage - 1 && page <= currentPage + 1) return true
    return false
  })

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {showPages.map((page, index) => {
        const prevPage = showPages[index - 1]
        const showEllipsis = prevPage && page - prevPage > 1

        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="px-2 text-muted-foreground">...</span>}
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          </div>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
