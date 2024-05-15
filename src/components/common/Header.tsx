'use client'

import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { Navigation } from '@/components/ui/Navigation'
import { useHeaderStore } from '@/hooks/useHeaderStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { darkThemeHeaderPages } from '@/res/constants'
import { MenuBurgerIcon, MenuCloseIcon } from '@/res/icons'
import { urls } from '@/res/urls'
import { awsImgQuery } from '@/utils/awsImgQuery'
import { cn } from '@/utils/common'

interface IHeaderProps {
  linksObject: typeof urls.header
  logo: string
  logoDark: string
  className?: string
}

export const Header = ({
  logo,
  logoDark,
  linksObject,
  className,
}: IHeaderProps) => {
  const pathname = usePathname()
  const { slug } = useParams()
  const { isPinned } = useHeaderStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const scrollDirection = useScrollDirection()
  const [open, setOpen] = useState(false)

  let isDarkTheme, pinHeader, headerShadow
  // let hasMarginTop = true

  // for home page
  if (pathname === '/') {
    if (isPinned) {
      pinHeader = true
      isDarkTheme = true
      headerShadow = true
    }

    // mobile
    if (!isDesktop && pinHeader) {
      // hasMarginTop = false
    }
  }

  // for searched location result page
  if (pathname !== '/') {
    isDarkTheme = false

    if (isPinned) {
      // hasMarginTop = false
    }
  }

  // dark theme pages
  const [, requiredPath] = pathname.split('/')
  if (darkThemeHeaderPages.find((page) => requiredPath === page)) {
    isDarkTheme = true
  }

  // specific cases
  // if page is location and slug is present
  if (
    slug &&
    process.env.NEXT_PUBLIC_LOCATIONS_PATH &&
    pathname.includes(process.env.NEXT_PUBLIC_LOCATIONS_PATH)
  ) {
    isDarkTheme = false
  }

  // general
  if (scrollDirection === 'up' && !isDesktop && isPinned) {
    pinHeader = true
    isDarkTheme = true
  }

  const clsx = cn(
    'py-3 relative z-40 md:py-[26px]',
    pinHeader && 'fixed z-[60] top-0 left-0 right-0 bg-white',
    headerShadow && 'shadow-drop-to-bottom',
    // hasMarginTop ? 'mt-[45px] md:mt-0' : 'mt-0', // turn off based on feedback
    open && 'z-60',
    className
  )

  // close mobile menu when the page changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // make body overflow hidden when the mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const logoSrc = isDarkTheme ? logoDark : logo

  return (
    <header className={clsx}>
      <div className={'container flex justify-between items-center'}>
        <Link href="/" className="flex justify-center">
          <Image
            loader={({ src, width, quality }) => {
              return awsImgQuery({
                src,
                width,
                quality,
              })
            }}
            src={logoSrc}
            alt="Logo"
            width={78}
            height={31}
          />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Navigation
            linksObject={linksObject}
            usedInHeader
            classNameLink={
              isDarkTheme ? 'text-gray-100 after:bg-gray-100' : 'text-white'
            }
          />
          {/* TODO: implement currency converter
          <CurrencyChanger currencies={currencies} theme={darkThemeCurrency} /> */}
        </div>
        <div className="md:hidden">
          <Button onClick={() => setOpen(true)} variant="ghost">
            <MenuBurgerIcon
              className={isDarkTheme ? 'text-gray-100' : 'text-white'}
            />
          </Button>
        </div>
        {open && (
          <MobileMenu
            darkLogo={logoDark}
            links={linksObject}
            className="py-3"
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </header>
  )
}

interface IMobileMenu {
  onClose: () => void
  links: typeof urls.header
  darkLogo: string
  className?: string
}

const MobileMenu = ({ darkLogo, links, onClose, className }: IMobileMenu) => {
  const clsx = cn(
    'fixed inset-0 bg-white z-[999] flex flex-col container',
    className
  )

  return (
    <div className={clsx} role="menubar">
      <div className="flex items-center justify-between" role="menuitem">
        <Link href="/" className="flex justify-center">
          <Image src={darkLogo} alt="Logo" width={78} height={31} />
        </Link>
        <Button onClick={onClose} variant="ghost">
          <MenuCloseIcon className="size-8 text-gray-100" />
        </Button>
      </div>
      <div className="flex flex-col gap-5 items-center mt-[60px]">
        <Navigation
          linksObject={links}
          usedInHeader
          className="flex-col gap-5"
          classNameLink={'text-gray-100 after:bg-gray-100'}
        />
        {/* TODO: implement currency converter
        <CurrencyChanger currencies={currencies} theme={'dark'} /> */}
      </div>
    </div>
  )
}
