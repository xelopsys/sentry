import { Pathnames } from 'next-intl/navigation'

export const i18n = {
  defaultLocale: process.env.NEXT_PUBLIC_TENANT_LOCALE || 'en',
  locales: ['en', 'de'],
}

export type Locale = (typeof i18n)['locales'][number]

export const port = process.env.PORT || 3000

export const host = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}`
  : `http://localhost:${port}`

export const pathnames = {
  '/': '/',
  '/en': '/en',
  '/de': '/de',
  '/locations': {
    en: '/locations',
    de: '/locations',
  },
  '/about': {
    en: '/about',
    de: '/about',
  },
  '/contact': {
    en: '/contact',
    de: '/contact',
  },
  '/privacy': {
    en: '/privacy',
    de: '/privacy',
  },
} satisfies Pathnames<typeof i18n.locales>

export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
