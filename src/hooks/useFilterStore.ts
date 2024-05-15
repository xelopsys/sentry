import { create } from 'zustand'

import { expireDateLocalStorage } from '@/res/constants'
import { localStorageManager } from '@/utils/localStorageManager'

interface IFilterStore {
  filter: string
  setFilter: (filter: string) => void
}

export const useFilterStore = create<IFilterStore>((set) => {
  // get filter from local storage
  const lsManager = localStorageManager()
  const filter = lsManager?.getItem<string>('filter') || ''

  return {
    filter,
    setFilter: (filter) => {
      lsManager?.setItem('filter', filter, expireDateLocalStorage)
      set({ filter })
    },
  }
})
