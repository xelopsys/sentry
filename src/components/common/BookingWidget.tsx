'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { CalendarInput } from '@/components/ui/CalendarInput'
import { Divider } from '@/components/ui/Divider'
import { Link } from '@/components/ui/Link'
import { SearchBarSelect } from '@/components/ui/SearchBarSelect'
import { Typography } from '@/components/ui/Typography'
import { useCurrencyStore } from '@/hooks/useCurrencyStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSearchBarStore } from '@/hooks/useSearchBarStore'
import { defaultMinGuests, maxGuests } from '@/res/constants'
import { IHotelProps } from '@/types/common'
import { recordClickout } from '@/utils/analytics'
import { cn, getPriceCategory, getPriceCategoryLabel } from '@/utils/common'
import {
  ELEMENT_HOTEL_AVAILABILITY,
  getBookingLabel,
} from '@/utils/getBookingLabel'
import { getFormattedQueryParams } from '@/utils/getFormattedQueryParams'
import { getPropertyUrl } from '@/utils/getPropertyUrl'
import { getProviderUrl } from '@/utils/getProviderUrl'

interface IBookingWidgetProps {
  propertyData: IHotelProps
  currency: string
  className?: string
}

export const BookingWidget = (props: Omit<IBookingWidgetProps, 'currency'>) => {
  const isFixedWidget = useMediaQuery('(max-width: 1023px)')
  const { currency } = useCurrencyStore()

  return isFixedWidget ? (
    <BookingWidgetMobile {...{ ...props, currency }} />
  ) : (
    <BookingWidgetDesktop {...{ ...props, currency }} />
  )
}

const BookingWidgetMobile = ({
  propertyData,
  currency,
  className,
}: IBookingWidgetProps) => {
  const clsx = cn(
    'bg-white shadow-drop-to-top fixed z-50 bottom-0 left-0 right-0 w-full p-4 flex items-center justify-between gap-10',
    className
  )
  const bookingUrl = getPropertyUrl({
    id: propertyData.id,
    location: propertyData.name,
    type: 'hotel',
  })

  const t = useTranslations('hotelTranslations.bookingWidget')

  // TODO: uncomment once we have Booking.com API
  // const priceText = formatText(tr?.priceFromText, {
  //   hotelPrice: `${getCurrencySymbol(currency || '')}${Math.round(propertyData.price)}`,
  // })

  const formattedPriceCategory = getPriceCategory(
    propertyData?.priceCategory || '$$',
    currency
  )
  const priceCategoryLabel = getPriceCategoryLabel(
    propertyData?.priceCategory || '$$'
  )

  return (
    <div className={clsx}>
      <div className="flex flex-col items-start">
        <Typography
          tag="span"
          variant="body-m"
          weight="font-semibold"
          color="text-gray-100"
        >
          {formattedPriceCategory}
        </Typography>
        <Typography
          tag="span"
          variant="body-xs"
          weight="font-normal"
          color="text-gray-70"
        >
          {priceCategoryLabel}
        </Typography>
      </div>
      <Link
        href={bookingUrl}
        target="_blank"
        className="px-8 py-3 rounded-xl bg-primary-100 hover:bg-primary-120 text-body-m font-semibold text-center text-white"
      >
        {t('buttonLabel')}
      </Link>
    </div>
  )
}

const BookingWidgetDesktop = ({
  propertyData,
  currency,
  className,
}: IBookingWidgetProps) => {
  const { searchBarValues } = useSearchBarStore()
  const [date, setDate] = useState<DateRange | undefined>({
    from: searchBarValues?.checkIn,
    to: searchBarValues?.checkOut,
  })
  const [guests, setGuests] = useState<string>(
    searchBarValues?.guests || defaultMinGuests.toString()
  )
  const [gclid, setgclid] = useState<string>('')

  const clsx = cn('bg-gray-5 rounded-3xl p-6 flex flex-col gap-6', className)

  const tHotel = useTranslations('hotelTranslations.bookingWidget')
  const t = useTranslations('searchBar')

  const formattedPriceCategory = getPriceCategory(
    propertyData?.priceCategory || '$$',
    currency
  )

  const priceCategoryLabel = getPriceCategoryLabel(
    propertyData?.priceCategory || '$$'
  )

  // TODO: uncomment once we have Booking.com API
  // const priceText = formatText(tr?.priceFromText, {
  //   hotelPrice: `${getCurrencySymbol(currency || '')}${Math.round(propertyData.price)}`,
  // })

  const formattedQueryParams = getFormattedQueryParams({
    checkIn: date?.from,
    checkOut: date?.to,
    guests,
  })

  const bookingUrl = getProviderUrl({
    label: getBookingLabel({
      element: ELEMENT_HOTEL_AVAILABILITY,
      hotelId: propertyData.id,
      gclid,
    }),
    destId: String(propertyData.sourceId),
    destName: propertyData.name,
    destType: 'hotel',
    latitude: propertyData.coordinates?.latitude,
    longitude: propertyData.coordinates?.longitude,
    ...formattedQueryParams,
  })

  useEffect(() => {
    const gclidLocaleStorage = localStorage.getItem('gclid')
    if (gclidLocaleStorage) {
      setgclid(gclidLocaleStorage)
    }
  }, [])

  return (
    <div className={clsx}>
      <Typography
        tag="h2"
        variant="sub-header"
        weight="font-semibold"
        color="text-gray-100"
      >
        {tHotel('title')}
      </Typography>

      <div>
        <CalendarInput
          onChange={setDate}
          value={date}
          placeholder={t('dateInputPlaceholder')}
          className="!rounded-xl hover:bg-white"
          classNameButton="!rounded-xl"
          numberOfMonths={1}
        />
        <SearchBarSelect
          onChange={(val) => setGuests(val)}
          value={guests}
          maxGuests={maxGuests}
          className="mt-2 !rounded-xl hover:bg-white"
        />

        <Link
          onClick={() => recordClickout('hotel-availability', propertyData.id)}
          href={bookingUrl}
          target="_blank"
          className="block mt-4 grow w-full px-8 py-5 rounded-xl bg-primary-100 hover:bg-primary-120 text-body-m font-semibold text-center text-white"
        >
          {tHotel('buttonLabel')}
        </Link>
      </div>

      <Divider />

      <div className="flex items-start justify-between">
        <Typography
          tag="span"
          variant="title"
          weight="font-semibold"
          color="text-gray-100"
        >
          {tHotel('ratesText')}
        </Typography>

        <div className="flex flex-col items-end">
          <Typography
            tag="span"
            variant="title"
            weight="font-semibold"
            color="text-gray-100"
          >
            {formattedPriceCategory}
          </Typography>
          <Typography
            tag="span"
            variant="body-xs"
            weight="font-normal"
            color="text-gray-70"
          >
            {priceCategoryLabel}
          </Typography>
        </div>
      </div>
    </div>
  )
}
