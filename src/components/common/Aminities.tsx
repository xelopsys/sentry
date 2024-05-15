'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { AminityIcon } from '@/components/common/AminityIcon'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import { ChevronDownIcon } from '@/res/icons'
import { IAmenitiesItemProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IAmenitiesProps {
  title: string
  items: IAmenitiesItemProps[]
  className?: string
}

export const Aminities = ({
  title,
  items = [],
  className,
}: IAmenitiesProps) => {
  const [open, setOpen] = useState(false)

  const tr = useTranslations('hotelTranslations')
  const clsx = cn('flex flex-col', className)

  const showedList = open ? items : items.slice(0, 9)

  return (
    <div className={clsx}>
      <Typography
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
      >
        {title}
      </Typography>
      <div
        className={cn(
          'grid grid-cols-1 gap-3 mt-5',
          'sm:grid-cols-2',
          'xl:grid-cols-3'
        )}
      >
        {showedList.map((item, index) => {
          return (
            <AminityCard
              key={`${item.id}-${index}`}
              title={item.name}
              icon={<AminityIcon id={item.id} />}
            />
          )
        })}
      </div>
      {items && items.length > 9 && (
        <Button
          variant="text"
          className="items-center mt-5 self-start"
          onClick={() => setOpen(!open)}
        >
          <span>
            {open ? tr('amenitiesShowLess') : tr('amenitiesShowMore')}
          </span>
          <ChevronDownIcon
            className={cn('ml-1 size-6', open && 'rotate-180')}
          />
        </Button>
      )}
    </div>
  )
}

interface IAminityCardProps {
  title: string
  icon?: React.ReactNode
}

const AminityCard = ({ icon, title }: IAminityCardProps) => {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <Typography
        variant="body-s"
        color="text-gray-100"
        weight="font-normal"
        className="lg:text-body-m"
      >
        {title}
      </Typography>
    </div>
  )
}
