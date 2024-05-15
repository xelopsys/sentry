import { ICurrencyProps } from '@/types/common'

export const currencies: ICurrencyProps[] = [
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
  { label: 'GBP', value: 'gbp' },
]

export const maxGuests = 12

export const defaultMinGuests = 2

export const maxFeaturedTargetLinks = 33

export const maxSearchHints = 5

export const expireDateLocalStorage = 7

export const darkThemeHeaderPages = [
  'hotel',
  'privacy',
  process.env.NEXT_PUBLIC_LOCATIONS_PATH,
  '404',
]

export const searchRadius = 5 // in km

export const minRating = 2

export const defaultRevalidateSeconds = 60
