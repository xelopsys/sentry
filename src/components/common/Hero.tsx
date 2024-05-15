'use client'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { ClientGate } from '@/components/common/ClientGate'
import { SearchBar } from '@/components/common/SearchBar'
import { Typography } from '@/components/ui/Typography'
import { useHeaderStore } from '@/hooks/useHeaderStore'
import { cn } from '@/utils/common'

interface IHeroProps {
  title: string
  description: string
  backgroundImg: string
  className?: string
}

export const Hero = ({
  title,
  description,
  backgroundImg,
  className,
}: IHeroProps) => {
  // if Hero leaves the viewport, the header will be pinned
  const { setIsPinned } = useHeaderStore()
  const { ref } = useInView({
    onChange: (inView) => {
      setIsPinned(!inView)
    },
  })

  const clsx = cn(
    'relative z-20 search-section md:min-h-[550px] lg:min-h-[654px] flex flex-col lg:justify-center',
    className
  )

  return (
    <section className={clsx} ref={ref}>
      <Image
        src={backgroundImg}
        className="object-cover lg:rounded-b-3xl"
        fill
        alt="Green stadium"
      />
      <div className="container pt-[122px] pb-[102px]">
        <div className="relative z-10 flex flex-col max-w-[1100px] mx-auto w-full">
          <Typography
            className="text-center lg:text-h1"
            tag="h1"
            variant="h2"
            color="text-white"
          >
            {title}
          </Typography>
          <Typography
            className="mt-5 text-center lg:mt-6 max-w-[804px] mx-auto mb-[108px] lg:mb-[74px]"
            color="text-white"
            weight="font-medium"
          >
            {description}
          </Typography>
          <ClientGate className="min-h-64 md:min-h-14 lg:min-h-16">
            <SearchBar />
          </ClientGate>
        </div>
      </div>
    </section>
  )
}
