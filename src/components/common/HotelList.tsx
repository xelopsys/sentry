'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

import { CustomPagination } from '@/components/ui/CustomPagination'
import { SkeletonHotelCard } from '@/components/ui/SkeletonHotelCard'
import { useFilterStore } from '@/hooks/useFilterStore'
import { usePaginationStore } from '@/hooks/usePaginationStore'
import { useSearchBarStore } from '@/hooks/useSearchBarStore'
import { ICoordinatesProps, IHotelProps } from '@/types/common'
import { IStrapiItem } from '@/types/strapi'
import { recordClickout } from '@/utils/analytics'
import { cn, wait } from '@/utils/common'
import {
  ELEMENT_HOTEL_RECOMMENDED,
  ELEMENT_LOCATION_HOTEL_CARD,
  getBookingLabel,
} from '@/utils/getBookingLabel'
import { getFormattedQueryParams } from '@/utils/getFormattedQueryParams'
import { getProviderUrl } from '@/utils/getProviderUrl'
import { hotelsFilterPagination } from '@/utils/hotelsFilterPagination'
import { getHotelUrl } from '@/utils/url'

const HotelCard = dynamic(
  () => import('@/components/ui/HotelCard').then((mod) => mod.HotelCard),
  {
    ssr: false,
    loading: () => (
      <SkeletonHotelCard className="pb-5 border-b border-gray-20 last:border-b-0 last:pb-0 first:border-t-0 first:pt-0" />
    ),
  }
)

interface IHotelListProps {
  locationName: string
  locationCoordinates: ICoordinatesProps
  items: IStrapiItem<IHotelProps>[]
  hotelSourceId?: string
  className?: string
}

export const HotelList = ({
  locationCoordinates,
  locationName,
  items,
  hotelSourceId,
  className,
}: IHotelListProps) => {
  const { searchBarValues } = useSearchBarStore()
  const { page: pageNum, sourceId } = usePaginationStore()
  const [isLoading, setIsLoading] = useState(false)
  const [gclid, setgclid] = useState('')

  // state for pagination
  const [page, setPage] = useState(pageNum)
  const maxItems = 20
  const numberOfPages = Math.ceil(items?.length / maxItems)

  const { filter } = useFilterStore()
  const { data } = useQuery({
    queryKey: [`hotels-${locationName}`],
    initialData: items,
  })

  const clsx = cn(
    'flex flex-col gap-5 border-t border-b border-gray-20 mt-2 mb-5 py-5',
    className
  )

  const { filteredHotels } = hotelsFilterPagination(
    data,
    {
      topRated: filter === 'top-rated',
      priceAsc: filter === 'price-asc',
      priceDesc: filter === 'price-desc',
      distanceAsc: filter === 'distance-asc',
      distanceDesc: filter === 'distance-desc',
    },
    {
      page,
      pageSize: maxItems,
    },
    locationCoordinates
  )

  const handlePageChange = useCallback((page: number) => {
    setPage(page)

    window.scrollTo({
      top: 404,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  const { checkIn, checkOut, guests } = getFormattedQueryParams({
    checkIn: searchBarValues?.checkIn,
    checkOut: searchBarValues?.checkOut,
    guests: searchBarValues?.guests,
  })

  let hotels = filteredHotels
  if (hotelSourceId) {
    hotels = filteredHotels.filter(
      (hotel) => hotel.attributes.sourceId !== hotelSourceId
    )
  }

  // if one of searchBarValues is changed, show skeleton, make mock delay
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [
    searchBarValues?.checkIn,
    searchBarValues?.checkOut,
    searchBarValues?.guests,
  ])

  useEffect(() => {
    const gclidLocaleStorage = localStorage.getItem('gclid')
    if (gclidLocaleStorage) {
      setgclid(gclidLocaleStorage)
    }
  }, [])

  useEffect(() => {
    setPage(pageNum)
  }, [pageNum])

  useEffect(() => {
    if (sourceId)
      wait(400).then(() => {
        const element = document.getElementById(sourceId)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          })
        }
      })
  }, [sourceId])

  return (
    <div>
      <div className={clsx}>
        {isLoading && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonHotelCard
                key={`${index}-skeleton`}
                className="pt-5 border-t border-gray-20 last:border-b-0 last:pb-0 first:border-t-0 first:pt-0"
              />
            ))}
          </>
        )}
        {!isLoading &&
          hotels &&
          hotels.map((hotel) => (
            <HotelCard
              locationCoordinates={locationCoordinates}
              locationName={locationName}
              key={hotel.id}
              onClickOut={() => {
                recordClickout(
                  hotelSourceId ? 'hotel-recommeded' : 'location-card',
                  hotel?.id
                )
              }}
              hotel={{
                ...hotel.attributes,
                slug: getHotelUrl(hotel.attributes.slug),
                sourceUrl: getProviderUrl({
                  label: getBookingLabel({
                    element: hotelSourceId
                      ? ELEMENT_HOTEL_RECOMMENDED
                      : ELEMENT_LOCATION_HOTEL_CARD,
                    hotelId: hotel?.id,
                    gclid,
                  }),
                  latitude: locationCoordinates.latitude,
                  longitude: locationCoordinates.longitude,
                  destId: hotel.attributes.sourceId,
                  destType: 'hotel',
                  destName: hotel.attributes.name,
                  checkIn,
                  checkOut,
                  guests,
                }),
              }}
              className="pb-5 border-b border-gray-20 last:border-b-0 last:pb-0"
            />
          ))}
      </div>

      {numberOfPages > 1 && (
        <CustomPagination
          activePage={page}
          onPageChange={handlePageChange}
          numberOfPages={numberOfPages}
          className="max-w-[782px] mt-5 lg:mt-9"
        />
      )}
    </div>
  )
}
