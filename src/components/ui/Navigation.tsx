import { usePathname } from 'next/navigation'

import { Link } from '@/components/ui/Link'
import { urls } from '@/res/urls'
import { INavLinkProps } from '@/types/common'
import { cn } from '@/utils/common'

interface INavigationProps {
  linksObject: typeof urls.header | typeof urls.footer
  className?: string
  classNameLink?: string
  usedInHeader?: boolean
}

export const Navigation = ({
  linksObject,
  className,
  classNameLink,
  usedInHeader = false,
}: INavigationProps) => {
  const pathname = usePathname()
  const clsx = cn('flex items-center gap-8', className)

  const links = Object.entries(linksObject).map(([url, label]) => ({
    label,
    url: url.replace(/_/g, '-'),
  })) as INavLinkProps[]

  const isActive = (url: string) => {
    if (pathname.replace(/\//g, '') === url) return true
    return false
  }

  return (
    <nav className={clsx}>
      {links &&
        links.length > 0 &&
        links.map((link) => (
          <Link
            className={cn(
              'whitespace-nowrap py-2 lg:mx-2 group relative after:content-[""] after:absolute after:bottom-2.5 after:left-0 after:h-px after:bg-white after:w-0 after:transition-all after:duration-200 after:ease-in-out after:group-hover:w-full after:group-focus:w-full after:group-active hover:after:w-full',
              usedInHeader && isActive(link.url) && 'after:w-full',
              !usedInHeader && 'after:bottom-0',
              classNameLink
            )}
            key={link.url}
            href={link.url[0] === '/' ? link.url : `/${link.url}`}
            aria-current={isActive(link.url) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
    </nav>
  )
}
