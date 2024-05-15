'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'

import { Button, buttonVariants } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { useActiveHotelStore } from '@/hooks/useActiveHotelStore'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { StarIcon } from '@/res/icons'
import { ICoordinatesProps, IHotelProps } from '@/types/common'
import {
  cn,
  getPriceCategory,
  getPriceCategoryLabel,
  getStrapiImage,
} from '@/utils/common'
import { distanceCalc } from '@/utils/distanceCalc'

interface IHotelCardProps {
  hotel: IHotelProps
  locationCoordinates: ICoordinatesProps
  locationName: string
  className?: string
  onClickOut?: () => void
}

export const HotelCard = ({
  hotel,
  locationCoordinates,
  locationName,
  className,
  onClickOut,
}: IHotelCardProps) => {
  const {
    slug,
    name,
    rating,
    facilities,
    price,
    photos: { data: images },
    coordinates,
    sourceUrl,
    sourceId,
    priceCategory,
  } = hotel
  const { setActiveHotel } = useActiveHotelStore()
  const { currency } = useCurrencyStore()
  const tr = useTranslations('locationTranslations')
  const trBooking = useTranslations('hotelTranslations.bookingWidget')
  const formattedPriceCategory = getPriceCategory(
    priceCategory || '$$',
    currency
  )
  const priceCategoryLabel = getPriceCategoryLabel(priceCategory || '$$')

  const handleMouseEnter = useCallback(() => {
    setActiveHotel(hotel)
  }, [setActiveHotel, hotel])

  const handleMouseLeave = useCallback(() => {
    setActiveHotel(null)
  }, [setActiveHotel])

  if (!price) return null

  const { walkingTime, drivingTime } = distanceCalc(
    coordinates,
    locationCoordinates
  )

  const spentTime = walkingTime < 30 ? walkingTime : drivingTime
  const spentTimeText =
    walkingTime < 30
      ? tr('minutesWalking', { spentTime })
      : tr('minutesDriving', { spentTime })

  const whereText = tr('whereText', { locationTitle: locationName })
  // TODO: uncomment once we have Booking.com API
  // const priceText = formatText(trBooking?.priceFromText, {
  //   hotelPrice: `${getCurrencySymbol(currency)}${Math.round(price)}`,
  // })

  const supplierLogo = getSupplierIcon('booking')
  const image = getStrapiImage(images?.[0])

  const clsx = cn(
    'relative flex flex-col group',
    'xl:gap-0 xl:flex-row',
    className
  )

  return (
    <div
      id={sourceId}
      className={clsx}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={sourceUrl}
        target="_blank"
        className="p-0"
        onClick={() => onClickOut && onClickOut()}
      >
        <div className="mb-4 xl:mb-0 xl:mr-5 h-[260px] rounded-3xl relative overflow-hidden shrink-0 xl:w-[325px] xl:h-[227px]">
          <span className="absolute inset-0 bg-black z-10 opacity-0 transition-all group-hover:opacity-20" />
          <Image
            className="object-cover object-center"
            src={image}
            fill
            alt=""
            sizes="20vw"
          />
          {/* Removed for version 1 */}
          {/* {cardLabel && (
          <CardPill
            isHotelCard
            label={cardLabel.label}
            className="absolute top-2.5 left-2.5 z-10"
          />
        )} */}
        </div>
      </Link>

      <div className="flex flex-col grow xl:pr-5 xl:py-4 xl:pb-5">
        <div className="flex flex-col grow">
          <div className="flex gap-4 items-start justify-between grow">
            <Link href={slug} className="p-0" aria-label={`${name} link`}>
              <Typography
                variant="body-m"
                weight="font-semibold"
                color="text-gray-100"
                tag="h3"
                className="hover:underline mb-2 xl:mb-0"
              >
                {name}
              </Typography>
            </Link>
            <span className="flex items-center gap-1 bg-gray-5 pl-2 pr-3 py-1 rounded-full">
              <StarIcon className="size-4 text-primary-80" />
              <Typography
                variant="body-s"
                weight="font-normal"
                color="text-gray-100"
                tag="span"
              >
                {rating.review_score}
              </Typography>
            </span>
          </div>

          <Link
            href={sourceUrl}
            onClick={() => onClickOut && onClickOut()}
            target="_blank"
            className="flex flex-col gap-2 p-0"
          >
            <div className="flex items-center flex-wrap">
              {facilities &&
                facilities.length > 0 &&
                facilities.slice(0, 3).map(({ id, name }, index, arr) => (
                  <Typography
                    key={id}
                    variant="body-s"
                    weight="font-normal"
                    color="text-green-100"
                    tag="span"
                    className="whitespace-nowrap"
                  >
                    {name}
                    {index !== arr.length - 1 && <>&nbsp;&bull;&nbsp;</>}
                  </Typography>
                ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <Typography
                  variant="body-s"
                  weight="font-normal"
                  color="text-gray-100"
                  tag="span"
                >
                  {spentTimeText}
                </Typography>
                <Typography
                  variant="body-xs"
                  weight="font-normal"
                  color="text-gray-70"
                  tag="span"
                >
                  {whereText}
                </Typography>
              </div>
              <div className="flex flex-col items-end">
                <Typography
                  variant="body-m"
                  weight="font-semibold"
                  color="text-gray-100"
                  tag="span"
                >
                  {formattedPriceCategory}
                </Typography>
                <Typography
                  variant="body-xs"
                  weight="font-normal"
                  color="text-gray-70"
                  tag="span"
                >
                  {priceCategoryLabel}
                </Typography>
              </div>
            </div>
          </Link>
        </div>

        <Link
          href={sourceUrl}
          onClick={() => onClickOut && onClickOut()}
          target="_blank"
          className="flex items-center justify-between pt-4"
        >
          {supplierLogo && (
            <div className="w-[100px] h-5 relative">
              <Image
                sizes="100px"
                src={supplierLogo}
                fill
                className="object-contain"
                alt=""
              />
            </div>
          )}

          <Button
            className={cn(
              buttonVariants({
                variant: 'default',
              }),
              'px-8 py-3 rounded-xl relative z-20'
            )}
          >
            {trBooking('buttonLabel')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

const getSupplierIcon = (supplier: string) =>
  ({
    booking: '/icons/booking.svg',
    expedia: '/icons/expedia.png',
  })[supplier]
