import { RefObject, useEffect, useRef } from 'react'

const isSSR = !(typeof window !== 'undefined' && window.document?.createElement)

type useEventListener = {
  eventType: keyof WindowEventMap
}

export const useEventListener = (
  eventType: keyof DocumentEventMap,
  callback: (
    event:
      | WindowEventMap[keyof WindowEventMap]
      | HTMLElementEventMap[keyof HTMLElementEventMap]
      | MediaQueryListEventMap[keyof MediaQueryListEventMap]
      | Event
  ) => void,
  element: RefObject<Element> | Document | Window | undefined = isSSR
    ? undefined
    : window
) => {
  // Save callback as ref and update it only when changes -> to prevent re-renders
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const target = element && 'current' in element ? element.current : element

    target?.addEventListener(eventType, callback)

    return () => {
      target?.removeEventListener(eventType, callback)
    }
  }, [eventType, element, callback])
}
