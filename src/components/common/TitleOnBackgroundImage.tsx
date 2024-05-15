import Image from 'next/image'

import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface ITitleOnBackgroundImageProps {
  title: string
  image: string
  className?: string
}

export const TitleOnBackgroundImage = ({
  title,
  image,
  className,
}: ITitleOnBackgroundImageProps) => {
  const clsx = cn(
    'relative overflow-hidden rounded-[20px] flex items-center justify-center p-5 h-[600px]',
    className
  )

  return (
    <div className={clsx}>
      <Image src={image} alt="" fill className="object-cover" />
      <Typography
        tag="h3"
        variant="sub-header"
        weight="font-semibold"
        color="text-white"
        className="max-w-[900px] text-center relative z-20 lg:text-h2"
      >
        {title}
      </Typography>
      <span className="absolute inset-0 bg-black opacity-25 z-10" />
    </div>
  )
}
