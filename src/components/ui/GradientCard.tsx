import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface IGradientCardProps {
  name: string
  subName: string
  image: string
  url: string
  className?: string
}

export const GradientCard = ({
  name,
  subName,
  image,
  url,
  className,
}: IGradientCardProps) => {
  const clsx = cn(
    'relative h-[397px] p-5 rounded-[20px] flex items-end overflow-hidden group',
    'lg:h-[500px]',
    className
  )

  return (
    <Link href={url} className={clsx}>
      <span className="absolute inset-0 bg-black z-20 opacity-0 group-hover:opacity-20 transition-all" />
      <span className="absolute inset-0 z-10 overflow-hidden from-transparent to-[rgba(0,0,0,0.7)] bg-gradient-to-b from-70% bg-opacity-70" />
      <span className="flex flex-col relative z-30">
        <Typography
          tag="span"
          variant="title"
          weight="font-semibold"
          color="text-white"
          className="mb-2"
        >
          {name}
        </Typography>
        <Typography
          tag="span"
          variant="body-m"
          weight="font-medium"
          color="text-white"
        >
          {subName}
        </Typography>
      </span>
      <Image
        className="object-cover"
        src={image}
        alt={name}
        fill
        sizes={'(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw'}
      />
    </Link>
  )
}
