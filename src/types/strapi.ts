import { ICoordinatesProps } from '@/types/common'

export interface IStrapiResponse<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface IStrapiItem<T> {
  id: number
  created_at: string
  updated_at: string
  attributes: {
    created_at: string
    updated_at: string
  } & T
}

export interface IStrapiImage {
  id: number
  attributes: {
    name: string | null
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    ext: '.svg' | '.png' | '.jpg' | '.jpeg'
    mime: 'image/svg+xml' | 'image/png' | 'image/jpeg'
    size: number
    url: string
    createdAt: string
    updatedAt: string
  }
}

export interface IStrapiPopularLocation {
  id: number
  slug: string
  nearHotels: number
  lowestHotelPrice: string
  name: string
  photo: { data: IStrapiImage }
}

export interface IStrapiTopLocation {
  id: number
  price: string
  name: string
  slug: string
  photo: { data: IStrapiImage }
}

export interface IStrapiReview {
  id: number
  date: string
  name: string
  rating: number
  review: string
  photo: { data: IStrapiImage }
}

export interface IStrapiFeaturedLocation {
  id: number
  attributes: {
    name: string
    coordinates: ICoordinatesProps
    googleMapsUri: string
    headerTitle: string
    headerSubtitle: string | null
    slug: string
    type: string
    city: string
    country: string
  }
}
