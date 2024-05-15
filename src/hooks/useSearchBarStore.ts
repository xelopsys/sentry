import { create } from 'zustand'

import { expireDateLocalStorage } from '@/res/constants'
import { ISearchBarValueProps } from '@/types/common'
import { localStorageManager } from '@/utils/localStorageManager'

interface ISearchBarStore {
  searchBarValues: ISearchBarValueProps | null
  setSearchBarValues: (values: ISearchBarValueProps) => void
}

export const useSearchBarStore = create<ISearchBarStore>((set) => {
  // get values from local storage
  const lsManager = localStorageManager()
  const initialLocalStorageValues =
    lsManager?.getItem<ISearchBarValueProps>('searchBarValues')

  return {
    searchBarValues: initialLocalStorageValues || null,
    setSearchBarValues: (values) => {
      lsManager?.setItem<ISearchBarValueProps>(
        'searchBarValues',
        values,
        expireDateLocalStorage
      )
      set({ searchBarValues: values })
    },
  }
})
