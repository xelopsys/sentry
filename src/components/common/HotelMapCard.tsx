'use client'

import Image from 'next/image'

import { Typography } from '@/components/ui/Typography'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { StarIcon } from '@/res/icons'
import { cn, getPriceCategory, getPriceCategoryLabel } from '@/utils/common'

interface IHotelMapCardProps {
  link: string
  title: string
  price: number
  rating: number
  image?: string
  className?: string
  priceCategory?: string
}

export const HotelMapCard = ({
  link,
  image,
  title,
  priceCategory,
  rating,
  className,
}: IHotelMapCardProps) => {
  const { currency } = useCurrencyStore()

  const formattedPriceCategory = getPriceCategory(
    priceCategory || '$$',
    currency
  )
  const priceCategoryLabel = getPriceCategoryLabel(priceCategory || '$$')

  // TODO: uncomment once we have Booking.com API
  // const priceText = formatText(trBooking?.priceFromText, {
  //   hotelPrice: `${getCurrencySymbol(currency)}${Math.round(price)}`,
  // })

  return (
    <div
      className={cn(
        'flex gap-3 rounded-[20px] p-2 bg-white shadow-marker',
        className
      )}
    >
      <div className="absolute top-full left-1/2 -translate-x-1/2 z-20 block size-0 border-[16px] border-white border-x-transparent border-b-transparent" />
      {image && (
        <div className="relative shrink-0 size-[100px] rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-col items-start py-1">
        <a href={link} target="_blank" rel="noreferrer">
          <Typography
            color="text-gray-100"
            variant="body-xs"
            weight="font-semibold"
            className="line-clamp-2 mb-1"
          >
            {title}
          </Typography>
        </a>
        <div className="flex items-center gap-1 bg-gray-5 pl-1 pr-1.5 py-px rounded-full">
          <StarIcon className="size-4 !text-primary-80" />
          <Typography
            variant="body-xs"
            weight="font-normal"
            color="text-gray-100"
            tag="span"
          >
            {rating}
          </Typography>
        </div>
        <div className="flex items-center  mt-auto">
          <Typography
            variant="body-xs"
            weight="font-semibold"
            color="text-gray-100"
            tag="span"
            className="capitalize"
          >
            {formattedPriceCategory}
          </Typography>
          <Typography
            weight="font-normal"
            color="text-gray-70"
            tag="span"
            className="ml-1 !text-[10px] !leading-[18px]"
          >
            {priceCategoryLabel}
          </Typography>
        </div>
      </div>
    </div>
  )
}
