import { Carousel, CarouselContent } from '@/components/ui/Carousel'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { Typography } from '@/components/ui/Typography'
import { IReviewProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IClientReviewsProps {
  title: string
  items: IReviewProps[]
  className?: string
}

export const ClientReviews = ({
  title,
  items,
  className,
}: IClientReviewsProps) => {
  const clsx = cn('flex flex-col', className)

  const clsxList = cn(
    'ml-0 grid gap-4 grid-flow-col auto-cols-[328px]',
    'md:grid-cols-2',
    'lg:gap-5'
  )

  return (
    <div className={clsx}>
      <Typography
        tag="h2"
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="mb-6 lg:text-h2 lg:mb-[30px]"
      >
        {title}
      </Typography>
      <Carousel
        opts={{
          align: 'center',
          active: true,
          breakpoints: {
            '(min-width: 768px)': { active: false },
          },
        }}
      >
        <CarouselContent className={clsxList}>
          {items &&
            items.length > 0 &&
            items
              .slice(0, 3)
              .map(({ id, ...props }) => (
                <ReviewCard key={`review-${id}`} {...props} />
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
