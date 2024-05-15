import { type ClassValue, clsx } from 'clsx'
import format from 'string-template'
import { twMerge } from 'tailwind-merge'

import { IStrapiImage } from '@/types/strapi'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatText(
  text: string,
  keysObject: Record<string, string | number>
) {
  if (!text) return ''

  return format(text, keysObject)
}

export const getCurrencySymbol = (currency: string) =>
  ({
    usd: '$',
    eur: '€',
    gbp: '£',
  })[currency]

export const getPriceCategory = (
  priceCategory: string,
  currencySymbol: string
) => priceCategory.replaceAll('$', getCurrencySymbol(currencySymbol) || '$')

// TODO: Add multilingual option
export const getPriceCategoryLabel = (priceCategory: string) => {
  switch (priceCategory?.length) {
    case 1:
      return 'Budget' // Budget
    case 2:
      return 'Standaard' // Standard
    case 3:
      return 'Superior' // Superior
    case 4:
      return 'Luxueus' // Luxurious
    default:
      return 'Standaard' // Standard
  }
}

export const removeIdProp = <T extends Record<string, any>>(obj: T) => {
  if (obj && 'id' in obj) {
    // intentionally remove id prop from object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = obj
    return rest
  }

  return obj
}

export const getStrapiImage = (obj: IStrapiImage) => {
  if (obj && obj.attributes) {
    return obj.attributes.url
  }

  return ''
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
