import '@/styles/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
// import { getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'

// import { Footer } from '@/components/common/Footer'
// import { Header } from '@/components/common/Header'
import { Hotjar } from '@/components/common/Hotjar'
import { Toaster } from '@/components/ui/Sonner'
import { getGeneralData } from '@/lib/getGeneralData'
import { Providers } from '@/providers/Providers'
// import { urls } from '@/res/urls'
import { cn } from '@/utils/common'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ''),
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  // const t = await getTranslations('links')
  // const locale = process.env.NEXT_PUBLIC_TENANT_LOCALE
  // Fetch data
  const generalData = await getGeneralData()

  // const headerData = generalData?.header
  // const footerData = generalData?.footer
  // const links = {
  //   about: t('about'),
  //   contact: t('contact'),
  // }

  // Header and footer links
  // let headerLinks = generalData
  //   ? {
  //       locations: generalData.header.locationType,
  //       ...links,
  //     }
  //   : ({} as typeof urls.header)

  // let footerLinks = generalData
  //   ? {
  //       locations: generalData.footer.locationType,
  //       ...links,
  //       privacy: t('privacy'),
  //     }
  //   : ({} as typeof urls.footer)

  // TODO: refactor
  // if (process.env.NEXT_PUBLIC_LOCATIONS_PATH) {
  //   headerLinks = Object.assign(
  //     { [process.env.NEXT_PUBLIC_LOCATIONS_PATH]: headerLinks },
  //     headerLinks
  //   )

  //   footerLinks = Object.assign(
  //     { [process.env.NEXT_PUBLIC_LOCATIONS_PATH]: footerLinks },
  //     footerLinks
  //   )

  //   if (process.env.NEXT_PUBLIC_LOCATIONS_PATH != 'locations') {
  //     // @ts-expect-error We need to refactor this
  //     delete headerLinks.locationType
  //     // @ts-expect-error We need to refactor this
  //     delete footerLinks.locationType
  //   }
  // }

  // const logoUrl = getStrapiImage(headerData?.logoLight.data)
  // const logoDarkUrl = getStrapiImage(headerData?.logoDark.data)
  // const footerlogoUrl = getStrapiImage(footerData?.logo.data)

  const clsxBody = cn(poppins.className, 'flex flex-col min-h-screen')

  const messages = (
    await import(`../messages/${process.env.NEXT_PUBLIC_TENANT_LOCALE}`)
  ).default

  return (
    <html lang={process.env.NEXT_PUBLIC_TENANT_LOCALE}>
      <body className={clsxBody}>
        <Providers translations={generalData}>
          <NextIntlClientProvider
            locale={process.env.NEXT_PUBLIC_TENANT_LOCALE}
            messages={messages}
          >
            <div className="relative z-50 min-h-14 lg:min-h-[92px]">
              {/* <Header
                logo={logoUrl}
                logoDark={logoDarkUrl}
                linksObject={headerLinks}
              /> */}
            </div>
            {children}
            {/* <Footer
              logo={footerlogoUrl}
              className="mt-auto"
              linksObject={footerLinks}
              rightsText={footerData?.rightsText}
            /> */}
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      <Hotjar />
    </html>
  )
}
