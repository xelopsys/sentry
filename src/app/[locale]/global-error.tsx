'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error rendering layout:', error?.digest, error.message)
  }, [error])

  return (
    <html lang="en" className="flex items-center">
      <body className="container flex flex-col items-center gap-6 font-poppins">
        <Typography tag="h2" variant="h2">
          Something went wrong!
        </Typography>
        <Button className="px-8 py-3 font-poppins" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  )
}
