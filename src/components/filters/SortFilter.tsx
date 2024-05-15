'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Typography } from '@/components/ui/Typography'
import { useFilterStore } from '@/hooks/useFilterStore'
import { CheckIcon } from '@/res/icons'
import { cn } from '@/utils/common'

interface ISortFilterProps {
  filterText: string
  filterLabel: string
  filterOptions: { label: string; value: string }[]
  className?: string
}

export const SortFilter = ({
  filterText,
  filterLabel,
  filterOptions,
  className,
}: ISortFilterProps) => {
  const { filter, setFilter } = useFilterStore()

  const clsx = cn(
    'flex flex-col gap-3',
    'md:flex-row md:items-center md:justify-between md:gap-3',
    className
  )
  return (
    <div className={clsx}>
      <Typography
        variant="body-s"
        color="text-gray-100"
        weight="font-normal"
        className="lg:text-body-m"
        tag="h2"
      >
        {filterText}
      </Typography>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger
          className="md:self-end shrink-0 inline-flex !text-body-s font-normal self-start w-auto items-center text-gray-100 lg:!text-body-m"
          classNameIcon="size-5 text-gray-100 ml-1"
        >
          <SelectValue placeholder={filterLabel} />
        </SelectTrigger>
        <SelectContent className="gap-0.5 rounded-lg px-1 py-[3px] shadow-lg border-gray-20 w-full min-w-[272px]">
          {filterOptions.map(({ label, value }) => (
            <SelectItem
              className="flex flex-row px-4 py-2.5 justify-between text-body-m font-normal text-gray-100 rounded-lg [&[data-state=checked]]:bg-primary-10 [&[data-state=checked]>span>svg]:block [&>span]:flex [&>span]:justify-between [&>span]:items-center [&>span]:grow my-px"
              key={value}
              value={value}
            >
              {label}
              <CheckIcon className="hidden size-6" />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
