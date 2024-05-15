import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface ICardPillProps {
  label: string
  isHotelCard?: boolean
  className?: string
}

export const CardPill = ({
  label,
  isHotelCard = false,
  className,
}: ICardPillProps) => {
  return (
    <Typography
      className={cn(
        'px-3 py-1 rounded-[14px] bg-black bg-opacity-30',
        isHotelCard && 'border border-white backdrop-blur',
        className
      )}
      tag="span"
      color="text-white"
      variant={isHotelCard ? 'body-s' : 'body-m'}
      weight={isHotelCard ? 'font-semibold' : 'font-medium'}
    >
      {label}
    </Typography>
  )
}
