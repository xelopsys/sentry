import { StarIcon } from '@/res/icons'
import { cn } from '@/utils/common'

interface IStarsLineProps {
  rating: number
  className?: string
  classNameItem?: string
}

export const StarsLine = ({
  className,
  classNameItem,
  rating,
}: IStarsLineProps) => {
  const clsx = cn('flex', className)

  const stars = Array.from({ length: 5 }).map((_, i) => (
    <StarIcon
      key={`star-${i}`}
      className={cn(
        'w-4 h-4',
        rating > i ? 'text-primary-80' : 'text-gray-10',
        classNameItem
      )}
    />
  ))

  return <div className={clsx}>{stars}</div>
}
