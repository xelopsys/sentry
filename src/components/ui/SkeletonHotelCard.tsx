import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/utils/common'

interface ISkeletonHotelCardProps {
  className?: string
}

export const SkeletonHotelCard = ({ className }: ISkeletonHotelCardProps) => {
  const clsx = cn('flex flex-col gap-4 lg:gap-5 lg:flex-row', className)

  return (
    <div className={clsx}>
      <Skeleton className="h-[260px] lg:w-[325px] lg:h-[227px]" />
      <div className="lg:px-0 lg:py-4 lg:grow">
        <div className="flex justify-between items-start gap-4">
          <div className="grow">
            <Skeleton className="h-5 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-[29px] w-[57px]" />
        </div>
        <div className="flex items-end justify-between mt-8 mb-4">
          <div className="grow max-w-[202px]">
            <Skeleton className="h-5 mb-2" />
            <Skeleton className="h-5" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-12 w-[190px] rounded-xl" />
        </div>
      </div>
    </div>
  )
}
