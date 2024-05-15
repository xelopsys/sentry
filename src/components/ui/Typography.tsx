import { ReactNode } from 'react'

export type TTextColors =
  | 'text-gray-100'
  | 'text-gray-70'
  | 'text-gray-60'
  | 'text-primary-100'
  | 'text-primary-120'
  | 'text-green-140'
  | 'text-green-100'
  | 'text-white'
  | 'text-inherit'

export type TTextWeight =
  | 'font-normal'
  | 'font-medium'
  | 'font-semibold'
  | 'font-bold'

export type TTextSizes =
  | 'text-h1'
  | 'text-h2'
  | 'text-h3'
  | 'text-sub-header'
  | 'text-title'
  | 'text-sub-title'
  | 'text-body-m'
  | 'text-body-s'
  | 'text-body-xs'

export type TTypoVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body-m'
  | 'body-s'
  | 'body-xs'
  | 'sub-header'
  | 'title'
  | 'sub-title'

export const typoTagBySizeMap: Record<
  TTypoVariants,
  {
    tag: string
    size: TTextSizes
  }
> = {
  h1: {
    tag: 'h1',
    size: 'text-h1',
  },
  h2: {
    tag: 'h2',
    size: 'text-h2',
  },
  h3: {
    tag: 'h3',
    size: 'text-h3',
  },
  'body-m': {
    tag: 'p',
    size: 'text-body-m',
  },
  'body-s': {
    tag: 'p',
    size: 'text-body-s',
  },
  'body-xs': {
    tag: 'p',
    size: 'text-body-xs',
  },
  'sub-header': {
    tag: 'p',
    size: 'text-sub-header',
  },
  title: {
    tag: 'p',
    size: 'text-title',
  },
  'sub-title': {
    tag: 'p',
    size: 'text-sub-title',
  },
}

export interface ITypo {
  color?: TTextColors
  weight?: TTextWeight
  className?: string
  children: ReactNode | string | null
  variant?: TTypoVariants
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  required?: boolean
  title?: string
}

export const Typography: React.FC<ITypo> = ({
  tag,
  weight = 'font-medium',
  children,
  className = '',
  variant = 'body-m',
  color = 'text-gray-140',
  ...props
}) => {
  const Component = tag || typoTagBySizeMap[variant].tag
  const size = typoTagBySizeMap[variant].size
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component className={`${size} ${color} ${weight} ${className}`} {...props}>
      {children}
    </Component>
  )
}
