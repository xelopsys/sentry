'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({ error }: any) {
  useEffect(() => {
    Sentry.captureException(error)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  )
}
