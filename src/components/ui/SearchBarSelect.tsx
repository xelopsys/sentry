import { useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { cn } from '@/utils/common'

interface ISearchBarSelectProps {
  onChange: (value: string) => void
  value?: string
  maxGuests: number
  className?: string
}

export const SearchBarSelect = ({
  onChange,
  value,
  maxGuests,
  className,
}: ISearchBarSelectProps) => {
  const tr = useTranslations('searchBar')

  const clsx = cn(
    'border-none px-6 text-base font-medium py-4 rounded-lg transition-all bg-white h-auto text-gray-100',
    'hover:bg-gray-5',
    'lg:py-5 md:rounded-l-none',
    'focus:ring-primary-100 focus:ring-inset focus:outline-none focus:ring-2 focus:ring-offset-0 data-[state=open]:ring-2 data-[state=open]:ring-inset data-[state=open]:ring-primary-100 !important',
    className
  )

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className={clsx} aria-label={tr('guestInput')}>
        <SelectValue
          aria-label={tr('guestInput')}
          placeholder={tr('guestInput')}
        />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        align="center"
        className="border border-gray-20 shadow-drop-to-bottom rounded-xl max-h-[238px]"
        sideOffset={4}
      >
        {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
          (item: number) => (
            <SelectItem
              key={item}
              value={String(item)}
              className="p-4 rounded-lg !text-body-m font-normal"
            >
              {tr('guestsTemplate', {
                guestCount: item,
              })}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  )
}
