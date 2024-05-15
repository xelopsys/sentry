import { cn } from '@/utils/common'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-3xl bg-gray-5', className)}
      {...props}
    />
  )
}

export { Skeleton }
