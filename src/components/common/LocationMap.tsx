'use client'

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { memo, useState } from 'react'

import { HotelMapCard } from '@/components/common/HotelMapCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { useActiveHotelStore } from '@/hooks/useActiveHotelStore'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { usePaginationStore } from '@/hooks/usePaginationStore'
import { useSearchBarStore } from '@/hooks/useSearchBarStore'
import { MainLocationIcon } from '@/res/icons'
import { ICoordinatesProps, IHotelProps } from '@/types/common'
import { cn, getPriceCategory, getStrapiImage } from '@/utils/common'
import {
  ELEMENT_HOTEL_RECOMMENDED,
  ELEMENT_LOCATION_HOTEL_CARD,
  getBookingLabel,
} from '@/utils/getBookingLabel'
import { getFormattedQueryParams } from '@/utils/getFormattedQueryParams'
import { getProviderUrl } from '@/utils/getProviderUrl'

interface ILocationMapProps {
  location: ICoordinatesProps
  hotelPrice?: string
  nearPlaces?: IHotelProps[]
  className?: string
}

export const LocationMap = memo(
  ({ location, nearPlaces, hotelPrice, className }: ILocationMapProps) => {
    const { activeHotel } = useActiveHotelStore()
    const { setPage } = usePaginationStore()
    const [isLoaded, setIsLoaded] = useState(false)
    const [openedHotel, setOpenedHotel] = useState<IHotelProps | null>(null)
    const [link, setLink] = useState<string>('')
    const [index, setindex] = useState<number>()
    const [position, setPosition] = useState<{
      lat: number
      long: number
    } | null>(null)

    const { currency } = useCurrencyStore()
    const maxItems = 20
    // Hotel map card image
    const images = openedHotel?.photos?.data
    const image =
      images && images.length > 0 ? getStrapiImage(images[0]) : undefined

    const clxs = cn(
      'rounded-3xl overflow-hidden w-full grow shrink-0',
      '[&>div]:border-transparent',
      className
    )

    const { searchBarValues } = useSearchBarStore()

    const { checkIn, checkOut, guests } = getFormattedQueryParams({
      checkIn: searchBarValues?.checkIn,
      checkOut: searchBarValues?.checkOut,
      guests: searchBarValues?.guests,
    })

    const handlePageChange = () => {
      const page = Math.ceil(Number(index) / maxItems)
      setPage({
        page: page > 0 ? page : 1,
        sourceId: openedHotel?.sourceId as string,
      })
    }

    if (!location) return null

    return (
      <div className={clxs}>
        {!isLoaded && <Skeleton className="w-full grow shrink-0" />}
        <APIProvider
          onLoad={() => setIsLoaded(true)}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        >
          <Map
            defaultCenter={{
              lat: location?.latitude,
              lng: location?.longitude,
            }}
            defaultZoom={13}
            maxZoom={16}
            minZoom={10}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''}
            disableDefaultUI
            scrollwheel
          >
            {nearPlaces &&
              nearPlaces.length > 0 &&
              nearPlaces.map((h) => {
                const formattedPriceCategory = getPriceCategory(
                  h?.priceCategory || '$$',
                  currency
                )

                return (
                  <AdvancedMarker
                    onClick={({ latLng }) => {
                      const url = getProviderUrl({
                        label: getBookingLabel({
                          element: h?.sourceId
                            ? ELEMENT_HOTEL_RECOMMENDED
                            : ELEMENT_LOCATION_HOTEL_CARD,
                          hotelId: h?.id,
                        }),
                        latitude: location.latitude,
                        longitude: location.longitude,
                        destId: h?.sourceId,
                        destType: 'hotel',
                        destName: h?.name,
                        checkIn,
                        checkOut,
                        guests,
                      })
                      setLink(url)
                      setOpenedHotel(h)
                      setindex(nearPlaces.findIndex((n) => n === h))
                      if (latLng) {
                        setPosition({
                          lat: latLng.lat(),
                          long: latLng.lng(),
                        })
                      }
                    }}
                    key={`${h.coordinates.latitude}-${h.coordinates.longitude}`}
                    position={{
                      lat: h.coordinates.latitude,
                      lng: h.coordinates.longitude,
                    }}
                  >
                    <CustomPin
                      price={formattedPriceCategory}
                      pinActive={activeHotel?.sourceId === h.sourceId}
                    />
                  </AdvancedMarker>
                )
              })}

            <AdvancedMarker
              key={'main-location'}
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            >
              {hotelPrice ? (
                <CustomPin price={hotelPrice} pinActive />
              ) : (
                <MainLocationIcon className="text-primary-100" />
              )}
            </AdvancedMarker>

            {openedHotel && position && (
              <AdvancedMarker
                className="relative"
                key={'opened-hotel'}
                onClick={handlePageChange}
                position={{
                  lat: position.lat,
                  lng: position.long,
                }}
              >
                <HotelMapCard
                  className={cn(
                    'flex absolute z-[9999] w-[300px] bottom-[75px] right-1/2 translate-x-1/2'
                  )}
                  link={link}
                  image={image}
                  title={openedHotel.name}
                  price={openedHotel.price}
                  rating={openedHotel.rating.review_score}
                  priceCategory={openedHotel.priceCategory}
                />
              </AdvancedMarker>
            )}
          </Map>
        </APIProvider>
      </div>
    )
  }
)

interface ICustomPin {
  price: string
  pinActive?: boolean
  className?: string
}

export const CustomPin = ({
  price,
  pinActive = false,
  className,
}: ICustomPin) => {
  return (
    <div
      className={cn(
        'relative -z-10 size-14 bg-white text-gray-100 flex justify-center items-center rounded-full text-body-m font-medium ring-[3px] ring-inset ring-primary-100 shadow-marker',
        pinActive &&
          'ring-white bg-primary-100 !text-white font-bold text-body-m leading-4',
        className
      )}
    >
      <span className="!font-poppins">{price}</span>
      <span
        className={cn(
          'absolute top-full size-0 block bg-transparent border-[7px] border-t-primary-100 border-x-transparent border-b-transparent -mt-px',
          pinActive && 'border-t-white'
        )}
      />
    </div>
  )
}
