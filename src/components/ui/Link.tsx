import NextLink, { LinkProps } from 'next/link'
import { forwardRef, PropsWithChildren } from 'react'

import { cn } from '@/utils/common'

interface ILinkProps extends LinkProps {
  target?: '_blank' | '_self' | '_parent' | '_top'
  className?: string
}

export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<ILinkProps>
>(({ href, children, className, ...props }, ref) => {
  const clsx = cn('text-body-m font-medium text-white', className)
  return (
    <NextLink href={href} ref={ref} className={clsx} {...props}>
      {children}
    </NextLink>
  )
})
