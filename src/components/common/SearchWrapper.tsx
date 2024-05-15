'use client'

import dynamic from 'next/dynamic'

const SearchBar = dynamic(
  () => import('@/components/common/SearchBar').then((mod) => mod.SearchBar),
  {
    ssr: false,
  }
)
const MobileSearchBar = dynamic(
  () =>
    import('@/components/common/MobileSearchBar').then(
      (mod) => mod.MobileSearchBar
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-8 gap-0.5">
        <Skeleton className="lg:hidden rounded-xl h-[55px] col-span-8" />
        <Skeleton className="hidden lg:block rounded-none rounded-l-xl h-16 col-span-3" />
        <Skeleton className="hidden lg:block rounded-none h-16 col-span-2" />
        <Skeleton className="hidden lg:block rounded-none h-16 col-span-2" />
        <Skeleton className="hidden lg:block rounded-none rounded-r-xl h-16" />
      </div>
    ),
  }
)

import { Skeleton } from '@/components/ui/Skeleton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { ILocationProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IFilterSearchWrapperProps {
  location: ILocationProps
  className?: string
}

export const SearchWrapper = ({
  location,
  className,
}: IFilterSearchWrapperProps) => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const direction = useScrollDirection()
  const clsx = cn(
    'sticky top-0 left-0 right-0 z-30 bg-white py-4',
    direction === 'up' && isMobile && 'top-14',
    className
  )

  return (
    <div className={clsx}>
      <SearchBar
        searchedLocation={location}
        className="grow hidden md:flex"
        isResult
      />
      <MobileSearchBar
        searchedLocation={location}
        className="grow flex md:hidden"
      />
    </div>
  )
}
