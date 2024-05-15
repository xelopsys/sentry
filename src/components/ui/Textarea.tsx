import * as React from 'react'

import { cn } from '@/utils/common'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex bg-white border-none rounded-none transition-all font-medium',
          'hover:bg-gray-5',
          'focus-visible:outline-none focus-visible:ring-2 ring-primary-100 ring-inset',
          'focus:outline-none',
          'placeholder:text-base placeholder:text-gray-60',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
