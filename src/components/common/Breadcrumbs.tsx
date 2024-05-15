'use client'

import Head from 'next/head'
import { Fragment } from 'react'

import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { ChevronRightIcon } from '@/res/icons'
import { cn } from '@/utils/common'

export interface IBreadcrumbItem {
  link?: string
  label: string
}

interface IProps {
  items: IBreadcrumbItem[]
  textColor?: 'text-white' | 'text-gray-100'
  className?: string
  classNameItem?: string
}

export const Breadcrumbs: React.FC<IProps> = ({
  items,
  textColor = 'text-white',
  className = '',
  classNameItem,
}) => {
  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      link: '/',
      label: 'Home',
    },
    ...items,
  ]

  const breadcrumbList = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL,
      },
      ...items.map(({ label, link }, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: label,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}${link}`,
      })),
    ],
  }
  const clsx = `${textColor} line-clamp-1 lg:text-body-s`

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbList),
          }}
        />
      </Head>
      <div className={`container flex items-center ${className}`}>
        {breadcrumbItems.map(({ link, label }, idx) => {
          if (idx === breadcrumbItems.length - 1) {
            return (
              <div key={link || label}>
                <Typography
                  variant="body-xs"
                  tag="span"
                  className={cn(`${clsx} font-normal`, classNameItem)}
                >
                  {label}
                </Typography>
              </div>
            )
          }

          if (link) {
            return (
              <Fragment key={link}>
                <Link key={label} href={link} className={`${textColor}`}>
                  <Typography
                    variant="body-xs"
                    weight="font-medium"
                    tag="span"
                    key={link || label}
                    className={cn(clsx, classNameItem)}
                  >
                    {label}
                  </Typography>
                </Link>
                <div className="mx-1">
                  <ChevronRightIcon
                    className={`size-4 lg:size-6 z-10 ${textColor}`}
                  />
                </div>
              </Fragment>
            )
          }
        })}
      </div>
    </>
  )
}
