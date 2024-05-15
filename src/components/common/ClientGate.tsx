'use client'

import { PropsWithChildren, useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export const ClientGate = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  )

  return isServer ? <div className={className} /> : <>{children}</>
}
