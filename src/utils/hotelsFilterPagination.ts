import { ICoordinatesProps, IHotelProps } from '@/types/common'
import { IStrapiItem } from '@/types/strapi'
import { distanceCalc } from '@/utils/distanceCalc'

interface IFilterCriteria {
  topRated?: boolean
  priceAsc?: boolean
  priceDesc?: boolean
  distanceAsc?: boolean
  distanceDesc?: boolean
}

interface IPaginationOptions {
  page: number
  pageSize: number
}

export const hotelsFilterPagination = (
  hotels: IStrapiItem<IHotelProps>[],
  filterCriteria: IFilterCriteria,
  paginationOptions: IPaginationOptions,
  stadiumCoordinates: ICoordinatesProps
): { filteredHotels: IStrapiItem<IHotelProps>[]; totalItems: number } => {
  // Apply filtering based on criteria
  let filteredHotels = [...(hotels || [])]

  if (filterCriteria.topRated) {
    filteredHotels = filteredHotels.sort(
      (a, b) =>
        b.attributes.rating.review_score - a.attributes.rating.review_score
    )
  }

  // Sorting based on criteria
  if (filterCriteria.priceAsc) {
    filteredHotels.sort(
      (a, b) =>
        (a.attributes.priceCategory?.length || 2) -
        (b.attributes.priceCategory?.length || 2)
    )
  } else if (filterCriteria.priceDesc) {
    filteredHotels.sort(
      (a, b) =>
        (b.attributes.priceCategory?.length || 2) -
        (a.attributes.priceCategory?.length || 2)
    )
  } else if (filterCriteria.distanceAsc) {
    filteredHotels.sort((a, b) => {
      const { walkingTime: wTA } = distanceCalc(
        a.attributes.coordinates,
        stadiumCoordinates
      )
      const { walkingTime: wTB } = distanceCalc(
        b.attributes.coordinates,
        stadiumCoordinates
      )

      return wTA - wTB
    })
  } else if (filterCriteria.distanceDesc) {
    filteredHotels.sort((a, b) => {
      const { walkingTime: wTA } = distanceCalc(
        a.attributes.coordinates,
        stadiumCoordinates
      )
      const { walkingTime: wTB } = distanceCalc(
        b.attributes.coordinates,
        stadiumCoordinates
      )

      return wTB - wTA
    })
  }

  // Apply pagination
  const startIndex = (paginationOptions.page - 1) * paginationOptions.pageSize
  const paginatedHotels = filteredHotels.slice(
    startIndex,
    startIndex + paginationOptions.pageSize
  )

  return {
    filteredHotels: paginatedHotels,
    totalItems: filteredHotels.length,
  }
}
