import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
import { calendarClassNames } from '@/components/ui/Calendar'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/common'
import { getDateLocale } from '@/utils/getDateLocale'

interface ICalendarInputProps {
  value?: DateRange
  placeholder: string
  onChange: SelectRangeEventHandler
  onClear?: () => void
  onTriggerClick?: () => void
  numberOfMonths?: number
  isMobileSearchBar?: boolean
  className?: string
  classNameDropdown?: string
  classNameButton?: string
}

export const CalendarInput = ({
  value,
  placeholder,
  onChange,
  onClear,
  onTriggerClick,
  numberOfMonths = 2,
  isMobileSearchBar = false,
  className,
  classNameDropdown,
  classNameButton,
}: ICalendarInputProps) => {
  const tr = useTranslations('searchBar')

  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  const locale = getDateLocale()

  const formatDate = (date: Date) => format(date, 'MMM d', { locale })

  const handleButtonClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  // if date.to is selected, close the calendar
  useEffect(() => {
    if (!isMobileSearchBar && value?.to) {
      setTimeout(() => {
        setOpen(false)
      }, 100)
    }
  }, [value?.to, isMobileSearchBar])

  const handleSelect: SelectRangeEventHandler = useCallback(
    (dateRange, selectedDay, activeModifiers, e) => {
      // when a date is selected, if from is already selected, next click will be the new to
      onChange(dateRange, selectedDay, activeModifiers, e)

      // when a date is selected, if from and to are already selected, next click will clear the selection and clicked date will be the new from
      if (value?.from && value?.to) {
        onChange(
          { from: selectedDay, to: undefined },
          selectedDay,
          activeModifiers,
          e
        )
      }

      // if from and to are the same, clear the selection
      if (
        value?.from &&
        !value?.to &&
        checkDatesEquality(value.from, selectedDay)
      ) {
        onChange(
          { from: undefined, to: undefined },
          selectedDay,
          activeModifiers,
          e
        )
      }
    },
    [onChange, value]
  )

  const clsx = cn(
    'relative z-50 bg-white transition-color rounded-lg',
    'hover:bg-gray-5',
    'md:rounded-none',
    isMobileSearchBar && 'static',
    className
  )
  const clsxButton = cn(
    'px-6 py-4 w-full text-gray-60 text-base transition-color justify-start font-medium md:rounded-none',
    'lg:py-5',
    value && 'text-gray-100',
    open && 'ring-2 ring-primary-100 ring-inset',
    classNameButton
  )
  const clsxDropdown = cn(
    'hidden absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-auto p-2 md:px-6 md:py-4 flex-col border border-gray-20 rounded-lg shadow-drop-to-bottom bg-white',
    open && 'flex',
    isMobileSearchBar &&
      'top-0 left-0 w-full translate-x-0 mt-0 shadow-none border-0 rounded-none mt-0 p-0 bottom-0',
    classNameDropdown
  )

  return (
    <div ref={ref} className={clsx}>
      <Button
        onClick={() => {
          handleButtonClick()
          onTriggerClick && onTriggerClick()
        }}
        variant="ghost"
        className={clsxButton}
        suppressHydrationWarning
      >
        {value && value.from ? (
          <>
            {value.to
              ? `${formatDate(value.from)} - ${formatDate(value.to)}`
              : formatDate(value.from)}
          </>
        ) : (
          <span className="font-medium text-base text-gray-60">
            {placeholder}
          </span>
        )}
      </Button>
      <div className={clsxDropdown}>
        <Calendar
          id="calendar"
          mode="range"
          selected={value}
          onSelect={handleSelect}
          initialFocus
          numberOfMonths={numberOfMonths}
          defaultMonth={new Date()}
          fromDate={new Date()}
          className={cn(isMobileSearchBar ? 'px-4' : 'mt-4')}
          classNames={{
            ...calendarClassNames,
            day: cn(
              calendarClassNames.day,
              isMobileSearchBar ? 'size-[45px]' : 'size-[47px]'
            ),
          }}
        />
        {isMobileSearchBar && (
          <div className="flex gap-4 px-4 pt-4 pb-5 shadow-drop-to-top mt-auto">
            <Button
              variant={'ghost'}
              onClick={() => {
                setOpen(false)
                onClear && onClear()
              }}
              className="px-8 py-3 grow"
            >
              {tr('clear')}
            </Button>
            <Button onClick={() => setOpen(false)} className="px-8 py-3 grow">
              {tr('chooseDates')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

const checkDatesEquality = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
