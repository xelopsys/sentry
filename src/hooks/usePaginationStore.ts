import { create } from 'zustand'

interface IPageStore {
  page: number
  sourceId: string
  setPage: ({ page, sourceId }: { page: number; sourceId: string }) => void
}

export const usePaginationStore = create<IPageStore>((set) => ({
  page: 1,
  sourceId: '',
  setPage: ({ page, sourceId }) => set({ page, sourceId }),
}))
