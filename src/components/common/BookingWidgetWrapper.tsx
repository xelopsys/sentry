'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/Skeleton'
import { IHotelProps } from '@/types/common'
const BookingWidget = dynamic(
  () =>
    import('@/components/common/BookingWidget').then(
      (mod) => mod.BookingWidget
    ),
  {
    ssr: false,
    loading: () => (
      <div className="bg-gray-10 rounded-3xl p-6 flex flex-col gap-6 lg:sticky lg:top-4 xl:top-6">
        <Skeleton className="h-9 w-full rounded-xl" />
        <div>
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl mt-2" />
          <Skeleton className="bg-primary-100 h-16 w-full rounded-xl mt-4" />
        </div>
        <div className="bg-gray-20 h-px w-full" />
        <div className="flex justify-between items-start">
          <Skeleton className="h-[30px] w-1/2 rounded-xl" />
          <div className="w-1/3">
            <Skeleton className="h-[30px] w-full rounded-xl" />
            <Skeleton className="ml-auto h-4 w-3/4 mt-2 rounded-xl" />
          </div>
        </div>
      </div>
    ),
  }
)

interface IBookingWidgetWrapperProps {
  propertyData: IHotelProps
  currency?: string
  className?: string
}

export const BookingWidgetWrapper = (props: IBookingWidgetWrapperProps) => {
  return <BookingWidget {...props} />
}
