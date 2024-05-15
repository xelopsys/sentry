'use client'

import { useTranslations } from 'next-intl'

import { Breadcrumbs, IBreadcrumbItem } from '@/components/common/Breadcrumbs'
import { StarsLine } from '@/components/ui/StarsLine'
import { Typography } from '@/components/ui/Typography'
import { MarkerPinIcon } from '@/res/icons'
import { cn } from '@/utils/common'
import { formatNumber } from '@/utils/formatNumber'

interface IHotelHeaderProps {
  name: string
  address: string
  rating: number
  reviewScore: number
  reviewsCount: number
  breadcrumbItems: IBreadcrumbItem[]
  className?: string
}

export const HotelHeader = ({
  name,
  address,
  rating,
  reviewScore,
  reviewsCount,
  breadcrumbItems,
  className,
}: IHotelHeaderProps) => {
  const tr = useTranslations('hotelTranslations')

  const clsx = cn('flex flex-col gap-5 lg:gap-0', className)

  return (
    <div className={clsx}>
      <Breadcrumbs
        className="pt-[116px] lg:pt-[102px] relative z-30 px-0"
        classNameItem="text-gray-100"
        items={breadcrumbItems}
        textColor="text-gray-100"
      />
      <Typography
        tag="h1"
        variant="title"
        weight="font-semibold"
        color="text-gray-100"
        className="lg:mt-[30px] lg:mb-3 lg:text-h2"
      >
        {name}
      </Typography>

      <div className="flex gap-2 flex-col lg:flex-row lg:gap-8">
        <div className="flex gap-1 items-start">
          <StarsLine
            rating={rating}
            className="items-center"
            classNameItem="size-5"
          />
          <Typography
            tag="span"
            variant="body-s"
            weight="font-medium"
            color="text-gray-100"
            className="ml-1"
          >
            {reviewScore}
          </Typography>
          <Typography
            tag="span"
            variant="body-s"
            weight="font-normal"
            color="text-gray-60"
          >
            (
            {tr('reviewsTemplate', {
              reviewsCount: formatNumber(reviewsCount),
            })}
            )
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <MarkerPinIcon className="size-4 shrink-0 lg:size-5" />
          <Typography
            tag="span"
            variant="body-xs"
            weight="font-normal"
            color="text-gray-100"
            className="overflow-hidden whitespace-nowrap overflow-ellipsis w-min lg:text-body-s lg:text-gray-100"
            title={address}
          >
            {address}
          </Typography>
        </div>
      </div>
    </div>
  )
}
