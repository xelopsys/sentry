'use client'

import HotjarSDK from '@hotjar/browser'
import { useEffect } from 'react'

export const Hotjar = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
      HotjarSDK.init(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), 6)
    }
  }, [])

  return <></>
}
