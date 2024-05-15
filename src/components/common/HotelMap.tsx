'use client'

import { LocationMap } from '@/components/common/LocationMap'
import { Typography } from '@/components/ui/Typography'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MarkerPinIcon } from '@/res/icons'
import { ICoordinatesProps } from '@/types/common'
import { cn, getPriceCategory } from '@/utils/common'

interface IHotelMapProps {
  location: ICoordinatesProps
  title: string
  address: string
  priceCategory: string
  className?: string
}

export const HotelMap = ({
  location,
  title,
  address,
  priceCategory,
  className,
}: IHotelMapProps) => {
  const clsx = cn('flex flex-col', className)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { currency } = useCurrencyStore()

  const formattedPriceCategory = getPriceCategory(
    priceCategory || '$$',
    currency
  )

  // render only on desktop
  if (!isDesktop) return null

  return (
    <div className={clsx}>
      <Typography
        tag="h2"
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="mb-[30px]"
      >
        {title}
      </Typography>
      <LocationMap
        location={location}
        hotelPrice={formattedPriceCategory}
        className="w-full h-[400px]"
      />
      <div className="flex items-center gap-2 mt-3">
        <MarkerPinIcon className="size-5 text-gray-100" />
        <Typography variant="body-s" color="text-gray-100" weight="font-normal">
          {address}
        </Typography>
      </div>
    </div>
  )
}
