'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/Skeleton'

const SortFilter = dynamic(
  () => import('@/components/filters/SortFilter').then((mod) => mod.SortFilter),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-2 lg:grid-cols-6 lg:gap-10 items-end mt-5 mb-6">
        <div className="col-span-4">
          <Skeleton className="h-5 lg:h-6" />
        </div>
        <Skeleton className="h-5 lg:h-6 col-span-2" />
      </div>
    ),
  }
)

interface IFilterWrapperProps {
  filterText: string
  filterLabel: string
  filterOptions: { label: string; value: string }[]
  className?: string
}

export const FilterWrapper = (props: IFilterWrapperProps) => {
  return <SortFilter {...props} />
}
