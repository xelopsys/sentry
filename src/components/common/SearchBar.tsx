'use client'

import { useTranslations } from 'next-intl'
import qs from 'qs'

import { buttonVariants } from '@/components/ui/Button'
import { CalendarInput } from '@/components/ui/CalendarInput'
import { Link } from '@/components/ui/Link'
import { SearchBarInput } from '@/components/ui/SearchBarInput'
import { SearchBarSelect } from '@/components/ui/SearchBarSelect'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSearchBar } from '@/hooks/useSearchBar'
import { maxGuests } from '@/res/constants'
import { SearchIcon } from '@/res/icons'
import { ILocationProps } from '@/types/common'
import { cn } from '@/utils/common'
import { getFormattedQueryParams } from '@/utils/getFormattedQueryParams'
import { getLocationUrl } from '@/utils/url'

interface ISearchBarProps {
  searchedLocation?: ILocationProps
  isResult?: boolean
  className?: string
}

export const SearchBar = ({
  searchedLocation,
  isResult = false,
  className,
}: ISearchBarProps) => {
  const tr = useTranslations('searchBar')
  const isMobile = useMediaQuery('(max-width: 1023px)')

  const {
    location,
    queryParams,
    handleInputChange,
    handleClearInput,
    handleDateRangeChange,
    handleSelectGuests,
    handleSubmit,
    inputError,
  } = useSearchBar({ defaultLocation: searchedLocation })
  const { checkIn, checkOut, guests } = queryParams
  const params = qs.stringify(getFormattedQueryParams(queryParams))

  const clsx = cn(
    'flex flex-col gap-2 md:items-center md:flex-row md:gap-[3px]',
    className
  )

  return (
    <div className={clsx}>
      <SearchBarInput
        value={location}
        onChange={handleInputChange}
        onClear={handleClearInput}
        className={cn('grow', isResult && 'grow')}
        classNameInput={cn(isResult && 'bg-gray-5 text-ellipsis')}
        error={inputError}
      />

      <CalendarInput
        value={{
          from: checkIn,
          to: checkOut,
        }}
        onChange={handleDateRangeChange}
        placeholder={tr('dateInputPlaceholder')}
        numberOfMonths={isMobile ? 1 : 2}
        className={cn(
          'grow',
          'md:max-w-[170px] lg:max-w-[220px]',
          isResult && 'lg:max-w-[180px] bg-gray-5'
        )}
        classNameButton="h-14 lg:h-16"
      />

      <SearchBarSelect
        onChange={handleSelectGuests}
        value={guests}
        maxGuests={maxGuests}
        className={cn(
          'grow',
          'md:max-w-[170px] lg:max-w-[220px]',
          isResult && 'md:rounded-r-none lg:max-w-[180px] bg-gray-5'
        )}
      />

      <Link
        className={cn(
          buttonVariants({ variant: 'default' }),
          'p-4 mt-2',
          'md:mt-0 lg:ml-[7px] lg:py-5',
          isResult ? 'min-w-16 !ml-0 md:rounded-l-none' : 'min-w-[150px]'
        )}
        onClick={handleSubmit}
        target={location?.slug ? '_blank' : undefined}
        href={
          location?.slug ? `${getLocationUrl(location.slug)}?${params}` : '/'
        }
        aria-label={tr('search')}
      >
        {isResult ? <SearchIcon className="w-6 h-6" /> : tr('search')}
      </Link>
    </div>
  )
}
