'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination'

interface ICustomPaginationProps {
  activePage: number
  onPageChange: (page: number) => void
  numberOfPages: number
  className?: string
}

export const CustomPagination = ({
  activePage,
  onPageChange,
  numberOfPages,
  className,
}: ICustomPaginationProps) => {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (activePage > 1) {
                onPageChange(activePage - 1)
              }
            }}
            className={
              activePage <= 1 ? 'pointer-events-none text-gray-20' : ''
            }
          />
        </PaginationItem>

        {Array.from({ length: numberOfPages }, (_, i) => {
          const page = i + 1
          const isCurrent = page === activePage

          if (
            page === 1 ||
            page === numberOfPages ||
            (page >= activePage - 1 && page <= activePage + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={() => !isCurrent && onPageChange(page)}
                  className={isCurrent ? 'bg-primary-100 text-white' : ''}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          }

          if (page === activePage - 2 || page === activePage + 2) {
            return <PaginationEllipsis key={page} />
          }

          return null
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (activePage !== numberOfPages) {
                onPageChange(activePage + 1)
              }
            }}
            className={
              activePage === numberOfPages
                ? 'pointer-events-none text-gray-20'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
