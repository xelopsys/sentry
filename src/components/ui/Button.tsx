import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

import { LoadingIcon } from '@/res/icons'
import { cn } from '@/utils/common'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-body-m font-semibold transition-colors disabled:bg-gray-10 disabled:text-gray-60 disabled:pointer-events-none focus-within:ring-primary-100 focus-within:ring-inset focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0 !important',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-white hover:bg-primary-120',
        ghost: 'hover:bg-transparent flex p-0',
        icon: 'p-3',
        text: 'bg-transparent !text-green-100 hover:!text-green-140 rounded-none text-body-s font-semibold focus-within:ring-0',
      },
      size: {
        default: 'p-0',
        sm: 'px-8 py-3',
        lg: 'px-[46px] py-5',
      },
      loading: {
        false: null,
        true: null,
      },
    },
    defaultVariants: {
      loading: false,
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      // DEFAULT LOADING STATES
      {
        loading: true,
        variant: 'default',
        className: 'bg-primary-100 text-white',
      },
      // GHOST LOADING STATES
      {
        loading: true,
        variant: 'ghost',
        className: 'text-gray-60',
      },
      // ICON LOADING STATES
      {
        loading: true,
        variant: 'icon',
        className: 'bg-primary-100 text-white',
      },
    ],
  }
)

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  Icon?: any
  iconClassName?: string
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      Icon,
      iconClassName,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, loading }))}
        ref={ref}
        {...props}
        disabled={loading || disabled}
      >
        {Icon && !loading ? (
          <Icon
            className={clsx(
              'w-4 h-4',
              disabled && 'text-gray-50',
              !disabled && 'text-inherit',
              iconClassName
            )}
          />
        ) : null}
        {loading && <LoadingIcon className="text-white w-6 h-6 animate-spin" />}
        {!loading && children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
