import { format } from 'date-fns'

import { defaultMinGuests } from '@/res/constants'

export const getFormattedQueryParams = ({
  checkIn,
  checkOut,
  guests,
}: {
  checkIn?: Date | undefined
  checkOut?: Date | undefined
  guests?: string
}) => {
  return {
    checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : '',
    checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : '',
    guests: guests || defaultMinGuests.toString(),
  }
}
