'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  DotButton,
  EmblaCarouselType,
  useDotButton,
} from '@/components/ui/Carousel'
import { cn } from '@/utils/common'

interface IImageGalleryProps {
  items: string[]
  className?: string
}

export const ImageGallery = ({ items, className }: IImageGalleryProps) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>(undefined)
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const clsx = cn(
    'ml-0 gap-4',
    'xl:grid xl:grid-flow-row xl:auto-cols-auto xl:grid-cols-[minmax(0,_555px)_minmax(0,_325px)] xl:grid-rows-[minmax(0,_240px)_minmax(0,_240px)]',
    className
  )
  return (
    <Carousel
      opts={{
        align: 'center',
        active: true,
        breakpoints: {
          '(min-width: 1280px)': { active: false },
        },
      }}
      setApi={(api) => setEmblaApi(api)}
      className="w-full relative"
    >
      <CarouselContent className={clsx}>
        {items &&
          items.length > 0 &&
          items.slice(0, 3).map((image) => (
            <CarouselItem
              className={cn(
                'relative h-[300px] overflow-hidden rounded-3xl md:h-[500px] xl:rounded-[20px]',
                'first:xl:row-span-2 first:xl:h-auto first:xl:w-full',
                'xl:h-[240px]'
              )}
              key={image}
            >
              <Image src={image} fill className="object-cover" alt="" />
            </CarouselItem>
          ))}
      </CarouselContent>
      <div className="flex gap-2 absolute bottom-[14px] left-1/2 -translate-x-1/2 xl:hidden">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              'size-2 rounded-full bg-white/50 backdrop-blur-sm',
              index === selectedIndex && 'bg-white backdrop-blur-none'
            )}
          />
        ))}
      </div>
    </Carousel>
  )
}
