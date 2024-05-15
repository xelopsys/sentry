import { RefObject } from 'react'

import { useEventListener } from '@/hooks/useEventListener'

export const useClickOutside = (
  ref: RefObject<Element>,
  callback: (
    event:
      | WindowEventMap[keyof WindowEventMap]
      | HTMLElementEventMap[keyof HTMLElementEventMap]
      | MediaQueryListEventMap[keyof MediaQueryListEventMap]
      | Event
  ) => void
) => {
  useEventListener('click', (e) => {
    if (ref.current === null || ref.current.contains(<HTMLElement>e.target))
      return
    callback(e)
  })
}
