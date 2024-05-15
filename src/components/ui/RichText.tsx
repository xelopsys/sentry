import React, { PropsWithChildren, ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'

import { Typography } from '@/components/ui/Typography'
import { cn } from '@/utils/common'

interface RichTextProps {
  content: string
  className?: string
}

export const RichText = ({
  content,
  className,
}: RichTextProps): ReactElement<'div'> => {
  return (
    <ReactMarkdown
      className={cn(className)}
      components={{
        a: ({ children, href }) => (
          <a
            href={href}
            target={href && href.includes('https') ? '_blank' : '_self'}
            rel="noreferrer"
            className="text-body-s font-semibold text-green-100 hover:text-green-140"
          >
            {children}
          </a>
        ),
        p: ({ children }: PropsWithChildren) => (
          <Typography
            variant="body-s"
            color="text-gray-100"
            weight="font-normal"
            className="lg:text-body-m mb-2 lg:mb-4"
          >
            {children}
          </Typography>
        ),
        h1: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h1"
            variant="h1"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        h2: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h2"
            variant="h2"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        h3: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h3"
            variant="h3"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        h4: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h4"
            variant="sub-header"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        h5: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h5"
            variant="title"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        h6: ({ children }: PropsWithChildren) => (
          <Typography
            tag="h6"
            variant="sub-title"
            color="text-gray-100"
            weight="font-semibold"
            className="mt-5 mb-2"
          >
            {children}
          </Typography>
        ),
        ul: ({ children }: PropsWithChildren) => (
          <ul className="my-2.5 lg:my-5 list-disc list-inside text-body-s lg:text-body-m text-gray-100 font-normal">
            {children}
          </ul>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
