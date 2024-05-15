import qs from 'qs'

import { fetchApi } from '@/lib/fetchApi'

const query = qs.stringify({
  populate: [
    'header.logoLight',
    'header.logoDark',
    'header',
    'searchBar.errors',
    'footer.logo',
    'footerLinks',
    'topLocations',
    'popularLocations',
    'featuredLocations',
    'locationTranslations',
    'hotelTranslations.bookingWidget',
    'contactForm',
    'formMessages',
    'richTextTranslations',
  ],
})

export const getGeneralData = async () => {
  try {
    const response = await fetchApi({
      route: `website-commons?${query}`,
    })

    const result =
      response && response.data.length > 0 ? response.data[0].attributes : {}
    return result
  } catch (error) {
    console.error('Error fetching website-commons:', error)

    throw Error('Error fetching website-commons')
  }
}
