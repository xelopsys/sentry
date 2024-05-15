import { useCallback, useEffect, useRef, useState } from 'react'

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<'up' | 'down'>()
  const oldScrollY = useRef(0)

  const controlDirection = useCallback(() => {
    if (window.scrollY > oldScrollY.current) {
      setDirection('down')
    } else {
      setDirection('up')
    }

    oldScrollY.current = window.scrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', controlDirection)
    return () => {
      window.removeEventListener('scroll', controlDirection)
    }
  }, [controlDirection])

  return direction
}
