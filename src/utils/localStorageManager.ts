export const localStorageManager = () => {
  // check if localStorage is available
  if (typeof window === 'undefined') {
    return {
      setItem: () => {},
      getItem: () => null,
      clearItem: () => {},
    }
  }

  return {
    setItem<T>(key: string, value: T | string, expirationDays: number): void {
      const now = new Date().getTime()
      const expirationTime = now + expirationDays * 24 * 60 * 60 * 1000
      const itemObj: {
        value: string | T
        expirationTime: number
      } = {
        value,
        expirationTime,
      }
      localStorage.setItem(key, JSON.stringify(itemObj))
    },
    // getItem method can check if token is expired. If expired, it will return null and clear token
    getItem<T>(key: string): T | null {
      const itemObjStr = localStorage.getItem(key)

      if (!itemObjStr) {
        return null
      }

      const itemObj: {
        value: T
        expirationTime: number
      } = JSON.parse(itemObjStr)

      const now = new Date().getTime()

      if (now > itemObj.expirationTime) {
        this.clearItem(key)
        return null
      }

      return itemObj.value
    },
    clearItem(key: string): void {
      localStorage.removeItem(key)
    },
  }
}
