import { create } from 'zustand'

import { expireDateLocalStorage } from '@/res/constants'
import { TCurrencies } from '@/types/common'
import { localStorageManager } from '@/utils/localStorageManager'

interface ICurrencyStore {
  currency: TCurrencies['value']
  setCurrency: (currency: TCurrencies['value']) => void
}

export const useCurrencyStore = create<ICurrencyStore>((set) => {
  // get currency from local storage
  const lsManager = localStorageManager()
  const currency =
    lsManager?.getItem<TCurrencies['value']>('currency') ||
    process.env.NEXT_PUBLIC_DEFAULT_CURRENCY ||
    'usd'

  return {
    currency,
    setCurrency: (currency) => {
      lsManager?.setItem('currency', currency, expireDateLocalStorage)
      set({ currency })
    },
  }
})
