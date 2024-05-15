import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface ICardLabelProps {
  label: string
  className?: string
}

export const CardLabel = ({ label, className }: ICardLabelProps) => {
  return (
    <Typography
      className={cn(
        'px-4 py-2 rounded-tl-lg rounded-br-lg bg-primary-100',
        className
      )}
      tag="span"
      color="text-white"
      variant="body-m"
      weight="font-medium"
    >
      {label}
    </Typography>
  )
}
