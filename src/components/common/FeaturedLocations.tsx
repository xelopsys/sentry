'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { maxFeaturedTargetLinks } from '@/res/constants'
import { SearchLinkIcon } from '@/res/icons'
import { IFeaturedTargetProps } from '@/types/common'
import { cn } from '@/utils/common'

interface IFeaturedLocationsList {
  title: string
  items: IFeaturedTargetProps[]
  usedInLocationsPage?: boolean
  className?: string
}

export const FeaturedLocations = ({
  title,
  items = [],
  usedInLocationsPage,
  className,
}: IFeaturedLocationsList) => {
  const tr = useTranslations('featuredLocations')

  const clsx = cn('flex flex-col', className)
  const clsxList = cn(
    'flex flex-col gap-3',
    'md:grid md:grid-cols-2 lg:gap-x-10 lg:grid-cols-3',
    'transition-all duration-300 ease-in-out'
  )

  const isMobile = useMediaQuery('(max-width: 768px)')
  const [listItems, setListItems] = useState<IFeaturedTargetProps[]>([])

  useEffect(() => {
    setListItems(isMobile ? items.slice(0, maxFeaturedTargetLinks) : items)
  }, [isMobile, items])

  const handleLoadMore = () => {
    setListItems((prev) => {
      return prev.length <= maxFeaturedTargetLinks
        ? items
        : items.slice(0, maxFeaturedTargetLinks)
    })
  }

  const tag = usedInLocationsPage ? 'h1' : 'h2'

  return (
    <section className={clsx}>
      <Typography
        tag={tag}
        variant="sub-header"
        color="text-gray-100"
        weight="font-semibold"
        className="mb-[50px] lg:text-h2"
      >
        {title}
      </Typography>
      <ul className={clsxList}>
        {listItems.map((link, i) => (
          <li key={`${link.path}-${link.id}-${i}`} className="flex min-w-0">
            <Link
              className="inline-flex items-center gap-3 text-body-s text-green-100"
              href={link.path}
            >
              <SearchLinkIcon className="size-7 shrink-0" />
              {tr('locationTemplate', {
                locationTitle: link.label,
              })}
            </Link>
            <span />
          </li>
        ))}
      </ul>
      {isMobile && maxFeaturedTargetLinks < items.length && (
        <Button
          onClick={handleLoadMore}
          className="px-8 py-4 mt-[50px] rounded-xl sm:self-center"
        >
          {listItems.length <= maxFeaturedTargetLinks
            ? tr('showMore')
            : tr('showLess')}
        </Button>
      )}
    </section>
  )
}
