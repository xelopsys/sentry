'use client'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { CalendarInput } from '@/components/ui/CalendarInput'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/Drawer'
import { MobileSearchBarSelect } from '@/components/ui/MobileSearchBarSelect'
import { SearchBarInput } from '@/components/ui/SearchBarInput'
import { Typography } from '@/components/ui/Typography'
import { useSearchBar } from '@/hooks/useSearchBar'
import { ILocationProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IMobileSearchBarProps {
  searchedLocation?: ILocationProps
  className?: string
}

export const MobileSearchBar = ({
  searchedLocation,
  className,
}: IMobileSearchBarProps) => {
  const {
    location,
    handleInputChange,
    handleClearInput,
    handleDateRangeChange,
    handleDateRangeClear,
    handleSelectGuests,
    handleReset,
    handleSubmit,
    queryParams: { checkIn, checkOut, guests },
    inputError,
  } = useSearchBar({ defaultLocation: searchedLocation })

  let dateText = ''
  if (checkIn && !checkOut) {
    dateText = format(checkIn, 'MMM dd')
  }

  if (checkIn && checkOut) {
    dateText = `${format(checkIn, 'MMM dd')} — ${format(checkOut, 'MMM dd')}`
  }

  const tr = useTranslations('searchBar')

  const guestsText = tr('guestsTemplate', {
    guestCount: guests || '1',
  })

  const submitButton = (
    <Button onClick={handleSubmit} className="px-8 py-3 grow">
      {tr('search')}
    </Button>
  )
  const clsx = cn('flex grow', className)

  return (
    <div className={clsx}>
      <Drawer>
        <DrawerTrigger className="grow bg-gray-5 px-4 py-2 rounded-xl flex flex-col items-center">
          <Typography
            weight="font-medium"
            variant="body-s"
            color="text-gray-100"
            className="text-center"
          >
            {searchedLocation?.name}
          </Typography>
          <Typography variant="body-xs" color="text-gray-70">
            {dateText && <>{dateText} &bull;</>} {guestsText}
          </Typography>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-3xl pt-2 min-h-[85vh]">
          <div className="flex flex-col gap-2 mt-4 grow relative">
            <Typography
              variant="sub-title"
              color="text-gray-100"
              weight="font-semibold"
              className="px-4 mb-4"
            >
              {tr('whereGoing')}
            </Typography>

            <div className="px-4 relative z-20">
              <SearchBarInput
                value={location}
                onChange={handleInputChange}
                onClear={handleClearInput}
                classNameInput={'bg-gray-5'}
                isMobileSearchBar
                error={inputError}
              />
            </div>

            <div className="px-4">
              <CalendarInput
                value={{
                  from: checkIn,
                  to: checkOut,
                }}
                onChange={handleDateRangeChange}
                onClear={handleDateRangeClear}
                numberOfMonths={1}
                placeholder={tr('dateInputPlaceholder')}
                isMobileSearchBar
                className={'z-10 bg-gray-5 hover:text-gray-100 rounded-lg'}
              />
            </div>

            <div className="px-4">
              <MobileSearchBarSelect
                value={guests}
                onSelect={handleSelectGuests}
              />
            </div>

            <div className="px-4 flex items-center justify-between gap-4 mt-auto mb-5">
              <Button
                onClick={handleReset}
                className="px-8 py-3"
                variant="ghost"
              >
                {tr('clear')}
              </Button>
              {!location ? (
                submitButton
              ) : (
                <DrawerClose asChild>{submitButton}</DrawerClose>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
