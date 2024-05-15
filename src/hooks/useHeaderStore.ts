import { create } from 'zustand'

interface IHeaderStore {
  isPinned: boolean
  setIsPinned: (value: boolean) => void
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  isPinned: false,
  setIsPinned: (value) => set({ isPinned: value }),
}))
