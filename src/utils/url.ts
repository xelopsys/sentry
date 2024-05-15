export const PATH_ABOUT = '/about'
export const PATH_LOCATIONS = '/' + process.env.NEXT_PUBLIC_LOCATIONS_PATH
export const PATH_CONTACT = '/contact'
export const PATH_PRIVACY = '/privacy'
export const PATH_HOTEL = '/hotel'

export const getLocationUrl = (slug: string) => `${PATH_LOCATIONS}/${slug}`

export const getHotelUrl = (slug: string) => `${PATH_HOTEL}/${slug}`
