'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/common'
import { getDateLocale } from '@/utils/getDateLocale'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const locale = getDateLocale()

  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{ ...calendarClassNames, ...classNames }}
      components={{
        IconLeft: () => <ChevronLeft className="h-6 w-6" />,
        IconRight: () => <ChevronRight className="h-6 w-6" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

export const calendarClassNames = {
  months: 'flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0',
  month: 'space-y-4 text-body-m font-medium',
  caption: 'flex justify-center pt-1 relative items-center',
  caption_label: 'text-body-m font-medium',
  nav: 'flex items-center',
  nav_button: cn(
    buttonVariants({ variant: 'icon' }),
    'w-[34px] h-[34px] flex items-center shrink-0 grow rounded',
    'hover:bg-gray-5 focus:ring-0 rounded-full disabled:bg-transparent disabled:text-gray-20'
  ),
  nav_button_previous: 'absolute left-0',
  nav_button_next: 'absolute right-0',
  table: 'w-full border-collapse space-y-1',
  head_row: 'flex mt-3 justify-center',
  head_cell:
    'text-gray-60 rounded-md w-[46px] text-body-s text-gray-50 font-medium',
  row: 'flex mt-2 justify-center',
  cell: 'text-center text-sm p-0 relative [&:has([aria-selected].day-range-start)]:rounded-l-full [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-transparent [&:has([aria-selected])]:bg-primary-5 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20',
  day: cn(
    buttonVariants({ variant: 'ghost' }),
    'h-[42px] w-[42px] p-0 font-normal aria-selected:opacity-100 rounded-full focus:ring-0'
  ),
  day_range_end: 'day-range-end',
  day_range_start: 'day-range-start',
  day_selected:
    'bg-primary-10 text-primary-120 hover:bg-primary-10 hover:text-primary-120 focus:bg-primary-10 focus:text-primary-120',
  day_today: 'border border-primary-100',
  day_outside: '!opacity-0 pointer-events-none text-gray-60 day-outside',

  day_disabled: '!text-gray-20 !bg-white',
  day_range_middle: 'aria-selected:bg-primary-5 aria-selected:text-gray-100',
  day_hidden: 'invisible',
}
