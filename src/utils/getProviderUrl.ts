import qs from 'qs'

import { getProviderBaseUrl } from '@/utils/getProviderBaseUrl'

interface IGetProviderUrl {
  label?: string
  radius?: number
  latitude?: number
  longitude?: number
  checkIn: string
  checkOut: string
  guests: string
  destId?: string
  destType?: 'hotel' | 'resort' | 'villa' | 'apartment'
  destName?: string
}

export const getProviderUrl = ({
  label,
  radius,
  latitude,
  longitude,
  checkIn,
  checkOut,
  guests,
  destId,
  destType,
  destName,
}: IGetProviderUrl) => {
  const checkInMonthDay = checkIn.split('-')[2]
  const checkOutMonthDay = checkOut.split('-')[2]
  const checkInYearMonth = checkIn.split('-').slice(0, 2).join('-')
  const checkOutYearMonth = checkOut.split('-').slice(0, 2).join('-')

  const query = qs.stringify({
    aid: process.env.NEXT_PUBLIC_TENANT_AID,
    label,
    radius,
    latitude,
    longitude,
    group_adults: guests,
    checkin_year_month: checkInYearMonth,
    checkin_monthday: checkInMonthDay,
    checkout_year_month: checkOutYearMonth,
    checkout_monthday: checkOutMonthDay,
    dest_id: destId,
    dest_type: destType,
    ss: destName,
  })

  return `${getProviderBaseUrl({
    providerLanguage: process.env.NEXT_PUBLIC_TENANT_LOCALE || '',
  })}?${query}`
}
