import { create } from 'zustand'

import { IHotelProps } from '@/types/common'

interface IActiveHotelStore {
  activeHotel: IHotelProps | null
  setActiveHotel: (hotel: IHotelProps | null) => void
}

export const useActiveHotelStore = create<IActiveHotelStore>((set) => {
  return {
    activeHotel: null,
    setActiveHotel: (hotel) => {
      set({ activeHotel: hotel })
    },
  }
})
