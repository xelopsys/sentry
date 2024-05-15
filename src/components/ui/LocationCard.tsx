import Image from 'next/image'
import Link from 'next/link'

import { CardLabel } from '@/components/ui/CardLabel'
import { Typography } from '@/components/ui/Typography'
import { ILocationProps } from '@/types/common'
import { cn } from '@/utils/common'

interface ILocationCardProps extends Omit<ILocationProps, 'id'> {
  path: string
  className?: string
}

export const LocationCard = ({
  name,
  path,
  image,
  hotelsPrice,
  hotelsCount,
  className,
}: ILocationCardProps) => {
  const clsx = cn('flex flex-col-reverse group relative', className)

  return (
    <Link href={path} className={clsx}>
      <p className="flex flex-col mt-4">
        <Typography
          tag="span"
          color="text-gray-100"
          variant="sub-title"
          weight="font-semibold"
          className="mb-1.5"
        >
          {name}
        </Typography>
        <Typography
          tag="span"
          color="text-green-100"
          weight="font-medium"
          variant="body-m"
        >
          {hotelsPrice}
        </Typography>
      </p>
      <div className="relative overflow-hidden h-[357px] lg:h-[500px] rounded-3xl">
        <span className="absolute inset-0 bg-black z-10 opacity-0 group-hover:opacity-20 transition-all" />
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes={'(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        />
        <CardLabel
          label={hotelsCount}
          className="absolute z-20 bottom-0 right-0"
        />
      </div>
    </Link>
  )
}
