import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'

import { i18n, localePrefix, pathnames } from './i18n-config'

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: i18n.locales,
    pathnames,
    localePrefix,
  })
