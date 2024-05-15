'use client'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { Breadcrumbs, IBreadcrumbItem } from '@/components/common/Breadcrumbs'
import { Typography } from '@/components/ui/Typography'
import { useHeaderStore } from '@/hooks/useHeaderStore'
import { cn } from '@/utils/common'

interface ISimpleHeaderProps {
  title: string
  description: string
  variant?: 'big' | 'small'
  image: string
  breadcrumbItems: IBreadcrumbItem[]
  isBgGradient?: boolean
  className?: string
  classNameTitle?: string
  classNameDescription?: string
  classNameTextWrapper?: string
}

export const SimpleHeader = ({
  title,
  description,
  variant = 'small',
  image,
  breadcrumbItems,
  isBgGradient = true,
  className,
  classNameTitle,
  classNameDescription,
  classNameTextWrapper,
}: ISimpleHeaderProps) => {
  const { setIsPinned } = useHeaderStore()
  const { ref } = useInView({
    onChange: (inView) => {
      setIsPinned(!inView)
    },
  })

  const clsx = cn(
    'relative min-h-[486px] md:min-h-[400px] overflow-hidden rounded-b-3xl',
    variant === 'big' && 'min-h-[800px] lg:min-h-[600px] flex flex-col',
    className
  )

  return (
    <div className={clsx} ref={ref}>
      <Image src={image} fill className="object-cover" alt="" />
      <span
        className={cn(
          'absolute inset-0 z-10',
          isBgGradient
            ? 'from-[rgba(0,0,0,0.6)] from-60% bg-gradient-to-b'
            : 'bg-black/40'
        )}
      />
      <Breadcrumbs
        className="pt-[116px] lg:pt-[92px] relative z-30"
        items={breadcrumbItems}
      />
      <div
        className={cn(
          'px-4 lg:px-0 relative z-20 pt-16 lg:pt-[72px] pb-20 max-w-[995px] mx-auto',
          variant === 'big' &&
            'grow flex flex-col justify-center lg:justify-start lg:pt-[92px]',
          classNameTextWrapper
        )}
      >
        <Typography
          tag="h1"
          variant="h3"
          color="text-white"
          className={cn(
            'text-center mb-5 lg:mb-6 lg:text-h2 max-w-[90%] mx-auto',
            classNameTitle
          )}
        >
          {title}
        </Typography>
        <Typography
          variant="body-m"
          color="text-white"
          weight="font-medium"
          className={cn(
            'text-center max-w-[900px] mx-auto',
            classNameDescription
          )}
        >
          {description}
        </Typography>
      </div>
    </div>
  )
}
