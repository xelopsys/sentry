'use client'

import { Typography } from '@/components/ui/Typography'
import { IStatProps } from '@/types/common'
import { cn } from '@/utils/common'

interface INumbersStatProps {
  title: string
  description: string
  stats: IStatProps[]
  className?: string
}

export const NumbersStat = ({
  title,
  description,
  stats,
  className,
}: INumbersStatProps) => {
  const clsx = cn(
    'flex flex-col gap-10',
    'md:gap-5 md:grid md:grid-cols-2',
    'lg:gap-10 lg:items-center',
    'xl:grid-cols-[minmax(0,_735px)_auto]',
    className
  )

  return (
    <section className={clsx}>
      <div className="flex flex-col">
        <Typography
          variant="sub-header"
          weight="font-semibold"
          color="text-gray-100"
          className="mb-4 lg:text-h2 lg:mb-5"
          tag="h2"
        >
          {title}
        </Typography>
        <Typography
          variant="body-s"
          weight="font-normal"
          color="text-gray-100"
          className="lg:text-body-m"
        >
          {description}
        </Typography>
      </div>
      <div className="rounded-3xl bg-green-5 p-4 grid grid-cols-2 gap-5 grow shrink-0">
        {stats &&
          stats.length > 0 &&
          stats.map((stat) => (
            <div key={stat.value} className="py-5">
              <Typography
                tag="p"
                variant="h2"
                color="text-green-100"
                className="uppercase text-center lg:text-[44px] lg:leading-[57px]"
                weight="font-semibold"
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body-s"
                color="text-gray-60"
                className="text-center lg:text-body-m"
                weight="font-normal"
              >
                {stat.label}
              </Typography>
            </div>
          ))}
      </div>
    </section>
  )
}
