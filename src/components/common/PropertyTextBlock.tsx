import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface IPropertyItemProps {
  title: string
  description: string
}

interface IPropertyTextBlockProps {
  title: string
  description: string
  items: IPropertyItemProps[]
  className?: string
}

export const PropertyTextBlock = ({
  title,
  description,
  items,
  className,
}: IPropertyTextBlockProps) => {
  const clsx = cn('flex flex-col', className)

  return (
    <section className={clsx}>
      <Typography
        variant="sub-header"
        tag="h3"
        weight="font-semibold"
        color="text-gray-100"
        className="lg:text-h2 lg:text-center"
      >
        {title}
      </Typography>
      <Typography
        variant="body-s"
        weight="font-normal"
        color="text-gray-100"
        className="mt-3 lg:text-body-m lg:text-center max-w-[812px] lg:mx-auto lg:mt-8"
      >
        {description}
      </Typography>

      <div className="flex flex-col gap-5 mt-[60px] max-w-[1130px] mx-auto lg:grid lg:grid-cols-3 lg:gap-[60px]">
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <div key={item.title}>
              <Typography
                tag="h4"
                variant="sub-title"
                weight="font-semibold"
                color="text-gray-100"
                className="lg:text-center"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body-s"
                weight="font-normal"
                color="text-gray-70"
                className="mt-2 lg:text-body-m lg:text-center lg:mt-3"
              >
                {item.description}
              </Typography>
            </div>
          ))}
      </div>
    </section>
  )
}
