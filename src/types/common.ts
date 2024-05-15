import { currencies } from '@/res/constants'
import { IStrapiImage } from '@/types/strapi'

export type TStringKeys<objType extends object> = Array<
  Extract<keyof objType, string>
>

export type TCurrencies = (typeof currencies)[number]

export interface INavLinkProps {
  label: string
  url: string
}

export interface ICurrencyProps {
  label: string
  value: string
}

export interface IStatProps {
  label: string
  value: string
}

export interface ICoordinatesProps {
  latitude: number
  longitude: number
}
export interface ILocationProps {
  id: number
  slug: string
  name: string
  image: string
  price: number
  location: string
  coordinates: ICoordinatesProps
  city: string
  country: string
  headerTitle: string
  type: string
  hotelsPrice: string
  hotelsCount: string
}

export interface ITopLocationProps {
  id: number
  slug: string
  name: string
  price: number
  photo: { data: IStrapiImage }
}

export interface IPopularLocationProps extends ITopLocationProps {
  nearHotels: number
}

export interface IFaqProps {
  id: number
  question: string
  answer: string
}

export interface IReviewProps {
  id: number
  name: string
  image: string
  review: string
  rating: number
  date: string
}

export interface IPageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface IFeaturedTargetProps {
  id: number
  label: string
  path: string
}

export interface IHotelProps {
  id: number
  sourceId: string
  slug: string
  name: string
  labelType: string
  rating: {
    stars: number
    preferred: boolean
    stars_type: string
    review_score: number
    number_of_reviews: number
  }
  facilities: { id: number; name: string }[]
  price: number
  sourceUrl: string
  photos: {
    data: IStrapiImage[]
  }
  coordinates: ICoordinatesProps
  priceCategory?: string
}

export interface IFilterDataProps {
  foundHotels: number
}

export interface IAboutBenefitsItemProps {
  title: string
  description: string
}

export interface IPeopleProps {
  name: string
  image: string
  position: string
}

export interface IAmenitiesItemProps {
  id: number
  name: string
}

export interface ISearchBarValueProps {
  location?: ILocationProps
  checkIn?: Date | undefined
  checkOut?: Date | undefined
  guests?: string
}

export interface IProvidersStore {
  translations: object
  setTranslations: (lib: object) => void
}
