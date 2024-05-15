'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Navigation } from '@/components/ui/Navigation'
import { Typography } from '@/components/ui/Typography'
import { urls } from '@/res/urls'
import { awsImgQuery } from '@/utils/awsImgQuery'
import { cn } from '@/utils/common'

interface IFooterProps {
  logo: string
  linksObject: typeof urls.footer
  rightsText: string
  className?: string
}

export const Footer = ({
  logo,
  linksObject,
  rightsText,
  className,
}: IFooterProps) => {
  const year = new Date().getFullYear()
  const clsx = cn(
    'bg-gray-100 rounded-t-3xl py-[50px] px-[50px]',
    'lg:px-0',
    className
  )

  return (
    <footer className={clsx}>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-12 container">
        <Link href="/" className="flex justify-center">
          <Image
            loader={({ src, width, quality }) => {
              return awsImgQuery({
                src,
                width,
                quality,
              })
            }}
            src={logo}
            alt="Logo"
            width={78}
            height={31}
          />
        </Link>
        <Navigation
          linksObject={linksObject}
          className="flex flex-col items-center gap-2 lg:flex-row lg:gap-8"
          classNameLink="py-2 mx-2 font-medium !text-body-s lg:!text-body-m text-white after:bottom-2"
        />
        <Typography
          className="lg:ml-auto"
          weight="font-normal"
          variant="body-s"
          color="text-white"
        >
          &copy; {year}. {rightsText}
        </Typography>
      </div>
    </footer>
  )
}
