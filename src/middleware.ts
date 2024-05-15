import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { i18n, localePrefix } from './i18n-config'

const nextIntlMiddleware = createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  // pathnames,
  localePrefix,
})

export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|opengraph-image|_next|_hive|.*\\..*).*)',
  ],
}

export default function middleware(req: NextRequest): NextResponse {
  return nextIntlMiddleware(req)
}
