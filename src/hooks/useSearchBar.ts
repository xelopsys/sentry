import { differenceInDays } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { useSearchBarStore } from '@/hooks/useSearchBarStore'
import { defaultMinGuests, searchRadius } from '@/res/constants'
import { ILocationProps, ISearchBarValueProps } from '@/types/common'
import { recordClickout, recordSearchButtonClicked } from '@/utils/analytics'
import {
  ELEMENT_HOME_SEARCH,
  ELEMENT_LOCATION_SEARCH,
  getBookingLabel,
} from '@/utils/getBookingLabel'
import { getFormattedQueryParams } from '@/utils/getFormattedQueryParams'
import { getProviderUrl } from '@/utils/getProviderUrl'
import { isDateInThePast } from '@/utils/isDateInThePast'

interface ISearchBarProps {
  defaultLocation?: ILocationProps
}

export const useSearchBar = (props?: ISearchBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [inputError, setInputError] = useState(false)
  const [gclid, setgclid] = useState('')

  const { searchBarValues: lsValues, setSearchBarValues: lsSetValues } =
    useSearchBarStore()

  // get values from search params
  const searchParams = useSearchParams()
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = searchParams.get('guests')

  // check if checkIn or lsValues.checkIn is in the past. Set checkIn to undefined
  const checkInDate = getInitCheckDate(checkIn, lsValues?.checkIn)
  // check if checkOut or lsValues.checkOut is in the past. Set checkOut to undefined
  const checkOutDate = getInitCheckDate(checkOut, lsValues?.checkOut)

  const [searchBarValues, setSearchBarValues] = useState<ISearchBarValueProps>({
    location: getInitLocation(props?.defaultLocation, lsValues?.location),
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: getInitGuests(guests, lsValues?.guests),
  })

  const handleDateRangeChange = useCallback(
    (date?: DateRange) => {
      setSearchBarValues((prev) => ({
        ...prev,
        checkIn: date?.from,
        checkOut: date?.to,
      }))

      // save to local storage
      lsSetValues({
        ...lsValues,
        checkIn: date?.from,
        checkOut: date?.to,
      })
    },
    [lsSetValues, lsValues]
  )

  const handleDateRangeClear = useCallback(() => {
    setSearchBarValues((prev) => ({
      ...prev,
      checkIn: undefined,
      checkOut: undefined,
    }))

    // save to local storage
    lsSetValues({
      ...lsValues,
      checkIn: undefined,
      checkOut: undefined,
    })
  }, [lsValues, lsSetValues])

  const handleSelectGuests = useCallback(
    (value: string) => {
      setSearchBarValues((prev) => ({ ...prev, guests: value }))

      // save to local storage
      lsSetValues({
        ...lsValues,
        guests: value,
      })
    },
    [lsSetValues, lsValues]
  )

  const handleInputChange = useCallback(
    (value: ILocationProps | undefined) => {
      setSearchBarValues((prev) => ({ ...prev, location: value }))

      // save to local storage
      lsSetValues({
        ...lsValues,
        location: value,
      })
    },
    [lsSetValues, lsValues]
  )

  const handleClearInput = useCallback(() => {
    setSearchBarValues((prev) => ({ ...prev, location: undefined }))

    // save to local storage
    lsSetValues({
      ...lsValues,
      location: undefined,
    })
  }, [lsSetValues, lsValues])

  const handleSubmit = useCallback(() => {
    if (!searchBarValues.location) {
      // set error message in input
      setInputError(true)
      return
    }

    const { checkIn, checkOut, guests } = searchBarValues

    const params = getFormattedQueryParams({
      checkIn,
      checkOut,
      guests: guests || defaultMinGuests.toString(),
    })

    const bookingWindow = checkIn
      ? differenceInDays(checkIn || new Date(), new Date())
      : undefined

    const lengthOfStay =
      checkIn && checkOut ? differenceInDays(checkOut, checkIn) : undefined

    recordSearchButtonClicked(
      searchBarValues?.location?.slug,
      bookingWindow,
      lengthOfStay
    )

    const providerUrl = getProviderUrl({
      label: getBookingLabel({
        element:
          pathname === '/' ? ELEMENT_HOME_SEARCH : ELEMENT_LOCATION_SEARCH,
        locationSlug: searchBarValues?.location?.slug,
        gclid,
      }),
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests || '',
      latitude: searchBarValues.location.coordinates.latitude,
      longitude: searchBarValues.location.coordinates.longitude,
      radius: searchRadius,
    })

    recordClickout(pathname === '/' ? 'home-search' : 'location-search')

    router.push(providerUrl)
  }, [searchBarValues, router, pathname, gclid])

  const handleReset = useCallback(() => {
    const obj = {
      location: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: defaultMinGuests.toString(),
    }

    setSearchBarValues(obj)

    // clear local storage
    lsSetValues(obj)
  }, [lsSetValues])

  useEffect(() => {
    if (searchBarValues.location) {
      setInputError(false)
    }
  }, [searchBarValues.location])

  useEffect(() => {
    const gclidLocaleStorage = localStorage.getItem('gclid')
    if (gclidLocaleStorage) {
      setgclid(gclidLocaleStorage)
    }
  }, [])

  return {
    queryParams: {
      ...searchBarValues,
    },
    location: searchBarValues.location,
    inputError,
    handleDateRangeChange,
    handleDateRangeClear,
    handleSelectGuests,
    handleInputChange,
    handleSubmit,
    handleClearInput,
    handleReset,
  }
}

const getInitLocation = (
  defaultLocation?: ILocationProps,
  lsLocation?: ILocationProps
) => {
  return defaultLocation ? defaultLocation : lsLocation || undefined
}

const getInitCheckDate = (checkDate: string | null, lsCheckDate?: Date) => {
  let checkDateValue: Date | undefined

  if (checkDate) {
    checkDateValue = new Date(checkDate)

    if (isDateInThePast(checkDateValue)) {
      checkDateValue = undefined
    }
  } else {
    if (lsCheckDate) {
      checkDateValue = new Date(lsCheckDate)

      if (isDateInThePast(checkDateValue)) {
        checkDateValue = undefined
      }
    }
  }

  return checkDateValue
}

const getInitGuests = (guests: string | null, lsGuests?: string) => {
  return guests ? guests : lsGuests || defaultMinGuests.toString()
}
