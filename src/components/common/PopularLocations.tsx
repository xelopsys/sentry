'use client'

import { Carousel, CarouselContent } from '@/components/ui/Carousel'
import { LocationCard } from '@/components/ui/LocationCard'
import { Typography } from '@/components/ui/Typography'
import { ILocationProps } from '@/types/common'
import { cn } from '@/utils/common'
import { getLocationUrl } from '@/utils/url'

interface IPopularLocationProps {
  title: string
  items: ILocationProps[]
  className?: string
}

export const PopularLocations = ({
  title,
  items,
  className,
}: IPopularLocationProps) => {
  const clsx = cn('flex flex-col', className)

  const clsxList = cn(
    'ml-0 grid gap-4 grid-flow-col auto-cols-[328px]',
    'lg:gap-5 lg:auto-cols-[440px]'
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
            '(min-width: 1440px)': { active: false },
          },
        }}
      >
        <CarouselContent className={clsxList}>
          {items &&
            items.length > 0 &&
            items
              .slice(0, 3)
              .map(({ id, ...props }) => (
                <LocationCard
                  key={id}
                  path={getLocationUrl(props.slug)}
                  {...props}
                />
              ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
