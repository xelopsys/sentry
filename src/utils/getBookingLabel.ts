export const ELEMENT_HOME_SEARCH = 'home-search'
export const ELEMENT_LOCATION_SEARCH = 'location-search'
export const ELEMENT_LOCATION_HOTEL_CARD = 'location-card'
export const ELEMENT_HOTEL_AVAILABILITY = 'hotel-availability'
export const ELEMENT_HOTEL_RECOMMENDED = 'hotel-recommended'

interface IGetBookingLabel {
  element: string
  locationSlug?: string
  hotelId?: number | string
  gclid?: string
}

export const getBookingLabel = ({
  element = '',
  locationSlug,
  hotelId,
  gclid,
}: IGetBookingLabel) => {
  return `${process.env.NEXT_PUBLIC_TENANT_ID}_${element}${locationSlug ? '_' + locationSlug : ''}${hotelId ? '_' + hotelId : ''}${gclid ? '_' + gclid : ''}`
}
