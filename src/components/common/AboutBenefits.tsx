import { Typography } from '@/components/ui/Typography'
import { IAboutBenefitsItemProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IAboutBenefitsProps {
  items: IAboutBenefitsItemProps[]
  className?: string
}

export const AboutBenefits = ({ items, className }: IAboutBenefitsProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 md:grid md:grid-cols-2 lg:gap-x-8 lg:gap-y-16',
        className
      )}
    >
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <div key={item.title}>
            <Typography
              variant="sub-title"
              weight="font-semibold"
              color="text-gray-100"
            >
              {item.title}
            </Typography>
            <Typography
              variant="body-s"
              weight="font-normal"
              color="text-gray-70"
              className="mt-2 lg:text-body-m"
            >
              {item.description}
            </Typography>
          </div>
        ))}
    </div>
  )
}
