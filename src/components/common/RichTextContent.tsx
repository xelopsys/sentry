'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { RichText } from '@/components/ui/RichText'
import { Typography } from '@/components/ui/Typography'
import { ChevronDownIcon } from '@/res/icons'
import { cn } from '@/utils/common'

interface IRichTextContent {
  title: string
  content: string
  className?: string
  classNameTitle?: string
}

export const RichTextContent = ({
  title,
  content,
  className,
  classNameTitle,
}: IRichTextContent) => {
  const [open, setOpen] = useState(false)

  const tr = useTranslations('richTextTranslations')

  return (
    <section className={className}>
      <Typography
        tag="h2"
        variant="h3"
        color="text-gray-100"
        weight="font-semibold"
        className={cn('mb-[30px]', classNameTitle)}
      >
        {title}
      </Typography>
      <RichText
        content={content}
        className={cn(
          'max-w-[782px] line-clamp-[8] overflow-hidden transition-max-h duration-300 ease-in-out',
          open && 'line-clamp-none'
        )}
      />
      <Button
        variant="text"
        className="items-center mt-5"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? tr('showLess') : tr('showMore')}</span>
        <ChevronDownIcon className={cn('ml-1 size-6', open && 'rotate-180')} />
      </Button>
    </section>
  )
}
