'use client'

import { format } from 'date-fns'
import Image from 'next/image'

import { StarsLine } from '@/components/ui/StarsLine'
import { Typography } from '@/components/ui/Typography'
import { IReviewProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IReviewCardProps extends Omit<IReviewProps, 'id'> {
  className?: string
}

export const ReviewCard = ({ className, ...props }: IReviewCardProps) => {
  const clsx = cn(
    'flex flex-col bg-gray-5 rounded-3xl px-5 py-7 cursor-pointer lg:cursor-auto',
    className
  )
  const { name, image, review, rating, date } = props
  const formattedDate = format(new Date(date), 'MMMM dd, yyyy')

  return (
    <div className={clsx}>
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full object-cover w-10 h-10"
          src={image}
          width={40}
          height={40}
          alt={name}
        />
        <div>
          <Typography tag="h3" variant="body-s" weight="font-semibold">
            {name}
          </Typography>
          <div className="flex gap-2 mt-1">
            <StarsLine rating={rating} />
            <time className="text-body-xs text-gray-100" dateTime={date}>
              {formattedDate}
            </time>
          </div>
        </div>
      </div>
      <Typography
        className="mt-6 lg:text-body-m"
        variant="body-s"
        weight="font-normal"
        color="text-gray-100"
      >
        {review}
      </Typography>
    </div>
  )
}
