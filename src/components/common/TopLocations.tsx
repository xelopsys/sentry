'use client'

import { Carousel, CarouselContent } from '@/components/ui/Carousel'
import { GradientCard } from '@/components/ui/GradientCard'
import { Typography } from '@/components/ui/Typography'
import { useTranslations } from '@/providers/Providers'
import { ILocationProps } from '@/types/common'
import { cn, formatText } from '@/utils/common'
import { getLocationUrl } from '@/utils/url'

interface ITopLocationsProps {
  title: string
  items: Omit<ILocationProps, 'nearHotels'>[]
  className?: string
}

export const TopLocations = ({
  title,
  items,
  className,
}: ITopLocationsProps) => {
  const tr = useTranslations('topLocations')

  const clsx = cn('flex flex-col', className)
  const clsxList = cn(
    'ml-0 grid grid-flow-col gap-4 auto-cols-[328px]',
    'lg:gap-5 lg:auto-cols-[440px]',
    'xl:grid-flow-row xl:auto-cols-auto xl:grid-cols-[minmax(0,_413px)_minmax(0,_494px)_minmax(0,_413px)] xl:grid-rows-[minmax(0,_240px)_minmax(0,_240px)]'
  )
  const clsxCard = cn(
    'odd:xl:row-span-2 odd:xl:h-auto odd:xl:w-full odd:xl:max-w-[413px]',
    'even:xl:max-w-[494px] even:xl:w-full even:xl:h-[240px]'
  )

  return (
    <section className={clsx}>
      <Typography
        tag="h2"
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="mb-6 lg:text-h2 lg:mb-10"
      >
        {title}
      </Typography>
      <Carousel
        opts={{
          align: 'center',
          active: true,
          breakpoints: {
            '(min-width: 1280px)': { active: false },
          },
        }}
      >
        <CarouselContent className={clsxList}>
          {items &&
            items.length > 0 &&
            items.slice(0, 4).map((item) => (
              <GradientCard
                className={clsxCard}
                key={item.id}
                url={getLocationUrl(item.slug)}
                name={item.name}
                subName={formatText(tr.lowestHotelPriceTemplate, {
                  price: item.price,
                })}
                image={item.image}
              />
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
